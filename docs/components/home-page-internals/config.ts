import {
  Telescope,
  ScrollText,
  GitBranch,
  Network,
  Inbox,
  Map,
  Compass,
  FileText,
  ClipboardList,
  Layers,
  Code2,
  Rocket,
  Route,
  ShieldCheck,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';

export const agentIconList: LucideIcon[] = [
  Telescope,
  ScrollText,
  GitBranch,
  Network,
  Inbox,
  Map,
];

export const stepIconList: LucideIcon[] = [
  Compass,
  FileText,
  ClipboardList,
  Layers,
  Code2,
  Rocket,
];

export const pipelineColors = [
  { color: '#F59E0B', rgb: '245,158,11' },
  { color: '#F97316', rgb: '249,115,22' },
  { color: '#EAB308', rgb: '234,179,8' },
  { color: '#10B981', rgb: '16,185,129' },
  { color: '#14B8A6', rgb: '20,184,166' },
  { color: '#06B6D4', rgb: '6,182,212' },
] as const;

export type PanelMeta = {
  Icon: LucideIcon;
  category: string;
};

export const panelMeta: PanelMeta[] = [
  { Icon: Route, category: 'Foundation' },
  { Icon: ShieldCheck, category: 'Governance' },
  { Icon: BookOpen, category: 'Reference' },
];
