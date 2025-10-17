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
  IMAGE_EXT_LIST,
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

export default class imageAutoUploadPlugin extends Plugin {
  settings: PluginSettings;
  helper: Helper;
  editor: Editor;
  uploader: LskyProUploader; // 统一的上传器实例

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  reinitUploader() {
    // 如果上传器已存在，直接更新设置而不是创建新实例
    if (this.uploader) {
      this.uploader.updateSettings(this.settings);
    } else {
      // 如果上传器不存在，创建新实例
      const version = this.settings.uploader === 'LskyPro-V1' ? 'v1' : 'v2';
      this.uploader = new LskyProUploader(this.settings, this.app, version);
    }
  }

  onunload() { }

  async onload() {
    await this.loadSettings();
    setLanguage(this.settings.language);
    (window as any).__LSKY_DEBUG__ = this.settings._debug === true;
    this.helper = new Helper(this.app);
    
    // 根据设置选择上传器版本
    const version = this.settings.uploader === 'LskyPro-V1' ? 'v1' : 'v2';
    this.uploader = new LskyProUploader(this.settings, this.app, version);
    
    if (!['LskyPro-V2', 'LskyPro-V1'].includes(this.settings.uploader)) {
      new Notice(t('Unknown uploader version'));
    }

    addIcon(
      'upload',
      `<svg t="1636630783429" class="icon" viewBox="0 0 100 100" version="1.1" p-id="4649" xmlns="http://www.w3.org/2000/svg">
      <path d="M 71.638 35.336 L 79.408 35.336 C 83.7 35.336 87.178 38.662 87.178 42.765 L 87.178 84.864 C 87.178 88.969 83.7 92.295 79.408 92.295 L 17.249 92.295 C 12.957 92.295 9.479 88.969 9.479 84.864 L 9.479 42.765 C 9.479 38.662 12.957 35.336 17.249 35.336 L 25.019 35.336 L 25.019 42.765 L 17.249 42.765 L 17.249 84.864 L 79.408 84.864 L 79.408 42.765 L 71.638 42.765 L 71.638 35.336 Z M 49.014 10.179 L 67.326 27.688 L 61.835 32.942 L 52.849 24.352 L 52.849 59.731 L 45.078 59.731 L 45.078 24.455 L 36.194 32.947 L 30.702 27.692 L 49.012 10.181 Z" p-id="4650" fill="#8a8a8a"></path>
    </svg>`
    );

    this.addSettingTab(new SettingTab(this.app, this));

    this.addCommand({
      id: "Upload all images",
      name: t("Upload all images"),
      checkCallback: (checking: boolean) => {
        let leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (leaf) {
          if (!checking) {
            this.uploadAllFile();
          }
          return true;
        }
        return false;
      },
    });
    
    this.addCommand({
      id: "Download all images",
      name: t("Download all images"),
      checkCallback: (checking: boolean) => {
        let leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (leaf) {
          if (!checking) {
            this.downloadAllImageFiles();
          }
          return true;
        }
        return false;
      },
    });

    this.setupPasteHandler();
    this.registerSelection();
  }

  registerSelection() {
    this.registerEvent(
      this.app.workspace.on(
        'editor-menu',
        (menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo) => {
          if (this.app.workspace.getLeavesOfType('markdown').length === 0) {
            return;
          }
          const selection = editor.getSelection();
          if (selection) {
            // 1. 检查是否为Markdown链接格式 ![]()
            const markdownRegex = /!\[.*\]\((.*)\)/g;
            const markdownMatch = markdownRegex.exec(selection);
            
            if (markdownMatch && markdownMatch.length > 1) {
              const markdownUrl = markdownMatch[1];
              // 检查是否为本地路径（不以http开头）
              if (!markdownUrl.startsWith('http')) {
                // 添加上传到图床的菜单项
                this.addMenu(menu, markdownUrl, editor);
              }
            } 
            // 2. 检查是否为Wiki链接格式 ![[...]] 或 [[...]]
            else {
              const wikiLinkRegex = /^!?\[\[(.*?)\]\]$/;
              const wikiLinkMatch = wikiLinkRegex.exec(selection);
              
              if (wikiLinkMatch && wikiLinkMatch.length > 1) {
                const wikiLinkPath = wikiLinkMatch[1];
                // 检查是否为本地路径（不以http开头）
                if (!wikiLinkPath.startsWith('http')) {
                  // 添加上传到图床的菜单项
                  this.addMenu(menu, wikiLinkPath, editor);
                }
              }
            }
          }
        }
      )
    );
  }

  // 添加右键菜单项
  addMenu(menu: Menu, imageUrl: string, editor: Editor) {
    menu.addItem((item) => {
      item
        .setTitle(t('Upload Image'))
        .setIcon('upload')
        .onClick(async () => {
          const file = resolveImageFile(this.app, imageUrl);
          if (!file) {
            error(t('Could not find image file')+':'+imageUrl);
            new Notice(t('Could not find image file'));
            return;
          }
          const result = await this.uploader.uploadSingleFile(file.path);
          if (result?.success && result?.url) {
            new Notice(t('Upload success'));
            editor.replaceSelection(`![](${result.url})`);
          } else {
            error(t('Upload failed')+':'+result?.msg);
            new Notice(t('Upload failed Notice'));
          }
        });
    });
  }

  async downloadAllImageFiles() {
    const fileArray = this.helper.getAllFiles();
    const folderPathAbs = this.getAttachmentFolderPath();

    if (!folderPathAbs) {
      new Notice(t('Could not get attachment folder path'));
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
        warn(t('Skipped file with no extension')+':'+url);
        continue;
      }

      // 校验扩展名合法性
      const ext = match[1].toLowerCase();
      const allowedExts = [
        "png", "jpg", "jpeg", "gif", "bmp",
        "webp", "svg", "tiff", "avif"
      ];
      if (!allowedExts.includes(ext)) {
        skipped++;
        warn(t('Skipped file with unsupported image type')+':'+ext);
        continue;
      }

      // 生成安全文件名
      let asset = getUrlAsset(url);
      asset = decodeURI(asset).replaceAll(/[\\/:\*\?"<>|]/g, "-");

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
        new Notice(t('Download failed Notice'));
        error(t('Download failed') + ':' + err);
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
      t('downloadReport', {
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
  
  /**
   * 下载带扩展名的远程图片并保存到 vault
   */
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
        warn(t('Skipped file with no extension')+':'+url);
        return { ok: false, msg: t('No file extension in URL') };
      }

      const ext = match[1].toLowerCase();

      // 确保扩展名是常见图片类型
      // 使用工具类中定义的图片扩展名列表，去掉点号并转换为小写
      const allowedExts = IMAGE_EXT_LIST.map(ext => ext.slice(1).toLowerCase());
      if (!allowedExts.includes(ext)) {
        warn(t('Skipped file with unsupported image type')+':'+ext);
        return { ok: false, msg: t('Unsupported image type')+':'+ext };
      }

      // 文件名清理
      const safeName = decodeURI(filename).replace(/[\\/:\*\?"<>|]/g, '-');
      const savePath = `${folderPath}/${safeName}.${ext}`;

      // 写入 vault
      const arrayBuffer = response.arrayBuffer;
      await this.app.vault.createBinary(savePath, arrayBuffer, {
        ctime: Date.now(),
        mtime: Date.now(),
      });

      return { ok: true, msg: 'ok', path: savePath };
    } catch (err: any) {
      error(t('Download failed')+':'+err);
      return { ok: false, msg: err?.message || t('Download exception') };
    }
  }

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
  getFile(fileName: string, fileMap: any) {
    if (!fileMap) {
      fileMap = arrayToObject(this.app.vault.getFiles(), 'name');
    }
    return fileMap[fileName];
  }
  // uploda all file
  async uploadAllFile() {
    let content = this.helper.getValue();
    const activeFIle = this.app.workspace.getActiveFile();

    if (!activeFIle) {
      new Notice(t('Please open a file first'));
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

        file = this.app.vault.getAbstractFileByPath(absoPath) as TFile;
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
      new Notice(t('No image files parsed'));
      return;
    }

    new Notice(t('uploadStart', { count: imageList.length }));

    try {
      const concurrency = parseInt(this.settings.concurrencyMode);
      const res = await this.uploader.uploadWithLimit(
        imageList.map(item => item.obspath),
        concurrency
      );

      if (!res.success) {
        new Notice(t('Some image uploads failed'));
        warn(t('Some image uploads failed') + ':', res.msg);
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
          if(fileDel) await this.app.vault.delete(fileDel);
        }
      }

    new Notice(t('uploadComplete'));
    } catch (error) {
      new Notice(t('uploadFailed'));
      error(t('uploadFailed') + ':', error);
      new Notice(t('uploadFailedNotice'));
    }
  }

  setupPasteHandler() {
    this.registerEvent(
      this.app.workspace.on(
        'editor-paste',
        (evt: ClipboardEvent, editor: Editor, markdownView: MarkdownView) => {
          const allowUpload = this.helper.getFrontmatterValue(
            'image-auto-upload',
            this.settings.uploadByClipSwitch
          );

          let files = evt.clipboardData.files;
          if (!allowUpload) {
            return;
          }
          // 剪贴板内容有md格式的图片时
          if (this.settings.workOnNetWork) {
            const clipboardValue = evt.clipboardData.getData('text/plain');
            const imageList = this.helper
              .getImageLink(clipboardValue)
              .filter(image => image.path.startsWith('http'))
              .filter(
                image =>
                  !this.helper.hasBlackDomain(
                    image.path,
                    this.settings.newWorkBlackDomains
                  )
              );

            if (imageList.length !== 0) {
              this.uploader
                .uploadFiles(imageList.map(item => item.path))
                .then(res => {
                  let value = this.helper.getValue();
                  if (res.success) {
                    let uploadUrlList = res.result;
                    imageList.map(item => {
                      const uploadImage = uploadUrlList.shift();
                      value = value.replaceAll(
                        item.source,
                        `![${item.name}${this.settings.imageSizeSuffix || ''
                        }](${uploadImage})`
                      );
                    });
                    this.helper.setValue(value);
                    const uploadUrlFullResultList = res.result || [];
                    this.settings.uploadedImages = [
                      ...(this.settings.uploadedImages || []),
                      ...uploadUrlFullResultList,
                    ];
                    this.saveSettings();
                  } else {
                    new Notice(t('uploadError'));
                  }
                });
            }
          }

          // 剪贴板中是图片时进行上传
          if (this.canUpload(evt.clipboardData)) {
            this.uploadFileAndEmbedImgurImage(
              editor,
              async (editor: Editor, pasteId: string) => {
                let res = await this.uploader.uploadFromClipboard(evt);
                if (!res.success) {
                  this.handleFailedUpload(editor, pasteId, res.msg);
                  return;
                }
                const url = res.url || '';
                const uploadUrlFullResultList = res.result || [];
                this.settings.uploadedImages = [
                  ...(this.settings.uploadedImages || []),
                  ...uploadUrlFullResultList,
                ];
                await this.saveSettings();
                return url;
              },
              evt.clipboardData
            ).catch();
            evt.preventDefault();
          }
        }
      )
    );
    this.registerEvent(
      this.app.workspace.on(
        'editor-drop',
        async (evt: DragEvent, editor: Editor, markdownView: MarkdownView) => {
          const allowUpload = this.helper.getFrontmatterValue(
            'image-auto-upload',
            this.settings.uploadByClipSwitch
          );
          let files = evt.dataTransfer.files;
          if (!allowUpload) {
            return;
          }

          if (files.length !== 0 && files[0].type.startsWith('image')) {
            let files = evt.dataTransfer.files;
            evt.preventDefault();

            const data = await this.uploader.uploadFiles(Array.from(files));

            if (data.success) {
              const uploadUrlFullResultList = data.result ?? [];
              this.settings.uploadedImages = [
                ...(this.settings.uploadedImages ?? []),
                ...uploadUrlFullResultList,
              ];
              this.saveSettings();
              data.result.map((value: string) => {
                let pasteId = (Math.random() + 1).toString(36).substring(2, 7);
                this.insertTemporaryText(editor, pasteId);
                this.embedMarkDownImage(editor, pasteId, value, files[0].name);
              });
            } else {
              new Notice(t('uploadError'));
            }
          }
        }
      )
    );
  }

  canUpload(clipboardData: DataTransfer) {
    this.settings.applyImage;
    const files = clipboardData.files;
    const text = clipboardData.getData('text');

    const hasImageFile =
      files.length !== 0 && files[0].type.startsWith('image');
    if (hasImageFile) {
      if (!!text) {
        return this.settings.applyImage;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  async uploadFileAndEmbedImgurImage(
    editor: Editor,
    callback: Function,
    clipboardData: DataTransfer
  ) {
    let pasteId = (Math.random() + 1).toString(36).substring(2, 7);
    this.insertTemporaryText(editor, pasteId);
    const name = clipboardData.files[0].name;
    try {
      const url = await callback(editor, pasteId);
      this.embedMarkDownImage(editor, pasteId, url, name);
    } catch (e) {
      this.handleFailedUpload(editor, pasteId, e);
    }
  }

  insertTemporaryText(editor: Editor, pasteId: string) {
    let progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
    editor.replaceSelection(progressText + '\n');
  }

  private static progressTextFor(id: string) {
    return t('uploading') + id;
  }

  embedMarkDownImage(
    editor: Editor,
    pasteId: string,
    imageUrl: any,
    name: string = ""
  ) {
    let progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
    let markDownImage = `![](${imageUrl})`;

    imageAutoUploadPlugin.replaceFirstOccurrence(
      editor,
      progressText,
      markDownImage
    );
  }

  handleFailedUpload(editor: Editor, pasteId: string, reason: any) {
    new Notice(t(reason));
    error(t('Failed request') + ': ' + reason);
    let progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
    imageAutoUploadPlugin.replaceFirstOccurrence(
      editor,
      progressText,
      t('uploadFailedNotice')
    );
  }

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