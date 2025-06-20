// src/components/ProjectCard.jsx
import React from 'react';
import { FaFlask, FaUserTie, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group p-6 border border-gray-200 dark:border-zinc-700">
      <h3 className="text-2xl font-bold text-[#014250] text-center dark:text-indigo-400 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-200">
        {project.title}
      </h3>
      <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
        <p className="flex items-center">
          <FaFlask className="mr-2 text-indigo-500 dark:text-indigo-400" />
          <span className="font-semibold">Department: </span> {project.department}
        </p>
        <p className="flex items-center">
          <FaUserTie className="mr-2 text-green-500 dark:text-green-400" />
          <span className="font-semibold">Lead: </span> {project.leadResearcher}
        </p>
        <p className="flex items-center">
          <FaMoneyBillWave className="mr-2 text-yellow-500 dark:text-yellow-400" />
          <span className="font-semibold">Funding: </span> ${typeof project.funding === 'number' ? project.funding.toLocaleString() : 'N/A'}
        </p>
        <p className="flex items-center">
          <FaInfoCircle className="mr-2 text-purple-500 dark:text-purple-400" />
          <span className="font-semibold">Status: </span>
          <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
                        ${project.status === 'Ongoing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 p-5' : ''}
                        ${project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 p-5' : ''}
                        ${project.status === 'Planned' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 p-5' : ''}
                    `}>
            {project.status}
          </span>
        </p>
      </div>
      {/* Optional: Add a "View Details" button or link */}
      <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors duration-200 opacity-0 group-hover:opacity-100">
        View Details
      </button>
    </div>
  );
};

export default ProjectCard;