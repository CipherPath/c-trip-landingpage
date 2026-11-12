/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import appCss from '../styles/app.css?url'

/* Scales the 1440px desktop canvas to fit viewports between 1200px and 1440px (runs before first paint). */
const canvasZoomScript = `(function(){var d=document.documentElement;d.classList.add('js');function f(){var w=d.clientWidth;d.style.setProperty('--canvas-zoom',String(w>=1200&&w<1440?w/1440:1))}f();if(window.ResizeObserver){new ResizeObserver(f).observe(d)}else{addEventListener('resize',f)}})()`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'C-TRIP — Bilhetes de autocarro em Angola' },
      {
        name: 'description',
        content:
          'Compare horários e preços das transportadoras e compre o seu bilhete de autocarro interprovincial em Angola directamente no telemóvel.',
      },
      { name: 'theme-color', content: '#217d50' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'preload',
        as: 'image',
        href: '/assets/hero-bg-1920.jpg',
        imageSrcSet: '/assets/hero-bg-mobile.jpg 1280w, /assets/hero-bg-1920.jpg 1920w, /assets/hero-bg.jpg 2560w',
        imageSizes: '100vw',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-AO" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: canvasZoomScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
