import { SupportedLanguageCode, LanguageItem } from '@/types';
import { TranslationSchema } from './types';
import { en } from './translations/en';
import { ta } from './translations/ta';
import { hi } from './translations/hi';
import { te } from './translations/te';
import { ml } from './translations/ml';
import { kn } from './translations/kn';

export const SUPPORTED_LANGUAGES: LanguageItem[] = [
  { code: 'en', name: 'English', native: 'English', region: 'Default' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'தமிழ்நாடு' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'भारत' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'ఆంధ్రప్రదేశ్ / తెలంగాణ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', region: 'കേരളം' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'ಕರ್ನಾಟಕ' },
];

export const translations: Record<SupportedLanguageCode, TranslationSchema> = {
  en,
  ta,
  hi,
  te,
  ml,
  kn,
};

/**
 * Safely resolves a nested dot-notated translation key with automatic English fallback.
 * Example: resolveTranslation('ta', 'farmer.addHarvest', 'Add Harvest') -> 'அறுவடை சேர் (+)'
 */
export function resolveTranslation(
  lang: SupportedLanguageCode,
  path: string,
  fallback?: string
): string {
  const keys = path.split('.');
  
  // Try selected language
  let result: any = translations[lang];
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      result = undefined;
      break;
    }
  }

  if (typeof result === 'string' && result.trim()) {
    return result;
  }

  // Fallback to English
  let enResult: any = translations.en;
  for (const k of keys) {
    if (enResult && typeof enResult === 'object' && k in enResult) {
      enResult = enResult[k];
    } else {
      enResult = undefined;
      break;
    }
  }

  if (typeof enResult === 'string' && enResult.trim()) {
    return enResult;
  }

  return fallback || path;
}
