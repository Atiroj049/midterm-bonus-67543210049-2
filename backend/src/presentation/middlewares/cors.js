// ไฟล์: src/presentation/middlewares/cors.js
const cors = require('cors');

const corsOptions = {
    origin: '*', // ยอมรับทุกโดเมน (เพื่อให้ Frontend Localhost คุยได้)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = cors(corsOptions);