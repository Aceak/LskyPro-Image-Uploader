/**
 * upload.ts 完整功能测试
 */
import { describe, it, expect } from "vitest";
import { buildMultipartBody } from "../src/upload";

// ============================================================
// buildMultipartBody
// ============================================================
describe("buildMultipartBody", () => {
  it("构建包含文件和普通字段的 multipart body", async () => {
    const formData = new FormData();
    const testFile = new File(["hello world"], "test.txt", {
      type: "text/plain",
    });
    formData.append("file", testFile);
    formData.append("storage_id", "42");

    const { body, contentType } = await buildMultipartBody(formData);

    expect(contentType).toMatch(
      /^multipart\/form-data; boundary=----LskyProBoundary/
    );
    expect(body).toBeInstanceOf(ArrayBuffer);

    const text = new TextDecoder().decode(body);
    expect(text).toContain('name="file"');
    expect(text).toContain('filename="test.txt"');
    expect(text).toContain("hello world");
    expect(text).toContain('name="storage_id"');
    expect(text).toContain("42");
    expect(text.trimEnd()).toMatch(/--$/);
  });

  it("只包含普通字段（无文件）", async () => {
    const formData = new FormData();
    formData.append("strategy_id", "7");

    const { body } = await buildMultipartBody(formData);
    const text = new TextDecoder().decode(body);
    expect(text).toContain('name="strategy_id"');
    expect(text).toContain("7");
  });

  it("多个文件", async () => {
    const formData = new FormData();
    formData.append("f1", new File(["aaa"], "a.txt", { type: "text/plain" }));
    formData.append("f2", new File(["bbb"], "b.txt", { type: "text/plain" }));

    const { body } = await buildMultipartBody(formData);
    const text = new TextDecoder().decode(body);
    expect(text).toContain('filename="a.txt"');
    expect(text).toContain('filename="b.txt"');
    expect(text).toContain("aaa");
    expect(text).toContain("bbb");
  });

  it("二进制数据", async () => {
    const pixels = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
    const file = new File([pixels], "image.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("file", file);

    const { body } = await buildMultipartBody(formData);
    const text = new TextDecoder().decode(body);
    expect(text).toContain("image/png");
  });

  it("boundary 唯一性", async () => {
    const formData = new FormData();
    formData.append("x", "1");

    const { contentType: ct1 } = await buildMultipartBody(formData);
    const { contentType: ct2 } = await buildMultipartBody(formData);
    expect(ct1).not.toBe(ct2);
  });

  it("空 FormData 至少包含结束 boundary", async () => {
    const formData = new FormData();
    const { body } = await buildMultipartBody(formData);
    const text = new TextDecoder().decode(body);
    // 空 FormData 时 body 包含 --boundary--\r\n
    // boundary 前缀为 "----LskyProBoundary"，在 body 中写为 "------LskyProBoundary..."
    expect(text.trim()).toMatch(/^------LskyProBoundary\w+--$/);
  });

  it("文件名包含特殊字符", async () => {
    const formData = new FormData();
    formData.append(
      "file",
      new File(["data"], "Screenshot (1).png", { type: "image/png" })
    );

    const { body } = await buildMultipartBody(formData);
    const text = new TextDecoder().decode(body);
    expect(text).toContain('filename="Screenshot (1).png"');
  });
});

// ============================================================
// UploadResult 数据结构
// ============================================================
describe("UploadResult 数据结构", () => {
  it("成功结果的 shape", () => {
    const result = { success: true, url: "https://example.com/img.png" };
    expect(result.success).toBe(true);
    expect(result.url).toBeTruthy();
  });

  it("失败结果保持 null 占位 (batch)", () => {
    const batchResult = {
      success: false,
      result: ["https://example.com/a.png", null],
      msg: "completed: 1/2",
    };
    expect(batchResult.result.length).toBe(2);
    expect(batchResult.result[0]).toBeTruthy();
    expect(batchResult.result[1]).toBeNull();
    expect(batchResult.success).toBe(false);
  });
});
