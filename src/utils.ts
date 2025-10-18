/**
 * 工具函数集合
 * 提供插件中使用的各种通用辅助方法
 */
import { Readable } from "stream";
import { App, TFile, Platform, FileSystemAdapter } from "obsidian";

/**
 * 字符串键映射接口
 * 用于创建以字符串为键的通用对象映射
 */
export interface IStringKeyMap<T> {
  [key: string]: T;
}

/**
 * 支持的图片扩展名列表
 * 导出供其他模块使用
 */
export const IMAGE_EXT_LIST = [
  // 常规格式
  ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".avif", ".tif", ".tiff",
  
  // JPEG 2000 系列
  ".jp2", ".j2k", ".jpc", ".jpf", ".jpx", ".jp2k", ".jpg2", ".jpm", ".j2c",

  // 高效图像格式（HEIC/HEIF）
  ".heic", ".heif",
];

/**
 * 检查给定文件扩展名是否为合法图片类型
 * @param ext 文件扩展名（可带点，也可不带点）
 * @returns 如果是受支持的图片类型则返回 true，否则 false
 */
export function isValidImageExtension(ext: string): boolean {
  if (!ext) return false;
  const normalized = ext.startsWith(".") ? ext.toLowerCase() : "." + ext.toLowerCase();
  return IMAGE_EXT_LIST.includes(normalized);
}

/**
 * 从文件路径中提取扩展名（不依赖 Node.js）
 * @param path 文件路径，例如 "foo/bar/image.png"
 * @returns 扩展名（带点），例如 ".png"；若无扩展名则返回空字符串
 */
export function getExtname(path: string): string {
  if (!path) return "";
  const lastSlash = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
  const filename = path.slice(lastSlash + 1);
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex <= 0) return "";
  return filename.slice(dotIndex).toLowerCase();
}

/**
 * 检查文件扩展名是否为支持的图片格式
 * @param ext 文件扩展名（带点号，如 ".png"）
 * @returns 如果是支持的图片格式返回 true，否则返回 false
 */
export function isAnImage(ext: string) {
  return IMAGE_EXT_LIST.includes(ext.toLowerCase());
}

/**
 * 根据文件路径检查是否为图片文件
 * @param path 文件路径
 * @returns 如果是图片文件返回 true，否则返回 false
 */
export function isAssetTypeAnImage(path: string): Boolean {
  return isAnImage(getExtname(path));
}

/**
 * 将可读流转换为字符串
 * @param stream 可读流对象
 * @returns 转换后的字符串
 */
export async function streamToString(stream: Readable) {
  const chunks = [];

  // 逐块读取流数据
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  // 合并所有数据块并转换为字符串
  return Buffer.concat(chunks).toString("utf-8");
}

/**
 * 从URL中提取资源文件名
 * @param url 完整的URL
 * @returns 提取的资源文件名（不含查询参数和片段标识符）
 */
export function getUrlAsset(url: string) {
  // 移除URL路径中的目录部分，提取文件名
  // 然后移除查询参数和片段标识符
  return (url = url.substring(1 + url.lastIndexOf("/")).split("?")[0]).split(
    "#"
  )[0];
}

/**
 * 从字符串列表中获取最后一个以http开头的图片URL
 * @param list 字符串列表
 * @returns 最后一个找到的图片URL
 */
/**
 * 从字符串列表中获取最后一个以http开头的图片URL
 * @param list 字符串列表
 * @returns 最后一个找到的图片URL
 */
export function getLastImage(list: string[]) {
  // 反转列表以便从末尾开始查找
  const reversedList = list.reverse();
  let lastImage;
  
  // 遍历反转后的列表，查找第一个以http开头的项
  reversedList.forEach(item => {
    if (item && item.startsWith("http")) {
      lastImage = item;
      return item;
    }
  });
  
  return lastImage;
}

/**
 * 任意对象接口定义
 * 用于类型注解中允许任何键值对的对象
 */
interface AnyObj {
  [key: string]: any;
}

/**
 * 将数组转换为对象，使用指定的键作为对象属性
 * @param arr 输入数组
 * @param key 用于提取对象属性的键名
 * @returns 转换后的对象
 */
export function arrayToObject<T extends AnyObj>(
  arr: T[],
  key: string
): { [key: string]: T } {
  const obj: { [key: string]: T } = {};
  
  // 遍历数组，将每个元素添加到对象中
  arr.forEach(element => {
    obj[element[key]] = element;
  });
  
  return obj;
}

/**
 * 解析图片链接并返回对应的文件对象
 * @param app Obsidian应用实例
 * @param rawLink 原始链接字符串
 * @returns 解析到的文件对象，如果无法解析则返回null
 */
export function resolveImageFile(app: App, rawLink: string): TFile | null {
  // 检查链接是否为空
  if (!rawLink) return null;

  // 去除首尾空白字符
  let path = rawLink.trim();

  // 尝试匹配Markdown图片链接格式: ![alt](path)
  const mdMatch = path.match(/!\[.*?\]\((.*?)\)/);
  if (mdMatch) path = mdMatch[1];

  // 尝试匹配Wiki链接格式: ![[path]]
  const wikiMatch = path.match(/^!?(\[\[(.*?)\]\])$/);
  if (wikiMatch) path = wikiMatch[1];

  // 移除可能存在的感叹号前缀
  path = path.replace(/^!/, '').trim();

  // 尝试解码URL编码的路径
  try {
    if (/%[0-9A-Fa-f]{2}/.test(path)) path = decodeURIComponent(path);
  } catch (e) {
    warn('[resolveImageFile] decodeURIComponent failed:', e);
  }

  // 获取当前活动文件的路径作为基准路径
  const activePath = app.workspace.getActiveFile()?.path || '';
  
  // 通过Obsidian的元数据缓存解析链接路径
  const file = app.metadataCache.getFirstLinkpathDest(path, activePath);

  return file;
}

// 获取统一的日志前缀（带时间戳）
function logPrefix(level: string): string {
  const now = new Date().toISOString().split("T")[1].replace("Z", "");
  return `[Lsky-${level.toUpperCase()} ${now}]`;
}

// 调试输出函数(仅当 window.__LSKY_DEBUG__ === true 时才输出日志)
export function dbg(...args: any[]): void {
  try {
    if (typeof window !== "undefined" && (window as any).__LSKY_DEBUG__ === true) {
      console.log(logPrefix("debug"), ...args);
    }
  } catch {
    // 忽略环境不支持 window 或 console 的情况
  }
}

// 警告输出函数
export function warn(...args: any[]): void {
  try {
    console.warn(logPrefix("warn"), ...args);
  } catch {
    // 忽略异常
  }
}

// 错误输出函数
export function error(...args: any[]): void {
  try {
    console.error(logPrefix("error"), ...args);
  } catch {
    // 忽略异常
  }
}

// 获取文件扩展名（替代 path.extname）
export function getExt(path: string): string {
  const i = path.lastIndexOf(".");
  return i >= 0 ? path.slice(i) : "";
}

// 获取文件名（替代 path.basename）
export function getFileName(path: string): string {
  const parts = path.split(/[\\/]/);
  return parts[parts.length - 1];
}

// 获取文件所在目录（替代 path.dirname）
export function getDir(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx >= 0 ? path.slice(0, idx) : "";
}

// 获取文件名（不包含扩展名）
export function getNameWithoutExt(path: string): string {
  const file = getFileName(path);
  const idx = file.lastIndexOf(".");
  return idx >= 0 ? file.slice(0, idx) : file;
}

// 获取平台环境
export function getPlatformEnv(app: App) {
  const adapter = app.vault.adapter;
  if (Platform.isMobileApp) return "mobile";
  if (Platform.isDesktopApp && adapter instanceof FileSystemAdapter) return "desktop";
  return "web";
}

// 获取并发值
export function getConcurrencyValue(mode: string | number | undefined): number {
  if (typeof mode === "number") return mode;

  if (!mode) return 3;

  const map: Record<string, number> = {
    low: 1,
    medium: 3,
    high: 5,
  };

  const parsed = Number(mode);
  if (!isNaN(parsed) && parsed > 0) return parsed;

  return map[mode] ?? 3;
}