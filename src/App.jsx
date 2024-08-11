import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import CreateBanner from './components/CreateBanner'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-banner" element={<CreateBanner/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
