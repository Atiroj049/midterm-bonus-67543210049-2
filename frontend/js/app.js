// js/app.js

// โหลดข้อมูลเมื่อเข้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    BookForm.init(); // เริ่มต้นการทำงานของ Form
    setupFilters();  // ปุ่ม Filter
});

// ฟังก์ชันโหลดข้อมูล (เรียกใช้ BookList.render)
async function loadBooks(status = null) {
    try {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('book-list').style.display = 'none';

        const data = await api.getAllBooks(status);
        
        // ส่งข้อมูลไปให้ Component แสดงผล
        BookList.render(data.books);
        updateStatistics(data.statistics);

        document.getElementById('loading').style.display = 'none';
        document.getElementById('book-list').style.display = 'grid';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
    }
}

// Global Functions (เพื่อให้ปุ่ม onclick ใน HTML เรียกใช้ได้)
window.loadBooks = loadBooks; // ทำให้ BookForm เรียกใช้ได้

window.handleBorrow = async (id) => {
    const result = await Swal.fire({
        title: 'ยืมหนังสือ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ยืมเลย'
    });

    if (result.isConfirmed) {
        try {
            await api.borrowBook(id);
            Swal.fire('สำเร็จ', 'ยืมหนังสือเรียบร้อย', 'success');
            loadBooks();
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    }
};

window.handleReturn = async (id) => {
    const result = await Swal.fire({
        title: 'คืนหนังสือ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'คืน'
    });

    if (result.isConfirmed) {
        try {
            await api.returnBook(id);
            Swal.fire('สำเร็จ', 'คืนหนังสือเรียบร้อย', 'success');
            loadBooks();
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    }
};

window.handleDelete = async (id) => {
    const result = await Swal.fire({
        title: 'ลบหนังสือ?',
        text: "ไม่สามารถกู้คืนได้!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'ลบเลย'
    });

    if (result.isConfirmed) {
        try {
            await api.deleteBook(id);
            Swal.fire('ลบสำเร็จ', '', 'success');
            loadBooks();
        } catch (err) {
            Swal.fire('ลบไม่สำเร็จ', err.message, 'error');
        }
    }
};

// จัดการปุ่ม Filter
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // จัดการ class active
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // โหลดข้อมูลตาม filter
            const filter = e.target.dataset.filter;
            loadBooks(filter === 'all' ? null : filter);
        });
    });
}

function updateStatistics(stats) {
    document.getElementById('stat-available').textContent = stats.available || 0;
    document.getElementById('stat-borrowed').textContent = stats.borrowed || 0;
    document.getElementById('stat-total').textContent = stats.total || 0;
}