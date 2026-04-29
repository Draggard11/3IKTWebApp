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
      username.refreshUser();
      alert("Logged out");
    }).catch((err) => {
      alert("Could not log out");
      console.log(err);
    })
  };

  return (
    <div style={{ display: 'flex', borderWidth: 3, borderStyle: 'inset', borderColor: '#99d199', padding: 12, borderRadius: 16, backgroundColor: '#fcfaf8', justifyContent: 'center', alignItems: 'center' }}>
      <nav id="navlink">
        <NavLink to="/">Home</NavLink>
        <br /><br />
        <NavLink to="/login">Login/Register</NavLink>
        <br /><br />
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
          <a style={{color: 'black', display: 'flex', alignItems: 'center', gap: 8}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1d1d1d"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z"/></svg>
            {username.username}</a>
            <div style={{flex: 1}} />
            {username.username !== 'anonymous' ? <button onClick={logoutTest}>Logout</button> : ''}
        </div>
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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: username.username === 'anonymous' ? 'flex-start' : 'center' }}>
          <div className="container">
            <img src={blogLogo} alt="Website logo" width={175} />
          <div style={{ margin: 12 }} />
          <NavBar />
        </div>

        <div style={{ margin: 12 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {/* ✅ This will now work because it's inside the Provider */}
          
          {username.username !== 'anonymous' ? 
            <button onClick={() => <MakeBlogs />}>Create blog post</button> : ''
          }
        </div>

        <div style={{ flex: 1 }} />

        </div>
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
