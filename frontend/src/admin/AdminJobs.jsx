import { useSelector } from "react-redux";
import useGetAdminJobs from "../hooks/useGetAdminJobs";
import { Link } from "react-router-dom";

const AdminJobs = () => {
  useGetAdminJobs();

  const { jobs } = useSelector((state) => state.job);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <p className="text-xl">No jobs found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f172a] text-white px-5 py-10">
      <div className="overflow-x-auto mt-5 border border-gray-700 rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-gray-800 text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-3 border-b border-gray-700">Company</th>
              <th className="px-6 py-3 border-b border-gray-700">Role</th>
              <th className="px-6 py-3 border-b border-gray-700">Date</th>
              <th className="px-6 py-3 border-b border-gray-700">Applicants</th>
            </tr>
          </thead>
          <tbody className="bg-[#1e293b] divide-y divide-gray-700">
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-700 transition">
                <td className="px-6 py-4">{job.company?.name ?? "No company"}</td>
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4">{job.createdAt.slice(0, 10)}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/jobs/${job._id}/applicants`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-xs font-semibold"
                  >
                    Applicants
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminJobs;
