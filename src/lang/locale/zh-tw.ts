// 繁體中文

export default {
  // Main
  "Unknown uploader version": "未知的上傳器版本",
  "Upload all images": "上傳所有圖片",
  "Download all images": "下載所有圖片",
  "Upload Image": "上傳圖片",
  "Could not find image file": "找不到圖片檔案",
  "Upload failed": "上傳失敗",
  "Upload failed Notice": "上傳失敗，請檢查控制台獲取更多資訊",
  "Could not get attachment folder path": "無法獲取附件資料夾路徑",
  "Skipped file with no extension": "跳過無副檔名檔案",
  "Skipped file with unsupported image type": "跳過不支援的圖片類型",
  "Download failed Notice": "下載失敗，請檢查控制台獲取更多資訊",
  "Download failed": "下載失敗",
  "No file extension in URL": "URL中沒有檔案副檔名",
  "Unsupported image type": "不支援的圖片類型",
  "Download exception": "下載異常",
  "Please open a file first": "請先開啟一個檔案",
  "No image files parsed": "未解析到圖片檔案",
  "Some image uploads failed": "部分圖片上傳失敗",
  "Lskypro-Upload-V2 Some image uploads failed": "Lskypro-Upload-V2 部分圖片上傳失敗",
  "Failed request": "請求失敗",

  // Common messages
  "downloadReport": [
    "偵測到網路圖片: {{count}}","成功下載: {{success}}","跳過: {{skipped}}","失敗: {{failed}}"
  ].join("\n"),

  // Upload messages
  "uploadStart": "找到{{count}}個圖片檔案，開始上傳",
  "uploadComplete": "圖片上傳完成",
  "uploadFailed": "圖片上傳失敗",
  "uploadFailedNotice": "上傳過程中發生錯誤，請檢查控制台日誌",
  "uploadSomeFailed": "部分圖片上傳失敗",
  "uploadError": "上傳錯誤",
  "uploading": "正在上傳檔案...",
  "HTTP Error": "HTTP錯誤",
  "Upload progress": "上傳進度",

  // Upload completed summary
  "upload": {
    "completed_summary": "上傳完成 (成功 {{successCount}}/{{total}}, 失敗 {{failedCount}})",
    "all_completed": "所有上傳成功完成，已上傳 {{total}} 張圖片"
  },
  
  // Response messages
  "Response is empty": "回應為空",
  "Upload success": "上傳成功",
  "Response parse failed (non-JSON)": "回應解析失敗（非JSON格式）",
  "Upload request exception": "上傳請求異常",
  "Invalid file path": "無效的檔案路徑",
  "Some files failed to upload": "部分檔案上傳失敗",
  "Batch upload failed": "批量上傳失敗",
  "Upload exception": "上傳異常",
  "Clipboard does not contain any image file": "剪貼簿中不包含任何圖片檔案",
  "Failed to upload image from clipboard": "無法從剪貼簿上傳圖片",
  
  // Settings
  "Plugin Settings": "外掛設定",
  "Auto upload from clipboard": "自動從剪貼簿上傳",
  "Auto upload clipboard description": "自動上傳剪貼簿中的圖片",
  "Auto upload attachments": "自動上傳附件",
  "Auto upload attachments description": "自動上傳附件",
  "Default uploader": "預設上傳器",
  "Default uploader description": "選擇預設上傳器",
  "LskyPro server domain": "LskyPro伺服器域名",
  "LskyPro server domain description": "您的LskyPro伺服器域名地址",
  "Please input LskyPro server domain": "https://example.com",
  "LskyPro Token": "LskyPro令牌",
  "LskyPro Token description": "用於LskyPro認證的API令牌",
  "Please input LskyPro Token": "您的API令牌",
  "LskyPro Storage ID": "LskyPro儲存ID",
  "LskyPro v2 Storage ID description": "LskyPro v2的儲存ID",
  "Please input LskyPro Storage ID": "儲存ID",
  "LskyPro Strategy ID（optional）": "LskyPro策略ID（可選）",
  "LskyPro v1 Strategy ID description": "LskyPro v1的策略ID",
  "Please input LskyPro Strategy ID": "策略ID",
  "Image size suffix": "圖片尺寸後綴",
  "Image size suffix Description": "圖片尺寸顯示的後綴格式",
  "Please input image size suffix": "{{width}}x{{height}}",
  "Work on network": "處理網路圖片",
  "Work on network Description": "處理網路圖片",
  "Network Domain Black List": "網路域名黑名單",
  "Network Domain Black List Description": "要排除的域名（逗號分隔）",
  "Upload when clipboard has image and text together": "剪貼簿同時有圖片和文字時上傳",
  "Advanced clipboard upload description": "處理混合剪貼簿內容",
  "Delete source file after you upload file": "上傳後刪除來源檔案",
  "Delete source file Description": "成功上傳後刪除原始檔案",
  "Upload concurrency": "上傳並發數",
  "Upload concurrency description": "並發上傳數量，建議根據網路情況和圖床配置調整，低中高分別對應1、3、5。",
  "Low": "低",
  "Medium": "中",
  "High": "高",
  "concurrencyModeSwitchedTo": "並發模式已切換至",
  "Language": "語言",
  "Language Description": "選擇外掛語言。'自動'將跟隨Obsidian介面語言。",
  "Language switched to": "語言已切換至",
  "Language switch failed": "語言切換失敗"
};