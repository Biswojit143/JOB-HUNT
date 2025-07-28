import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Applicants = () => {
  const [applications, setApplications] = useState([]);
  const { id } = useParams();

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/applications/update/${applicationId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ status }),
        }
      );

      const resData = await res.json();

      if (resData.success) {
        toast.success(resData.message);

        // Update the local state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? resData.application : app
          )
        );
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const getApplicantions = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/applications/applicants/${id}`,
          {
            credentials: 'include',
          }
        );

        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    };

    getApplicantions();
  }, [id]);

  if (applications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <p className="text-xl">No applicants found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 overflow-x-auto">
      <h2 className="text-3xl font-semibold mb-6">Applicants</h2>
      <table className="min-w-full text-left text-sm border border-gray-700 rounded overflow-hidden">
        <thead className="bg-gray-800 text-white uppercase text-xs">
          <tr>
            <th className="px-4 py-3 border-b border-gray-700">Name</th>
            <th className="px-4 py-3 border-b border-gray-700">Email</th>
            <th className="px-4 py-3 border-b border-gray-700">Contact</th>
            <th className="px-4 py-3 border-b border-gray-700">Resume</th>
            <th className="px-4 py-3 border-b border-gray-700">Date</th>
            <th className="px-4 py-3 border-b border-gray-700">Status</th>
            <th className="px-4 py-3 border-b border-gray-700">Action</th>
          </tr>
        </thead>
        <tbody className="bg-[#1e293b] divide-y divide-gray-700">
          {applications.map((application) => (
            <tr key={application._id} className="hover:bg-gray-700 transition">
              <td className="px-4 py-3">{application.applicant.fullName}</td>
              <td className="px-4 py-3">{application.applicant.email}</td>
              <td className="px-4 py-3">{application.applicant.phone}</td>
              <td className="px-4 py-3">
                <a
                  href={application.applicant.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-400 hover:text-blue-300"
                >
                  View Resume
                </a>
              </td>
              <td className="px-4 py-3">
                {application.createdAt.slice(0, 10)}
              </td>
              <td className="px-4 py-3 capitalize">
                {application.status || 'Pending'}
              </td>
              <td className="px-4 py-3">
                <select
                  name="status"
                  id="status"
                  value={application.status || ''}
                  onChange={(e) =>
                    updateStatus(application._id, e.target.value)
                  }
                  className="bg-gray-800 text-white border border-gray-600 px-3 py-1 rounded focus:outline-none"
                >
                  <option disabled value="">
                    -- Select --
                  </option>
                  <option value="accepted">Accept</option>
                  <option value="rejected">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applicants;
