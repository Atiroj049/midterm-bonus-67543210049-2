// js/components/bookForm.js

const BookForm = {
    // เริ่มต้นทำงาน: ผูก Event กับปุ่ม Save
    init: () => {
        document.getElementById('book-form').addEventListener('submit', BookForm.handleSubmit);
        document.querySelector('.close').addEventListener('click', BookForm.close);
        document.getElementById('cancel-btn').addEventListener('click', BookForm.close);
        document.getElementById('add-btn').addEventListener('click', () => BookForm.open());
    },

    // เปิด Modal (ถ้ามี id ส่งมา = แก้ไข, ถ้าไม่มี = เพิ่มใหม่)
    open: async (id = null) => {
        const modal = document.getElementById('book-modal');
        const form = document.getElementById('book-form');
        
        form.reset(); // ล้างค่าเก่า
        document.getElementById('book-id').value = '';

        if (id) {
            // โหมดแก้ไข: ดึงข้อมูลเก่ามาใส่
            document.getElementById('modal-title').textContent = 'Edit Book';
            try {
                const book = await api.getBookById(id);
                document.getElementById('book-id').value = book.id;
                document.getElementById('title').value = book.title;
                document.getElementById('author').value = book.author;
                document.getElementById('isbn').value = book.isbn;
            } catch (error) {
                Swal.fire('Error', 'Failed to load book data', 'error');
                return;
            }
        } else {
            // โหมดเพิ่มใหม่
            document.getElementById('modal-title').textContent = 'Add New Book';
        }

        modal.style.display = 'flex';
    },

    // ปิด Modal
    close: () => {
        document.getElementById('book-modal').style.display = 'none';
    },

    // ฟังก์ชันกดปุ่ม Save
    handleSubmit: async (event) => {
        event.preventDefault(); // ห้ามรีเฟรชหน้า

        const id = document.getElementById('book-id').value;
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const isbn = document.getElementById('isbn').value.trim();

        // ✅ ตรวจสอบ ISBN (ตัวเลขล้วน + 10 หลัก)
        if (isNaN(isbn) || isbn === "" || isbn.length !== 10) {
            Swal.fire({
                icon: 'warning',
                title: 'ข้อมูลไม่ถูกต้อง',
                text: 'ISBN ต้องเป็นตัวเลข 10 หลักเท่านั้น!',
                confirmButtonColor: '#f59e0b'
            });
            return;
        }

        // ยืนยันการบันทึก
        const result = await Swal.fire({
            title: id ? 'ยืนยันการแก้ไข?' : 'ยืนยันการเพิ่มหนังสือ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            try {
                const bookData = { title, author, isbn };
                
                if (id) {
                    await api.updateBook(id, bookData);
                    Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลแล้ว', 'success');
                } else {
                    await api.createBook(bookData);
                    Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อย', 'success');
                }

                BookForm.close();
                loadBooks(); // เรียกฟังก์ชันโหลดข้อมูลใหม่ (จาก app.js)
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    }
};