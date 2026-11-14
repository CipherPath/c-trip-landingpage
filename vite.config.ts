import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    allowedHosts: ['jnzp1nziupmszvup39ymqms2.169.58.67.35.sslip.io'],
  },
  resolve: {
    tsconfigPaths: true,
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // Pre-bundle the animation libs up front so Vite never re-optimizes mid-session (duplicate React copies).
    include: ['gsap', 'gsap/ScrollTrigger', '@gsap/react', 'framer-motion'],
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
})