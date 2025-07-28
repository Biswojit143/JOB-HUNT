import { useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { FaHome, FaBuilding, FaBriefcase, FaPlus, FaSignOutAlt } from "react-icons/fa";

const RecruiterLayout = ({ onLogout }) => {
  const { user, isLoading } = useSelector(state => state.auth);
  const location = useLocation();

  if (isLoading) return <LoadingPage />;
  if (!user || user.role !== "recruiter") return <Navigate to="/" />;

  const navItems = [
    { label: "Home", path: "", icon: <FaHome /> },
    { label: "All Companies", path: "companies", icon: <FaBuilding /> },
    { label: "All Jobs", path: "jobs", icon: <FaBriefcase /> },
    { label: "Post Job", path: "jobs/create", icon: <FaPlus /> },
    { label: "New Company", path: "companies/create", icon: <FaPlus /> },
  ];

  return (
    <main className="h-screen w-full bg-gray-100 flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col bg-gradient-to-b from-purple-700 to-purple-900 text-white w-80 p-6 shadow-lg sticky top-0">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.jpg" alt="logo" className="w-10 h-10 rounded-lg shadow" />
          <h1 className="text-2xl font-bold tracking-wide">
            Job<span className="text-yellow-300">Hunt</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                location.pathname.includes(item.path)
                  ? "bg-purple-600 text-yellow-300 font-semibold"
                  : "hover:bg-purple-800 hover:text-yellow-200"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Mobile Drawer */}
      <div className="lg:hidden drawer w-full">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="mobile-drawer" className="btn btn-outline btn-sm">
              ☰
            </label>
            <h2 className="text-xl font-semibold">Recruiter Dashboard</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4 h-[90vh] overflow-y-auto">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side z-50">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <ul className="menu p-6 w-80 bg-purple-800 text-white min-h-full">
            <div className="mb-6">
              <Link to="/" className="text-2xl font-bold tracking-wide text-yellow-300">
                JobHunt
              </Link>
            </div>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 hover:bg-purple-700 px-4 py-2 rounded-md transition-all"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-6">
              <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content (Desktop) */}
      <div className="hidden lg:flex flex-col flex-grow p-6 overflow-auto">
        <div className="bg-white rounded-lg shadow p-6 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default RecruiterLayout;
