import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersistLogin from "./logic/PersistLogin";

// pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/register" element={<Register />} ></Route>
          <Route path="/main" element={<Main />} ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
