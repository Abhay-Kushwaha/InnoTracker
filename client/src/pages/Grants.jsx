import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaDownload } from 'react-icons/fa';
import GrantCard from '../components/GrantCard';
import AddGrantForm from '../components/AddGrantForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../contexts/AuthContext';
import { grantAPI } from '../services/api';

Chart.register(...registerables);

const GrantsFundingPage = () => {
  const { user } = useAuth();
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    grantor: '',
    status: 'All',
    year: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-in-out' });
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      const res = await grantAPI.getAll();
      // The backend should already filter by user, but let's double-check
      // Filter grants to only show the current user's entries
      const userGrants = res.data.filter(grant => 
        grant.createdBy === user?._id || grant.createdBy?._id === user?._id
      );
      setGrants(userGrants);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch grants');
      setLoading(false);
    }
  };

  const handleAddGrant = async (newGrant) => {
    try {
      const grantWithDept = { ...newGrant, department: user?.department || '' };
      const res = await grantAPI.create(grantWithDept);
      setGrants(prev => [...prev, res.data]);
      setError(null);
      alert('Grant added successfully!');
    } catch (err) {
      setError('Failed to add grant');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredGrants = grants.filter((grant) => {
    const matchesGrantor = filter.grantor
      ? grant.grantor.toLowerCase().includes(filter.grantor.toLowerCase())
      : true;
    const matchesStatus = filter.status !== 'All'
      ? grant.status === filter.status
      : true;
    const matchesYear = filter.year
      ? new Date(grant.applicationDate).getFullYear() === parseInt(filter.year)
      : true;

    return matchesGrantor && matchesStatus && matchesYear;
  });

  // Chart data
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
        borderColor: 'rgba(34, 197, 94, 0.8)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const grantsByStatus = grants.reduce((acc, grant) => {
    acc[grant.status] = (acc[grant.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = {
    labels: Object.keys(grantsByStatus),
    datasets: [
      {
        label: 'Number of Grants',
        data: Object.values(grantsByStatus),
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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

  const exportToCSV = () => {
    const csvData = filteredGrants.map(grant => ({
      Title: grant.title,
      Grantor: grant.grantor,
      Amount: grant.amount,
      Status: grant.status,
      ApplicationDate: new Date(grant.applicationDate).toLocaleDateString(),
      ApprovalDate: grant.approvalDate ? new Date(grant.approvalDate).toLocaleDateString() : 'N/A',
      DueDate: grant.dueDate ? new Date(grant.dueDate).toLocaleDateString() : 'N/A',
      LeadResearcher: grant.leadResearcher,
      Department: grant.department
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grants.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
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
        Grants & Funding
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Total Grants</h3>
          <p className="text-3xl font-bold text-blue-600">{grants.length}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{grants.filter(g => g.status === 'Approved').length}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Total Funding</h3>
          <p className="text-3xl font-bold text-purple-600">${grants.filter(g => g.status === 'Approved').reduce((acc, g) => acc + g.amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="500">
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-orange-600">{grants.filter(g => g.status === 'Applied').length}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="600">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Filter Grants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="grantor"
            placeholder="Search by grantor..."
            value={filter.grantor}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
          />
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="In Progress">In Progress</option>
          </select>
          <input
            type="number"
            name="year"
            placeholder="Filter by year..."
            value={filter.year}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-right" data-aos-delay="700">
          <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Funding Over Time</h3>
          <div className="h-64">
            <Line data={fundingOverTimeData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-left" data-aos-delay="800">
          <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Grants by Status</h3>
          <div className="h-64">
            <Bar data={statusData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Add Grant Form */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="900">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Add New Grant</h2>
        <AddGrantForm onAddGrant={handleAddGrant} user={user} />
      </div>

      {/* Grants List */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="1000">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400">
            Grants ({filteredGrants.length})
          </h2>
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300"
          >
            <FaDownload className="mr-2" />
            Export CSV
          </button>
        </div>

        {filteredGrants.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-8">
            No grants found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrants.map((grant) => (
              <GrantCard key={grant._id} grant={grant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrantsFundingPage; 