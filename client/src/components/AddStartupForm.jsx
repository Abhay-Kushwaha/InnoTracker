// src/components/AddStartupForm.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AddStartupForm = ({ onAddStartup, initialData = null, onCancel = null }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        founders: [''],
        description: '',
        industry: '',
        stage: 'Idea',
        funding: 0,
        launchDate: '',
        department: user?.department || '',
        status: 'Active'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                founders: initialData.founders || [''],
                description: initialData.description || '',
                industry: initialData.industry || '',
                stage: initialData.stage || 'Idea',
                funding: initialData.funding || 0,
                launchDate: initialData.launchDate ? new Date(initialData.launchDate).toISOString().split('T')[0] : '',
                department: initialData.department || user?.department || '',
                status: initialData.status || 'Active'
            });
        }
    }, [initialData, user]);

    const handleFounderChange = (index, value) => {
        const newFounders = [...formData.founders];
        newFounders[index] = value;
        setFormData({ ...formData, founders: newFounders });
    };

    const addFounderField = () => {
        setFormData({ ...formData, founders: [...formData.founders, ''] });
    };

    const removeFounderField = (index) => {
        if (formData.founders.length > 1) {
            const newFounders = formData.founders.filter((_, i) => i !== index);
            setFormData({ ...formData, founders: newFounders });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name || !formData.founders[0] || !formData.description || 
            !formData.industry || !formData.department) {
            alert('Please fill in all required fields');
            return;
        }

        // Filter out empty founder fields
        const cleanedData = {
            ...formData,
            founders: formData.founders.filter(f => f.trim() !== ''),
            funding: Number(formData.funding)
        };

        try {
            await onAddStartup(cleanedData);
            if (onCancel) onCancel();
        } catch (error) {
            alert(error.message || 'Failed to add startup');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Department <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Founders <span className="text-red-500">*</span>
                </label>
                {formData.founders.map((founder, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={founder}
                            onChange={(e) => handleFounderChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800"
                            required={index === 0}
                        />
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeFounderField(index)}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addFounderField}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Add Founder
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Industry <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    >
                        <option value="Idea">Idea</option>
                        <option value="MVP">MVP</option>
                        <option value="Early Stage">Early Stage</option>
                        <option value="Growth">Growth</option>
                        <option value="Established">Established</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                    required
                ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Launch Date
                    </label>
                    <input
                        type="date"
                        value={formData.launchDate}
                        onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Funding (USD)
                    </label>
                    <input
                        type="number"
                        value={formData.funding}
                        onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        min="0"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                </label>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Acquired">Acquired</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>

            <div className="flex justify-end space-x-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {initialData ? 'Update Startup' : 'Add Startup'}
                </button>
            </div>
        </form>
    );
};

export default AddStartupForm;