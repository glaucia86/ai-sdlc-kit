import { motion } from 'motion/react';

import { pipelineColors, stepIconList } from '../config';
import type { HomePageMotion } from '../hooks';
import { SECTION_EASE, SECTION_KICKER_LINE_STYLE, SECTION_KICKER_TEXT_STYLE } from '../section-styles';
import type { HomeCopy } from '../types';

const WORKFLOW_ROWS = [
  {
    start: 0,
    end: 3,
    offset: 0,
    lineGrad: 'linear-gradient(90deg,#F59E0B 0%,#F97316 50%,#EAB308 100%)',
    rowDelay: 0,
  },
  {
    start: 3,
    end: 6,
    offset: 3,
    lineGrad: 'linear-gradient(90deg,#10B981 0%,#14B8A6 50%,#06B6D4 100%)',
    rowDelay: 0.18,
  },
] as const;

const MOBILE_SPINE_STYLE = {
  background: 'linear-gradient(180deg,#F59E0B 0%,#F97316 20%,#EAB308 37%,#10B981 60%,#14B8A6 80%,#06B6D4 100%)',
} as const;

const WORKFLOW_TITLE_STYLE = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
  color: '#f5f0e8',
  letterSpacing: '-0.02em',
  whiteSpace: 'pre-line',
} as const;

type WorkflowSectionProps = {
  copy: HomeCopy;
  motionValues: HomePageMotion;
};

export function WorkflowSection({ copy, motionValues }: WorkflowSectionProps) {
  const { workflowRef, workflowGlow1Y, workflowGlow1X, workflowGlow2Y, workflowGlow2X } = motionValues;

  return (
    <section ref={workflowRef} className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-12" style={{ background: '#07080d' }}>
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-[580px] w-[580px]"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(245,158,11,0.065) 0%, transparent 58%)', y: workflowGlow1Y, x: workflowGlow1X }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[580px] w-[580px]"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at bottom right, rgba(6,182,212,0.065) 0%, transparent 58%)', y: workflowGlow2Y, x: workflowGlow2X }}
      />

      <div className="relative mx-auto mb-20 max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: SECTION_EASE }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="h-px w-6" style={SECTION_KICKER_LINE_STYLE} />
          <span className="text-[9px] font-medium uppercase tracking-[0.38em]" style={SECTION_KICKER_TEXT_STYLE}>
            Pipeline
          </span>
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.08, ease: SECTION_EASE }}
          className="max-w-2xl leading-[1.12]"
          style={WORKFLOW_TITLE_STYLE}
        >
          {copy.workflowTitle}
        </motion.h2>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="hidden lg:block space-y-16">
          {WORKFLOW_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="relative grid grid-cols-3 gap-6">
              <motion.div
                className="pointer-events-none absolute left-[16.667%] right-[16.667%] top-8 h-px -translate-y-1/2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.1, delay: row.rowDelay, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'left center', background: row.lineGrad }}
              />

              {copy.steps.slice(row.start, row.end).map((step, j) => {
                const c = pipelineColors[row.offset + j];
                const StepIcon = stepIconList[row.offset + j];
                return (
                  <motion.div
                    key={step.num}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: row.rowDelay + 0.32 + j * 0.11, ease: SECTION_EASE }}
                  >
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

                    <div className="h-7 w-px" style={{ background: `linear-gradient(180deg, rgba(${c.rgb},0.45) 0%, transparent 100%)` }} />

                    <div
                      className="group/card relative w-full overflow-hidden p-6 transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]"
                      style={{
                        background: `linear-gradient(148deg, rgba(${c.rgb},0.08) 0%, rgba(7,8,13,0.98) 58%)`,
                        border: `1px solid rgba(${c.rgb},0.13)`,
                        borderTop: `2px solid rgba(${c.rgb},0.5)`,
                      }}
                    >
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

                      <span className="mb-3 block text-[9px] font-medium uppercase tracking-[0.32em]" style={{ color: c.color, opacity: 0.72, fontFamily: 'var(--font-label)' }}>
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
                      <div className="mb-4 h-px w-7 transition-all duration-300 group-hover/card:w-14" style={{ background: `rgba(${c.rgb},0.55)` }} />
                      <p className="text-[0.79rem] leading-[1.85]" style={{ color: 'rgba(255,255,255,0.37)', fontWeight: 300 }}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="relative lg:hidden">
          <div
            className="absolute bottom-0 left-5 top-0 w-px"
            style={MOBILE_SPINE_STYLE}
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
                  transition={{ duration: 0.55, delay: i * 0.07, ease: SECTION_EASE }}
                >
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

                  <div
                    className="flex-1 p-5"
                    style={{
                      background: `rgba(${c.rgb},0.042)`,
                      border: `1px solid rgba(${c.rgb},0.11)`,
                      borderLeft: `2px solid rgba(${c.rgb},0.42)`,
                    }}
                  >
                    <span className="mb-2 block text-[9px] uppercase tracking-[0.3em]" style={{ color: c.color, opacity: 0.68, fontFamily: 'var(--font-label)' }}>
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
                    <p className="text-sm leading-[1.75]" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
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
  );
}
