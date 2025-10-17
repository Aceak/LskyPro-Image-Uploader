// en.ts
// English — i18n dictionary for LskyPro Upload V2
// =================================================
// This file defines all English strings for UI, logs, and notices.
// =================================================

export default {
  /* ===============================
   * MAIN COMMANDS & MESSAGES
   * =============================== */
  "main.unknownUploaderVersion": "Unknown uploader version",
  "main.uploadAllImages": "Upload all images",
  "main.downloadAllImages": "Download all images",
  "main.uploadImage": "Upload Image",
  "main.fileNotFound": "Could not find image file",
  "main.noAttachmentFolder": "Could not get attachment folder path",
  "main.openFileFirst": "Please open a file first",
  "main.noImageParsed": "No image files parsed",
  "main.networkUploadError": "Network image upload failed",
  "main.failedRequest": "Failed request",
  "main.uploadStart": "Found {{count}} image files, starting upload",
  "main.pasteNetworkImages": "Detected {{count}} network image(s), start uploading",
  "main.autoUploadClipboardDisabled": "Auto upload clipboard is disabled",
  "main.autoUploadAttachmentsDisabled": "Auto upload attachments is disabled",

  /* ===============================
   * DOWNLOAD PROCESS
   * =============================== */
  "download.failed": "Download failed",
  "download.failedNotice": "Download failed, please check console for more information",
  "download.noExtension": "No file extension in URL",
  "download.unsupportedType": "Unsupported image type",
  "download.exception": "Download exception",
  "download.report": [
    "Network images detected: {{count}}",
    "Successfully downloaded: {{success}}",
    "Skipped: {{skipped}}",
    "Failed: {{failed}}"
  ].join("\n"),

  /* ===============================
   * UPLOAD PROCESS
   * =============================== */
  "upload.start": "Found {{count}} image files, starting upload",
  "upload.complete": "Image upload completed",
  "upload.failed": "Image upload failed",
  "upload.failedNotice": "An error occurred during upload, please check the console log",
  "upload.someFailed": "Some image uploads failed",
  "upload.error": "Upload Error",
  "upload.uploading": "Uploading file...",
  "upload.progress": "Upload progress",
  "upload.httpError": "HTTP Error",
  "upload.success": "Upload success",
  "upload.failedShort": "Upload failed",
  "upload.requestException": "Upload request exception",
  "upload.invalidPath": "Invalid file path",
  "upload.batchFailed": "Batch upload failed",
  "upload.clipboardEmpty": "Clipboard does not contain any image file",
  "upload.clipboardFailed": "Failed to upload image from clipboard",
  "upload.exception": "Upload exception",

  // Completed summary
  "upload.summary.completed": "Upload completed (success {{successCount}} / {{total}}, failed {{failedCount}})",
  "upload.summary.allCompleted": "All uploads completed successfully, uploaded {{total}} images",

  /* ===============================
   * RESPONSE & VALIDATION
   * =============================== */
  "response.empty": "Response is empty",
  "response.parseFailed": "Response parse failed (non-JSON)",
  "response.unsupportedType": "Unsupported image type",
  "response.noExtensionInUrl": "No file extension in URL",
  "response.downloadException": "Download exception",
  "response.someFailed": "Some files failed to upload",
  "response.success": "Upload success",
  "response.failed": "Upload failed",

  /* ===============================
   * SETTINGS PANEL
   * =============================== */
  "settings.title": "Plugin Settings",

  // General upload behavior
  "settings.autoUploadClipboard": "Auto upload from clipboard",
  "settings.autoUploadClipboard.desc": "Automatically upload images from clipboard",
  "settings.autoUploadAttachments": "Auto upload attachments",
  "settings.autoUploadAttachments.desc": "Automatically upload attachments when added to the vault",

  // Uploader configuration
  "settings.defaultUploader": "Default uploader",
  "settings.defaultUploader.desc": "Select default uploader api (LskyPro v1 / v2)",
  "settings.serverDomain": "LskyPro server domain",
  "settings.serverDomain.desc": "Domain of your LskyPro server (without API path)",
  "settings.serverDomain.placeholder": "https://example.com",
  "settings.token": "LskyPro Token",
  "settings.token.desc": "API token for LskyPro authentication",
  "settings.token.placeholder": "Your API token here",
  "settings.storageId": "LskyPro Storage ID",
  "settings.storageId.desc": "Storage ID for LskyPro v2",
  "settings.storageId.placeholder": "Storage ID",
  "settings.strategyId": "LskyPro Strategy ID (optional)",
  "settings.strategyId.desc": "Strategy ID for LskyPro v1",
  "settings.strategyId.placeholder": "Strategy ID",

  // Network image behavior
  "settings.workOnNetwork": "Work on network images",
  "settings.workOnNetwork.desc": "Process and re-upload images from remote URLs",
  "settings.blacklist": "Network Domain Black List",
  "settings.blacklist.desc": "Domains to exclude (comma-separated)",

  // Clipboard mixed content
  "settings.clipboardMixed": "Upload when clipboard has image and text together",
  "settings.clipboardMixed.desc": "Handle mixed clipboard content (text + image)",

  // Source cleanup
  "settings.deleteSource": "Delete source file after upload",
  "settings.deleteSource.desc": "Remove original file after successful upload",

  // Concurrency control
  "settings.concurrency": "Upload concurrency",
  "settings.concurrency.desc": "Number of concurrent uploads. Recommended to adjust based on network speed and image bed performance.",
  "settings.concurrency.low": "Low",
  "settings.concurrency.medium": "Medium",
  "settings.concurrency.high": "High",
  "settings.concurrency.switched": "Concurrency mode switched to",

  // Language
  "settings.language": "Language",
  "settings.language.desc": "Select plugin language. 'Auto' follows Obsidian's interface language.",
  "settings.language.switched": "Language switched to",
  "settings.language.failed": "Language switch failed"
};
