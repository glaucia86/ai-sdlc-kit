import Link from 'next/link';
import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';

import type { HomeLocale } from '@/lib/locale';

import type { HomePageMotion } from '../hooks';
import { SECTION_ACCENT_COLOR, SECTION_EASE, SECTION_SECONDARY_COLOR } from '../section-styles';
import type { HomeCopy } from '../types';

const CTA_HORIZONTAL_LINES = [18, 38, 58, 78] as const;
const CTA_VERTICAL_LINES = [15, 35, 50, 65, 85] as const;
const CTA_GRID_LINES = [
  ...CTA_HORIZONTAL_LINES.map((pct) => ({
    key: `h${pct}`,
    x1: '0%',
    y1: `${pct}%`,
    x2: '100%',
    y2: `${pct}%`,
    stroke: 'url(#lineGradH)',
    duration: 1.8,
    delay: pct / 120,
  })),
  ...CTA_VERTICAL_LINES.map((pct) => ({
    key: `v${pct}`,
    x1: `${pct}%`,
    y1: '0%',
    x2: `${pct}%`,
    y2: '100%',
    stroke: 'url(#lineGradV)',
    duration: 2.2,
    delay: 0.1 + pct / 200,
  })),
] as const;

const CTA_NODE_POINTS = [
  { cx: '15%', cy: '38%' },
  { cx: '35%', cy: '18%' },
  { cx: '50%', cy: '58%' },
  { cx: '65%', cy: '38%' },
  { cx: '85%', cy: '78%' },
  { cx: '35%', cy: '78%' },
] as const;

const CTA_NODE_CONFIGS = CTA_NODE_POINTS.map((point, idx) => ({
  ...point,
  key: `n${idx}`,
  stroke: idx % 2 === 0 ? SECTION_ACCENT_COLOR : SECTION_SECONDARY_COLOR,
  delay: 0.8 + idx * 0.12,
}));

const CTA_ORB_STYLE = {
  width: '700px',
  height: '700px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 60%)',
  filter: 'blur(40px)',
  animation: 'ctaOrb 8s ease-in-out infinite',
} as const;

const CTA_BADGE_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  fontFamily: 'var(--font-label)',
  fontSize: '10px',
  letterSpacing: '0.12em',
  color: 'rgba(255,255,255,0.55)',
  textTransform: 'uppercase',
} as const;

const CTA_BADGE_VALUE_STYLE = {
  color: SECTION_ACCENT_COLOR,
  fontWeight: 700,
  fontSize: '13px',
  fontFamily: 'var(--font-display)',
  letterSpacing: '-0.02em',
} as const;

const CTA_TITLE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
  backgroundImage: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 30%, #F5ECB8 65%, #f0ece4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const CTA_DESCRIPTION_STYLE = {
  color: 'rgba(255,255,255,0.38)',
  fontWeight: 300,
  fontFamily: 'var(--font-sans)',
} as const;

const CTA_PRIMARY_BUTTON_STYLE = {
  background: SECTION_ACCENT_COLOR,
  boxShadow: '0 0 60px -8px rgba(245,158,11,0.70), 0 0 120px -20px rgba(245,158,11,0.35)',
  fontFamily: 'var(--font-sans)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease',
} as const;

const CTA_SECONDARY_BUTTON_STYLE = {
  border: '1px solid rgba(255,255,255,0.14)',
  color: 'rgba(255,255,255,0.55)',
  fontFamily: 'var(--font-sans)',
  transition: 'border-color 0.2s ease, color 0.2s ease',
} as const;

const CTA_SECTION_STYLE = {
  background: '#030406',
} as const;

type CtaSectionProps = {
  locale: HomeLocale;
  copy: HomeCopy;
  motionValues: HomePageMotion;
};

export function CtaSection({ locale, copy, motionValues }: CtaSectionProps) {
  const { ctaRef, ctaGridY, ctaOrbY, ctaOrbScale, ctaOrbRotate } = motionValues;

  return (
    <section ref={ctaRef} className="relative overflow-hidden px-6 py-32 sm:px-10 lg:px-12" style={CTA_SECTION_STYLE}>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ y: ctaGridY }}>
        <svg aria-hidden="true" className="h-full w-full" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.18 }}>
          <defs>
            <linearGradient id="lineGradH" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor={SECTION_ACCENT_COLOR} stopOpacity="0.7" />
              <stop offset="70%" stopColor={SECTION_SECONDARY_COLOR} stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="lineGradV" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor={SECTION_ACCENT_COLOR} stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {CTA_GRID_LINES.map((line) => (
            <motion.line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.stroke}
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: line.duration, delay: line.delay, ease: 'easeInOut' }}
            />
          ))}

          {CTA_NODE_CONFIGS.map((node) => (
            <motion.circle
              key={node.key}
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="none"
              stroke={node.stroke}
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: node.delay }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ y: ctaOrbY, scale: ctaOrbScale, rotate: ctaOrbRotate }}
      >
        <div style={CTA_ORB_STYLE} />
      </motion.div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {copy.highlights.map(({ value, label }, idx) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: SECTION_EASE }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={CTA_BADGE_STYLE}
            >
              <span style={CTA_BADGE_VALUE_STYLE}>
                {value}
              </span>
              {label}
            </motion.span>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: SECTION_EASE }}
          className="leading-[1.08] tracking-[-0.03em]"
          style={CTA_TITLE_STYLE}
        >
          {copy.ctaTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.14, ease: SECTION_EASE }}
          className="mx-auto mt-7 max-w-lg text-base leading-[1.9] sm:text-lg"
          style={CTA_DESCRIPTION_STYLE}
        >
          {copy.ctaBody}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.26, ease: SECTION_EASE }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={`/${locale}/get-started/installation`}
            className="group inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-semibold text-[#050609] transition-all hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
            style={CTA_PRIMARY_BUTTON_STYLE}
          >
            {copy.ctaCta}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>

          <a
            href="https://github.com/glaucia86/ai-sdlc-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full px-7 py-[14px] text-sm font-medium transition-all hover:border-white/30 hover:text-white"
            style={CTA_SECONDARY_BUTTON_STYLE}
          >
            <Github size={15} strokeWidth={1.6} aria-hidden="true" />
            Star on GitHub
            <ExternalLink size={12} strokeWidth={1.5} aria-hidden="true" className="opacity-50" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
