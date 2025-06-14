// src/components/GrantCard.jsx
import React from 'react';
import { FaBuilding, FaMoneyBillWave, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaCalendarAlt, FaUserTie, FaInfoCircle } from 'react-icons/fa'; // Added FaInfoCircle

const GrantCard = ({ grant }) => {
    // Corrected getStatusColor for better contrast and full Tailwind classes
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-emerald-500 text-white dark:bg-emerald-700 dark:text-emerald-100';
            case 'Applied':
                return 'bg-blue-500 text-white dark:bg-blue-700 dark:text-blue-100';
            case 'Rejected':
                return 'bg-red-500 text-white dark:bg-red-700 dark:text-red-100';
            default:
                return 'bg-gray-400 text-white dark:bg-gray-600 dark:text-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved':
                return <FaCheckCircle className="mr-2 text-emerald-500 dark:text-emerald-400" />;
            case 'Applied':
                return <FaHourglassHalf className="mr-2 text-blue-500 dark:text-blue-400" />;
            case 'Rejected':
                return <FaTimesCircle className="mr-2 text-red-500 dark:text-red-400" />;
            default:
                return <FaInfoCircle className="mr-2 text-gray-500 dark:text-gray-400" />;
        }
    };

    return (
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-200 dark:border-zinc-700">
            {/* Decorative top stripe based on status */}
            <div className={`absolute top-0 left-0 w-full h-2 rounded-t-xl ${getStatusColor(grant.status).split(' ')[0].replace('bg-', 'bg-')}`}></div>

            <div className="h-full flex flex-col justify-between p-6 gap-5">
                <div>
                    <h3 className="text-xl font-extrabold text-[#014250] dark:text-indigo-400 mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-200">
                        {grant.title}
                    </h3>
                </div>

                <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                    <p className="flex items-center">
                        <FaBuilding className="mr-3 text-lg text-indigo-500 dark:text-indigo-400" /> {/* Larger icon, more margin */}
                        <span className="font-semibold pr-2">Grantor:</span> {grant.grantor}
                    </p>
                    <p className="flex items-center">
                        <FaMoneyBillWave className="mr-3 text-lg text-green-600 dark:text-green-400" />
                        <span className="font-semibold pr-2">Amount:</span> ${grant.amount.toLocaleString()}
                    </p>
                    <p className="flex items-center">
                        {getStatusIcon(grant.status)}
                        <span className="font-semibold pr-2">Status:</span>
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(grant.status)} shadow-sm`}> {/* Bold text for status */}
                            {grant.status}
                        </span>
                    </p>
                    <p className="flex items-center">
                        <FaCalendarAlt className="mr-3 text-lg text-purple-500 dark:text-purple-400" />
                        <span className="font-semibold pr-2">Applied:</span> {grant.applicationDate}
                    </p>
                    {grant.approvalDate && (
                        <p className="flex items-center">
                            <FaCheckCircle className="mr-3 text-lg text-green-500 dark:text-green-400" />
                            <span className="font-semibold pr-2">Approved:</span> {grant.approvalDate}
                        </p>
                    )}
                    <p className="flex items-center">
                        <FaUserTie className="mr-3 text-lg text-blue-500 dark:text-blue-400" />
                        <span className="font-semibold pr-2">Lead:</span> {grant.leadResearcher}
                        {grant.department && <span className="ml-1 text-gray-500 dark:text-gray-400">({grant.department})</span>}
                    </p>
                    {grant.dueDate && (
                        <p className="flex items-center">
                            <FaClock className="mr-3 text-lg text-yellow-500 dark:text-yellow-400" />
                            <span className="font-semibold pr-2">Due Date:</span> {grant.dueDate}
                        </p>
                    )}
                    {grant.type && ( // Added grant type display
                        <p className="flex items-center">
                            <FaFileAlt className="mr-3 text-lg text-gray-500 dark:text-gray-400" />
                            <span className="font-semibold pr-2">Type:</span>
                            <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 shadow-sm">
                                {grant.type}
                            </span>
                        </p>
                    )}
                </div>

                <div className="mt-6">
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GrantCard;