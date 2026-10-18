// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://Roservicecare24x7.co.in',
  output: 'server', 
  adapter: vercel(),
  integrations: [
    react(),
    sitemap(),
  ],
  image: {
    domains: ['res.cloudinary.com', 'assets.mixkit.co', 'images.unsplash.com'],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      sourcemap: false,
    },
    server: {
      host: true,
    },
    ssr: {
      noExternal: ['lucide-react'],
    },
    optimizeDeps: {
      include: ['lucide-react'],
    },
  },
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'always' 
  },
  compressHTML: true,
});