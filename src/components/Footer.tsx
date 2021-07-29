import { useTodos } from "../Provider";

const Footer: React.FC = () => {
  const { todos, setTodos } = useTodos();

  function handleDeleteCompleted() {
    fetch('/rest/Tasks/?$filter="completed=true"&$method=delete', {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          setTodos((state) => {
            return state.filter((item) => !item.completed);
          });
        }
      })
      .catch(console.error);
  }

  return todos.length ? (
    <div className="app-footer">
      <span>{todos.filter((item) => !item.completed).length} items left</span>
      <div className="app-footer__action-box">
        {todos.some((item) => item.completed) ? (
          <button
            className="app-footer__clear-btn"
            onClick={handleDeleteCompleted}
          >
            Clear Completed
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Footer;
