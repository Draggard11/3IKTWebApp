import { Routes, Route, BrowserRouter, NavLink } from "react-router";
import "./styles/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{display: "flex", alignItems: 'center', flexDirection: 'column',}}>
          <h1>Vietnamese Blog</h1>
          <nav  style={{fontSize: 24}}>
            <NavLink to="/"> Home</NavLink> |
            <NavLink to="/login"> Login</NavLink>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
