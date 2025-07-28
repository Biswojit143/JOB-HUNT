import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white">404 - Page Not Found</h2>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold rounded-lg transition duration-300"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
