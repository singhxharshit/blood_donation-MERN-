import React, { useState, useEffect } from 'react';
import DonorCard from '../components/DonorCard';
import { searchDonors } from '../api';
import { useAuth } from '../context/AuthContext'; // ✅ import auth context

function SearchDonors() {
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [location, setLocation] = useState('Delhi');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  
  const { token } = useAuth(); // ✅ get token from context

  useEffect(() => {
    if (!token) console.warn("🔐 No token found in context!");
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError('');
    setDonors([]);
    setSearched(false);

    try {
      // Call your API with both bloodGroup and location
      const res = await searchDonors(bloodGroup, location, token);

      setDonors(res);
      setSearched(true);
    } catch (err) {
      console.error("Search failed:", err);
      setError('Failed to search donors: ' + err.message);
    } finally {
      setLoading(false);
    }
    console.log("Searching for:", { bloodGroup, location });
    console.log("🔍 bloodGroup:", bloodGroup);
    console.log("📍 location:", location);
    console.log("🪪 token:", token);

  };

  return (
    <div className="p-6 text-black max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-red-600" data-aos="fade-up">
        Search Blood Donors
      </h1>

      <form onSubmit={handleSearch} className="grid sm:grid-cols-3 gap-4 mb-6" data-aos="fade-up">
        <select
          className="border px-4 py-2 rounded text-black"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
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

        <input
          type="text"
          className="border px-4 py-2 rounded text-black"
          placeholder="Enter City / Area"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-transform duration-300 transform hover:scale-105"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        

      </form>

      {error && <pre className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</pre>}


      {donors.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2" data-aos="fade-up">
          {donors.map((donor) => (
            <DonorCard key={donor._id} donor={donor} />
          ))}
        </div>
      ) : (
        searched && !loading && (
          <p className="text-gray-500 text-center">No matching donors found.</p>
        )
      )}
    </div>
  );
}

export default SearchDonors;
