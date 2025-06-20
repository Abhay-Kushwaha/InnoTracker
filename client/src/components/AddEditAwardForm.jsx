import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AddEditAwardForm = ({ onSubmit, initialData = null, onCancel }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        recipient: '',
        awardType: 'Research',
        awardingBody: '',
        dateReceived: '',
        description: '',
        department: user?.department || ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                recipient: initialData.recipient || '',
                awardType: initialData.awardType || 'Research',
                awardingBody: initialData.awardingBody || '',
                dateReceived: initialData.dateReceived ? new Date(initialData.dateReceived).toISOString().split('T')[0] : '',
                description: initialData.description || '',
                department: initialData.department || user?.department || ''
            });
        }
    }, [initialData, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.title || !formData.recipient || !formData.awardType || 
            !formData.awardingBody || !formData.dateReceived || !formData.description || 
            !formData.department) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            await onSubmit(formData);
            if (onCancel) onCancel();
        } catch (error) {
            alert(error.message || 'Failed to save award');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Award Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recipient <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.recipient}
                        onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Award Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.awardType}
                        onChange={(e) => setFormData({ ...formData, awardType: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    >
                        <option value="Research">Research</option>
                        <option value="Innovation">Innovation</option>
                        <option value="Teaching">Teaching</option>
                        <option value="Service">Service</option>
                        <option value="Other">Other</option>
                    </select>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Awarding Body <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.awardingBody}
                        onChange={(e) => setFormData({ ...formData, awardingBody: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date Received <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={formData.dateReceived}
                        onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
                        required
                    />
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
                    {initialData ? 'Update Award' : 'Add Award'}
                </button>
            </div>
        </form>
    );
};

export default AddEditAwardForm;