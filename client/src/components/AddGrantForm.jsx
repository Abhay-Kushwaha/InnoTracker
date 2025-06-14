import React, { useState } from 'react';

const AddGrantForm = ({ onAddGrant }) => {
    const [title, setTitle] = useState('');
    const [grantor, setGrantor] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('Applied'); // Default status
    const [applicationDate, setApplicationDate] = useState('');
    const [approvalDate, setApprovalDate] = useState(''); // Optional
    const [department, setDepartment] = useState('');
    const [leadResearcher, setLeadResearcher] = useState('');
    const [dueDate, setDueDate] = useState(''); // Optional

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !grantor || !amount || !applicationDate || !department || !leadResearcher) {
            alert('Please fill in all required fields (Title, Grantor, Amount, Application Date, Department, Lead Researcher).');
            return;
        }

        const newGrant = {
            title,
            grantor,
            amount: parseFloat(amount) || 0,
            status,
            applicationDate,
            approvalDate: status === 'Approved' && approvalDate ? approvalDate : null,
            department,
            leadResearcher,
            dueDate: dueDate || null,
        };

        onAddGrant(newGrant); // Call the passed function to add
        // Clear form fields
        setTitle('');
        setGrantor('');
        setAmount('');
        setStatus('Applied');
        setApplicationDate('');
        setApprovalDate('');
        setDepartment('');
        setLeadResearcher('');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grant Title</label>
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
                <label htmlFor="grantor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grantor Organization</label>
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
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (USD)</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    min="0"
                    required
                />
            </div>
            <div>
                <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Application Date</label>
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                >
                    <option value="Applied">Applied</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            {status === 'Approved' && (
                <div>
                    <label htmlFor="approvalDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Approval Date</label>
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
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    required
                >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Engineering">Engineering</option>
                </select>
            </div>
            <div>
                <label htmlFor="leadResearcher" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lead Researcher</label>
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
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date (Optional)</label>
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