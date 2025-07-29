import { CiMail, CiPhone } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import UpdateProfile from "../components/UpdateProfile";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/applications/applied`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setAppliedJobs(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAppliedJobs();
  }, []);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="relative min-h-screen w-full px-5 bg-[#0f172a] text-white pt-30">
      {user && isOpen && <UpdateProfile setIsOpen={setIsOpen} user={user} />}

      <div className="max-w-3xl relative  mx-auto pt-4">
        <FaEdit
          onClick={() => setIsOpen(true)}
          size={20}
          className="absolute text-gray-300 top-5 right-5 cursor-pointer"
        />

        {/* Profile Card */}
        <div className="p-5 border my-10 mt-0 rounded-lg border-gray-700 bg-[#1e293b] shadow">
          <div className="flex md:flex-row flex-col items-center gap-5">
            <img
              src={user.profile.profilePhoto}
              alt="profile"
              className="w-28 border-2 border-gray-600 rounded-full object-cover"
            />
            <div className="flex-1 text-center md:text-start">
              <h2 className="text-3xl mb-2 font-bold text-white">
                {user.fullName}
              </h2>
              <p className="text-sm text-gray-300">
                {user.profile.bio || "No bio found."}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center p-5 text-gray-300">
            <CiMail size={25} />
            <span>{user.email}</span>
          </div>
          <div className="flex gap-2 items-center px-5 text-gray-300">
            <CiPhone size={25} />
            <span>{user.phone}</span>
          </div>

          <h2 className="p-5 text-2xl text-white">Skills</h2>
          <div className="flex flex-wrap gap-3 px-5">
            {user.profile.skills.length === 0 ? (
              <p className="text-gray-400">
                You have not added any skills.
              </p>
            ) : (
              user.profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r bg-blue-800 text-white rounded-full px-4 py-1 text-sm shadow"
                >
                  {skill}
                </span>
              ))
            )}
          </div>

          <h2 className="px-5 pt-5 pb-2 text-2xl text-white">Resume</h2>
          {user.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline px-5"
            >
              {user.fullName}
            </a>
          ) : (
            <p className="text-gray-400 px-5">Resume not found.</p>
          )}
        </div>

        {/* Applied Jobs Table */}
        <div className="mb-0 pb-30">
          <h1 className="text-2xl font-semibold mb-5 text-white">
            Applied Jobs
          </h1>
          <div className="w-full overflow-auto rounded-lg shadow-sm bg-[#1e293b]">
            <table className="table-auto w-full text-left text-sm text-white">
              <thead>
                <tr className="bg-gray-700 text-gray-100">
                  <th className="px-4 py-3 font-medium rounded-tl">Date</th>
                  <th className="px-4 py-3 font-medium">Job Role</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium rounded-tr">Status</th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs?.filter(ap => ap?.job?.title).map((ap) => (
                  <tr key={ap._id} className="border-b border-gray-600">
                    <td className="px-4 py-3 text-gray-300">
                      {ap.createdAt?.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {ap.job.title}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {ap.job.company.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm bg-blue-800 text-white rounded-full px-3 py-1">
                        {ap.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
