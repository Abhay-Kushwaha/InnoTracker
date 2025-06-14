import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import { FaFileDownload } from "react-icons/fa";
import AddPublicationForm from "../components/AddPublicationForm";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Register all necessary components from Chart.js
Chart.register(...registerables);

// Sample publications data
const initialPublicationsData = [
  {
    id: 1,
    title: "Understanding Quantum Computing",
    authors: "Alice Smith, Bob Johnson",
    publicationDate: "2023-06-15",
    journal: "International Journal of Quantum Research",
    citations: 120,
    isPatent: false,
  },
  {
    id: 2,
    title: "Machine Learning in Healthcare",
    authors: "Charlie Brown",
    publicationDate: "2022-01-22",
    journal: "Healthcare AI Conference",
    citations: 85,
    isPatent: false,
  },
  {
    id: 3,
    title: "Innovations in Renewable Energy",
    authors: "David White, Eve Davis",
    publicationDate: "2023-09-05",
    journal: "Journal of Energy Innovations",
    citations: 90,
    isPatent: true,
  },
  {
    id: 4,
    title: "Advances in Nanotechnology",
    authors: "Alice Smith, Frank Green",
    publicationDate: "2023-11-10",
    journal: "Nano Letters",
    citations: 150,
    isPatent: false,
  },
  {
    id: 5,
    title: "Sustainable Agriculture Practices",
    authors: "Grace Hall",
    publicationDate: "2024-03-01",
    journal: "Environmental Science Journal",
    citations: 45,
    isPatent: false,
  },
  {
    id: 6,
    title: "Blockchain for Supply Chain",
    authors: "Bob Johnson",
    publicationDate: "2022-08-18",
    journal: "Decentralized Systems Review",
    citations: 70,
    isPatent: false,
  },
];

const PublicationsPage = () => {
  const [publications, setPublications] = useState(initialPublicationsData);
  const [filter, setFilter] = useState({
    author: "",
    year: "",
    type: "all",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const filteredPublications = publications.filter((pub) => {
    const matchesAuthor = filter.author
      ? pub.authors.toLowerCase().includes(filter.author.toLowerCase())
      : true;
    const matchesYear = filter.year
      ? new Date(pub.publicationDate).getFullYear() === parseInt(filter.year)
      : true;
    const matchesType =
      filter.type === "all" ||
      (filter.type === "patent" && pub.isPatent) ||
      (filter.type === "paper" && !pub.isPatent); // Correctly filter for research papers

    return matchesAuthor && matchesYear && matchesType;
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
    const authors = pub.authors.split(',').map(name => name.trim());
    authors.forEach(author => {
      acc[author] = (acc[author] || 0) + 1;
    });
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

  const handleAddPublication = (newPublication) => {
    // Simple ID generation for sample data
    const newId = publications.length > 0 ? Math.max(...publications.map(p => p.id)) + 1 : 1;
    setPublications(prev => [...prev, { ...newPublication, id: newId }]);
  };

  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Publications
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {/* Filter Bar */}
      <div className="sticky top-4 z-10 bg-white dark:bg-zinc-900 shadow-xl p-4 md:p-6 mb-8 rounded-lg flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Filter by Author"
          className="flex-grow min-w-[180px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={filter.author}
          onChange={(e) => setFilter({ ...filter, author: e.target.value })}
        />
        <input
          type="number" // Changed to number for year input
          placeholder="Filter by Year"
          className="flex-grow min-w-[150px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
        />
        <select
          className="flex-grow min-w-[150px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="patent">Patents</option>
          <option value="paper">Research Papers</option>
        </select>
      </div>

      {/* Publications List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 my-6">
        {filteredPublications.length > 0 ? (
          filteredPublications.map((pub, index) => (
            <div key={pub.id} className="flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-zinc-700" data-aos="fade-up" data-aos-delay={250 + (index * 50)}>
              <div>
                <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-2">{pub.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1"><span className="font-semibold">Authors:</span> {pub.authors}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1"><span className="font-semibold">Date:</span> {pub.publicationDate}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2"><span className="font-semibold">Journal:</span> {pub.journal}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-3"><span className="font-semibold">Citations:</span> {pub.citations}</p>
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                                ${pub.isPatent ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100' : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'}
                            `}>
                  {pub.isPatent ? 'Patent' : 'Research Paper'}
                </span>
                <a href={`/download/${pub.id}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mt-4 flex items-center font-medium transition-colors duration-200">
                  <FaFileDownload className="mr-2" /> Download
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xl font-medium text-gray-500 dark:text-gray-400 py-10" data-aos="fade-in" data-aos-delay="500">
            No publications found matching your criteria.
          </p>
        )}
      </div>

      {/* Charts */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-right" data-aos-delay="300">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Publications Over the Years</h2>
          <div className="h-72">
            <Line data={lineChartData} options={currentChartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-left" data-aos-delay="400">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Top Performing Researchers</h2>
          <div className="h-72">
            <Bar data={barChartData} options={currentChartOptions} />
          </div>
        </div>
      </div>

      {/* Add Publication Form */}
      <div className="mt-10 p-6 bg-white text-black dark:bg-zinc-900 rounded-lg shadow-xl" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-6">Add New Publication</h2>
        <AddPublicationForm onAddPublication={handleAddPublication} />
      </div>
    </div>
  );
};

export default PublicationsPage;