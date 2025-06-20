import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaDownload, FaChartBar, FaFileAlt, FaLightbulb, FaTrophy, FaBuilding, FaUsers } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../contexts/AuthContext';
import { 
  publicationAPI, 
  patentAPI, 
  grantAPI, 
  awardAPI, 
  startupAPI, 
  innovationProjectAPI 
} from '../services/api';

// Register all necessary components from Chart.js
Chart.register(...registerables);

const InnovationMetrics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    publications: [],
    patents: [],
    grants: [],
    awards: [],
    startups: [],
    projects: []
  });
  const [department, setDepartment] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [filteredData, setFilteredData] = useState([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
    fetchAllData();
  }, []);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [department, timeRange, metrics]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        publicationsRes,
        patentsRes,
        grantsRes,
        awardsRes,
        startupsRes,
        projectsRes
      ] = await Promise.all([
        publicationAPI.getAll(),
        patentAPI.getAll(),
        grantAPI.getAll(),
        awardAPI.getAll(),
        startupAPI.getAll(),
        innovationProjectAPI.getAll()
      ]);

      // Filter data by current user
      const userPublications = publicationsRes.data.filter(pub => 
        pub.createdBy === user?._id || pub.createdBy?._id === user?._id
      );
      const userPatents = patentsRes.data.filter(patent => 
        patent.createdBy === user?._id || patent.createdBy?._id === user?._id
      );
      const userGrants = grantsRes.data.filter(grant => 
        grant.createdBy === user?._id || grant.createdBy?._id === user?._id
      );
      const userAwards = awardsRes.data.filter(award => 
        award.createdBy === user?._id || award.createdBy?._id === user?._id
      );
      const userStartups = startupsRes.data.filter(startup => 
        startup.createdBy === user?._id || startup.createdBy?._id === user?._id
      );
      const userProjects = projectsRes.data.filter(project => 
        project.createdBy === user?._id || project.createdBy?._id === user?._id
      );

      setMetrics({
        publications: userPublications,
        patents: userPatents,
        grants: userGrants,
        awards: userAwards,
        startups: userStartups,
        projects: userProjects
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to fetch innovation metrics');
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [];
    
    // Combine all data for department-based analysis
    const allData = [
      ...metrics.publications.map(item => ({ ...item, type: 'Publication' })),
      ...metrics.patents.map(item => ({ ...item, type: 'Patent' })),
      ...metrics.grants.map(item => ({ ...item, type: 'Grant' })),
      ...metrics.awards.map(item => ({ ...item, type: 'Award' })),
      ...metrics.startups.map(item => ({ ...item, type: 'Startup' })),
      ...metrics.projects.map(item => ({ ...item, type: 'Project' }))
    ];

    // Filter by department
    if (department) {
      filtered = allData.filter(item => item.department === department);
    } else {
      filtered = allData;
    }

    // Filter by time range
    if (timeRange !== 'all') {
      const now = new Date();
      let cutoffDate;
      
      switch (timeRange) {
        case '6months':
          cutoffDate = new Date(now.getTime() - (6 * 30 * 24 * 60 * 60 * 1000));
          break;
        case '1year':
          cutoffDate = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000));
          break;
        case '2years':
          cutoffDate = new Date(now.getTime() - (2 * 365 * 24 * 60 * 60 * 1000));
          break;
        default:
          cutoffDate = new Date(0);
      }
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createdAt || item.publicationDate || item.filingDate || item.dateReceived || item.launchDate);
        return itemDate >= cutoffDate;
      });
    }

    setFilteredData(filtered);
  };

  // Calculate department-wise metrics
  const getDepartmentMetrics = () => {
    const departments = [...new Set(filteredData.map(item => item.department))];
    
    return departments.map(dept => {
      const deptData = filteredData.filter(item => item.department === dept);
      const publications = deptData.filter(item => item.type === 'Publication').length;
      const patents = deptData.filter(item => item.type === 'Patent').length;
      const grants = deptData.filter(item => item.type === 'Grant').length;
      const awards = deptData.filter(item => item.type === 'Award').length;
      const startups = deptData.filter(item => item.type === 'Startup').length;
      const projects = deptData.filter(item => item.type === 'Project').length;
      
      // Calculate total funding from grants
      const totalFunding = deptData
        .filter(item => item.type === 'Grant' && item.status === 'Approved')
        .reduce((sum, grant) => sum + (grant.amount || 0), 0);
      
      // Calculate impact score (simplified calculation)
      const impactScore = Math.round(
        (publications * 10) + (patents * 15) + (grants * 5) + (awards * 20) + (startups * 25) + (projects * 8)
      );
      
      return {
        department: dept,
        publications,
        patents,
        grants,
        awards,
        startups,
        projects,
        totalFunding,
        impactScore
      };
    });
  };

  const departmentMetrics = getDepartmentMetrics();

  // Chart data
  const publicationsData = {
    labels: departmentMetrics.map(item => item.department),
    datasets: [{
      label: 'Publications',
      data: departmentMetrics.map(item => item.publications),
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
    }],
  };

  const patentsData = {
    labels: departmentMetrics.map(item => item.department),
    datasets: [{
      label: 'Patents',
      data: departmentMetrics.map(item => item.patents),
      backgroundColor: 'rgba(234, 179, 8, 0.7)',
      borderColor: 'rgba(234, 179, 8, 1)',
      borderWidth: 1,
    }],
  };

  const fundingData = {
    labels: departmentMetrics.map(item => item.department),
    datasets: [{
      label: 'Total Funding ($)',
      data: departmentMetrics.map(item => item.totalFunding),
      backgroundColor: 'rgba(34, 197, 94, 0.7)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1,
    }],
  };

  const impactScoreData = {
    labels: departmentMetrics.map(item => item.department),
    datasets: [{
      label: 'Impact Score',
      data: departmentMetrics.map(item => item.impactScore),
      backgroundColor: 'rgba(168, 85, 247, 0.7)',
      borderColor: 'rgba(168, 85, 247, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    }],
  };

  const innovationTypeData = {
    labels: ['Publications', 'Patents', 'Grants', 'Awards', 'Startups', 'Projects'],
    datasets: [{
      data: [
        metrics.publications.length,
        metrics.patents.length,
        metrics.grants.length,
        metrics.awards.length,
        metrics.startups.length,
        metrics.projects.length
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(234, 179, 8, 0.7)',
        'rgba(34, 197, 94, 0.7)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(239, 68, 68, 0.7)',
        'rgba(249, 115, 22, 0.7)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(249, 115, 22, 1)'
      ],
      borderWidth: 1,
    }],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(55, 65, 81, 1)',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(55, 65, 81, 1)',
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(55, 65, 81, 1)',
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)',
        },
      },
    },
  };

  const darkChartOptions = {
    ...chartOptions,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(209, 213, 219, 1)',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.3)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.3)',
        },
      },
    },
  };

  const currentChartOptions = document.documentElement.classList.contains('dark')
    ? darkChartOptions
    : chartOptions;

  // Calculate summary statistics
  const totalPublications = metrics.publications.length;
  const totalPatents = metrics.patents.length;
  const totalGrants = metrics.grants.length;
  const totalAwards = metrics.awards.length;
  const totalStartups = metrics.startups.length;
  const totalProjects = metrics.projects.length;
  const totalFunding = metrics.grants
    .filter(grant => grant.status === 'Approved')
    .reduce((sum, grant) => sum + (grant.amount || 0), 0);

  // Prepare CSV data
  const csvData = [
    ['Department', 'Publications', 'Patents', 'Grants', 'Awards', 'Startups', 'Projects', 'Total Funding ($)', 'Impact Score'],
    ...departmentMetrics.map(item => [
      item.department,
      item.publications,
      item.patents,
      item.grants,
      item.awards,
      item.startups,
      item.projects,
      item.totalFunding,
      item.impactScore
    ]),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#C9E6F0] dark:bg-zinc-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Innovation Metrics Dashboard
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4 text-center" data-aos="fade-up" data-aos-delay="200">
          <FaFileAlt className="text-3xl text-blue-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400">Publications</h3>
          <p className="text-2xl font-bold text-blue-600">{totalPublications}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4 text-center" data-aos="fade-up" data-aos-delay="300">
          <FaLightbulb className="text-3xl text-yellow-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400">Patents</h3>
          <p className="text-2xl font-bold text-yellow-600">{totalPatents}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4 text-center" data-aos="fade-up" data-aos-delay="400">
          <FaChartBar className="text-3xl text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400">Grants</h3>
          <p className="text-2xl font-bold text-green-600">{totalGrants}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4 text-center" data-aos="fade-up" data-aos-delay="500">
          <FaTrophy className="text-3xl text-purple-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400">Awards</h3>
          <p className="text-2xl font-bold text-purple-600">{totalAwards}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4 text-center" data-aos="fade-up" data-aos-delay="600">
          <FaBuilding className="text-3xl text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400">Startups</h3>
          <p className="text-2xl font-bold text-red-600">{totalStartups}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4 text-center" data-aos="fade-up" data-aos-delay="700">
          <FaUsers className="text-3xl text-orange-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400">Projects</h3>
          <p className="text-2xl font-bold text-orange-600">{totalProjects}</p>
        </div>
      </div>

      {/* Total Funding Display */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8 text-center" data-aos="fade-up" data-aos-delay="800">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-2">Total Funding Secured</h2>
        <p className="text-4xl font-bold text-green-600">${totalFunding.toLocaleString()}</p>
      </div>

      {/* Filters Section */}
      <div className="sticky top-4 z-10 mb-8 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Departments</option>
            {[...new Set(filteredData.map(item => item.department))].map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Time</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="2years">Last 2 Years</option>
          </select>
        </div>

        <div>
          <button
            onClick={fetchAllData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-right" data-aos-delay="300">
          <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Publications per Department</h2>
          <div className="h-72">
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
          <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Funding Distribution</h2>
          <div className="h-72">
            <Bar data={fundingData} options={currentChartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="600">
          <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Impact Scores</h2>
          <div className="h-72">
            <Line data={impactScoreData} options={currentChartOptions} />
          </div>
        </div>
      </div>

      {/* Innovation Type Distribution */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="700">
        <h2 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4 text-center">Innovation Type Distribution</h2>
        <div className="h-96 flex justify-center">
          <div className="w-96">
            <Doughnut data={innovationTypeData} options={{
              ...currentChartOptions,
              scales: {
                x: { display: false },
                y: { display: false },
              },
            }} />
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="mt-8 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl text-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-[#E0E0E0] mb-5">Export Innovation Data</h2>
        <button
          onClick={() => {
            const csvContent = [
              csvData[0].join(','),
              ...csvData.slice(1).map(row => row.map(value => `"${value}"`).join(','))
            ].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'innovation_metrics_data.csv';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out text-lg font-semibold"
        >
          <FaDownload className="mr-2" />
          Download Data as CSV
        </button>
      </div>
    </div>
  );
};

export default InnovationMetrics;