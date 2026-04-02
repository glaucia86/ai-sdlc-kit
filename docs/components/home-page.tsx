import Link from 'next/link';

const supportedLocales = ['en', 'pt', 'es'] as const;

export type HomeLocale = (typeof supportedLocales)[number];

const content: Record<
  HomeLocale,
  {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    languageLabel: string;
    highlights: Array<{ value: string; label: string }>;
    panels: Array<{ title: string; text: string; href: string; linkLabel: string }>;
  }
> = {
  en: {
    eyebrow: 'Specification-driven delivery for AI-assisted teams',
    title: 'Build with agents, but keep humans in charge.',
    description:
      'AI SDLC Kit organizes planning, implementation, QA, and review into a disciplined workflow with explicit checkpoints, reusable artifacts, and multilingual documentation.',
    primaryCta: 'Open the docs',
    secondaryCta: 'See the agents',
    languageLabel: 'Read in',
    highlights: [
      { value: '10', label: 'specialized agents' },
      { value: '2', label: 'delivery flows' },
      { value: '3', label: 'supported languages' },
    ],
    panels: [
      {
        title: 'Discovery to operations',
        text: 'Start from a raw idea or a scoped task and move through PRD, technical spec, implementation, QA, and review without losing the thread.',
        href: '/en/get-started/how-it-works',
        linkLabel: 'How it works',
      },
      {
        title: 'Human-in-the-loop by design',
        text: 'The kit treats approval gates as part of the system, not as optional ceremony, so risky assumptions are caught before code lands.',
        href: '/en/guide/hil-checkpoints',
        linkLabel: 'HIL checkpoints',
      },
      {
        title: 'Reference-ready artifacts',
        text: 'Use the built-in prompts, templates, and artifact contracts to keep outputs consistent across planning and implementation.',
        href: '/en/reference/templates',
        linkLabel: 'Browse templates',
      },
    ],
  },
  pt: {
    eyebrow: 'Entrega guiada por especificação para times com IA',
    title: 'Use agentes para acelerar, sem abrir mão do controle humano.',
    description:
      'O AI SDLC Kit organiza planejamento, implementação, QA e revisão em um fluxo disciplinado com checkpoints explícitos, artefatos reutilizáveis e documentação multilíngue.',
    primaryCta: 'Abrir a documentação',
    secondaryCta: 'Ver os agentes',
    languageLabel: 'Ler em',
    highlights: [
      { value: '10', label: 'agentes especializados' },
      { value: '2', label: 'fluxos de entrega' },
      { value: '3', label: 'idiomas suportados' },
    ],
    panels: [
      {
        title: 'Da discovery à operação',
        text: 'Comece por uma ideia bruta ou uma tarefa delimitada e avance por PRD, spec técnica, implementação, QA e review sem perder o contexto.',
        href: '/pt/get-started/how-it-works',
        linkLabel: 'Como funciona',
      },
      {
        title: 'Human-in-the-loop como regra',
        text: 'O kit trata aprovações como parte do sistema, não como burocracia opcional, para bloquear suposições frágeis antes que virem código.',
        href: '/pt/guide/hil-checkpoints',
        linkLabel: 'Checkpoints HIL',
      },
      {
        title: 'Artefatos prontos para uso',
        text: 'Prompts, templates e contratos de artefatos ajudam a manter consistência entre planejamento, execução e revisão.',
        href: '/pt/reference/templates',
        linkLabel: 'Explorar templates',
      },
    ],
  },
  es: {
    eyebrow: 'Entrega guiada por especificación para equipos con IA',
    title: 'Trabaja con agentes sin perder la decisión humana.',
    description:
      'AI SDLC Kit organiza planificación, implementación, QA y revisión en un flujo disciplinado con checkpoints explícitos, artefactos reutilizables y documentación multilingüe.',
    primaryCta: 'Abrir la documentación',
    secondaryCta: 'Ver agentes',
    languageLabel: 'Leer en',
    highlights: [
      { value: '10', label: 'agentes especializados' },
      { value: '2', label: 'flujos de entrega' },
      { value: '3', label: 'idiomas soportados' },
    ],
    panels: [
      {
        title: 'De discovery a operaciones',
        text: 'Empieza con una idea en bruto o una tarea acotada y avanza por PRD, spec técnica, implementación, QA y revisión sin perder el hilo.',
        href: '/es/get-started/how-it-works',
        linkLabel: 'Cómo funciona',
      },
      {
        title: 'Human-in-the-loop por diseño',
        text: 'El kit trata los puntos de aprobación como parte del sistema, no como ceremonia opcional, para detener supuestos débiles antes del código.',
        href: '/es/guide/hil-checkpoints',
        linkLabel: 'Checkpoints HIL',
      },
      {
        title: 'Artefactos listos para referencia',
        text: 'Prompts, plantillas y contratos de artefactos mantienen coherencia entre planificación, implementación y revisión.',
        href: '/es/reference/templates',
        linkLabel: 'Ver plantillas',
      },
    ],
  },
};

const localeLabels: Record<HomeLocale, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export function isHomeLocale(value: string): value is HomeLocale {
  return supportedLocales.includes(value as HomeLocale);
}

export function HomePage({ locale }: { locale: HomeLocale }) {
  const copy = content[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.92),_rgba(255,244,234,0.96)_32%,_rgba(247,111,34,0.12)_100%)] text-zinc-950">
      <div className="relative isolate mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[linear-gradient(120deg,rgba(247,111,34,0.18),transparent_52%,rgba(15,23,42,0.08))] blur-3xl" />
        <div className="pointer-events-none absolute right-[-8rem] top-28 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(247,111,34,0.24),_transparent_62%)]" />

        <header className="flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
              AI SDLC Kit
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-black leading-none sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
          </div>

          <div className="w-full max-w-sm rounded-[2rem] border border-black/10 bg-white/70 p-5 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
              {copy.languageLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {supportedLocales.map((item) => {
                const active = item === locale;

                return (
                  <Link
                    key={item}
                    href={item === 'en' ? '/' : `/${item}`}
                    className={
                      active
                        ? 'rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white'
                        : 'rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950'
                    }
                  >
                    {localeLabels[item]}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        <section className="grid flex-1 gap-10 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:py-16">
          <div className="space-y-8">
            <p className="max-w-2xl text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {copy.eyebrow}
            </p>

            <p className="max-w-2xl text-lg leading-8 text-zinc-700 sm:text-xl">
              {copy.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${locale}/get-started/installation`}
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827,#f76f22)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_-30px_rgba(247,111,34,0.7)] transition hover:translate-y-[-1px]"
              >
                {copy.primaryCta}
              </Link>
              <Link
                href={`/${locale}/reference/agents`}
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/80 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-950"
              >
                {copy.secondaryCta}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {copy.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5 shadow-[0_16px_60px_-45px_rgba(15,23,42,0.5)] backdrop-blur"
                >
                  <div className="text-3xl font-black text-zinc-950">{item.value}</div>
                  <div className="mt-2 text-sm text-zinc-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-8 hidden h-full w-full rounded-[2rem] border border-dashed border-black/10 bg-white/20 lg:block" />
            <div className="relative space-y-4 rounded-[2rem] border border-black/10 bg-zinc-950 p-4 text-white shadow-[0_35px_100px_-50px_rgba(15,23,42,0.85)] sm:p-6">
              {copy.panels.map((panel, index) => (
                <article
                  key={panel.title}
                  className={
                    index === 1
                      ? 'rounded-[1.6rem] bg-[linear-gradient(140deg,rgba(247,111,34,0.95),rgba(157,52,18,0.95))] p-6 text-white'
                      : 'rounded-[1.6rem] border border-white/10 bg-white/5 p-6'
                  }
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                    0{index + 1}
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold leading-tight">{panel.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/76">{panel.text}</p>
                  <Link
                    href={panel.href}
                    className="mt-6 inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {panel.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}