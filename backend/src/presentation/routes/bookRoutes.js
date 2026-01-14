const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);

// 👇 แก้แล้วทั้ง 2 อัน
router.put('/:id/borrow', bookController.borrowBook); 
router.put('/:id/return', bookController.returnBook); 

router.delete('/:id', bookController.deleteBook);

module.exports = router;