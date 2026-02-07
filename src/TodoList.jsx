import React from 'react'
import './TodoList.css'
import avatar from './assets/image/profile.webp'
import { useState } from "react"

const TodoList = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const toggleMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle("dark-mode")
  }

  const addTodo = () => {
    if (input.trim() === "") {
      alert("Please enter a todo item.")
      return
    }

    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ])
    setInput("")
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <section className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="card profile-section">
        <div className="profile-header">
          <img src={avatar} alt="Avatar" className="avatar" />
          <div>
            <h2>Gilang Ramadan</h2>
            <p className="role">Frontend Developer</p>
          </div>
        </div>

        <p className="bio">
          Front-End Developer yang berfokus pada pengembangan antarmuka web responsif dengan perhatian pada detail dan pengalaman pengguna.
        </p>

        <button className="btn btn-secondary" onClick={toggleMode}>
          🌙 Switch Mode
        </button>
      </div>

      <div className="card todo-section">
        <h3>My Tasks</h3>

        <p className="todo-progress">
          Todolist selesai {completedCount} / {todos.length}
        </p>

        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis tugas baru..."
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((item) => (
            <li
              key={item.id}
              className={item.completed ? "completed" : ""}
            >
              <span>{item.text}</span>

              <div>
                <button
                  className="complete-btn"
                  onClick={() => toggleComplete(item.id)}
                >
                  {item.completed ? "Undo" : "Selesai"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TodoList
