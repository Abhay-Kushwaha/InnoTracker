import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PatentForm = ({ onSubmit, initialData, user }) => {
    const [formData, setFormData] = useState({
        title: '',
        inventors: '',
        patentNumber: '',
        filingDate: '',
        status: 'Filed',
        description: '',
        department: user?.department || ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                inventors: Array.isArray(initialData.inventors) ? initialData.inventors.join(', ') : initialData.inventors,
                filingDate: new Date(initialData.filingDate).toISOString().split('T')[0]
            });
        } else if (user?.name) {
            setFormData(prev => ({
                ...prev,
                inventors: user.name,
                department: user.department
            }));
        }
    }, [initialData, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!user || !user.department) {
            setError('User or department information is missing. Please ensure you are logged in.');
            return;
        }

        // Ensure the current user is included in inventors
        let inventorsList = formData.inventors.split(',').map(i => i.trim()).filter(i => i);
        if (!inventorsList.some(inventor => inventor.toLowerCase() === user.name.toLowerCase())) {
            inventorsList = [user.name, ...inventorsList];
        }

        const submitData = {
            ...formData,
            inventors: inventorsList,
            department: user.department
        };

        try {
            onSubmit(submitData);
            if (!initialData) {
                // Clear form only if it's a new patent
                setFormData({
                    title: '',
                    inventors: user.name,
                    patentNumber: '',
                    filingDate: '',
                    status: 'Filed',
                    description: '',
                    department: user.department
                });
            }
            setError('');
        } catch (err) {
            setError('Failed to submit patent. Please try again.');
        }
    };

    if (!user) {
        return (
            <div className="text-red-600 p-4 rounded-lg">
                Please log in to manage patents.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Inventors *
                    </label>
                    <input
                        type="text"
                        name="inventors"
                        value={formData.inventors}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        placeholder="Comma-separated names"
                        required
                    />
                    <small className="text-gray-500">Your name will be automatically included.</small>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Patent Number
                    </label>
                    <input
                        type="text"
                        name="patentNumber"
                        value={formData.patentNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Filing Date *
                    </label>
                    <input
                        type="date"
                        name="filingDate"
                        value={formData.filingDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status *
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    >
                        <option value="Filed">Filed</option>
                        <option value="Pending">Pending</option>
                        <option value="Granted">Granted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Department
                    </label>
                    <input
                        type="text"
                        name="department"
                        value={user.department}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400"
                        disabled
                    />
                    <small className="text-gray-500">Your department is automatically set</small>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description *
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    rows="4"
                    required
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    {initialData ? 'Update Patent' : 'Add Patent'}
                </button>
            </div>
        </form>
    );
};

export default PatentForm; 