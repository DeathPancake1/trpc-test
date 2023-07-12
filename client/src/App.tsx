import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Todo from "./pages/Todo";

function App() {
  return <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/todo/:id" element={<Todo />}></Route>
  </Routes>
}

export default App;