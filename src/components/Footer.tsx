import { useTodos } from "../Provider";

const Footer: React.FC = () => {
  const { todos, setTodos } = useTodos();

  return todos.length ? (
    <div className="app-footer">
      <span>{todos.filter((item) => !item.completed).length} items left</span>
      <div className="app-footer__action-box">
        {todos.some((item) => item.completed) ? (
          <button
            className="app-footer__clear-btn"
            onClick={() => {
              setTodos((state) => {
                return state.filter((item) => item.completed === false);
              });
            }}
          >
            Clear Completed
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Footer;
