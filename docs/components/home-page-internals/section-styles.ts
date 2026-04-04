export const SECTION_ACCENT_COLOR = '#F59E0B';
export const SECTION_ACCENT_RGB = '245,158,11';
export const SECTION_SECONDARY_COLOR = '#14B8A6';

export const SECTION_EASE = [0.22, 1, 0.36, 1] as const;

export const SECTION_KICKER_LINE_STYLE = {
  background: SECTION_ACCENT_COLOR,
  opacity: 0.6,
} as const;

export const SECTION_KICKER_TEXT_STYLE = {
  color: SECTION_ACCENT_COLOR,
  opacity: 0.75,
  fontFamily: 'var(--font-label)',
} as const;

export const SECTION_MUTED_LINK_STYLE = {
  color: 'rgba(255,255,255,0.38)',
  fontFamily: 'var(--font-sans)',
} as const;

export const SECTION_META_LABEL_STYLE = {
  color: 'rgba(255,255,255,0.22)',
  fontFamily: 'var(--font-label)',
} as const;
