const db = require('../database/connection');

class BookRepository {
    // ดึงหนังสือทั้งหมด (รองรับการกรองด้วย status)
    async findAll(status = null) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books';
            let params = [];
            if (status) {
                sql += ' WHERE status = ?';
                params.push(status);
            }
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // ค้นหาหนังสือด้วย ID
    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // เพิ่มหนังสือใหม่
    async create(bookData) {
        const { title, author, isbn } = bookData;
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)';
            db.run(sql, [title, author, isbn], function(err) {
                if (err) reject(err);
                else {
                    db.get('SELECT * FROM books WHERE id = ?', [this.lastID], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }

    // อัปเดตสถานะ (ยืม/คืน)
    async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE books SET status = ? WHERE id = ?', [status, id], function(err) {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }

    // อัปเดตข้อมูลหนังสือ (title, author, isbn)
    async update(id, bookData) {
        const { title, author, isbn } = bookData;
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?';
            db.run(sql, [title, author, isbn, id], function(err) {
                if (err) reject(err);
                else {
                    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }

    // ลบหนังสือ
    async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM books WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }
}

module.exports = new BookRepository();