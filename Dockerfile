FROM node:18.14.2-alpine3.17
ARG NODE_ENV
ARG PORT=3333

WORKDIR /app

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nestjs -u 1001

COPY dist/ ./dist
COPY package*.json ./
COPY prisma/ ./prisma

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV HUSKY_SKIP_INSTALL=1

RUN npm ci --prod \
    && rm -Rf ~/.cache ~/.npm \
    && npm run prisma
RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]
