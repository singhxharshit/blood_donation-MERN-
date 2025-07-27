// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterDonor from './pages/RegisterDonor';
import SearchDonors from './pages/SearchDonors';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  console.log("Logged-in user:", user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchdonors" element={<SearchDonors />} />
        <Route path="/register-donor" element={<RegisterDonor />} />
      </Routes>
    </>
  );
}

export default App;
