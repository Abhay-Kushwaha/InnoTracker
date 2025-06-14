import React, { useState, useEffect } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaChartLine, FaBookOpen, FaFileAlt, FaMoneyBillWave, FaRocket, FaAward, FaSignOutAlt } from "react-icons/fa"; // Import FaSignOutAlt
import { RiSettings4Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaBars, FaTimes } from "react-icons/fa"; // For mobile sidebar
import { GoSidebarCollapse } from "react-icons/go"; // For collapse button

// Accept isSidebarOpen and setIsSidebarOpen as props from a parent component
export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  // isMobileSidebarOpen state remains local to the Sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // The dark mode useEffect is good and can remain here or be moved to App.jsx
  useEffect(() => {
    // Attempt to read dark mode preference from localStorage
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true' || (storedDarkMode === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // This function now uses the setIsSidebarOpen prop
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const isActiveLink = (path) => location.pathname === path;

  const handleLogout = () => {
    // In a real application, you would clear user session/token here
    // e.g., localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      {/* Mobile Header (replaces the top bar for mobile) */}
      <div className="font-poppins flex items-center justify-between p-4 bg-gradient-to-r from-[#006073] to-[#014250] md:hidden shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center">
          <button
            onClick={toggleMobileSidebar}
            className="text-gray-500 mr-3 text-2xl hover:text-gray-900 dark:hover:text-white"
            aria-label="Toggle mobile sidebar"
          >
            {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span className="ml-3 text-2xl dark:text-white text-black font-bold">Inno Tracker</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[49] md:hidden"
          onClick={toggleMobileSidebar} // Close sidebar when clicking outside
        ></div>
      )}

      {/* Sidebar for Mobile */}
      <aside
        className={`font-poppins fixed inset-y-0 left-0 z-50 flex flex-col w-65 bg-gradient-to-r from-[#006073] to-[#014250] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="Mobile Sidebar"
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <span className="ml-3 text-2xl dark:text-white text-black font-bold">Inno Tracker</span>
          <button
            onClick={toggleMobileSidebar}
            className="ml-4 text-gray-500 text-xl hover:text-gray-900 dark:hover:text-white"
            aria-label="Close mobile sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <ul className="font-medium mt-4 flex-grow overflow-y-auto">
          {[
            { to: "/home", icon: MdSpaceDashboard, label: "Dashboard" },
            { to: "/innovation-metrics", icon: FaChartLine, label: "Innovation Metrics" },
            { to: "/research", icon: FaBookOpen, label: "Research Projects" },
            { to: "/publications", icon: FaFileAlt, label: "Publications" },
            { to: "/grants", icon: FaMoneyBillWave, label: "Grants & Funding" }, // Corrected path from /grant to /grants
            { to: "/startup", icon: FaRocket, label: "Startups & Incubations" },
            { to: "/awards", icon: FaAward, label: "Recognition & Awards" }, // Corrected path from /award to /awards
            { to: "/settings", icon: RiSettings4Fill, label: "Settings" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center py-3 px-6 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-zinc-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ${isActiveLink(item.to)
                  ? "bg-indigo-100 dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : ""
                  }`}
                onClick={toggleMobileSidebar} // Close sidebar on link click
              >
                <item.icon className="text-2xl mr-3" />
                <span className="text-lg">{item.label}</span>
              </Link>
            </li>
          ))}
          {/* Logout button for mobile */}
          <li className="mt-4">
            <button
              onClick={() => { handleLogout(); toggleMobileSidebar(); }} // Logout and close sidebar
              className="flex items-center py-3 px-6 w-full text-left text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
            >
              <FaSignOutAlt className="text-2xl mr-3" />
              <span className="text-lg">Logout</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        id="default-sidebar"
        className={`hidden md:block font-poppins fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-black bg-gradient-to-r from-[#006073] to-[#014250] ${isSidebarOpen ? "w-65" : "w-20" // Corrected width to w-65
          }`}
        aria-label="Desktop Sidebar"
      >
        <div className="h-full mt-5 overflow-y-auto flex flex-col">
          <div
            className={`flex items-center px-6 py-6 ${isSidebarOpen ? "justify-between" : "justify-center"
              }`}
          >
            {isSidebarOpen && <span className="ml-3 text-2xl text-white font-bold">Inno Tracker</span>}
            <button onClick={toggleSidebar} className="ml-4 text-white text-xl" aria-label="Toggle sidebar">
              <GoSidebarCollapse />
            </button>
          </div>

          <ul className="font-medium flex-grow">
            {[
              { to: "/home", icon: MdSpaceDashboard, label: "Dashboard" },
              { to: "/innovation-metrics", icon: FaChartLine, label: "Innovation Metrics" },
              { to: "/research", icon: FaBookOpen, label: "Research Projects" },
              { to: "/publications", icon: FaFileAlt, label: "Publications" },
              { to: "/grants", icon: FaMoneyBillWave, label: "Grants & Funding" }, // Corrected path
              { to: "/startup", icon: FaRocket, label: "Startups & Incubations" },
              { to: "/awards", icon: FaAward, label: "Recognition & Awards" }, // Corrected path
              { to: "/settings", icon: RiSettings4Fill, label: "Settings" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center py-3 px-6 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors duration-200 ${isActiveLink(item.to)
                    ? "bg-black dark:bg-black text-white font-semibold"
                    : ""
                    } ${!isSidebarOpen ? "justify-center px-0" : ""}`}
                >
                  <item.icon className={`text-2xl ${isSidebarOpen ? "mr-3" : ""}`} />
                  {isSidebarOpen && <span className="text-lg whitespace-nowrap">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <li className="mt-auto mb-4">
            <button
              onClick={handleLogout}
              className={`flex items-center py-3 px-6 mb-5 w-full text-left text-red-400 hover:bg-red-700 hover:text-white transition-colors duration-200
                                        ${!isSidebarOpen ? "justify-center px-0" : ""}`}
            >
              <FaSignOutAlt className={`text-2xl ${isSidebarOpen ? "mr-3" : ""}`} />
              {isSidebarOpen && <span className="text-lg whitespace-nowrap">Logout</span>}
            </button>
          </li>
        </div>
      </aside>
    </>
  );
} 