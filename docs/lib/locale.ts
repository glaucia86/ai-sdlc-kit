export const supportedLocales = ['en', 'pt', 'es'] as const;

export type HomeLocale = (typeof supportedLocales)[number];

export function isHomeLocale(value: string): value is HomeLocale {
  return supportedLocales.includes(value as HomeLocale);
}
