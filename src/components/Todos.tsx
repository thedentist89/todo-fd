import { useTodos } from "../Provider";
import TodoItem from "./TodoItem";

const Todos: React.FC = () => {
  const { todos } = useTodos();

  return (
    <ul className="section-list">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

export default Todos;
