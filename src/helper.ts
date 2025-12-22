// helper.ts
import { MarkdownView, App } from "obsidian";

/**
 * 图片信息接口
 * 用于存储从 Markdown 文档中提取的图片信息
 */
interface Image {
  path: string;    // 图片路径
  obspath: string; // Obsidian 中的路径
  name: string;    // 图片名称
  source: string;  // 原始 Markdown 链接文本
}

/**
 * 正则表达式 - 匹配标准 Markdown 图片链接
 * 格式：![alt text](path)
 */
const REGEX_FILE = /!\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * 正则表达式 - 匹配 Obsidian Wiki 风格的图片链接
 * 格式：![[image path|optional alias]]
 */
const REGEX_WIKI_FILE = /!\?\[\[(.*?)(\s\|.*?)?\]\]/g;

/**
 * Helper 类 - 提供各种辅助方法
 */
export default class Helper {
  /** Obsidian App 实例 */
  app: App;

  /**
   * 构造函数
   * @param app Obsidian App 实例
   */
  constructor(app: App) {
    this.app = app;
  }

  /**
   * 获取当前活动文件的前置元数据值
   * @param key 要获取的元数据键名
   * @param defaultValue 默认值，当键不存在时返回
   * @returns 元数据值或默认值
   */
  getFrontmatterValue<T = unknown>(key: string, defaultValue?: T): T | undefined {
    const file = this.app.workspace.getActiveFile();
    if (!file) return undefined;

    const cache = this.app.metadataCache.getCache(file.path);
    if (cache?.frontmatter && key in cache.frontmatter) {
      const value = cache.frontmatter[key];
      // 当值存在且不为undefined/null时返回值，否则返回默认值
      if (value !== undefined && value !== null) {
        return value as T;
      }
    }

    return defaultValue;
  }

  /**
   * 获取当前活动编辑视图的编辑器实例
   * @returns 编辑器实例，若没有活动编辑视图则返回 null
   */
  getEditor() {
    const mdView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (mdView) {
      return mdView.editor;
    } else {
      return null;
    }
  }

  /**
   * 获取当前编辑器的内容
   * @returns 编辑器内容字符串
   */
  getValue() {
    const editor = this.getEditor();
    return editor.getValue();
  }

  /**
   * 设置当前编辑器的内容，同时保持滚动位置和光标位置
   * @param value 新的编辑器内容
   */
  setValue(value: string) {
    const editor = this.getEditor();
    // 保存当前滚动位置和光标位置
    const { left, top } = editor.getScrollInfo();
    const position = editor.getCursor();

    // 设置新内容
    editor.setValue(value);
    
    // 恢复滚动位置和光标位置
    editor.scrollTo(left, top);
    editor.setCursor(position);
  }

  /**
   * 获取当前编辑器中的所有图片链接
   * @returns 图片信息数组
   */
  getAllFiles(): Image[] {
    const editor = this.getEditor();
    let value = editor.getValue();
    return this.getImageLink(value);
  }
  
  /**
   * 从文本内容中提取图片链接信息
   * 支持标准 Markdown 格式和 Obsidian Wiki 格式
   * @param value 要处理的文本内容
   * @returns 图片信息数组
   */
  getImageLink(value: string): Image[] {
    const matches = value.matchAll(REGEX_FILE);
    const WikiMatches = value.matchAll(REGEX_WIKI_FILE);

    let fileArray: Image[] = [];

    // 处理标准 Markdown 格式的图片链接
    for (const match of matches) {
      const source = match[0];  // 原始链接文本
      let path = match[2];      // 图片路径
      
      if (!path) continue;

      fileArray.push({
        path: path,
        obspath: path,
        name: "",
        source: source,
      });
    }

    // 处理 Obsidian Wiki 格式的图片链接
    for (const match of WikiMatches) {
      const path = match[1];              // 图片路径
      const source = match[0];            // 原始链接文本
      
      fileArray.push({
        path: path,
        obspath: path,
        name: "",
        source: source,
      });
    }
    
    return fileArray;
  }

  /**
   * 检查图片源是否来自黑名单域名
   * @param src 图片源 URL
   * @param blackDomains 黑名单域名字符串，使用逗号分隔
   * @returns 如果域名在黑名单中返回 true，否则返回 false
   */
  hasBlackDomain(src: string, blackDomains: string) {
    if (blackDomains.trim() === "") {
      return false;
    }
    
    // 分割黑名单域名字符串为数组
    const blackDomainList = blackDomains.split(",").filter(item => item !== "");
    
    try {
      // 解析 URL 并获取域名
      const url = new URL(src);
      const domain = url.hostname;

      // 检查域名是否包含黑名单中的任何一个域名
      return blackDomainList.some(blackDomain => domain.includes(blackDomain));
    } catch {
      return false;
    }
  }
}
