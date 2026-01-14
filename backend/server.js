const express = require('express');
const app = express();

// 👇 1. เปลี่ยนตรงนี้: เรียกใช้ไฟล์ middleware ที่เราสร้างเอง
const corsMiddleware = require('./src/presentation/middlewares/cors'); 

const bookRoutes = require('./src/presentation/routes/bookRoutes');

// 👇 2. ใช้งานตัวแปรที่เรา import มา
app.use(corsMiddleware);

app.use(express.json());

// Log ดู Request
app.use((req, res, next) => {
    console.log(`📡 Request: [${req.method}] ${req.url}`);
    next();
});

// เรียกใช้ Route หลัก
app.use('/api/books', bookRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  Library Management System API (Server)       ║
║  Server running on http://0.0.0.0:${PORT}        ║
║  API: http://localhost:${PORT}/api/books         ║
╚═══════════════════════════════════════════════╝
    `);
});