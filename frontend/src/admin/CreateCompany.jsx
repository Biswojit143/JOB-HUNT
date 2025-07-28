import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/companies/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      );
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        navigate(`/admin/companies/setup/${data.company._id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="mx-auto my-10 md:w-[400px] w-full rounded-xl p-6 bg-slate-800 text-white shadow-lg">
      <h1 className="text-3xl font-semibold text-purple-300 mb-5 text-center">
        Register Company
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <fieldset className="mb-4">
          <legend className="block mb-1 font-semibold text-sm text-purple-200">
            Enter company name
          </legend>
          <input
            type="text"
            className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            required
          />
        </fieldset>
        <button
          type="submit"
          className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
