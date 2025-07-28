import React from 'react';

const JobHuntSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Find Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
            Dream Job
          </span>
        </h1>

        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-6 h-6 text-purple-500 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6..." />
              </svg>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                Explore thousands of verified job listings and find the perfect match for your skills and passion. Let JobHunt guide your career journey.
              </p>
              <div className="inline-flex items-center">
                <img
                  alt="testimonial"
                  src="https://dummyimage.com/106x106"
                  className="w-12 h-12 rounded-full object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    JobHunt Team
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Your Career Partner
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 md:w-1/2 w-full">
            <div className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-6 h-6 text-purple-500 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6..." />
              </svg>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                Connect with industry-leading employers and stay updated with the latest opportunities. Your next big role is waiting.
              </p>
              <div className="inline-flex items-center">
                <img
                  alt="testimonial"
                  src="https://dummyimage.com/107x107"
                  className="w-12 h-12 rounded-full object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    JobHunt Team
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Your Career Partner
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobHuntSection;
