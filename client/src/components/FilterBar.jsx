// src/components/FilterBar.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const FilterBar = ({ handleFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('All'); // Default to 'All'
  const [funding, setFunding] = useState('');

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-grow min-w-[200px] sm:min-w-0 sm:flex-grow">
        <input
          type="text"
          placeholder="Search by title or researcher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Department Filter */}
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
      >
        <option value="">All Departments</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="Engineering">Engineering</option>
      </select>

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
      >
        <option value="All">All Statuses</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
        <option value="Planned">Planned</option>
      </select>

      {/* Funding Filter */}
      <select
        value={funding}
        onChange={(e) => setFunding(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
      >
        <option value="">All Funding</option>
        <option value="Funded">Funded</option>
        <option value="Not Funded">Not Funded</option>
      </select>
    </div>
  );
};

export default FilterBar;