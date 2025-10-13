import { App, PluginSettingTab, Setting } from "obsidian";
import imageAutoUploadPlugin from "./main";
import { t } from "./lang/helpers";

export interface PluginSettings {
  uploadByClipSwitch: boolean;
  uploadServer: string;
  token: string;
  storage_id: string;
  strategy_id: string; // 为v1版本添加的字段
  imageSizeSuffix: string;
  uploader: string;
  workOnNetWork: boolean;
  newWorkBlackDomains: string;
  fixPath: boolean;
  applyImage: boolean;
  deleteSource: boolean;
  [propName: string]: any;
}

export const DEFAULT_SETTINGS: PluginSettings = {
  uploadByClipSwitch: true,
  uploader: "LskyPro-V2",
  token: "",
  storage_id:"",
  strategy_id: "", // v1版本的默认存储ID
  uploadServer: "https://lsky.xxxx",
  imageSizeSuffix: "",
  workOnNetWork: false,
  fixPath: false,
  applyImage: true,
  newWorkBlackDomains: "",
  deleteSource: false,
}

export class SettingTab extends PluginSettingTab {
  plugin: imageAutoUploadPlugin;

  constructor(app: App, plugin: imageAutoUploadPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: t("Plugin Settings") });
    new Setting(containerEl)
      .setName(t("Auto pasted upload"))
      .setDesc(
        "启用该选项后，黏贴图片时会自动上传到lsky图床"
      )
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.uploadByClipSwitch)
          .onChange(async value => {
            this.plugin.settings.uploadByClipSwitch = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("Default uploader"))
      .setDesc(t("Default uploader"))
      .addDropdown(cb =>
          cb
            .addOption("LskyPro-V2", "LskyPro v2")
            .addOption("LskyPro-V1", "LskyPro v1")
            .setValue(this.plugin.settings.uploader)
            .onChange(async value => {
              this.plugin.settings.uploader = value;
              this.display();
              await this.plugin.saveSettings();
              // 重新初始化上传器以应用新版本
              this.plugin.reinitUploader();
            })
        );

    // 无论选择哪个版本，都显示基本设置
      new Setting(containerEl)
      .setName("LskyPro 域名")
      .setDesc("LskyPro 域名（不需要填写完整的API路径）")
      .addText(text =>
        text
          .setPlaceholder("请输入LskyPro 域名")
          .setValue(this.plugin.settings.uploadServer)
          .onChange(async key => {
            this.plugin.settings.uploadServer = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新域名
            this.plugin.reinitUploader();
          })
      );
      new Setting(containerEl)
      .setName("LskyPro Token")
      .setDesc("LskyPro Token")
      .addText(text =>
        text
          .setPlaceholder("请输入LskyPro Token")
          .setValue(this.plugin.settings.token)
          .onChange(async key => {
            this.plugin.settings.token = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新Token
            this.plugin.reinitUploader();
          })
      );
      
    // 根据版本显示对应的存储ID设置
    if (this.plugin.settings.uploader === "LskyPro-V2") {
      new Setting(containerEl)
      .setName("LskyPro Storage ID")
      .setDesc("LskyPro v2版本的存储ID")
      .addText(text =>
        text
          .setPlaceholder("请输入LskyPro Storage ID")
          .setValue(this.plugin.settings.storage_id)
          .onChange(async key => {
            this.plugin.settings.storage_id = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新存储ID
            this.plugin.reinitUploader();
          })
      );
    } else if (this.plugin.settings.uploader === "LskyPro-V1") {
      new Setting(containerEl)
      .setName("LskyPro Strategy ID（可选）")
      .setDesc("LskyPro v1版本的储存策略ID（可选）")
      .addText(text =>
        text
          .setPlaceholder("请输入LskyPro Strategy ID")
          .setValue(this.plugin.settings.strategy_id)
          .onChange(async key => {
            this.plugin.settings.strategy_id = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新策略ID
            this.plugin.reinitUploader();
          })
      );
    }


    new Setting(containerEl)
      .setName(t("Image size suffix"))
      .setDesc(t("Image size suffix Description"))
      .addText(text =>
        text
          .setPlaceholder(t("Please input image size suffix"))
          .setValue(this.plugin.settings.imageSizeSuffix)
          .onChange(async key => {
            this.plugin.settings.imageSizeSuffix = key;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("Work on network"))
      .setDesc(t("Work on network Description"))
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.workOnNetWork)
          .onChange(async value => {
            this.plugin.settings.workOnNetWork = value;
            this.display();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("Network Domain Black List"))
      .setDesc(t("Network Domain Black List Description"))
      .addTextArea(textArea =>
        textArea
          .setValue(this.plugin.settings.newWorkBlackDomains)
          .onChange(async value => {
            this.plugin.settings.newWorkBlackDomains = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("Upload when clipboard has image and text together"))
      .setDesc(
        t(
          "When you copy, some application like Excel will image and text to clipboard, you can upload or not."
        )
      )
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.applyImage)
          .onChange(async value => {
            this.plugin.settings.applyImage = value;
            this.display();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("Delete source file after you upload file"))
      .setDesc(t("Delete source file in ob assets after you upload file."))
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.deleteSource)
          .onChange(async value => {
            this.plugin.settings.deleteSource = value;
            this.display();
            await this.plugin.saveSettings();
          })
      );
  }
}
