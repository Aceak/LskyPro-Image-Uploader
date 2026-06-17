/**
 * 上传模块
 * 实现与LskyPro服务器的交互，支持V1和V2两个版本的API
 */
import { App, TFile, normalizePath, Notice, requestUrl } from "obsidian";
import { PluginSettings, getSettingLabel } from "./setting";
import { t } from "./lang/i18n";
import { dbg, getMimeTypeFromExt } from "./utils";


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
    return { success: false, message: t("response.empty"), url: null };
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
    message: message || (success ? t("response.success") : t("response.failed")),
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
  updateSetting<K extends keyof PluginSettings>(key: K, value: PluginSettings[K]) {
    this.settings[key] = value;

    // 当切换 uploader 版本时，同步更新内部 version 字段
    if (key === "uploader") {
      this.version = value === "LskyPro-v1" ? "v1" : "v2";
    }

    const label = getSettingLabel(key) ?? key;

    dbg(t("setting.updateConfig") + `${label} = ${String(value)}`);

    // 仅在需要时重新初始化配置
    this.initializeConfig();
  }

  /**
   * 获取请求选项
   * @param file 要上传的文件
   * @returns 请求配置对象
   */
  private getRequestOptions(file: File) {
    const headers: Record<string, string> = {
      Authorization: this.lskyToken,
      Accept: "application/json",
    };

    const formData = new FormData();
    formData.append("file", file);

    // 根据版本添加不同的参数
    if (this.version === "v1" && this.settings.strategy_id) {
      formData.append("strategy_id", this.settings.strategy_id);
    } else if (this.version === "v2") {
      // V2版本必需参数：storage_id
      if (this.settings.storage_id) {
        formData.append("storage_id", this.settings.storage_id);
      }
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
      // 验证V2版本必需参数
      if (this.version === "v2" && !this.settings.storage_id) {
        return { success: false, msg: t("upload.v2.storageIdRequired") };
      }

      // 获取请求选项
      const requestOptions = this.getRequestOptions(file);
      const { body, contentType } = await buildMultipartBody(requestOptions.body);

      // ── 调试：请求信息 ──
      dbg("========== [Upload] Request Start ==========");
      dbg("[Upload] API Version:", this.version);
      dbg("[Upload] URL:", this.lskyUrl);
      dbg("[Upload] Method: POST");

      // 请求头（token 脱敏）
      Object.entries(requestOptions.headers).forEach(([key, value]) => {
        if (key.toLowerCase() === "authorization") {
          const masked = value.length > 12
            ? value.substring(0, 10) + "..." + value.substring(value.length - 4)
            : "***";
          dbg(`[Upload] Header: ${key} = ${masked}`);
        } else {
          dbg(`[Upload] Header: ${key} = ${value}`);
        }
      });
      dbg(`[Upload] Header: Content-Type = ${contentType}`);

      // 请求体字段（文件只显示名字/大小/类型，非文件字段显示完整值）
      const fd = requestOptions.body;
      const fdIter = fd as unknown as { entries(): IterableIterator<[string, FormDataEntryValue]> };
      for (const [field, value] of fdIter.entries()) {
        if (value instanceof File) {
          dbg(`[Upload] FormData: ${field} = <File> name="${value.name}" size=${(value.size / 1024).toFixed(1)}KB type="${value.type}"`);
        } else {
          dbg(`[Upload] FormData: ${field} = ${String(value)}`);
        }
      }
      dbg("[Upload] Body size:", (body instanceof ArrayBuffer ? body.byteLength : "unknown"), "bytes");
      dbg("========== [Upload] Request End ==========");

      // 发送请求到LskyPro服务器
      const res = await requestUrl({
        url: this.lskyUrl,
        method: "POST",
        body,
        headers: {
          ...requestOptions.headers,
          "Content-Type": contentType
        }
      });

      // ── 调试：响应信息 ──
      dbg("========== [Upload] Response Start ==========");
      dbg("[Upload] Response Status:", res.status);
      try {
        dbg("[Upload] Response Headers:", JSON.stringify(res.headers));
      } catch {
        dbg("[Upload] Response Headers:", res.headers);
      }
      dbg("[Upload] Response Body:", res.text);
      dbg("========== [Upload] Response End ==========");

      // 检查HTTP响应状态
      if (res.status < 200 || res.status >= 300) {
        return { success: false, msg: t("upload.httpError") + ": " + res.status };
      }
      
      // 尝试解析JSON响应
      let json: LskyApiResponse;
      try {
          const text = res.text ?? "";
          json = JSON.parse(text);
      } catch {
        return { success: false, msg: t('response.parseFailed') };
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
    } catch (err) {
      // err 可能不是 Error，而是任意值
      let msg = t('upload.requestException');

      if (err instanceof Error) {
        msg = err.message;
        dbg("[Upload] Error Message:", err.message);
        if (err.stack) {
          dbg("[Upload] Stack Trace:", err.stack);
        }
      } else if (typeof err === 'string') {
        msg = err;
        dbg("[Upload] Error Message:", err);
      } else {
        try {
          const errStr = JSON.stringify(err, null, 2);
          msg = errStr;
          dbg("[Upload] Error Details:", errStr);
        } catch {
          msg = t('upload.requestException');
          dbg("[Upload] Error Message:", msg);
        }
      }

      return { success: false, msg };
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
    if (!(abstractFile instanceof TFile)) throw new Error(t('upload.invalidPath'));

    // 读取文件二进制内容
    const data = await this.app.vault.readBinary(abstractFile);

    const fileExt = abstractFile.extension;
    const mime = getMimeTypeFromExt(fileExt);
    
    // 创建 Blob 和 File 对象
    return new File(
      [new Blob([data], { type: mime })],
      abstractFile.name,
      { type: mime },
    )
  }

  /**
   * 上传单个文件（支持 File 对象或文件路径字符串）
   * @param fileOrPath 文件对象或文件路径字符串
   * @returns 上传结果
   */
  async uploadSingleFile(fileOrPath: File | string): Promise<UploadResult> {
    dbg(t("main.uploadSingleFile"))
    try {
      // 判断输入类型，如果是字符串则转换为File对象
      const file = typeof fileOrPath === 'string'
        ? await this.createFileObjectFromPath(fileOrPath)
        : fileOrPath;

      // 调用原始上传方法
      return await this.uploadRawFile(file);
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : t("upload.error");

      return { success: false, msg: message };
    }
  }

  /**
   * 批量上传文件（支持路径数组或 File 数组）
   * @param inputs 文件对象或文件路径字符串组成的数组
   * @returns 批量上传结果，成功时包含所有上传成功的URL数组
   */
  async uploadFiles(inputs: Array<File | string>): Promise<UploadResult> {
    dbg(t("main.uploadFiles"))
    try {
      // 验证V2版本必需参数
      if (this.version === "v2" && !this.settings.storage_id) {
        return { success: false, msg: t("upload.v2.storageIdRequired") };
      }

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
      if (failed) throw new Error(failed.msg || t('response.someFailed'));

      // 收集所有成功上传的URL
      const urls = results.map((res) => res.url || '').filter(Boolean);
      return { success: true, result: urls };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("upload.batchFailed");

      return { success: false, msg: message };
    }
  }

  /**
   * 限流并行上传（支持配置并发数量）
   * @param inputs 文件路径或 File 对象数组
   * @param concurrency 并发数量（纯数字）
   */
  async uploadWithLimit(
    inputs: Array<File | string>,
    concurrency: number = 3
  ): Promise<UploadResult> {
    dbg(t("main.uploadWithLimit"))
    const results: (UploadResult | null)[] = new Array<UploadResult | null>(inputs.length).fill(null);
    const total = inputs.length;
    let current = 0;
    let successCount = 0;

    // 验证V2版本必需参数
    if (this.version === "v2" && !this.settings.storage_id) {
      return { success: false, msg: t("upload.v2.storageIdRequired") };
    }

    // 队列任务
    const queue = async (input: File | string, index: number) => {
      try {
        const result = await this.uploadSingleFile(input);
        results[index] = result;
        current++;
        if (result.success) successCount++;
        new Notice(`${t('upload.progress')}: ${current}/${total}`);
      } catch (err) {
        const message = err instanceof Error
          ? err.message
          : t("upload.exception");

        results[index] = { success: false, msg: message };
        current++;
        new Notice(`${t('upload.exception')}: ${current}/${total}`);
      }
    };

    const running = new Set<Promise<void>>();
    
    for (let i = 0; i < inputs.length; i++) {
      const item = inputs[i];
      const task = queue(item, i).finally(() => {
        running.delete(task);
      });

      running.add(task);

      // 并发控制
      if (running.size >= concurrency) {
        await Promise.race(running);
      }
    }
    await Promise.all(running);

    // 汇总结果
    const validResults = results.filter((r): r is UploadResult => r !== null);
    const failed = validResults.filter((r) => !r.success);
    if (failed.length > 0) {
      return {
        success: false,
        msg: t('upload.summary.completed', {
          successCount,
          total,
          failedCount: failed.length,
        }),
        result: validResults.filter(r => r.success).map(r => r.url),
      };
    }

    return {
      success: true,
      result: validResults.map(r => r.url),
      msg: t('upload.summary.allCompleted', { total }),
    };
  }

  /**
   * 上传剪贴板中的图片
   * @param evt 剪贴板事件对象，包含要上传的图片数据
   * @returns 上传结果对象，成功时包含图片URL
   */
  async uploadFromClipboard(evt: ClipboardEvent): Promise<UploadResult> {
    dbg(t("main.uploadFromClipboard"))
    try {
      // 验证V2版本必需参数
      if (this.version === "v2" && !this.settings.storage_id) {
        return { success: false, msg: t("upload.v2.storageIdRequired") };
      }

      const file = evt.clipboardData?.files?.[0];
      if (!file) throw new Error(t("upload.clipboardEmpty"));

      return await this.uploadSingleFile(file);
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : t("upload.clipboardFailed");

      return { success: false, msg: message };
    }
  }
}

/**
 * 将 FormData 转为 requestUrl 可接受的 multipart/form-data body
 */
export async function buildMultipartBody(formData: FormData) {
  const boundary = "----LskyProBoundary" + Math.random().toString(16).slice(2);

  const chunks: Uint8Array[] = [];

  const encoder = new TextEncoder();

  const iterable = formData as unknown as {
    entries(): IterableIterator<[string, FormDataEntryValue]>;
  };

  // 遍历 FormData
  for (const [field, value] of iterable.entries()) {
    const header =
      `--${boundary}\r\n` +
      (value instanceof File
        ? `Content-Disposition: form-data; name="${field}"; filename="${value.name}"\r\n` +
          `Content-Type: ${value.type || "application/octet-stream"}\r\n\r\n`
        : `Content-Disposition: form-data; name="${field}"\r\n\r\n`);

    chunks.push(encoder.encode(header));

    if (value instanceof File) {
      // File → ArrayBuffer
      const buf = await value.arrayBuffer();
      chunks.push(new Uint8Array(buf));
    } else {
      // 普通字符串
      chunks.push(encoder.encode(String(value)));
    }

    chunks.push(encoder.encode("\r\n"));
  }

  // 结束 boundary
  chunks.push(encoder.encode(`--${boundary}--\r\n`));

  // 合并所有 Uint8Array
  const size = chunks.reduce((sum, c) => sum + c.length, 0);
  const body = new Uint8Array(size);

  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }

  return {
    body: body.buffer,
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
}