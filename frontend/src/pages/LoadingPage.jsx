import React from 'react';

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingPage;
