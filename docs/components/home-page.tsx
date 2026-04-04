'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { supportedLocales, type HomeLocale } from '@/lib/locale';

export type { HomeLocale };

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

export function HomePage({ locale }: { locale: HomeLocale }) {
  const copy = content[locale];
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers — each moves at a different speed
  const orbVioletY  = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const orbCyanY    = useTransform(scrollYProgress, [0, 1], ['0%', '-52%']);
  const gridY       = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.60], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div className="overflow-x-hidden bg-[#07080f] font-sans text-white">

      {/* ── HERO (parallax) ──────────────────────────────── */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col overflow-hidden">

        {/* Layer 0 — subtle dot grid (slowest) */}
        <motion.div aria-hidden="true" style={{ y: gridY }}
          className="pointer-events-none absolute inset-0 -z-10">
          <div className="h-full w-full opacity-[0.16]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(130,100,255,0.55) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />
        </motion.div>

        {/* Layer 1 — large violet bloom (medium) */}
        <motion.div aria-hidden="true" style={{ y: orbVioletY }}
          className="pointer-events-none absolute -left-48 -top-48 -z-10 h-[760px] w-[760px]">
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.30),transparent_62%)]" />
        </motion.div>

        {/* Layer 2 — cyan bloom top-right (fastest) */}
        <motion.div aria-hidden="true" style={{ y: orbCyanY }}
          className="pointer-events-none absolute -right-32 top-[18%] -z-10 h-[520px] w-[520px]">
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.11),transparent_62%)]" />
        </motion.div>

        {/* Layer 3 — bottom glow (medium) */}
        <motion.div aria-hidden="true" style={{ y: orbVioletY }}
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[260px] w-[900px] -translate-x-1/2">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.14),transparent_68%)]" />
        </motion.div>

        {/* Hero content — slight upward parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 sm:px-10 lg:px-12">

          {/* ── Nav ── */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-700/25 ring-1 ring-violet-500/20">
                <span className="text-base font-black leading-none text-violet-400">⬡</span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/35">
                AI SDLC Kit
              </span>
            </div>

            <nav aria-label={copy.languageLabel} className="flex gap-2">
              {supportedLocales.map((item) => {
                const active = item === locale;
                return (
                  <Link
                    key={item}
                    href={item === 'en' ? '/' : `/${item}`}
                    className={
                      active
                        ? 'rounded-full bg-violet-700 px-4 py-1.5 text-xs font-semibold text-white'
                        : 'rounded-full px-4 py-1.5 text-xs font-semibold text-white/40 ring-1 ring-white/[0.11] transition-all hover:text-white/75 hover:ring-white/25'
                    }
                  >
                    {localeLabels[item]}
                  </Link>
                );
              })}
            </nav>
          </header>

          {/* ── Hero copy ── */}
          <div className="flex flex-1 flex-col justify-center py-12">
            <motion.p
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-400"
            >
              {copy.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.80, delay: 0.20, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              {copy.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.70, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-2xl text-base leading-[1.85] text-white/52 sm:text-lg"
            >
              {copy.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="mt-11 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href={`/${locale}/get-started/installation`}
                className="group inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_52px_-8px_rgba(124,58,237,0.68)] transition-all hover:bg-violet-500 hover:shadow-[0_0_72px_-4px_rgba(124,58,237,0.90)]"
              >
                {copy.primaryCta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={`/${locale}/reference/agents`}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white/55 ring-1 ring-white/14 transition-all hover:text-white/80 hover:ring-white/28"
              >
                {copy.secondaryCta}
              </Link>
            </motion.div>
          </div>

          {/* ── Stats strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.60, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex gap-px overflow-hidden rounded-[1.4rem] ring-1 ring-white/[0.09]"
          >
            {copy.highlights.map((item) => (
              <div key={item.label} className="flex flex-1 flex-col bg-white/[0.04] px-6 py-5 backdrop-blur-sm">
                <span className="text-3xl font-black tabular-nums tracking-tight text-white">{item.value}</span>
                <span className="mt-1 text-[11px] text-white/38">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/22">scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-10 w-5 items-start justify-center rounded-full pt-2 ring-1 ring-white/18"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-white/32" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURE PANELS ──────────────────────────────── */}
      <section className="relative bg-[linear-gradient(180deg,#07080f_0%,#0b0d1c_100%)] px-6 py-28 sm:px-10 lg:px-12">
        {/* Gradient rule */}
        <div className="mx-auto mb-20 max-w-7xl">
          <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(124,58,237,0.38),transparent)]" />
        </div>

        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
          {copy.panels.map((panel, i) => (
            <motion.article
              key={panel.title}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.72, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.28, ease: 'easeOut' } }}
              className={[
                'group relative flex flex-col rounded-[1.75rem] p-7',
                i === 1
                  ? 'bg-[linear-gradient(145deg,#4338ca,#7c3aed)] shadow-[0_28px_80px_-18px_rgba(99,60,220,0.48)]'
                  : 'bg-white/[0.04] ring-1 ring-white/[0.09] transition-all hover:ring-white/[0.18]',
              ].join(' ')}
            >
              <p className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-white/32">
                0{i + 1}
              </p>
              <h2 className="text-xl font-extrabold leading-snug text-white">{panel.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/52">{panel.text}</p>
              <Link
                href={panel.href}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/65 transition-all group-hover:border-white/35 group-hover:text-white"
              >
                {panel.linkLabel}
                <span className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}