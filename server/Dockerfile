FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY lib lib
COPY tsconfig.json .

RUN mkdir -p uploads/problems
RUN pwd

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 4000