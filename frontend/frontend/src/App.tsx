import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router";

import './styles/App.css';
import './styles/palette.css';
import blogLogo from '../src/assets/iktblog.png';

import Home from "./pages/Home";
import Login from "./pages/Login";
import MakeBlogs from "./components/MakeBlogs"
import { UserProvider, useUsername } from "./components/UserContext";
import NavBar from "./components/Navigator";

// 1. Create a separate component for your layout/content
function MainContent() {
  const username = useUsername();

  const [showBlog, setShowBlog] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);


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
              <button onClick={() => setShowBlog(!showBlog)}>{showBlog ? 'Hide create blog post' : 'Create blog post'}</button> : ''
            }
          </div>
          <div style={{ flex: 1 }} />

        </div>
      </div>
      {showBlog && <MakeBlogs onSuccess={() => setRefreshKey(k => k + 1)} />}
      <br /><br />

      <Routes>
        <Route path="/" element={<Home refreshKey={refreshKey} />} />
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
    </UserProvider>
  );
}
export default App;
