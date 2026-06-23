/**
 * helper.ts 完整功能测试 — getImageLink / hasBlackDomain
 */
import { describe, it, expect } from "vitest";
import Helper from "../src/helper";

// 最小化 App mock
const mockApp = {
  workspace: {
    getActiveFile: () => null,
    getActiveViewOfType: () => null,
  },
  metadataCache: {
    getCache: () => null,
  },
  vault: {} as any,
} as any;

describe("Helper.getImageLink", () => {
  const helper = new Helper(mockApp);

  it("Markdown 图片链接 ![]()", () => {
    const links = helper.getImageLink("![](a.png)");
    expect(links.length).toBe(1);
    expect(links[0].path).toBe("a.png");
    expect(links[0].source).toBe("![](a.png)");
  });

  it("带 alt 文本", () => {
    const links = helper.getImageLink("![描述](photos/img.jpg)");
    expect(links.length).toBe(1);
    expect(links[0].path).toBe("photos/img.jpg");
  });

  it("多个 Markdown 图片", () => {
    const links = helper.getImageLink("![](a.png) 和 ![](b.jpg)");
    expect(links.length).toBe(2);
    expect(links[0].path).toBe("a.png");
    expect(links[1].path).toBe("b.jpg");
  });

  it("Wiki 格式图片 ![[ ]]", () => {
    const links = helper.getImageLink("![[image.png]]");
    expect(links.length).toBe(1);
    expect(links[0].path).toBe("image.png");
    expect(links[0].source).toBe("![[image.png]]");
  });

  it("Wiki 格式带别名 ![[ | ]]", () => {
    const links = helper.getImageLink("![[photo.jpg | 我的照片]]");
    expect(links.length).toBe(1);
    expect(links[0].path).toBe("photo.jpg");
  });

  it("混合 Markdown 和 Wiki 格式", () => {
    const content = "开头 ![](md.png) 中间 ![[wiki.png]] 结尾";
    const links = helper.getImageLink(content);
    expect(links.length).toBe(2);
    expect(links.map((l) => l.path)).toContain("md.png");
    expect(links.map((l) => l.path)).toContain("wiki.png");
  });

  it("网络图片 URL", () => {
    const links = helper.getImageLink("![](https://example.com/remote.png)");
    expect(links.length).toBe(1);
    expect(links[0].path).toBe("https://example.com/remote.png");
  });

  it("空内容", () => {
    const links = helper.getImageLink("");
    expect(links.length).toBe(0);
  });

  it("无图片的 Markdown", () => {
    const links = helper.getImageLink("**bold** 和 [link](url)");
    expect(links.length).toBe(0);
  });

  it("多个 Wiki 图片", () => {
    const links = helper.getImageLink("![[a.png]] ![[b.jpg]] ![[c.gif]]");
    expect(links.length).toBe(3);
  });

  it("每个 source 保留原始匹配文本", () => {
    const links = helper.getImageLink("![alt](path.png)");
    expect(links[0].source).toBe("![alt](path.png)");
    expect(links[0].path).toBe("path.png");
  });
});

// ============================================================
// hasBlackDomain
// ============================================================
describe("Helper.hasBlackDomain", () => {
  const helper = new Helper(mockApp);

  it("域名在黑名单中", () => {
    expect(
      helper.hasBlackDomain("https://evil.com/img.png", "evil.com")
    ).toBe(true);
  });

  it("域名部分匹配", () => {
    expect(
      helper.hasBlackDomain("https://sub.evil.com/img.png", "evil.com")
    ).toBe(true);
  });

  it("域名不在黑名单中", () => {
    expect(
      helper.hasBlackDomain("https://good.com/img.png", "evil.com")
    ).toBe(false);
  });

  it("多个黑名单域名", () => {
    expect(
      helper.hasBlackDomain(
        "https://spam.net/img.png",
        "evil.com,spam.net,bad.org"
      )
    ).toBe(true);
  });

  it("空黑名单", () => {
    expect(
      helper.hasBlackDomain("https://anything.com/img.png", "")
    ).toBe(false);
  });

  it("空白黑名单", () => {
    expect(
      helper.hasBlackDomain("https://anything.com/img.png", "   ")
    ).toBe(false);
  });

  it("非法 URL 不崩溃", () => {
    expect(helper.hasBlackDomain("not-a-url", "evil.com")).toBe(false);
  });

  it("完整 URL 子域名", () => {
    expect(
      helper.hasBlackDomain("https://a.b.c.d.evil.com/path", "evil.com")
    ).toBe(true);
  });

  it("黑名单分割——域名需精确匹配（不含空格 trim）", () => {
    // hasBlackDomain 用逗号分割但不 trim，所以带空格的域名不会匹配
    expect(
      helper.hasBlackDomain(
        "https://spam.com/img",
        "evil.com,spam.com,bad.org"
      )
    ).toBe(true);
  });
});
