import React from 'react';
import { Link } from 'react-router-dom';

const JobHuntSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Find Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r  from-cyan-400 to-blue-500">
              Dream Job
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Explore thousands of verified listings and connect with top companies. Let JobHunt guide you toward your ideal career path — faster and smarter.
          </p>

          <Link to="/jobs">
            <button className=" text-sm rounded-full cursor-pointer hover:bg-blue-900 border border-blue-700 px-5 py-2 bg-blue-800 text-white transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right Image with Styling */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-br from-purple-200 via-blue-200 to-transparent rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
          <img
            src="https://media.istockphoto.com/id/537503733/photo/businessman-search-for-dream-job.jpg?s=612x612&w=0&k=20&c=RxaI6YNAOQKyJTnaP_xX9HN6dfFbPwIb68MAKUjehAg="
            alt="Job hunt illustration"
            className="relative z-10 rounded-2xl shadow-xl ring-4 ring-purple-300 dark:ring-blue-800"
          />
        </div>
      </div>
    </section>
  );
};

export default JobHuntSection;
