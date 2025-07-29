import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { useState } from 'react';

const JobCard = ({ job, layout = 'grid' }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const result = formatDistance(new Date(job.createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <div
      className={`$ {
        layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col'
      } gap-4 p-5 custom-shadow rounded-2xl bg-white dark:bg-gray-800 transition hover:shadow-lg mt-20`}
    >
      {/* Bookmark & Time */}
      <div className="flex items-center justify-between w-full text-gray-500 dark:text-gray-400">
        <span className="text-sm">{result}</span>
        <button onClick={() => setBookmarked(!bookmarked)}>
          {bookmarked ? (
            <FaBookmark className="text-blue-600" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>

      {/* Top Content */}
      <div className="flex items-center gap-4">
        <img
          src={job.company.logo || '/logo.jpg'}
          alt="company_logo"
          className="w-12 h-12 rounded-lg object-cover"
        />

        <div className="flex flex-col">
          <h5 className="font-semibold text-gray-800 dark:text-white">
            {job.company.name}
          </h5>
          <h6 className="text-sm text-gray-600 dark:text-gray-300">
            {job.location}
          </h6>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
        {job.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
        {job.description || 'No description provided.'}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 my-3">
        <span className="rounded-full px-3 py-1 text-sm text-white">
          {job.positions} positions
        </span>
        <span className="rounded-full px-3 py-1 text-sm text-white">
          {job.jobType}
        </span>
        <span className="rounded-full px-3 py-1 text-sm text-white">
          ₹{job.salary}
        </span>
      </div>

      {/* Action */}
      <button
        onClick={() => navigate(`/job/${job._id}`)}
        type="button"
        className="bg-gradient-to-r  bg-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-5 py-2 rounded-full transition font-medium"
      >
        View Details
      </button>
    </div>
  );
};

export default JobCard;
