const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {
    async getAllBooks(status = null) {
        // ดึงข้อมูลหนังสือจาก Repository
        const books = await bookRepository.findAll(status);
        
        // คำนวณสถิติส่งกลับไปด้วยตามโจทย์
        const available = books.filter(b => b.status === 'available').length;
        const borrowed = books.filter(b => b.status === 'borrowed').length;
        
        return {
            books,
            statistics: { available, borrowed, total: books.length }
        };
    }

    async createBook(bookData) {
        // ตรวจสอบความถูกต้องก่อนบันทึก
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);
        
        return await bookRepository.create(bookData);
    }

    async borrowBook(id) {
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);
        
        if (!book) throw new Error('Book not found');
        if (book.status === 'borrowed') throw new Error('Book is already borrowed');
        
        await bookRepository.updateStatus(validId, 'borrowed');
        return await bookRepository.findById(validId);
    }

    async returnBook(id) {
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);
        
        if (!book) throw new Error('Book not found');
        if (book.status !== 'borrowed') throw new Error('Book is not borrowed');
        
        await bookRepository.updateStatus(validId, 'available');
        return await bookRepository.findById(validId);
    }

    async deleteBook(id) {
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);
        
        if (!book) throw new Error('Book not found');
        // กฎเหล็ก: ห้ามลบหนังสือที่ถูกยืมอยู่
        if (book.status === 'borrowed') {
            throw new Error('Cannot delete borrowed book');
        }
        
        return await bookRepository.delete(validId);
    }
    
    // สำหรับดึงข้อมูลเล่มเดียว
    async getBookById(id) {
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);
        if (!book) throw new Error('Book not found');
        return book;
    }

    // เพิ่มฟังก์ชันสำหรับการ Update ข้อมูล
    async updateBook(id, bookData) {
        const validId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validId);
        
        if (!book) throw new Error('Book not found');
        
        // ตรวจสอบความถูกต้องของข้อมูลใหม่
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);
        
        // อัปเดตข้อมูล (โดยรักษาสถานะไว้)
        return await bookRepository.update(validId, bookData);
    }
}

module.exports = new BookService();