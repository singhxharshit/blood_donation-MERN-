import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50" data-aos="fade-down">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-red-400">
          <Link to="/">Blood Donation</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 flex-wrap justify-center text-lg">
          <Link className="hover:text-red-300 transition" to="/">Home</Link>
          <Link className="hover:text-red-300 transition" to="/searchdonors">Search Donors</Link>

          {/* ✅ Now shown to any logged-in user */}
          {user && (
            <Link className="hover:text-red-300 transition" to="/register-donor">Register as Donor</Link>
          )}
        </div>

        {/* User Info + Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-300 hidden sm:inline">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1.5 rounded shadow transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="hover:text-red-300 transition" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
