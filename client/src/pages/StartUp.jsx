import React, { useState, useEffect } from 'react';
import AddStartupForm from '../components/AddStartupForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../contexts/AuthContext';
import { startupAPI } from '../services/api';

const StartupIncubationPage = () => {
  const { user } = useAuth();
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: 'ease-in-out' });
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const res = await startupAPI.getAll();
      // The backend should already filter by user, but let's double-check
      // Filter startups to only show the current user's entries
      const userStartups = res.data.filter(startup => 
        startup.createdBy === user?._id || startup.createdBy?._id === user?._id
      );
      setStartups(userStartups);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch startups');
      setLoading(false);
    }
  };

  const handleAddStartup = async (newStartup) => {
    try {
      const startupWithDept = { 
        ...newStartup, 
        department: user?.department || '',
        founders: Array.isArray(newStartup.founders) 
          ? newStartup.founders 
          : newStartup.founders.split(',').map(founder => founder.trim())
      };
      const res = await startupAPI.create(startupWithDept);
      setStartups(prev => [...prev, res.data]);
      setIsAdding(false);
      setError(null);
      alert('Startup added successfully!');
    } catch (err) {
      setError('Failed to add startup');
    }
  };

  const handleDeleteStartup = async (id) => {
    if (window.confirm("Are you sure you want to delete this startup?")) {
      try {
        await startupAPI.delete(id);
        setStartups(prev => prev.filter(startup => startup._id !== id));
        alert("Startup deleted successfully!");
      } catch (err) {
        setError('Failed to delete startup');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-center text-red-600 p-8"><h2 className="text-2xl font-bold mb-4">Error</h2><p>{error}</p></div>;

  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        Startup & Incubation
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Total Startups</h3>
          <p className="text-3xl font-bold text-blue-600">{startups.length}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Active Startups</h3>
          <p className="text-3xl font-bold text-green-600">{startups.filter(s => s.status === 'Active').length}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Total Funding</h3>
          <p className="text-3xl font-bold text-purple-600">${startups.reduce((acc, s) => acc + s.funding, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400">Add New Startup</h2>
          <button onClick={() => setIsAdding(!isAdding)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300">
            {isAdding ? 'Cancel' : 'Add Startup'}
          </button>
        </div>
        {isAdding && <AddStartupForm onAddStartup={handleAddStartup} />}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="600">
        <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-6">Startups ({startups.length})</h2>

        {startups.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-8">No startups found. Add your first startup to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <div key={startup._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400">{startup.name}</h3>
                  <button onClick={() => handleDeleteStartup(startup._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Founders:</strong> {Array.isArray(startup.founders) ? startup.founders.join(', ') : startup.founders}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Industry:</strong> {startup.industry}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Stage:</strong> {startup.stage}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Status:</strong> {startup.status}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Funding:</strong> ${startup.funding.toLocaleString()}</p>
                {startup.launchDate && <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Launch Date:</strong> {new Date(startup.launchDate).toLocaleDateString()}</p>}
                <p className="text-gray-600 dark:text-gray-300 text-sm">{startup.description}</p>
              </div>
            ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default StartupIncubationPage;