import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Gọi API từ Backend (chúng ta sẽ cấu hình URL sau)
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Project 2: MERN Stack CI/CD</h1>
      <p>Backend says: <b style={{color: 'blue'}}>{message || "Đang kết nối..."}</b></p>
    </div>
  )
}

export default App