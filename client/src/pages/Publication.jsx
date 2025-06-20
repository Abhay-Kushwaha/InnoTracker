import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import { FaFileDownload } from "react-icons/fa";
import AddPublicationForm from "../components/AddPublicationForm";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { publicationAPI, patentAPI } from '../services/api';

// Register all necessary components from Chart.js
Chart.register(...registerables);

const PublicationsPage = () => {
  const { user, loading: userLoading } = useAuth();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    author: "",
    year: "",
    journal: "",
  });

  useEffect(() => {
    fetchPublications();
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const fetchPublications = async () => {
    try {
      const res = await publicationAPI.getAll();
      // The backend should already filter by user, but let's double-check
      // Filter publications to only show the current user's entries
      const userPublications = res.data.filter(pub => 
        pub.createdBy === user?._id || pub.createdBy?._id === user?._id
      );
      setPublications(userPublications);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch publications');
      setLoading(false);
    }
  };

  const filteredPublications = publications.filter((pub) => {
    const matchesAuthor = filter.author
      ? pub.authors.some(author => 
          author.toLowerCase().includes(filter.author.toLowerCase())
        )
      : true;
    const matchesYear = filter.year
      ? new Date(pub.publicationDate).getFullYear() === parseInt(filter.year)
      : true;
    const matchesJournal = filter.journal
      ? pub.journal.toLowerCase().includes(filter.journal.toLowerCase())
      : true;

    return matchesAuthor && matchesYear && matchesJournal;
  });

  const publicationYears = publications.map((pub) =>
    new Date(pub.publicationDate).getFullYear()
  ).sort((a, b) => a - b); // Sort years for chart labels

  const yearCounts = publicationYears.reduce((acc, year) => {
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Calculate top researchers
  const researcherCounts = publications.reduce((acc, pub) => {
    if (Array.isArray(pub.authors)) {
      pub.authors.forEach(author => {
        acc[author] = (acc[author] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const sortedResearchers = Object.entries(researcherCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5); // Get top 5

  const topResearchersLabels = sortedResearchers.map(([name]) => name);
  const topResearchersData = sortedResearchers.map(([, count]) => count);

  // Chart options for consistency and dark mode
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(55, 65, 81, 1)', // gray-700
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(55, 65, 81, 1)', // gray-700
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // gray-300 light
        },
      },
      y: {
        ticks: {
          color: 'rgba(55, 65, 81, 1)', // gray-700
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // gray-300 light
        },
      },
    },
  };

  const darkChartOptions = {
    ...chartOptions,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(209, 213, 219, 1)', // gray-300
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)', // gray-300
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', // gray-500 light
        },
      },
      y: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)', // gray-300
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', // gray-500 light
        },
      },
    },
  };

  const currentChartOptions = document.documentElement.classList.contains('dark')
    ? darkChartOptions
    : chartOptions;

  const lineChartData = {
    labels: Object.keys(yearCounts),
    datasets: [
      {
        label: "Number of Publications",
        data: Object.values(yearCounts),
        borderColor: "#3b82f6", // Tailwind blue-500
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Light blue background
        tension: 0.4, // Smooth the line
      },
    ],
  };

  const barChartData = {
    labels: topResearchersLabels,
    datasets: [
      {
        label: "Number of Publications",
        data: topResearchersData,
        backgroundColor: 'rgba(168, 85, 247, 0.7)', // Tailwind purple-500
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleAddPublication = async (newPublication) => {
    try {
      const publicationWithDept = { 
        ...newPublication, 
        department: user?.department || '',
        authors: Array.isArray(newPublication.authors) 
          ? newPublication.authors 
          : newPublication.authors.split(',').map(author => author.trim())
      };
      
      // Create the publication
      const res = await publicationAPI.create(publicationWithDept);
      setPublications(prev => [...prev, res.data]);
      
      // If patent checkbox is checked, create a corresponding patent
      if (newPublication.isPatent) {
        try {
          const patentData = {
            title: newPublication.title,
            inventors: Array.isArray(newPublication.authors) 
              ? newPublication.authors 
              : newPublication.authors.split(',').map(author => author.trim()),
            filingDate: newPublication.publicationDate,
            status: 'Filed', // Default status for publications converted to patents
            description: `Patent based on publication: ${newPublication.title}`,
            department: user?.department || '',
            patentNumber: '', // Will be filled when patent is granted
            relatedPublication: res.data._id // Link to the original publication
          };
          
          await patentAPI.create(patentData);
          alert('Publication and corresponding patent added successfully!');
        } catch (patentError) {
          console.error('Failed to create patent:', patentError);
          alert('Publication added successfully, but failed to create corresponding patent.');
        }
      } else {
        alert('Publication added successfully!');
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to add publication');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const exportToCSV = () => {
    const csvData = filteredPublications.map(pub => ({
      Title: pub.title,
      Authors: Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors,
      Journal: pub.journal,
      DOI: pub.doi || 'N/A',
      PublicationDate: new Date(pub.publicationDate).toLocaleDateString(),
      ImpactFactor: pub.impactFactor || 'N/A',
      Department: pub.department
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'publications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading || userLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!user) return (
    <div className="text-center text-red-600 p-8">
      <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
      <p>Please log in to view and manage publications.</p>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-600 p-8">
      <h2 className="text-2xl font-bold mb-4">Error</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Publications
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="200">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Filter Publications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
            name="author"
            placeholder="Search by author..."
          value={filter.author}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
        />
        <input
            type="number"
            name="year"
            placeholder="Filter by year..."
          value={filter.year}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
          />
          <input
            type="text"
            name="journal"
            placeholder="Search by journal..."
            value={filter.journal}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
          />
            </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-right" data-aos-delay="300">
          <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Publications Over Time</h3>
          <div className="h-64">
            <Line data={lineChartData} options={currentChartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-left" data-aos-delay="400">
          <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Top Researchers</h3>
          <div className="h-64">
            <Bar data={barChartData} options={currentChartOptions} />
          </div>
        </div>
      </div>

      {/* Add Publication Form */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="500">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Add New Publication</h2>
        <AddPublicationForm onAddPublication={handleAddPublication} user={user} />
      </div>

      {/* Publications List */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400">
            Publications ({filteredPublications.length})
          </h2>
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300"
          >
            <FaFileDownload className="mr-2" />
            Export CSV
          </button>
        </div>

        {filteredPublications.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-8">
            No publications found matching your criteria.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((publication) => (
              <div
                key={publication._id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">
                  {publication.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Authors:</strong> {Array.isArray(publication.authors) ? publication.authors.join(', ') : publication.authors}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Journal:</strong> {publication.journal}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Publication Date:</strong> {new Date(publication.publicationDate).toLocaleDateString()}
                </p>
                {publication.doi && (
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>DOI:</strong> {publication.doi}
                  </p>
                )}
                {publication.impactFactor && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Impact Factor:</strong> {publication.impactFactor}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationsPage;