import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = e => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: todo,
        completed: false
      }
    ]);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (todo === "") return;
    addTodo();
    setTodo("");
  };

  const removeTodo = todoId => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const toggleTodo = todoId => {
    const updatedTodos = todos.map(todo => {
      return todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>To Do List using React Hooks</label>
        <input
          placeholder="Add an item..."
          id="todo"
          className="todo-input"
          onChange={handleChange}
          value={todo}
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
      <div>
        <ul className="ulList">
          {todos.map(todo => (
            <li key={todo.id} className="liList">
              <span
                className={todo.completed ? "todo-completed" : undefined}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <span className="delete-btn" onClick={() => removeTodo(todo.id)}>
                ❌
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
