import React from 'react';

function DonorCard({ donor }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
      <p><strong>Name:</strong> {donor.name}</p>
      <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
      <p><strong>Location:</strong> {donor.location}</p>
    </div>
  );
}

export default DonorCard;