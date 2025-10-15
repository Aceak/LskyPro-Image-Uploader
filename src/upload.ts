/**
 * 上传模块
 * 实现与LskyPro服务器的交互，支持V1和V2两个版本的API
 */
import { App, TFile, normalizePath, Notice } from "obsidian";
import { PluginSettings } from "./setting";
import { t } from "./lang/helpers";


/**
 * 上传结果类型定义
 */
type UploadResult = {
  success: boolean;      // 上传是否成功
  url?: string;          // 上传成功后的图片URL
  result?: string[];     // 结果数组
  msg?: string | null;   // 消息
};

/**
 * LskyPro API响应接口
 * 兼容V1和V2两个版本的响应格式
 */
interface LskyApiResponse {
  status: boolean | string | number;  // 状态标记
  message?: string;                   // 响应消息
  data?: {
    public_url?: string;              // V2版本的公开URL
    links?: { url?: string };         // V1版本的链接信息
  };
}

/**
 * 解析后的上传结果接口
 */
interface ParsedResult {
  success: boolean;     // 是否成功
  message: string;      // 消息
  url: string | null;   // 图片URL
}

/**
 * 解析LskyPro API响应
 * @param response API响应对象
 * @returns 解析后的结果对象
 */
function parseUploadResult(response: LskyApiResponse): ParsedResult {
  if (!response) {
    return { success: false, message: t("Response is empty"), url: null };
  }

  const { status, message, data } = response;

  // 判断上传是否成功
  const success = 
    status === true ||
    status === "success" ||
    status === 200;

  // 提取图片URL（兼容V1和V2版本）
  const url = data?.public_url || data?.links?.url || null;

  return {
    success,
    message: message || (success ? t("Upload success") : t("Upload failed")),
    url,
  };
}

/**
 * LskyPro上传器类
 * 提供统一的上传接口，支持V1和V2两个版本的API
 */
export class LskyProUploader {
  private settings: PluginSettings;  // 插件设置
  private lskyUrl: string;           // API端点URL
  private lskyToken: string;         // 认证令牌
  private app: App;                  // Obsidian应用实例
  private version: "v1" | "v2";     // API版本

  /**
   * 构造函数
   * @param settings 插件设置对象
   * @param app Obsidian应用实例
   * @param version API版本，默认为v2
   */
  constructor(settings: PluginSettings, app: App, version: "v1" | "v2" = "v2") {
    this.settings = settings;
    this.app = app;
    this.version = version;
    
    // 初始化配置
    this.initializeConfig();
  }

  /**
   * 初始化或更新配置
   * 设置API端点URL和认证令牌
   */
  private initializeConfig() {
    // 根据版本选择不同的API路径
    const apiPath = this.version === "v1" ? "api/v1/upload" : "api/v2/upload";
    
    // 构建完整的API URL，处理结尾斜杠
    this.lskyUrl = this.settings.uploadServer.endsWith("/")
      ? this.settings.uploadServer + apiPath
      : this.settings.uploadServer + "/" + apiPath;

    // 构建Bearer令牌
    this.lskyToken = "Bearer " + this.settings.token;
  }

  /**
   * 更新配置并重新初始化
   * @param settings 新的设置对象
   */
  updateSettings(settings: PluginSettings) {
    this.settings = settings;
    this.initializeConfig();
  }

  /**
   * 获取请求选项
   * @param file 要上传的文件
   * @returns 请求配置对象
   */
  private getRequestOptions(file: File): RequestInit {
    const headers = new Headers();
    headers.append("Authorization", this.lskyToken);
    headers.append("Accept", "application/json");

    const formData = new FormData();
    formData.append("file", file);

    // 根据版本添加不同的参数
    if (this.version === "v1" && this.settings.strategy_id) {
      formData.append("strategy_id", this.settings.strategy_id);
    } else if (this.version === "v2" && this.settings.storage_id) {
      formData.append("storage_id", this.settings.storage_id);
    }

    return {
      method: "POST",
      headers,
      body: formData,
    };
  }

  /**
   * 统一上传接口，返回封装后的结构体
   * @param file 要上传的文件对象
   * @returns 封装后的上传结果
   */
private async uploadRawFile(file: File): Promise<UploadResult> {
  try {
    // 获取请求选项
    const requestOptions = this.getRequestOptions(file);
    // 发送请求到LskyPro服务器
    const res = await fetch(this.lskyUrl, requestOptions);

    // 检查HTTP响应状态
    if (!res.ok) {
      return { success: false, msg: t(`HTTP Error: ${res.status}`) };
    }
    
    // 尝试解析JSON响应
    let json: LskyApiResponse;
    try {
      json = await res.json();
    } catch {
      return { success: false, msg: t("Response parse failed (non-JSON)") };
    }

    // 解析上传结果
    const parsed = parseUploadResult(json);

    // 处理成功情况
    if (parsed.success && parsed.url) {
      return { success: true, url: parsed.url };
    } else {
      // 不输出警告，只返回失败信息
      return { success: false, msg: parsed.message };
    }
  } catch (error: any) {
    // 不打印错误日志，让上层统一处理
    return { success: false, msg: error?.message || t("Upload request exception") };
  }
}


  /**
   * 将本地 Vault 文件路径转为 File 对象
   * @param filePath Obsidian Vault 中的文件路径
   * @returns 创建的 File 对象
   * @throws 如果文件路径无效则抛出错误
   */
  private async createFileObjectFromPath(filePath: string): Promise<File> {
    // 标准化文件路径并获取文件对象
    const abstractFile = this.app.vault.getAbstractFileByPath(normalizePath(filePath));
    if (!(abstractFile instanceof TFile)) throw new Error(t("Invalid file path"));

    // 读取文件二进制内容
    const data = await this.app.vault.readBinary(abstractFile);
    
    // 获取文件扩展名，默认为 png
    const fileExt = abstractFile.extension || "png";
    
    // 创建 Blob 和 File 对象
    const file = new File([new Blob([data], { type: `image/${fileExt}` })], abstractFile.name);
    return file;
  }

  /**
   * 上传单个文件（支持 File 对象或文件路径字符串）
   * @param fileOrPath 文件对象或文件路径字符串
   * @returns 上传结果
   */
  async uploadSingleFile(fileOrPath: File | string): Promise<UploadResult> {
    try {
      // 判断输入类型，如果是字符串则转换为File对象
      const file = typeof fileOrPath === "string"
        ? await this.createFileObjectFromPath(fileOrPath)
        : fileOrPath;

      // 调用原始上传方法
      return await this.uploadRawFile(file);
    } catch (err: any) {
      // 处理上传错误
      return { success: false, msg: err?.message || t("Upload error") };
    }
  }

  /**
   * 批量上传文件（支持路径数组或 File 数组）
   * @param inputs 文件对象或文件路径字符串组成的数组
   * @returns 批量上传结果，成功时包含所有上传成功的URL数组
   */
  async uploadFiles(inputs: Array<File | string>): Promise<UploadResult> {
    try {
      // 将所有输入转换为File对象
      const files = await Promise.all(
        inputs.map(async (input) =>
          typeof input === "string" ? await this.createFileObjectFromPath(input) : input
        )
      );

      // 并行上传所有文件
      const results = await Promise.all(files.map((file) => this.uploadRawFile(file)));

      // 检查是否有上传失败的文件
      const failed = results.find((res) => !res.success);
      if (failed) throw new Error(failed.msg || t("Some files failed to upload"));

      // 收集所有成功上传的URL
      const urls = results.map((res) => res.url || "").filter(Boolean);
      return { success: true, result: urls };
    } catch (err: any) {
      // 处理批量上传错误
      return { success: false, msg: err?.message || t("Batch upload failed") };
    }
  }

  /**
   * 限流并行上传（支持配置并发数量）
   */
  async uploadWithLimit(inputs: Array<File | string>, concurrency: number = 3): Promise<UploadResult> {
    const results: UploadResult[] = [];
    const total = inputs.length;
    let current = 0;
    let successCount = 0;

    // 队列任务
    const queue = async (input: File | string) => {
      try {
        const result = await this.uploadSingleFile(input);
        results.push(result);
        current++;
        if (result.success) successCount++;
        new Notice(t(`Upload progress: ${current}/${total}`));
      } catch (err: any) {
        results.push({ success: false, msg: err?.message || t("Upload exception") });
        current++;
        new Notice(t(`Upload error: ${current}/${total}`));
      }
    };

    const running: Promise<void>[] = [];

    for (const item of inputs) {
      const task = queue(item);
      running.push(task);

      // 并发控制
      if (running.length >= concurrency) {
        await Promise.race(running);
        // 移除已完成任务
        for (let i = running.length - 1; i >= 0; i--) {
          if (running[i].catch) running.splice(i, 1);
        }
      }
    }

    // 等待剩余任务
    await Promise.all(running);

    // 统一处理结果
    const failed = results.filter((r) => !r.success);
    if (failed.length > 0) {
      return {
        success: false,
        msg: t(`Upload completed (success ${successCount}/${total}, failed ${failed.length})`),
        result: results.filter(r => r.success).map(r => r.url!),
      };
    }

    return {
      success: true,
      result: results.map(r => r.url!),
      msg: t(`All uploads completed successfully (${total} images)`),
    };
  }

  /**
   * 上传剪贴板中的图片
   * @param evt 剪贴板事件对象
   * @returns 上传结果
   */
  /**
   * 上传剪贴板中的图片
   * @param evt 剪贴板事件对象，包含要上传的图片数据
   * @returns 上传结果对象，成功时包含图片URL
   */
  async uploadFromClipboard(evt: ClipboardEvent): Promise<UploadResult> {
    try {
      const file = evt.clipboardData?.files?.[0];
      if (!file) throw new Error(t("Clipboard does not contain any image file"));

      return await this.uploadSingleFile(file);
    } catch (err: any) {
      return { success: false, msg: err?.message || t("Failed to upload image from clipboard") };
    }
  }
}
