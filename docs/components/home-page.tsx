'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Telescope, ScrollText, GitBranch, Network, Inbox, Map, Compass, FileText, ClipboardList, Layers, Code2, Rocket, Route, ShieldCheck, BookOpen, Github, ExternalLink, type LucideIcon } from 'lucide-react';
import { supportedLocales, type HomeLocale } from '@/lib/locale';

// Agent icons — ordered to match agentCards index (0–5)
const agentIconList: LucideIcon[] = [Telescope, ScrollText, GitBranch, Network, Inbox, Map];

// Pipeline step icons — ordered to match steps index (0–5)
const stepIconList: LucideIcon[] = [Compass, FileText, ClipboardList, Layers, Code2, Rocket];

// Per-step color spectrum: amber → orange → yellow → emerald → teal → cyan
const pipelineColors = [
  { color: '#F59E0B', rgb: '245,158,11' },
  { color: '#F97316', rgb: '249,115,22' },
  { color: '#EAB308', rgb: '234,179,8'  },
  { color: '#10B981', rgb: '16,185,129' },
  { color: '#14B8A6', rgb: '20,184,166' },
  { color: '#06B6D4', rgb: '6,182,212'  },
];

// Panel card metadata — icon + category label per panel index
const panelMeta: Array<{ Icon: LucideIcon; category: string }> = [
  { Icon: Route,       category: 'Foundation' },
  { Icon: ShieldCheck, category: 'Governance' },
  { Icon: BookOpen,    category: 'Reference'  },
];

// ─── PanelCard: 3-D cursor-tracking tilt card ───────────────────────────────
type PanelCardProps = {
  panel: { title: string; text: string; href: string; linkLabel: string };
  i: number;
  featured: boolean;
};

function PanelCard({ panel, i, featured }: PanelCardProps) {
  const { Icon, category } = panelMeta[i];

  return (
    <motion.article
      key={panel.title}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.75, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col overflow-hidden"
      style={{
        background: featured
          ? 'linear-gradient(158deg, rgba(245,158,11,0.11) 0%, rgba(6,7,10,0.97) 55%)'
          : 'rgba(255,255,255,0.024)',
        border: featured
          ? '1px solid rgba(245,158,11,0.30)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: featured
          ? '0 -24px 80px -20px rgba(245,158,11,0.11), inset 0 1px 0 rgba(245,158,11,0.07)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Top accent bar — static, tapered gradient */}
      <div
        className="absolute left-0 top-0 h-[2px]"
        style={{
          width: featured ? '100%' : '48%',
          background: featured
            ? 'linear-gradient(90deg, #F59E0B 0%, rgba(245,158,11,0.25) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
        }}
      />

      {/* Ambient glow overlay — always visible */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: featured
            ? 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.11) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 56%)',
        }}
      />

      {/* SVG grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: featured ? 0.10 : 0.07,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Card body */}
      <div className="relative flex flex-1 flex-col p-8 lg:p-10">
        {/* Top row: index label + icon */}
        <div className="mb-8 flex items-start justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.44em]"
            style={{
              fontFamily: 'var(--font-label)',
              color: featured ? 'rgba(245,158,11,0.70)' : 'rgba(255,255,255,0.26)',
              animation: `panelIdxPop 0.55s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i * 0.13}s both`,
              display: 'inline-block',
            }}
          >
            {`0${i + 1}`}
          </span>

          {/* Icon container */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: featured ? 'rgba(245,158,11,0.09)' : 'rgba(255,255,255,0.05)',
              border: featured
                ? '1px solid rgba(245,158,11,0.28)'
                : '1px solid rgba(255,255,255,0.1)',
              boxShadow: featured ? '0 0 24px -6px rgba(245,158,11,0.42)' : 'none',
            }}
          >
            <Icon
              size={22}
              strokeWidth={1.4}
              style={{ color: featured ? '#F59E0B' : 'rgba(255,255,255,0.48)' }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Category pill */}
        <span
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-[4px] text-[8px] font-medium uppercase tracking-[0.34em]"
          style={{
            fontFamily: 'var(--font-label)',
            background: featured ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.05)',
            color: featured ? 'rgba(245,158,11,0.72)' : 'rgba(255,255,255,0.26)',
            border: featured
              ? '1px solid rgba(245,158,11,0.17)'
              : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span
            className="inline-block h-[5px] w-[5px] rounded-full"
            style={{ background: featured ? '#F59E0B' : 'rgba(255,255,255,0.3)' }}
          />
          {category}
        </span>

        {/* Title */}
        <h2
          className="mb-4 leading-[1.12]"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(1.3rem, 2.4vw, 1.72rem)',
            color: featured ? '#F5ECB8' : '#f0ece4',
            letterSpacing: '-0.015em',
          }}
        >
          {panel.title}
        </h2>

        {/* Separator line — static */}
        <div
          className="mb-5 h-px"
          style={{
            width: featured ? '56px' : '36px',
            background: featured
              ? 'linear-gradient(90deg, rgba(245,158,11,0.65) 0%, rgba(245,158,11,0.18) 100%)'
              : 'rgba(255,255,255,0.13)',
          }}
        />

        {/* Body text */}
        <p
          className="flex-1 text-sm leading-[1.9]"
          style={{ color: 'rgba(255,255,255,0.40)', fontWeight: 300, fontFamily: 'var(--font-sans)' }}
        >
          {panel.text}
        </p>

        {/* Footer link */}
        <div className="mt-8">
          <Link
            href={panel.href}
            className="group/link inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
            style={{
              fontFamily: 'var(--font-label)',
              color: featured ? 'rgba(245,158,11,0.62)' : 'rgba(255,255,255,0.32)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = featured ? '#F59E0B' : 'rgba(255,255,255,0.68)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = featured
                ? 'rgba(245,158,11,0.62)'
                : 'rgba(255,255,255,0.32)')
            }
          >
            <span style={{ borderBottom: '1px solid currentColor', paddingBottom: 1 }}>
              {panel.linkLabel}
            </span>
            <span className="translate-x-0 transition-transform duration-200 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Slot-machine watermark number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 -right-1 select-none overflow-hidden leading-none"
        style={{ height: '9rem', fontFamily: 'var(--font-label)', fontSize: '9rem', fontWeight: 700, letterSpacing: '-0.05em' }}
      >
        <motion.span
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: featured
              ? '1.5px rgba(245,158,11,0.30)'
              : '1px rgba(255,255,255,0.11)',
            backgroundImage: featured
              ? 'linear-gradient(105deg, rgba(245,158,11,0.04) 0%, rgba(245,158,11,0.14) 25%, rgba(245,178,40,0.78) 50%, rgba(245,158,11,0.14) 75%, rgba(245,158,11,0.04) 100%)'
              : 'linear-gradient(105deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.01) 100%)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            animation: featured
              ? 'panelNumSweep 3.6s linear infinite, panelNumPulse 3.6s ease-in-out infinite'
              : `panelNumSweep ${5.8 + i * 0.9}s linear infinite`,
          }}
        >
          {`0${i + 1}`}
        </motion.span>
      </div>
    </motion.article>
  );
}
// ────────────────────────────────────────────────────────────────────────────

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
    workflowTitle: string;
    steps: Array<{ num: string; phase: string; desc: string }>;
    agentsTitle: string;
    agentCards: Array<{ tag: string; name: string; desc: string; flow: string; href: string; featured?: boolean }>;
    ctaTitle: string;
    ctaBody: string;
    ctaCta: string;
    footer: {
      tagline: string;
      colGetStarted: string;
      colGuide: string;
      colReference: string;
      copyright: string;
    };
  }
> = {
  en: {
    eyebrow: 'Spec-driven development for AI-assisted teams',
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
    workflowTitle: 'From idea to production,\nwithout losing the thread.',
    steps: [
      { num: '01', phase: 'Discovery', desc: 'A raw idea becomes a structured, unbiased product spec.' },
      { num: '02', phase: 'PM Spec', desc: 'User journeys, personas, and business rules are formalized.' },
      { num: '03', phase: 'Tech PRD', desc: 'Requirements gain measurable acceptance criteria and scope boundaries.' },
      { num: '04', phase: 'Architecture', desc: 'Technical spec, ordered epics, and per-epic artefacts are generated.' },
      { num: '05', phase: 'Build & Review', desc: 'Implementer writes code. QA validates. Reviewer approves.' },
      { num: '06', phase: 'Ops & Release', desc: 'Observability, anomaly patterns, and deploy pipeline are closed.' },
    ],
    agentsTitle: 'Ten agents. One coherent pipeline.',
    agentCards: [
      {
        tag: '🧭',
        name: 'Discovery',
        desc: 'Structures raw ideas without technical bias. The first agent in Flow A.',
        flow: 'Flow A',
        href: '/en/reference/agents',
        featured: true,
      },
      {
        tag: '🗂️',
        name: 'PM',
        desc: 'Translates the structured idea into a functional spec with user journeys.',
        flow: 'Flow A',
        href: '/en/reference/agents',
      },
      {
        tag: '🧑‍💼',
        name: 'Tech Lead',
        desc: 'Bridges product and engineering — turns the functional spec into a full PRD.',
        flow: 'Flow A',
        href: '/en/reference/agents',
      },
      {
        tag: '🏗️',
        name: 'Architect',
        desc: 'Produces the full technical architecture, epics breakdown, and per-epic artefacts.',
        flow: 'Flow A',
        href: '/en/reference/agents',
      },
      {
        tag: '📥',
        name: 'Intake',
        desc: 'Structures a raw task description into a scoped, unambiguous deliverable.',
        flow: 'Flow B',
        href: '/en/reference/agents',
      },
      {
        tag: '📐',
        name: 'Planner',
        desc: 'Generates PRD and spec for Flow B tasks from the structured intake.',
        flow: 'Flow B',
        href: '/en/reference/agents',
      },
    ],
    ctaTitle: 'Start building with agents today.',
    ctaBody: 'The kit — agents, prompts, templates, and checkpoints — is open and ready to use.',
    ctaCta: 'Open the docs',
    footer: {
      tagline: 'Spec-driven AI workflows for engineering teams.',
      colGetStarted: 'Get Started',
      colGuide: 'Guide',
      colReference: 'Reference',
      copyright: '© 2026 AI SDLC Kit · MIT License',
    },
  },
  pt: {
    eyebrow: 'Spec-Driven Development para times com IA',
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
        title: 'Do discovery à operação',
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
    workflowTitle: 'Da ideia à produção,\nsem perder o fio da meada.',
    steps: [
      { num: '01', phase: 'Discovery', desc: 'Uma ideia bruta vira uma spec de produto estruturada e sem viés técnico.' },
      { num: '02', phase: 'Spec de PM', desc: 'Jornadas de usuário, personas e regras de negócio são formalizadas.' },
      { num: '03', phase: 'Tech PRD', desc: 'Os requisitos ganham critérios de aceite mensuráveis e escopo delimitado.' },
      { num: '04', phase: 'Arquitetura', desc: 'Spec técnica, épicos ordenados e artefatos por épico são gerados.' },
      { num: '05', phase: 'Build & Review', desc: 'Implementer escreve o código. QA valida. Reviewer aprova.' },
      { num: '06', phase: 'Ops & Release', desc: 'Observabilidade, padrões de anomalia e pipeline de deploy são encerrados.' },
    ],
    agentsTitle: 'Dez agentes. Um pipeline coerente.',
    agentCards: [
      {
        tag: '🧭',
        name: 'Discovery',
        desc: 'Estrutura ideias brutas sem viés técnico. Primeiro agente do Flow A.',
        flow: 'Flow A',
        href: '/pt/reference/agents',
        featured: true,
      },
      {
        tag: '🗂️',
        name: 'PM',
        desc: 'Traduz a ideia estruturada em uma spec funcional com jornadas de usuário.',
        flow: 'Flow A',
        href: '/pt/reference/agents',
      },
      {
        tag: '🧑‍💼',
        name: 'Tech Lead',
        desc: 'Conecta produto e engenharia — transforma a spec funcional em um PRD completo.',
        flow: 'Flow A',
        href: '/pt/reference/agents',
      },
      {
        tag: '🏗️',
        name: 'Architect',
        desc: 'Produz arquitetura técnica completa, épicos ordenados e artefatos por épico.',
        flow: 'Flow A',
        href: '/pt/reference/agents',
      },
      {
        tag: '📥',
        name: 'Intake',
        desc: 'Estrutura uma tarefa bruta em um entregável delimitado e sem ambiguidades.',
        flow: 'Flow B',
        href: '/pt/reference/agents',
      },
      {
        tag: '📐',
        name: 'Planner',
        desc: 'Gera PRD e spec para tarefas do Flow B a partir do intake estruturado.',
        flow: 'Flow B',
        href: '/pt/reference/agents',
      },
    ],
    ctaTitle: 'Comece a criar com agentes hoje.',
    ctaBody: 'O kit — agentes, prompts, templates e checkpoints — está aberto e pronto para uso.',
    ctaCta: 'Abrir a documentação',
    footer: {
      tagline: 'Fluxos de IA guiados por especificação para times de engenharia.',
      colGetStarted: 'Início',
      colGuide: 'Guia',
      colReference: 'Referência',
      copyright: '© 2026 AI SDLC Kit · Licença MIT',
    },
  },
  es: {
    eyebrow: 'Spec-Driven Development para equipos con IA',
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
    workflowTitle: 'De la idea a producción,\nsin perder el hilo.',
    steps: [
      { num: '01', phase: 'Discovery', desc: 'Una idea en bruto se convierte en una spec de producto estructurada sin sesgo técnico.' },
      { num: '02', phase: 'Spec de PM', desc: 'Los journeys de usuario, personas y reglas de negocio se formalizan.' },
      { num: '03', phase: 'Tech PRD', desc: 'Los requisitos obtienen criterios de aceptación medibles y límites de alcance.' },
      { num: '04', phase: 'Arquitectura', desc: 'Se generan spec técnica, épicas ordenadas y artefactos por épica.' },
      { num: '05', phase: 'Build & Review', desc: 'El Implementer escribe código. QA valida. El Reviewer aprueba.' },
      { num: '06', phase: 'Ops & Release', desc: 'Observabilidad, patrones de anomalía y pipeline de deploy se cierran.' },
    ],
    agentsTitle: 'Diez agentes. Un pipeline coherente.',
    agentCards: [
      {
        tag: '🧭',
        name: 'Discovery',
        desc: 'Estructura ideas en bruto sin sesgo técnico. Primer agente de Flow A.',
        flow: 'Flow A',
        href: '/es/reference/agents',
        featured: true,
      },
      {
        tag: '🗂️',
        name: 'PM',
        desc: 'Traduce la idea estructurada en una spec funcional con journeys de usuario.',
        flow: 'Flow A',
        href: '/es/reference/agents',
      },
      {
        tag: '🧑‍💼',
        name: 'Tech Lead',
        desc: 'Conecta producto e ingeniería — convierte la spec funcional en un PRD completo.',
        flow: 'Flow A',
        href: '/es/reference/agents',
      },
      {
        tag: '🏗️',
        name: 'Architect',
        desc: 'Produce arquitectura técnica completa, épicas ordenadas y artefactos por épica.',
        flow: 'Flow A',
        href: '/es/reference/agents',
      },
      {
        tag: '📥',
        name: 'Intake',
        desc: 'Estructura una tarea en bruto en un entregable delimitado y sin ambigüedades.',
        flow: 'Flow B',
        href: '/es/reference/agents',
      },
      {
        tag: '📐',
        name: 'Planner',
        desc: 'Genera PRD y spec para tareas de Flow B a partir del intake estructurado.',
        flow: 'Flow B',
        href: '/es/reference/agents',
      },
    ],
    ctaTitle: 'Empieza a construir con agentes hoy.',
    ctaBody: 'El kit — agentes, prompts, plantillas y checkpoints — está abierto y listo para usar.',
    ctaCta: 'Abrir la documentación',
    footer: {
      tagline: 'Flujos de IA guiados por especificación para equipos de ingeniería.',
      colGetStarted: 'Inicio',
      colGuide: 'Guía',
      colReference: 'Referencia',
      copyright: '© 2026 AI SDLC Kit · Licencia MIT',
    },
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

  // ── Page-wide scroll progress (for progress bar)
  const { scrollYProgress: pageProgress } = useScroll();
  const progressBarScaleX = useSpring(pageProgress, { stiffness: 200, damping: 30, mass: 0.5 });

  // ── Section refs for per-section parallax
  const panelsRef   = useRef<HTMLElement>(null);
  const workflowRef = useRef<HTMLElement>(null);
  const agentsRef   = useRef<HTMLElement>(null);
  const ctaRef      = useRef<HTMLElement>(null);

  // ── Panels parallax
  const { scrollYProgress: panelsSP } = useScroll({ target: panelsRef, offset: ['start end', 'end start'] });
  const panelsOrbAY = useTransform(panelsSP, [0, 1], ['0%', '-65%']);
  const panelsOrbBY = useTransform(panelsSP, [0, 1], ['0%', '-85%']);
  const panelsOrbCY = useTransform(panelsSP, [0, 1], ['0%', '-48%']);
  const panelsKitY  = useTransform(panelsSP, [0, 1], ['0%', '-55%']);

  // ── Workflow parallax
  const { scrollYProgress: workflowSP } = useScroll({ target: workflowRef, offset: ['start end', 'end start'] });
  const workflowGlow1Y = useTransform(workflowSP, [0, 1], ['0%', '-75%']);
  const workflowGlow2Y = useTransform(workflowSP, [0, 1], ['0%', '-48%']);

  // ── Agents parallax
  const { scrollYProgress: agentsSP } = useScroll({ target: agentsRef, offset: ['start end', 'end start'] });
  const agentsOrbY = useTransform(agentsSP, [0, 1], ['0%', '-72%']);

  // ── CTA parallax
  const { scrollYProgress: ctaSP } = useScroll({ target: ctaRef, offset: ['start end', 'end start'] });
  const ctaGridY = useTransform(ctaSP, [0, 1], ['0%', '-38%']);
  const ctaOrbY  = useTransform(ctaSP, [0, 1], ['0%', '-90%']);

  return (
    <div
      className="overflow-x-hidden text-white"
      style={{ background: '#050609', fontFamily: 'var(--font-sans)' }}
    >
      {/* ── Scroll progress bar ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] w-full origin-left"
        style={{
          scaleX: progressBarScaleX,
          background: 'linear-gradient(90deg, #F59E0B 0%, #14B8A6 100%)',
          boxShadow: '0 0 8px rgba(245,158,11,0.7)',
        }}
      />
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
            className="mb-8"
            style={{
              borderTop: '1px solid rgba(245,158,11,0.18)',
              background: 'linear-gradient(180deg, rgba(245,158,11,0.04) 0%, transparent 48%)',
            }}
          >
            <div className="grid grid-cols-3">
              {copy.highlights.map((item, idx) => (
                <div
                  key={item.label}
                  className="relative px-6 pt-6 pb-5"
                  style={{
                    borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                  }}
                >
                  {/* Amber glint on the border top, only for first stat */}
                  {idx === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-6 top-0 -translate-y-1/2 inline-block h-[5px] w-[5px] rounded-full"
                      style={{ background: '#F59E0B', boxShadow: '0 0 10px 2px rgba(245,158,11,0.55)' }}
                    />
                  )}
                  <span
                    className="block tabular-nums leading-none"
                    style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.04em',
                      ...(idx === 0
                        ? {
                            background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 55%, #D97706 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : {
                            color: idx === 1 ? 'rgba(245,240,232,0.78)' : 'rgba(245,240,232,0.55)',
                          }),
                    }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="mt-2.5 block text-[10px] uppercase tracking-[0.32em]"
                    style={{
                      color: idx === 0 ? 'rgba(245,158,11,0.52)' : 'rgba(255,255,255,0.22)',
                      fontFamily: 'var(--font-label)',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
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
        ref={panelsRef}
        className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-12"
        style={{ background: 'linear-gradient(180deg, #050609 0%, #07080d 100%)' }}
      >
        {/* All panel keyframes + aurora animations */}
        <style>{`
          @keyframes panelNumSweep {
            from { background-position: -300% center; }
            to   { background-position:  300% center; }
          }
          @keyframes panelNumPulse {
            0%, 100% { filter: drop-shadow(0 0  6px rgba(245,158,11,0.00)); }
            50%       { filter: drop-shadow(0 0 36px rgba(245,178,40,0.60)); }
          }
          @keyframes panelIdxPop {
            0%   { opacity: 0; transform: scale(0.55) translateY(4px); }
            70%  { opacity: 1; transform: scale(1.12) translateY(-1px); }
            100% { opacity: 1; transform: scale(1)   translateY(0);    }
          }
          @keyframes auroraDrift0 {
            0%   { transform: translate(0px,   0px)   scale(1);    }
            33%  { transform: translate(60px, -40px)  scale(1.08); }
            66%  { transform: translate(-30px, 50px)  scale(0.94); }
            100% { transform: translate(0px,   0px)   scale(1);    }
          }
          @keyframes auroraDrift1 {
            0%   { transform: translate(0px,   0px)   scale(1);    }
            40%  { transform: translate(-70px, 35px)  scale(1.06); }
            75%  { transform: translate(45px,  -55px) scale(0.96); }
            100% { transform: translate(0px,   0px)   scale(1);    }
          }
          @keyframes auroraDrift2 {
            0%   { transform: translate(0px,  0px)   scale(1);    }
            50%  { transform: translate(25px, 60px)  scale(1.1);  }
            100% { transform: translate(0px,  0px)   scale(1);    }
          }
        `}</style>

        {/* ── Aurora background blobs (z-0) ── */}
        {/* Orb A — amber, bottom-left */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ bottom: '-80px', left: '-60px', width: '520px', height: '520px', borderRadius: '50%', zIndex: 0, y: panelsOrbAY }}
        >
          <div className="h-full w-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.26) 0%, transparent 68%)', filter: 'blur(50px)', animation: 'auroraDrift0 22s ease-in-out infinite' }} />
        </motion.div>
        {/* Orb B — teal, top-right */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: '-60px', right: '-80px', width: '440px', height: '440px', borderRadius: '50%', zIndex: 0, y: panelsOrbBY }}
        >
          <div className="h-full w-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.20) 0%, transparent 68%)', filter: 'blur(55px)', animation: 'auroraDrift1 28s ease-in-out infinite' }} />
        </motion.div>
        {/* Orb C — white, center */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: '30%', left: '38%', width: '360px', height: '360px', borderRadius: '50%', zIndex: 0, y: panelsOrbCY }}
        >
          <div className="h-full w-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 68%)', filter: 'blur(70px)', animation: 'auroraDrift2 35s ease-in-out infinite' }} />
        </motion.div>

        {/* Giant decorative word "Kit" — atmospheric background watermark */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 right-0 select-none overflow-hidden leading-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(12rem, 26vw, 26rem)',
            color: 'rgba(255,255,255,0.014)',
            letterSpacing: '-0.06em',
            fontWeight: 400,
            lineHeight: 0.88,
            zIndex: 0,
            y: panelsKitY,
          }}
        >
          Kit
        </motion.div>

        {/* All content above aurora blobs */}
        <div className="relative" style={{ zIndex: 1 }}>
          {/* Amber separator rule */}
          <div className="mx-auto mb-16 max-w-7xl">
            <div
              className="h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.22), transparent)' }}
            />
          </div>

          {/* Section header */}
          <div className="mx-auto mb-16 max-w-7xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-6" style={{ background: '#F59E0B', opacity: 0.6 }} />
              <span
                className="text-[9px] font-medium uppercase tracking-[0.38em]"
                style={{ color: '#F59E0B', opacity: 0.75, fontFamily: 'var(--font-label)' }}
              >
                Core Capabilities
              </span>
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg leading-[1.1]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)',
                color: '#f5f0e8',
                letterSpacing: '-0.025em',
              }}
            >
              Built different,<br />
              <em
                style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(105deg, #F5ECB8 0%, #F59E0B 48%, #FDE68A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                by design.
              </em>
            </motion.h2>
          </div>

          {/* Cards grid */}
          <div className="mx-auto max-w-7xl grid gap-5 md:grid-cols-3 items-start">
            {copy.panels.map((panel, i) => (
              <PanelCard key={panel.title} panel={panel} i={i} featured={i === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── WORKFLOW PIPELINE ─────────── */}
      <section
        ref={workflowRef}
        className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-12"
        style={{ background: '#07080d' }}
      >
        {/* Atmospheric twin glows */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-[580px] w-[580px]"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(245,158,11,0.065) 0%, transparent 58%)', y: workflowGlow1Y }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 h-[580px] w-[580px]"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle at bottom right, rgba(6,182,212,0.065) 0%, transparent 58%)', y: workflowGlow2Y }}
        />

        {/* Section header */}
        <div className="relative mx-auto mb-20 max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-6" style={{ background: '#F59E0B', opacity: 0.6 }} />
            <span
              className="text-[9px] font-medium uppercase tracking-[0.38em]"
              style={{ color: '#F59E0B', opacity: 0.75, fontFamily: 'var(--font-label)' }}
            >
              Pipeline
            </span>
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl leading-[1.12]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
              whiteSpace: 'pre-line',
            }}
          >
            {copy.workflowTitle}
          </motion.h2>
        </div>

        <div className="relative mx-auto max-w-7xl">

          {/* ── DESKTOP: two pipeline rows (lg+) ── */}
          <div className="hidden lg:block space-y-16">
            {[
              {
                steps: copy.steps.slice(0, 3),
                offset: 0,
                lineGrad: 'linear-gradient(90deg,#F59E0B 0%,#F97316 50%,#EAB308 100%)',
                rowDelay: 0,
              },
              {
                steps: copy.steps.slice(3, 6),
                offset: 3,
                lineGrad: 'linear-gradient(90deg,#10B981 0%,#14B8A6 50%,#06B6D4 100%)',
                rowDelay: 0.18,
              },
            ].map((row, rowIdx) => (
              <div key={rowIdx} className="relative grid grid-cols-3 gap-6">

                {/* Gradient connecting line — vertically centred on the node (node is h-16, top half = 32px = top-8) */}
                <motion.div
                  className="pointer-events-none absolute left-[16.667%] right-[16.667%] top-8 h-px -translate-y-1/2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.1, delay: row.rowDelay, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: 'left center', background: row.lineGrad }}
                />

                {row.steps.map((step, j) => {
                  const c = pipelineColors[row.offset + j];
                  const StepIcon = stepIconList[row.offset + j];
                  return (
                    <motion.div
                      key={step.num}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: row.rowDelay + 0.32 + j * 0.11, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Glowing node — solid ring gap isolates node from line */}
                      <motion.div
                        className="relative z-10 flex h-16 w-16 cursor-default items-center justify-center rounded-full"
                        whileHover={{ scale: 1.13 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{
                          background: `rgba(${c.rgb},0.10)`,
                          border: `1px solid rgba(${c.rgb},0.55)`,
                          boxShadow: `0 0 0 5px #07080d, 0 0 0 6px rgba(${c.rgb},0.18), 0 0 36px -6px rgba(${c.rgb},0.65)`,
                        }}
                      >
                        <StepIcon size={22} strokeWidth={1.4} style={{ color: c.color }} aria-hidden="true" />
                      </motion.div>

                      {/* Stem */}
                      <div
                        className="h-7 w-px"
                        style={{ background: `linear-gradient(180deg, rgba(${c.rgb},0.45) 0%, transparent 100%)` }}
                      />

                      {/* Phase card */}
                      <div
                        className="group/card relative w-full overflow-hidden p-6 transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]"
                        style={{
                          background: `linear-gradient(148deg, rgba(${c.rgb},0.08) 0%, rgba(7,8,13,0.98) 58%)`,
                          border: `1px solid rgba(${c.rgb},0.13)`,
                          borderTop: `2px solid rgba(${c.rgb},0.5)`,
                        }}
                      >
                        {/* Watermark number */}
                        <span
                          className="pointer-events-none absolute -bottom-4 -right-1 select-none leading-none"
                          aria-hidden="true"
                          style={{
                            fontFamily: 'var(--font-label)',
                            fontSize: '6rem',
                            fontWeight: 700,
                            color: `rgba(${c.rgb},0.038)`,
                            letterSpacing: '-0.05em',
                          }}
                        >
                          {step.num}
                        </span>

                        <span
                          className="mb-3 block text-[9px] font-medium uppercase tracking-[0.32em]"
                          style={{ color: c.color, opacity: 0.72, fontFamily: 'var(--font-label)' }}
                        >
                          {step.num}
                        </span>
                        <h3
                          className="mb-3 leading-tight"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 400,
                            fontSize: 'clamp(1.05rem, 1.5vw, 1.28rem)',
                            color: '#f5f0e8',
                            letterSpacing: '-0.015em',
                          }}
                        >
                          {step.phase}
                        </h3>
                        <div
                          className="mb-4 h-px w-7 transition-all duration-300 group-hover/card:w-14"
                          style={{ background: `rgba(${c.rgb},0.55)` }}
                        />
                        <p
                          className="text-[0.79rem] leading-[1.85]"
                          style={{ color: 'rgba(255,255,255,0.37)', fontWeight: 300 }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ── MOBILE/TABLET: vertical spine timeline (< lg) ── */}
          <div className="relative lg:hidden">
            {/* Full-height color-spectrum spine */}
            <div
              className="absolute bottom-0 left-5 top-0 w-px"
              style={{
                background:
                  'linear-gradient(180deg,#F59E0B 0%,#F97316 20%,#EAB308 37%,#10B981 60%,#14B8A6 80%,#06B6D4 100%)',
              }}
            />
            <div className="space-y-0">
              {copy.steps.map((step, i) => {
                const c = pipelineColors[i];
                const StepIcon = stepIconList[i];
                return (
                  <motion.div
                    key={step.num}
                    className="relative flex gap-5 pb-8"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Node on spine */}
                    <div
                      className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `rgba(${c.rgb},0.10)`,
                        border: `1px solid rgba(${c.rgb},0.48)`,
                        boxShadow: `0 0 0 3px #07080d, 0 0 16px -4px rgba(${c.rgb},0.55)`,
                      }}
                    >
                      <StepIcon size={16} strokeWidth={1.5} style={{ color: c.color }} aria-hidden="true" />
                    </div>

                    {/* Card */}
                    <div
                      className="flex-1 p-5"
                      style={{
                        background: `rgba(${c.rgb},0.042)`,
                        border: `1px solid rgba(${c.rgb},0.11)`,
                        borderLeft: `2px solid rgba(${c.rgb},0.42)`,
                      }}
                    >
                      <span
                        className="mb-2 block text-[9px] uppercase tracking-[0.3em]"
                        style={{ color: c.color, opacity: 0.68, fontFamily: 'var(--font-label)' }}
                      >
                        {step.num}
                      </span>
                      <h3
                        className="mb-2 leading-snug"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 400,
                          fontSize: '1.1rem',
                          color: '#f5f0e8',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {step.phase}
                      </h3>
                      <p
                        className="text-sm leading-[1.75]"
                        style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ─────────── AGENTS BENTO GRID ─────────── */}
      <section
        ref={agentsRef}
        className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-12"
        style={{ background: 'linear-gradient(180deg, #08090f 0%, #050609 100%)' }}
      >
        {/* Parallax bg orb */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2"
          style={{ width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)', filter: 'blur(60px)', y: agentsOrbY }}
        />
        {/* Amber separator rule */}
        <div className="mx-auto mb-20 max-w-7xl">
          <div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.18), transparent)' }}
          />
        </div>

        {/* Section header */}
        <div className="mx-auto mb-16 max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-6" style={{ background: '#F59E0B', opacity: 0.6 }} />
            <span
              className="text-[9px] font-medium uppercase tracking-[0.38em]"
              style={{ color: '#F59E0B', opacity: 0.75, fontFamily: 'var(--font-label)' }}
            >
              Agents
            </span>
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl leading-[1.12]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              color: '#f5f0e8',
              letterSpacing: '-0.02em',
            }}
          >
            {copy.agentsTitle}
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="mx-auto max-w-5xl grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {copy.agentCards.map((card, i) => {
            const isFlowA = card.flow === 'Flow A';
            const accentColor = isFlowA ? '#F59E0B' : '#14B8A6';
            const accentRgb = isFlowA ? '245,158,11' : '20,184,166';
            const AgentIcon = agentIconList[i];
            const isLastAlone = i === copy.agentCards.length - 1 && !card.featured;

            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{ duration: 0.72, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
                className={`group relative flex flex-col overflow-hidden ${
                  card.featured ? 'lg:col-span-2' : isLastAlone ? 'lg:col-start-2' : ''
                }`}
                style={{
                  background: card.featured
                    ? `linear-gradient(145deg, rgba(${accentRgb},0.09) 0%, rgba(5,6,9,0.97) 55%)`
                    : 'rgba(255,255,255,0.023)',
                  border: `1px solid rgba(${accentRgb},${card.featured ? '0.28' : '0.10'})`,
                  borderRadius: '2px',
                  boxShadow: card.featured
                    ? `0 0 0 1px rgba(${accentRgb},0.06), inset 0 1px 0 rgba(255,255,255,0.04)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Top accent bar — grows on hover */}
                <div
                  className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, rgba(${accentRgb},0.8), rgba(${accentRgb},0.2))` }}
                />

                {/* Atmospheric glow — top right */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                  style={{
                    background: `radial-gradient(circle at center, rgba(${accentRgb},0.13) 0%, transparent 65%)`,
                  }}
                />

                {/* Large watermark index number */}
                <div
                  className="pointer-events-none absolute -right-2 -bottom-4 select-none leading-none"
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: card.featured ? '7rem' : '5.5rem',
                    fontWeight: 700,
                    color: `rgba(${accentRgb},0.045)`,
                    letterSpacing: '-0.05em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Card inner padding */}
                <div className="relative flex flex-1 flex-col p-8 lg:p-9">

                  {/* Header row: flow pill + icon */}
                  <div className="mb-7 flex items-center justify-between">
                    {/* Flow pill */}
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[9px] font-semibold uppercase tracking-[0.3em]"
                      style={{
                        fontFamily: 'var(--font-label)',
                        background: `rgba(${accentRgb},0.08)`,
                        color: accentColor,
                        border: `1px solid rgba(${accentRgb},0.2)`,
                      }}
                    >
                      <span
                        className="inline-block h-1 w-1 rounded-full"
                        style={{ background: accentColor, opacity: 0.85 }}
                      />
                      {card.flow}
                    </span>

                    {/* Icon container */}
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `rgba(${accentRgb},0.07)`,
                        border: `1px solid rgba(${accentRgb},0.16)`,
                        boxShadow: `0 0 16px -4px rgba(${accentRgb},0.2)`,
                      }}
                    >
                      <AgentIcon
                        size={card.featured ? 22 : 18}
                        strokeWidth={1.5}
                        style={{ color: accentColor, opacity: 0.9 }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Agent name */}
                  <h3
                    className="mb-4 leading-[1.1]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontSize: card.featured ? 'clamp(1.7rem, 3.2vw, 2.4rem)' : 'clamp(1.25rem, 2.2vw, 1.6rem)',
                      color: '#f5f0e8',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {card.name}
                  </h3>

                  {/* Thin separator */}
                  <div
                    className="mb-5 h-px w-12 transition-all duration-400 group-hover:w-20"
                    style={{ background: `rgba(${accentRgb},0.35)` }}
                  />

                  {/* Description */}
                  <p
                    className="flex-1 text-sm leading-[1.9]"
                    style={{ color: 'rgba(255,255,255,0.40)', fontWeight: 300, fontFamily: 'var(--font-sans)' }}
                  >
                    {card.desc}
                  </p>

                  {/* Footer link — always visible, slides on hover */}
                  <div className="mt-8 flex items-center justify-between">
                    <Link
                      href={card.href}
                      className="group/link inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.22em]"
                      style={{
                        fontFamily: 'var(--font-label)',
                        color: `rgba(${accentRgb},0.55)`,
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `rgba(${accentRgb},0.55)`)}
                    >
                      <span style={{ borderBottom: `1px solid rgba(${accentRgb},0.3)`, paddingBottom: 1 }}>
                        View agent
                      </span>
                      <span className="translate-x-0 transition-transform duration-200 group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>

                    {/* Status dot */}
                    <span
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.18)' }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: `rgba(${accentRgb},0.5)` }}
                      />
                      Active
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─────────── CTA FINAL ─────────── */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden px-6 py-32 sm:px-10 lg:px-12"
        style={{ background: '#030406' }}
      >
        {/* CTA keyframes */}
        <style>{`
          @keyframes ctaGridPulse {
            0%, 100% { opacity: 0.28; }
            50%       { opacity: 0.55; }
          }
          @keyframes ctaOrb {
            0%   { transform: scale(1)    translateY(0px);  }
            50%  { transform: scale(1.12) translateY(-18px); }
            100% { transform: scale(1)    translateY(0px);  }
          }
          @keyframes ctaBadgeIn {
            from { opacity: 0; transform: translateY(12px) scale(0.9); }
            to   { opacity: 1; transform: translateY(0)    scale(1);   }
          }
        `}</style>

        {/* Animated SVG circuit lines */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ y: ctaGridY }}
        >
        <svg
          aria-hidden="true"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: 0.18 }}
        >
          <defs>
            <linearGradient id="lineGradH" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#14B8A6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="lineGradV" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          {[18, 38, 58, 78].map((pct) => (
            <motion.line
              key={`h${pct}`}
              x1="0%" y1={`${pct}%`} x2="100%" y2={`${pct}%`}
              stroke="url(#lineGradH)" strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.8, delay: pct / 120, ease: 'easeInOut' }}
            />
          ))}
          {/* Vertical lines */}
          {[15, 35, 50, 65, 85].map((pct) => (
            <motion.line
              key={`v${pct}`}
              x1={`${pct}%`} y1="0%" x2={`${pct}%`} y2="100%"
              stroke="url(#lineGradV)" strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 2.2, delay: 0.1 + pct / 200, ease: 'easeInOut' }}
            />
          ))}
          {/* Intersection node dots */}
          {[{cx:'15%',cy:'38%'},{cx:'35%',cy:'18%'},{cx:'50%',cy:'58%'},{cx:'65%',cy:'38%'},{cx:'85%',cy:'78%'},{cx:'35%',cy:'78%'}].map((pt, idx) => (
            <motion.circle
              key={idx}
              cx={pt.cx} cy={pt.cy} r="3"
              fill="none"
              stroke={idx % 2 === 0 ? '#F59E0B' : '#14B8A6'}
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 + idx * 0.12 }}
            />
          ))}
        </svg>
        </motion.div>

        {/* Amber center glow orb */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ y: ctaOrbY }}
        >
          <div style={{ width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 60%)', filter: 'blur(40px)', animation: 'ctaOrb 8s ease-in-out infinite' }} />
        </motion.div>

        <div className="relative mx-auto max-w-3xl text-center">

          {/* Stat badges */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {copy.highlights.map(({ value, label }, idx) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  fontFamily: 'var(--font-label)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.55)',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  {value}
                </span>
                {label}
              </motion.span>
            ))}
          </div>

          {/* Headline with amber→cream gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="leading-[1.08] tracking-[-0.03em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
              backgroundImage: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 30%, #F5ECB8 65%, #f0ece4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {copy.ctaTitle}
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-lg text-base leading-[1.9] sm:text-lg"
            style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300, fontFamily: 'var(--font-sans)' }}
          >
            {copy.ctaBody}
          </motion.p>

          {/* CTA buttons row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Primary CTA */}
            <Link
              href={`/${locale}/get-started/installation`}
              className="group inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-semibold text-[#050609] transition-all hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: '#F59E0B',
                boxShadow: '0 0 60px -8px rgba(245,158,11,0.70), 0 0 120px -20px rgba(245,158,11,0.35)',
                fontFamily: 'var(--font-sans)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease',
              }}
            >
              {copy.ctaCta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

            {/* Secondary: GitHub */}
            <a
              href="https://github.com/glaucia86/ai-sdlc-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-[14px] text-sm font-medium transition-all hover:border-white/30 hover:text-white"
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.55)',
                fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
            >
              <Github size={15} strokeWidth={1.6} aria-hidden="true" />
              Star on GitHub
              <ExternalLink size={12} strokeWidth={1.5} aria-hidden="true" className="opacity-50" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer
        style={{ background: '#020305', borderTop: '1px solid rgba(245,158,11,0.14)' }}
      >
        {/* Main footer grid */}
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
          <div className="grid gap-12 md:grid-cols-4">

            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    letterSpacing: '-0.02em',
                    color: '#f5f0e8',
                    fontWeight: 400,
                  }}
                >
                  AI SDLC Kit
                </span>
              </div>
              <p
                className="mb-6 text-xs leading-[1.8]"
                style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'var(--font-sans)', fontWeight: 300 }}
              >
                {copy.footer.tagline}
              </p>
              <a
                href="https://github.com/glaucia86/ai-sdlc-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-all hover:border-amber-400/40 hover:text-amber-400"
                style={{
                  fontFamily: 'var(--font-label)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.45)',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              >
                <Github size={12} strokeWidth={1.6} aria-hidden="true" />
                GitHub
                <ExternalLink size={10} strokeWidth={1.5} aria-hidden="true" className="opacity-60" />
              </a>
            </div>

            {/* Get Started column */}
            <div>
              <p
                className="mb-5 text-[9px] font-medium uppercase tracking-[0.38em]"
                style={{ color: '#F59E0B', opacity: 0.7, fontFamily: 'var(--font-label)' }}
              >
                {copy.footer.colGetStarted}
              </p>
              <ul className="space-y-3">
                {[
                  { label: 'How it works', path: 'get-started/how-it-works' },
                  { label: 'Installation', path: 'get-started/installation' },
                  { label: 'Quick start', path: 'get-started/quick-start' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      href={`/${locale}/${path}`}
                      className="text-xs transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-sans)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guide column */}
            <div>
              <p
                className="mb-5 text-[9px] font-medium uppercase tracking-[0.38em]"
                style={{ color: '#F59E0B', opacity: 0.7, fontFamily: 'var(--font-label)' }}
              >
                {copy.footer.colGuide}
              </p>
              <ul className="space-y-3">
                {[
                  { label: 'Discovery phase', path: 'guide/discovery-phase' },
                  { label: 'HITL checkpoints', path: 'guide/hil-checkpoints' },
                  { label: 'Spec phase', path: 'guide/spec-phase' },
                  { label: 'Epic phase', path: 'guide/epic-phase' },
                  { label: 'Operations', path: 'guide/operations-phase' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      href={`/${locale}/${path}`}
                      className="text-xs transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-sans)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reference column */}
            <div>
              <p
                className="mb-5 text-[9px] font-medium uppercase tracking-[0.38em]"
                style={{ color: '#F59E0B', opacity: 0.7, fontFamily: 'var(--font-label)' }}
              >
                {copy.footer.colReference}
              </p>
              <ul className="space-y-3">
                {[
                  { label: 'Agents', path: 'reference/agents' },
                  { label: 'Prompts', path: 'reference/prompts' },
                  { label: 'Templates', path: 'reference/templates' },
                  { label: 'Artifacts', path: 'reference/artifacts' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      href={`/${locale}/${path}`}
                      className="text-xs transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-sans)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mx-auto max-w-7xl px-6 py-5 sm:px-10 lg:px-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}
        >
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p
              className="text-[10px] uppercase tracking-[0.24em]"
              style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-label)' }}
            >
              {copy.footer.copyright}
            </p>
            <a
              href="https://github.com/glaucia86/ai-sdlc-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-amber-400"
              style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-label)' }}
            >
              <Github size={11} strokeWidth={1.5} aria-hidden="true" />
              glaucia86/ai-sdlc-kit
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}