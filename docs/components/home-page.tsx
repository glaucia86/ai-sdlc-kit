'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

import { content } from '@/components/home-page-internals/content';
import { useHomePageMotion } from '@/components/home-page-internals/hooks';
import { AgentsSection } from '@/components/home-page-internals/sections/agents-section';
import { CtaSection } from '@/components/home-page-internals/sections/cta-section';
import { FooterSection } from '@/components/home-page-internals/sections/footer-section';
import { HeroSection } from '@/components/home-page-internals/sections/hero-section';
import { PanelsSection } from '@/components/home-page-internals/sections/panels-section';
import { WorkflowSection } from '@/components/home-page-internals/sections/workflow-section';
import { SECTION_ACCENT_COLOR, SECTION_SECONDARY_COLOR } from '@/components/home-page-internals/section-styles';
import type { HomeLocale } from '@/lib/locale';

export type { HomeLocale };

const HOME_PAGE_STYLE = {
  background: '#050609',
  fontFamily: 'var(--font-sans)',
} as const;

const HOME_PROGRESS_BAR_STYLE = {
  background: `linear-gradient(90deg, ${SECTION_ACCENT_COLOR} 0%, ${SECTION_SECONDARY_COLOR} 100%)`,
  boxShadow: '0 0 8px rgba(245,158,11,0.7)',
} as const;

export function HomePage({ locale }: { locale: HomeLocale }) {
  const copy = content[locale];
  const router = useRouter();
  const motionValues = useHomePageMotion();

  const handleLocaleChange = (nextLocale: HomeLocale) => {
    router.push(nextLocale === 'en' ? '/' : `/${nextLocale}`);
  };

  return (
    <div
      className="overflow-x-hidden text-white"
      style={HOME_PAGE_STYLE}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] w-full origin-left"
        style={{
          scaleX: motionValues.progressBarScaleX,
          skewX: motionValues.velocitySkewX,
          ...HOME_PROGRESS_BAR_STYLE,
        }}
      />

      <HeroSection
        locale={locale}
        copy={copy}
        motionValues={motionValues}
        onLocaleChange={handleLocaleChange}
      />
      <PanelsSection copy={copy} motionValues={motionValues} />
      <WorkflowSection copy={copy} motionValues={motionValues} />
      <AgentsSection copy={copy} motionValues={motionValues} />
      <CtaSection locale={locale} copy={copy} motionValues={motionValues} />
      <FooterSection locale={locale} copy={copy} />
    </div>
  );
}
