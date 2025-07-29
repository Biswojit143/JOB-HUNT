import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const typeColors = {
  'Full-time': 'from-green-400 to-green-600',
  'Part-time': 'from-blue-400 to-blue-600',
  Internship: 'from-purple-400 to-purple-600',
  Contract: 'from-orange-400 to-orange-600',
  Remote: 'from-indigo-400 to-indigo-600',
  default: 'from-gray-300 to-gray-500',
};

const LatestJobs = () => {
  const { allJobs, isLoading } = useSelector((state) => state.job);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1 className="text-3xl font-medium text-gray-600">Jobs are loading...</h1>
      </div>
    );
  }

  if (!allJobs || allJobs.length === 0) {
    return <p className="text-center py-10 px-5 text-xl">No job available.</p>;
  }

  return (
   <section className="py-16 px-4 text-white dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-5xl font-bold mb-10 text-center">
  <span>Latest </span>
  <span className="text-cyan-400 ">Jobs</span>
</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...allJobs].reverse().slice(0, 6).map((job) => {
            const logo = job.company?.logo || job.companyLogo || 'https://via.placeholder.com/40';
            const companyName = job.company?.name || job.companyName || 'Unknown Company';
            const jobType = job.type || job.jobType || job.details?.type || 'Other';
            const positions = job.positions || 'N/A';
            const salary = job.salary || 'N/A';
            const borderColor = typeColors[jobType] || typeColors.default;

            return (
              <div
                key={job._id}
                onClick={() => navigate(`/job/${job._id}`)}
                className={`relative flex flex-col justify-between h-full w-full bg-white dark:bg-gray-800 dark:text-white rounded-xl border-2 border-transparent bg-clip-padding p-[2px] hover:shadow-lg transition cursor-pointer bg-gradient-to-br ${borderColor}`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg h-full p-5">

                  {/* Company Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={logo}
                      alt="Company Logo"
                      className="w-12 h-12 object-cover rounded-full border dark:border-gray-600"
                    />
                    <div className="text-left">
                      <p className="text-lg font-semibold">{companyName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.location || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  {/* Job Title */}
                  <div className="mb-3">
                    <h3
                      className="text-xl font-bold mb-1 truncate"
                      title={job.title}
                    >
                      {job.title}
                    </h3>
                    <p
                      className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2"
                      title={job.description}
                    >
                      {job.description || 'No description available.'}
                    </p>
                  </div>

                  {/* Job Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full border text-sm font-semibold text-black dark:text-white">
                      {positions} positions
                    </span>
                    <span className="px-3 py-1 rounded-full border text-sm font-semibold text-white">
                      {jobType}
                    </span>
                    <span className="px-3 py-1 rounded-full border text-sm font-semibold text-white">
                      ₹{salary}
                    </span>
                    {job.quickApply && (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                        Quick Apply
                      </span>
                    )}
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/job/${job._id}`);
                    }}
                    className="w-full text-sm rounded-full cursor-pointer hover:bg-blue-900 border border-blue-700 px-5 py-2 bg-blue-800 text-white transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore More Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/browse")}
            className="bg-blue-800 text-white px-6 py-3 rounded-full hover:bg-blue-900 transition"
          >
            Explore More Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
