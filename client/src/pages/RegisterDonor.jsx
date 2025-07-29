import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterDonor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
    contactNumber: '',
    address: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      console.log("📤 Submitting registration:", formData);

      const res = await axios.post('http://localhost:5000/api/users/register', formData);

      console.log("✅ Registration success:", res.data);

      setSuccess(res.data.message || 'Registration successful!');
      setFormData({
        name: '',
        email: '',
        password: '',
        bloodGroup: '',
        contactNumber: '',
        address: ''
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error("❌ Registration error:", err.response || err);

      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.';

      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded shadow text-black" data-aos="zoom-in">
      <h2 className="text-2xl font-bold mb-4 text-center">Register as Donor</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded bg-white" />
        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded bg-white" />
        <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full border px-3 py-2 rounded bg-white" />
        
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded bg-white"
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <input type="text" name="contactNumber" placeholder="Contact Number" required value={formData.contactNumber} onChange={handleChange} className="w-full border px-3 py-2 rounded bg-white" />
        <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleChange} className="w-full border px-3 py-2 rounded bg-white" />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterDonor;
