import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';

export const i18nUI = defineI18nUI(i18n, {
  translations: {
    en: { displayName: 'English' },
    pt: { displayName: 'Português' },
    es: { displayName: 'Español' },
  },
});

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: 'AI SDLC Kit',
    },
    githubUrl: 'https://github.com/glaucia86/ai-sdlc-kit',
    i18n: true,
  };
}
