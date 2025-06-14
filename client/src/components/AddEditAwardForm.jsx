import React, { useState, useEffect } from 'react';

const AddEditAwardForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [awardName, setAwardName] = useState('');
    const [category, setCategory] = useState('');
    const [awardingBody, setAwardingBody] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (initialData) {
            setAwardName(initialData.awardName || '');
            setCategory(initialData.category || '');
            setAwardingBody(initialData.awardingBody || '');
            setYear(initialData.year || '');
            setDescription(initialData.description || '');
            setImageUrl(initialData.imageUrl || '');
            setLink(initialData.link || '');
        } else {
            // Reset form for new entry if initialData is null
            setAwardName('');
            setCategory('');
            setAwardingBody('');
            setYear('');
            setDescription('');
            setImageUrl('');
            setLink('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!awardName || !category || !awardingBody || !year || !description) {
            alert('Please fill in all required fields: Award Name, Category, Awarding Body, Year, and Description.');
            return;
        }

        const awardData = {
            id: initialData ? initialData.id : null, // Preserve ID for editing
            awardName,
            category,
            awardingBody,
            year: parseInt(year),
            description,
            imageUrl: imageUrl || null,
            link: link || null,
        };
        onSubmit(awardData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="awardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Award Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="awardName"
                        value={awardName}
                        onChange={(e) => setAwardName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        placeholder="e.g., Civilian, Sports, Innovation"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="awardingBody" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Awarding Body <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="awardingBody"
                        value={awardingBody}
                        onChange={(e) => setAwardingBody(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        placeholder="e.g., Government of India, XYZ Foundation"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description <span className="text-red-500">*</span></label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    placeholder="Describe the award and its significance..."
                    required
                ></textarea>
            </div>

            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL (Optional)</label>
                <input
                    type="url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    placeholder="https://example.com/award-medal.jpg"
                />
            </div>

            <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">External Link (Optional)</label>
                <input
                    type="url"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    placeholder="https://example.com/award-details"
                />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    {initialData ? 'Update Award' : 'Add Award'}
                </button>
            </div>
        </form>
    );
};

export default AddEditAwardForm;