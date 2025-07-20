import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PatentForm from '../../components/PatentForm';
import { patentAPI } from '../../services/api';
import { FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Patent = () => {
    const { user, loading: userLoading } = useAuth();
    const [patents, setPatents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingPatent, setEditingPatent] = useState(null);
    const [filter, setFilter] = useState({
        status: 'All',
        year: ''
    });

    useEffect(() => {
        fetchPatents();
        AOS.init({
            duration: 1000,
            once: false,
            easing: 'ease-in-out',
        });
    }, []);

    const fetchPatents = async () => {
        try {
            const response = await patentAPI.getAll();
            // The backend should already filter by user, but let's double-check
            // Filter patents to only show the current user's entries
            const userPatents = response.data.filter(patent =>
                patent.createdBy === user?._id || patent.createdBy?._id === user?._id
            );
            setPatents(userPatents);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch patents');
            setLoading(false);
        }
    };

    const handleAddPatent = async (patentData) => {
        try {
            const response = await patentAPI.create(patentData);
            setPatents([...patents, response.data]);
            setError(null);
        } catch (err) {
            setError('Failed to add patent');
        }
    };

    const handleUpdatePatent = async (id, patentData) => {
        try {
            const response = await patentAPI.update(id, patentData);
            setPatents(patents.map(patent =>
                patent._id === id ? response.data : patent
            ));
            setEditingPatent(null);
            setError(null);
        } catch (err) {
            setError('Failed to update patent');
        }
    };

    const handleDeletePatent = async (id) => {
        if (window.confirm('Are you sure you want to delete this patent?')) {
            try {
                await patentAPI.delete(id);
                setPatents(patents.filter(patent => patent._id !== id));
                setError(null);
            } catch (err) {
                setError('Failed to delete patent');
            }
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const filteredPatents = patents.filter((patent) => {
        const matchesStatus = filter.status !== 'All'
            ? patent.status === filter.status
            : true;
        const matchesYear = filter.year
            ? new Date(patent.filingDate).getFullYear() === parseInt(filter.year)
            : true;

        return matchesStatus && matchesYear;
    });

    const exportToCSV = () => {
        const csvData = filteredPatents.map(patent => ({
            Title: patent.title,
            PatentNumber: patent.patentNumber || 'N/A',
            Status: patent.status,
            FilingDate: new Date(patent.filingDate).toLocaleDateString(),
            Inventors: Array.isArray(patent.inventors) ? patent.inventors.join(', ') : patent.inventors,
            Department: patent.department,
            Description: patent.description,
            RelatedPublication: patent.relatedPublication ? patent.relatedPublication.title : 'N/A',
            RelatedJournal: patent.relatedPublication ? patent.relatedPublication.journal : 'N/A',
            RelatedDate: patent.relatedPublication ? new Date(patent.relatedPublication.publicationDate).toLocaleDateString() : 'N/A'
        }));

        const csvContent = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'patents.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading || userLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#C9E6F0] dark:bg-zinc-800">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center text-red-600 p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                <p>Please log in to view and manage patents.</p>
            </div>
        );
    }

    return (
        <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
                Patents Management
            </h1>

            <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="200">
                    <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Total Patents</h3>
                    <p className="text-3xl font-bold text-blue-600">{patents.length}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Granted</h3>
                    <p className="text-3xl font-bold text-green-600">{patents.filter(p => p.status === 'Granted').length}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="400">
                    <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Pending</h3>
                    <p className="text-3xl font-bold text-orange-600">{patents.filter(p => p.status === 'Pending').length}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="500">
                    <h3 className="text-lg font-semibold text-[#014250] dark:text-indigo-400 mb-2">Filed</h3>
                    <p className="text-3xl font-bold text-purple-600">{patents.filter(p => p.status === 'Filed').length}</p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="600">
                <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Filter Patents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        name="status"
                        value={filter.status}
                        onChange={handleFilterChange}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
                    >
                        <option value="All">All Status</option>
                        <option value="Filed">Filed</option>
                        <option value="Pending">Pending</option>
                        <option value="Granted">Granted</option>
                        <option value="Rejected">Rejected</option>
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

            {/* Add Patent Form */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 mb-8" data-aos="fade-up" data-aos-delay="700">
                <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-4">
                    {editingPatent ? 'Edit Patent' : 'Add New Patent'}
                </h2>
                <PatentForm
                    onSubmit={editingPatent ?
                        (data) => handleUpdatePatent(editingPatent._id, data) :
                        handleAddPatent}
                    initialData={editingPatent}
                    user={user}
                />
            </div>

            {/* Patents List */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6" data-aos="fade-up" data-aos-delay="800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400">
                        Patents ({filteredPatents.length})
                    </h2>
                    <button
                        onClick={exportToCSV}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300"
                    >
                        <FaDownload className="mr-2" />
                        Export CSV
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {filteredPatents.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                        No patents found matching your criteria.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPatents.map(patent => (
                            <div key={patent._id} className="bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-[#014250] dark:text-indigo-400">{patent.title}</h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setEditingPatent(patent)}
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                            title="Edit Patent"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePatent(patent._id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            title="Delete Patent"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <p><strong>Patent Number:</strong> {patent.patentNumber || 'N/A'}</p>
                                    <p><strong>Status:</strong>
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${patent.status === 'Granted' ? 'bg-green-100 text-green-800' :
                                                patent.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    patent.status === 'Filed' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                            }`}>
                                            {patent.status}
                                        </span>
                                    </p>
                                    <p><strong>Filing Date:</strong> {new Date(patent.filingDate).toLocaleDateString()}</p>
                                    <p><strong>Inventors:</strong> {Array.isArray(patent.inventors) ? patent.inventors.join(', ') : patent.inventors}</p>
                                    <p><strong>Department:</strong> {patent.department}</p>
                                    {patent.relatedPublication && (
                                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                                                📄 Related Publication:
                                            </p>
                                            <p className="text-sm text-blue-700 dark:text-blue-400">
                                                <strong>Title:</strong> {patent.relatedPublication.title}
                                            </p>
                                            <p className="text-sm text-blue-700 dark:text-blue-400">
                                                <strong>Journal:</strong> {patent.relatedPublication.journal}
                                            </p>
                                            <p className="text-sm text-blue-700 dark:text-blue-400">
                                                <strong>Date:</strong> {new Date(patent.relatedPublication.publicationDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                    <p className="mt-2"><strong>Description:</strong></p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{patent.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Patent; 