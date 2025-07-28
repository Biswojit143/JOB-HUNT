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
    <div className="h-full w-full bg-gray-50 text-gray-800 p-5">
      <div className="flex items-center justify-between gap-2">
        <label className="input input-bordered input-primary flex items-center gap-2 w-full max-w-xs">
          <svg
            className="h-5 w-5 opacity-50"
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
            className="grow"
            placeholder="Search companies"
          />
        </label>

        <button
          className="btn btn-primary px-6 py-2 font-semibold"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          <thead className="bg-gray-100 text-gray-700 text-sm">
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
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No Company found.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company._id}>
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
                        <div className="font-semibold">{company.name}</div>
                        <div className="text-sm text-gray-500">
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
                      className="text-primary underline"
                    >
                      Website
                    </a>
                  </td>
                  <td>{format(company.createdAt, "MM/dd/yyyy")}</td>
                  <td>
                    <Link
                      className="btn btn-outline btn-primary"
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
