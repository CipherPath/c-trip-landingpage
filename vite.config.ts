import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

/*
 * Vercel sets VERCEL=1 during its builds. There, Nitro (TanStack Start's documented route to Vercel) detects
 * the platform and writes the Vercel Build Output (.vercel/output). Elsewhere (Coolify's Docker image, which
 * runs `vite preview`) the build stays the plain TanStack Start output in dist/.
 */
const onVercel = !!process.env.VERCEL

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
    include: ['gsap', 'gsap/ScrollTrigger', '@gsap/react', 'framer-motion'],
  },
  plugins: [tailwindcss(), tanstackStart(), ...(onVercel ? [nitro()] : []), viteReact()],
})
