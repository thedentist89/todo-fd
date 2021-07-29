import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useTodos } from "../Provider";

const AddTodo: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [input, setInput] = useState("");
  const allChecked = todos.every((todoItem) => todoItem.completed);

  function handleAddTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input) {
      const newTodo = {
        title: input,
        completed: false,
      };

      fetch("/rest/Tasks/?$method=update", {
        method: "POST",
        body: JSON.stringify(newTodo),
      })
        .then((res) => res.json())
        .then((newTodo) => {
          setTodos((state) => [newTodo, ...state]);
          setInput("");
        })
        .catch(console.error);
    }
  }

  function handleChange({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setInput(value);
  }

  function toggleAllTodosCompleted() {
    fetch("/rest/Tasks/?$method=update", {
      method: "POST",
      body: JSON.stringify(
        todos.map((todo) => ({ ...todo, completed: allChecked ? false : true }))
      ),
    })
      .then((res) => {
        if (res.ok) {
          fetch("/rest/Tasks/?$asArray=true")
            .then((resp) => resp.json())
            .then((todos) => setTodos(todos))
            .catch(console.error);
        }
      })
      .catch(console.error);
  }

  return (
    <div className="todo-prompt">
      <div className="todo-prompt__container">
        {todos.length ? (
          <button
            className="todo-prompt__toggle"
            onClick={toggleAllTodosCompleted}
          >
            <HiOutlineChevronDown className="todo-prompt__toggle-icon" />
          </button>
        ) : null}
      </div>
      <input
        type="text"
        placeholder="What needs to be done?"
        className="todo-prompt__input"
        value={input}
        onChange={handleChange}
        onKeyDown={handleAddTodo}
      />
    </div>
  );
};

export default AddTodo;
