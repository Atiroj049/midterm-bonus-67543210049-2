function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    // แยกประเภท Error เพื่อส่ง Status Code ที่ถูกต้อง
    if (err.message.includes('not found')) {
        return res.status(404).json({ error: err.message });
    }
    
    if (err.message.includes('required') || err.message.includes('format') || err.message.includes('Invalid')) {
        return res.status(400).json({ error: err.message });
    }
    
    if (err.message.includes('already')) {
        return res.status(409).json({ error: err.message });
    }
    
    // Error ทั่วไป (Internal Server Error)
    res.status(500).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;