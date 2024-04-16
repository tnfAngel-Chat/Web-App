# Builder
FROM docker.io/imbios/bun-node:1.1-21-alpine AS builder

COPY . ./

RUN bun install --production --frozen-lockfile && \
    NEXT_OUTPUT=standalone bun run build

# Runner
FROM cgr.dev/chainguard/bun:latest
WORKDIR /home/nonroot

COPY --chown=nonroot --from=builder /home/bun/app/.next/standalone ./
COPY --chown=nonroot --from=builder /home/bun/app/.next/static ./.next/static
COPY --chown=nonroot --from=builder /home/bun/app/public ./public

EXPOSE 3000/tcp

CMD ["server.js"]