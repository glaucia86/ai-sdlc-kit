import type { HomeLocale } from '@/lib/locale';

export type HomeHighlight = {
  value: string;
  label: string;
};

export type HomePanel = {
  title: string;
  text: string;
  href: string;
  linkLabel: string;
};

export type HomeStep = {
  num: string;
  phase: string;
  desc: string;
};

export type HomeAgentCard = {
  tag: string;
  name: string;
  desc: string;
  flow: string;
  href: string;
  featured?: boolean;
};

export type HomeFooter = {
  tagline: string;
  colGetStarted: string;
  colGuide: string;
  colReference: string;
  copyright: string;
};

export type HomeCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  languageLabel: string;
  highlights: HomeHighlight[];
  panels: HomePanel[];
  workflowTitle: string;
  steps: HomeStep[];
  agentsTitle: string;
  agentCards: HomeAgentCard[];
  ctaTitle: string;
  ctaBody: string;
  ctaCta: string;
  footer: HomeFooter;
};

export type HomeContent = Record<HomeLocale, HomeCopy>;
