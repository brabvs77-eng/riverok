import type { Lang } from '../club.config';
import type { Translations } from './types';
import hy from './hy';
import ru from './ru';
import en from './en';

const translations: Record<Lang, Translations> = { hy, ru, en };

export function getTranslations(lang: Lang): Translations {
  return translations[lang];
}

export function getLangFromPath(pathname: string): Lang {
  if (pathname.startsWith('/ru')) return 'ru';
  if (pathname.startsWith('/en')) return 'en';
  return 'hy';
}
