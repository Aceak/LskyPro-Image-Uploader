// main.ts
import {
  TFile,
  MarkdownView,
  Plugin,
  FileSystemAdapter,
  Editor,
  Menu,
  Notice,
  addIcon,
  requestUrl,
  MarkdownFileInfo,
} from "obsidian";

import {
  isAssetTypeAnImage,
  getUrlAsset,
  arrayToObject,
  resolveImageFile,
  getPlatformEnv,
  isValidImageExtension,
  getConcurrencyValue,
  dbg,
  warn,
  error,
} from "./utils";
import { LskyProUploader } from "./upload"; // 统一支持v1和v2版本的上传器
import Helper from "./helper";

import { SettingTab, PluginSettings, DEFAULT_SETTINGS } from "./setting";
import { t, setLanguage } from "./lang/i18n";

interface Image {
  path: string;
  obspath: string;
  name: string;
  source: string;
}

interface PastedImageItem {
  path: string;
  source: string;
  name: string;
}

declare global {
  interface Window {
    __LSKY_DEBUG__?: boolean;
    __LSKY_RUNTIME_DEBUG__?: boolean;
  }
}
export {};

export default class imageAutoUploadPlugin extends Plugin {
  settings: PluginSettings;
  helper: Helper;
  editor: Editor;
  uploader: LskyProUploader; // 统一的上传器实例

  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded);

    if (typeof this.settings._debug !== "boolean") {
      this.settings._debug = false;
    }

    window.__LSKY_DEBUG__ = this.settings._debug === true;

    if (!Object.getOwnPropertyDescriptor(window, "__LSKY_RUNTIME_DEBUG__")) {
      Object.defineProperty(window, "__LSKY_RUNTIME_DEBUG__", {
        configurable: true,
        get() {
          return window.__LSKY_DEBUG__;
        },
        set(value: boolean) {
          window.__LSKY_DEBUG__ = !!value;
        },
      });
    }

    if (window.__LSKY_DEBUG__) {
      console.debug("[LskyPro]"+ t("main.debugEnabled"));
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  reinitUploader() {
    const version = this.settings.uploader === "LskyPro-V1" ? "v1" : "v2";

    if (!this.uploader) {
      this.uploader = new LskyProUploader(this.settings, this.app, version);
    }
  }

  onunload() { }

  async onload() {
    await this.loadSettings();

    try {
      setLanguage(this.settings.language);
      dbg(t("main.languageSet"), this.settings.language);
    } catch (err) {
      error(t("main.languageInitFailed"), err);
    }

    this.helper = new Helper(this.app);
    this.reinitUploader();
    dbg(t("main.uploaderInit"));

    addIcon(
      'upload',
      `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M71.638 35.336h7.77c4.292 0 7.77 3.326 7.77 7.429v42.099c0 4.105-3.478 7.431-7.77 7.431H17.249c-4.292 0-7.77-3.326-7.77-7.431V42.765c0-4.103 3.478-7.429 7.77-7.429h7.77v7.429h-7.77v42.099h62.159V42.765h-7.77v-7.429zm-22.624-25.157l18.312 17.509-5.491 5.254-8.986-8.59v35.379h-7.771V24.455l-8.884 8.492-5.492-5.255 18.31-17.511z" fill="#8a8a8a"></path>
      </svg>`
    );

    this.addSettingTab(new SettingTab(this.app, this));
    this.registerCommands();
    this.registerMenus();
    this.registerPasteHandler();
    this.registerMobileAutoUpload();

    dbg(t("main.pluginLoaded"));
  }

  // 注册全局命令
  registerCommands() {
    // 全局命令：上传所有图片
    this.addCommand({
      id: "upload-all-images",
      name: t("main.uploadAllImages"),
      checkCallback: (checking: boolean) => {
        let leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!leaf) return false;
        if (!checking) void this.uploadAllFile();
        return true;
      },
    });

    // 全局命令：下载所有图片
    this.addCommand({

      id: "download-all-images",
      name: t("main.downloadAllImages"),
      checkCallback: (checking: boolean) => {
        let leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!leaf) return false;
        if (!checking) void this.downloadAllImageFiles();
        return true;
      },
    });
  }

  // 注册上下文菜单
  registerMenus() {
    this.registerEvent(
      this.app.workspace.on(
        "editor-menu",
        (menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo) => {
          const selection = editor.getSelection();
          if (!selection) return;

          const markdownMatch = /!\[.*\]\((.*)\)/.exec(selection);
          if (markdownMatch && markdownMatch[1] && !markdownMatch[1].startsWith("http")) {
            this.addUploadMenu(menu, markdownMatch[1], editor);
            return;
          }

          const wikiMatch = /^!?\[\[(.*?)\]\]$/.exec(selection);
          if (wikiMatch && wikiMatch[1] && !wikiMatch[1].startsWith("http")) {
            this.addUploadMenu(menu, wikiMatch[1], editor);
          }
        }
      )
    );
  }

  // 注册粘贴与拖拽上传事件
  registerPasteHandler() {
    /* === 粘贴事件 === */
    this.registerEvent(
      this.app.workspace.on(
        "editor-paste",
        async (evt: ClipboardEvent, editor: Editor) => {
          const allowUpload = this.helper.getFrontmatterValue(
            "image-auto-upload",
            this.settings.uploadByClipSwitch
          );
          if (!allowUpload) {
            dbg(t("main.autoUploadClipboardDisabled"));
            return;
          }

          const clipboardData = evt.clipboardData;
          if (!clipboardData) return;

          // ① 检查粘贴内容是否为网络图片 Markdown
          if (this.settings.workOnNetWork) {
            const text = clipboardData.getData("text/plain");
            const imageList = this.helper
              .getImageLink(text)
              .filter((img) => img.path.startsWith("http"))
              .filter(
                (img) =>
                  !this.helper.hasBlackDomain(
                    img.path,
                    this.settings.newWorkBlackDomains
                  )
              );

            if (imageList.length) {
              dbg(t("main.pasteNetworkImages", { count: imageList.length }));
              void this.handleNetworkPasteImages(imageList);
              return;
            }
          }

          // ② 检查是否为本地剪贴板图片（如截图）
          if (this.canUpload(clipboardData)) {
            evt.preventDefault();
            const pasteId = Math.random().toString(36).substring(2, 8);
            this.insertTemporaryText(editor, pasteId);

            try {
              const res = await this.uploader.uploadFromClipboard(evt);
              if (!res.success) {
                this.handleFailedUpload(editor, pasteId, res.msg);
                return;
              }

              const url = res.url || "";
              this.embedMarkDownImage(editor, pasteId, url);
              this.appendUploadedUrls(res.result);
            } catch (err) {
              this.handleFailedUpload(editor, pasteId, err?.message);
            }
          }
        }
      )
    );

    /* === 拖拽事件 === */
    this.registerEvent(
      this.app.workspace.on(
        "editor-drop",
        async (evt: DragEvent, editor: Editor) => {
          const allowUpload = this.helper.getFrontmatterValue(
            "image-auto-upload",
            this.settings.uploadByClipSwitch
          );
          if (!allowUpload) {
            dbg(t("main.autoUploadClipboardDisabled"));
            return;
          }

          const files = evt.dataTransfer?.files;
          if (!files?.length || !files[0].type.startsWith("image")) return;

          evt.preventDefault();
          new Notice(t("upload.uploading"));

          const res = await this.uploader.uploadFiles(Array.from(files));

          if (res.success && res.result?.length) {
            for (const url of res.result) {
              editor.replaceSelection(`![](${url})\n`);
            }
            this.appendUploadedUrls(res.result);
            new Notice(t("upload.success"));
          } else {
            new Notice(t("upload.failedNotice"));
            error(t("upload.error") + ":" + res.msg);
          }
        }
      )
    );
  }


  // 注册移动端自动上传事件
  registerMobileAutoUpload() {
    this.registerEvent(
      this.app.vault.on("create", async (file) => {
        if (!(file instanceof TFile)) return;
        if (!isAssetTypeAnImage(file.path)) return;

        const env = getPlatformEnv(this.app);
        if (env !== "mobile") return;

        const allow = this.helper.getFrontmatterValue(
          "image-auto-upload",
          this.settings.uploadAttachmentsSwitch
        );
        if (!allow){
          dbg(t("main.autoUploadAttachmentsDisabled"));
          return;
        }

        try {
          new Notice(t("upload.uploading"));
          const res = await this.uploader.uploadSingleFile(file.path);
          if (res.success && res.url) {
            const editor = this.helper.getEditor();
            if (!editor) return;
            editor.replaceSelection(`![](${res.url})`);
            if (this.settings.deleteSource) await this.app.fileManager.trashFile(file);
            new Notice(t("upload.success"));
          } else {
            new Notice(t("upload.failedNotice"));
          }
        } catch (e) {
          error(t("upload.error") + ":" + e);
        }
      })
    );
  }

  // 添加上传菜单到上下文菜单
  addUploadMenu(menu: Menu, imageUrl: string, editor: Editor) {
    menu.addItem((item) => {
      item
        .setTitle(t("main.uploadImage"))
        .setIcon("upload")
        .onClick(async () => {
          const file = resolveImageFile(this.app, imageUrl);
          if (!file) {
            error(t("main.fileNotFound") + ":" + imageUrl);
            new Notice(t("main.fileNotFound"));
            return;
          }
          const result = await this.uploader.uploadSingleFile(file.path);
          if (result.success && result.url) {
            new Notice(t("upload.success"));
            editor.replaceSelection(`![](${result.url})`);
          } else {
            error(t("upload.failedNotice") + ":" + result.msg);
            new Notice(t("upload.failedNotice"));
          }
        });
    });
  }

  // 下载所有图片文件
  async downloadAllImageFiles() {
    const fileArray = this.helper.getAllFiles();
    const folderPathAbs = this.getAttachmentFolderPath();

    if (!folderPathAbs) {
      new Notice(t("main.noAttachmentFolder"));
      return;
    }

    // 确保附件文件夹存在
    let absFolder = this.app.vault.getAbstractFileByPath(folderPathAbs);
    if (!absFolder) {
      await this.app.vault.createFolder(folderPathAbs);
    }

    const imageArray: { source: string; path: string }[] = [];
    let count = 0;
    let skipped = 0;

    for (const file of fileArray) {
      // 只处理网络图片
      if (!file.path.startsWith('http')) continue;
      count++;

      const url = file.path;

      // 检查是否包含扩展名
      const match = url.match(/\.(\w+)(\?|#|$)/);
      if (!match) {
        skipped++;
        warn(t('download.noExtension')+':'+url);
        continue;
      }

      // 校验扩展名合法性
      const ext = match[1].toLowerCase();
      if (!isValidImageExtension(ext)) {
        skipped++;
        warn(t('download.unsupportedType')+':'+ext);
        continue;
      }

      // 生成安全文件名
      let asset = getUrlAsset(url);
      asset = decodeURI(asset).replaceAll(/[\\\/:*?"<>|]/g, "-");

      // 如果文件已存在，则加随机前缀
      const saveName = this.app.vault.getAbstractFileByPath(`${folderPathAbs}/${asset}`)
        ? `${Math.random().toString(36).substring(2, 7)}-${asset}`
        : asset;

      try {
        const response = await this.download(url, folderPathAbs, saveName);
        if (response.ok) {
          imageArray.push({
            source: file.source,
            path: response.path,
          });
        }
      } catch (err) {
        new Notice(t('download.failedNotice'));
        error(t('download.failed') + ':' + err);
      }
    }

    // 批量替换 Markdown 图片引用
    let value = this.helper.getValue();
    imageArray.forEach((image) => {
      value = value.replace(
        image.source,
        `![](${encodeURI(image.path)})` 
      );
    });

    this.helper.setValue(value);

    const failed = count - imageArray.length - skipped;
    new Notice(
      t('download.report', {
        count,
        success: imageArray.length,
        skipped,
        failed
        })
    );
  }

  //获取附件路径（相对路径）
  getAttachmentFolderPath() {
    // @ts-ignore
    let assetFolder: string = this.app.vault.config.attachmentFolderPath;
    if (!assetFolder) {
      assetFolder = '/'
    }
    const activeFile = this.app.vault.getAbstractFileByPath(
      this.app.workspace.getActiveFile()?.path
    );
    if (activeFile==null||!activeFile) {
      return null;
    }
    const parentPath = activeFile.parent.path;
    // 当前文件夹下的子文件夹
    if (assetFolder.startsWith("./")) {
      assetFolder = assetFolder.substring(1);
      let pathTem = parentPath + (assetFolder==='/'?'':assetFolder);
      while(pathTem.startsWith('/')) {
        pathTem = pathTem.substring(1);
      }
      return pathTem;
    } else {
      return assetFolder;
    }
  }
  
  // 下载带扩展名的远程图片并保存到 vault
  async download(url: string, folderPath: string, filename: string) {
    try {
      const response = await requestUrl({ url });

      // 检查状态码
      if (response.status !== 200) {
        return { ok: false, msg: 'HTTP ${response.status}' };
      }

      // 从 URL 提取扩展名
      const match = url.match(/\.(\w+)(\?|#|$)/);
      if (!match) {
        warn(t('download.noExtension')+':'+url);
        return { ok: false, msg: t('download.noExtension') };
      }

      const ext = match[1].toLowerCase();

      if (!isValidImageExtension(ext)) {
        warn(t('download.unsupportedType')+':'+ext);
        return { ok: false, msg: t('download.unsupportedType')+':'+ext };
      }

      // 文件名清理
      const safeName = decodeURI(filename).replace(/[\\\/:*?"<>|]/g, "-");
      const savePath = `${folderPath}/${safeName}.${ext}`;

      // 写入 vault
      const arrayBuffer = response.arrayBuffer;
      await this.app.vault.createBinary(savePath, arrayBuffer, {
        ctime: Date.now(),
        mtime: Date.now(),
      });

      return { ok: true, msg: 'ok', path: savePath };
    } catch (err) {
      const e = err as Error;
      error(t('download.failed')+':'+e.message);
      return { ok: false, msg: e?.message || t('download.exception') };
    }
  }

  // 过滤图片文件
  filterFile(fileArray: Image[]) {
    const imageList: Image[] = [];

    for (const match of fileArray) {
      if (match.path.startsWith('http')) {
        if (this.settings.workOnNetWork) {
          if (
            !this.helper.hasBlackDomain(
              match.path,
              this.settings.newWorkBlackDomains
            )
          ) {
            imageList.push({
              path: match.path,
              obspath: match.path,
              name: match.name,
              source: match.source,
            });
          }
        }
      } else {
        imageList.push({
          path: match.path,
          obspath: match.obspath,
          name: match.name,
          source: match.source,
        });
      }
    }

    return imageList;
  }

  // 获取文件对象
  getFile(fileName: string, fileMap?: Record<string, TFile>) {
    const map = fileMap ?? arrayToObject(this.app.vault.getFiles(), "name") as Record<string, TFile>;
    return map[fileName];
  }

  // upload all file
  async uploadAllFile() {
    let content = this.helper.getValue();
    const activeFIle = this.app.workspace.getActiveFile();

    if (!activeFIle) {
      new Notice(t('main.openFileFirst'));
      return;
    }

    const env = getPlatformEnv(this.app);
    const basePath =
      env === 'desktop' ? (this.app.vault.adapter as FileSystemAdapter).getBasePath() : '';

    const fileMap = arrayToObject(this.app.vault.getFiles(), 'name');
    const filePathMap = arrayToObject(this.app.vault.getFiles(), 'path');
    const fileArray = this.filterFile(this.helper.getAllFiles());

    const imageList: Image[] = [];

    for (const match of fileArray) {
      const encodedUri = match.path;

      if (!encodedUri.startsWith('http')) continue;

      const matchPath = decodeURI(encodedUri);
      const fileName = matchPath.split(/[\\/]/).pop() || "";
      let file: TFile | null = null;
      // 绝对路径
      if (filePathMap[matchPath]) {
        file = filePathMap[matchPath];
      }

      // 相对路径
      if (!file && (matchPath.startsWith('./') || matchPath.startsWith('../'))) {
        const parentDir = activeFIle.parent?.path || "";
        let absoPath = "";

        if (matchPath.startsWith('./')) {
            absoPath = parentDir + matchPath.substring(1)
        } else {
          const levelUpCount = matchPath.split('../').length-1;

          const ParentParts = parentDir.split('/'); 
          const relativeParts = matchPath.split('/');

          const combined = [
            ...ParentParts.slice(0, -levelUpCount),
            ...relativeParts.slice(levelUpCount),
          ];

          absoPath = combined.join('/');
        }
        const af = this.app.vault.getAbstractFileByPath(absoPath);

        if (af && af instanceof TFile) {
          file = af;
        } else {
          warn(t('main.notafile') + absoPath, af);
        }
      }

      if(!file) {
        file = this.getFile(fileName, fileMap);
      }

      if (file && isAssetTypeAnImage(file.path)) {
        const absPath = env === 'desktop' ? `${basePath}/${file.path}` : file.path;

        if (!imageList.find(item => item.path === absPath)) {
          imageList.push({
            path: absPath,
            obspath: file.path,
            name: "",
            source: match.source,
          });
        }
      }
    }

    if (imageList.length === 0) {
      new Notice(t('main.noImageParsed'));
      return;
    }

    new Notice(t('main.uploadStart', { count: imageList.length }));

    try {
      const concurrency = getConcurrencyValue(this.settings.concurrencyMode);
      const res = await this.uploader.uploadWithLimit(
        imageList.map(item => item.obspath),
        concurrency
      );

      if (!res.success) {
        new Notice(t('upload.someFailed'));
        warn(t('upload.someFailed') + ':', res.msg);
      }

      const urls = [...(res.result || [])];
      this.settings.uploadedImages = [
        ...(this.settings.uploadedImages || []),
        ...urls,
      ];
      await this.saveSettings();

      imageList.forEach((item) => {
        const newUrl = urls.shift();
        if(newUrl) {
          content = content.replaceAll(item.source, '![](${newUrl})');
        }
      });

      this.helper.setValue(content);

      if (this.settings.deleteSource) {
        for (const image of imageList) {
          const fileDel = this.app.vault.getAbstractFileByPath(image.obspath);
          if(fileDel) await this.app.fileManager.trashFile(fileDel);
        }
      }

    new Notice(t('upload.complete'));
    } catch (error) {
      error(t('upload.failed') + ':', error);
      new Notice(t('upload.failedNotice'));
    }
  }

  // 处理粘贴中的网络图片再上传
  async handleNetworkPasteImages(imageList: PastedImageItem[]) {
    try {
      const res = await this.uploader.uploadFiles(imageList.map((i) => i.path));
      if (res.success && res.result) {
        let content = this.helper.getValue();
        const urls = [...res.result];
        imageList.forEach((img) => {
          const newUrl = urls.shift();
          if (newUrl) {
            content = content.replace(
              img.source,
              `![${img.name}](${newUrl})`
            );
          }
        });
        this.helper.setValue(content);
        this.appendUploadedUrls(res.result);
        new Notice(t("upload.complete"));
      } else {
        new Notice(t("upload.failed"));
      }
    } catch (e) {
      error(t("upload.failed"), e);
      new Notice(t("upload.failedNotice"));
    }
  } 
  
  // 将上传结果追加保存
  appendUploadedUrls(urls: string[] = []) {
    if (!urls.length) return;
    this.settings.uploadedImages = [
      ...(this.settings.uploadedImages || []),
      ...urls,
    ];
    void this.saveSettings();
  }

  // 检查是否可以上传图片
  canUpload(clipboardData: DataTransfer) {
    if (!this.settings.uploadByClipSwitch) return false;

    const files = clipboardData.files;
    const text = clipboardData.getData('text');

    const isImage =
      files.length > 0 && files[0].type.startsWith("image");

    if (!isImage) return false;

    return text ? this.settings.uploadByClipSwitch : true;
  }

  // 上传文件并嵌入 Imgur 图片
  async uploadFileAndEmbedImgurImage(
    editor: Editor,
    callback: (editor: Editor, pasteId: string) => Promise<string>,
    clipboardData: DataTransfer
  ) {
    const pasteId = (Math.random() + 1).toString(36).substring(2, 7);

    this.insertTemporaryText(editor, pasteId);

    const name = clipboardData.files[0].name;

    try {
      const url = await callback(editor, pasteId);
      this.embedMarkDownImage(editor, pasteId, url);
    } catch (e) {
      this.handleFailedUpload(editor, pasteId, e);
    }
  }

  // 插入临时文本
  insertTemporaryText(editor: Editor, pasteId: string) {
    let progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
    editor.replaceSelection(progressText + '\n');
  }

  private static progressTextFor(id: string) {
    return t('upload.uploading') + id;
  }

  // 嵌入 Markdown 图片
  embedMarkDownImage(
    editor: Editor,
    pasteId: string,
    imageUrl: string,
  ) {
    let progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
    let markDownImage = `![](${imageUrl})`;

    imageAutoUploadPlugin.replaceFirstOccurrence(
      editor,
      progressText,
      markDownImage
    );
  }

  // 处理上传失败
  handleFailedUpload(editor: Editor, pasteId: string, reason: unknown) {
    let msg = '';

    if (reason instanceof Error) {
      msg = reason.message;
    } else if (typeof reason === 'string') {
      msg = reason;
    } else {
      msg = String(reason ?? 'Unknown Error');
    }

    new Notice(msg);
    error(t('upload.requestException') + ': ' + msg);

    const progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
    imageAutoUploadPlugin.replaceFirstOccurrence(
      editor,
      progressText,
      t('upload.failedNotice')
    );
  }

  // 替换第一个匹配项
  static replaceFirstOccurrence(
    editor: Editor,
    target: string,
    replacement: string
  ) {
    let lines = editor.getValue().split("\n");
    for (let i = 0; i < lines.length; i++) {
      let ch = lines[i].indexOf(target);
      if (ch != -1) {
        let from = { line: i, ch: ch };
        let to = { line: i, ch: ch + target.length };
        editor.replaceRange(replacement, from, to);
        break;
      }
    }
  }
}