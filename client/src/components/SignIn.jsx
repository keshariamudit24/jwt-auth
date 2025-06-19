import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignIn({ setIsSignedIn, setUsername }) {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', formData)
      if(response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        toast.success('Successfully signed in!')
        setUsername(formData.username)
        setIsSignedIn(true)
        navigate('/')
      }
    } catch (error) {
      toast.error('Sign in failed. Please check your credentials.')
      console.error('Signin error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
