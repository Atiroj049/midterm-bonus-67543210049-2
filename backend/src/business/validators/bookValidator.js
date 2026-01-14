class BookValidator {
    // ตรวจสอบข้อมูลพื้นฐานของหนังสือ
    validateBookData(data) {
        const { title, author, isbn } = data;
        if (!title || !author || !isbn) {
            throw new Error('Title, author, and ISBN are required');
        }
        return true;
    }
    
    // ตรวจสอบรูปแบบ ISBN
    validateISBN(isbn) {
        const isbnPattern = /^(97[89])?\d{9}[\dXx]$/;
        const cleanISBN = isbn.replace(/-/g, '');
        if (!isbnPattern.test(cleanISBN)) {
            throw new Error('Invalid ISBN format');
        }
        return true;
    }
    
    // ตรวจสอบ ID หนังสือ
    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new Error('Invalid book ID');
        }
        return numId;
    }
}

module.exports = new BookValidator();