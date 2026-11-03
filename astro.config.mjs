// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio final do site. Ajuste aqui ou defina SITE_URL no ambiente de deploy.
const SITE_URL = process.env.SITE_URL ?? 'https://colegioexito.com.br';
// Subpasta (ex.: GitHub Pages sem domínio próprio usa "/ColegioExito"). Deixe vazio com domínio próprio.
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
