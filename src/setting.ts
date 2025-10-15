/**
 * 设置模块
 * 定义插件的设置接口、默认值和设置面板
 */
import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import imageAutoUploadPlugin from "./main";
import { t } from "./lang/helpers";

/**
 * 插件设置接口
 * 定义所有可配置的插件选项
 */
export interface PluginSettings {
  _debug: boolean;                // 调试模式，用于开发和测试
  uploadByClipSwitch: boolean;    // 启用/禁用剪贴板自动上传
  uploadServer: string;           // LskyPro服务器地址
  token: string;                  // 认证令牌
  storage_id: string;             // 存储ID（V2版本）
  strategy_id: string;            // 策略ID（V1版本）
  imageSizeSuffix: string;        // 图片尺寸后缀
  uploader: string;               // 上传器类型（V1或V2）
  workOnNetWork: boolean;         // 是否处理网络图片
  newWorkBlackDomains: string;    // 网络黑名单域名
  fixPath: boolean;               // 修复路径
  applyImage: boolean;            // 应用图片处理
  deleteSource: boolean;          // 上传后删除源文件
  concurrencyMode: string;        // 并发模式（1、3、5）
  [propName: string]: any;        // 允许其他动态属性
}

/**
 * 默认设置值
 * 当用户首次安装插件时使用
 */
export const DEFAULT_SETTINGS: PluginSettings = {
  _debug: false,                  // 默认禁用调试模式
  uploadByClipSwitch: true,       // 默认启用剪贴板自动上传
  uploader: "LskyPro-V2",         // 默认使用V2版本上传器
  token: "",                     // 默认空令牌
  storage_id:"",                 // 默认空存储ID
  strategy_id: "",               // 默认空策略ID
  uploadServer: "https://lsky.xxxx", // 默认服务器地址示例
  imageSizeSuffix: "",           // 默认无尺寸后缀
  workOnNetWork: false,           // 默认不处理网络图片
  fixPath: false,                 // 默认不修复路径
  applyImage: true,               // 默认应用图片处理
  newWorkBlackDomains: "",       // 默认无黑名单域名
  deleteSource: false,            // 默认不删除源文件
  concurrencyMode: "3",           // 默认中等并发模式
}

/**
 * 设置面板类
 * 负责创建和管理插件的设置界面
 */
export class SettingTab extends PluginSettingTab {
  plugin: imageAutoUploadPlugin;   // 插件实例引用

  /**
   * 构造函数
   * @param app Obsidian应用实例
   * @param plugin 插件实例
   */
  constructor(app: App, plugin: imageAutoUploadPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /**
   * 显示设置面板
   * 创建并渲染所有设置项
   */
  display(): void {
    let { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: t("Plugin Settings") });
    
    // 剪贴板自动上传设置
    new Setting(containerEl)
      .setName(t("Auto upload from clipboard"))
      .setDesc(
        t("Auto upload clipboard description")
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
      .setDesc(t("Default uploader description"))
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
      .setName(t("LskyPro server domain"))
      .setDesc(t("LskyPro server domain description"))
      .addText(text =>
        text
          .setPlaceholder(t("Please input LskyPro server domain"))
          .setValue(this.plugin.settings.uploadServer)
          .onChange(async key => {
            this.plugin.settings.uploadServer = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新域名
            this.plugin.reinitUploader();
          })
      );
      new Setting(containerEl)
      .setName(t("LskyPro Token"))
      .setDesc(t("LskyPro Token description"))
      .addText(text =>
        text
          .setPlaceholder(t("Please input LskyPro Token"))
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
      .setName(t("LskyPro Storage ID"))
      .setDesc(t("LskyPro v2 Storage ID description"))
      .addText(text =>
        text
          .setPlaceholder(t("Please input LskyPro Storage ID"))
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
      .setName(t("LskyPro Strategy ID（optional）"))
      .setDesc(t("LskyPro v1 Strategy ID description"))
      .addText(text =>
        text
          .setPlaceholder(t("Please input LskyPro Strategy ID"))
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
      .setDesc(t("Advanced clipboard upload description"))
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
      .setDesc(t("Delete source file Description"))
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.deleteSource)
          .onChange(async value => {
            this.plugin.settings.deleteSource = value;
            this.display();
            await this.plugin.saveSettings();
          })
      );

      new Setting(containerEl)
      .setName(t("Upload concurrency"))
      .setDesc(t("Upload concurrency description"))
      .addDropdown((cb) =>
        cb
          .addOption("1", t("Single)"))
          .addOption("3", t("Medium"))
          .addOption("5", t("High"))
          .setValue(this.plugin.settings.concurrencyMode || "3")
          .onChange(async (value) => {
            this.plugin.settings.concurrencyMode = value;
            await this.plugin.saveSettings();
            new Notice(t(`Concurrency mode switched to ${value}`));
          })
      );

    
  }
}
