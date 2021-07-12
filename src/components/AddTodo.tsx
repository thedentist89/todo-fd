import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useTodos } from "../Provider";

let id = 2;

const AddTodo: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [input, setInput] = useState("");
  const allChecked = todos.every((todoItem) => todoItem.completed);

  return (
    <div className="todo-prompt">
      <div className="todo-prompt__container">
        {todos.length ? (
          <button
            className="todo-prompt__toggle"
            onClick={() => {
              setTodos((state) => {
                if (allChecked) {
                  return state.map((item) => ({
                    ...item,
                    completed: false,
                  }));
                } else {
                  return state.map((item) => ({
                    ...item,
                    completed: true,
                  }));
                }
              });
            }}
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
        onChange={({ target: { value } }) => {
          setInput(value);
        }}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && input) {
            const newTodo = {
              title: input,
              completed: false,
              id: id++,
            };

            setTodos((state) => [newTodo, ...state]);
            setInput("");
          }
        }}
      />
    </div>
  );
};

export default AddTodo;
