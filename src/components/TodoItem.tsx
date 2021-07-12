import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useTodos } from "../Provider";
import { ITodo } from "../interfaces";

const TodoItem: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const { todos, setTodos } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);

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
          onBlur={() => {
            setTodos((todos) => {
              return todos.map((item) => {
                if (todo.id === item.id) {
                  return {
                    ...item,
                    title: inputValue,
                  };
                }

                return item;
              });
            });

            setIsEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setInputValue(todo.title);
              setIsEditing(false);
            }

            if (e.key === "Enter") {
              setTodos((todos) => {
                return todos.map((item) => {
                  if (todo.id === item.id) {
                    return {
                      ...item,
                      title: inputValue,
                    };
                  }

                  return item;
                });
              });

              setIsEditing(false);
            }
          }}
        />
      ) : (
        <div className="todo-item__container">
          <div className="todo-item__devider">
            <input
              type="checkbox"
              className="todo-item__checkbox"
              checked={todo.completed}
              onChange={() => {
                setTodos((todos) => {
                  return todos.map((item) => {
                    if (todo.id === item.id) {
                      return {
                        ...item,
                        completed: !todo.completed,
                      };
                    }

                    return item;
                  });
                });
              }}
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
            <button
              onClick={() => {
                setTodos(todos.filter((todoItem) => todoItem.id !== todo.id));
              }}
            >
              <ImCross className="todo-item__delete-icon" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
