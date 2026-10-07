import React from "react"; // Used by client
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import TodoList from './TodoList';
import Stats from './Stats';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Todo List</Link> | <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(<App />);