// 繁體中文 — LskyPro Upload V2 插件語言包
// =================================================
// 用於插件 UI、日誌與通知的繁体中文文本。
// =================================================

export default {
  /* ===============================
   * 主要命令與提示
   * =============================== */
  "main.unknownUploaderVersion": "未知的上傳器版本",
  "main.uploadAllImages": "上傳所有圖片",
  "main.downloadAllImages": "下載所有圖片",
  "main.uploadImage": "上傳圖片",
  "main.fileNotFound": "找不到圖片文件",
  "main.noAttachmentFolder": "無法取得附件資料夾路徑",
  "main.openFileFirst": "請先開啟一個文件",
  "main.noImageParsed": "未解析到任何圖片文件",
  "main.networkUploadError": "網絡圖片上傳失敗",
  "main.failedRequest": "請求失敗",
  "main.uploadStart": "已發現 {{count}} 張圖片，開始上傳",
  "main.pasteNetworkImages": "偵測到 {{count}} 張網絡圖片，開始上傳",
  "main.autoUploadClipboardDisabled": "自動上傳剪貼簿已停用",
  "main.autoUploadAttachmentsDisabled": "自動上傳附件已停用",

  /* ===============================
   * 下載流程
   * =============================== */
  "download.failed": "下載失敗",
  "download.failedNotice": "下載失敗，請查看控制台以獲取詳細資訊",
  "download.noExtension": "URL 中缺少文件副檔名",
  "download.unsupportedType": "不支援的圖片類型",
  "download.exception": "下載異常",
  "download.report": [
    "偵測到網絡圖片：{{count}}",
    "成功下載：{{success}}",
    "已略過：{{skipped}}",
    "下載失敗：{{failed}}"
  ].join("\n"),

  /* ===============================
   * 上傳流程
   * =============================== */
  "upload.start": "已發現 {{count}} 張圖片，開始上傳",
  "upload.complete": "圖片上傳完成",
  "upload.failed": "圖片上傳失敗",
  "upload.failedNotice": "上傳過程中發生錯誤，請查看控制台日誌",
  "upload.someFailed": "部分圖片上傳失敗",
  "upload.error": "上傳錯誤",
  "upload.uploading": "正在上傳文件…",
  "upload.progress": "上傳進度",
  "upload.httpError": "HTTP 錯誤",
  "upload.success": "上傳成功",
  "upload.failedShort": "上傳失敗",
  "upload.requestException": "上傳請求異常",
  "upload.invalidPath": "無效的文件路徑",
  "upload.batchFailed": "批量上傳失敗",
  "upload.clipboardEmpty": "剪貼簿中未發現圖片文件",
  "upload.clipboardFailed": "從剪貼簿上傳圖片失敗",
  "upload.exception": "上傳異常",

  // 上傳結果匯總
  "upload.summary.completed": "上傳完成（成功 {{successCount}} / 共 {{total}}，失敗 {{failedCount}}）",
  "upload.summary.allCompleted": "全部圖片上傳成功，共上傳 {{total}} 張",

  /* ===============================
   * 響應與驗證
   * =============================== */
  "response.empty": "回應內容為空",
  "response.parseFailed": "回應解析失敗（非 JSON 格式）",
  "response.unsupportedType": "不支援的圖片類型",
  "response.noExtensionInUrl": "URL 中無文件副檔名",
  "response.downloadException": "下載異常",
  "response.someFailed": "部分文件上傳失敗",
  "response.success": "上傳成功",
  "response.failed": "上傳失敗",

  /* ===============================
   * 設定面板
   * =============================== */
  "settings.title": "插件設定",

  // 一般上傳行為
  "settings.autoUploadClipboard": "自動上傳剪貼簿圖片",
  "settings.autoUploadClipboard.desc": "當剪貼簿中有圖片時自動上傳",
  "settings.autoUploadAttachments": "自動上傳附件",
  "settings.autoUploadAttachments.desc": "當新附件加入資料庫時自動上傳",

  // 上傳器設定
  "settings.defaultUploader": "預設上傳器",
  "settings.defaultUploader.desc": "選擇預設上傳接口（LskyPro v1 / v2）",
  "settings.serverDomain": "LskyPro 伺服器域名",
  "settings.serverDomain.desc": "填寫 LskyPro 伺服器域名（不含 API 路徑）",
  "settings.serverDomain.placeholder": "https://example.com",
  "settings.token": "LskyPro Token",
  "settings.token.desc": "LskyPro 驗證所需的 API Token",
  "settings.token.placeholder": "在此輸入你的 API Token",
  "settings.storageId": "LskyPro 儲存 ID",
  "settings.storageId.desc": "LskyPro v2 的儲存 ID",
  "settings.storageId.placeholder": "Storage ID",
  "settings.strategyId": "LskyPro 策略 ID（可選）",
  "settings.strategyId.desc": "LskyPro v1 的策略 ID",
  "settings.strategyId.placeholder": "Strategy ID",

  // 網絡圖片處理
  "settings.workOnNetwork": "處理網絡圖片",
  "settings.workOnNetwork.desc": "偵測並重新上傳遠端圖片",
  "settings.blacklist": "網域黑名單",
  "settings.blacklist.desc": "以逗號分隔要排除的網域",

  // 剪貼簿混合內容
  "settings.clipboardMixed": "當剪貼簿同時有圖片與文字時上傳",
  "settings.clipboardMixed.desc": "處理包含文字與圖片的混合剪貼簿內容",

  // 原檔清理
  "settings.deleteSource": "上傳成功後刪除原文件",
  "settings.deleteSource.desc": "上傳成功後移除原文件",

  // 並發控制
  "settings.concurrency": "上傳並發數量",
  "settings.concurrency.desc": "並行上傳任務數量，可依網速與圖床效能調整。",
  "settings.concurrency.low": "低",
  "settings.concurrency.medium": "中",
  "settings.concurrency.high": "高",
  "settings.concurrency.switched": "並發模式已切換為",

  // 語言設定
  "settings.language": "語言",
  "settings.language.desc": "選擇插件語言。“自動”將跟隨 Obsidian 的介面語言。",
  "settings.language.switched": "語言已切換為",
  "settings.language.failed": "語言切換失敗"
};
