import { moment } from 'obsidian';
import { dbg, warn } from '..//utils';


import ar from './locale/ar';
import cz from './locale/cz';
import da from './locale/da';
import de from './locale/de';
import en from './locale/en';
import enGB from './locale/en-gb';
import es from './locale/es';
import fr from './locale/fr';
import hi from './locale/hi';
import id from './locale/id';
import it from './locale/it';
import ja from './locale/ja';
import ko from './locale/ko';
import nl from './locale/nl';
import no from './locale/no';
import pl from './locale/pl';
import pt from './locale/pt';
import ptBR from './locale/pt-br';
import ro from './locale/ro';
import ru from './locale/ru';
import tr from './locale/tr';
import zhCN from './locale/zh-cn';
import zhTW from './locale/zh-tw';

const localeMap: Record<string, any> = {
  ar,
  cs: cz,
  da,
  de,
  en,
  'en-gb': enGB,
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
  'pt-br': ptBR,
  ro,
  ru,
  tr,
  'zh-cn': zhCN,
  'zh-tw': zhTW
};

export const languageName: Record<string, string> = {
  'auto': 'Auto',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  'en': 'English'
};

let currentLocale = moment.locale();
let locale = localeMap[currentLocale] ?? en;

export function getLanguage() {
  return currentLocale;
}

export function setLanguage(lang: string) {
  if (lang === "auto" || lang === "Auto") {
    currentLocale = moment.locale();
    dbg("[i18n] Auto mode -> system locale:", currentLocale);
  } else {
    currentLocale = lang;
    dbg("[i18n] Switched to language:", lang);
  }
  locale = localeMap[currentLocale] ?? en;
  if (locale === en && currentLocale !== 'en') {
    warn(`[i18n] Missing translation for "${currentLocale}", fallback to English.`);
  } else {
    dbg("[i18n] Active locale:", currentLocale);
  }
}

function getNested(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function t(key: string, vars?: Record<string, string | number>): string {
  let template = getNested(locale, key);

  if (template === undefined) {
    template = getNested(en, key);
    if (template === undefined) {
      warn(`[i18n] Missing translation key: "${key}"`);
      return key;
    }
  }

  if (!vars) return template;

  return template.replace(/\{\{(.*?)\}\}/g, (_match: string, rawKey: string): string => {
    const cleanKey = rawKey.trim();
    if (!(cleanKey in vars)) {
      warn(`[i18n] Missing variable "${cleanKey}" for key "${key}"`);
      return `{{${cleanKey}}}`;
    }
    return String(vars[cleanKey]);
  });
}

export function tn(
  singular: string,
  plural: string,
  count: number,
  vars?: Record<string, string | number>
): string {
  const key = count === 1 ? singular : plural;
  return t(key, { ...vars, count });
}

