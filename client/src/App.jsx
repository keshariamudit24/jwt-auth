import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import './App.css'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsSignedIn(true);
      setUsername(username || '');
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('username');
    setIsSignedIn(false);
    setUsername('');
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar isSignedIn={isSignedIn} username={username} onLogout={handleLogout} />
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
