import { Routes, Route, BrowserRouter, NavLink } from "react-router";

import './styles/App.css';
import './styles/palette.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import MakeBlogs from "./components/MakeBlogs"
import { UserProvider, useUsername } from "./components/UserContext";

// App.tsx
function NavBar() {
  
  const {username} = useUsername(); // ✅ now inside UserProvider
  
  const logoutTest = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      alert("Logged out");
    }).catch((err) => {
      alert("Could not log out");
      console.log(err);
    })
  };

  return (
    <nav id="navlink">
      <NavLink to="/"> Home</NavLink> |
      <NavLink to="/login"> Login/Register</NavLink> |
      <a> {username}</a>
      {username !== 'anonymous' ? <button onClick={logoutTest}>| Logout</button> : ''}
    </nav>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div id="container">
          <h1 style={{ fontSize: 38 }}>Đừng Nước Mắm</h1>
          <NavBar />  {/* ✅ reads username inside UserProvider */}
          <h1 style={{ fontSize: 38 }}>Vietnamese Blog</h1>
        </div>
        <MakeBlogs />
        <br /><br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
export default App;
