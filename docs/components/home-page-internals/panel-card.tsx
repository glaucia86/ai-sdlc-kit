import Link from 'next/link';
import { motion } from 'motion/react';

import type { PanelMeta } from './config';
import { SECTION_ACCENT_COLOR, SECTION_ACCENT_RGB, SECTION_EASE } from './section-styles';
import type { HomePanel } from './types';

type PanelCardProps = {
  panel: HomePanel;
  i: number;
  featured: boolean;
  meta: PanelMeta;
};

type PanelCardTone = {
  accentRgb: string;
  indexOpacity: string;
  linkBaseColor: string;
  linkHoverColor: string;
  cardStyle: {
    background: string;
    border: string;
    boxShadow: string;
  };
  topBarStyle: {
    width: string;
    background: string;
  };
  overlayStyle: {
    background: string;
  };
  iconWrapStyle: {
    background: string;
    border: string;
    boxShadow: string;
  };
  iconColor: string;
  pillStyle: {
    fontFamily: string;
    background: string;
    color: string;
    border: string;
  };
  pillDotColor: string;
  titleColor: string;
  separatorStyle: {
    width: string;
    background: string;
  };
  numberStroke: string;
  numberGradient: string;
  numberAnimation: string;
};

const FEATURED_PANEL_TONE: PanelCardTone = {
  accentRgb: SECTION_ACCENT_RGB,
  indexOpacity: '0.70',
  linkBaseColor: 'rgba(245,158,11,0.62)',
  linkHoverColor: SECTION_ACCENT_COLOR,
  cardStyle: {
    background: 'linear-gradient(158deg, rgba(245,158,11,0.11) 0%, rgba(6,7,10,0.97) 55%)',
    border: '1px solid rgba(245,158,11,0.30)',
    boxShadow: '0 -24px 80px -20px rgba(245,158,11,0.11), inset 0 1px 0 rgba(245,158,11,0.07)',
  },
  topBarStyle: {
    width: '100%',
    background: `linear-gradient(90deg, ${SECTION_ACCENT_COLOR} 0%, rgba(245,158,11,0.25) 100%)`,
  },
  overlayStyle: {
    background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.11) 0%, transparent 60%)',
  },
  iconWrapStyle: {
    background: 'rgba(245,158,11,0.09)',
    border: '1px solid rgba(245,158,11,0.28)',
    boxShadow: '0 0 24px -6px rgba(245,158,11,0.42)',
  },
  iconColor: SECTION_ACCENT_COLOR,
  pillStyle: {
    fontFamily: 'var(--font-label)',
    background: 'rgba(245,158,11,0.07)',
    color: 'rgba(245,158,11,0.72)',
    border: '1px solid rgba(245,158,11,0.17)',
  },
  pillDotColor: SECTION_ACCENT_COLOR,
  titleColor: '#F5ECB8',
  separatorStyle: {
    width: '56px',
    background: 'linear-gradient(90deg, rgba(245,158,11,0.65) 0%, rgba(245,158,11,0.18) 100%)',
  },
  numberStroke: '1.5px rgba(245,158,11,0.30)',
  numberGradient:
    'linear-gradient(105deg, rgba(245,158,11,0.04) 0%, rgba(245,158,11,0.14) 25%, rgba(245,178,40,0.78) 50%, rgba(245,158,11,0.14) 75%, rgba(245,158,11,0.04) 100%)',
  numberAnimation: 'panelNumSweep 3.6s linear infinite, panelNumPulse 3.6s ease-in-out infinite',
};

const DEFAULT_PANEL_TONE: PanelCardTone = {
  accentRgb: '255,255,255',
  indexOpacity: '0.26',
  linkBaseColor: 'rgba(255,255,255,0.32)',
  linkHoverColor: 'rgba(255,255,255,0.68)',
  cardStyle: {
    background: 'rgba(255,255,255,0.024)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
  },
  topBarStyle: {
    width: '48%',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.22) 0%, transparent 100%)',
  },
  overlayStyle: {
    background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 56%)',
  },
  iconWrapStyle: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'none',
  },
  iconColor: 'rgba(255,255,255,0.48)',
  pillStyle: {
    fontFamily: 'var(--font-label)',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.26)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  pillDotColor: 'rgba(255,255,255,0.3)',
  titleColor: '#f0ece4',
  separatorStyle: {
    width: '36px',
    background: 'rgba(255,255,255,0.13)',
  },
  numberStroke: '1px rgba(255,255,255,0.11)',
  numberGradient:
    'linear-gradient(105deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.01) 100%)',
  numberAnimation: '',
};

const PANEL_TITLE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(1.3rem, 2.4vw, 1.72rem)',
  letterSpacing: '-0.015em',
} as const;

const PANEL_DESCRIPTION_STYLE = {
  color: 'rgba(255,255,255,0.40)',
  fontWeight: 300,
  fontFamily: 'var(--font-sans)',
} as const;

const PANEL_LINK_STYLE = {
  fontFamily: 'var(--font-label)',
  transition: 'color 0.2s ease',
} as const;

const PANEL_NOISE_OVERLAY_STYLE = {
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.72\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
  backgroundRepeat: 'repeat',
  backgroundSize: '180px 180px',
  mixBlendMode: 'overlay',
} as const;

const PANEL_NUMBER_STYLE = {
  WebkitTextFillColor: 'transparent',
  backgroundSize: '300% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
} as const;

export function PanelCard({ panel, i, featured, meta }: PanelCardProps) {
  const { Icon, category } = meta;
  const tone = featured ? FEATURED_PANEL_TONE : DEFAULT_PANEL_TONE;
  const numberAnimation = featured
    ? tone.numberAnimation
    : `panelNumSweep ${5.8 + i * 0.9}s linear infinite`;

  return (
    <motion.article
      key={panel.title}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.75, delay: i * 0.13, ease: SECTION_EASE }}
      className="relative flex flex-col overflow-hidden"
      style={tone.cardStyle}
    >
      <div
        className="absolute left-0 top-0 h-[2px]"
        style={tone.topBarStyle}
      />

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={tone.overlayStyle}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          ...PANEL_NOISE_OVERLAY_STYLE,
          opacity: featured ? 0.1 : 0.07,
        }}
      />

      <div className="relative flex flex-1 flex-col p-8 lg:p-10">
        <div className="mb-8 flex items-start justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.44em]"
            style={{
              fontFamily: 'var(--font-label)',
              color: `rgba(${tone.accentRgb},${tone.indexOpacity})`,
              animation: `panelIdxPop 0.55s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i * 0.13}s both`,
              display: 'inline-block',
            }}
          >
            {`0${i + 1}`}
          </span>

          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={tone.iconWrapStyle}
          >
            <Icon
              size={22}
              strokeWidth={1.4}
              style={{ color: tone.iconColor }}
              aria-hidden="true"
            />
          </div>
        </div>

        <span
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-[4px] text-[8px] font-medium uppercase tracking-[0.34em]"
          style={tone.pillStyle}
        >
          <span
            className="inline-block h-[5px] w-[5px] rounded-full"
            style={{ background: tone.pillDotColor }}
          />
          {category}
        </span>

        <h2
          className="mb-4 leading-[1.12]"
          style={{ ...PANEL_TITLE_STYLE, color: tone.titleColor }}
        >
          {panel.title}
        </h2>

        <div
          className="mb-5 h-px"
          style={tone.separatorStyle}
        />

        <p
          className="flex-1 text-sm leading-[1.9]"
          style={PANEL_DESCRIPTION_STYLE}
        >
          {panel.text}
        </p>

        <div className="mt-8">
          <Link
            href={panel.href}
            className="group/link inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em]"
            style={{
              ...PANEL_LINK_STYLE,
              color: tone.linkBaseColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = tone.linkHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = tone.linkBaseColor;
            }}
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 -right-1 select-none overflow-hidden leading-none"
        style={{
          height: '9rem',
          fontFamily: 'var(--font-label)',
          fontSize: '9rem',
          fontWeight: 700,
          letterSpacing: '-0.05em',
        }}
      >
        <motion.span
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.14, ease: SECTION_EASE }}
          className="inline-block"
          style={{
            ...PANEL_NUMBER_STYLE,
            WebkitTextStroke: tone.numberStroke,
            backgroundImage: tone.numberGradient,
            animation: numberAnimation,
          }}
        >
          {`0${i + 1}`}
        </motion.span>
      </div>
    </motion.article>
  );
}
