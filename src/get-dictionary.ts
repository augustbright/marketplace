import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
export type TDictionary = PromiseType<ReturnType<typeof getDictionary>>;