// src/pages/AwardsRecognitionPage.jsx
import React, { useState, useEffect } from 'react';
import AwardCard from '../components/AwardCard';
import AddEditAwardForm from '../components/AddEditAwardForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPlusCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { awardAPI } from '../services/api';

const AwardsRecognitionPage = () => {
  const { user } = useAuth();
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAward, setEditingAward] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const res = await awardAPI.getAll();
      // The backend should already filter by user, but let's double-check
      // Filter awards to only show the current user's entries
      const userAwards = res.data.filter(award => 
        award.createdBy === user?._id || award.createdBy?._id === user?._id
      );
      setAwards(userAwards);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch awards');
      setLoading(false);
    }
  };

  const handleAddAward = async (formData) => {
    try {
      // Transform form data to match backend model
      const awardData = {
        title: formData.title,
        recipient: formData.recipient,
        awardType: formData.awardType,
        awardingBody: formData.awardingBody,
        dateReceived: formData.dateReceived,
        description: formData.description,
        department: formData.department || user?.department || ''
      };

      const res = await awardAPI.create(awardData);
      setAwards(prev => [...prev, res.data]);
      setIsAdding(false);
      setError(null);
      alert('Award added successfully!');
    } catch (err) {
      console.error('Error adding award:', err);
      setError(err.response?.data?.message || 'Failed to add award');
    }
  };

  const handleUpdateAward = async (formData) => {
    try {
      // Transform form data to match backend model
      const awardData = {
        title: formData.title,
        recipient: formData.recipient,
        awardType: formData.awardType,
        awardingBody: formData.awardingBody,
        dateReceived: formData.dateReceived,
        description: formData.description,
        department: formData.department || user?.department || ''
      };

      const res = await awardAPI.update(editingAward._id, awardData);
      setAwards(prev => prev.map(award => 
        award._id === editingAward._id ? res.data : award
      ));
      setEditingAward(null);
      alert("Award updated successfully!");
    } catch (err) {
      console.error('Error updating award:', err);
      setError(err.response?.data?.message || 'Failed to update award');
    }
  };

  const handleDeleteAward = async (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      try {
        await awardAPI.delete(id);
        setAwards(prev => prev.filter(award => award._id !== id));
        alert("Award deleted successfully!");
      } catch (err) {
        console.error('Error deleting award:', err);
        setError(err.response?.data?.message || 'Failed to delete award');
      }
    }
  };

  const startEditing = (award) => {
    // Transform award data to match form fields
    const formData = {
      title: award.title,
      recipient: award.recipient,
      awardType: award.awardType,
      awardingBody: award.awardingBody,
      dateReceived: award.dateReceived,
      description: award.description,
      department: award.department
    };
    setEditingAward({ ...award, ...formData });
    setIsAdding(false);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingAward(null);
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
        Awards & Recognition
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      <div className="flex justify-end mb-6" data-aos="fade-left" data-aos-delay="200">
        {!isAdding && !editingAward && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            <FaPlusCircle className="mr-2" /> Add New Award
          </button>
        )}
      </div>

      {(isAdding || editingAward) && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 md:p-8 mb-8" data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-2xl font-bold text-[#014250] dark:text-indigo-400 mb-6">
            {editingAward ? 'Edit Award Details' : 'Add New Award'}
          </h2>
          <AddEditAwardForm
            initialData={editingAward}
            onSubmit={editingAward ? handleUpdateAward : handleAddAward}
            onCancel={cancelForm}
          />
        </div>
      )}

      {awards.length === 0 && !isAdding && !editingAward ? (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 md:p-8 text-center" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-2xl md:text-3xl font-bold text-[#014250] dark:text-indigo-400 mb-4">
            No Awards Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            It looks like you haven't added any awards or recognition yet.
            Click "Add New Award" to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <AwardCard
              key={award._id}
              award={award}
              onEdit={startEditing}
              onDelete={handleDeleteAward}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsRecognitionPage;