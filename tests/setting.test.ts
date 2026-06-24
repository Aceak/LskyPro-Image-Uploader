/**
 * setting.ts 测试 — DEFAULT_SETTINGS / getSettingLabel / concurrency
 */
import { describe, it, expect } from "vitest";
import {
  DEFAULT_SETTINGS,
  getSettingLabel,
  concurrencyKeys,
} from "../src/setting";
import { CONCURRENCY_MAP } from "../src/utils";
import { UPLOADER_V2 } from "../src/utils";

describe("DEFAULT_SETTINGS", () => {
  it("所有必填字段有默认值", () => {
    expect(DEFAULT_SETTINGS.debug).toBe(false);
    expect(DEFAULT_SETTINGS.uploadByClipSwitch).toBe(true);
    expect(DEFAULT_SETTINGS.uploadAttachmentsSwitch).toBe(true);
    expect(DEFAULT_SETTINGS.uploader).toBe(UPLOADER_V2);
    expect(DEFAULT_SETTINGS.token).toBe("");
    expect(DEFAULT_SETTINGS.storage_id).toBe("");
    expect(DEFAULT_SETTINGS.strategy_id).toBe("");
    expect(DEFAULT_SETTINGS.uploadServer).toBe("https://lsky.xxxx");
    expect(DEFAULT_SETTINGS.workOnNetWork).toBe(false);
    expect(DEFAULT_SETTINGS.newWorkBlackDomains).toBe("");
    expect(DEFAULT_SETTINGS.deleteSource).toBe(false);
    expect(DEFAULT_SETTINGS.concurrencyMode).toBe("medium");
  });

  it("默认使用 V2 上传器", () => {
    expect(DEFAULT_SETTINGS.uploader).toBe("LskyPro-v2");
  });

  it("uploadedImages 可选字段", () => {
    expect(DEFAULT_SETTINGS.uploadedImages).toBeUndefined();
  });
});

describe("getSettingLabel", () => {
  it("返回翻译 key", () => {
    expect(typeof getSettingLabel("token")).toBe("string");
    expect(getSettingLabel("token").length).toBeGreaterThan(0);
  });

  it("所有应该有的 key 都有 label", () => {
    const keys: (keyof typeof DEFAULT_SETTINGS)[] = [
      "uploader",
      "uploadServer",
      "token",
      "storage_id",
      "strategy_id",
      "uploadAttachmentsSwitch",
      "uploadByClipSwitch",
      "newWorkBlackDomains",
      "deleteSource",
      "concurrencyMode",
      "workOnNetWork",
    ];
    for (const key of keys) {
      expect(getSettingLabel(key)).toBeTruthy();
    }
  });

  it("不存在的 key 返回 undefined", () => {
    expect(getSettingLabel("uploadedImages" as any)).toBeUndefined();
  });
});

describe("CONCURRENCY_MAP (from utils)", () => {
  it("low → 1", () => expect(CONCURRENCY_MAP.low).toBe(1));
  it("medium → 3", () => expect(CONCURRENCY_MAP.medium).toBe(3));
  it("high → 5", () => expect(CONCURRENCY_MAP.high).toBe(5));
});

describe("concurrencyKeys", () => {
  it("有翻译 key", () => {
    expect(concurrencyKeys.low).toContain("concurrency");
    expect(concurrencyKeys.medium).toContain("concurrency");
    expect(concurrencyKeys.high).toContain("concurrency");
  });
});
