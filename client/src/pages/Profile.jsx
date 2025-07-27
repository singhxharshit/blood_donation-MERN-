import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) return <p className="page-container">Please login to view profile.</p>;

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold text-red-500 mb-6">Profile</h2>
      <p><strong>Name:</strong> {user.name || 'N/A'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Blood Group:</strong> {user.bloodGroup || 'N/A'}</p>
      <p><strong>Location:</strong> {user.location || 'N/A'}</p>
    </div>
  );
}

export default Profile;