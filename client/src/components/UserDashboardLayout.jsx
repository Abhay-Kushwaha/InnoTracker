import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const UserDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-900">
            {/* Sidebar (fixed width) */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Main content */}
            <main
                className={`flex-1 transition-all duration-300 ease-in-out mt-16 md:mt-0
          ${isSidebarOpen ? 'md:ml-65' : 'md:ml-20'}`}
            >
                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default UserDashboardLayout;
