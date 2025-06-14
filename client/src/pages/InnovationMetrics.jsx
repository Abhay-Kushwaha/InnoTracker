import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { CSVLink } from 'react-csv';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

// Register all necessary components from Chart.js
Chart.register(...registerables);

// Sample data for metrics (replace with actual data as needed)
// Added a unique ID for better data handling if needed for more complex operations
const innovationData = [
  { id: 1, department: 'Computer Science', publications: 12, patents: 5, impactScore: 85, funds: 150000 },
  { id: 2, department: 'Physics', publications: 19, patents: 7, impactScore: 90, funds: 200000 },
  { id: 3, department: 'Chemistry', publications: 3, patents: 2, impactScore: 70, funds: 75000 },
  { id: 4, department: 'Biology', publications: 8, patents: 3, impactScore: 80, funds: 120000 },
  { id: 5, department: 'Engineering', publications: 15, patents: 6, impactScore: 92, funds: 250000 },
];

const InnovationMetrics = () => {
  const [department, setDepartment] = useState('');
  const [timeRange, setTimeRange] = useState('6 months');
  const [projectType, setProjectType] = useState('');
  const [filteredData, setFilteredData] = useState(innovationData);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  // Function to handle filter application
  useEffect(() => {
    applyFilters(); // Apply filters on initial load and when filter dependencies change
  }, [department, timeRange, projectType]); // Rerun when these states change

  const applyFilters = () => {
    let filtered = innovationData;

    if (department) {
      filtered = filtered.filter(item => item.department === department);
    }

    // Placeholder for time range filtering - currently no date data in sample
    if (timeRange) {
      // Example: if data had a 'date' field, you'd filter here
      // filtered = filtered.filter(item => isWithinTimeRange(item.date, timeRange));
    }

    // Placeholder for project type filtering - currently no projectType data in sample
    if (projectType) {
      // Example: if data had a 'projectType' field, you'd filter here
      // filtered = filtered.filter(item => item.projectType === projectType);
    }

    setFilteredData(filtered);
  };

  // Prepare CSV data
  const csvData = [
    ['Department', 'Number of Publications', 'Number of Patents', 'Impact Score', 'Funds Received'],
    ...filteredData.map(item => [
      item.department,
      item.publications,
      item.patents,
      item.impactScore,
      item.funds
    ]),
  ];

  // Chart Options for consistency and dark mode
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

  // Determine which chart options to use based on dark mode
  const currentChartOptions = document.documentElement.classList.contains('dark')
    ? darkChartOptions
    : chartOptions;

  // Sample chart data based on filtered data
  const publicationsData = {
    labels: filteredData.map(item => item.department),
    datasets: [
      {
        label: 'Publications',
        data: filteredData.map(item => item.publications),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const patentsData = {
    labels: filteredData.map(item => item.department),
    datasets: [
      {
        label: 'Patents',
        data: filteredData.map(item => item.patents),
        backgroundColor: 'rgba(234, 179, 8, 0.7)', // Tailwind yellow-500
        borderColor: 'rgba(234, 179, 8, 1)',
        borderWidth: 1,
      },
    ],
  };

  const impactScoreData = {
    labels: filteredData.map(item => item.department),
    datasets: [
      {
        label: 'Impact Score',
        data: filteredData.map(item => item.impactScore),
        backgroundColor: 'rgba(168, 85, 247, 0.7)', // Tailwind purple-500
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
  };

  const fundDistributionData = {
    labels: filteredData.map(item => item.department),
    datasets: [
      {
        label: 'Funds Received',
        data: filteredData.map(item => item.funds),
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)', // Red-500
          'rgba(34, 197, 94, 0.7)', // Green-500
          'rgba(249, 115, 22, 0.7)', // Orange-500
          'rgba(6, 182, 212, 0.7)', // Cyan-500
          'rgba(139, 92, 246, 0.7)', // Violet-500
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    // Removed md:ml-80 as it will be handled by DashboardLayout
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">

      <h1 className="text-4xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Innovation Metrics
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {/* Filters Section */}
      <div className="sticky top-4 z-10 mb-8 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Engineering">Engineering</option>
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="6 months">Last 6 Months</option>
            <option value="1 year">Last Year</option>
            <option value="2 years">Last 2 Years</option>
            <option value="All Time">All Time</option>
          </select>

          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Project Types</option>
            <option value="Research">Research</option>
            <option value="Development">Development</option>
            <option value="Conceptual">Conceptual</option>
          </select>
        </div>

        {/* Removed Apply Filters button as filters apply on change */}
        <div>
          <button
            onClick={applyFilters}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-right" data-aos-delay="300">
          <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Publications per Department</h2>
          <div className="h-72"> {/* Fixed height for charts */}
            <Bar data={publicationsData} options={currentChartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-left" data-aos-delay="400">
          <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Patents per Department</h2>
          <div className="h-72">
            <Bar data={patentsData} options={currentChartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="500">
          <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Impact Scores</h2>
          <div className="h-72">
            <Line data={impactScoreData} options={currentChartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="600">
          <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Fund Distribution by Department</h2>
          <div className="h-72">
            <Pie data={fundDistributionData} options={{
              ...currentChartOptions,
              scales: {
                x: { display: false }, // Hide x-axis for pie chart
                y: { display: false }, // Hide y-axis for pie chart
              },
            }} />
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="mt-8 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl text-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-[#E0E0E0] mb-5">Export Innovation Data</h2>
        <CSVLink
          data={csvData}
          filename={"innovation_metrics_data.csv"}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out text-lg font-semibold"
          target="_blank"
        >
          Download Data as CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default InnovationMetrics;