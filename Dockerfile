# Multi-stage build for the CaMeL AI Nextra docs site
FROM registry.kr777.top/node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate
# pnpm-workspace.yaml + patches/ are required so `pnpm install` applies our
# nextra-theme-docs Layout-schema patch (see patches/ directory).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

FROM registry.kr777.top/node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM registry.kr777.top/node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
