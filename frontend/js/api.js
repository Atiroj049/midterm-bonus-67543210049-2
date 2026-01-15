// frontend/js/api.js

// ⚠️ เปลี่ยน localhost เป็น IP ของ VM (192.168.56.101)
const API_URL = "http://192.168.56.101:3000/api/books";

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

  // ยืมหนังสือ
  borrowBook: async (id) => {
    const res = await fetch(`${API_URL}/${id}/borrow`, { method: "PUT" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Borrow failed");
    }
    return await res.json();
  },

  // คืนหนังสือ
  returnBook: async (id) => {
    const res = await fetch(`${API_URL}/${id}/return`, { method: "PUT" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Return failed");
    }
    return await res.json();
  },
};