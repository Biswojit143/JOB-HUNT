import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/browse?query=${query}`);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">Dream Job</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
          Search jobs, view recommendations, and apply directly through our portal.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto max-w-2xl w-full"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jobs by title, company, or skills..."
            className="w-full py-4 pl-12 pr-5 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
