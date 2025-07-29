import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';
import NotFound from './NotFound';
import { toast } from 'react-toastify';

const JobDetails = () => {
  const { user } = useSelector(state => state.auth);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const getJobDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
          setIsApplied(data.applications.some((app) => app.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getJobDetails();
  }, [id]);

  const handleApplyJob = async () => {
    if (!user) {
      return toast.error("You are not logged in.");
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/applications/apply/${id}`, {
        method: "POST",
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setJob(data.job);
        setIsApplied(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  if (loading) return <LoadingPage />;
  if (!job) return <NotFound />;

  return (
    <section className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex items-center gap-3 mb-5">
          <img src={job.company.logo} alt="" className="w-10 h-10 rounded-lg" />
          <h2 className="text-xl font-semibold text-white">{job.company.name}</h2>
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <button
            disabled={isApplied}
            onClick={handleApplyJob}
            className={`px-4 py-2 rounded-lg text-white transition ${
              isApplied
                ? 'bg-purple-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply'}
          </button>
        </div>

        <div className="flex flex-wrap items-center my-4 gap-3 text-sm font-semibold">
          <span className="rounded-full px-4 py-1 border border-gray-600 bg-gray-700 text-white">
            {job.positions} positions
          </span>
          <span className="rounded-full px-3 py-1 border border-purple-600 text-purple-400 bg-[#1e293b]">
            {job.jobType}
          </span>
          <span className="rounded-full px-3 py-1 border border-green-600 text-green-400 bg-[#1e293b]">
            {job.salary}
          </span>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-3 text-white">Job Description</h2>
        <p className="text-gray-300 leading-relaxed">{job.description}</p>

        <div className="flex items-center gap-3 my-5">
          <div className="text-xl bg-purple-700 p-2 rounded-full text-white">
            <CiLocationOn />
          </div>
          <span className="text-xl text-gray-200">{job.location}</span>
        </div>

        <h2 className="text-xl font-semibold my-4 text-white">Requirements</h2>
        <ul className="list-disc px-6 text-gray-300 space-y-2">
          {job.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col text-lg gap-4 text-gray-300">
          <p>
            Salary: <span className="text-white">{job.salary}</span>
          </p>
          <p>
            Experience: <span className="text-white">{job.experience}</span> Year
          </p>
          <p>
            Total Applicants: <span className="text-white">{job.applications.length}</span>
          </p>
          <p>Posted Date: {job.createdAt.slice(0, 10)}</p>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
