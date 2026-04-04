import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

import type { HomeLocale } from '@/lib/locale';

import { SECTION_ACCENT_RGB, SECTION_KICKER_TEXT_STYLE, SECTION_META_LABEL_STYLE, SECTION_MUTED_LINK_STYLE } from '../section-styles';
import type { HomeCopy } from '../types';

type FooterLink = {
  label: string;
  path: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const FOOTER_BRAND_STYLE = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.15rem',
  letterSpacing: '-0.02em',
  color: '#f5f0e8',
  fontWeight: 400,
} as const;

const FOOTER_TAGLINE_STYLE = {
  color: 'rgba(255,255,255,0.36)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 300,
} as const;

const FOOTER_COLUMN_TITLE_STYLE = {
  ...SECTION_KICKER_TEXT_STYLE,
  opacity: 0.7,
} as const;

const FOOTER_LINK_STYLE = {
  ...SECTION_MUTED_LINK_STYLE,
} as const;

const FOOTER_META_TEXT_STYLE = {
  ...SECTION_META_LABEL_STYLE,
} as const;

function getFooterColumns(copy: HomeCopy): FooterColumn[] {
  return [
    {
      title: copy.footer.colGetStarted,
      links: [
        { label: 'How it works', path: 'get-started/how-it-works' },
        { label: 'Installation', path: 'get-started/installation' },
        { label: 'Quick start', path: 'get-started/quick-start' },
      ],
    },
    {
      title: copy.footer.colGuide,
      links: [
        { label: 'Discovery phase', path: 'guide/discovery-phase' },
        { label: 'HITL checkpoints', path: 'guide/hil-checkpoints' },
        { label: 'Spec phase', path: 'guide/spec-phase' },
        { label: 'Epic phase', path: 'guide/epic-phase' },
        { label: 'Operations', path: 'guide/operations-phase' },
      ],
    },
    {
      title: copy.footer.colReference,
      links: [
        { label: 'Agents', path: 'reference/agents' },
        { label: 'Prompts', path: 'reference/prompts' },
        { label: 'Templates', path: 'reference/templates' },
        { label: 'Artifacts', path: 'reference/artifacts' },
      ],
    },
  ];
}

type FooterSectionProps = {
  locale: HomeLocale;
  copy: HomeCopy;
};

export function FooterSection({ locale, copy }: FooterSectionProps) {
  const footerColumns = getFooterColumns(copy);

  return (
    <footer style={{ background: '#020305', borderTop: `1px solid rgba(${SECTION_ACCENT_RGB},0.14)` }}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span style={FOOTER_BRAND_STYLE}>
                AI SDLC Kit
              </span>
            </div>
            <p
              className="mb-6 text-xs leading-[1.8]"
              style={FOOTER_TAGLINE_STYLE}
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

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.38em]" style={FOOTER_COLUMN_TITLE_STYLE}>
                {column.title}
              </p>
              <ul className="space-y-3">
                {column.links.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      href={`/${locale}/${path}`}
                      className="text-xs transition-colors hover:text-white"
                      style={FOOTER_LINK_STYLE}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-5 sm:px-10 lg:px-12" style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}>
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[10px] uppercase tracking-[0.24em]" style={FOOTER_META_TEXT_STYLE}>
            {copy.footer.copyright}
          </p>
          <a
            href="https://github.com/glaucia86/ai-sdlc-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-amber-400"
            style={FOOTER_META_TEXT_STYLE}
          >
            <Github size={11} strokeWidth={1.5} aria-hidden="true" />
            glaucia86/ai-sdlc-kit
          </a>
        </div>
      </div>
    </footer>
  );
}
