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
  "main.uploadImage": "Upload image",
  "main.fileNotFound": "Could not find image file",
  "main.noAttachmentFolder": "Could not get attachment folder path",
  "main.openFileFirst": "Please open a file first",
  "main.noImageParsed": "No image files parsed",
  "main.networkUploadError": "Network image upload failed",
  "main.failedRequest": "Failed request",
  "main.uploadStart": "Found {{count}} image files, starting upload",
  "main.pasteNetworkImages":
    "Detected {{count}} network image(s), start uploading",
  "main.autoUploadClipboardDisabled": "Auto upload clipboard is disabled",
  "main.autoUploadAttachmentsDisabled": "Auto upload attachments is disabled",
  "main.debugMode": "Debug mode is enabled",
  "main.updateSettings": "Update settings",
  "main.uploadRawFile": "Upload raw file",
  "main.uploadSingleFile": "Upload single file",
  "main.uploadFiles": "Upload files",
  "main.uploadWithLimit": "Upload with limit",
  "main.uploadFromClipboard": "Upload from clipboard",
  "main.languageSet": "Language set to:",
  "main.languageInitFailed": "Language initialization failed:",
  "main.uploaderInit": "Uploader initialized",
  "main.pluginLoaded": "Plugin loaded successfully",
  "main.debugEnabled": "Debug mode enabled",
  "main.notafile": "Resolved path but not a file:",

  /* ===============================
   * DOWNLOAD PROCESS
   * =============================== */
  "download.failed": "Download failed",
  "download.failedNotice":
    "Download failed, please check console for more information",
  "download.noExtension": "No file extension in URL",
  "download.unsupportedType": "Unsupported image type",
  "download.exception": "Download exception",
  "download.report": [
    "Network images detected: {{count}}",
    "Successfully downloaded: {{success}}",
    "Skipped: {{skipped}}",
    "Failed: {{failed}}",
  ].join("\n"),
  "download.debug.start": "Start downloading image: {{url}}",
  "download.debug.failed": "Download failed: {{error}}",
  "download.debug.savePath": "Save path: {{path}}",
  "download.debug.success": "Image saved successfully: {{path}}",
  "download.debug.exception": "Download exception: {{url}} {{error}}",
  "download.debug.startAll": "Start downloading all images",
  "download.debug.replaceReferences":
    "Start replacing Markdown image references: {{count}} images",
  "download.debug.originalContentLength":
    "Original Markdown content length: {{length}} characters",
  "download.debug.replaceSuccess":
    "Replace image reference [ {{index}} / {{total}} ]: {{source}} → {{target}}",
  "download.debug.replaceFailed":
    "No match found [ {{index}} / {{total}} ]: {{source}}",
  "download.debug.updateComplete":
    "Markdown content updated, replaced {{count}} image references",
  "download.debug.updatedContentLength":
    "Updated Markdown content length: {{length}} characters",
  "download.debug.report":
    "Download report - Total: {{count}}, Success: {{success}}, Skipped: {{skipped}}, Failed: {{failed}}",
  "download.debug.folderPath": "Folder path: {{path}}",
  "download.debug.originalFilename": "Original filename: {{filename}}",
  "download.debug.responseStatus": "HTTP response status code: {{status}}",
  "download.debug.downloadFailed": "Download failed: {{message}}",
  "download.debug.safeFilename": "Cleaned filename: {{filename}}",
  "download.debug.pathConditions":
    "Path condition check - folderPath: {{folderPath}}",
  "download.debug.pathConditionCheck":
    "folderPath === '{{condition}}': {{result}}",
  "download.debug.pathConditionLength": "folderPath.length: {{length}}",
  "download.debug.pathConditionChar": "folderPath.charCodeAt(0): {{code}}",
  "download.debug.rootPathHandling":
    "Root/empty directory handling, using filename directly: {{path}}",
  "download.debug.nonRootPathHandling":
    "Non-root directory handling, building full path: {{path}}",
  "download.debug.finalSavePath": "Final save path: {{path}}",
  "download.debug.responseSize": "Response data size: {{size}} bytes",
  "download.debug.downloadException": "Download exception: {{message}}",

  /* ===============================
   * UPLOAD PROCESS
   * =============================== */
  "upload.start": "Found {{count}} image files, starting upload",
  "upload.complete": "Image upload completed",
  "upload.failed": "Image upload failed",
  "upload.failedNotice":
    "An error occurred during upload, please check the console log",
  "upload.someFailed": "Some image uploads failed",
  "upload.error": "Upload error",
  "upload.uploading": "Uploading file...",
  "upload.progress": "Upload progress",
  "upload.httpError": "HTTP error",
  "upload.success": "Upload success",
  "upload.failedShort": "Upload failed",
  "upload.requestException": "Upload request exception",
  "upload.invalidPath": "Invalid file path",
  "upload.batchFailed": "Batch upload failed",
  "upload.clipboardEmpty": "Clipboard does not contain any image file",
  "upload.clipboardFailed": "Failed to upload image from clipboard",
  "upload.exception": "Upload exception",
  "upload.v2.storageIdRequired": "LskyPro v2 requires storage ID",
  "upload.allFiles": "Upload all files",

  // Completed summary
  "upload.summary.completed":
    "Upload completed (success {{successCount}} / {{total}}, failed {{failedCount}})",
  "upload.summary.allCompleted":
    "All uploads completed successfully, uploaded {{total}} images",

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
   * ATTACHMENT PATH
   * =============================== */
  "attachmentPath.debug.original": "Original assetFolder: {{path}}",
  "attachmentPath.debug.noActiveFile": "No active file found",
  "attachmentPath.debug.activeFile": "Active file: {{path}}",
  "attachmentPath.debug.activeFileParent":
    "Active file parent directory: {{path}}",
  "attachmentPath.debug.emptyAssetFolder":
    "assetFolder is empty, returning active file parent directory: {{path}}",
  "attachmentPath.debug.removeDotSlash":
    "Relative path after removing ./: {{path}}",
  "attachmentPath.debug.emptyRelativePath":
    "Relative path is empty, returning parent directory: {{path}}",
  "attachmentPath.debug.fullPath": "Final returned path: {{path}}",
  "attachmentPath.debug.final": "Final attachment path: {{path}}",

  /* ===============================
   * UPLOAD DEBUG
   * =============================== */
  "upload.debug.requestBody": "Upload request body",
  "upload.debug.responseStatus": "Upload response status code: {{status}}",
  "upload.debug.responseBody": "Upload response body",
  "upload.debug.errorMessage": "Upload error message: {{message}}",
  "upload.debug.stackTrace": "Upload error stack trace",
  "upload.debug.errorDetails": "Upload error details",

  /* ===============================
   * HELPER
   * =============================== */
  "helper.getAllFiles.start": "Start getting all image files",
  "helper.getAllFiles.noEditor": "No editor instance found",
  "helper.getAllFiles.complete":
    "Retrieval completed, returned {{count}} images",
  "helper.getImageLink.start": "Start extracting image links",
  "helper.getImageLink.complete":
    "Extraction completed, found {{count}} image links",

  /* ===============================
   * I18N DEBUG
   * =============================== */
  "i18n.debug.autoMode": "Auto mode -> Obsidian language: {{locale}}",
  "i18n.debug.switchLanguage": "Switching to language: {{language}}",
  "i18n.debug.activeLocale": "Current active language: {{locale}}",
  "i18n.debug.loadedLocales": "Loaded languages: {{locales}}",

  /* ===============================
   * SETTINGS PANEL
   * =============================== */
  "settings.title": "Plugin settings",

  // General upload behavior
  "settings.autoUploadClipboard": "Auto upload from clipboard",
  "settings.autoUploadClipboard.desc":
    "Automatically upload images from clipboard",
  "settings.autoUploadAttachments": "Auto upload attachments",
  "settings.autoUploadAttachments.desc":
    "Automatically upload attachments when added to the vault",

  // Uploader configuration
  "settings.defaultUploader": "Default uploader",
  "settings.defaultUploader.desc":
    "Select default uploader API (LskyPro v1 / v2)",
  "settings.serverDomain": "LskyPro server domain",
  "settings.serverDomain.desc":
    "Domain of your LskyPro server (without API path)",
  "settings.serverDomain.placeholder": "https://example.com",
  "settings.token": "LskyPro token",
  "settings.token.desc": "API token for LskyPro authentication",
  "settings.token.placeholder": "Your API token here",
  "settings.storageId": "LskyPro storage ID",
  "settings.storageId.desc": "Storage ID for LskyPro v2",
  "settings.storageId.placeholder": "Storage ID",
  "settings.strategyId": "LskyPro strategy ID (optional)",
  "settings.strategyId.desc": "Strategy ID for LskyPro v1",
  "settings.strategyId.placeholder": "Strategy ID",

  // Network image behavior
  "settings.workOnNetwork": "Work on network images",
  "settings.workOnNetwork.desc":
    "Process and re-upload images from remote URLs",
  "settings.blacklist": "Network domain blacklist",
  "settings.blacklist.desc": "Domains to exclude (comma-separated)",

  // Clipboard mixed content
  "settings.clipboardMixed":
    "Upload when clipboard has image and text together",
  "settings.clipboardMixed.desc":
    "Handle mixed clipboard content (text + image)",

  // Source cleanup
  "settings.deleteSource": "Delete source file after upload",
  "settings.deleteSource.desc": "Remove original file after successful upload",

  // Concurrency control
  "settings.concurrency": "Upload concurrency",
  "settings.concurrency.desc":
    "Number of concurrent uploads. Recommended to adjust based on network speed and image bed performance.",
  "settings.concurrency.low": "Low",
  "settings.concurrency.medium": "Medium",
  "settings.concurrency.high": "High",
  "settings.concurrency.switched": "Concurrency mode switched to",

  // Language
  "settings.language": "Language",
  "settings.language.desc": "Select the plugin language.",
  "settings.language.switched": "Language switched to",
  "settings.language.failed": "Language switch failed",

  // Debug mode
  "settings.debugMode": "Debug mode",
  "settings.debugMode.desc":
    "Enable detailed debug logging for upload requests and errors",
  "settings.debugMode.enabled": "Debug mode enabled",
  "settings.debugMode.disabled": "Debug mode disabled",

  // Ignore SSL errors
  "settings.ignoreSSL": "Ignore SSL errors",
  "settings.ignoreSSL.desc": "Ignore SSL errors when connecting to the server",

  // Setting labels
  "setting.updateConfig": "Update config: ",
  "setting.uploadByClipSwitch": "Auto upload from clipboard",
  "setting.uploadAttachmentsSwitch": "Auto upload attachments",
  "setting.uploader": "API version",
  "setting.token": "API token",
  "setting.storage_id": "Storage ID",
  "setting.strategy_id": "Strategy ID",
  "setting.uploadServer": "Server address",
  "setting.workOnNetWork": "Work on network images",
  "setting.newWorkBlackDomains": "Network domain blacklist",
  "setting.deleteSource": "Delete source file after upload",
  "setting.concurrencyMode": "Upload concurrency",
};
