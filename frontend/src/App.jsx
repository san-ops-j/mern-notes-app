import React from 'react'
import Signup from './pages/Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/homee'
import Login from './pages/login'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
