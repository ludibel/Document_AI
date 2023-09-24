FROM node:lts-alpine AS node

RUN apk add --no-cache \
    libc6-compat\
    git \
    xvfb

WORKDIR /app

EXPOSE 3000

ENV PORT 3000