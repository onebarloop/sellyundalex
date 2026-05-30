FROM node:20-alpine AS base

# 1. Abhängigkeiten installieren
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* bun.lockb* ./
RUN \
  if [ -f package-lock.json ]; then npm install; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f bun.lockb ]; then corepack enable bun && bun install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Quellcode bauen
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js sammelt anonyme Telemetriedaten während des Builds (optional deaktivieren)
ENV NEXT_TELEMETRY_DISABLED=0

RUN \
  if [ -f package-lock.json ]; then npm run build; \
  elif [ -f yarn.lock ]; then yarn build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  elif [ -f bun.lockb ]; then corepack enable bun && bun run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. Produktions-Image erstellen
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatisch erstellte Standalone-Ordner nutzen
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
