# 📚 Library Management System - Frontend

ระบบจัดการห้องสมุด (ส่วนหน้าบ้าน) พัฒนาด้วย HTML, CSS และ JavaScript โดยใช้โครงสร้างแบบ **Component-based** เพื่อให้โค้ดเป็นระเบียบและดูแลรักษาง่าย

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)
* **HTML5** - โครงสร้างหน้าเว็บ
* **CSS3** - ตกแต่งความสวยงาม (Custom Styles)
* **JavaScript (ES6+)** - การทำงานของระบบ
* **SweetAlert2** - แสดงผลแจ้งเตือน (Popup) ที่สวยงาม

## 📂 โครงสร้างไฟล์ (Project Structure)

```text
frontend/
│
├── css/
│   └── style.css           # ไฟล์ตกแต่งหน้าตาเว็บไซต์
│
├── js/
│   ├── components/         # ส่วนประกอบย่อยของหน้าเว็บ
│   │   ├── bookForm.js     # จัดการฟอร์มบันทึกข้อมูลและ Validation
│   │   └── bookList.js     # จัดการแสดงผลรายการหนังสือ
│   │
│   ├── api.js              # ตัวเชื่อมต่อกับ Backend (API Client)
│   └── app.js              # ตัวควบคุมหลัก (Controller) เชื่อมโยงทุกส่วน
│
└── index.html              # หน้าแรกของเว็บไซต์