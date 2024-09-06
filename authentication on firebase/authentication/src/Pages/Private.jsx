import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./Private.css";
import './todo.css';

// Function to generate unique IDs
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  // Handle form submission to add a new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo = { id: generateId(), text: input, status: "in-progress" };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  // Handle removing a todo by ID
  const handleRemove = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle the status of a todo between "in-progress" and "completed"
  const toggleStatus = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, status: todo.status === "in-progress" ? "completed" : "in-progress" }
        : todo
    ));
  };

  // Handle the drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const items = Array.from(todos);
    const [movedItem] = items.splice(source.index, 1);
    movedItem.status = destination.droppableId; // Update the status based on droppableId
    items.splice(destination.index, 0, movedItem);

    setTodos(items);
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "10px",
    width: "300px",
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "16px",
    margin: "0 0 8px 0",
    background: isDragging ? "lightgreen" : "white",
    ...draggableStyle,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          <Droppable droppableId="in-progress">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <h2>In Progress</h2>
                {todos.filter(todo => todo.status === "in-progress").map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {todo.text}
                        <button onClick={() => toggleStatus(todo.id)} className='status-btn'>
                          Mark as Completed
                        </button>
                        <button onClick={() => handleRemove(todo.id)} className='remove-btn'>
                          Remove
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="completed">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <h2>Completed</h2>
                {todos.filter(todo => todo.status === "completed").map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {todo.text}
                        <button onClick={() => toggleStatus(todo.id)} className='status-btn'>
                          Mark as In Progress
                        </button>
                        <button onClick={() => handleRemove(todo.id)} className='remove-btn'>
                          Remove
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
