import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUser } from "../app/slices/authSlice";

const UpdateProfile = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user.profile?.bio || '');
  const [skills, setSkills] = useState(user?.profile?.skills?.join(',') || '');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('skills', skills);
    formData.append('bio', bio);
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);
    if (resume) formData.append('resume', resume);

    dispatch(setIsLoading(true));

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/update/profile`, {
        method: "POST",
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        setIsOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center px-2">
      <div className="relative max-w-xl w-full bg-gray-50 dark:bg-gray-900 custom-shadow p-6 rounded-lg">
        
        {/* Close X Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Update Profile
        </h2>

        <form className="space-y-4" onSubmit={handleUpdateProfile}>
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-1">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              placeholder="e.g., React, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="border rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </div>

          {/* Profile Photo */}
          <div className="flex flex-col gap-1">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="border rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Resume */}
          <div className="flex flex-col gap-1">
            <label htmlFor="resume">Resume</label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="border rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little about yourself..."
              className="border rounded-xl resize-none border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            {isLoading ? 'Please wait...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
