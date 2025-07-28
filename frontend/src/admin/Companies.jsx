import { useSelector } from "react-redux";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();

  const { companies } = useSelector((state) => state.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredCompanies(
      companies.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, companies]);

  return (
    <div className="h-full w-full bg-slate-900 text-white p-5">
      <div className="flex items-center justify-between gap-2">
        <label className="flex items-center gap-2 w-full max-w-xs bg-slate-800 px-3 py-2 rounded-md shadow-md">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
            placeholder="Search companies"
          />
        </label>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>

      <div className="overflow-x-auto mt-6 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-slate-800 text-purple-300 text-sm">
            <tr>
              <th>Company</th>
              <th>Website</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          {filteredCompanies.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-400">
                  No Company found.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr
                  key={company._id}
                  className={`${
                    index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                  } hover:bg-slate-700 transition`}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={company.logo || "/logo.jpg"}
                            alt="Company Logo"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {company.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {company.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 underline"
                    >
                      Website
                    </a>
                  </td>
                  <td className="text-gray-300">
                    {format(new Date(company.createdAt), "MM/dd/yyyy")}
                  </td>
                  <td>
                    <Link
                      className="btn btn-outline text-purple-400 border-purple-500 hover:bg-purple-700 hover:text-white"
                      to={`/admin/companies/setup/${company._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Companies;
