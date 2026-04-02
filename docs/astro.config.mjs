import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://glaucia86.github.io',
  base: '/ai-sdlc-kit',
  integrations: [
    starlight({
      title: 'AI SDLC Kit',
      description:
        'A spec-driven, human-in-the-loop AI development lifecycle kit for GitHub Copilot.',
      logo: {
        src: './src/assets/logo.svg',
      },
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        pt: { label: 'Português', lang: 'pt-BR' },
        es: { label: 'Español', lang: 'es' },
      },
      social: {
        github: 'https://github.com/glaucia86/ai-sdlc-kit',
      },
      sidebar: [
        {
          label: 'Get Started',
          translations: {
            pt: 'Primeiros Passos',
            es: 'Primeros Pasos',
          },
          items: [
            { slug: 'get-started/installation' },
            { slug: 'get-started/quick-start' },
            { slug: 'get-started/how-it-works' },
          ],
        },
        {
          label: 'Guide',
          translations: {
            pt: 'Guia',
            es: 'Guía',
          },
          items: [
            { slug: 'guide/discovery-phase' },
            { slug: 'guide/spec-phase' },
            { slug: 'guide/epic-phase' },
            { slug: 'guide/operations-phase' },
            { slug: 'guide/hil-checkpoints' },
          ],
        },
        {
          label: 'Reference',
          translations: {
            pt: 'Referência',
            es: 'Referencia',
          },
          items: [
            { slug: 'reference/agents' },
            { slug: 'reference/prompts' },
            { slug: 'reference/templates' },
            { slug: 'reference/artifacts' },
          ],
        },
        {
          label: 'Concepts',
          translations: {
            pt: 'Conceitos',
            es: 'Conceptos',
          },
          items: [
            { slug: 'concepts/ai-sdlc' },
            { slug: 'concepts/sdd' },
            { slug: 'concepts/hil' },
            { slug: 'concepts/context-memory' },
          ],
        },
        {
          label: 'Scenarios',
          translations: {
            pt: 'Cenários',
            es: 'Escenarios',
          },
          items: [
            { slug: 'scenarios/new-project' },
            { slug: 'scenarios/existing-project' },
            { slug: 'scenarios/solo-dev' },
          ],
        },
      ],
    }),
  ],
});
