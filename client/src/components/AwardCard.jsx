import React from 'react';
import { FaAward, FaCalendarAlt, FaBuilding, FaLink, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const AwardCard = ({ award, onEdit, onDelete }) => {
    const { user } = useAuth();
    const canModify = user && (user._id === award.createdBy || user.role === 'admin');

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 group relative" data-aos="zoom-in">
            <div className="h-40 w-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
                <img
                    src="../assets/img/medal.jpg"
                    className="h-full w-auto object-contain p-2"
                />
            </div>
            <div className="flex flex-col justify-between gap-5 h-3/4 p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl text-center font-bold text-[#014250] dark:text-indigo-400 mb-2 leading-tight">
                        {award.title}
                    </h3>
                    {canModify && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(award)}
                                className="text-blue-500 hover:text-blue-700 transition-colors"
                            >
                                <FaEdit size={18} />
                            </button>
                            <button
                                onClick={() => onDelete(award._id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <FaTrashAlt size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-200 text-sm">
                    <p className="flex items-center">
                        <FaBuilding className="mr-2 text-md text-blue-500" />
                        <span className="font-semibold">Awarding Body:</span> {award.awardingBody}
                    </p>
                    <p className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-md text-yellow-500" />
                        <span className="font-semibold">Date Received:</span> {format(new Date(award.dateReceived), 'PP')}
                    </p>
                    <p className="mt-4 text-base text-gray-800 dark:text-gray-200">
                        {award.description}
                    </p>
                </div>

                {award.link && (
                    <div className="mt-6">
                        <a
                            href={award.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 text-sm shadow-md"
                        >
                            <FaLink className="mr-2" /> Learn More
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AwardCard;