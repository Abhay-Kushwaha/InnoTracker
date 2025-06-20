import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!loading && !user) {
            navigate('/login');
            return;
        }

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: false,
            easing: 'ease-in-out',
        });
    }, [user, loading, navigate]);

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#C9E6F0] dark:bg-zinc-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006073]"></div>
            </div>
        );
    }

    // If not authenticated, don't render anything (redirect will happen)
    if (!user) {
        return null;
    }

    return (
        <div className="flex min-h-screen font-poppins bg-[#C9E6F0] dark:bg-zinc-800">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <main 
                className={`flex-grow transition-all duration-300 ease-in-out p-4 md:p-8 pt-20 md:pt-8
                ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
                bg-[#C9E6F0] dark:bg-zinc-800 text-gray-900 dark:text-gray-100`}
            >
                <div className="md:hidden h-16 w-full"></div>
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;