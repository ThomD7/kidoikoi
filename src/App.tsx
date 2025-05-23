import React from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/home'
import Results from './pages/results'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App
