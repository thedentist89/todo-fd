import React from "react";
import { ImCross } from "react-icons/im";
import { useTodos } from "../Provider";

const DeleteBtn: React.FC<{ id: number }> = ({ id }) => {
  const { todos, setTodos } = useTodos();

  return (
    <button
      onClick={() => {
        setTodos(todos.filter((todoItem) => todoItem.id !== id));
      }}
    >
      <ImCross className="todo-item__delete-icon" />
    </button>
  );
};

export default DeleteBtn;
