// src/components/AddStartupForm.jsx
import React, { useState, useEffect } from 'react';

const AddStartupForm = ({ onAddStartup, initialData = null, onCancel = null }) => {
    const [companyName, setCompanyName] = useState('');
    const [founderName, setFounderName] = useState('');
    const [inceptionDate, setInceptionDate] = useState('');
    const [industry, setIndustry] = useState('');
    const [description, setDescription] = useState('');
    const [incubationCenter, setIncubationCenter] = useState('');
    const [incubationStartDate, setIncubationStartDate] = useState('');
    const [fundingRaised, setFundingRaised] = useState('');
    const [stage, setStage] = useState('Ideation'); // Default stage
    const [website, setWebsite] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [achievements, setAchievements] = useState(['']); // Start with one empty achievement field

    useEffect(() => {
        if (initialData) {
            setCompanyName(initialData.companyName || '');
            setFounderName(initialData.founderName || '');
            setInceptionDate(initialData.inceptionDate || '');
            setIndustry(initialData.industry || '');
            setDescription(initialData.description || '');
            setIncubationCenter(initialData.incubationCenter || '');
            setIncubationStartDate(initialData.incubationStartDate || '');
            setFundingRaised(initialData.fundingRaised || '');
            setStage(initialData.stage || 'Ideation');
            setWebsite(initialData.website || '');
            setContactEmail(initialData.contactEmail || '');
            setTeamSize(initialData.teamSize || '');
            setAchievements(initialData.achievements && initialData.achievements.length > 0 ? initialData.achievements : ['']);
        }
    }, [initialData]);

    const handleAchievementChange = (index, value) => {
        const newAchievements = [...achievements];
        newAchievements[index] = value;
        setAchievements(newAchievements);
    };

    const addAchievementField = () => {
        setAchievements([...achievements, '']);
    };

    const removeAchievementField = (index) => {
        const newAchievements = achievements.filter((_, i) => i !== index);
        setAchievements(newAchievements);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if (!companyName || !founderName || !inceptionDate || !industry || !description || !stage) {
            alert('Please fill in all required fields: Company Name, Founder Name, Inception Date, Industry, Description, and Stage.');
            return;
        }

        const newStartup = {
            id: initialData ? initialData.id : Date.now(), // Keep existing ID if editing
            companyName,
            founderName,
            inceptionDate,
            industry,
            description,
            incubationCenter: incubationCenter || null,
            incubationStartDate: incubationStartDate || null,
            fundingRaised: fundingRaised ? parseInt(fundingRaised) : 0,
            stage,
            website: website || null,
            contactEmail: contactEmail || null,
            teamSize: teamSize ? parseInt(teamSize) : 0,
            achievements: achievements.filter(a => a.trim() !== '')
        };

        onAddStartup(newStartup); // This function will handle both add and update
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="founderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Founder Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="founderName"
                        value={founderName}
                        onChange={(e) => setFounderName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="inceptionDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inception Date <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        id="inceptionDate"
                        value={inceptionDate}
                        onChange={(e) => setInceptionDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        placeholder="e.g., AI, Fintech, EdTech"
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
                    placeholder="Briefly describe your startup and its mission..."
                    required
                ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="incubationCenter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Incubation Center (Optional)</label>
                    <input
                        type="text"
                        id="incubationCenter"
                        value={incubationCenter}
                        onChange={(e) => setIncubationCenter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        placeholder="e.g., TechHub Innovation Center"
                    />
                </div>
                <div>
                    <label htmlFor="incubationStartDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Incubation Start Date (Optional)</label>
                    <input
                        type="date"
                        id="incubationStartDate"
                        value={incubationStartDate}
                        onChange={(e) => setIncubationStartDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="fundingRaised" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Funding Raised (USD) (Optional)</label>
                    <input
                        type="number"
                        id="fundingRaised"
                        value={fundingRaised}
                        onChange={(e) => setFundingRaised(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        min="0"
                    />
                </div>
                <div>
                    <label htmlFor="stage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stage <span className="text-red-500">*</span></label>
                    <select
                        id="stage"
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        required
                    >
                        <option value="Ideation">Ideation</option>
                        <option value="Proof of Concept">Proof of Concept</option>
                        <option value="Seed Round">Seed Round</option>
                        <option value="Series A">Series A</option>
                        <option value="Growth">Growth</option>
                        <option value="Mature">Mature</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website (Optional)</label>
                    <input
                        type="url"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        placeholder="https://www.yourstartup.com"
                    />
                </div>
                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email (Optional)</label>
                    <input
                        type="email"
                        id="contactEmail"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        placeholder="contact@yourstartup.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Size (Optional)</label>
                <input
                    type="number"
                    id="teamSize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                    min="1"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Achievements (Optional)</label>
                {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-3">
                        <input
                            type="text"
                            value={achievement}
                            onChange={(e) => handleAchievementChange(index, e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                            placeholder={`Achievement ${index + 1}`}
                        />
                        {achievements.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeAchievementField(index)}
                                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                            >
                                -
                            </button>
                        )}
                        {index === achievements.length - 1 && (
                            <button
                                type="button"
                                onClick={addAchievementField}
                                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                            >
                                +
                            </button>
                        )}
                    </div>
                ))}
                {achievements.length === 0 && ( // Allow adding if all are removed
                    <button
                        type="button"
                        onClick={addAchievementField}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Add Achievement
                    </button>
                )}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                {onCancel && ( // Show cancel button only in edit mode
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    {initialData ? 'Update Startup' : 'Add Startup'}
                </button>
            </div>
        </form>
    );
};

export default AddStartupForm;