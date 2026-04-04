import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default async function DocsRootLayout({
  params,
  cHITLdren,
}: {
  params: Promise<{ lang: string }>;
  cHITLdren: ReactNode;
}) {
  const { lang } = await params;

  return (
    <DocsLayout
      tree={source.getPageTree(lang)}
      {...baseOptions(lang)}
    >
      {cHITLdren}
    </DocsLayout>
  );
}
