import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://abtpaper.com',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
