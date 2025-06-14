// src/pages/AwardsRecognitionPage.jsx
import React, { useState, useEffect } from 'react';
import AwardCard from '../components/AwardCard';
import AddEditAwardForm from '../components/AddEditAwardForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPlusCircle } from 'react-icons/fa';

// Sample data for demonstration
const sampleAwardsData = [
  {
    id: 1,
    awardName: "Padma Shri",
    category: "Civilian Award (Arts)",
    awardingBody: "Government of India",
    year: 2023,
    description: "Awarded for distinguished service in the field of Indian classical music, inspiring a new generation of artists.",
    imageUrl: "../assets/img/medal.jpg",
    link: "https://en.wikipedia.org/wiki/Padma_Shri"
  },
  {
    id: 2,
    awardName: "National Technology Award",
    category: "Innovation & Technology",
    awardingBody: "Ministry of Science & Technology, India",
    year: 2022,
    description: "Recognized for groundbreaking work in sustainable energy solutions, leading to the development of a low-cost solar-powered water purification system.",
    imageUrl: "../assets/img/medal.jpg",
    link: "https://awards.gov.in/"
  },
  {
    id: 3,
    awardName: "Global Impact Innovator",
    category: "International Recognition",
    awardingBody: "World Innovation Council",
    year: 2024,
    description: "Honored for significant contributions to global public health through innovative AI-driven diagnostic tools.",
    imageUrl: "../assets/img/medal.jpg", 
    link: "https://example.com/world-innovation-council"
  }
];

const AwardsRecognitionPage = () => {
  const [awards, setAwards] = useState(sampleAwardsData);
  // const [awards, setAwards] = useState([]); // Uncomment to test empty state
  const [isAdding, setIsAdding] = useState(false);
  const [editingAward, setEditingAward] = useState(null); // Stores award being edited

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const handleAddAward = (newAward) => {
    setAwards((prevAwards) => [...prevAwards, { ...newAward, id: Date.now() }]);
    setIsAdding(false);
    alert("Award added successfully!");
  };

  const handleUpdateAward = (updatedAward) => {
    setAwards((prevAwards) =>
      prevAwards.map((award) =>
        award.id === updatedAward.id ? updatedAward : award
      )
    );
    setEditingAward(null);
    alert("Award updated successfully!");
  };

  const handleDeleteAward = (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      setAwards((prevAwards) => prevAwards.filter((award) => award.id !== id));
      alert("Award deleted successfully!");
    }
  };

  const startEditing = (award) => {
    setEditingAward(award);
    setIsAdding(false); // Ensure add form is closed if editing starts
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingAward(null);
  };

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
            It looks like you haven't added any awards or high recognition yet.
            Click "Add New Award" to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <AwardCard
              key={award.id}
              award={award}
              onEdit={startEditing}
              onDelete={handleDeleteAward}
              data-aos="zoom-in" data-aos-delay="500" // AOS on individual cards
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsRecognitionPage;