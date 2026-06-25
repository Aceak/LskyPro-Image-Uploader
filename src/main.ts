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
  normalizePath,
} from "obsidian";

import {
  isAssetTypeAnImage,
  getUrlAsset,
  resolveImageFile,
  getPlatformEnv,
  isValidImageExtension,
  getConcurrencyValue,
  parseUploaderVersion,
  getExtname,
  encodeMarkdownUrl,
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
  settings!: PluginSettings;
  helper!: Helper;
  uploader!: LskyProUploader; // 统一的上传器实例

  async loadSettings() {
    const loaded = await this.loadData() as Partial<PluginSettings> | undefined;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded ?? {});

    if (typeof this.settings.debug !== "boolean") {
      this.settings.debug = false;
    }

    // 直接更新调试模式状态
    debugState.enabled = this.settings.debug;

    if (this.settings.debug) {
      dbg(t("main.debugEnabled"));
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  reinitUploader() {
    const version = parseUploaderVersion(this.settings.uploader);
    this.uploader = new LskyProUploader(this.settings, this.app, version);
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
          if (evt.defaultPrevented) return;
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
            const clipboardFile = clipboardData.files[0];
            if (!clipboardFile) {
              new Notice(t("upload.clipboardEmpty"));
              return;
            }

            // ⚠️ 必须在任何 await 之前同步阻止默认粘贴
            evt.preventDefault();

            // preventDefault 后再读 buffer——File 引用已在 preventDefault 前捕获
            const fileBuffer = await clipboardFile.arrayBuffer();
            await this.processPastedImages(editor, [clipboardFile], [fileBuffer]);
          }
        }
      )
    );

    /* === 拖拽事件 === */
    this.registerEvent(
      this.app.workspace.on(
        "editor-drop",
        async (evt: DragEvent, editor: Editor) => {
          if (evt.defaultPrevented) return;
          const allowUpload = this.helper.getFrontmatterValue(
            "image-auto-upload",
            this.settings.uploadByClipSwitch
          );
          if (!allowUpload) {
            dbg(t("main.autoUploadClipboardDisabled"));
            return;
          }

          const dropFiles = evt.dataTransfer?.files;
          if (!dropFiles?.length || !dropFiles[0].type.startsWith("image")) return;

          // ⚠️ 必须在任何 await 之前同步阻止默认拖拽
          const droppedFiles = Array.from(dropFiles);
          evt.preventDefault();

          // 读取所有文件数据
          const buffers = await Promise.all(droppedFiles.map(f => f.arrayBuffer()));
          await this.processPastedImages(editor, droppedFiles, buffers);
        }
      )
    );
  }

  // 注册移动端自动上传事件
  registerMobileAutoUpload() {
    // 在布局准备就绪后再注册create事件，确保编辑器和工作区完全加载
    this.app.workspace.onLayoutReady(() => {
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
          new Notice(t("upload.failedNotice"));
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
              path: response.path || saveName,
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
    // 重新读取文档内容（包含并发编辑）
    let value = this.helper.getValue();
    dbg(
      "[downloadAllImageFiles] 原始 Markdown 内容长度:",
      value.length,
      "字符"
    );

    imageArray.forEach((image, index) => {
      const originalLength = value.length;
      value = value.replaceAll(image.source, `![](${encodeMarkdownUrl(image.path)})`);

      if (value.length !== originalLength) {
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
    const assetFolder: string = (this.app.vault.config as Record<string, string>).attachmentFolderPath;

    dbg(t("attachmentPath.debug.original", { path: assetFolder }));

    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) {
      dbg(t("attachmentPath.debug.noActiveFile"));
      return null;
    }

    const parentPath = activeFile.parent?.path ?? "";

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

  // 将图片数据保存到 Vault 附件目录
  // 返回保存路径，失败返回 null
  async saveImageToVault(data: ArrayBuffer, fileName: string): Promise<string | null> {
    try {
      const folderPath = this.getAttachmentFolderPath();
      if (!folderPath) {
        new Notice(t("main.noAttachmentFolder"));
        error("[saveImageToVault] No attachment folder path");
        return null;
      }

      // 确保附件文件夹存在
      const normFolderPath = normalizePath(folderPath);
      const folder = this.app.vault.getAbstractFileByPath(normFolderPath);
      if (!folder) {
        await this.app.vault.createFolder(normFolderPath);
      }

      // 解析文件名和扩展名（大小写不敏感）
      const ext = getExtname(fileName) || ".png";
      const lowerName = fileName.toLowerCase();
      const lowerExt = ext; // getExtname 已返回小写
      const dotIndex = lowerName.lastIndexOf(lowerExt);
      const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;

      // 处理文件名冲突：已存在则追加数字后缀（上限 1000 防止无限循环）
      let saveName = fileName;
      let counter = 0;
      const MAX_CONFLICT = 1000;
      while (counter < MAX_CONFLICT && this.app.vault.getAbstractFileByPath(
        normalizePath(folderPath + "/" + saveName)
      )) {
        counter++;
        saveName = `${baseName}-${counter}${ext}`;
      }
      if (counter >= MAX_CONFLICT) {
        error("[saveImageToVault] Too many file conflicts:", saveName);
        return null;
      }

      const fullPath = normalizePath(`${folderPath}/${saveName}`);
      await this.app.vault.createBinary(fullPath, data, {
        ctime: Date.now(),
        mtime: Date.now(),
      });
      dbg("[saveImageToVault] Saved:", fullPath);
      return fullPath;
    } catch (e) {
      error("[saveImageToVault] Failed:", e);
      return null;
    }
  }

  /**
   * 处理粘贴/拖拽的本地图片：保存到 vault → 插入引用 → 上传 → 替换远端
   * 单文件与多文件统一入口
   */
  private async processPastedImages(
    editor: Editor,
    files: File[],
    buffers: ArrayBuffer[]
  ): Promise<void> {
    // ① 保存到 vault 并插入本地 ![](path) 引用
    const savedPaths: (string | null)[] = [];
    const insertLines: (number | undefined)[] = [];
    const uploadQueue: { file: File; index: number }[] = [];

    for (let i = 0; i < files.length; i++) {
      const savedPath = await this.saveImageToVault(buffers[i], files[i].name);
      savedPaths.push(savedPath);
      if (savedPath) {
        editor.replaceSelection(`![](${encodeMarkdownUrl(savedPath)})\n`);
        // 末尾 \n 把光标推到下一行，回退一行才是目标所在行
        insertLines.push(editor.getCursor().line - 1);
        uploadQueue.push({ file: files[i], index: i });
      } else {
        insertLines.push(undefined);
      }
    }

    if (savedPaths.every(p => p === null)) {
      new Notice(t("upload.failedNotice"));
      return;
    }

    new Notice(t("upload.uploading"));

    // ② 仅上传本地保存成功的文件，避免幽灵 URL
    try {
      const res = await this.uploader.uploadFiles(uploadQueue.map(q => q.file));

      // ③ 映射 uploadFiles 结果回原始 files 索引（null 占位失败项）
      const resultUrls: (string | null)[] = new Array<string | null>(files.length).fill(null);
      if (res.result) {
        for (let j = 0; j < uploadQueue.length && j < res.result.length; j++) {
          resultUrls[uploadQueue[j].index] = res.result[j];
        }
      }

      // ④ 替换成功的本地引用为远端 URL；失败/无效的保留本地引用
      if (resultUrls.some(u => u !== null)) {
        for (let i = 0; i < resultUrls.length; i++) {
          const url = resultUrls[i];
          const sp = savedPaths[i];
          if (url && sp) {
            imageAutoUploadPlugin.replaceFirstOccurrence(
              editor,
              `![](${encodeMarkdownUrl(sp)})`,
              `![](${url})`,
              insertLines[i]
            );
          }
        }
        this.appendUploadedUrls(resultUrls);
        // 上传成功后按配置删除本地文件
        if (this.settings.deleteSource) {
          for (const { index } of uploadQueue) {
            if (resultUrls[index] && savedPaths[index]) {
              const fileDel = this.app.vault.getAbstractFileByPath(
                normalizePath(savedPaths[index])
              );
              if (fileDel) await this.app.fileManager.trashFile(fileDel);
            }
          }
        }
        if (res.success) {
          new Notice(t("upload.success"));
        } else {
          new Notice(t("upload.someFailed"));
        }
      } else {
        new Notice(t("upload.failedShort") + ": " + (res.msg || t("upload.exception")));
        error(t("upload.error") + ":" + (res.msg ?? ""));
      }
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      new Notice(t("upload.failedShort") + ": " + reason);
      error(t("upload.error") + ":", err);
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
      // 过滤掉失败项再写入上传历史
      this.settings.uploadedImages = [
        ...(this.settings.uploadedImages || []),
        ...urls.filter((u): u is string => u !== null),
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

      // 重新读取文档内容（包含并发编辑），然后替换所有图片源
      content = this.helper.getValue();
      for (const [source, newUrl] of urlMap.entries()) {
        content = content.replaceAll(source, `![](${newUrl})`);
      }
      this.helper.setValue(content);

      if (this.settings.deleteSource) {
        for (const image of imageList) {
          // 仅删除上传成功的文件（存在于 urlMap 中的）
          if (!urlMap.has(image.source)) continue;
          const fileDel = this.app.vault.getAbstractFileByPath(image.obspath);
          if (fileDel) await this.app.fileManager.trashFile(fileDel);
        }
      }

      new Notice(t("upload.complete"));
    } catch (e) {
      error(t("upload.failed") + ":", e);
      new Notice(t("upload.failedNotice"));
    }
  }

  // 处理粘贴中的网络图片再上传
  async handleNetworkPasteImages(imageList: PastedImageItem[]) {
    try {
      const res = await this.uploader.uploadFiles(imageList.map(i => i.path));
      if (res.result && res.result.length > 0) {
        // 重新读取文档内容（包含并发编辑）
        let content = this.helper.getValue();
        const urls = [...res.result];
        imageList.forEach(img => {
          const newUrl = urls.shift();
          if (newUrl) {
            content = content.replaceAll(img.source, `![${img.name}](${newUrl})`);
          }
        });
        this.helper.setValue(content);
        this.appendUploadedUrls((res.result || []).filter((u): u is string => u !== null));
        if (!res.success) {
          new Notice(t("upload.someFailed"));
        } else {
          new Notice(t("upload.complete"));
        }
      } else {
        new Notice(t("upload.failed"));
      }
    } catch (e) {
      error(t("upload.failed"), e);
      new Notice(t("upload.failedNotice"));
    }
  }

  // 将上传结果追加保存
  appendUploadedUrls(urls: (string | null)[] = []) {
    const validUrls = urls.filter((u): u is string => u !== null);
    if (!validUrls.length) return;
    this.settings.uploadedImages = [
      ...(this.settings.uploadedImages || []),
      ...validUrls,
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

  // 替换匹配项：优先从 fromLine 向前查找，未指定则从底部向上（优先匹配刚插入的文本）
  static replaceFirstOccurrence(
    editor: Editor,
    target: string,
    replacement: string,
    fromLine?: number
  ) {
    let lines = editor.getValue().split("\n");
    if (fromLine !== undefined && fromLine >= 0 && fromLine < lines.length) {
      // 从指定行向前搜索
      for (let i = fromLine; i < lines.length; i++) {
        let ch = lines[i].indexOf(target);
        if (ch != -1) {
          editor.replaceRange(replacement, { line: i, ch: ch }, { line: i, ch: ch + target.length });
          return;
        }
      }
    }
    // 默认从底部向上搜索（新插入文本更可能在文档末尾）
    for (let i = lines.length - 1; i >= 0; i--) {
      let ch = lines[i].indexOf(target);
      if (ch != -1) {
        editor.replaceRange(replacement, { line: i, ch: ch }, { line: i, ch: ch + target.length });
        return;
      }
    }
  }
}
