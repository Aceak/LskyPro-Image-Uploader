// i18n.ts
import { moment } from "obsidian";
import { dbg, warn, error } from "../utils";

import ar from "./locale/ar";
import cz from "./locale/cz";
import da from "./locale/da";
import de from "./locale/de";
import en from "./locale/en";
import enGB from "./locale/en-gb";
import es from "./locale/es";
import fr from "./locale/fr";
import hi from "./locale/hi";
import id from "./locale/id";
import it from "./locale/it";
import ja from "./locale/ja";
import ko from "./locale/ko";
import nl from "./locale/nl";
import no from "./locale/no";
import pl from "./locale/pl";
import pt from "./locale/pt";
import ptBR from "./locale/pt-br";
import ro from "./locale/ro";
import ru from "./locale/ru";
import tr from "./locale/tr";
import zhCN from "./locale/zh-cn";
import zhTW from "./locale/zh-tw";

const localeMap: Record<string, any> = {
  ar,
  cs: cz,
  da,
  de,
  en,
  "en-gb": enGB,
  es,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  nl,
  nn: no,
  pl,
  pt,
  "pt-br": ptBR,
  ro,
  ru,
  tr,
  "zh-cn": zhCN,
  "zh-tw": zhTW,
  "zh-hk": zhTW,
  "zh-mo": zhTW,
};

export const languageName: Record<string, string> = {
  auto: "Auto",
  "zh-cn": "简体中文",
  "zh-tw": "繁體中文",
  en: "English",
};

export type TranslationDict = typeof en;
export type TranslationKeys = keyof TranslationDict;

function normalizeLocale(code: string): string {
  const lower = (code || "en").toLowerCase();
  if (lower === "zh" || lower.startsWith("zh-cn")) return "zh-cn";
  if (lower.startsWith("zh-tw") || lower.startsWith("zh-hk") || lower.startsWith("zh-mo")) return "zh-tw";
  if (lower.startsWith("en-")) return "en";
  if (lower.startsWith("pt-br")) return "pt-br";
  return lower.split("-")[0];
}

let currentLocale = normalizeLocale(moment.locale());
let locale = localeMap[currentLocale];
if (!locale || Object.keys(locale).length === 0) {
  warn(`[i18n] Missing or empty locale "${currentLocale}", fallback to English.`);
  locale = en;
}


export function getLanguage(): string {
  return currentLocale;
}

export function setLanguage(lang: string): void {
  if (lang === "auto" || lang === "Auto") {
    currentLocale = normalizeLocale(moment.locale());
    dbg("[i18n] Auto mode -> system locale:", currentLocale);
  } else {
    currentLocale = normalizeLocale(lang);
    dbg("[i18n] Switched to language:", currentLocale);
  }

  locale = localeMap[currentLocale];
  if (!locale || Object.keys(locale).length === 0) {
    warn(`[i18n] Missing or empty locale "${currentLocale}", fallback to English.`);
    locale = en;
  } else {
    dbg("[i18n] Active locale:", currentLocale);
  }
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

dbg("[i18n] Loaded locales:", Object.keys(localeMap));
dbg("[i18n] Active:", currentLocale);
