import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashboardLayout = ({ children }) => {
    // State for desktop sidebar collapse, managed here as it affects layout
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Initialize AOS once when the component mounts
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // You might want true for some initial animations, but false for content appearing on scroll
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className="flex min-h-screen font-poppins bg-[#C9E6F0] dark:bg-zinc-800">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <main className={`flex-grow transition-all duration-300 ease-in-out p-4 md:p-8 pt-20 md:pt-8
                            ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
                            bg-[#C9E6F0] dark:bg-zinc-800 text-gray-900 dark:text-gray-100`} >
                <div className="md:hidden h-16 w-full"></div>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;