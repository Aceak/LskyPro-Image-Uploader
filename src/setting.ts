/**
 * 设置模块
 * 定义插件的设置接口、默认值和设置面板
 */
import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import imageAutoUploadPlugin from "./main";
import { t, languageName, TranslationKeys } from "./lang/i18n";
import { error, dbg } from "./utils";

/**
 * 插件设置接口
 * 定义所有可配置的插件选项
 */
export interface PluginSettings {
  _debug: boolean;                // 调试模式，用于开发和测试
  uploadByClipSwitch: boolean;    // 启用/禁用剪贴板自动上传
  uploadAttachmentsSwitch: boolean; // 启用/禁用附件自动上传
  uploadServer: string;           // LskyPro服务器地址
  token: string;                  // 认证令牌
  storage_id: string;             // 存储ID（V2版本）
  strategy_id: string;            // 策略ID（V1版本）
  uploader: string;               // 上传器类型（V1或V2）
  workOnNetWork: boolean;         // 是否处理网络图片
  newWorkBlackDomains: string;    // 网络黑名单域名
  deleteSource: boolean;          // 上传后删除源文件
  concurrencyMode: ConcurrencyLevel;        // 并发模式（1、3、5）
  language: string;               // 语言设置（Auto、zh-cn、en）
  uploadedImages?: string[];
}

/**
 * 默认设置值
 * 当用户首次安装插件时使用
 */
export const DEFAULT_SETTINGS: PluginSettings = {
  _debug: false,                  // 默认禁用调试模式
  uploadByClipSwitch: true,       // 默认启用剪贴板自动上传
  uploadAttachmentsSwitch: true,  // 默认启用附件自动上传
  uploader: "LskyPro-v2",         // 默认使用V2版本上传器
  token: "",                     // 默认空令牌
  storage_id:"",                 // 默认空存储ID
  strategy_id: "",               // 默认空策略ID
  uploadServer: "https://lsky.xxxx", // 默认服务器地址示例
  workOnNetWork: false,           // 默认不处理网络图片
  newWorkBlackDomains: "",        // 默认无黑名单域名
  deleteSource: false,            // 默认不删除源文件
  concurrencyMode: "medium",      // 默认中等并发模式
  language: "auto",               // 默认自动语言
}

export const getSettingLabel = (key: keyof PluginSettings): string => {
  const map: Partial<Record<keyof PluginSettings, string>> = {
    uploader: t("setting.uploader"),
    uploadServer: t("setting.uploadServer"),
    token: t("setting.token"),
    storage_id: t("setting.storage_id"),
    strategy_id: t("setting.strategy_id"),
    uploadAttachmentsSwitch: t("setting.uploadAttachmentsSwitch"),
    uploadByClipSwitch: t("setting.uploadByClipSwitch"),
    newWorkBlackDomains: t("setting.newWorkBlackDomains"),
    deleteSource: t("setting.deleteSource"),
    concurrencyMode: t("setting.concurrencyMode"),
    workOnNetWork: t("setting.workOnNetWork"),
  };
  return map[key];
};

export type ConcurrencyLevel = "low" | "medium" | "high";

export const ConcurrencyMap: Record<ConcurrencyLevel, number> = {
  low: 1,
  medium: 3,
  high: 5,
};

export const concurrencyKeys: Record<ConcurrencyLevel, TranslationKeys> = {
  low: "settings.concurrency.low",
  medium: "settings.concurrency.medium",
  high: "settings.concurrency.high",
};

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
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName(t('settings.title'))
      .setHeading();
    
    // 剪贴板自动上传设置
    new Setting(containerEl)
      .setName(t('settings.autoUploadClipboard'))
      .setDesc(t('settings.autoUploadClipboard.desc'))
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.uploadByClipSwitch)
          .onChange(async value => {
            this.plugin.settings.uploadByClipSwitch = value;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新设置
            this.plugin.uploader?.updateSetting("uploadByClipSwitch", value);
          })
      );

    new Setting(containerEl)
      .setName(t('settings.autoUploadAttachments'))
      .setDesc(t('settings.autoUploadAttachments.desc'))
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.uploadAttachmentsSwitch)
          .onChange(async value => {
            this.plugin.settings.uploadAttachmentsSwitch = value;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新设置
            this.plugin.uploader?.updateSetting("uploadAttachmentsSwitch", value);
          })
      );
    
    new Setting(containerEl)
      .setName(t('settings.defaultUploader'))
      .setDesc(t('settings.defaultUploader.desc'))
      .addDropdown(cb =>
          cb
            .addOption('LskyPro-v2', 'V2')
            .addOption('LskyPro-v1', 'V1')
            .setValue(this.plugin.settings.uploader)
            .onChange(async value => {
              this.plugin.settings.uploader = value;
              this.display();
              await this.plugin.saveSettings();
              // 重新初始化上传器以应用新版本
              this.plugin.uploader?.updateSetting("uploader", value);
            })
        );

    // 无论选择哪个版本，都显示基本设置
      new Setting(containerEl)
      .setName(t('settings.serverDomain'))
      .setDesc(t('settings.serverDomain.desc'))
      .addText(text =>
        text
          .setPlaceholder(t('settings.serverDomain.placeholder'))
          .setValue(this.plugin.settings.uploadServer)
          .onChange(async key => {
            this.plugin.settings.uploadServer = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新域名
            this.plugin.uploader?.updateSetting("uploadServer", key);
          })
      );
      new Setting(containerEl)
      .setName(t('settings.token'))
      .setDesc(t('settings.token.desc'))
      .addText(text =>
        text
          .setPlaceholder(t('settings.token.placeholder'))
          .setValue(this.plugin.settings.token)
          .onChange(async key => {
            this.plugin.settings.token = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新Token
            this.plugin.uploader?.updateSetting("token", key);
          })
      );
      
    // 根据版本显示对应的存储ID设置
    if (this.plugin.settings.uploader === 'LskyPro-V2') {
      new Setting(containerEl)
      .setName(t('settings.storageId'))
      .setDesc(t('settings.storageId.desc'))
      .addText(text =>
        text
          .setPlaceholder(t('settings.storageId.placeholder'))
          .setValue(this.plugin.settings.storage_id)
          .onChange(async key => {
            this.plugin.settings.storage_id = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新存储ID
            this.plugin.uploader?.updateSetting("storage_id", key);
          })
      );
    } else if (this.plugin.settings.uploader === 'LskyPro-V1') {
      new Setting(containerEl)
      .setName(t('settings.strategyId'))
      .setDesc(t('settings.strategyId.desc'))
      .addText(text =>
        text
          .setPlaceholder(t('settings.strategyId.placeholder'))
          .setValue(this.plugin.settings.strategy_id)
          .onChange(async key => {
            this.plugin.settings.strategy_id = key;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新策略ID
            this.plugin.uploader?.updateSetting("strategy_id", key);
          })
      );
    }



    new Setting(containerEl)
      .setName(t('settings.workOnNetwork'))
      .setDesc(t('settings.workOnNetwork.desc'))
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.workOnNetWork)
          .onChange(async value => {
            this.plugin.settings.workOnNetWork = value;
            this.display();
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新设置
            this.plugin.uploader?.updateSetting("workOnNetWork", value);
          })
      );

    new Setting(containerEl)
      .setName(t('settings.blacklist'))
      .setDesc(t('settings.blacklist.desc'))
      .addTextArea(textArea =>
        textArea
          .setValue(this.plugin.settings.newWorkBlackDomains)
          .onChange(async value => {
            this.plugin.settings.newWorkBlackDomains = value;
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新黑名单
            this.plugin.uploader?.updateSetting("newWorkBlackDomains", value);
          })
      );

    new Setting(containerEl)
      .setName(t('settings.deleteSource'))
      .setDesc(t('settings.deleteSource.desc'))
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.deleteSource)
          .onChange(async value => {
            this.plugin.settings.deleteSource = value;
            this.display();
            await this.plugin.saveSettings();
            // 重新初始化上传器以应用新设置
            this.plugin.uploader?.updateSetting("deleteSource", value);
          })
      );

    new Setting(containerEl)
      .setName(t('settings.concurrency'))
      .setDesc(t('settings.concurrency.desc'))
      .addDropdown(cb => {
        cb.addOption('low', t('settings.concurrency.low'));
        cb.addOption('medium', t('settings.concurrency.medium'));
        cb.addOption('high', t('settings.concurrency.high'));

        cb.setValue(this.plugin.settings.concurrencyMode || 'medium')
          .onChange(async (value: ConcurrencyLevel) => {
            this.plugin.settings.concurrencyMode = value;
            await this.plugin.saveSettings();

            const modeLabel = t(concurrencyKeys[value]);
            const message = `${t('settings.concurrency.switched')} ${modeLabel}`;

            new Notice(message);
            // 重新初始化上传器以应用新并发模式
            this.plugin.uploader?.updateSetting("concurrencyMode", value);
          });
      });

    new Setting(containerEl)
      .setName(t('settings.language'))
      .setDesc(t('settings.language.desc'))
      .addDropdown(dropdown => {
        dropdown
          .addOption('auto', 'Auto')
          .addOption('en', 'English')
          .addOption('zh-cn', '简体中文')
          .addOption('zh-tw', '繁體中文')
          .setValue(this.plugin.settings.language)
          .onChange(async (value: string) => {
            this.plugin.settings.language = value;
            await this.plugin.saveSettings();
            try {
              const { setLanguage } = await import('./lang/i18n');
              setLanguage(value.toLowerCase());
              dbg(t('settings.language.switched'), value);
              new Notice(t('settings.language.switched') + ' '  + languageName[value]);
              this.display(); 
            } catch (e) {
              new Notice(t('settings.language.failed'));
              error(t('settings.language.failed', + ':' + e));
            }
          });
      });

  }
}
