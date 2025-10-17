// 中文

export default {
  // Main
  "Unknown uploader version": "未知的上传器版本",
  "Upload all images": "上传所有图片",
  "Download all images": "下载所有图片",
  "Upload Image": "上传图片",
  "Could not find image file": "找不到图片文件",
  "Upload failed": "上传失败",
  "Upload failed Notice": "上传失败，请检查控制台获取更多信息",
  "Could not get attachment folder path": "无法获取附件文件夹路径",
  "Skipped file with no extension": "跳过无扩展名文件",
  "Skipped file with unsupported image type": "跳过不支持的图片类型",
  "Download failed Notice": "下载失败，请检查控制台获取更多信息",
  "Download failed": "下载失败",
  "No file extension in URL": "URL中没有文件扩展名",
  "Unsupported image type": "不支持的图片类型",
  "Download exception": "下载异常",
  "Please open a file first": "请先打开一个文件",
  "No image files parsed": "未解析到图片文件",
  "Some image uploads failed": "部分图片上传失败",
  "Lskypro-Upload-V2 Some image uploads failed": "Lskypro-Upload-V2 部分图片上传失败",
  "Failed request": "请求失败",

  // Common messages
  "downloadReport": [
    "检测到网络图片: {{count}}","成功下载: {{success}}","跳过: {{skipped}}","失败: {{failed}}"
  ].join("\n"),

  // Upload messages
  "uploadStart": "找到{{count}}个图片文件，开始上传",
  "uploadComplete": "图片上传完成",
  "uploadFailed": "图片上传失败",
  "uploadFailedNotice": "上传过程中发生错误，请检查控制台日志",
  "uploadSomeFailed": "部分图片上传失败",
  "uploadError": "上传错误",
  "uploading": "正在上传文件...",
  "HTTP Error": "HTTP错误",
  "Upload progress": "上传进度",

  // Upload completed summary
  "upload": {
    "completed_summary": "上传完成 (成功 {{successCount}}/{{total}}, 失败 {{failedCount}})",
    "all_completed": "所有上传成功完成，已上传 {{total}} 张图片"
  },
  
  // Response messages
  "Response is empty": "响应为空",
  "Upload success": "上传成功",
  "Response parse failed (non-JSON)": "响应解析失败（非JSON格式）",
  "Upload request exception": "上传请求异常",
  "Invalid file path": "无效的文件路径",
  "Some files failed to upload": "部分文件上传失败",
  "Batch upload failed": "批量上传失败",
  "Upload exception": "上传异常",
  "Clipboard does not contain any image file": "剪贴板中不包含任何图片文件",
  "Failed to upload image from clipboard": "无法从剪贴板上传图片",
  
  // Settings
  "Plugin Settings": "插件设置",
  "Auto upload from clipboard": "自动从剪贴板上传",
  "Auto upload clipboard description": "自动上传剪贴板中的图片，图片粘贴到Obsidian后自动上传。",
  "Auto upload attachments": "自动上传附件",
  "Auto upload attachments description": "移动端插入图片附件时自动上传",
  "Default uploader": "默认上传器",
  "Default uploader description": "选择 Lsky Pro 的API版本，v1 或 v2。",
  "LskyPro server domain": "LskyPro服务器域名",
  "LskyPro server domain description": "您的LskyPro服务器域名地址，不需要包含API路径。",
  "Please input LskyPro server domain": "https://example.com",
  "LskyPro Token": "LskyPro令牌",
  "LskyPro Token description": "用于LskyPro认证的API令牌",
  "Please input LskyPro Token": "您的API令牌",
  "LskyPro Storage ID": "LskyPro存储ID",
  "LskyPro v2 Storage ID description": "LskyPro v2的存储ID",
  "Please input LskyPro Storage ID": "存储ID",
  "LskyPro Strategy ID（optional）": "LskyPro策略ID（可选）",
  "LskyPro v1 Strategy ID description": "LskyPro v1的策略ID",
  "Please input LskyPro Strategy ID": "策略ID",
  "Image size suffix": "图片尺寸后缀",
  "Image size suffix Description": "图片尺寸显示的后缀格式",
  "Please input image size suffix": "{{width}}x{{height}}",
  "Work on network": "处理网络图片",
  "Work on network Description": "处理网络图片",
  "Network Domain Black List": "网络域名黑名单",
  "Network Domain Black List Description": "要排除的域名（逗号分隔）",
  "Upload when clipboard has image and text together": "剪贴板同时有图片和文字时上传",
  "Advanced clipboard upload description": "处理混合剪贴板内容",
  "Delete source file after you upload file": "上传后删除源文件",
  "Delete source file Description": "成功上传后删除原始文件",
  "Upload concurrency": "上传并发数",
  "Upload concurrency description": "并发上传数量，建议根据网络情况和图床配置调整，低中高分别对应1、3、5。",
  "Low": "低",
  "Medium": "中",
  "High": "高",
  "concurrencyModeSwitchedTo": "并发模式已切换至",
  "Language": "语言",
  "Language Description": "选择插件语言。'自动'将跟随Obsidian界面语言。",
  "Language switched to": "语言已切换至",
  "Language switch failed": "语言切换失败"
};