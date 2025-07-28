import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SetupCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        location: '',
        description: ''
    });
    const [logo, setLogo] = useState(null);
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchCompany = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/companies/${id}`);
                const data = await res.json();

                if (data.success) {
                    const { name, website, location, description } = data.company;
                    setFormData({ name, website, location, description });
                    setCompany(data.company);
                } else {
                    setCompany(null);
                    toast.error(data.message || "Company not found");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch company data.");
                setCompany(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            return toast.error("Company name is required.");
        }

        const payload = new FormData();
        for (let key in formData) {
            payload.append(key, formData[key]);
        }
        if (logo) {
            payload.append("logo", logo);
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/companies/update/${id}`, {
                method: "PUT",
                credentials: "include",
                body: payload
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message || "Company updated successfully.");
                navigate("/admin/companies");
            } else {
                toast.error(data.message || "Update failed.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return <p className="text-white p-5">Loading company data...</p>;
    if (!company) return <p className="text-red-400 p-5">Company not found.</p>;

    return (
        <div className="w-full p-5 bg-slate-900 text-white rounded-xl shadow-lg">
            <div className="px-5 mb-3">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
            <h1 className="text-3xl font-bold text-white p-5">Company Setup</h1>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row flex-wrap">
                {[
                    { label: "Company Name", name: "name", type: "text" },
                    { label: "Company Website", name: "website", type: "url" },
                    { label: "Company Location", name: "location", type: "text" },
                ].map(({ label, name, type }) => (
                    <div className="lg:w-1/2 w-full px-5 mb-6" key={name}>
                        <label className="block text-sm font-medium text-purple-400 mb-1">
                            {label}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                    </div>
                ))}

                <div className="lg:w-1/2 w-full px-5 mb-6">
                    <label className="block text-sm font-medium text-purple-400 mb-1">
                        Upload Company Logo
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="w-full bg-slate-800 text-white border border-slate-700 file-input file-input-bordered"
                        name="logo"
                    />
                </div>

                <div className="w-full px-5 mb-6">
                    <label className="block text-sm font-medium text-purple-400 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-slate-800 text-white border border-slate-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        rows={4}
                    />
                </div>

                <div className="px-5">
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition"
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SetupCompany;
