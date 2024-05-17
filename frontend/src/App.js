import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
