require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Đã kết nối MongoDB thành công!"))
    .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// 2. Tạo Model (Cấu trúc dữ liệu)
const TodoSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false }
});
const Todo = mongoose.model('Todo', TodoSchema);

// 3. API Routes

// Lấy danh sách (GET)
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Thêm mới (POST)
app.post('/todos', async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.json(newTodo);
});

// Xóa (DELETE)
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa" });
});

// Route mặc định để test
app.get('/', (req, res) => {
    res.send("API đang chạy...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server chạy tại port ${PORT}`);
});