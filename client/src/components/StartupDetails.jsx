// src/components/StartupDetails.jsx
import React, { useState } from 'react';
import { FaBuilding, FaUserCircle, FaCalendarAlt, FaIndustry, FaDollarSign, FaGlobe, FaEnvelope, FaUsers, FaAward, FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddStartupForm from './AddStartupForm'; // Re-use the form for editing

const StartupDetails = ({ startup, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-6">Edit Startup Details</h2>
                <AddStartupForm
                    initialData={startup}
                    onAddStartup={(updatedData) => {
                        onUpdate(updatedData);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)} // Allow canceling edit mode
                />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 flex space-x-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition duration-200"
                    title="Edit Startup Details"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-200"
                    title="Delete Startup Details"
                >
                    <FaTrashAlt />
                </button>
            </div>

            <h2 className="text-3xl font-extrabold text-[#014250] dark:text-indigo-400 mb-4 pr-16 leading-tight">
                {startup.companyName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">{startup.stage}</span> - {startup.industry}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 dark:text-gray-300">
                <p className="flex items-center text-md">
                    <FaUserCircle className="mr-3 text-xl text-purple-500 dark:text-purple-400" />
                    <span className="font-semibold">Founder:</span> {startup.founderName}
                </p>
                <p className="flex items-center text-md">
                    <FaCalendarAlt className="mr-3 text-xl text-yellow-500 dark:text-yellow-400" />
                    <span className="font-semibold">Inception Date:</span> {startup.inceptionDate}
                </p>
                <p className="flex items-center text-md">
                    <FaBuilding className="mr-3 text-xl text-teal-500 dark:text-teal-400" />
                    <span className="font-semibold">Incubation Center:</span> {startup.incubationCenter || 'N/A'}
                </p>
                {startup.incubationStartDate && (
                    <p className="flex items-center text-md">
                        <FaCalendarAlt className="mr-3 text-xl text-orange-500 dark:text-orange-400" />
                        <span className="font-semibold">Incubation Start:</span> {startup.incubationStartDate}
                    </p>
                )}
                <p className="flex items-center text-md">
                    <FaDollarSign className="mr-3 text-xl text-green-600 dark:text-green-400" />
                    <span className="font-semibold">Funding Raised:</span> ${startup.fundingRaised ? startup.fundingRaised.toLocaleString() : '0'}
                </p>
                <p className="flex items-center text-md">
                    <FaUsers className="mr-3 text-xl text-red-500 dark:text-red-400" />
                    <span className="font-semibold">Team Size:</span> {startup.teamSize}
                </p>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-3">About {startup.companyName}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {startup.description}
                </p>
            </div>

            {startup.achievements && startup.achievements.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-3">Key Achievements</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        {startup.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                                <FaAward className="mt-1 mr-3 text-lg text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                                <span>{achievement}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-8 border-t border-gray-200 dark:border-zinc-700 pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                {startup.website && (
                    <a href={startup.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 shadow-md">
                        <FaGlobe className="mr-2" /> Visit Website
                    </a>
                )}
                {startup.contactEmail && (
                    <a href={`mailto:${startup.contactEmail}`} className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 rounded-lg transition-colors duration-200 shadow-md">
                        <FaEnvelope className="mr-2" /> Contact
                    </a>
                )}
            </div>
        </div>
    );
};

export default StartupDetails;