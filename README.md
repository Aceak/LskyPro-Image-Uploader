# LskyPro Upload V2
**An automatic image uploader plugin for Obsidian**

English | [简体中文](README.md)

> A lightweight and efficient image uploader plugin for Obsidian,  
> supporting LskyPro V1 / V2 APIs, multiple upload methods, and batch operations.

---

## 🚀 Features

- **Auto Upload**: Automatically uploads and replaces pasted images with URLs  
- **Multi-Version Support**: Fully compatible with LskyPro **V1 / V2** APIs  
- **Multiple Upload Methods**: Supports clipboard, drag-and-drop, right-click menu, and command palette  
- **Batch Upload**: Upload all local images in the current note with one click  

---

## 📋 Quick Start

### Prerequisites

Before using this plugin, make sure you have:

1. A running and accessible **LskyPro image hosting service**  
2. Enabled **API access** in your LskyPro configuration  
3. A valid **Access Token** (found under *User Center → Personal Token*)  

---

### Plugin Setup

1. Open **Obsidian → Settings → Community Plugins → LskyPro Upload V2**  
2. Fill in the fields as follows:

| Field | Description |
|--------|-------------|
| **LskyPro URL** | Example: `https://img.example.com` |
| **Access Token** | Your LskyPro access token |
| **Version** | Select `V1` or `V2` |
| **Storage ID** | Optional for V1; Required for V2 (see [API Docs](https://lsky-pro.apifox.cn/api-188594598)) |

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

> Multi-threaded upload will be available in a future update.

---

### Batch Download
Reverse the process — download all remote images to local storage:  
Command: `Download all images`.

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

## 📝 Supported Formats

Common image formats supported:  
`.png`, `.jpg`, `.jpeg`, `.bmp`, `.gif`, `.svg`, `.tiff`, `.webp`

> In theory, all file types supported by LskyPro are compatible.

---

## ⚠️ Notes

1. After updating, **restart Obsidian** to ensure new features take effect  
2. Upload failures are usually caused by network instability or expired tokens  
3. Keep your token secure — never share it publicly  
4. After switching between LskyPro versions, re-enter the storage configuration  
5. Upload paths are managed by your LskyPro server, not modified by the plugin  

---

## 🧭 TODO (Planned Features)

| Feature | Status | Description |
|----------|---------|-------------|
| Concurrent Upload (`concurrencyMode`) | 🚧 In Progress | Multi-threaded concurrent upload for faster performance |
| Auto Delete Local Attachments | 🚧 In Progress | Automatically remove local files after successful upload |
| LskyPro V1 / V2 Auto Detection | ✅ Done | Automatically detect and adapt to different API versions |
| Right-Click Upload | ✅ Done | Upload directly from Obsidian’s context menu |
| Response Parsing Improvements | ✅ Done | Unified parsing for `status`, `message`, and `data` fields |

---

## 🤝 Acknowledgements

Special thanks to the following projects for inspiration and reference:

- [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git)  
- [renmu123/obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin.git)

---

## 👨‍💻 Author

- Author: **3kk0**  
- Blog: [https://wiki.stxwer.top](https://wiki.stxwer.top)  
- Project: [GitHub - 3kk0/LskyPro-Upload-V2](https://github.com/3kk0/LskyPro-Upload-V2)
