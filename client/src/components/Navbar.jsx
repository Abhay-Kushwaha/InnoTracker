import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../assets/img/logo.png'; // Adjust path if necessary

const Navbar = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <nav className="bg-[#e9eeef] shadow-md py-2">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between" data-aos="slide-right">
        <a className="navbar-brand mx-5" href="#">
          <img src={logo} alt="Innovation Portal Logo" className="w-[130px] h-[70px]" />
        </a>
        <button
          className="lg:hidden navbar-toggler text-gray-700 focus:outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span> {/* You might want a custom icon here */}
        </button>
        <div className="hidden lg:flex flex-grow items-center justify-end" id="navbarNav">
          <ul className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6 mr-3">
            <li><a className="nav-link text-black font-semibold text-sm hover:text-[#08528f] hover:underline active" href="home.html">Home</a></li>
            <li><a className="nav-link text-black font-semibold text-sm hover:text-[#08528f] hover:underline" href="#features">Features</a></li>
            <li><a className="nav-link text-black font-semibold text-sm hover:text-[#08528f] hover:underline" href="#review">Reviews</a></li>
            <li><a className="nav-link text-black font-semibold text-sm hover:text-[#08528f] hover:underline" target="_blank" href="/contact">Contact Us</a></li>
            <li><a className="nav-link text-black font-semibold text-sm hover:text-[#08528f] hover:underline" target="_blank" href="/feedback">Feedback</a></li>
            <li><a className="nav-link text-black font-semibold text-sm hover:text-[#08528f] hover:underline" target="_blank" href="/faq">FAQ</a></li>
          </ul>
          <div className="ml-3">
            <select className="form-select border border-gray-300 rounded px-3 py-2 text-gray-700 text-sm" aria-label="Language selection">
              <option selected>English</option>
              <option value="1">हिंदी (Hindi)</option>
              <option value="2">Español (Spanish)</option>
              <option value="3">Français (French)</option>
              <option value="3">Telugu</option>
            </select>
          </div>
          <div className="bg-[#006073] py-2 px-6 rounded-full mx-5 text-white cursor-pointer">
            <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;