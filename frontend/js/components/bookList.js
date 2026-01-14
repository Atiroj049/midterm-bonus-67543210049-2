// js/components/bookList.js

const BookList = {
    // ฟังก์ชันหลัก: รับข้อมูลหนังสือมาแสดงผล
    render: (books) => {
        const container = document.getElementById('book-list');
        
        if (!books || books.length === 0) {
            container.innerHTML = '<div class="no-books">📚 No books found</div>';
            return;
        }
        
        // สร้าง HTML Card ต่อๆ กัน
        container.innerHTML = books.map(book => BookList.createCard(book)).join('');
    },

    // ฟังก์ชันย่อย: สร้าง HTML ของแต่ละการ์ด
    createCard: (book) => {
        // ป้องกัน XSS
        const escapeHtml = (text) => {
            if (!text) return '-';
            return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
        };

        return `
            <div class="book-card">
                <h3>${escapeHtml(book.title)}</h3>
                <p class="author">👤 ${escapeHtml(book.author)}</p>
                <p class="isbn">🔖 ISBN: ${escapeHtml(book.isbn)}</p>
                
                <span class="status-badge status-${book.status}">
                    ${book.status === 'available' ? '✅' : '📖'} ${book.status.toUpperCase()}
                </span>
                
                <div class="actions">
                    ${book.status === 'available' 
                        ? `<button class="btn btn-success" onclick="handleBorrow(${book.id})">Borrow</button>`
                        : `<button class="btn btn-warning" onclick="handleReturn(${book.id})">Return</button>`
                    }
                    <button class="btn btn-secondary" onclick="BookForm.open(${book.id})">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete(${book.id})">Delete</button>
                </div>
            </div>
        `;
    }
};