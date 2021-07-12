import Todos from "./components/Todos";
import Footer from "./components/Footer";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">todos</h1>
      <div className="app-box">
        <AddTodo />
        <Todos />
        <Footer />
      </div>
    </div>
  );
}

export default App;
