import { FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const result = formatDistance(new Date(job.createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col gap-2 p-4 custom-shadow rounded-lg bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-1 text-gray-600 dark:text-gray-400">
        <span className="text-sm">{result}</span>
        <FaRegBookmark />
      </div>

      <div className="flex gap-3 items-center">
        <img
          src={job.company.logo || '/logo.jpg'}
          alt="company_logo"
          className="w-10 h-10 rounded-lg object-cover"
        />

        <div className="flex flex-col gap-1 items-start justify-center">
          <h5 className="font-semibold leading-4 text-gray-800 dark:text-white">
            {job.company.name}
          </h5>
          <h6 className="text-sm leading-3 text-gray-600 dark:text-gray-300">
            {job.location}
          </h6>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {job.title}
      </h2>
      <p className="leading-5 text-sm text-gray-700 dark:text-gray-300">
        {job.description}
      </p>

      <div className="flex items-center my-2 text-sm gap-3 font-semibold">
        <span className="rounded-full px-4 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
          {job.positions} positions
        </span>
        <span className="rounded-full text-purple-600 px-3 py-1 border border-gray-300 dark:border-gray-600">
          {job.jobType}
        </span>
        <span className="rounded-full text-green-600 px-3 py-1 border border-gray-300 dark:border-gray-600">
          {job.salary}
        </span>
      </div>

      <button
        onClick={() => navigate(`/job/${job._id}`)}
        type="button"
        className="text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-white"
      >
        Details
      </button>
    </div>
  );
};

export default JobCard;
