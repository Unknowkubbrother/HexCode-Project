# ใช้ Bun จาก oven (official image) ในขั้นตอนการ build
FROM oven/bun:latest AS builder

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ bun.lockb (ถ้ามี)
COPY package.json bun.lockb ./

# ติดตั้ง dependencies
RUN bun install

# คัดลอก source code
COPY . .

# Build แอปพลิเคชัน Next.js
RUN bun next build

# ใช้ stage ใหม่สำหรับ production
FROM oven/bun:latest AS runner

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ที่จำเป็นจาก builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# ตั้งค่า environment variable
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ARG CLERK_SECRET_KEY
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_SIGN_IN_URL}
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_SIGN_UP_URL}
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=${NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
ARG NEXT_PUBLIC_API_END_POINT
ENV NEXT_PUBLIC_API_END_POINT=${NEXT_PUBLIC_API_END_POINT}
ENV NODE_ENV=production
ENV PORT=3000

# เปิด port สำหรับแอปพลิเคชัน
EXPOSE 3000

# คำสั่งสำหรับรันแอปพลิเคชัน
CMD ["bun", "next", "start"]
