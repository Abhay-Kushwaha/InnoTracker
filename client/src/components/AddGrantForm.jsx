import React, { useState, useEffect } from 'react';

const AddGrantForm = ({ onAddGrant, user }) => {
    const [title, setTitle] = useState('');
    const [grantor, setGrantor] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('Applied');
    const [applicationDate, setApplicationDate] = useState('');
    const [approvalDate, setApprovalDate] = useState('');
    const [leadResearcher, setLeadResearcher] = useState(user?.name || '');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.name) {
            setLeadResearcher(user.name);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!user || !user.department) {
            setError('User or department information is missing. Please ensure you are logged in.');
            return;
        }

        if (!title || !grantor || !amount || !applicationDate || !leadResearcher) {
            setError('Please fill in all required fields.');
            return;
        }

        const newGrant = {
            title,
            grantor,
            amount: parseFloat(amount) || 0,
            status,
            applicationDate,
            approvalDate: status === 'Approved' && approvalDate ? approvalDate : undefined,
            department: user.department, // Use user's department
            leadResearcher,
            dueDate: dueDate || undefined,
        };

        try {
            onAddGrant(newGrant);
            // Clear form fields
            setTitle('');
            setGrantor('');
            setAmount('');
            setStatus('Applied');
            setApplicationDate('');
            setApprovalDate('');
            setLeadResearcher(user.name || '');
            setDueDate('');
            setError('');
        } catch (err) {
            setError('Failed to add grant. Please try again.');
        }
    };

    if (!user) {
        return (
            <div className="text-red-600 p-4 rounded-lg">
                Please log in to add grants.
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

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Grant Title *
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    required
                />
            </div>

            <div>
                <label htmlFor="grantor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Grantor Organization *
                </label>
                <input
                    type="text"
                    id="grantor"
                    value={grantor}
                    onChange={(e) => setGrantor(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    required
                />
            </div>

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount (USD) *
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            <div>
                <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Application Date *
                </label>
                <input
                    type="date"
                    id="applicationDate"
                    value={applicationDate}
                    onChange={(e) => setApplicationDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    required
                />
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                >
                    <option value="Applied">Applied</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {status === 'Approved' && (
                <div>
                    <label htmlFor="approvalDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Approval Date
                    </label>
                    <input
                        type="date"
                        id="approvalDate"
                        value={approvalDate}
                        onChange={(e) => setApprovalDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    />
                </div>
            )}

            <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                </label>
                <input
                    type="text"
                    id="department"
                    value={user.department}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400"
                    disabled
                />
                <small className="text-gray-500">Your department is automatically set</small>
            </div>

            <div>
                <label htmlFor="leadResearcher" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lead Researcher *
                </label>
                <input
                    type="text"
                    id="leadResearcher"
                    value={leadResearcher}
                    onChange={(e) => setLeadResearcher(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    required
                />
            </div>

            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date (Optional)
                </label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
                Add Grant
            </button>
        </form>
    );
};

export default AddGrantForm;