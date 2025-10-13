import { App, TFile, normalizePath } from "obsidian";
import { PluginSettings } from "./setting";

type UploadResult = {
  success: boolean;
  url?: string;
  result?: string[];
  msg?: string | null;
};

interface LskyApiResponse {
  status: boolean | string | number;
  message?: string;
  data?: {
    public_url?: string;        // v2
    links?: { url?: string };   // v1
  };
}

interface ParsedResult {
  success: boolean;
  message: string;
  url: string | null;
}

function parseUploadResult(response: LskyApiResponse): ParsedResult {
  if (!response) {
    return { success: false, message: "响应为空", url: null };
  }

  const { status, message, data } = response;

  const success =
    status === true ||
    status === "success" ||
    status === 200;

  const url = data?.public_url || data?.links?.url || null;

  return {
    success,
    message: message || (success ? "上传成功" : "上传失败"),
    url,
  };
}

export class LskyProUploader {
  private settings: PluginSettings;
  private lskyUrl: string;
  private lskyToken: string;
  private app: App;
  private version: "v1" | "v2";

  constructor(settings: PluginSettings, app: App, version: "v1" | "v2" = "v2") {
    this.settings = settings;
    this.app = app;
    this.version = version;
    
    // 初始化配置
    this.initializeConfig();
  }

  /**
   * 初始化或更新配置
   */
  private initializeConfig() {
    const apiPath = this.version === "v1" ? "api/v1/upload" : "api/v2/upload";
    this.lskyUrl = this.settings.uploadServer.endsWith("/")
      ? this.settings.uploadServer + apiPath
      : this.settings.uploadServer + "/" + apiPath;

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

  private getRequestOptions(file: File): RequestInit {
    const headers = new Headers();
    headers.append("Authorization", this.lskyToken);
    headers.append("Accept", "application/json");

    const formData = new FormData();
    formData.append("file", file);

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
   */
private async uploadRawFile(file: File): Promise<UploadResult> {
  try {
    const requestOptions = this.getRequestOptions(file);
    const res = await fetch(this.lskyUrl, requestOptions);

    if (!res.ok) {
      return { success: false, msg: `HTTP错误: ${res.status}` };
    }
    let json: LskyApiResponse;
    try {
      json = await res.json();
    } catch {
      return { success: false, msg: "响应解析失败（非JSON）" };
    }

    const parsed = parseUploadResult(json);

    if (parsed.success && parsed.url) {
      return { success: true, url: parsed.url };
    } else {
      // 不输出警告，只返回失败信息
      return { success: false, msg: parsed.message };
    }
  } catch (error: any) {
    // 不打印错误日志，让上层统一处理
    return { success: false, msg: error?.message || "上传请求异常" };
  }
}


  /**
   * 将本地 Vault 文件路径转为 File 对象
   */
  private async createFileObjectFromPath(filePath: string): Promise<File> {
    const abstractFile = this.app.vault.getAbstractFileByPath(normalizePath(filePath));
    if (!(abstractFile instanceof TFile)) throw new Error("文件路径无效");

    const data = await this.app.vault.readBinary(abstractFile);
    const fileExt = abstractFile.extension || "png";
    const file = new File([new Blob([data], { type: `image/${fileExt}` })], abstractFile.name);
    return file;
  }

  /**
   * 上传单个文件（支持 File 或路径 string）
   */
  async uploadSingleFile(fileOrPath: File | string): Promise<UploadResult> {
    try {
      const file = typeof fileOrPath === "string"
        ? await this.createFileObjectFromPath(fileOrPath)
        : fileOrPath;

      return await this.uploadRawFile(file);
    } catch (err: any) {
      return { success: false, msg: err?.message || "上传错误" };
    }
  }

  /**
   * 批量上传文件（支持路径数组或 File 数组）
   */
  async uploadFiles(inputs: Array<File | string>): Promise<UploadResult> {
    try {
      const files = await Promise.all(
        inputs.map(async (input) =>
          typeof input === "string" ? await this.createFileObjectFromPath(input) : input
        )
      );

      const results = await Promise.all(files.map((file) => this.uploadRawFile(file)));

      const failed = results.find((res) => !res.success);
      if (failed) throw new Error(failed.msg || "部分文件上传失败");

      const urls = results.map((res) => res.url || "").filter(Boolean);
      return { success: true, result: urls };
    } catch (err: any) {
      return { success: false, msg: err?.message || "批量上传失败" };
    }
  }

  /**
   * 上传剪贴板中的图片
   */
  async uploadFromClipboard(evt: ClipboardEvent): Promise<UploadResult> {
    try {
      const file = evt.clipboardData?.files?.[0];
      if (!file) throw new Error("剪贴板中无图片文件");

      return await this.uploadSingleFile(file);
    } catch (err: any) {
      return { success: false, msg: err?.message || "上传剪贴板图片失败" };
    }
  }
}
