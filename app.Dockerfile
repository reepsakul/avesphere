FROM node:22.13.1-alpine3.21 AS builder
WORKDIR /app
RUN corepack enable
COPY ./package*.json . 
RUN pnpm install
COPY . /app/
RUN pnpm build
RUN pnpm prune --production

FROM node:22.13.1-alpine3.21
WORKDIR /app
COPY . /app/
COPY --from=builder /app/build/ ./build/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
ENTRYPOINT [ "node", "/app/build" ]
