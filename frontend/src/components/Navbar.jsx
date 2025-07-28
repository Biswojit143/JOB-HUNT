import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiUser, CiLogout } from "react-icons/ci";

const Navbar = ({ onLogout }) => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="custom-shadow z-50 sticky top-0 px-3 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl w-full mx-auto py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src="/logo.jpg" alt="logo" className="w-8 h-8 rounded-lg" />
          <h2 className="text-2xl font-bold">
            Job<span className="text-purple-600">Hunt</span>
          </h2>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-5">
          <ul className="flex items-center gap-5">
            <li className="hidden md:block">
              <Link to={"/"} className="hover:text-purple-600 transition">Home</Link>
            </li>
            <li>
              <Link to={"/jobs"} className="hover:text-purple-600 transition">Jobs</Link>
            </li>
            <li>
              <Link to={"/browse"} className="hover:text-purple-600 transition">Browse</Link>
            </li>
          </ul>

          {/* Auth / Profile Section */}
          {user ? (
            <div
              className="relative cursor-pointer border-2 rounded-full border-gray-300 dark:border-gray-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={user.profile.profilePhoto}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              {isOpen && (
                <div className="absolute flex flex-col items-start gap-2 custom-shadow rounded-xl top-12 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-44 px-2 py-4">
                  <Link
                    to={"/profile"}
                    className="flex gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 items-center"
                  >
                    <CiUser size={20} />
                    View Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex gap-2 w-full p-2 rounded-lg items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <CiLogout size={20} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
