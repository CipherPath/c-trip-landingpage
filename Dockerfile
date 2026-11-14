# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

# `vite preview` reads vite.config.ts (preview.allowedHosts, the TanStack Start plugin that serves the SSR
# build), and that plugin also resolves the app sources (src/router.tsx) when it starts. Copying only dist/
# made Vite start without any config: every host was blocked and the app was not served. So the runtime
# keeps the whole built project.
COPY --from=build --chown=node:node /app ./

USER node
EXPOSE 3000

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "3000", "--strictPort"]
