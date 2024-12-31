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
ENV NODE_ENV=production
ENV PORT=3000

# เปิด port สำหรับแอปพลิเคชัน
EXPOSE 3000

# คำสั่งสำหรับรันแอปพลิเคชัน
CMD ["bun", "next", "start"]
