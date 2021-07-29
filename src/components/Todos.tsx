import { useEffect } from "react";
import { useTodos } from "../Provider";
import TodoItem from "./TodoItem";

const Todos: React.FC = () => {
  const { todos, setTodos } = useTodos();

  useEffect(() => {
    fetch("/rest/Tasks/?$asArray=true")
      .then((resp) => resp.json())
      .then((todos) => setTodos(todos))
      .catch(console.error);
  }, [setTodos]);

  return (
    <ul className="section-list">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

export default Todos;
