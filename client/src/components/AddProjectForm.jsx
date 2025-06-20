import React, { useState } from 'react';
import axios from 'axios';

const departments = [
  "Computer Science",
  "Physics",
  "Biology",
  "Mathematics",
  "Engineering",
  "Chemistry",
  "Arts",
];

const AddProjectForm = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('Planning');
  const [startDate, setStartDate] = useState('');
  const [impact, setImpact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title,
      description,
      team: team.split(',').map(t => t.trim()),
      department,
      status,
      startDate,
      impact,
    };
    onAddProject(newProject);
    // Clear form fields
    setTitle('');
    setDescription('');
    setTeam('');
    setDepartment('');
    setStatus('Planning');
    setStartDate('');
    setImpact('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Team Members (comma separated)"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Department"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <select
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="date"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Impact"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
