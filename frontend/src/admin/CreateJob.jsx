import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateJob = () => {
  const { companies } = useSelector(state => state.company)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    jobType: '',
    experience: '',
    positions: '',
    companyId: '',
    salary: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if (data.success) {
        toast.success(data.message)
        navigate("/admin/jobs")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Error creating job.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white py-8">
      <h2 className="text-3xl font-semibold text-center text-purple-300 mb-6">Post a Job</h2>
      
      <form
        onSubmit={handleSubmit}
        className="grid bg-slate-800 p-8 rounded-xl max-w-4xl mx-auto w-full lg:grid-cols-2 grid-cols-1 gap-4 shadow-lg"
      >
        <input
          className="bg-slate-700 text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />

        <input
          className="bg-slate-700 text-white placeholder-gray-400 rounded-md p-3"
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience in years"
          required
        />

        <input
          className="bg-slate-700 text-white placeholder-gray-400 rounded-md p-3"
          type="number"
          name="positions"
          value={formData.positions}
          onChange={handleChange}
          placeholder="Number of Positions"
          required
        />

        <input
          className="bg-slate-700 text-white placeholder-gray-400 rounded-md p-3"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />

        <select
          className="bg-slate-700 text-white rounded-md p-3"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Job Type</option>
          <option value="Full-Time">Full Time</option>
          <option value="Part-Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <select
          className="bg-slate-700 text-white rounded-md p-3"
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Company</option>
          {
            companies.map((company) => (
              <option key={company._id} value={company._id}>{company.name}</option>
            ))
          }
        </select>

        <textarea
          className="bg-slate-700 text-white placeholder-gray-400 rounded-md p-3 lg:col-span-1"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
        ></textarea>

        <textarea
          className="bg-slate-700 text-white placeholder-gray-400 rounded-md p-3 lg:col-span-1"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Job Requirements"
          required
        ></textarea>

        <input
          className="bg-slate-700 text-white placeholder-gray-400 rounded-md p-3"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Job Location"
          required
        />

        <div className="col-span-full text-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            {loading ? 'Please wait ...' : 'Post Job'}
          </button>
        </div>
      </form>

      {companies.length === 0 && (
        <p className="text-red-400 text-center text-sm mt-6">
          Please register a company before creating a job.
        </p>
      )}
    </div>
  );
};

export default CreateJob;
