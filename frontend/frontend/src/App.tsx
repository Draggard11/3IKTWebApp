import { Routes, Route, BrowserRouter, NavLink } from "react-router";

import './styles/App.css';
import './styles/palette.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import MakeBlogs from "./components/MakeBlogs"
import GetUsername from "./components/GetUsername";
import { UserProvider, useUsername } from "./components/UserContext";

function App() {

  const logoutTest = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",  // required so the cookie gets cleared
    });
  // clear any local state, redirect to login, etc.
  };

  const username = useUsername();

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <div id="container">
          <h1 style={{fontSize: 38}}>Đừng Nước Mắm</h1>
          <nav id="navlink">
            <NavLink to="/"> Home</NavLink> |
            <NavLink to="/login"> Login/Register</NavLink> |
            <a> {username}</a> |
            <button onClick={() => logoutTest()}> Logout</button>
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
      </UserProvider>
    </>
  );
}

export default App;
