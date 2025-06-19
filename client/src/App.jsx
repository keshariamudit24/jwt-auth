import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import './App.css'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [username, setUsername] = useState('')

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar isSignedIn={isSignedIn} username={username} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignUp setIsSignedIn={setIsSignedIn} setUsername={setUsername} />} />
          <Route path="/signin" element={<SignIn setIsSignedIn={setIsSignedIn} setUsername={setUsername} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
