const bookService = require("../../business/services/bookService");

class BookController {
  async getAllBooks(req, res, next) {
    try {
      const { status } = req.query;
      const result = await bookService.getAllBooks(status);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req, res, next) {
    try {
      const result = await bookService.getBookById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      const result = await bookService.createBook(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // ในไฟล์ backend/src/presentation/controllers/bookController.js

  async borrowBook(req, res, next) {
    try {
      console.log("📌 กำลังยืมหนังสือ ID:", req.params.id); // เช็คว่า ID เข้ามาไหม
      const result = await bookService.borrowBook(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("💥 Error ยืมหนังสือ:", error.message); // โชว์ Error ที่จอดำ
      // ส่ง JSON กลับไปบอก Frontend (ห้ามใช้ next(error))
      res.status(400).json({ error: error.message });
    }
  }

  async returnBook(req, res, next) {
    try {
      console.log("📌 กำลังคืนหนังสือ ID:", req.params.id);
      const result = await bookService.returnBook(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("💥 Error คืนหนังสือ:", error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async updateBook(req, res, next) {
    try {
      const result = await bookService.updateBook(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      await bookService.deleteBook(req.params.id);
      res.json({ message: "Book deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();
