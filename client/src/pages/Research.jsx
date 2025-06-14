// src/pages/Research.jsx
import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar'; // Make sure this path is correct
import AddProjectForm from '../components/AddProjectForm';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

// Sample project data (this should be fetched from an API in a real application)
const projectData = [
  {
    id: 1, // Added unique ID for better keying in lists
    title: "AI in Healthcare",
    department: "Computer Science",
    leadResearcher: "Dr. John Smith",
    funding: 50000,
    status: "Ongoing",
    startDate: "2023-01-15",
    endDate: "2025-12-31"
  },
  {
    id: 2,
    title: "Quantum Computing Algorithms",
    department: "Physics",
    leadResearcher: "Dr. Jane Doe",
    funding: 120000,
    status: "Completed",
    startDate: "2021-03-01",
    endDate: "2024-05-20"
  },
  {
    id: 3,
    title: "Sustainable Energy Solutions",
    department: "Chemistry",
    leadResearcher: "Dr. Alex Johnson",
    funding: 75000,
    status: "Planned",
    startDate: "2025-07-01",
    endDate: "2027-06-30"
  },
  {
    id: 4,
    title: "Biodiversity Monitoring with Drones",
    department: "Biology",
    leadResearcher: "Dr. Sarah Lee",
    funding: 60000,
    status: "Ongoing",
    startDate: "2024-02-10",
    endDate: "2026-08-15"
  },
  {
    id: 5,
    title: "Advanced Robotics for Manufacturing",
    department: "Engineering",
    leadResearcher: "Dr. Emily Chen",
    funding: 150000,
    status: "Ongoing",
    startDate: "2022-11-01",
    endDate: "2025-06-30"
  },
];

const ResearchProjects = () => {
  const [projects, setProjects] = useState(projectData);
  const [filteredProjects, setFilteredProjects] = useState(projectData);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  // Handle filtering (moved to useEffect for immediate application of filters)
  useEffect(() => {
    setFilteredProjects(projects); // Reset to all projects first, then apply filters
  }, [projects]); // Re-filter when 'projects' state changes (e.g., new project added)

  const handleFilter = ({ searchTerm, department, status, funding }) => {
    let currentFiltered = projects; // Always start from the full list

    if (searchTerm) {
      currentFiltered = currentFiltered.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.leadResearcher.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (department) {
      currentFiltered = currentFiltered.filter((project) => project.department === department);
    }

    if (status && status !== 'All') { // Check for 'All' option
      currentFiltered = currentFiltered.filter((project) => project.status === status);
    }

    if (funding) {
      if (funding === 'Funded') {
        currentFiltered = currentFiltered.filter((project) => project.funding > 0);
      } else if (funding === 'Not Funded') { // Assuming 'Not Funded' is an option for 0 funding
        currentFiltered = currentFiltered.filter((project) => project.funding === 0);
      }
    }

    setFilteredProjects(currentFiltered);
  };

  // Handle adding a new project
  const handleAddProject = (newProject) => {
    // Assign a unique ID for the new project
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const projectWithId = { ...newProject, id: newId };

    // Update the main projects list
    setProjects((prevProjects) => [...prevProjects, projectWithId]);
  };


  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Research Projects
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {/* FilterBar */}
      <div className="sticky top-4 z-10 bg-white text-black dark:bg-zinc-900 shadow-xl p-4 md:p-6 mb-8 rounded-lg">
        <FilterBar handleFilter={handleFilter} />
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 my-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} data-aos="fade-up" data-aos-delay={250 + (index * 50)} />
          ))
        ) : (
          <p className="col-span-full text-center text-xl font-medium text-gray-500 dark:text-gray-400 py-10" data-aos="fade-in" data-aos-delay="500">
            No projects found matching your criteria.
          </p>
        )}
      </div>

      {/* Add Project Form */}
      <div className="mt-10 p-6 bg-white text-black dark:bg-zinc-900 rounded-lg shadow-xl" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-6">Add New Research Project</h2>
        <AddProjectForm onAddProject={handleAddProject} />
      </div>
    </div>
  );
};

export default ResearchProjects;