/**
 * utils.ts 完整功能测试
 */
import { describe, it, expect } from "vitest";
import {
  getExtname,
  isAnImage,
  isValidImageExtension,
  getUrlAsset,
  getConcurrencyValue,
  getMimeTypeFromExt,
  encodeMarkdownUrl,
  parseUploaderVersion,
  UPLOADER_V1,
  UPLOADER_V2,
  IMAGE_EXT_LIST,
} from "../src/utils";

// ============================================================
// encodeMarkdownUrl
// ============================================================
describe("encodeMarkdownUrl", () => {
  it("正常路径不变", () => {
    expect(encodeMarkdownUrl("attachments/image.png")).toBe(
      "attachments/image.png"
    );
  });

  it("中文路径编码", () => {
    const result = encodeMarkdownUrl("博客/工具/image.png");
    expect(result).toContain("%E5%8D%9A%E5%AE%A2");
    expect(result).toContain("/%E5%B7%A5%E5%85%B7/");
    expect(result).not.toContain("博客");
  });

  it("编码括号 ()", () => {
    const result = encodeMarkdownUrl("image(1).png");
    expect(result).toContain("%28");
    expect(result).toContain("%29");
  });

  it("编码井号 #", () => {
    const result = encodeMarkdownUrl("image#screenshot.png");
    expect(result).toContain("%23");
  });

  it("斜杠保留不编码", () => {
    const result = encodeMarkdownUrl("a/b/c.png");
    expect(result).toBe("a/b/c.png"); // 斜杠不被 encodeURI 也不被我们的额外编码
  });

  it("混合特殊字符", () => {
    const result = encodeMarkdownUrl("img(副本)#1.png");
    expect(result).toContain("%28");
    expect(result).toContain("%29");
    expect(result).toContain("%23");
    // 中文也在
    expect(result).not.toContain("副本");
  });
});

// ============================================================
// getExtname
// ============================================================
describe("getExtname", () => {
  it("正常扩展名", () => expect(getExtname("test.png")).toBe(".png"));
  it("大写扩展名转小写", () => expect(getExtname("TEST.PNG")).toBe(".png"));
  it("多级扩展名取最后", () => expect(getExtname("archive.tar.gz")).toBe(".gz"));
  it("无扩展名返回空", () => expect(getExtname("README")).toBe(""));
  it("隐藏文件视为无扩展名", () => expect(getExtname(".gitignore")).toBe(""));
  it("空路径", () => expect(getExtname("")).toBe(""));
  it("路径带目录", () => expect(getExtname("a/b/c.JPG")).toBe(".jpg"));
  it("Windows 风格路径", () => expect(getExtname("C:\\Users\\test.PNG")).toBe(".png"));
});

// ============================================================
// isAnImage
// ============================================================
describe("isAnImage", () => {
  it("已知图片格式", () => {
    expect(isAnImage(".png")).toBe(true);
    expect(isAnImage(".jpg")).toBe(true);
    expect(isAnImage(".gif")).toBe(true);
    expect(isAnImage(".webp")).toBe(true);
  });

  it("不带点的扩展名", () => {
    expect(isAnImage("png")).toBe(true);
    expect(isAnImage("JPG")).toBe(true);
    expect(isAnImage("GIF")).toBe(true);
  });

  it("非图片格式", () => {
    expect(isAnImage(".txt")).toBe(false);
    expect(isAnImage(".md")).toBe(false);
    expect(isAnImage("")).toBe(false);
  });

  it("全部 IMAGE_EXT_LIST 中的格式", () => {
    for (const ext of IMAGE_EXT_LIST) {
      expect(isAnImage(ext)).toBe(true);
      expect(isAnImage(ext.toUpperCase())).toBe(true);
      expect(isAnImage(ext.replace(".", ""))).toBe(true);
    }
  });
});

// ============================================================
// isValidImageExtension
// ============================================================
describe("isValidImageExtension", () => {
  it("带点扩展名", () => {
    expect(isValidImageExtension(".png")).toBe(true);
    expect(isValidImageExtension(".jpg")).toBe(true);
  });

  it("不带点扩展名", () => {
    expect(isValidImageExtension("png")).toBe(true);
    expect(isValidImageExtension("JPG")).toBe(true);
  });

  it("非法扩展名", () => {
    expect(isValidImageExtension("exe")).toBe(false);
    expect(isValidImageExtension("")).toBe(false);
  });
});

// ============================================================
// getUrlAsset
// ============================================================
describe("getUrlAsset", () => {
  it("基本 URL", () => {
    expect(getUrlAsset("https://example.com/a/b/c.png")).toBe("c.png");
  });

  it("带查询参数", () => {
    expect(getUrlAsset("https://example.com/img.png?w=100")).toBe("img.png");
  });

  it("带片段标识符", () => {
    expect(getUrlAsset("https://example.com/img.png#fragment")).toBe("img.png");
  });

  it("带查询参数和片段", () => {
    expect(getUrlAsset("https://example.com/img.png?w=100#top")).toBe(
      "img.png"
    );
  });
});

// ============================================================
// getConcurrencyValue
// ============================================================
describe("getConcurrencyValue", () => {
  it("low → 1", () => expect(getConcurrencyValue("low")).toBe(1));
  it("medium → 3", () => expect(getConcurrencyValue("medium")).toBe(3));
  it("high → 5", () => expect(getConcurrencyValue("high")).toBe(5));
  it("数字直接返回", () => expect(getConcurrencyValue(10)).toBe(10));
  it("undefined → 3", () => expect(getConcurrencyValue(undefined)).toBe(3));
  it("非法字符串 → 3", () => expect(getConcurrencyValue("unknown")).toBe(3));
});

// ============================================================
// getMimeTypeFromExt
// ============================================================
describe("getMimeTypeFromExt", () => {
  it("png", () => expect(getMimeTypeFromExt("png")).toBe("image/png"));
  it(".jpg", () => expect(getMimeTypeFromExt(".jpg")).toBe("image/jpeg"));
  it("JPEG", () => expect(getMimeTypeFromExt("JPEG")).toBe("image/jpeg"));
  it("webp", () => expect(getMimeTypeFromExt("webp")).toBe("image/webp"));
  it("未知格式返回 octet-stream", () =>
    expect(getMimeTypeFromExt("xyz")).toBe("application/octet-stream"));
});

// ============================================================
// parseUploaderVersion
// ============================================================
describe("parseUploaderVersion", () => {
  it("V1 常量", () => expect(parseUploaderVersion(UPLOADER_V1)).toBe("v1"));
  it("V2 常量", () => expect(parseUploaderVersion(UPLOADER_V2)).toBe("v2"));

  it("大小写不敏感", () => {
    expect(parseUploaderVersion("LskyPro-V1")).toBe("v1");
    expect(parseUploaderVersion("LSKYPRO-V1")).toBe("v1");
    expect(parseUploaderVersion("lskypro-v1")).toBe("v1");
  });

  it("旧版 v1 简写兼容", () => {
    expect(parseUploaderVersion("v1")).toBe("v1");
    expect(parseUploaderVersion("V1")).toBe("v1");
  });

  it("null/undefined 默认 v2", () => {
    expect(parseUploaderVersion(null)).toBe("v2");
    expect(parseUploaderVersion(undefined)).toBe("v2");
    expect(parseUploaderVersion("")).toBe("v2");
  });

  it("任意未知值默认 v2", () => {
    expect(parseUploaderVersion("random")).toBe("v2");
  });
});
