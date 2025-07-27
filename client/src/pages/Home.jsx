import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="bg-red-700 py-20 px-6 text-center" data-aos="zoom-in">
        <h1 className="text-5xl font-bold mb-6 tracking-wide">Welcome to Blood Donation Portal</h1>
        <p className="text-xl mb-8 text-gray-100">Your blood can save lives. Join our donor community today.</p>
        <Link
          to="/register-donor"
          className="bg-white text-red-700 px-8 py-3 rounded font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          Register as Donor
        </Link>
      </section>

      {/* Info Section */}
      <section className="py-20 px-6 bg-gray-800 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-semibold mb-5 text-white">Why Donate Blood?</h2>
        <p className="max-w-xl mx-auto text-lg text-gray-300 leading-relaxed">
          Every 2 seconds, someone in need is searching for a blood donor. Your contribution matters. Help reduce the shortage and be a hero.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-6 text-center" data-aos="fade-in">
        <p>&copy; {new Date().getFullYear()} Blood Donation Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
