import React from 'react';
import { FaAward, FaCalendarAlt, FaBuilding, FaLink, FaEdit, FaTrashAlt } from 'react-icons/fa';

const AwardCard = ({ award, onEdit, onDelete }) => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 group relative" data-aos="zoom-in">
            <div className="h-40 w-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
                <img
                    src="../assets/img/medal.jpg"
                    className="h-full w-auto object-contain p-2"
                />
            </div>
            <div className="flex flex-col justify-between gap-5 h-3/4 p-6">
                <div>
                    <h3 className="text-2xl text-center font-bold text-[#014250] dark:text-indigo-400 mb-2 leading-tight">
                        {award.awardName}
                    </h3>
                    <p className="text-gray-600 text-center dark:text-gray-300 text-sm mb-4">
                        {award.category}
                    </p>
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-200 text-sm">
                    <p className="flex items-center">
                        <FaBuilding className="mr-2 text-md text-blue-500" />
                        <span className="font-semibold">Awarded by:</span> {award.awardingBody}
                    </p>
                    <p className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-md text-yellow-500" />
                        <span className="font-semibold">Year:</span> {award.year}
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

                {/* Edit and Delete Buttons (appear on hover or are always visible depending on preference) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button
                        onClick={() => onEdit(award)}
                        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition duration-200 shadow-md"
                        title="Edit Award"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(award.id)}
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-200 shadow-md"
                        title="Delete Award"
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AwardCard;