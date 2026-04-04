'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
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
    eyebrow: 'Specification-driven development for AI-assisted teams',
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
        href: '/en/guide/HITL-checkpoints',
        linkLabel: 'HITL checkpoints',
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
        href: '/pt/guide/HITL-checkpoints',
        linkLabel: 'Checkpoints HITL',
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
        text: 'Empieza con una idea en bruto o una tarea acotada y avanza por PRD, spec técnica, implementación, QA y revisión sin perder el HITLo.',
        href: '/es/get-started/how-it-works',
        linkLabel: 'Cómo funciona',
      },
      {
        title: 'Human-in-the-loop por diseño',
        text: 'El kit trata los puntos de aprobación como parte del sistema, no como ceremonia opcional, para detener supuestos débiles antes del código.',
        href: '/es/guide/HITL-checkpoints',
        linkLabel: 'Checkpoints HITL',
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
  en: 'EN — English',
  pt: 'PT — Português',
  es: 'ES — Español',
};


export function HomePage({ locale }: { locale: HomeLocale }) {
  const copy = content[locale];
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers — each moves at a different speed
  const orbAmberY   = useTransform(scrollYProgress, [0, 1], ['0%', '-36%']);
  const orbTealY    = useTransform(scrollYProgress, [0, 1], ['0%', '-58%']);
  const gridY       = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  return (
    <div
      className="overflow-x-hidden text-white"
      style={{ background: '#050609', fontFamily: 'var(--font-sans)' }}
    >
      {/* ─────────── HERO ─────────── */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col overflow-hidden">

        {/* BG layer 0 — hairline engineering grid (slowest) */}
        <motion.div aria-hidden="true" style={{ y: gridY }}
          className="pointer-events-none absolute inset-0 -z-10">
          <div className="h-full w-full" style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }} />
        </motion.div>

        {/* BG layer 1 — amber glow bottom-left */}
        <motion.div aria-hidden="true" style={{ y: orbAmberY }}
          className="pointer-events-none absolute -bottom-24 -left-36 -z-10 h-[680px] w-[680px]">
          <div className="h-full w-full rounded-full"
            style={{ background: 'radial-gradient(circle at center, rgba(245,158,11,0.13) 0%, transparent 65%)' }} />
        </motion.div>

        {/* BG layer 2 — teal glint top-right */}
        <motion.div aria-hidden="true" style={{ y: orbTealY }}
          className="pointer-events-none absolute -right-24 top-[8%] -z-10 h-[440px] w-[440px]">
          <div className="h-full w-full rounded-full"
            style={{ background: 'radial-gradient(circle at center, rgba(20,184,166,0.09) 0%, transparent 68%)' }} />
        </motion.div>

        {/* Hero content */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 sm:px-10 lg:px-12">

          {/* Nav */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] font-medium tracking-[0.18em] text-white/30"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                AI · SDLC · KIT
              </span>
            </div>

            {/* Language dropdown */}
            <div className="relative" aria-label={copy.languageLabel}>
              <select
                value={locale}
                onChange={(e) => {
                  const val = e.target.value as HomeLocale;
                  router.push(val === 'en' ? '/' : `/${val}`);
                }}
                className="appearance-none cursor-pointer rounded-full py-1.5 pl-4 pr-8 text-[11px] font-medium tracking-widest transition-all outline-none"
                style={{
                  fontFamily: 'var(--font-label)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  color: '#F59E0B',
                  backdropFilter: 'blur(8px)',
                }}
                aria-label={copy.languageLabel}
              >
                {supportedLocales.map((item) => (
                  <option
                    key={item}
                    value={item}
                    style={{ background: '#0d0e14', color: '#f5f0e8' }}
                  >
                    {localeLabels[item]}
                  </option>
                ))}
              </select>
              {/* Custom chevron */}
              <span
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[8px]"
                style={{ color: '#F59E0B', opacity: 0.7 }}
                aria-hidden="true"
              >
                ▾
              </span>
            </div>
          </header>

          {/* Hero copy */}
          <div className="flex flex-1 flex-col justify-center pb-8 pt-16 lg:pt-20">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-px w-8 flex-shrink-0" style={{ background: '#F59E0B', opacity: 0.7 }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.36em]"
                style={{ color: '#F59E0B', opacity: 0.85, fontFamily: 'var(--font-label)' }}
              >
                {copy.eyebrow}
              </span>
            </motion.p>

            {/* H1 — DM Serif Display */}
            <motion.h1
              initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.90, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl leading-[1.08] tracking-[-0.02em]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                color: '#f5f0e8',
              }}
            >
              {copy.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.70, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-base leading-[1.9] sm:text-lg"
              style={{ color: 'rgba(255,255,255,0.44)', fontWeight: 300 }}
            >
              {copy.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={`/${locale}/get-started/installation`}
                className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-[#050609] transition-all hover:brightness-110"
                style={{
                  background: '#F59E0B',
                  boxShadow: '0 0 48px -8px rgba(245,158,11,0.55)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {copy.primaryCta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href={`/${locale}/reference/agents`}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all"
                style={{ color: 'rgba(255,255,255,0.40)', fontFamily: 'var(--font-sans)', letterSpacing: '0.01em' }}
              >
                <span className="border-b border-white/15 pb-px transition-colors hover:border-white/40 hover:text-white/65">
                  {copy.secondaryCta}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.60, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 grid grid-cols-3 divide-x divide-white/[0.07]"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {copy.highlights.map((item) => (
              <div key={item.label} className="px-6 pt-6 pb-4">
                <span
                  className="block tabular-nums leading-none"
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 600,
                    color: '#f5f0e8',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {item.value}
                </span>
                <span
                  className="mt-2 block text-[11px] uppercase tracking-[0.28em]"
                  style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-label)' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2.5"
        >
          <motion.div
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px bg-white"
            style={{ height: 40 }}
          />
          <span
            className="text-[8px] font-medium uppercase tracking-[0.4em]"
            style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-label)' }}
          >
            scroll
          </span>
        </motion.div>
      </section>

      {/* ─────────── PANELS ─────────── */}
      <section
        className="relative px-6 py-28 sm:px-10 lg:px-12"
        style={{ background: 'linear-gradient(180deg, #050609 0%, #08090f 100%)' }}
      >
        {/* Amber separator rule */}
        <div className="mx-auto mb-20 max-w-7xl">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.22), transparent)' }}
          />
        </div>

        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
          {copy.panels.map((panel, i) => (
            <motion.article
              key={panel.title}
              initial={{ opacity: 0, y: 52 }}
              wHITLeInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-64px' }}
              transition={{ duration: 0.75, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              wHITLeHover={{ y: -6, transition: { duration: 0.26, ease: 'easeOut' } }}
              className="group relative flex flex-col p-8"
              style={{
                borderTop: i === 1
                  ? '1px solid rgba(245,158,11,0.5)'
                  : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Amber left accent for featured panel */}
              {i === 1 && (
                <div
                  className="absolute left-0 top-0 h-full w-px"
                  style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.45) 0%, transparent 100%)' }}
                />
              )}

              <p
                className="mb-7 text-[9px] font-medium uppercase tracking-[0.4em]"
                style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-label)' }}
              >
                {`0${i + 1}`}
              </p>

              <h2
                className="leading-snug"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.3rem, 2.4vw, 1.65rem)',
                  color: i === 1 ? '#F5ECB8' : '#f0ece4',
                  letterSpacing: '-0.01em',
                }}
              >
                {panel.title}
              </h2>

              <p
                className="mt-4 flex-1 text-sm leading-[1.85]"
                style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300, fontFamily: 'var(--font-sans)' }}
              >
                {panel.text}
              </p>

              <Link
                href={panel.href}
                className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-medium transition-all group-hover:opacity-100"
                style={{
                  color: i === 1 ? 'rgba(245,224,100,0.55)' : 'rgba(255,255,255,0.30)',
                  fontFamily: 'var(--font-label)',
                  letterSpacing: '0.06em',
                }}
              >
                <span
                  className="uppercase tracking-[0.16em]"
                  style={{ borderBottom: '1px solid currentColor', paddingBottom: 2, opacity: 0.8 }}
                >
                  {panel.linkLabel}
                </span>
                <span className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}