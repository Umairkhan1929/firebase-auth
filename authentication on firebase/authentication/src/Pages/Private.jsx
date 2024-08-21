// import React from "react"
// import { signOut } from "firebase/auth"
// import { auth } from "../firebase"
// import "./Private.css"
// import { useState } from "react"
// import './todo.css'

// function Private() {
 
// const handleSignout=()=>{
//   signOut(auth)
//   .then(()=>{
//     alert("SignOut Successfully!")
//   })
//   .catch(error=>{
//     console.log(error)
//     alert(error.message)
//   })
// }

//     return (
//       <div style={{display:'flex',justifyContent:'center', flexDirection: 'column'}} className="private-container">
//         <h1 className="private-h1">Welcome to the Dashboard</h1><br />
//         <main className="private-content">
//           <h2>Your profile</h2><br />
//           <p>Welcome to the Dashboard. Here you can manage your setting and preferences.</p><br />
//         </main>
//        <footer className="private-footer">
//         <button onClick={handleSignout}>SignOut</button>
//         </footer>
//       </div>
//     )
//   }
  
//   export default Private






// import { useState } from 'react'
// import './App.css'
// import React from "react"
// import { auth } from "../firebase"
// import "./Private.css"
// import { useState } from "react"
// import './todo.css'

// function App() {
//   const [input, setInput] = useState("")
//   const [todos, setTodos] = useState([])

//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     setTodos([...todos, input]);
//     setInput("");
// };

//   const handleRemove = (index)=>{
//     setTodos(todos.filter((_,todo)=> todo !== index));
//   };
 
//   return (
//     <>
//     <div className='container'>
//       <h1>Countdown Board for Project Management</h1>
//       <input type="text" placeholder='Enter some things...' value={input} onChange={(e)=>setInput(e.target.value)} id='input-text'/>
//       <button onClick={handleSubmit} className='add-btn'>Add</button>

//       <ul className='button'>
        
//         {todos.map((todo, index)=>( 
//           <li key={index}>{todo}
//           <button onClick={()=>handleRemove(index)} className='remove-btn'>Romove</button>
//           </li>
//         )
//         )}

//       </ul>
//       </div>
//     </>
//   )
// }

// export default App



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


