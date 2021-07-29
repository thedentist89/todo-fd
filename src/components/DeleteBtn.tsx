import React from "react";
import { ImCross } from "react-icons/im";
import { useTodos } from "../Provider";

const DeleteBtn: React.FC<{ id: number }> = ({ id }) => {
  const { setTodos } = useTodos();

  return (
    <button
      onClick={() => {
        fetch(`/rest/Tasks(${id})/?$method=delete`, {
          method: "POST",
        })
          .then((res) => {
            if (res.ok) {
              setTodos((todos) => todos.filter((todo) => todo.id !== id));
            }
          })
          .catch(console.error);
      }}
    >
      <ImCross className="todo-item__delete-icon" />
    </button>
  );
};

export default DeleteBtn;
