import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-16 px-4 text-white bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-lg font-bold mb-3">Job Portal</h2>
          <p>
            Empowering careers through opportunities. Discover, apply, and grow with the top employers globally.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>

        {/* Job Categories */}
        <div>
          <h3 className="font-semibold mb-3">Job Categories</h3>
          <ul className="space-y-2">
            <li><a href="/jobs?category=tech" className="hover:underline">Technology</a></li>
            <li><a href="/jobs?category=design" className="hover:underline">Design</a></li>
            <li><a href="/jobs?category=marketing" className="hover:underline">Marketing</a></li>
            <li><a href="/jobs?category=finance" className="hover:underline">Finance</a></li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Use</a></li>
            <li><a href="/support" className="hover:underline">Help Center</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="font-semibold mb-3">Stay Connected</h3>
          <form className="mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md text-sm text-white border-2"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 text-lg">
            <a href="#"><FaFacebook className="hover:text-blue-600" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400" /></a>
            <a href="#"><FaLinkedin className="hover:text-blue-700" /></a>
            <a href="#"><FaGithub className="hover:text-gray-800 dark:hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-xs px-4">
        &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
