import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaSave, FaMoon, FaSun } from 'react-icons/fa';

const SettingsPage = () => {
  // Sample user data (in a real app, this would be fetched from a backend)
  const [userInfo, setUserInfo] = useState({
    fullName: "Vineet Bhai",
    email: "bhai@example.com",
    phoneNumber: "+91 98765 43210",
    dateOfBirth: "1988-04-20",
    address: "123 Innovation Drive, Research City, 110001",
    bio: "Passionate researcher with a focus on AI ethics and sustainable technology. Dedicated to driving innovation for societal good.",
    profilePicture: "https://placehold.co/150x150/A78BFA/ffffff?text=RG", // Placeholder image
    darkModeEnabled: localStorage.getItem('darkMode') === 'true' // Read initial preference from local storage
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send userInfo to your backend here
    console.log("Saving user info:", userInfo);
    alert("Personal information updated successfully!");
    // You might want to disable the form or show a loading spinner here
  };

  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Settings
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 md:p-8" data-aos="fade-up" data-aos-delay="200">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-6 flex items-center">
          <FaUserCircle className="mr-3 text-3xl" /> Personal Information
        </h2>

        <div className="flex flex-col items-center mb-8">
          <img
            src={userInfo.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300 dark:border-indigo-600 shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/A78BFA/ffffff?text=RG"; }} // Fallback
          />
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1">Profile Picture URL (Optional)</label>
          <input
            type="url"
            id="profilePicture"
            name="profilePicture"
            value={userInfo.profilePicture}
            onChange={handleChange}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Paste image URL here"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={userInfo.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About Me / Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={userInfo.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
              placeholder="Tell us a little about yourself..."
            ></textarea>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;