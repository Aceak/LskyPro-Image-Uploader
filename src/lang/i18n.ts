import { moment } from 'obsidian';

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

// ================================
// 1️⃣ 语言映射表
// ================================
const localeMap: Record<string, Partial<typeof en>> = {
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
  'zh-tw': zhTW,
};


const currentLocale = moment.locale();
const locale = localeMap[currentLocale] ?? en;

export type TranslationKey = keyof typeof en;

export function t<K extends TranslationKey>(
  key: K,
  vars?: Record<string, string | number>
): string {
  const template = (locale && locale[key]) || en[key];

  if (!vars) return template;

  return template.replace(/\{\{(.*?)\}\}/g, (_, rawKey) => {
    const cleanKey = rawKey.trim();
    const value = vars[cleanKey];
    return value !== undefined ? String(value) : '';
  });
}

export function tn(
  singular: TranslationKey,
  plural: TranslationKey,
  count: number,
  vars?: Record<string, string | number>
): string {
  const key = count === 1 ? singular : plural;
  return t(key, { ...vars, count });
}
