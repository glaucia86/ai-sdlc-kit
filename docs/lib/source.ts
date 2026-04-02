import { docs } from 'collections/index';
import { loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n';

export const source = loader({
  baseUrl: '/',
  i18n,
  source: docs.toFumadocsSource(),
});
