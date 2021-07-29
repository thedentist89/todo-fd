import { useState } from "react";
import DeleteBtn from "./DeleteBtn";
import { useTodos } from "../Provider";
import { ITodo } from "../interfaces";

const TodoItem: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const { setTodos } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);

  function handleCompleted() {
    fetch("/rest/Tasks/?$method=update", {
      method: "POST",
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    })
      .then((res) => res.json())
      .then(({ __STATUS, uri, ...rest }) => {
        if (__STATUS.success) {
          setTodos((todos) => {
            return todos.map((item) => {
              if (todo.id === item.id) {
                return rest;
              }

              return item;
            });
          });
        }
      })
      .catch(console.error);
  }

  function updateTodoTitle() {
    fetch("/rest/Tasks/?$method=update", {
      method: "POST",
      body: JSON.stringify({
        ...todo,
        title: inputValue,
      }),
    })
      .then((res) => res.json())
      .then(({ __STATUS, uri, ...rest }) => {
        if (__STATUS.success) {
          setTodos((todos) => {
            return todos.map((item) => {
              if (todo.id === item.id) {
                return rest;
              }

              return item;
            });
          });
        }
      })
      .catch(console.error);

    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setInputValue(todo.title);
      setIsEditing(false);
    }

    if (e.key === "Enter") {
      updateTodoTitle();
    }
  }

  return (
    <li
      className="todo-item"
      onDoubleClick={() => {
        if (!todo.completed) {
          setIsEditing(true);
        }
      }}
    >
      {isEditing ? (
        <input
          className="todo-item__input"
          autoFocus
          value={inputValue}
          onChange={({ target: { value } }) => {
            setInputValue(value);
          }}
          onBlur={updateTodoTitle}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="todo-item__container">
          <div className="todo-item__devider">
            <input
              type="checkbox"
              className="todo-item__checkbox"
              checked={todo.completed}
              onChange={handleCompleted}
            />
          </div>
          <label
            className={`todo-item__title ${
              todo.completed
                ? "todo-item__title--completed"
                : "todo-item__title--active"
            }`}
          >
            {todo.title}
          </label>
          <div className="todo-item__delete-btn group-hover:flex">
            <DeleteBtn id={todo.id} />
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
