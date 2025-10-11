# LskyPro Image Auto Upload Plugin

[简体中文](README_zh.md) | English

An efficient image uploading tool designed for Obsidian, making note-taking image management more convenient.

## 🚀 Key Features

- **One-Click Upload**: Automatically upload images to LskyPro when pasting
- **Multi-Version Support**: Compatible with both LskyPro V1 and V2 versions
- **Batch Processing**: Supports batch uploading and downloading of images
- **Multiple Upload Methods**: Right-click menu, drag-and-drop upload, and more
- **Flexible Control**: Control upload behavior per file through frontmatter

## 📋 Quick Start

### Prerequisites

Before using this plugin, please ensure you have completed the following preparations:

1. Set up and configured the LskyPro image hosting service
2. Enabled the API interface in LskyPro
3. Obtained an access Token for LskyPro

### Plugin Configuration

After installing the plugin, follow these simple steps to get started:

1. Open Obsidian Settings > Third-party plugins > Lskypro Upload V2
2. Enter your LskyPro domain (e.g., `https://lsky.example.com`)
3. Input your LskyPro Token
4. Select your LskyPro version (V1 or V2)
5. Fill in storage configuration according to the version requirements (optional for V1, required for V2). For V2 version, regular accounts can obtain storage ID through [API](https://lsky-pro.apifox.cn/api-188594598).

## 💡 Usage Guide

### Clipboard Upload

When pasting images, the plugin will automatically upload them to LskyPro and replace them with web links.

### Batch Upload

Upload all local images in a document through the command palette:

1. Use shortcut `Ctrl+P` to bring up the command palette
2. Type `upload all images` and press Enter
3. The plugin will automatically start uploading all images

### Batch Download

Download all web images in a document to your local machine:

1. Use shortcut `Ctrl+P` to bring up the command palette
2. Type `download all images` and press Enter
3. The plugin will automatically start downloading images

### Drag-and-Drop Upload

Directly drag and drop local image files into the editor, and the plugin will automatically upload them and replace them with web links.

## 🔍 LskyPro Version Notes

This plugin is modified based on [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git), with added API support for [LskyPro V2](https://lsky.pro/) version. Please refer to the [Lsky Pro API Documentation](https://lsky-pro.apifox.cn) for more details.

| Configuration | LskyPro V1 | LskyPro V2 |
|---------------|------------|------------|
| Storage Config | Optional storage strategy ID | Required storage ID |
| Notes | Not needed if only one storage strategy exists | Must fill in the correct storage ID |

## 📝 Supported Image Formats

The plugin supports uploading various image formats, including but not limited to:
`.png`, `.jpg`, `.jpeg`, `.bmp`, `.gif`, `.svg`, `.tiff`, `.webp`

> Theoretically supports all file formats compatible with LskyPro

## ⚠️ Notes

1. Restart Obsidian after updating the plugin to ensure normal functionality
2. Unstable network connections may cause upload failures, please ensure a stable network connection
3. Please keep your LskyPro Token secure and do not share it with others
4. After switching LskyPro versions, you may need to reconfigure the corresponding parameters

## 🤝 Acknowledgments

Thanks to the following projects and developers for their contributions to this plugin:

- [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git)
- [renmu123/obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin.git)

## 👨‍💻 Author Information

- Author: 3kk0
- Blog: [https://wiki.stxwer.top](https://wiki.stxwer.top)