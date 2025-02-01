# syntax=docker/dockerfile:1

ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

FROM base as deps

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

FROM base as build

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM base as final

ENV NODE_ENV=production

USER node

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY package.json .

EXPOSE 3000

CMD ["node", "dist/main"]