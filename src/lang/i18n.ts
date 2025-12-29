// i18n.ts
import { App, getLanguage } from "obsidian";
import { dbg, warn} from "../utils";

import en from "./locale/en";
import zhCN from "./locale/zh-cn";
import zhTW from "./locale/zh-tw";

const localeMap = {
  en,
  "zh-cn": zhCN,
  "zh-tw": zhTW,
} as const;

export const languageName: Record<string, string> = {
  auto: "Auto",
  "zh-cn": "简体中文",
  "zh-tw": "繁體中文",
  en: "English",
};

export type TranslationDict = typeof en;
export type TranslationKeys = keyof TranslationDict;

type LocaleKey = keyof typeof localeMap;

function normalizeLocale(code: string): string {
  const lower = (code || "en").toLowerCase();
  if (lower === "zh" || lower.startsWith("zh-cn")) return "zh-cn";
  if (lower.startsWith("zh-tw") || lower.startsWith("zh-hk") || lower.startsWith("zh-mo")) return "zh-tw";
  if (lower.startsWith("en-")) return "en";
  return lower.split("-")[0];
}

function isLocaleKey(v: string): v is LocaleKey {
  return v in localeMap;
}

function getLocale(code: string): { key: LocaleKey; dict: TranslationDict } {
  const norm = normalizeLocale(code);

  if (isLocaleKey(norm)) {
    return { key: norm, dict: localeMap[norm] };
  }

  warn(`[i18n] Missing or empty locale "${norm}", fallback to English.`);
  return { key: "en", dict: en };
}


// 默认使用英语作为初始语言
let currentLocale: LocaleKey = "en";
let locale: TranslationDict = en;

if (!locale || Object.keys(locale).length === 0) {
  warn(`[i18n] Missing or empty locale "${currentLocale}", fallback to English.`);
  locale = en;
}

export function getCurrentLanguage(): string {
  return currentLocale;
}

export function setLanguage(lang: string, app?: App): void {
  let target = lang;
  if ((lang === "auto" || lang === "Auto") && app) {
    try {
      // 使用Obsidian内置API获取语言设置
      target = getLanguage();
      dbg(t("i18n.debug.autoMode", { locale: normalizeLocale(target) }));
    } catch {
      warn("[i18n] Failed to get Obsidian language, fallback to English");
      target = "en";
    }
  } else {
    dbg(t("i18n.debug.switchLanguage", { language: normalizeLocale(lang) }));
  }

  const next = getLocale(target);
  currentLocale = next.key;
  locale = next.dict;
  dbg(t("i18n.debug.activeLocale", { locale: currentLocale }));
}

// 初始化函数，用于插件加载时设置语言
export function initLanguage(app: App, lang: string): void {
  setLanguage(lang, app);
}

function getValue(obj: unknown, path: string): string | undefined {
  if (typeof obj !== "object" || obj === null) return undefined;

  const direct = (obj as Record<string, unknown>)[path];
  if (typeof direct === "string") return direct;

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string | undefined;
}

export function t(
  key: TranslationKeys,
  vars?: Record<string, string | number>
): string {
  let template = getValue(locale, key);

  // fallback 到英语
  if (template === undefined) {
    template = getValue(en, key);
    if (template === undefined) {
      warn(`[i18n] Missing translation key: "${key}"`);
      return key;
    }
  }

  // 无变量替换
  if (!vars) return String(template);

  // 变量插值
  return String(template).replace(/\{\{(.*?)\}\}/g, (_m, rawKey: string) => {
    const cleanKey = rawKey.trim();
    if (!(cleanKey in vars)) {
      warn(`[i18n] Missing variable "${cleanKey}" for key "${key}"`);
      return `{{${cleanKey}}}`;
    }
    return String(vars[cleanKey]);
  });
}

export function tn(
  singular: TranslationKeys,
  plural: TranslationKeys,
  count: number,
  vars?: Record<string, string | number>
): string {
  const key = count === 1 ? singular : plural;
  return t(key, { ...vars, count });
}

dbg(t("i18n.debug.loadedLocales", { locales: Object.keys(localeMap).join(", ") }));
dbg(t("i18n.debug.activeLocale", { locale: currentLocale }));
