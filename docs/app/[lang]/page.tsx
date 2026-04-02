import { HomePage, isHomeLocale } from '@/components/home-page';
import { notFound } from 'next/navigation';

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
