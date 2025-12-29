// 简体中文 — LskyPro Upload V2 插件语言包
// =================================================
// 用于插件 UI、日志与通知的简体中文文本。
// =================================================

export default {
  /* ===============================
   * 主要命令与提示
   * =============================== */
  "main.unknownUploaderVersion": "未知的上传器版本",
  "main.uploadAllImages": "上传所有图片",
  "main.downloadAllImages": "下载所有图片",
  "main.uploadImage": "上传图片",
  "main.fileNotFound": "找不到图片文件",
  "main.noAttachmentFolder": "无法获取附件文件夹路径",
  "main.openFileFirst": "请先打开一个文件",
  "main.noImageParsed": "未解析到任何图片文件",
  "main.networkUploadError": "网络图片上传失败",
  "main.failedRequest": "请求失败",
  "main.uploadStart": "已发现 {{count}} 张图片，开始上传",
  "main.pasteNetworkImages": "检测到 {{count}} 张网络图片，开始上传",
  "main.autoUploadClipboardDisabled": "自动上传剪贴板已禁用",
  "main.autoUploadAttachmentsDisabled": "自动上传附件已禁用",
  "main.debugMode": "调试模式已启用",
  "main.updateSettings": "更新设置",
  "main.uploadRawFile": "上传原始文件",
  "main.uploadSingleFile": "上传单文件",
  "main.uploadFiles": "上传多文件",
  "main.uploadWithLimit": "上传带并发限制",
  "main.uploadFromClipboard": "从剪贴板上传",
  "main.languageSet": "语言设置为:",
  "main.languageInitFailed": "语言初始化失败:",
  "main.uploaderInit": "上传器初始化完成",
  "main.pluginLoaded": "插件加载成功",
  "main.debugEnabled": "调试模式已启用",
  "main.notafile": "解析路径成功但不是文件:",

  /* ===============================
   * Helper 工具
   * =============================== */
  "helper.getAllFiles.start": "开始获取所有图片文件",
  "helper.getAllFiles.noEditor": "未找到编辑器实例",
  "helper.getAllFiles.complete": "获取完成，共返回 {{count}} 个图片",
  "helper.getImageLink.start": "开始提取图片链接",
  "helper.getImageLink.complete": "提取完成，共找到 {{count}} 个图片链接",

  /* ===============================
   * 下载流程
   * =============================== */
  "download.failed": "下载失败",
  "download.failedNotice": "下载失败，请查看控制台获取详细信息",
  "download.noExtension": "URL 中缺少文件扩展名",
  "download.unsupportedType": "不支持的图片类型",
  "download.exception": "下载异常",
  "download.report": [
    "检测到网络图片：{{count}}",
    "成功下载：{{success}}",
    "已跳过：{{skipped}}",
    "下载失败：{{failed}}",
  ].join("\n"),
  "download.debug.startAll": "开始下载所有图片",
  "download.debug.replaceReferences":
    "开始替换 Markdown 图片引用: {{count}} 个图片",
  "download.debug.originalContentLength":
    "原始 Markdown 内容长度: {{length}} 字符",
  "download.debug.replaceSuccess":
    "替换图片引用 [ {{index}} / {{total}} ]: {{source}} → {{target}}",
  "download.debug.replaceFailed":
    "未找到匹配项 [ {{index}} / {{total}} ]: {{source}}",
  "download.debug.updateComplete":
    "Markdown 内容更新完成，共替换 {{count}} 个图片引用",
  "download.debug.updatedContentLength":
    "更新后 Markdown 内容长度: {{length}} 字符",
  "download.debug.report":
    "下载报告 - 总数: {{count}}, 成功: {{success}}, 跳过: {{skipped}}, 失败: {{failed}}",
  "download.debug.exception": "下载异常: {{url}} {{error}}",
  "download.debug.start": "开始下载图片: {{url}}",
  "download.debug.folderPath": "文件夹路径: {{path}}",
  "download.debug.originalFilename": "原始文件名: {{filename}}",
  "download.debug.responseStatus": "HTTP 响应状态码: {{status}}",
  "download.debug.downloadFailed": "下载失败: {{message}}",
  "download.debug.safeFilename": "清理后的文件名: {{filename}}",
  "download.debug.failed": "下载失败: {{error}}",
  "download.debug.savePath": "保存路径: {{path}}",
  "download.debug.success": "图片保存成功: {{path}}",
  "download.debug.pathConditions": "路径条件判断 - folderPath: {{folderPath}}",
  "download.debug.pathConditionCheck":
    "folderPath === '{{condition}}': {{result}}",
  "download.debug.pathConditionLength": "folderPath.length: {{length}}",
  "download.debug.pathConditionChar": "folderPath.charCodeAt(0): {{code}}",
  "download.debug.rootPathHandling":
    "根目录/空目录处理，直接使用文件名: {{path}}",
  "download.debug.nonRootPathHandling": "非根目录处理，构建完整路径: {{path}}",
  "download.debug.finalSavePath": "最终保存路径: {{path}}",
  "download.debug.responseSize": "响应数据大小: {{size}} 字节",
  "download.debug.saveSuccess": "图片保存成功: {{path}}",
  "download.debug.downloadException": "下载异常: {{message}}",

  /* ===============================
   * 附件路径
   * =============================== */
  "attachmentPath.debug.original": "原始assetFolder: {{path}}",
  "attachmentPath.debug.noActiveFile": "未找到活动文件",
  "attachmentPath.debug.activeFile": "活动文件: {{path}}",
  "attachmentPath.debug.activeFileParent": "活动文件父目录: {{path}}",
  "attachmentPath.debug.emptyAssetFolder":
    "assetFolder为空，返回活动文件父目录: {{path}}",
  "attachmentPath.debug.removeDotSlash": "移除./后的相对路径: {{path}}",
  "attachmentPath.debug.emptyRelativePath":
    "相对路径为空，返回父目录: {{path}}",
  "attachmentPath.debug.fullPath": "最终返回路径: {{path}}",
  "attachmentPath.debug.final": "最终附件路径: {{path}}",

  /* ===============================
   * 上传流程
   * =============================== */
  "upload.start": "已发现 {{count}} 张图片，开始上传",
  "upload.complete": "图片上传完成",
  "upload.failed": "图片上传失败",
  "upload.failedNotice": "上传过程中发生错误，请查看控制台日志",
  "upload.someFailed": "部分图片上传失败",
  "upload.error": "上传错误",
  "upload.uploading": "正在上传文件…",
  "upload.progress": "上传进度",
  "upload.httpError": "HTTP 错误",
  "upload.success": "上传成功",
  "upload.failedShort": "上传失败",
  "upload.requestException": "上传请求异常",
  "upload.invalidPath": "无效的文件路径",
  "upload.batchFailed": "批量上传失败",
  "upload.clipboardEmpty": "剪贴板中未发现图片文件",
  "upload.clipboardFailed": "从剪贴板上传图片失败",
  "upload.exception": "上传异常",
  "upload.v2.storageIdRequired": "LskyPro v2 需要配置存储 ID",
  "upload.allFiles": "上传所有文件",

  // 上传结果汇总
  "upload.summary.completed":
    "上传完成（成功 {{successCount}} / 共 {{total}}，失败 {{failedCount}}）",
  "upload.summary.allCompleted": "全部图片上传成功，共上传 {{total}} 张",
  "upload.debug.requestBody": "上传请求体",
  "upload.debug.responseStatus": "上传响应状态码: {{status}}",
  "upload.debug.responseBody": "上传响应体",
  "upload.debug.errorMessage": "上传错误信息: {{message}}",
  "upload.debug.stackTrace": "上传错误堆栈信息",
  "upload.debug.errorDetails": "上传错误详细信息",

  /* ===============================
   * 响应与验证
   * =============================== */
  "response.empty": "响应内容为空",
  "response.parseFailed": "响应解析失败（非 JSON 格式）",
  "response.unsupportedType": "不支持的图片类型",
  "response.noExtensionInUrl": "URL 中无文件扩展名",
  "response.downloadException": "下载异常",
  "response.someFailed": "部分文件上传失败",
  "response.success": "上传成功",
  "response.failed": "上传失败",

  /* ===============================
   * 设置面板
   * =============================== */
  "settings.title": "插件设置",

  // 一般上传行为
  "settings.autoUploadClipboard": "自动上传剪贴板图片",
  "settings.autoUploadClipboard.desc": "当剪贴板中有图片时自动上传",
  "settings.autoUploadAttachments": "自动上传附件",
  "settings.autoUploadAttachments.desc": "当新附件添加到库中时自动上传",

  // 上传器配置
  "settings.defaultUploader": "默认上传器",
  "settings.defaultUploader.desc": "选择默认上传接口（LskyPro v1 / v2）",
  "settings.serverDomain": "LskyPro 服务器域名",
  "settings.serverDomain.desc": "填写 LskyPro 服务器域名（不含 API 路径）",
  "settings.serverDomain.placeholder": "https://example.com",
  "settings.token": "LskyPro Token",
  "settings.token.desc": "LskyPro 身份验证所需的 API Token",
  "settings.token.placeholder": "在此填写你的 API Token",
  "settings.storageId": "LskyPro 存储 ID",
  "settings.storageId.desc": "LskyPro v2 的存储 ID",
  "settings.storageId.placeholder": "Storage ID",
  "settings.strategyId": "LskyPro 策略 ID（可选）",
  "settings.strategyId.desc": "LskyPro v1 的策略 ID",
  "settings.strategyId.placeholder": "Strategy ID",

  // 网络图片处理
  "settings.workOnNetwork": "处理网络图片",
  "settings.workOnNetwork.desc": "检测并重新上传远程图片",
  "settings.blacklist": "网络域名黑名单",
  "settings.blacklist.desc": "用逗号分隔需要排除的域名",

  // 剪贴板混合内容
  "settings.clipboardMixed": "当剪贴板同时有图片与文字时上传",
  "settings.clipboardMixed.desc": "处理含文本和图片的混合剪贴板内容",

  // 源文件清理
  "settings.deleteSource": "上传成功后删除源文件",
  "settings.deleteSource.desc": "上传成功后移除原文件",

  // 并发控制
  "settings.concurrency": "上传并发数量",
  "settings.concurrency.desc":
    "并行上传任务数量，可根据网络速度和图床性能调整。",
  "settings.concurrency.low": "低",
  "settings.concurrency.medium": "中",
  "settings.concurrency.high": "高",
  "settings.concurrency.switched": "并发模式已切换为",

  // 语言设置
  "settings.language": "语言",
  "settings.language.desc": "选择插件语言。“自动”将跟随 Obsidian 的界面语言。",
  "settings.language.switched": "语言已切换为",
  "settings.language.failed": "语言切换失败",

  // 调试模式
  "settings.debugMode": "调试模式",
  "settings.debugMode.desc": "启用上传请求和错误的详细调试日志",
  "settings.debugMode.enabled": "调试模式已启用",
  "settings.debugMode.disabled": "调试模式已禁用",

  // 忽略 SSL 错误
  "settings.ignoreSSL": "忽略 SSL 错误",
  "settings.ignoreSSL.desc": "在连接服务器时忽略 SSL 错误",

  // 设置标签
  "setting.updateConfig": "更新配置:",
  "setting.uploadByClipSwitch": "自动上传剪贴板图片",
  "setting.uploadAttachmentsSwitch": "自动上传附件",
  "setting.uploader": "API版本",
  "setting.token": "API密钥",
  "setting.storage_id": "存储 ID",
  "setting.strategy_id": "策略 ID",
  "setting.uploadServer": "服务器地址",
  "setting.workOnNetWork": "处理网络图片",
  "setting.newWorkBlackDomains": "网络域名黑名单",
  "setting.deleteSource": "上传成功后删除源文件",
  "setting.concurrencyMode": "上传并发",

  /* ===============================
   * i18n 国际化
   * =============================== */
  "i18n.debug.autoMode": "自动模式 -> Obsidian 语言: {{locale}}",
  "i18n.debug.switchLanguage": "切换到语言: {{language}}",
  "i18n.debug.activeLocale": "当前激活语言: {{locale}}",
  "i18n.debug.loadedLocales": "已加载语言: {{locales}}",
};
