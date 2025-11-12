FROM node:22-alpine AS base
RUN npm install -g pnpm@10

FROM base AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/.output /app/.output

ENV NITRO_PORT=3000
ENV NODE_ENV=production
ENV NITRO_SEED_DATABASE=false

EXPOSE 3000

CMD ["node", "--max-http-header-size=32000", ".output/server/index.mjs"]
