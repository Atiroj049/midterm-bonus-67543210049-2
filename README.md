# 📚 Library Management System - Client-Server Architecture

โปรเจกต์นี้เป็นส่วนหนึ่งของรายวิชา **ENGSE207 - Bonus Exam**
โดยมีการปรับปรุงสถาปัตยกรรมซอฟต์แวร์จาก **Layered Architecture** (Monolithic) ไปสู่ **Client-Server Architecture** (Separated Frontend & Backend)

## 👤 Student Information
- **Student Name:** [Atiroj Kulan]
- **Student ID:** [67543210049-2]
- **Section:** [Sec 1]
- **Course:** ENGSE207 - Software Architecture

---

## 🏗️ Architecture Design



[Image of Client-Server Architecture Diagram]


### 1. Before: Layered Architecture
- เป็นแอปพลิเคชันก้อนเดียว (Monolithic)
- Frontend และ Backend ทำงานอยู่บน Server เดียวกัน
- การส่งข้อมูลใช้การ Render HTML จาก Server

### 2. After: Client-Server Architecture (Current)
- **Backend:** ทำหน้าที่เป็น RESTful API Server (Node.js + Express) เชื่อมต่อกับ SQLite
- **Frontend:** เป็น Static Web Client แยกต่างหาก (HTML/CSS/JS) เชื่อมต่อผ่าน HTTP Request
- **Communication:** แลกเปลี่ยนข้อมูลด้วยรูปแบบ **JSON**
- **CORS:** มีการจัดการ Cross-Origin Resource Sharing เพื่อให้ Client และ Server คุยกันได้

---

## 📂 Project Structure

```text
midterm-bonus-<รหัสนักศึกษา>/
│
├── backend/                  # 🖥️ Server Side (Node.js)
│   ├── src/
│   │   ├── presentation/
│   │   │   ├── controllers/  # Logic การทำงาน
│   │   │   ├── routes/       # API Endpoints
│   │   │   └── middlewares/  # CORS & Error Handling
│   │   └── ...
│   ├── library.db            # Database File
│   └── server.js             # Entry Point
│
└── frontend/                 # 🌐 Client Side (Browser)
    ├── css/
    ├── js/
    │   ├── components/       # ✅ New: UI Components
    │   │   ├── bookForm.js   # จัดการฟอร์ม & Validation
    │   │   └── bookList.js   # จัดการแสดงผลรายการ
    │   ├── api.js            # เชื่อมต่อ API
    │   └── app.js            # Main Logic
    └── index.html


---

## 📡 API Endpoints Documentation

**Base URL:** `http://localhost:3000/api/books`

| Method | Endpoint | Description | Payload (Body) |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | ดึงข้อมูลหนังสือทั้งหมด | - |
| **GET** | `/:id` | ดึงข้อมูลหนังสือตาม ID | - |
| **POST** | `/` | เพิ่มหนังสือใหม่ | `{ title, author, isbn }` |
| **PUT** | `/:id` | แก้ไขข้อมูลหนังสือ | `{ title, author, isbn }` |
| **DELETE** | `/:id` | ลบหนังสือ | - |
| **PUT** | `/:id/borrow` | ยืมหนังสือ (เปลี่ยนสถานะ) | - |
| **PUT** | `/:id/return` | คืนหนังสือ (เปลี่ยนสถานะ) | - |

---

## 🚀 How to Run

### 1. Backend (Server - VM/Local)
```bash
cd backend

# ติดตั้ง Dependencies
npm install

# รัน Server
node server.js