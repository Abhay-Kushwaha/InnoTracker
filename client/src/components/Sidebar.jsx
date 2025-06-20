import React, { useState, useEffect } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaChartLine, FaBookOpen, FaFileAlt, FaMoneyBillWave, FaRocket, FaAward, FaSignOutAlt, FaHome, FaCertificate, FaUser } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoSidebarCollapse } from "react-icons/go";
import { useAuth } from '../contexts/AuthContext';

// Accept isSidebarOpen and setIsSidebarOpen as props from a parent component
export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  // isMobileSidebarOpen state remains local to the Sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // This function now uses the setIsSidebarOpen prop
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const isActiveLink = (path) => location.pathname === path;

  const navigationItems = [
    { to: "/home", icon: MdSpaceDashboard, label: "Dashboard", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/innovation-metrics", icon: FaChartLine, label: "Innovation Metrics", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/research", icon: FaBookOpen, label: "Research Projects", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/publications", icon: FaFileAlt, label: "Publications", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/patents", icon: FaCertificate, label: "Patents", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/grants", icon: FaMoneyBillWave, label: "Grants & Funding", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/startup", icon: FaRocket, label: "Startups & Incubations", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/awards", icon: FaAward, label: "Recognition & Awards", roles: ['researcher', 'admin', 'faculty'] },
    { to: "/settings", icon: RiSettings4Fill, label: "Settings", roles: ['researcher', 'admin', 'faculty'] }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'researcher')
  );

  const renderNavItems = (items, mobile = false) => (
    items.map((item) => (
      <li key={item.to}>
        <Link
          to={item.to}
          className={`flex items-center ${mobile ? 'py-3 px-6' : 'px-6 py-3'} 
            ${mobile 
              ? `text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-zinc-700 
                 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200
                 ${isActiveLink(item.to) ? 'bg-indigo-100 dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 font-semibold' : ''}`
              : `hover:bg-[#014250] rounded transition text-white
                 ${isActiveLink(item.to) ? 'bg-[#014250]' : ''}`}`}
          onClick={mobile ? toggleMobileSidebar : undefined}
        >
          <item.icon className={`${mobile ? 'text-2xl mr-3' : 'mr-3'}`} />
          <span className={`${mobile ? 'text-lg' : ''} ${!isSidebarOpen && !mobile ? 'hidden' : ''}`}>
            {item.label}
          </span>
        </Link>
      </li>
    ))
  );

  return (
    <>
      {/* Mobile Header (replaces the top bar for mobile) */}
      <div className="font-poppins flex items-center justify-between p-4 bg-gradient-to-r from-[#006073] to-[#014250] md:hidden shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center">
          <button
            onClick={toggleMobileSidebar}
            className="text-white mr-3 text-2xl hover:text-gray-200"
            aria-label="Toggle mobile sidebar"
          >
            {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <span className="ml-3 text-2xl text-white font-bold">Inno Tracker</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200"
            aria-label="Logout"
          >
            <FaSignOutAlt className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[49] md:hidden"
          onClick={toggleMobileSidebar} // Close sidebar when clicking outside
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`font-poppins fixed inset-y-0 left-0 z-50 flex flex-col w-65 bg-gradient-to-r from-[#006073] to-[#014250] transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Mobile Sidebar"
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <span className="ml-3 text-2xl text-white font-bold">Inno Tracker</span>
          <button
            onClick={toggleMobileSidebar}
            className="ml-4 text-white text-xl hover:text-gray-200"
            aria-label="Close mobile sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Mobile User Info */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
            <FaUser className="text-gray-600" />
          </div>
          <div className="ml-3">
            <div className="text-white font-semibold">{user?.name || 'User'}</div>
            <div className="text-sm text-gray-300">{user?.department}</div>
          </div>
        </div>

        <ul className="font-medium mt-4 flex-grow overflow-y-auto">
          {renderNavItems(filteredNavItems, true)}
        </ul>

        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-[#014250] rounded transition"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        id="default-sidebar"
        className={`hidden md:block font-poppins fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out 
          bg-gradient-to-r from-[#006073] to-[#014250] ${isSidebarOpen ? "w-65" : "w-20"}`}
        aria-label="Desktop Sidebar"
      >
        <div className="h-full mt-5 overflow-y-auto flex flex-col">
          <div className={`flex items-center px-6 py-6 ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
            {isSidebarOpen && <span className="ml-3 text-2xl text-white font-bold">Inno Tracker</span>}
            <button 
              onClick={toggleSidebar} 
              className="text-white text-xl hover:text-gray-200" 
              aria-label="Toggle sidebar"
            >
              <GoSidebarCollapse />
            </button>
          </div>

          {/* Desktop User Info */}
          <div className={`flex flex-col items-center py-6 border-b border-[#014250] ${isSidebarOpen ? 'px-4' : 'px-2'}`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 mb-2">
              <FaUser className="text-gray-600" />
            </div>
            {isSidebarOpen && (
              <>
                <div className="font-bold text-white">{user?.name || 'User'}</div>
                <div className="text-xs text-gray-300">{user?.department}</div>
                <div className="text-xs text-gray-300 capitalize">{user?.role || 'Researcher'}</div>
              </>
            )}
          </div>

          <nav className="flex-1 mt-4">
            <ul className="space-y-2">
              {renderNavItems(filteredNavItems)}
            </ul>
          </nav>

          <div className="mt-auto border-t border-[#014250] p-4">
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-[#014250] rounded transition
                ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <FaSignOutAlt className={!isSidebarOpen ? '' : 'mr-3'} />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
} 