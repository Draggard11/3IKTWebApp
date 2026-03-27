import { Routes, Route, BrowserRouter, NavLink } from "react-router";

import './styles/App.css';
import './styles/palette.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import MakeBlogs from "./components/MakeBlogs"
import GetUsername from "./components/GetUsername";

function App() {
  return (
    <>
      <BrowserRouter>
        <div id="container">
          <h1 style={{fontSize: 38}}>Đừng Nước Mắm</h1>
          <nav id="navlink">
            <NavLink to="/"> Home</NavLink> |
            <NavLink to="/login"> Login/Register</NavLink>
            <a><GetUsername /></a>
          </nav>
          <h1 style={{fontSize: 38}}>Vietnamese Blog</h1>
        </div>
        <MakeBlogs />
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
