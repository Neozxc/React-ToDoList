import React, { useState } from "react";
import "./index.css";

const App = () => {

  
  // We set up some Hooks:
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Users input
  const handleChange = e => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    setTodos([
      // We go through the array with: ( ... ) - spread notation
      ...todos,
      {
        // We add + 1 to the array and set text to an hook
        id: todos.length + 1,
        text: todo,
        // This is for later use to cross out the text
        completed: false
      }
    ]);
  };

  const onSubmit = e => {
    // Prevent page from reloading.
    e.preventDefault();
    // If there is no item dont let it add to the list.
    if (todo === "") return;
    // Add users input to the list
    addTodo();
    // Clear users input after we added to the list
    setTodo("");
  };

  const removeTodo = todoId => {
    // Filter() method creates a new array with all the elements
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    // We set the array to updatedTodos
    setTodos(updatedTodos);
  };

  const toggleTodo = todoId => {
    // Map() method creates a new array
    const updatedTodos = todos.map(todo => {
      // If the todo.id equals or is the same type
      // We go through array, check completed, if not equals to
      // Completed we leave it or cross it out; (When user presses on item).
      return todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo;
    });

    // Update
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
