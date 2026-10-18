// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.roservicesupport.co.in',
  output: 'static',

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

  compressHTML: true,
});