import { HomePage } from '@/components/home-page';
import { isHomeLocale } from '@/lib/locale';
import { notFound } from 'next/navigation';
import { i18n } from '@/lib/i18n';

export function generateStaticParams() {
  return i18n.languages
    .filter((lang) => lang !== i18n.defaultLanguage)
    .map((lang) => ({ lang }));
}

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isHomeLocale(lang)) {
    notFound();
  }

  return <HomePage locale={lang} />;
}
