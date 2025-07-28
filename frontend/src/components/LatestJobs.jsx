import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          navigation={true}
          autoplay={{ delay: 3000 }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {allJobs.slice(0, 6).map((job) => {
            const logo = job.company?.logo || job.companyLogo || 'https://via.placeholder.com/40';
            const companyName = job.company?.name || job.companyName || 'Unknown Company';
            const jobType = job.type || job.jobType || job.details?.type || 'Other';
            const positions = job.positions || 'N/A';
            const salary = job.salary || 'N/A';
            const borderColor = typeColors[jobType] || typeColors.default;

            return (
              <SwiperSlide key={job._id}>
                <div
                  onClick={() => navigate(`/job/${job._id}`)}
                  className={`relative flex flex-col justify-between h-full w-full max-w-md mx-auto bg-white dark:bg-gray-800 dark:text-white rounded-xl border-2 border-transparent bg-clip-padding p-[2px] hover:shadow-lg transition cursor-pointer bg-gradient-to-br ${borderColor}`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg h-full p-5">
                    {/* Saved Icon */}
                    <div className="absolute top-2 right-2 z-10">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition" />
                    </div>

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
                      <span className="px-3 py-1 rounded-full border text-sm font-semibold text-purple-600">
                        {jobType}
                      </span>
                      <span className="px-3 py-1 rounded-full border text-sm font-semibold text-green-600">
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
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 mt-auto rounded-lg transition duration-300 font-medium"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestJobs;
