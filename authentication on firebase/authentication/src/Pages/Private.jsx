import React, { useState } from "react";
import "./Private.css";
import './todo.css';

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  // Handle form submission to add a new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input, status: "in-progress" }]);
      setInput("");
    }
  };

  // Handle removing a todo by index
  const handleRemove = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Toggle the status of a todo between "in-progress" and "completed"
  const toggleStatus = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index
        ? { ...todo, status: todo.status === "in-progress" ? "completed" : "in-progress" }
        : todo
    ));
  };

  return (
    <>
    <div className='container'>
      <h1>Countdown Board for Project Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter some things...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id='input-text'
        />
        <button type='submit' className='add-btn'>Add</button>
      </form>

      <div className='todo-section'>
        <h2>In Progress</h2>
        <ul className='todo-list'>
          {todos.filter(todo => todo.status === "in-progress").map((todo, index) => (
            <li key={index} className='todo-item'>
              {todo.text}
              <button onClick={() => toggleStatus(index)} className='status-btn'>
                Mark as Completed
              </button>
              <button onClick={() => handleRemove(index)} className='remove-btn'>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <h2>Completed</h2>
        <ul className='todo-list'>
          {todos.filter(todo => todo.status === "completed").map((todo, index) => (
            <li key={index} className='todo-item'>
              {todo.text}
              <button onClick={() => toggleStatus(index)} className='status-btn'>
                Mark as In Progress
              </button>
              <button onClick={() => handleRemove(index)} className='remove-btn'>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;


