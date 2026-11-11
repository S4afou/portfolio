import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL is the only deployment-specific value. Set it when a domain exists.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://safouane-medjahri.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
