import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const floatingLogos = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXveT_wtxB2CwGBTsK_Fa5E87tp3n6CjxH5Q&s",
    style: "top-40 left-1/4 -translate-x-1/2 w-20 h-20 rounded-xl",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    style: "top-24 right-10 w-20 h-20 ",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    style: "bottom-10 left-10 w-20 h-20",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    style: "bottom-24 right-5 w-20 h-20",
  },
];

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/browse?query=${query}`);
  };

  return (
    <section className="py-16 px-4 text-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-10 py-0">
        {/* Left content */}
        <div className="w-full md:w-1/2 flex flex-col justify-between z-10 md:mt-32">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-center md:text-left">
            Find your <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              dream job
            </span>{" "}
            here <br /> easily and quickly
          </h1>

          <p className="text-gray-300 mb-8 text-lg max-w-md text-center md:text-left mx-auto md:mx-0">
            Small to large companies open job vacancies here. Find and apply for
            your dream job easily.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 bg-[#1E2233] rounded-full px-5 py-3 shadow-inner max-w-xl mx-auto md:mx-0"
          >
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search job title or company"
              className="flex-grow text-white bg-transparent focus:outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-5 py-2 rounded-full hover:bg-blue-900 transition"
            >
              Search Job
            </button>
          </form>

          {/* Company Logos */}
          <div className="p-6 mt-28 flex justify-center md:justify-start gap-8 flex-wrap">
            {["windows8", "linkedin", "apex", "slack", "google", "facebook"].map((logo) => (
              <img
                key={logo}
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logo}/${logo}-original.svg`}
                alt={logo}
                className="w-14 h-14"
              />
            ))}
          </div>
        </div>

        {/* Right image with floating logos */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          <img
            src="https://static.virtubox.io/project/file/20210825-075257-1spj-image-removebg-preview.png"
            alt="Hero person"
            className="w-full max-w-lg object-contain mask-b-from-50%"
          />
          {floatingLogos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt="Floating logo"
              className={`absolute ${logo.style} animate-float`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
