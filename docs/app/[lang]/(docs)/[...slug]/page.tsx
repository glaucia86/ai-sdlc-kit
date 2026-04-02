import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/page';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Params {
  lang: string;
  slug: string[];
}

export default async function DocsPageRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  // Build params manually from source to avoid potential issues with generateParams()
  const langs = ['en', 'pt', 'es'];
  const slugPaths = [
    ['get-started', 'installation'],
    ['get-started', 'quick-start'],
    ['get-started', 'how-it-works'],
    ['guide', 'discovery-phase'],
    ['guide', 'spec-phase'],
    ['guide', 'epic-phase'],
    ['guide', 'operations-phase'],
    ['guide', 'hil-checkpoints'],
    ['reference', 'agents'],
    ['reference', 'prompts'],
    ['reference', 'templates'],
    ['reference', 'artifacts'],
    ['concepts', 'ai-sdlc'],
    ['concepts', 'sdd'],
    ['concepts', 'hil'],
    ['concepts', 'context-memory'],
    ['scenarios', 'new-project'],
    ['scenarios', 'existing-project'],
    ['scenarios', 'solo-dev'],
  ];
  return langs.flatMap((lang) => slugPaths.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = source.getPage(slug, lang);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
