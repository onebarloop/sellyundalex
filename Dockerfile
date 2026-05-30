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

# 2. Quellcode bauen & Skript bündeln
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# =========================================================================
# DER TRICK: Wir nutzen "esbuild" (wird von Next.js mitgeliefert) oder npx,
# um dein run-init.ts und ALLE seine Abhängigkeiten (drizzle, pg, bcrypt)
# in eine EINZIGE, autarke JavaScript-Datei zu kompilieren.
# =========================================================================
RUN npx esbuild src/db/run-init.ts --bundle --platform=node --target=node20 --outfile=dist/run-init.js

# Next.js sammelt anonyme Telemetriedaten während des Builds
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

# =========================================================================
# Kopiere das fertige Bundle. Diese Datei hat KEINE Abhängigkeiten mehr!
# =========================================================================
COPY --from=builder --chown=nextjs:nodejs /app/dist/run-init.js ./run-init.js

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Führt erst dein gebündeltes Skript aus, dann den Webserver
CMD ["sh", "-c", "node run-init.js && node server.js"]
