# LskyPro Upload V2  
**适用于 Obsidian 的自动图床上传插件**

简体中文 | [English](README.en.md)

> 一款为 Obsidian 打造的高效图片上传工具，让您的笔记图片管理更加自动化与轻量化。  
> 支持 LskyPro V1 / V2 API、多种上传方式与批量处理。

---

## 🚀 功能亮点

- **自动上传**：粘贴图片时自动上传并替换为外链  
- **多版本支持**：完整兼容 LskyPro **V1 / V2** API  
- **多种上传方式**：支持剪贴板、拖拽、右键菜单、命令面板多入口操作  
- **批量上传**：一键上传当前笔记中所有本地图片  

---

## 📋 快速开始

### 前置条件

使用前请确保以下内容：

1. 准备可访问的 **LskyPro 图床服务**  
2. 已启用 LskyPro 的 **API 接口功能**  
3. 已获取有效的 **访问 Token**（用户中心 → 个人令牌）  

---

### 插件配置步骤

1. 打开 **Obsidian → 设置 → 第三方插件 → LskyPro Upload V2**  
2. 按以下顺序填写：

| 配置项 | 说明 |
|--------|------|
| **图床地址** | 例如 `https://img.example.com` |
| **访问 Token** | LskyPro 用户访问令牌 |
| **版本选择** | 选择 `V1` 或 `V2` |
| **存储 ID** | V1 可选；V2 必填，可通过 [API 获取](https://lsky-pro.apifox.cn/api-188594598) |

---

## 💡 使用指南

### 剪贴板自动上传
直接在编辑器中粘贴图片，插件会：
1. 自动上传至 LskyPro；
2. 上传成功后替换为 Markdown 外链：
   ```markdown
   ![image](https://img.example.com/uploads/2025/xx.png)
   ```

---

### 右键菜单上传
在 **文件浏览器** 或 **编辑器中选中图片路径** 后右键点击：  
选择「上传到 LskyPro」，插件会立即上传并返回外链。

> 适合手动处理单张图片或附件上传场景。

---

### 拖拽上传
将本地图片文件拖拽至编辑器中，插件会：
- 自动检测文件类型；
- 上传后替换为外链 Markdown 图片语法。

---

### 批量上传当前文档内图片
1. 按 `Ctrl + P`（或 `Cmd + P`）打开命令面板  
2. 搜索 `Upload all images` 并执行  
3. 插件将扫描并上传所有本地图片  

> 支持上传多种图片格式；未来将加入「并发上传」选项以提升速度。

---

### 批量下载图片
反向操作：将文档中的网络图片下载到本地。  
命令：`Download all images`。

---

## 🔍 LskyPro 版本说明

插件基于 [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git) 改造，  
增强了对 **LskyPro V2 API** 的支持与自动解析机制。  
参考文档：[Lsky Pro 官方 API 文档](https://lsky-pro.apifox.cn)。

| 配置项 | LskyPro V1 | LskyPro V2 |
|--------|-------------|-------------|
| 存储配置 | 可选（若仅一个策略可省略） | 必填（需填写正确存储 ID） |
| Token 授权 | 用户令牌 | 用户令牌 |
| API 路径 | `/api/v1/upload` | `/api/v2/upload` |

---

## 📝 支持的图片格式

支持上传的常见图片格式：  
`.png`, `.jpg`, `.jpeg`, `.bmp`, `.gif`, `.svg`, `.tiff`, `.webp`

> 理论上兼容 LskyPro 支持的所有文件类型。

---

## ⚠️ 注意事项

1. 更新插件后请 **重启 Obsidian** 以确保新功能生效  
2. 网络不稳定或 Token 失效可能导致上传失败  
3. 请妥善保管 Token，不要与他人共享  
4. 切换 LskyPro 版本后，请重新填写存储配置  
5. 上传路径由 LskyPro 端策略控制，插件不修改服务器结构  

---

## 🧭 TODO（开发计划）

| 功能 | 状态 | 说明 |
|------|------|------|
| 并发上传（`concurrencyMode`） | 🚧 开发中 | 支持多线程并发上传以提升效率 |
| 上传完成后自动删除本地附件 | 🚧 开发中 | 上传成功后自动清理源文件，保持库整洁 |
| LskyPro V1 / V2 自动识别 | ✅ 已完成 | 自动识别并适配 API 结构差异 |
| 右键菜单上传 | ✅ 已完成 | 在 Obsidian 右键菜单中直接上传图片 |
| 响应结果优化 | ✅ 已完成 | 统一处理 status/message/data 解析逻辑 |

---

## 🤝 致谢

特别感谢以下项目对本插件提供的启发：

- [NekoTarou/lskypro-auto-upload](https://github.com/NekoTarou/lskypro-auto-upload.git)
- [renmu123/obsidian-image-auto-upload-plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin.git)

---

## 👨‍💻 作者信息

- 作者：**3kk0**  
- 博客：[https://wiki.stxwer.top](https://wiki.stxwer.top)  
- 项目地址：[GitHub - 3kk0/LskyPro-Upload-V2](https://github.com/3kk0/LskyPro-Upload-V2)
