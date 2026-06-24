# Changelog

---

## [1.1.4] - Unreleased

# Release Notes

## ✨ Improvements
- **Unified Paste & Drag-and-Drop Upload**  
  Merged single-file and multi-file upload handlers into one unified function.  
  Removed redundant concurrency level mappings, replaced with constants.

- **Enhanced Batch Upload Results**  
  Improved batch upload result processing with better debugging information.

- **Refactored Uploader Version Management**  
  Replaced hardcoded version strings with constants for better readability and maintainability.

## 🧩 Fixes
- **Paste & Drag Event Handling**  
  Fixed event processing order — `preventDefault()` now runs synchronously before `await` to avoid data loss.  
  Uploader cache now refreshes on settings update to ensure configuration takes effect immediately.

- **Uploader Version Parsing**  
  Fixed case-insensitivity issues in version identifier parsing.  
  Enhanced version detection robustness and compatibility.

- **Markdown Image Link Encoding**  
  Optimized URL encoding to handle special characters in image links.

## 🛠 Internal Refactor
- Consolidated upload logic and removed legacy uploader code.
- Extracted uploader version parsing into a dedicated function with enhanced debug output.
- Unified upload result processing to maintain input order consistency.
- Improved type definitions and error handling.

## 🧪 Compatibility
- ✅ All existing features verified  
- ✅ Test cases updated to reflect new concurrency level constants

---

# 更新日志

## ✨ 优化改进
- **统一粘贴与拖拽上传**  
  合并单文件和多文件上传处理为一个函数。  
  移除冗余的并发级别映射，使用常量替代。

- **批量上传结果增强**  
  完善批量上传结果处理，增加调试信息输出。

- **上传器版本管理重构**  
  使用常量替代硬编码版本字符串，增强代码可读性与可维护性。

## 🧩 问题修复
- **粘贴与拖拽事件处理**  
  修正事件处理顺序 —— `preventDefault()` 在 `await` 之前同步执行，避免数据丢失。  
  设置更新时同步刷新上传器缓存，确保配置即时生效。

- **上传器版本解析**  
  修正版本标识解析大小写不一致问题。  
  增强版本检测的健壮性与兼容性。

- **Markdown 图片链接编码**  
  优化 URL 编码，正确处理图片链接中的特殊字符。

## 🛠 内部重构
- 整合上传逻辑，移除旧版上传器代码。
- 提取上传器版本解析为独立函数，增强调试输出。
- 统一上传结果处理，保持与输入顺序一致。
- 改进类型定义与错误处理。

## 🧪 兼容性
- ✅ 全部现有功能验证通过  
- ✅ 测试用例已更新以反映新的并发级别常量

---

## [1.1.3] - 2026-02-02

# Release Notes

## ✨ Improvements
- **i18n Language Setting Simplification**  
  Refactored internationalization logic to fully rely on Obsidian's built-in language detection.  
  Removed manual language selection and related UI options to reduce configuration complexity.

- **Settings Interface Cleanup**  
  Removed obsolete and unused language-related settings.  
  Simplified settings structure for clearer behavior and easier maintenance.

## 🛠 Internal Refactor
- **Code Cleanup**
  - Removed unused file mapping cache logic.
  - Eliminated redundant i18n helper code and inactive branches.
- **Logic Simplification**
  - Streamlined language initialization and settings loading flow.
  - Reduced conditional paths to improve readability and long-term maintainability.

## 🧪 Compatibility
- ✅ Fully compatible with Obsidian's native language switching mechanism  
- ✅ No impact on existing upload, configuration, or runtime behavior

---

# 更新日志

## ✨ 优化改进
- **语言设置逻辑简化**  
  重构国际化实现，完全依赖 Obsidian 内置语言自动检测。  
  移除手动语言选择及相关设置项，降低配置复杂度。

- **设置界面清理**  
  删除不再使用或已失效的语言相关配置项。  
  精简设置结构，使行为更加清晰明确。

## 🛠 内部重构
- **代码清理**
  - 移除未使用的文件映射缓存逻辑。
  - 清理冗余的 i18n 辅助代码和无效分支。
- **逻辑简化**
  - 优化语言初始化与设置加载流程。
  - 减少条件判断路径，提升可读性与可维护性。

## 🧪 兼容性
- ✅ 完全兼容 Obsidian 原生语言切换机制  
- ✅ 不影响现有上传、配置和运行逻辑

---

## [1.1.2] - 2025-12-23

# Release Notes

## ✨ Improvements
- **i18n Module Optimization**  
  Refactored internationalization implementation to use Obsidian's built-in API for language detection, removing redundant language setting options.  
  Settings labels now dynamically update when switching languages without requiring a plugin reload.

- **File Caching Mechanism**  
  Added file cache functionality to reduce redundant file system queries, significantly improving upload performance.  
  Optimized mobile upload event registration timing for better stability on touch devices.

- **Debug Mode Enhancement**  
  Restructured debug mode implementation using modular `debugState` instead of global variables.  
  Added UI control options for debug mode and language settings for better user configurability.  
  Improved debug log formatting and content for more effective troubleshooting.

- **Storage ID Validation**  
  Enhanced validation checks for V2 storage ID with clear error prompts, ensuring proper configuration for Lsky Pro v2 uploads.

## 🧩 Fixes
- Fixed potential inconsistencies when updating uploader instances between Lsky Pro v1/v2 configurations.
- Resolved language switching issues in certain UI states.
- Improved header implementation with version and dependency data.
- Enhanced TypeScript type definitions for better type safety.

## 🛠 Internal Refactor
- Consolidated uploader initialization and configuration update flow.
- Removed unused utilities and deprecated fields for cleaner code structure.
- Simplified code paths and improved overall maintainability.
- Updated project metadata including version numbers and dependency requirements.

## 🧪 Compatibility
- ✅ Tested on Obsidian v1.10.6
- ✅ Verified on Windows 11

---

# 更新日志

## ✨ 优化改进
- **i18n 模块优化**  
  重构国际化实现，使用 Obsidian 内置 API 获取语言设置，移除冗余的语言设置选项。  
  设置项标签现在会随语言切换动态更新，无需重新加载插件。

- **文件缓存功能**  
  添加文件缓存机制，减少重复的文件系统查询，显著提升上传性能。  
  优化移动端上传事件注册时机，提高触摸设备上的稳定性。

- **调试模式增强**  
  使用模块化的 `debugState` 重构调试模式实现，替代全局变量。  
  为调试模式和语言设置添加 UI 控制选项，提升用户可配置性。  
  改进调试日志格式和内容，使故障排查更加高效。

- **存储 ID 验证**  
  增强 V2 版本存储 ID 的验证检查和错误提示，确保 Lsky Pro v2 上传的正确配置。

## 🧩 问题修复
- 修复在 Lsky Pro v1/v2 配置之间更新上传器实例时可能出现的不一致问题。
- 解决特定 UI 状态下的语言切换问题。
- 改进 Header 实现，添加版本号和依赖数据。
- 增强 TypeScript 类型定义，提高类型安全性。

## 🛠 内部重构
- 整合上传器初始化和配置更新流程。
- 移除未使用的工具函数和废弃字段，使代码结构更简洁。
- 简化代码路径，提高整体可维护性。
- 更新项目元数据，包括版本号和依赖要求。

## 🧪 兼容性
- ✅ 测试版本：Obsidian v1.10.6
- ✅ 测试平台：Windows 11

---

## [1.1.1] - 2025-11-15

# Release Notes

## ✨ Improvements
- **Refactored Uploader Configuration Logic**  
  The internal settings update mechanism has been redesigned. Instead of rebuilding the uploader every time, the plugin now updates single config items precisely and efficiently.

- **Dynamic i18n Labels for Settings**  
  Settings fields now support dynamic translation based on the current UI language.  
  Labels update instantly when the user switches language (no reload required).

- **Cleaner and Safer Upload Configuration**  
  Removed deprecated fields and unused utilities.  
  Updated MIME type handling for more accurate detection of image formats.

## 🧩 Fixes
- Improved robustness when updating uploader instances between Lsky Pro v1 / v2.
- Fixed possible inconsistencies when switching languages under certain UI states.
- Cleaned up type definitions to ensure stronger TypeScript safety.

## 🛠 Internal Refactor
- Consolidated uploader initialization and configuration update flow.
- Simplified code paths and improved maintainability.
- Removed unused old utilities left from earlier versions.

## 🧪 Compatibility
- ✅ Tested on Obsidian v1.10.3
- ✅ Verified on Windows 11

---

# 更新日志

## ✨ 优化改进
- **重构上传器配置更新机制**  
  设置更新不再强制重建上传器实例，改为按需更新单个字段，提高性能与稳定性。

- **设置项动态多语言标签**  
  设置项名称现在会随语言切换自动更新，无需重载插件，语言切换更自然。

- **更精确的 MIME 类型处理**  
  优化文件类型识别逻辑，提高对多种图片格式的兼容性。

- **清理废弃代码**  
  移除未使用的工具函数与过期字段，使代码结构更精简。

## 🧩 问题修复
- 修复：部分情况下语言切换不完整的问题。
- 修复：上传器在不同版本（Lsky Pro v1 / v2）之间切换可能导致配置不一致的问题。
- 强化 TS 类型定义，减少潜在运行时错误。

## 🛠 内部重构
- 抽离上传器配置更新流程，统一管理逻辑路径。
- 提升代码可读性与可维护性。
- 精简无用依赖与旧结构。

## 🧪 兼容性
- ✅ 测试版本：Obsidian v1.10.3
- ✅ 测试平台：Windows 11

---

## [1.1.0] - 2025-10-18

# Release Notes

## ✨ New Features
- **Attachment Auto Upload (Mobile)**  
  Insert an image on mobile, and the plugin uploads it instantly (tested on Android / iOS).

- **Multi-language Support**  
  Added support for Auto / English / Simplified Chinese — switchable in settings.

- **Concurrent Upload Modes**  
  Choose between Low / Medium / High concurrency for faster bulk uploads.

- **Debug Logging System**  
  Added a flexible debug mode. You can toggle at runtime via the console:  
  ```js
  window.__LSKY_RUNTIME_DEBUG__ = true
  ```  
  Enables real-time debug output without reloading the plugin.

## ⚙️ Improvements
- Unified response handling across all API versions (`status / message / data` fields).
- Fully removed Node dependencies — now 100% browser API based.
- Safer logic for deleting local files after upload (prevents accidental deletions).
- Improved settings layout and display on mobile.
- Cleaned up internal uploader initialization and i18n loading order.

## 🧩 Fixes
- Fixed mobile upload compatibility issues by detecting runtime platform.
- Fixed "Delete source file after upload" option not working reliably.
- Fixed settings UI rendering issues on small screens.

## 🧪 Compatibility
- ✅ Tested on Obsidian v1.9.14
- ✅ Verified on Windows 11

---

# 更新日志

## ✨ 新增功能
- **移动端附件自动上传**  
  在移动端插入图片后自动上传，兼容 Android / iOS App。

- **多语言支持**  
  新增多语言系统，支持自动检测、简体中文与英文切换。

- **并发上传模式**  
  提供低 / 中 / 高 三档并发选项，批量上传更高效。

- **调试日志系统**  
  新增可运行时切换的调试模式，可直接在控制台输入：  
  ```js
  window.__LSKY_RUNTIME_DEBUG__ = true
  ```  
  即时启用调试日志，无需重启插件。

## ⚙️ 优化改进
- 统一处理 API 响应结构（`status / message / data`）。
- 移除 Node 依赖，全面改为浏览器原生接口。
- 优化上传后删除源文件逻辑，更安全可靠。
- 优化移动端设置项显示与布局。
- 调整初始化顺序，提升语言与上传模块加载稳定性。

## 🧩 问题修复
- 修复：移动端上传逻辑不兼容问题（通过平台检测自动切换）。
- 修复："上传后删除源文件"在部分场景下未生效的问题。
- 修复：移动端设置面板显示异常。

## 🧪 兼容性
- ✅ 测试版本：Obsidian v1.9.14
- ✅ 测试平台：Windows 11

---

## [1.0.0] - 2025-10-13

# Release Notes

## ✨ Features
- Seamlessly upload images from Obsidian to your LskyPro image host
- Supports right-click menu, drag-and-drop, and clipboard uploads
- Automatically inserts the uploaded image link into your note in Markdown format
- Allows batch uploading of multiple local images at once
- Fully compatible with Lsky Pro v1 and v2 APIs

## 🧩 Performance & Reliability
- Refined upload workflow for smoother, more stable performance
- Improved handling of network errors and unexpected responses
- Cleaner log output — only essential warnings and errors are shown

## 🧪 Compatibility
- ✅ Tested with Obsidian v1.9.14
- ✅ Verified on Windows 10 / 11
- 🧠 Designed to work across all platforms supported by Obsidian

---

# 更新日志

## ✨ 功能特性
- 在 Obsidian 中可直接将图片上传到 LskyPro 图床
- 支持右键菜单上传、拖拽上传与剪贴板上传
- 上传后自动在笔记中插入 Markdown 图片链接
- 支持批量上传多张本地图片至图床
- 完全兼容 Lsky Pro v1 / v2 接口

## 🧩 性能与稳定性
- 优化上传流程，确保更流畅与稳定的使用体验
- 改进网络错误与响应异常的处理机制
- 精简日志输出，仅保留关键警告与错误信息

## 🧪 兼容性
- ✅ 测试环境：Obsidian v1.9.14
- ✅ 测试系统：Windows 10 / 11
- 🧠 适用于所有 Obsidian 支持的平台
