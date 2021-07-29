import React from "react";
import { ITodo } from "./interfaces";

const INITIAL_DATA: ITodo[] = [];

const TodoContext = React.createContext<
  | {
      todos: ITodo[];
      setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
    }
  | undefined
>(undefined);

const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = React.useState<ITodo[]>(INITIAL_DATA);

  const value = { todos, setTodos };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
function useTodos() {
  const context = React.useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}
export { TodoProvider, useTodos };
