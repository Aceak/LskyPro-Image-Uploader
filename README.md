# LskyPro Upload V2
**An automatic image uploader plugin for Obsidian**

English | [简体中文](README_zh.md)

> A lightweight and efficient image uploader plugin for Obsidian,  
> supporting LskyPro V1 / V2 APIs, multiple upload methods, and batch operations.

---

## 🚀 Features

- **Auto Upload**: Automatically uploads and replaces pasted images with URLs  
- **Multi-Version Support**: Fully compatible with LskyPro **V1 / V2** APIs  
- **Multiple Upload Methods**: Supports clipboard, drag-and-drop, right-click menu, and command palette  
- **Batch Upload**: Upload all local images in the current note with one click  
- **Concurrent Upload**: Supports low/medium/high concurrency modes for faster batch uploads  
- **Smart Processing**: Optional network image handling and automatic source file deletion  
- **Multi-Language Support**: Built-in Chinese and English language switching

---

## 📋 Quick Start

### Prerequisites

Before using this plugin, make sure you have:

1. A running and accessible **LskyPro image hosting service**  
2. Enabled **API access** in your LskyPro configuration  
3. A valid **Access Token** (found under *User Center → Personal Token*)  
4. For V2 version, a valid **Storage ID** is required (administrators can check through admin panel, users can obtain via API)

---

### Plugin Setup

1. Open **Obsidian → Settings → Community Plugins → LskyPro Upload V2**  
2. Fill in the basic configuration fields:

| Field | Description |
|--------|-------------|
| **LskyPro URL** | Example: `https://img.example.com` |
| **Access Token** | Your LskyPro access token |
| **Version** | Select `V1` or `V2` |
| **Storage ID** | Optional for V1; Required for V2 (see [API Docs](https://lsky-pro.apifox.cn/api-188594598)) |

3. Advanced options configuration:

| Field | Description |
|--------|-------------|
| **Clipboard Auto Upload** | Automatically upload pasted images (desktop only) |
| **Attachment Auto Upload** | Automatically process attachment images (mobile only) |
| **Process Network Images** | Whether to process pasted network image links |
| **Network Blacklist Domains** | Specify domains that should not be processed |
| **Fix Paths** | Automatically fix file path issues |
| **Apply Image Processing** | Whether to apply image processing rules |
| **Delete Source Files After Upload** | Whether to delete local files after successful upload |
| **Concurrency Mode** | Number of concurrent uploads (low/medium/high) |
| **Language** | Plugin interface language (auto/Chinese/English) |

---

## 💡 Usage Guide

### Clipboard Auto Upload
When you paste an image into the editor, the plugin will:
1. Automatically upload it to your LskyPro server;  
2. Replace it with a Markdown image link, for example:
```markdown
![image](https://img.example.com/uploads/2025/xx.png)
```

---

### Mobile Attachment Auto Upload
When you click the attachment button and select an image file, the plugin will:
1. Automatically upload it to your LskyPro server;  
2. Replace it with a Markdown image link:
```markdown
![image](https://img.example.com/uploads/2025/xx.png)
```
Note: This feature hasn't been thoroughly tested on mobile devices and may have compatibility issues. Further testing and optimization will be conducted after the plugin is published.

---

### Right-Click Upload
Right-click on a local image (in the file explorer or editor),  
then choose **“Upload to LskyPro”** — the plugin will upload it instantly and return the image URL.

> Perfect for manually uploading individual attachments.

---

### Drag-and-Drop Upload
Simply drag local image files into the editor.  
The plugin will detect the file type and automatically replace it with an image URL in Markdown syntax.

---

### Batch Upload (All Images in Current File)
1. Open the **Command Palette** (`Ctrl + P` or `Cmd + P`)  
2. Search for and run `Upload all images`  
3. The plugin scans and uploads all local images in the current note  

> You can configure concurrency mode (low/medium/high) in settings to significantly improve batch upload speed.

---

### Batch Download
Reverse the process — download all remote images to local storage:  
Command: `Download all images`.

---

### Enable Debug Mode
#### Method 1: Enable via configuration file (Recommended)
1. Open the plugin data directory:  
```
.obsidian/plugins/lskypro-upload-v2/data.json
```
2. Add or modify the following field:  
```json
"_debug": true
 ```
3. Save the file and reload the plugin or restart Obsidian to enable debug mode.

#### Method 2: Temporarily enable (without modifying files)
1. Open the console (`Ctrl + Shift + I` → Console);  
2. Enter the following command:  
```js
window.__LSKY_RUNTIME_DEBUG__ = true
```
3. Reload the plugin to automatically enter debug mode.

---

## 🔍 LskyPro Version Notes

This plugin is based on [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git),  
with enhanced **LskyPro V2 API** support and automatic response parsing.  
Reference: [Lsky Pro API Documentation](https://lsky-pro.apifox.cn).

| Field | LskyPro V1 | LskyPro V2 |
|--------|-------------|-------------|
| Storage Config | Optional (if only one strategy exists) | Required (must specify correct storage ID) |
| Token Auth | User Token | User Token |
| API Endpoint | `/api/v1/upload` | `/api/v2/upload` |


---

## ⚠️ Notes

1. After updating, **restart Obsidian** to ensure new features take effect  
2. Upload failures are usually caused by network instability or expired tokens  
3. Keep your token secure — never share it publicly  
4. After switching between LskyPro versions, re-enter the storage configuration  
5. Upload paths are managed by your LskyPro server, not modified by the plugin  

---

## 🧭 Development Roadmap & Changelog

### Implemented Features

| Feature | Status | Description |
|----------|---------|-------------|
| Concurrent Upload | ✅ Done | Supports low/medium/high concurrency modes for faster batch uploads |
| Auto Delete Local Attachments | ✅ Done | Automatically remove local files after successful upload to keep library clean |
| LskyPro V1 / V2 Auto Detection | ✅ Done | Automatically detect and adapt to different API response formats |
| Right-Click Upload | ✅ Done | Upload directly from Obsidian's context menu |
| Response Result Optimization | ✅ Done | Unified handling of status/message/data parsing logic |
| Multi-Language Support | ✅ Done | Built-in Chinese and English language switching |
| Network Image Processing | ✅ Done | Option to process pasted network image links |

### Planned Features

- Image compression options
- Enhanced upload status notifications

## Version Update Log

- **1.1.0**:
  - Added: Desktop clipboard auto upload feature
  - Added: Mobile attachment auto upload feature
  - Added: Multi-language support (auto/Chinese/English)
  - Added: Concurrent upload modes (low/medium/high)
  - Added: Debug log output option
  - Optimized: Response parsing logic, unified handling of status/message/data fields
  - Optimized: Removed Node dependencies, using browser APIs only
  - Fixed: Some configuration items displaying abnormally on mobile
  - Fixed: Mobile compatibility issues
  - Fixed: Auto delete source files option, handled in a safer way

---

## 🤝 Acknowledgements

Special thanks to the following projects for inspiration and reference:

- [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git)  
- [renmu123/obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin.git)

---

## 👨‍💻 Project Information

- Author: **3kk0**  
- Blog: [https://wiki.stxwer.top](https://wiki.stxwer.top)  
- Project: [GitHub - Aceak/LskyPro-Upload-V2](https://github.com/Aceak/LskyPro-Upload-V2)

## 📜 License

This project is licensed under the MIT License.
