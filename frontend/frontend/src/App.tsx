import React from "react";
import { Routes, Route, BrowserRouter, NavLink } from "react-router";

import './styles/App.css';
import './styles/palette.css';
import blogLogo from '../src/assets/iktblog.png';

import Home from "./pages/Home";
import Login from "./pages/Login";
import MakeBlogs from "./components/MakeBlogs"
import { UserProvider, useUsername } from "./components/UserContext";

// App.tsx
function NavBar() {

  const username = useUsername(); // ✅ now inside UserProvider

  const logoutTest = async () => {
    await fetch("http://127.0.0.1:5000/api/logout", {
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
    <div style={{ borderWidth: 3, borderStyle: 'inset', borderColor: '#99d199', padding: 8, borderRadius: 16, backgroundColor: '#fcfaf8' }}>
      <nav id="navlink">
        <NavLink to="/"> Home</NavLink> |
        <NavLink to="/login"> Login/Register</NavLink> |
        <a> {username.username}</a> |
        {username.username !== 'anonymous' ? <button onClick={logoutTest}>Logout</button> : ''}
      </nav>
    </div>
  );
}

// 1. Create a separate component for your layout/content
function MainContent() {
  const username = useUsername();

  React.useEffect(() => {
    username.refreshUser();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#99d199', padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'blue', justifyContent: username.username === 'anonymous' ? 'flex-start' : 'center' }}>
          <div className="container">
            <img src={blogLogo} alt="Website logo" width={300} />
          </div>
          <div style={{ margin: 12 }} />
          <NavBar />
        </div>

        <div style={{ margin: 12 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: username.username === 'anonymous' ? 'center' : 'flex-start', width: '100%', marginLeft: 24 }}>
          {/* ✅ This will now work because it's inside the Provider */}
          {username.username !== 'anonymous' ? <MakeBlogs /> : null}
        </div>

        <div style={{ flex: 0 }} />

      </div>

      <br /><br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

// 2. Keep App.tsx clean with just the Provider
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </UserProvider>
  );
}
export default App;
