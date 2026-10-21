// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://Roservicecare24x7.co.in',
  
  // ✅ FIX: 'server' ki jagah 'static' kiya taaki pages pehle se build ho kar ready rahein (Turant Load)
  output: 'static', 
  adapter: vercel({
    imageService: true, // Vercel ki image optimization enable ki
  }),
  
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
    inlineStylesheets: 'always' // CSS ko HTML mein inline karega (Network request kam hogi)
  },
  compressHTML: true,
});