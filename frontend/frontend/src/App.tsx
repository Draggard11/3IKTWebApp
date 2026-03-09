import { useEffect, useState } from 'react'
import './styles/App.css';
import Home from './pages/Home'

function App() {
  return (
    <>
      <div>
        {/*"ingrapon, ruva, VCSCHCIBP"*/}
        <h1>Vietnamese Blog</h1>
        <nav>
          <a> Home </a>| 
          <a> Blogs </a>| 
          <a> Login? </a>| 
          <a> Regsiter/Login </a>| 
          <a> Login/Register </a>|
          <a> Register? </a>
        </nav>
      </div>
      <div>
        <Home />
      </div>
    </>
  )
}

export default App
