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
  debugState,
} from "./utils";
import { LskyProUploader } from "./upload"; // 统一支持v1和v2版本的上传器
import Helper from "./helper";

import { SettingTab, PluginSettings, DEFAULT_SETTINGS } from "./setting";
import { t, initLanguage, getCurrentLanguage } from "./lang/i18n";

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

export default class imageAutoUploadPlugin extends Plugin {
  settings: PluginSettings;
  helper: Helper;
  editor: Editor;
  uploader: LskyProUploader; // 统一的上传器实例

  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded);

    if (typeof this.settings.debug !== "boolean") {
      this.settings.debug = false;
    }

    // 直接更新调试模式状态
    debugState.enabled = this.settings.debug;

    if (this.settings.debug) {
      console.debug("[LskyPro]" + t("main.debugEnabled"));
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

  onunload() {}

  async onload() {
    await this.loadSettings();

    try {
      initLanguage(this.app);
      dbg(t("main.languageSet"), getCurrentLanguage());
    } catch (err) {
      error(t("main.languageInitFailed"), err);
    }

    this.helper = new Helper(this.app);
    this.reinitUploader();
    dbg(t("main.uploaderInit"));

    addIcon(
      "upload",
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
          if (
            markdownMatch &&
            markdownMatch[1] &&
            !markdownMatch[1].startsWith("http")
          ) {
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
              .filter(img => img.path.startsWith("http"))
              .filter(
                img =>
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
    // 在布局准备就绪后再注册create事件，确保编辑器和工作区完全加载
    const layoutReadyEvent = this.app.workspace.onLayoutReady(() => {
      const createEvent = this.app.vault.on("create", async file => {
        if (!(file instanceof TFile)) return;
        if (!isAssetTypeAnImage(file.path)) return;

        const env = getPlatformEnv(this.app);
        if (env !== "mobile") return;

        const allow = this.helper.getFrontmatterValue(
          "image-auto-upload",
          this.settings.uploadAttachmentsSwitch
        );
        if (!allow) {
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
            if (this.settings.deleteSource)
              await this.app.fileManager.trashFile(file);
            new Notice(t("upload.success"));
          } else {
            new Notice(t("upload.failedNotice"));
          }
        } catch (e) {
          error(t("upload.error") + ":" + e);
        }
      });
      // 注册create事件
      this.registerEvent(createEvent);
    });
  }

  // 添加上传菜单到上下文菜单
  addUploadMenu(menu: Menu, imageUrl: string, editor: Editor) {
    menu.addItem(item => {
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
    dbg("[downloadAllImageFiles] 开始下载所有图片");

    const fileArray = this.helper.getAllFiles();
    const folderPath = this.getAttachmentFolderPath();

    if (!folderPath) {
      new Notice(t("main.noAttachmentFolder"));
      error(t("main.noAttachmentFolder") + ":" + folderPath);
      return;
    }

    // 确保附件文件夹存在
    let folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      await this.app.vault.createFolder(folderPath);
    }

    const imageArray: { source: string; path: string }[] = [];
    let count = 0;
    let skipped = 0;
    let successDownloaded = 0;

    for (const file of fileArray) {
      // 只处理网络图片
      if (!file.path.startsWith("http")) {
        skipped++;
        continue;
      }
      count++;

      const url = file.path;

      // 检查是否包含扩展名
      const match = url.match(/\.(\w+)(\?|#|$)/);
      if (!match) {
        skipped++;
        warn(t("download.noExtension") + ":" + url);
        continue;
      }

      // 校验扩展名合法性
      const ext = match[1].toLowerCase();
      if (!isValidImageExtension(ext)) {
        skipped++;
        warn(t("download.unsupportedType") + ":" + ext);
        continue;
      }

      // 生成安全文件名
      let asset = getUrlAsset(url);
      asset = decodeURI(asset).replaceAll(/[\\/:*?"<>|]/g, "-");

      // 如果文件已存在，直接使用原文件名
      let fullSavePath: string;
      if (folderPath === "" || folderPath === "/") {
        fullSavePath = asset;
      } else {
        fullSavePath = `${folderPath}/${asset}`;
      }
      const existingFile = this.app.vault.getAbstractFileByPath(fullSavePath);
      // 无论文件是否存在，都使用原文件名
      const saveName = asset;

      // 如果文件已存在，跳过下载但仍然更新Markdown引用
      if (existingFile) {
        // 增加跳过计数
        skipped++;
        // 仍然将已存在的文件添加到imageArray中，以便更新Markdown引用
        imageArray.push({
          source: file.source,
          path: fullSavePath,
        });
      } else {
        // 文件不存在，执行下载
        try {
          const response = await this.download(url, folderPath, saveName);
          if (response.ok) {
            imageArray.push({
              source: file.source,
              path: response.path,
            });
            // 增加成功下载计数
            successDownloaded++;
          }
        } catch (err) {
          new Notice(t("download.failedNotice"));
          error(t("download.failed") + ":" + err);
          dbg("[downloadAllImageFiles] 下载异常:", url, err);
        }
      }
    }

    // 批量替换 Markdown 图片引用
    dbg(
      "[downloadAllImageFiles] 开始替换 Markdown 图片引用:",
      imageArray.length,
      "个图片"
    );
    let value = this.helper.getValue();
    dbg(
      "[downloadAllImageFiles] 原始 Markdown 内容长度:",
      value.length,
      "字符"
    );

    let replacedCount = 0;
    imageArray.forEach((image, index) => {
      const originalLength = value.length;
      value = value.replace(image.source, `![](${encodeURI(image.path)})`);

      if (value.length !== originalLength) {
        replacedCount++;
        dbg(
          "[downloadAllImageFiles] 替换图片引用 [",
          index + 1,
          "/",
          imageArray.length,
          "]:",
          image.source,
          "→",
          `![](${encodeURI(image.path)})`
        );
      } else {
        dbg(
          "[downloadAllImageFiles] 未找到匹配项 [",
          index + 1,
          "/",
          imageArray.length,
          "]:",
          image.source
        );
      }
    });

    this.helper.setValue(value);

    const failed = count - successDownloaded - skipped;
    dbg(
      t("download.debug.report", {
        count,
        success: successDownloaded,
        skipped,
        failed,
      })
    );
    new Notice(
      t("download.report", {
        count,
        success: successDownloaded,
        skipped,
        failed,
      })
    );
  }

  //获取附件路径（相对路径）
  getAttachmentFolderPath() {
    // @ts-ignore
    let assetFolder: string = this.app.vault.config.attachmentFolderPath;

    dbg(t("attachmentPath.debug.original", { path: assetFolder }));

    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) {
      dbg(t("attachmentPath.debug.noActiveFile"));
      return null;
    }

    const parentPath = activeFile.parent.path;

    // 如果assetFolder为空或未设置，则使用活动文件的父目录
    if (!assetFolder || assetFolder.trim() === "") {
      return parentPath;
    }

    // 当前文件夹下的子文件夹
    if (assetFolder.startsWith("./")) {
      // 移除开头的./，保留后面的路径
      const relativePath = assetFolder.substring(2);

      // 如果相对路径为空，则直接返回当前文件的父目录
      if (!relativePath) {
        return parentPath;
      }

      // 构建完整路径
      const fullPath = parentPath
        ? `${parentPath}/${relativePath}`
        : relativePath;
      // 确保路径不以斜杠开头
      const finalPath = fullPath.replace(/^\//, "");
      dbg(t("attachmentPath.debug.final", { path: finalPath }));
      return finalPath;
    } else {
      // 确保路径不以斜杠开头
      const finalPath = assetFolder.replace(/^\//, "");
      dbg(t("attachmentPath.debug.final", { path: finalPath }));
      return finalPath;
    }
  }

  // 下载带扩展名的远程图片并保存到 vault
  async download(url: string, folderPath: string, filename: string) {
    dbg(t("download.debug.start", { url }));

    try {
      const response = await requestUrl({ url });

      // 检查状态码
      if (response.status !== 200) {
        const errorMsg = `HTTP ${response.status}`;
        dbg(t("download.debug.failed", { error: errorMsg }));
        return { ok: false, msg: errorMsg };
      }

      // 文件名清理
      const safeName = decodeURI(filename).replace(/[\\/:*?"<>|]/g, "-");

      // 构建正确的路径，避免多余斜杠
      let savePath: string;
      if (folderPath === "" || folderPath === "/") {
        // 如果是根目录或空目录，直接使用文件名
        savePath = safeName;
      } else {
        // 否则构建完整路径
        savePath = `${folderPath}/${safeName}`;
      }
      dbg(t("download.debug.savePath", { path: savePath }));

      // 写入 vault
      const arrayBuffer = response.arrayBuffer;

      await this.app.vault.createBinary(savePath, arrayBuffer, {
        ctime: Date.now(),
        mtime: Date.now(),
      });
      dbg(t("download.debug.success", { path: savePath }));

      return { ok: true, msg: "ok", path: savePath };
    } catch (err) {
      const e = err as Error;
      const errorMsg = e?.message || t("download.exception");
      dbg(t("download.debug.exception", { url, error: errorMsg }));
      error(t("download.failed") + ":" + errorMsg);
      return { ok: false, msg: errorMsg };
    }
  }

  // 过滤图片文件
  filterFile(fileArray: Image[]) {
    const imageList: Image[] = [];

    for (const match of fileArray) {
      if (match.path.startsWith("http")) {
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

  // upload all file
  async uploadAllFile() {
    dbg(t("upload.allFiles"));
    let content = this.helper.getValue();
    const activeFIle = this.app.workspace.getActiveFile();

    if (!activeFIle) {
      new Notice(t("main.openFileFirst"));
      return;
    }

    const env = getPlatformEnv(this.app);
    const basePath =
      env === "desktop"
        ? (this.app.vault.adapter as FileSystemAdapter).getBasePath()
        : "";

    const fileArray = this.filterFile(this.helper.getAllFiles());

    const imageList: Image[] = [];

    for (const match of fileArray) {
      const encodedUri = match.path;

      const matchPath = decodeURI(encodedUri);
      let file: TFile | null = null;

      const af = this.app.vault.getAbstractFileByPath(matchPath);
      if (af && af instanceof TFile) {
        file = af;
      }

      if (
        !file &&
        (matchPath.startsWith("./") || matchPath.startsWith("../"))
      ) {
        const parentDir = activeFIle.parent?.path || "";
        let absoPath = "";

        if (matchPath.startsWith("./")) {
          absoPath = parentDir + matchPath.substring(1);
        } else {
          const levelUpCount = matchPath.split("../").length - 1;

          const ParentParts = parentDir.split("/");
          const relativeParts = matchPath.split("/");

          const combined = [
            ...ParentParts.slice(0, -levelUpCount),
            ...relativeParts.slice(levelUpCount),
          ];

          absoPath = combined.join("/");
        }
        const relativeFile = this.app.vault.getAbstractFileByPath(absoPath);
        if (relativeFile && relativeFile instanceof TFile) {
          file = relativeFile;
        }
      }

      if (file && isAssetTypeAnImage(file.path)) {
        const absPath =
          env === "desktop" ? `${basePath}/${file.path}` : file.path;

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
      new Notice(t("main.noImageParsed"));
      return;
    }

    new Notice(t("main.uploadStart", { count: imageList.length }));

    try {
      const concurrency = getConcurrencyValue(this.settings.concurrencyMode);
      const res = await this.uploader.uploadWithLimit(
        imageList.map(item => item.obspath),
        concurrency
      );

      if (!res.success) {
        new Notice(t("upload.someFailed"));
        warn(t("upload.someFailed") + ":", res.msg);
      }

      const urls = [...(res.result || [])];
      this.settings.uploadedImages = [
        ...(this.settings.uploadedImages || []),
        ...urls,
      ];
      await this.saveSettings();

      // 创建映射表，确保每个图片源对应一个新URL
      const urlMap = new Map<string, string>();
      imageList.forEach((item, index) => {
        const newUrl = urls[index];
        if (newUrl) {
          urlMap.set(item.source, newUrl);
        }
      });

      // 使用精确替换，确保每个图片源只替换一次
      // 遍历所有匹配的图片源并替换
      for (const [source, newUrl] of urlMap.entries()) {
        // 每个source都是从文档中唯一匹配到的完整图片标记，直接替换即可
        content = content.replace(source, `![](${newUrl})`);
      }

      this.helper.setValue(content);

      if (this.settings.deleteSource) {
        for (const image of imageList) {
          const fileDel = this.app.vault.getAbstractFileByPath(image.obspath);
          if (fileDel) await this.app.fileManager.trashFile(fileDel);
        }
      }

      new Notice(t("upload.complete"));
    } catch (error) {
      error(t("upload.failed") + ":", error);
      new Notice(t("upload.failedNotice"));
    }
  }

  // 处理粘贴中的网络图片再上传
  async handleNetworkPasteImages(imageList: PastedImageItem[]) {
    try {
      const res = await this.uploader.uploadFiles(imageList.map(i => i.path));
      if (res.success && res.result) {
        let content = this.helper.getValue();
        const urls = [...res.result];
        imageList.forEach(img => {
          const newUrl = urls.shift();
          if (newUrl) {
            content = content.replace(img.source, `![${img.name}](${newUrl})`);
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
    const text = clipboardData.getData("text");

    const isImage = files.length > 0 && files[0].type.startsWith("image");

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
    editor.replaceSelection(progressText + "\n");
  }

  private static progressTextFor(id: string) {
    return t("upload.uploading") + id;
  }

  // 嵌入 Markdown 图片
  embedMarkDownImage(editor: Editor, pasteId: string, imageUrl: string) {
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
    let msg = "";

    if (reason instanceof Error) {
      msg = reason.message;
    } else if (typeof reason === "string") {
      msg = reason;
    } else {
      try {
        msg = JSON.stringify(reason);
      } catch {
        msg = "Unknown error";
      }
    }

    new Notice(msg);
    error(t("upload.requestException") + ": " + msg);

    const progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
    imageAutoUploadPlugin.replaceFirstOccurrence(
      editor,
      progressText,
      t("upload.failedNotice")
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
