
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['.sslip.io'],
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  resolve: {
    tsconfigPaths: true,
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'gsap',
      'gsap/ScrollTrigger',
      '@gsap/react',
      'framer-motion',
    ],
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})
