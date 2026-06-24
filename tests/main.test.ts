/**
 * main.ts 集成测试 — 核心逻辑路径模拟
 */
import { describe, it, expect } from "vitest";
import { encodeMarkdownUrl, getExtname, parseUploaderVersion, UPLOADER_V1, UPLOADER_V2 } from "../src/utils";
import Helper from "../src/helper";

// Minimal App mock for Helper
const mockApp: any = {
  workspace: {
    getActiveFile: () => null,
    getActiveViewOfType: () => null,
  },
  metadataCache: {
    getCache: () => null,
  },
  vault: {},
};

// ============================================================
// 文件名逻辑 (from saveImageToVault)
// ============================================================
describe("saveImageToVault — 文件名逻辑", () => {
  it("无扩展名默认 .png", () => {
    expect(getExtname("untitled") || ".png").toBe(".png");
  });

  it("大小写不敏感 basename", () => {
    const fileName = "Screenshot.PNG";
    const ext = getExtname(fileName) || ".png";
    const lowerName = fileName.toLowerCase();
    const dotIndex = lowerName.lastIndexOf(ext);
    const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
    expect(baseName).toBe("Screenshot");
  });

  it("正常文件名", () => {
    const fileName = "test.png";
    const ext = getExtname(fileName);
    expect(ext).toBe(".png");
    const lowerName = fileName.toLowerCase();
    const dotIndex = lowerName.lastIndexOf(ext);
    const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
    expect(baseName).toBe("test");
  });

  it("无扩展名 baseName = fileName", () => {
    const fileName = "README";
    const ext = getExtname(fileName) || ".png";
    const lowerName = fileName.toLowerCase();
    const dotIndex = lowerName.lastIndexOf(ext);
    const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
    expect(baseName).toBe("README");
  });

  it("冲突后缀生成", () => {
    let counter = 0;
    const gen = () => `${"image"}-${++counter}${".png"}`;
    expect(gen()).toBe("image-1.png");
    expect(gen()).toBe("image-2.png");
    expect(gen()).toBe("image-3.png");
  });

  it("批量测试各种文件名", () => {
    const cases: [string, string][] = [
      ["test.png", "test"],
      ["Screenshot.PNG", "Screenshot"],
      ["archive.tar.gz", "archive.tar"],
      ["noext", "noext"],
      ["中文图片.jpg", "中文图片"],
      ["image (copy).png", "image (copy)"],
    ];
    for (const [fileName, expectedBase] of cases) {
      const ext = getExtname(fileName) || ".png";
      const lowerName = fileName.toLowerCase();
      const dotIndex = lowerName.lastIndexOf(ext);
      const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
      expect(baseName).toBe(expectedBase);
    }
  });
});

// ============================================================
// Markdown 链接编码
// ============================================================
describe("Markdown 图片链接 — encodeMarkdownUrl", () => {
  it("正常路径不变", () => {
    const md = `![](${encodeMarkdownUrl("attachments/screenshot.png")})`;
    expect(md).toBe("![](attachments/screenshot.png)");
  });

  it("含括号路径被编码", () => {
    const md = `![](${encodeMarkdownUrl("img (1).png")})`;
    expect(md).toContain("%28");
    expect(md).toContain("%29");
  });

  it("含井号路径被编码", () => {
    const md = `![](${encodeMarkdownUrl("img#frag.png")})`;
    expect(md).toContain("%23");
  });

  it("两次编码同一路径结果一致", () => {
    const a = `![](${encodeMarkdownUrl("img (1).png")})`;
    const b = `![](${encodeMarkdownUrl("img (1).png")})`;
    expect(a).toBe(b);
  });

  it("斜杠保留", () => {
    const result = encodeMarkdownUrl("a/b/c.png");
    expect(result).not.toContain("%2F");
    expect(result).toContain("/");
  });

  it("中文路径编码", () => {
    const result = encodeMarkdownUrl("附件/图片.png");
    expect(result).not.toContain("附件");
  });
});

// ============================================================
// 底部向上搜索逻辑 (replaceFirstOccurrence)
// ============================================================
describe("replaceFirstOccurrence — 搜索逻辑", () => {
  function searchBottomUp(lines: string[], target: string) {
    for (let i = lines.length - 1; i >= 0; i--) {
      const ch = lines[i].indexOf(target);
      if (ch !== -1) return { line: i, ch };
    }
    return null;
  }

  function searchFromLine(lines: string[], target: string, fromLine: number) {
    for (let i = fromLine; i < lines.length; i++) {
      const ch = lines[i].indexOf(target);
      if (ch !== -1) return { line: i, ch };
    }
    return searchBottomUp(lines, target);
  }

  it("底部向上匹配最后出现的文本", () => {
    const lines = ["![](same.png)", "中间", "![](same.png)"];
    const pos = searchBottomUp(lines, "![](same.png)");
    expect(pos).not.toBeNull();
    expect(pos.line).toBe(2);
  });

  it("fromLine 跳过前面的匹配", () => {
    const lines = ["旧 ![](img.png)", "中间", "新 ![](img.png)"];
    const pos = searchFromLine(lines, "![](img.png)", 2);
    expect(pos).not.toBeNull();
    expect(pos.line).toBe(2);
  });

  it("fromLine 未找到回退到底部搜索", () => {
    const lines = ["唯一 ![](a.png)", "其他"];
    const pos = searchFromLine(lines, "![](a.png)", 5);
    expect(pos).not.toBeNull();
    expect(pos.line).toBe(0);
  });

  it("完全找不到返回 null", () => {
    const lines = ["无图片"];
    expect(searchBottomUp(lines, "![](missing.png)")).toBeNull();
  });
});

// ============================================================
// 上传结果映射
// ============================================================
describe("上传结果映射 (drop handler)", () => {
  it("部分失败时正确映射到原始索引", () => {
    // 3 个文件，文件 1 本地保存失败被跳过
    const uploadQueue = [
      { file: new File([], "a.png"), index: 0 },
      { file: new File([], "c.png"), index: 2 },
    ];
    const uploadResult = {
      success: false,
      result: ["https://cdn/a.png", "https://cdn/c.png"],
    };
    const total = 3;
    const resultUrls: (string | null)[] = new Array<(string | null)>(total).fill(null);

    for (let j = 0; j < uploadQueue.length && j < uploadResult.result.length; j++) {
      resultUrls[uploadQueue[j].index] = uploadResult.result[j];
    }

    expect(resultUrls).toEqual(["https://cdn/a.png", null, "https://cdn/c.png"]);
  });

  it("检查是否有任何成功结果", () => {
    const allNull = [null, null, null];
    const hasAny = allNull.some((u) => u !== null);
    expect(hasAny).toBe(false);

    const someOk: (string | null)[] = [null, "url", null];
    expect(someOk.some((u) => u !== null)).toBe(true);
  });

  it("appendUploadedUrls 过滤 null", () => {
    const urls: (string | null)[] = ["url1", null, "url3"];
    const valid = urls.filter((u): u is string => u !== null);
    expect(valid).toEqual(["url1", "url3"]);
  });
});

// ============================================================
// parseUploaderVersion 迁移兼容
// ============================================================
describe("parseUploaderVersion 迁移兼容", () => {
  it("旧版大写 V1: 'LskyPro-V1'", () => {
    expect(parseUploaderVersion("LskyPro-V1")).toBe("v1");
  });

  it("旧版大写 V2: 'LskyPro-V2'", () => {
    expect(parseUploaderVersion("LskyPro-V2")).toBe("v2");
  });

  it("极旧简写 'v1'", () => {
    expect(parseUploaderVersion("v1")).toBe("v1");
  });

  it("新版常量", () => {
    expect(parseUploaderVersion(UPLOADER_V1)).toBe("v1");
    expect(parseUploaderVersion(UPLOADER_V2)).toBe("v2");
  });

  it("null/undefined 默认 v2", () => {
    expect(parseUploaderVersion(null)).toBe("v2");
    expect(parseUploaderVersion(undefined)).toBe("v2");
    expect(parseUploaderVersion("")).toBe("v2");
  });
});

// ============================================================
// Helper.getImageLink
// ============================================================
describe("Helper.getImageLink", () => {
  const helper = new Helper(mockApp);

  it("Markdown ![]()", () => {
    const links = helper.getImageLink("![](a.png)");
    expect(links.length).toBe(1);
    expect(links[0].path).toBe("a.png");
  });

  it("Wiki ![[ ]]", () => {
    const links = helper.getImageLink("![[image.png]]");
    expect(links.length).toBe(1);
    expect(links[0].path).toBe("image.png");
  });

  it("混合格式", () => {
    const links = helper.getImageLink("![](md.png) 和 ![[wiki.png]]");
    expect(links.length).toBe(2);
  });

  it("source 保留原始匹配", () => {
    const links = helper.getImageLink("![alt](path.png)");
    expect(links[0].source).toBe("![alt](path.png)");
  });
});

// ============================================================
// Helper.hasBlackDomain
// ============================================================
describe("Helper.hasBlackDomain", () => {
  const helper = new Helper(mockApp);

  it("域名在黑名单中", () => {
    expect(helper.hasBlackDomain("https://evil.com/img.png", "evil.com")).toBe(true);
  });

  it("域名不在黑名单中", () => {
    expect(helper.hasBlackDomain("https://good.com/img.png", "evil.com")).toBe(false);
  });

  it("空黑名单", () => {
    expect(helper.hasBlackDomain("https://x.com/img.png", "")).toBe(false);
  });

  it("非法 URL 不崩溃", () => {
    expect(helper.hasBlackDomain("not-a-url", "evil.com")).toBe(false);
  });

  it("多个黑名单域名", () => {
    expect(
      helper.hasBlackDomain("https://spam.net/img.png", "evil.com,spam.net")
    ).toBe(true);
  });

  it("子域名匹配", () => {
    expect(
      helper.hasBlackDomain("https://sub.evil.com/img.png", "evil.com")
    ).toBe(true);
  });
});
