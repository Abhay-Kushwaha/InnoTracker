import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoSidebarCollapse } from "react-icons/go";
import { FaSignOutAlt, FaUniversity, FaChartBar, FaBalanceScale, FaUserCog } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useAuth } from '../../contexts/AuthContext';

const SidebarCollege = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
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

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const isActiveLink = (path) => location.pathname === path;

    const navItems = [
        { to: "/college/overview", icon: FaUniversity, label: "College Overview" },
        { to: "/college/results", icon: FaChartBar, label: "Innovation Results" },
        { to: "/college/comparison", icon: FaBalanceScale, label: "Compare Colleges" },
        { to: "/college/settings", icon: FaUserCog, label: "Settings" },
    ];

    const renderNavItems = (mobile = false) =>
        navItems.map((item) => (
            <li key={item.to}>
                <Link
                    to={item.to}
                    className={`flex items-center ${mobile ? 'py-3 px-6' : 'px-6 py-3'} ${mobile
                        ? 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-zinc-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200'
                        : 'hover:bg-[#014250] rounded transition text-white'} ${isActiveLink(item.to)
                            ? mobile
                                ? 'bg-indigo-100 dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 font-semibold'
                                : 'bg-[#014250]'
                            : ''}`}
                    onClick={mobile ? toggleMobileSidebar : undefined}
                >
                    <item.icon className={`${mobile ? 'text-2xl mr-3' : 'mr-3'}`} />
                    <span className={`${mobile ? 'text-lg' : ''} ${!isSidebarOpen && !mobile ? 'hidden' : ''}`}>
                        {item.label}
                    </span>
                </Link>
            </li>
        ));

    return (
        <React.Fragment>
            {/* Mobile Sidebar */}
            {isMobileSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[49] md:hidden" onClick={toggleMobileSidebar}></div>
            )}
            <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-65 bg-gradient-to-r from-[#006073] to-[#014250] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-between px-6 py-6">
                    <span className="ml-3 text-2xl text-white font-bold">College Panel</span>
                    <button onClick={toggleMobileSidebar} className="ml-4 text-white text-xl hover:text-gray-200"><FaTimes /></button>
                </div>
                <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center"><FaUser className="text-gray-600" /></div>
                    <div className="ml-3 text-white font-semibold">{user?.name || 'College'}</div>
                </div>
                <ul className="font-medium mt-4 flex-grow overflow-y-auto">{renderNavItems(true)}</ul>
                <div className="border-t border-gray-200 p-4">
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-[#014250] rounded transition"><FaSignOutAlt className="mr-3" /><span>Logout</span></button>
                </div>
            </aside>
            {/* Desktop Sidebar */}
            <aside className={`hidden md:block font-poppins fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-gradient-to-r from-[#006073] to-[#014250] ${isSidebarOpen ? "w-65" : "w-20"}`}>
                <div className="h-full mt-5 overflow-y-auto flex flex-col">
                    <div className={`flex items-center px-6 py-6 ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
                        {isSidebarOpen && <span className="ml-3 text-2xl text-white font-bold">College Panel</span>}
                        <button onClick={toggleSidebar} className="text-white text-xl hover:text-gray-200"><GoSidebarCollapse /></button>
                    </div>
                    <div className={`flex flex-col items-center py-6 border-b border-[#014250] ${isSidebarOpen ? 'px-4' : 'px-2'}`}>
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center"><FaUser className="text-gray-600" /></div>
                        {isSidebarOpen && (
                            <React.Fragment>
                                <div className="font-bold text-white">{user?.name || 'College'}</div>
                                <div className="text-xs text-gray-300 capitalize">{user?.role}</div>
                            </React.Fragment>
                        )}
                    </div>
                    <nav className="flex-1 mt-4">
                        <ul className="space-y-2">{renderNavItems()}</ul>
                    </nav>
                    <div className="mt-auto border-t border-[#014250] p-4">
                        <button onClick={handleLogout} className={`flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-[#014250] rounded transition ${!isSidebarOpen ? 'justify-center' : ''}`}>
                            <FaSignOutAlt className={!isSidebarOpen ? '' : 'mr-3'} />
                            {isSidebarOpen && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </React.Fragment>
    );
};

export default SidebarCollege;