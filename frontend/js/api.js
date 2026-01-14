// ⚠️ ถ้าขึ้น VM อย่าลืมเปลี่ยน localhost เป็น IP VM นะครับ
const BASE_URL = "http://localhost:3000/api";
// หรือถ้าพี่ใช้ path ว่า /api/books ก็แก้ให้ตรงกัน เช่น 'http://localhost:3000/api/books'
// แต่ดูจาก router พี่แล้ว พี่ใช้ / (root) ใน routes ดังนั้นน่าจะใช้ตามข้างล่างนี้ครับ:

// เช็ค URL ให้ชัวร์: ถ้าใน server.js พี่เขียน app.use('/api/books', routes)
// ค่า BASE_URL ต้องเป็น 'http://localhost:3000/api/books' ครับ
const API_URL = "http://localhost:3000/api/books";

const api = {
  // ดึงข้อมูลทั้งหมด
  getAllBooks: async (status) => {
    let url = API_URL;
    if (status && status !== "all") url += `?status=${status}`;
    return await (await fetch(url)).json();
  },

  // ดึงเล่มเดียว
  getBookById: async (id) => await (await fetch(`${API_URL}/${id}`)).json(),

  // สร้าง
  createBook: async (data) =>
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  // แก้ไข
  updateBook: async (id, data) =>
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  // ลบ
  deleteBook: async (id) =>
    await fetch(`${API_URL}/${id}`, { method: "DELETE" }),

  // 👇👇 ตัวสำคัญ! ต้องมีตรงนี้ครับ ไม่งั้น error "is not a function"
  borrowBook: async (id) => {
    // ยิงไปที่ route /:id/borrow ด้วย method PUT
    const res = await fetch(`${API_URL}/${id}/borrow`, { method: "PUT" });
    if (!res.ok) {
      // อ่านข้อความ Error ที่ Server ส่งมา (เช่น "no such column: quantity")
      const err = await res.json();
      throw new Error(err.error || "Borrow failed");
    }
    return await res.json();
  },

  returnBook: async (id) => {
    // ยิงไปที่ route /:id/return ด้วย method PUT
    const res = await fetch(`${API_URL}/${id}/return`, { method: "PUT" });

    if (!res.ok) {
      // 👇 อัปเกรดตรงนี้: ให้ดึงข้อความ Error จริงๆ จาก Server มาโชว์
      const err = await res.json();
      throw new Error(err.error || "Return failed");
    }

    return await res.json();
  },
};
