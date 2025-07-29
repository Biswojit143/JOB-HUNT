import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { allJobs } = useSelector(state => state.job);

  useEffect(() => {
    const getJobs = async () => {
      if (!query) {
        setJobs(allJobs);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs?keyword=${query}`);
        const data = await res.json();
        if (res.ok) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, [query]);

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {query ? `Search results for "${query}" (${jobs.length})` : 'Browse Jobs'}
        </h2>

        {loading ? (
          <p className="text-gray-300">Loading jobs...</p>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-300">
            No jobs found{query ? ` for "${query}"` : ''}.
          </p>
        )}
      </div>
    </section>
  );
};

export default Browse;
