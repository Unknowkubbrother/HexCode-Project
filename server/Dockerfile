FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY lib lib
COPY tsconfig.json .

# Environment variables
ARG SERVER_PORT
ENV SERVER_PORT=${SERVER_PORT}
ARG MONGODB_URL
ENV MONGODB_URL=${MONGODB_URL}
ARG DOMAIN
ENV DOMAIN=${DOMAIN}
ARG CLERK_PUBLISHABLE_KEY
ENV CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}
ARG CLERK_SECRET_KEY
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

RUN mkdir -p uploads/problems
RUN pwd

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 4000