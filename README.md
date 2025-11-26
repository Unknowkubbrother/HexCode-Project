# HexCode Project

**HexCode** คือแพลตฟอร์มสำหรับฝึกเขียนโปรแกรม (Online Judge) ที่ออกแบบมาเพื่อให้นักพัฒนาและผู้ที่สนใจสามารถเข้ามาฝึกฝนทักษะการเขียนโค้ด ผ่านโจทย์ปัญหาต่างๆ พร้อมระบบตรวจโค้ดอัตโนมัติที่รวดเร็วและแม่นยำ

## 🚀 ฟีเจอร์หลัก (Key Features)

- **ระบบโจทย์ปัญหา (Problem System)**: รวบรวมโจทย์เขียนโปรแกรมหลากหลายระดับความยาก พร้อมคำอธิบายและตัวอย่าง
- **Online Compiler & Judge**: เขียนและรันโค้ดได้ทันทีบนหน้าเว็บ รองรับหลายภาษา (ผ่าน Judge0)
- **ระบบสมาชิก (User Accounts)**: สมัครสมาชิกและเข้าสู่ระบบผ่าน Clerk เพื่อบันทึกสถิติการใช้งาน
- **Profile & Statistics**: หน้าโปรไฟล์แสดงประวัติการส่งงาน (Submission History) และสถิติความสำเร็จ
- **Challenges**: ระบบการแข่งขันหรือโจทย์ท้าทายความสามารถ
- **Modern UI/UX**: ออกแบบด้วยดีไซน์ที่ทันสมัย ใช้งานง่าย พร้อม Dark Mode

## 🛠️ Tech Stack

โปรเจกต์นี้พัฒนาด้วยเทคโนโลยีที่ทันสมัย (Modern Web Technologies):

### Frontend (Client)
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Radix UI, Framer Motion
- **Code Editor**: CodeMirror / React CodeMirror
- **Authentication**: Clerk

### Backend (Server)
- **Framework**: [ElysiaJS](https://elysiajs.com/)
- **Runtime**: [Bun](https://bun.sh/)
- **Database**: MongoDB (Mongoose)
- **API Documentation**: Swagger (Elysia Swagger)
- **Code Execution Engine**: Judge0

## 📦 การติดตั้งและเริ่มต้นใช้งาน (Getting Started)

โปรเจกต์นี้แบ่งเป็น 2 ส่วนหลักคือ `client` และ `server`

### Prerequisites
- [Bun](https://bun.sh/) (แนะนำให้ติดตั้ง Bun ก่อน)
- Docker (สำหรับรัน Judge0 หรือ Database ถ้าจำเป็น)

### 1. Clone Repository
```bash
git clone <repository-url>
cd HexCode-Project
```

### 2. Setup Server
```bash
cd server
bun install
cp .env.template .env # ตั้งค่า Environment Variables
bun dev
```

### 3. Setup Client
```bash
cd client
bun install # หรือ npm install
cp .env.template .env.local # ตั้งค่า Environment Variables
bun dev
```

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

- `client/`: Source code ส่วนหน้าเว็บ (Frontend)
- `server/`: Source code ส่วน API และ Backend
- `judge0/`: Configuration สำหรับระบบตรวจโค้ด
