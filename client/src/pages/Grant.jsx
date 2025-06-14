// src/pages/GrantsFunding.jsx
import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaDownload } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import GrantCard from '../components/GrantCard';
import AddGrantForm from '../components/AddGrantForm';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Register all necessary components from Chart.js
Chart.register(...registerables);

// Sample data for grants and funding (replace with actual data from API)
const initialGrantsData = [
  {
    id: 1,
    title: "Innovations in Sustainable Agriculture",
    grantor: "National Science Foundation",
    amount: 150000,
    status: "Approved",
    applicationDate: "2023-03-10",
    approvalDate: "2023-06-01",
    department: "Biology",
    leadResearcher: "Dr. Alex Green",
    dueDate: "2023-05-15",
  },
  {
    id: 2,
    title: "AI-Powered Drug Discovery",
    grantor: "National Institutes of Health",
    amount: 250000,
    status: "Applied",
    applicationDate: "2024-01-20",
    approvalDate: null,
    department: "Computer Science",
    leadResearcher: "Dr. Jane Doe",
    dueDate: "2024-04-30",
  },
  {
    id: 3,
    title: "Quantum Materials Research",
    grantor: "Department of Energy",
    amount: 100000,
    status: "Approved",
    applicationDate: "2022-09-01",
    approvalDate: "2022-12-15",
    department: "Physics",
    leadResearcher: "Dr. Bob White",
    dueDate: "2022-11-01",
  },
  {
    id: 4,
    title: "Advanced Battery Technologies",
    grantor: "Energy Innovation Fund",
    amount: 75000,
    status: "Rejected",
    applicationDate: "2023-05-01",
    approvalDate: "2023-08-10",
    department: "Chemistry",
    leadResearcher: "Dr. Sarah Lee",
    dueDate: "2023-07-01",
  },
];

const GrantsFundingPage = () => {
  const [grants, setGrants] = useState(initialGrantsData);
  const [filter, setFilter] = useState({
    grantor: '',
    status: 'All',
    year: '',
    minAmount: '',
    maxAmount: '',
    department: '',
  });
  const [filteredGrants, setFilteredGrants] = useState(initialGrantsData);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  // Apply filters whenever grants or filter state changes
  useEffect(() => {
    let currentFiltered = grants;

    if (filter.grantor) {
      currentFiltered = currentFiltered.filter(grant =>
        grant.grantor.toLowerCase().includes(filter.grantor.toLowerCase())
      );
    }
    if (filter.status && filter.status !== 'All') {
      currentFiltered = currentFiltered.filter(grant => grant.status === filter.status);
    }
    if (filter.year) {
      currentFiltered = currentFiltered.filter(grant =>
        new Date(grant.applicationDate).getFullYear() === parseInt(filter.year)
      );
    }
    if (filter.minAmount) {
      currentFiltered = currentFiltered.filter(grant => grant.amount >= parseFloat(filter.minAmount));
    }
    if (filter.maxAmount) {
      currentFiltered = currentFiltered.filter(grant => grant.amount <= parseFloat(filter.maxAmount));
    }
    if (filter.department) {
      currentFiltered = currentFiltered.filter(grant => grant.department === filter.department);
    }

    setFilteredGrants(currentFiltered);
  }, [grants, filter]); // Dependency array

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleAddGrant = (newGrant) => {
    const newId = grants.length > 0 ? Math.max(...grants.map(g => g.id)) + 1 : 1;
    setGrants(prev => [...prev, { ...newGrant, id: newId }]);
  };

  // --- Chart Data Preparation ---
  const approvedGrantsByYear = grants
    .filter(g => g.status === 'Approved' && g.approvalDate)
    .reduce((acc, grant) => {
      const year = new Date(grant.approvalDate).getFullYear();
      acc[year] = (acc[year] || 0) + grant.amount;
      return acc;
    }, {});

  const sortedYears = Object.keys(approvedGrantsByYear).sort((a, b) => parseInt(a) - parseInt(b));

  const fundingOverTimeData = {
    labels: sortedYears.length > 0 ? sortedYears : ['No Data'],
    datasets: [
      {
        label: 'Funding Secured (USD)',
        data: sortedYears.length > 0 ? sortedYears.map(year => approvedGrantsByYear[year]) : [0],
        borderColor: 'rgba(34, 197, 94, 0.8)', // Tailwind green-500
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Funding Distribution by Department (Pie Chart)
  const fundingByDepartment = grants
    .filter(g => g.status === 'Approved' && g.department)
    .reduce((acc, grant) => {
      acc[grant.department] = (acc[grant.department] || 0) + grant.amount;
      return acc;
    }, {});

  const pieChartColors = [
    'rgba(99, 102, 241, 0.7)', // Indigo-500
    'rgba(249, 115, 22, 0.7)', // Orange-500
    'rgba(6, 182, 212, 0.7)',  // Cyan-500
    'rgba(234, 179, 8, 0.7)',  // Yellow-500
    'rgba(239, 68, 68, 0.7)',  // Red-500
    'rgba(168, 85, 247, 0.7)', // Purple-500
  ];

  const fundingDistributionData = {
    labels: Object.keys(fundingByDepartment),
    datasets: [
      {
        data: Object.values(fundingByDepartment),
        backgroundColor: Object.keys(fundingByDepartment).map((_, i) => pieChartColors[i % pieChartColors.length]),
        borderColor: Object.keys(fundingByDepartment).map((_, i) => pieChartColors[i % pieChartColors.length].replace('0.7', '1')),
        borderWidth: 1,
      },
    ],
  };

  // Grants by Status (Bar Chart)
  const grantsByStatus = grants.reduce((acc, grant) => {
    acc[grant.status] = (acc[grant.status] || 0) + 1;
    return acc;
  }, {});

  const statusOrder = ['Applied', 'Approved', 'Rejected']; // Define a consistent order
  const statusLabels = statusOrder.filter(status => grantsByStatus[status] !== undefined);
  const statusCounts = statusLabels.map(status => grantsByStatus[status]);

  const grantsByStatusData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Number of Grants',
        data: statusCounts,
        backgroundColor: statusLabels.map(status => {
          if (status === 'Approved') return 'rgba(34, 197, 94, 0.7)'; // Green
          if (status === 'Applied') return 'rgba(59, 130, 246, 0.7)'; // Blue
          if (status === 'Rejected') return 'rgba(239, 68, 68, 0.7)'; // Red
          return 'rgba(107, 114, 128, 0.7)'; // Gray for others
        }),
        borderColor: statusLabels.map(status => {
          if (status === 'Approved') return 'rgba(34, 197, 94, 1)';
          if (status === 'Applied') return 'rgba(59, 130, 246, 1)';
          if (status === 'Rejected') return 'rgba(239, 68, 68, 1)';
          return 'rgba(107, 114, 128, 1)';
        }),
        borderWidth: 1,
      },
    ],
  };

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
        ticks: { color: 'rgba(55, 65, 81, 1)' }, // gray-700
        grid: { color: 'rgba(209, 213, 219, 0.3)' }, // gray-300 light
      },
      y: {
        ticks: { color: 'rgba(55, 65, 81, 1)' }, // gray-700
        grid: { color: 'rgba(209, 213, 219, 0.3)' }, // gray-300 light
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
        ticks: { color: 'rgba(209, 213, 219, 1)' }, // gray-300
        grid: { color: 'rgba(107, 114, 128, 0.3)' }, // gray-500 light
      },
      y: {
        ticks: { color: 'rgba(209, 213, 219, 1)' }, // gray-300
        grid: { color: 'rgba(107, 114, 128, 0.3)' }, // gray-500 light
      },
    },
  };

  const currentChartOptions = document.documentElement.classList.contains('dark')
    ? darkChartOptions
    : chartOptions;

  // Prepare CSV data for export
  const csvData = [
    ['ID', 'Title', 'Grantor', 'Amount', 'Status', 'Application Date', 'Approval Date', 'Department', 'Lead Researcher', 'Due Date'],
    ...filteredGrants.map(g => [
      g.id, g.title, g.grantor, g.amount, g.status, g.applicationDate, g.approvalDate, g.department, g.leadResearcher, g.dueDate
    ])
  ];

  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Grants & Funding
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {/* Filter Bar */}
      <div className="sticky top-4 z-10 bg-white dark:bg-zinc-900 shadow-xl p-4 md:p-6 mb-8 rounded-lg flex flex-wrap items-center gap-4">
        <input
          type="text"
          name="grantor"
          placeholder="Filter by Grantor"
          className="flex-grow min-w-[180px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={filter.grantor}
          onChange={handleFilterChange}
        />
        <select
          name="status"
          className="flex-grow min-w-[150px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
          value={filter.status}
          onChange={handleFilterChange}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          name="department"
          className="flex-grow min-w-[150px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
          value={filter.department}
          onChange={handleFilterChange}
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Engineering">Engineering</option>
        </select>
        <input
          type="number"
          name="minAmount"
          placeholder="Min Amount"
          className="flex-grow min-w-[100px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={filter.minAmount}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxAmount"
          placeholder="Max Amount"
          className="flex-grow min-w-[100px] border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={filter.maxAmount}
          onChange={handleFilterChange}
        />
      </div>

      {/* Grants List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 my-6">
        {filteredGrants.length > 0 ? (
          filteredGrants.map((grant, index) => (
            <GrantCard key={grant.id} grant={grant} data-aos="fade-up" data-aos-delay={250 + (index * 50)} />
          ))
        ) : (
          <p className="col-span-full text-center text-xl font-medium text-gray-500 dark:text-gray-400 py-10" data-aos="fade-in" data-aos-delay="500">
            No grants found matching your criteria.
          </p>
        )}
      </div>

      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-right" data-aos-delay="300">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Funding Secured Over Time</h2>
          <div className="h-72">
            <Line data={fundingOverTimeData} options={currentChartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-left" data-aos-delay="400">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Funding Distribution by Department</h2>
          <div className="h-72 flex justify-center items-center"> {/* Center pie chart */}
            <Pie data={fundingDistributionData} options={{
              ...currentChartOptions,
              scales: { x: { display: false }, y: { display: false } },
            }} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 lg:col-span-2" data-aos="fade-up" data-aos-delay="500">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Grants by Status</h2>
          <div className="h-72">
            <Bar data={grantsByStatusData} options={currentChartOptions} />
          </div>
        </div>
      </div>

      {/* Add Grant Form */}
      <div className="mt-10 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-6">Add New Grant Application</h2>
        <AddGrantForm onAddGrant={handleAddGrant} />
      </div>

      {/* Data Export */}
      <div className="mt-8 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl text-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-[#E0E0E0] mb-5">Export Grants Data</h2>
        <CSVLink
          data={csvData}
          filename={"grants_funding_data.csv"}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out text-lg font-semibold"
          target="_blank"
        >
          <FaDownload className="inline-block mr-2" /> Download Data as CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default GrantsFundingPage;