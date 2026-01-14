const bookService = require('../services/bookService');

// GET all books
exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await bookService.getAllBooks();
        
        res.json(books);
    } catch (error) {
        next(error);
    }
};

// GET book by ID
exports.getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);
        
        res.json(book);
    } catch (error) {
        next(error);
    }
};

// CREATE book
exports.createBook = async (req, res, next) => {
    try {
        const newBook = req.body;
        const createdBook = await bookService.createBook(newBook);

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: createdBook
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE book
exports.updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBookData = req.body;
        const updatedBook = await bookService.updateBook(id, updatedBookData);

        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        next(error);
    }
};

// DELETE book
exports.deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        await bookService.deleteBook(id);

        res.json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// BORROW book
exports.borrowBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBook = await bookService.borrowBook(id);

        res.json({
            success: true,
            message: 'Book borrowed successfully',
            data: updatedBook
        });
    } catch (error) {
        next(error);
    }
};

// RETURN book
exports.returnBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBook = await bookService.returnBook(id);

        res.json({
            success: true,
            message: 'Book returned successfully',
            data: updatedBook
        });
    } catch (error) {
        next(error);
    }
};