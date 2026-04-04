import { docs } from 'collections/index';
import { loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n';

type FumadocsSource = ReturnType<typeof docs.toFumadocsSource>;
type CompatibleSource = FumadocsSource | { files: FumadocsSource['files'] | (() => FumadocsSource['files']) };

const rawSource = docs.toFumadocsSource() as CompatibleSource;

export const source = loader({
  baseUrl: '/',
  i18n,
  source: {
    files: typeof rawSource.files === 'function' ? rawSource.files() : rawSource.files,
  },
});
