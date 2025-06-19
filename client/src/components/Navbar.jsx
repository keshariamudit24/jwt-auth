import { Link } from 'react-router-dom'

export default function Navbar({ isSignedIn, username, onLogout }) {

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">Logo</Link>
          
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link to="/signin" className="px-4 py-2 text-gray-800 hover:text-gray-600">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-800">Hello, {username}</span>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
