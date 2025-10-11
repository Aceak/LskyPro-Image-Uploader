# LskyPro 图床自动上传插件

简体中文 | [English](README.md)

一款为 Obsidian 打造的高效图片上传工具，让您的笔记图片管理更加便捷。

## 🚀 功能亮点

- **一键上传**：粘贴图片时自动上传至 LskyPro 图床
- **多版本支持**：同时兼容 LskyPro V1 和 V2 版本
- **批量处理**：支持批量上传和下载图片
- **多种上传方式**：支持右键菜单、拖拽上传等多种操作方式
- **灵活控制**：支持通过 frontmatter 控制单个文件的上传行为

## 📋 快速开始

### 前置条件

在使用本插件前，请确保您已完成以下准备：

1. 已搭建并配置好 LskyPro 图床服务
2. 已开启 LskyPro 的 API 接口功能
3. 已获取 LskyPro 的访问 Token

### 插件配置

安装插件后，您只需简单几步即可开始使用：

1. 打开 Obsidian 设置 > 第三方插件 > Lskypro Upload V2
2. 输入 LskyPro 域名（例如：`https://lsky.example.com`）
3. 输入您的 LskyPro Token
4. 选择您的 LskyPro 版本（V1 或 V2）
5. 根据版本要求填写存储配置（V1 可选，V2 必填），V2版本普通账号可以通过[API 获取存储 ID](https://lsky-pro.apifox.cn/api-188594598)。

## 💡 使用指南

### 剪切板上传

直接粘贴图片时，插件会自动将图片上传至 LskyPro 图床并替换为网络链接。

### 批量上传

通过命令面板批量上传文档中的所有本地图片：

1. 使用快捷键 `Ctrl+P` 呼出命令面板
2. 输入 `upload all images` 并回车
3. 插件将自动开始上传所有图片

### 批量下载

将文档中的网络图片批量下载到本地：

1. 使用快捷键 `Ctrl+P` 呼出命令面板
2. 输入 `download all images` 并回车
3. 插件将自动开始下载图片

### 拖拽上传

直接将本地图片文件拖拽到编辑器中，插件会自动上传并替换为网络链接。

## 🔍 LskyPro 版本说明

本插件基于 [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git) 改造而来，增加了 [LskyPro V2](https://lsky.pro/) 版本的 API 支持，[Lsky Pro API 文档](https://lsky-pro.apifox.cn)。

| 配置项 | LskyPro V1 | LskyPro V2 |
|--------|------------|------------|
| 存储配置 | 可选的存储策略 ID | 必填的存储 ID |
| 注意事项 | 若只有一个存储策略，可无需填写 | 必须填写正确的存储 ID |

## 📝 支持的图片格式

插件支持多种图片格式上传，包括但不限于：
`.png`, `.jpg`, `.jpeg`, `.bmp`, `.gif`, `.svg`, `.tiff`, `.webp`

> 理论上支持 LskyPro 图床兼容的所有文件格式

## ⚠️ 注意事项

1. 更新插件后请重启 Obsidian 以确保功能正常
2. 网络连接不稳定可能导致上传失败，请确保网络畅通
3. 请妥善保管您的 LskyPro Token，不要与他人分享
4. 切换 LskyPro 版本后，可能需要重新配置相应参数

## 🤝 致谢

感谢以下项目和开发者对本插件的贡献：

- [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git)
- [renmu123/obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin.git)

## 👨‍💻 作者信息

- 作者：3kk0
- 博客：[https://wiki.stxwer.top](https://wiki.stxwer.top)
