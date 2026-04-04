import Link from 'next/link';
import { motion } from 'motion/react';

import { supportedLocales, type HomeLocale } from '@/lib/locale';

import { localeLabels } from '../content';
import { DepthParticle } from '../depth-particle';
import type { HomePageMotion } from '../hooks';
import {
  SECTION_ACCENT_COLOR,
  SECTION_ACCENT_RGB,
  SECTION_EASE,
  SECTION_KICKER_LINE_STYLE,
  SECTION_KICKER_TEXT_STYLE,
  SECTION_META_LABEL_STYLE,
} from '../section-styles';
import type { HomeCopy } from '../types';

const HERO_PARTICLES = [
  { left: '11%', top: '17%', size: 3, ySpeed: -95, xDrift: 8, baseOpacity: 0.45, color: 'rgba(245,158,11,0.70)' },
  { left: '76%', top: '31%', size: 2, ySpeed: -145, xDrift: -5, baseOpacity: 0.28, color: 'rgba(255,255,255,0.80)' },
  { left: '88%', top: '54%', size: 4, ySpeed: -60, xDrift: 12, baseOpacity: 0.55, color: 'rgba(245,158,11,0.55)' },
  { left: '21%', top: '67%', size: 2, ySpeed: -180, xDrift: -14, baseOpacity: 0.32, color: 'rgba(20,184,166,0.80)' },
  { left: '51%', top: '7%', size: 3, ySpeed: -42, xDrift: 6, baseOpacity: 0.22, color: 'rgba(255,255,255,0.55)' },
  { left: '38%', top: '83%', size: 2, ySpeed: -110, xDrift: -8, baseOpacity: 0.38, color: 'rgba(245,158,11,0.60)' },
  { left: '63%', top: '44%', size: 5, ySpeed: -78, xDrift: -4, baseOpacity: 0.18, color: 'rgba(20,184,166,0.50)' },
  { left: '4%', top: '42%', size: 2, ySpeed: -220, xDrift: 7, baseOpacity: 0.24, color: 'rgba(255,255,255,0.65)' },
] as const;

const HERO_GRID_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
  backgroundSize: '72px 72px',
} as const;

const HERO_AMBER_ORB_STYLE = {
  background: 'radial-gradient(circle at center, rgba(245,158,11,0.13) 0%, transparent 65%)',
} as const;

const HERO_TEAL_ORB_STYLE = {
  background: 'radial-gradient(circle at center, rgba(20,184,166,0.09) 0%, transparent 68%)',
} as const;

const LOCALE_SELECT_STYLE = {
  fontFamily: 'var(--font-label)',
  background: 'rgba(255,255,255,0.06)',
  border: `1px solid rgba(${SECTION_ACCENT_RGB},0.25)`,
  color: SECTION_ACCENT_COLOR,
  backdropFilter: 'blur(8px)',
} as const;

const LOCALE_OPTION_STYLE = {
  background: '#0d0e14',
  color: '#f5f0e8',
} as const;

const HERO_TITLE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
  color: '#f5f0e8',
} as const;

const HERO_KICKER_LINE_STYLE = {
  ...SECTION_KICKER_LINE_STYLE,
  opacity: 0.7,
} as const;

const HERO_KICKER_TEXT_STYLE = {
  ...SECTION_KICKER_TEXT_STYLE,
  opacity: 0.85,
} as const;

const HERO_LOCALE_CARET_STYLE = {
  color: SECTION_ACCENT_COLOR,
  opacity: 0.7,
} as const;

const HERO_DESCRIPTION_STYLE = {
  color: 'rgba(255,255,255,0.44)',
  fontWeight: 300,
} as const;

const HERO_PRIMARY_CTA_STYLE = {
  background: SECTION_ACCENT_COLOR,
  boxShadow: '0 0 48px -8px rgba(245,158,11,0.55)',
  fontFamily: 'var(--font-sans)',
} as const;

const HERO_SECONDARY_CTA_STYLE = {
  color: 'rgba(255,255,255,0.40)',
  fontFamily: 'var(--font-sans)',
  letterSpacing: '0.01em',
} as const;

const HERO_HIGHLIGHTS_WRAP_STYLE = {
  borderTop: `1px solid rgba(${SECTION_ACCENT_RGB},0.18)`,
  background: 'linear-gradient(180deg, rgba(245,158,11,0.04) 0%, transparent 48%)',
} as const;

const HERO_HIGHLIGHT_DOT_STYLE = {
  background: SECTION_ACCENT_COLOR,
  boxShadow: '0 0 10px 2px rgba(245,158,11,0.55)',
} as const;

const HERO_HIGHLIGHT_VALUE_BASE_STYLE = {
  fontFamily: 'var(--font-label)',
  fontSize: 'clamp(1.9rem, 4.2vw, 3rem)',
  fontWeight: 600,
  letterSpacing: '-0.04em',
} as const;

const HERO_HIGHLIGHT_VALUE_ACCENT_STYLE = {
  background: `linear-gradient(135deg, #FDE68A 0%, ${SECTION_ACCENT_COLOR} 55%, #D97706 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const HERO_HIGHLIGHT_VALUE_PRIMARY_STYLE = {
  color: 'rgba(245,240,232,0.78)',
} as const;

const HERO_HIGHLIGHT_VALUE_SECONDARY_STYLE = {
  color: 'rgba(245,240,232,0.55)',
} as const;

const HERO_HIGHLIGHT_LABEL_ACCENT_STYLE = {
  color: `rgba(${SECTION_ACCENT_RGB},0.52)`,
  fontFamily: 'var(--font-label)',
} as const;

const HERO_HIGHLIGHT_LABEL_DEFAULT_STYLE = {
  color: 'rgba(255,255,255,0.22)',
  fontFamily: 'var(--font-label)',
} as const;

const HERO_HIGHLIGHT_COLUMN_DIVIDER = '1px solid rgba(255,255,255,0.06)';

const HERO_SCROLL_TEXT_STYLE = {
  ...SECTION_META_LABEL_STYLE,
  color: 'rgba(255,255,255,0.18)',
} as const;

function getHighlightValueStyle(index: number) {
  if (index === 0) {
    return HERO_HIGHLIGHT_VALUE_ACCENT_STYLE;
  }

  if (index === 1) {
    return HERO_HIGHLIGHT_VALUE_PRIMARY_STYLE;
  }

  return HERO_HIGHLIGHT_VALUE_SECONDARY_STYLE;
}

function getHighlightLabelStyle(index: number) {
  if (index === 0) {
    return HERO_HIGHLIGHT_LABEL_ACCENT_STYLE;
  }

  return HERO_HIGHLIGHT_LABEL_DEFAULT_STYLE;
}

type HeroSectionProps = {
  locale: HomeLocale;
  copy: HomeCopy;
  motionValues: HomePageMotion;
  onLocaleChange: (locale: HomeLocale) => void;
};

export function HeroSection({ locale, copy, motionValues, onLocaleChange }: HeroSectionProps) {
  const {
    heroRef,
    scrollYProgress,
    orbAmberY,
    orbTealY,
    gridY,
    heroY,
    heroOpacity,
    hintOpacity,
    gridSkewY,
    orbAmberScale,
    orbAmberRotate,
    orbTealX,
    orbTealScale,
    heroFilter,
  } = motionValues;

  return (
    <section ref={heroRef} className="relative flex min-h-screen flex-col overflow-hidden">
      <motion.div aria-hidden="true" style={{ y: gridY, skewY: gridSkewY }} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="h-full w-full"
          style={HERO_GRID_STYLE}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: orbAmberY, scale: orbAmberScale, rotate: orbAmberRotate }}
        className="pointer-events-none absolute -bottom-24 -left-36 -z-10 h-[680px] w-[680px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={HERO_AMBER_ORB_STYLE}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: orbTealY, x: orbTealX, scale: orbTealScale }}
        className="pointer-events-none absolute -right-24 top-[8%] -z-10 h-[440px] w-[440px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={HERO_TEAL_ORB_STYLE}
        />
      </motion.div>

      {HERO_PARTICLES.map((particle) => (
        <DepthParticle
          key={`${particle.left}-${particle.top}`}
          scrollProg={scrollYProgress}
          left={particle.left}
          top={particle.top}
          size={particle.size}
          ySpeed={particle.ySpeed}
          xDrift={particle.xDrift}
          baseOpacity={particle.baseOpacity}
          color={particle.color}
        />
      ))}

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, filter: heroFilter }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 sm:px-10 lg:px-12"
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium tracking-[0.18em] text-white/30" style={{ fontFamily: 'var(--font-label)' }}>
              AI · SDLC · KIT
            </span>
          </div>

          <div className="relative" aria-label={copy.languageLabel}>
            <select
              value={locale}
              onChange={(e) => {
                onLocaleChange(e.target.value as HomeLocale);
              }}
              className="appearance-none cursor-pointer rounded-full py-1.5 pl-4 pr-8 text-[11px] font-medium tracking-widest transition-all outline-none"
              style={LOCALE_SELECT_STYLE}
              aria-label={copy.languageLabel}
            >
              {supportedLocales.map((item) => (
                <option key={item} value={item} style={LOCALE_OPTION_STYLE}>
                  {localeLabels[item]}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[8px]"
              style={HERO_LOCALE_CARET_STYLE}
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </header>

        <div className="flex flex-1 flex-col justify-center pb-8 pt-16 lg:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: SECTION_EASE }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-8 flex-shrink-0" style={HERO_KICKER_LINE_STYLE} />
            <span className="text-[10px] font-medium uppercase tracking-[0.36em]" style={HERO_KICKER_TEXT_STYLE}>
              {copy.eyebrow}
            </span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: SECTION_EASE }}
            className="max-w-4xl leading-[1.08] tracking-[-0.02em]"
            style={HERO_TITLE_STYLE}
          >
            {copy.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.33, ease: SECTION_EASE }}
            className="mt-8 max-w-xl text-base leading-[1.9] sm:text-lg"
            style={HERO_DESCRIPTION_STYLE}
          >
            {copy.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.44, ease: SECTION_EASE }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href={`/${locale}/get-started/installation`}
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-[#050609] transition-all hover:brightness-110"
              style={HERO_PRIMARY_CTA_STYLE}
            >
              {copy.primaryCta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={`/${locale}/reference/agents`}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all"
              style={HERO_SECONDARY_CTA_STYLE}
            >
              <span className="border-b border-white/15 pb-px transition-colors hover:border-white/40 hover:text-white/65">{copy.secondaryCta}</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58, ease: SECTION_EASE }}
          className="mb-8"
          style={HERO_HIGHLIGHTS_WRAP_STYLE}
        >
          <div className="grid grid-cols-3">
            {copy.highlights.map((item, idx) => (
              <div
                key={item.label}
                className="relative px-6 pt-6 pb-5"
                style={{ borderRight: idx < copy.highlights.length - 1 ? HERO_HIGHLIGHT_COLUMN_DIVIDER : undefined }}
              >
                {idx === 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-0 -translate-y-1/2 inline-block h-[5px] w-[5px] rounded-full"
                    style={HERO_HIGHLIGHT_DOT_STYLE}
                  />
                )}
                <span
                  className="block tabular-nums leading-none"
                  style={{
                    ...HERO_HIGHLIGHT_VALUE_BASE_STYLE,
                    ...getHighlightValueStyle(idx),
                  }}
                >
                  {item.value}
                </span>
                <span
                  className="mt-2.5 block text-[10px] uppercase tracking-[0.32em]"
                  style={getHighlightLabelStyle(idx)}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

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
          style={HERO_SCROLL_TEXT_STYLE}
        >
          scroll
        </span>
      </motion.div>
    </section>
  );
}
