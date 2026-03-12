import { Routes, Route, BrowserRouter, NavLink } from "react-router";
import "./styles/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <div id="container">
          <h1 style={{fontSize: 38}}>Vietnamese Blog</h1>
          <nav id="navlink">
            <NavLink to="/"> Home</NavLink> |
            <NavLink to="/login"> Login/Register</NavLink>
          </nav>
        </div>
        <br /><br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
