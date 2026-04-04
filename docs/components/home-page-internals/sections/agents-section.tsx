import Link from 'next/link';
import { motion } from 'motion/react';

import { agentIconList } from '../config';
import type { HomePageMotion } from '../hooks';
import { SECTION_ACCENT_COLOR, SECTION_ACCENT_RGB, SECTION_EASE, SECTION_KICKER_LINE_STYLE, SECTION_KICKER_TEXT_STYLE, SECTION_SECONDARY_COLOR } from '../section-styles';
import type { HomeCopy } from '../types';

type FlowTheme = {
  accentColor: string;
  accentRgb: string;
};

const AGENT_FLOW_THEMES: Record<string, FlowTheme> = {
  'Flow A': { accentColor: SECTION_ACCENT_COLOR, accentRgb: SECTION_ACCENT_RGB },
  'Flow B': { accentColor: SECTION_SECONDARY_COLOR, accentRgb: '20,184,166' },
};

const DEFAULT_FLOW_THEME: FlowTheme = {
  accentColor: SECTION_SECONDARY_COLOR,
  accentRgb: '20,184,166',
};

const AGENTS_ORB_STYLE = {
  width: '600px',
  height: '600px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 65%)',
  filter: 'blur(60px)',
} as const;

const AGENTS_TITLE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
  color: '#f5f0e8',
  letterSpacing: '-0.02em',
} as const;

function getFlowTheme(flow: string): FlowTheme {
  return AGENT_FLOW_THEMES[flow] ?? DEFAULT_FLOW_THEME;
}

type AgentsSectionProps = {
  copy: HomeCopy;
  motionValues: HomePageMotion;
};

export function AgentsSection({ copy, motionValues }: AgentsSectionProps) {
  const { agentsRef, agentsOrbY, agentsOrbScale, agentsOrbRotate } = motionValues;

  return (
    <section
      ref={agentsRef}
      className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-12"
      style={{ background: 'linear-gradient(180deg, #08090f 0%, #050609 100%)' }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2"
        style={{
          ...AGENTS_ORB_STYLE,
          y: agentsOrbY,
          scale: agentsOrbScale,
          rotate: agentsOrbRotate,
        }}
      />

      <div className="mx-auto mb-20 max-w-7xl">
        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${SECTION_ACCENT_RGB},0.18), transparent)` }} />
      </div>

      <div className="mx-auto mb-16 max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="h-px w-6" style={SECTION_KICKER_LINE_STYLE} />
          <span className="text-[9px] font-medium uppercase tracking-[0.38em]" style={SECTION_KICKER_TEXT_STYLE}>
            Agents
          </span>
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.08, ease: SECTION_EASE }}
          className="max-w-2xl leading-[1.12]"
          style={AGENTS_TITLE_STYLE}
        >
          {copy.agentsTitle}
        </motion.h2>
      </div>

      <div className="mx-auto max-w-5xl grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {copy.agentCards.map((card, i) => {
          const { accentColor, accentRgb } = getFlowTheme(card.flow);
          const AgentIcon = agentIconList[i];
          const isLastAlone = i === copy.agentCards.length - 1 && !card.featured;

          return (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-48px' }}
              transition={{ duration: 0.72, delay: i * 0.08, ease: SECTION_EASE }}
              whileHover={{ y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
              className={`group relative flex flex-col overflow-hidden ${card.featured ? 'lg:col-span-2' : isLastAlone ? 'lg:col-start-2' : ''}`}
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
              <div
                className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: `linear-gradient(90deg, rgba(${accentRgb},0.8), rgba(${accentRgb},0.2))` }}
              />

              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
                style={{
                  background: `radial-gradient(circle at center, rgba(${accentRgb},0.13) 0%, transparent 65%)`,
                }}
              />

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

              <div className="relative flex flex-1 flex-col p-8 lg:p-9">
                <div className="mb-7 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[9px] font-semibold uppercase tracking-[0.3em]"
                    style={{
                      fontFamily: 'var(--font-label)',
                      background: `rgba(${accentRgb},0.08)`,
                      color: accentColor,
                      border: `1px solid rgba(${accentRgb},0.2)`,
                    }}
                  >
                    <span className="inline-block h-1 w-1 rounded-full" style={{ background: accentColor, opacity: 0.85 }} />
                    {card.flow}
                  </span>

                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `rgba(${accentRgb},0.07)`,
                      border: `1px solid rgba(${accentRgb},0.16)`,
                      boxShadow: `0 0 16px -4px rgba(${accentRgb},0.2)`,
                    }}
                  >
                    <AgentIcon size={card.featured ? 22 : 18} strokeWidth={1.5} style={{ color: accentColor, opacity: 0.9 }} aria-hidden="true" />
                  </div>
                </div>

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

                <div className="mb-5 h-px w-12 transition-all duration-400 group-hover:w-20" style={{ background: `rgba(${accentRgb},0.35)` }} />

                <p className="flex-1 text-sm leading-[1.9]" style={{ color: 'rgba(255,255,255,0.40)', fontWeight: 300, fontFamily: 'var(--font-sans)' }}>
                  {card.desc}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <Link
                    href={card.href}
                    className="group/link inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.22em]"
                    style={{
                      fontFamily: 'var(--font-label)',
                      color: `rgba(${accentRgb},0.55)`,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = `rgba(${accentRgb},0.55)`;
                    }}
                  >
                    <span style={{ borderBottom: `1px solid rgba(${accentRgb},0.3)`, paddingBottom: 1 }}>View agent</span>
                    <span className="translate-x-0 transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                  </Link>

                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.18)' }}>
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: `rgba(${accentRgb},0.5)` }} />
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
