import type { CSSProperties, ComponentProps } from 'react';
import { motion } from 'motion/react';

import { panelMeta } from '../config';
import type { HomePageMotion } from '../hooks';
import { PanelCard } from '../panel-card';
import { SECTION_ACCENT_COLOR, SECTION_ACCENT_RGB, SECTION_EASE, SECTION_KICKER_LINE_STYLE, SECTION_KICKER_TEXT_STYLE } from '../section-styles';
import type { HomeCopy } from '../types';
const FEATURED_PANEL_INDEX = 1;

const PANELS_SECTION_STYLE = {
  background: 'linear-gradient(180deg, #050609 0%, #07080d 100%)',
} as const;

const PANELS_DIVIDER_STYLE = {
  background: `linear-gradient(90deg, transparent, rgba(${SECTION_ACCENT_RGB},0.22), transparent)`,
} as const;

const PANELS_TITLE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)',
  color: '#f5f0e8',
  letterSpacing: '-0.025em',
} as const;

const PANELS_WATERMARK_STYLE = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(12rem, 26vw, 26rem)',
  color: 'rgba(255,255,255,0.014)',
  letterSpacing: '-0.06em',
  fontWeight: 400,
  lineHeight: 0.88,
  zIndex: 0,
} as const;

const PANELS_EM_STYLE = {
  fontStyle: 'italic',
  background: `linear-gradient(105deg, #F5ECB8 0%, ${SECTION_ACCENT_COLOR} 48%, #FDE68A 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const ORB_A_CONTAINER_STYLE = {
  bottom: '-80px',
  left: '-60px',
  width: '520px',
  height: '520px',
  borderRadius: '50%',
  zIndex: 0,
} as const;

const ORB_A_GLOW_STYLE = {
  background: 'radial-gradient(circle, rgba(245,158,11,0.26) 0%, transparent 68%)',
  filter: 'blur(50px)',
} as const;

const ORB_B_CONTAINER_STYLE = {
  top: '-60px',
  right: '-80px',
  width: '440px',
  height: '440px',
  borderRadius: '50%',
  zIndex: 0,
} as const;

const ORB_B_GLOW_STYLE = {
  background: 'radial-gradient(circle, rgba(20,184,166,0.20) 0%, transparent 68%)',
  filter: 'blur(55px)',
} as const;

const ORB_C_CONTAINER_STYLE = {
  top: '30%',
  left: '38%',
  width: '360px',
  height: '360px',
  borderRadius: '50%',
  zIndex: 0,
} as const;

const ORB_C_GLOW_STYLE = {
  background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 68%)',
  filter: 'blur(70px)',
} as const;

type MotionDivStyle = ComponentProps<typeof motion.div>['style'];

type OrbGlowProps = {
  containerStyle: MotionDivStyle;
  glowStyle: CSSProperties;
  animation: string;
};

type OrbGlowConfig = {
  key: string;
  containerStyle: MotionDivStyle;
  glowStyle: CSSProperties;
  animation: string;
};

function OrbGlow({ containerStyle, glowStyle, animation }: OrbGlowProps) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={containerStyle}
    >
      <div
        className="h-full w-full rounded-full"
        style={{ ...glowStyle, animation }}
      />
    </motion.div>
  );
}

type PanelsSectionProps = {
  copy: HomeCopy;
  motionValues: HomePageMotion;
};

export function PanelsSection({ copy, motionValues }: PanelsSectionProps) {
  const {
    panelsRef,
    panelsOrbAY,
    panelsOrbAScale,
    panelsOrbBY,
    panelsOrbBX,
    panelsOrbBScale,
    panelsOrbCY,
    panelsKitY,
    kitX,
    kitRotate,
  } = motionValues;

  const orbGlows: OrbGlowConfig[] = [
    {
      key: 'orb-a',
      containerStyle: { ...ORB_A_CONTAINER_STYLE, y: panelsOrbAY, scale: panelsOrbAScale },
      glowStyle: ORB_A_GLOW_STYLE,
      animation: 'auroraDrift0 22s ease-in-out infinite',
    },
    {
      key: 'orb-b',
      containerStyle: { ...ORB_B_CONTAINER_STYLE, y: panelsOrbBY, x: panelsOrbBX, scale: panelsOrbBScale },
      glowStyle: ORB_B_GLOW_STYLE,
      animation: 'auroraDrift1 28s ease-in-out infinite',
    },
    {
      key: 'orb-c',
      containerStyle: { ...ORB_C_CONTAINER_STYLE, y: panelsOrbCY },
      glowStyle: ORB_C_GLOW_STYLE,
      animation: 'auroraDrift2 35s ease-in-out infinite',
    },
  ];

  return (
    <section
      ref={panelsRef}
      className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-12"
      style={PANELS_SECTION_STYLE}
    >
      {orbGlows.map((orb) => (
        <OrbGlow
          key={orb.key}
          containerStyle={orb.containerStyle}
          glowStyle={orb.glowStyle}
          animation={orb.animation}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-0 select-none overflow-hidden leading-none"
        style={{
          ...PANELS_WATERMARK_STYLE,
          y: panelsKitY,
          x: kitX,
          rotate: kitRotate,
        }}
      >
        Kit
      </motion.div>

      <div className="relative" style={{ zIndex: 1 }}>
        <div className="mx-auto mb-16 max-w-7xl">
          <div className="h-px" style={PANELS_DIVIDER_STYLE} />
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
              Core Capabilities
            </span>
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: 0.08, ease: SECTION_EASE }}
            className="max-w-lg leading-[1.1]"
            style={PANELS_TITLE_STYLE}
          >
            Built different,<br />
            <em style={PANELS_EM_STYLE}>
              by design.
            </em>
          </motion.h2>
        </div>

        <div className="mx-auto max-w-7xl grid gap-5 md:grid-cols-3 items-start">
          {copy.panels.map((panel, i) => (
            <PanelCard key={panel.title} panel={panel} i={i} featured={i === FEATURED_PANEL_INDEX} meta={panelMeta[i]!} />
          ))}
        </div>
      </div>
    </section>
  );
}
