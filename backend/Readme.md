# 📚 Library Management System - Backend

ระบบจัดการห้องสมุด (ส่วนหลังบ้าน) พัฒนาด้วย **Node.js** และ **Express** โดยใช้ฐานข้อมูล **SQLite**
ออกแบบตามหลักการ **Layered Architecture** เพื่อแยกส่วนการทำงานให้ชัดเจนและเป็นระเบียบ

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3
* **Middleware:** CORS (สำหรับการเชื่อมต่อข้ามโดเมน)

## 📂 โครงสร้างไฟล์ (Project Structure)

```text
backend/
│
├── src/
│   ├── presentation/       # ส่วนติดต่อกับ HTTP Request/Response
│   │   ├── controllers/    # รับค่าจาก Route ส่งไปให้ Business Layer
│   │   ├── routes/         # กำหนดเส้นทาง API (Endpoints)
│   │   └── middlewares/    # จัดการ CORS และ Error Handling
│   │
│   ├── business/           # ส่วนประมวลผลทางธุรกิจ (Business Logic)
│   │   ├── services/       # ตรรกะการทำงานหลัก
│   │   └── validators/     # ตรวจสอบความถูกต้องของข้อมูล
│   │
│   └── data/               # ส่วนติดต่อกับฐานข้อมูล (Database Access)
│       ├── repositories/   # คำสั่ง SQL ต่างๆ
│       └── database/       # การเชื่อมต่อไฟล์ library.db
│
├── library.db              # ไฟล์ฐานข้อมูล SQLite
├── server.js               # จุดเริ่มต้นการทำงานของ Server (Entry Point)
└── package.json            # รายชื่อ Dependencies

⚙️ การติดตั้งและรัน Server (Installation & Run)
เข้าไปที่โฟลเดอร์ backend
Bash
cd backend
ติดตั้ง Libraries ที่จำเป็น
Bash
npm install
(ระบบจะติดตั้ง express, sqlite3, cors ให้อัตโนมัติ)
รัน Server
Bash
node server.js
✅ หากสำเร็จ จะขึ้นข้อความ:Server running on port 3000Connected to SQLite database

📡 API Documentation
Base URL: http://localhost:3000/api/books

GET/ดึงข้อมูลหนังสือทั้งหมด
GET/:idดึงข้อมูลหนังสือตาม 
IDPOST/เพิ่มหนังสือใหม่
PUT/:idแก้ไขข้อมูลหนังสือ
DELETE/:idลบหนังสือ
PUT/:id/borrowยืมหนังสือ (เปลี่ยนสถานะเป็น Borrowed)
PUT/:id/returnคืนหนังสือ (เปลี่ยนสถานะเป็น Available)

⚠️ ข้อควรระวัง (Troubleshooting)

CORS Error: หาก Frontend ฟ้องเรื่อง CORS ให้ตรวจสอบไฟล์ src/presentation/middlewares/cors.js หรือเช็คว่าติดตั้ง library cors แล้วหรือไม่

Database Not Found: ตรวจสอบ path ของไฟล์ library.db ใน src/data/database/connection.js ให้ถูกต้องVM / Cloud: หากนำไปรันบน 

VM ต้องแน่ใจว่าได้เปิด Port 3000 (Allow Firewall) แล้ว