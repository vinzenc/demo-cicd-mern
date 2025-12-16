import { useState, useEffect } from 'react'
import './App.css' // Import file CSS vừa tạo

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // 1. Lấy danh sách
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Lỗi fetch:", err));
  }, []);

  // 2. Thêm mới
  const addTodo = async (e) => {
    e.preventDefault(); // Ngăn load lại trang khi bấm Enter
    if (!text.trim()) return;

    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      setTodos([...todos, data]);
      setText('');
    } catch (error) {
      console.error("Lỗi thêm:", error);
    }
  };

  // 3. Xóa
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Lỗi xóa:", error);
    }
  };

  return (
    <div className="app-container">
      <h2>📝 Danh Sách Việc Cần Làm</h2>
      <form className="input-group" onSubmit={addTodo}>
        <input 
          className="input-field"
          value={text} 
          onChange={e => setText(e.target.value)}
          placeholder="Hôm nay bạn muốn làm gì?"
        />
        <button type="submit" className="btn-add">Thêm</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li style={{textAlign: 'center', color: '#888', fontStyle: 'italic'}}>
            Chưa có công việc nào. Thêm ngay nhé!
          </li>
        ) : (
          todos.map(todo => (
            <li key={todo._id} className="todo-item">
              <span className="todo-text">{todo.text}</span>
              <button 
                onClick={() => deleteTodo(todo._id)} 
                className="btn-delete"
              >
                Xóa
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App