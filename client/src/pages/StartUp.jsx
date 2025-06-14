// src/pages/StartupIncubationPage.jsx
import React, { useState, useEffect } from 'react';
import StartupDetails from '../components/StartupDetails'; // We'll create this
import AddStartupForm from '../components/AddStartupForm';   // We'll create this
import AOS from 'aos';
import 'aos/dist/aos.css';

// Sample data for demonstration. In a real app, this would come from an API/database.
// This person has startup details
const sampleStartupData = {
  id: 1,
  companyName: "Innovate Solutions Pvt. Ltd.",
  founderName: "Dr. Anya Sharma",
  inceptionDate: "2022-08-15",
  industry: "Artificial Intelligence & SaaS",
  description: "Innovate Solutions develops AI-powered software for optimizing supply chain logistics, helping businesses reduce operational costs and improve efficiency.",
  incubationCenter: "TechHub Innovation Center",
  incubationStartDate: "2022-10-01",
  fundingRaised: 1200000, // in USD
  stage: "Seed Round",
  website: "https://www.innovatesolutions.com",
  contactEmail: "anya.sharma@innovatesolutions.com",
  teamSize: 15,
  achievements: [
    "Secured $1.2M in seed funding.",
    "Awarded 'Most Promising AI Startup' at National Tech Summit 2023.",
    "Successful pilot programs with 3 major logistics companies."
  ]
};

// This person does NOT have startup details (simulate an empty state)
const noStartupData = null; // or an empty object {} depending on your preference

const StartupIncubationPage = () => {
  // For demonstration, you can switch between sampleStartupData and noStartupData
  // to see both states of the page.
  const [myStartup, setMyStartup] = useState(sampleStartupData);
  // const [myStartup, setMyStartup] = useState(noStartupData); // Uncomment this to test the "no startup" state

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const handleAddStartup = (newStartup) => {
    setMyStartup({ ...newStartup, id: Date.now() }); // Assign a simple ID
    // In a real application, you'd send this to your backend and then update state
    alert("Startup details added successfully!");
  };

  const handleUpdateStartup = (updatedStartup) => {
    setMyStartup(updatedStartup);
    // In a real application, you'd send this to your backend and then update state
    alert("Startup details updated successfully!");
  };

  const handleDeleteStartup = () => {
    if (window.confirm("Are you sure you want to delete your startup details?")) {
      setMyStartup(null);
      // In a real application, you'd send a delete request to your backend
      alert("Startup details deleted successfully!");
    }
  };

  return (
    <div className="font-poppins p-4 md:p-8 bg-[#C9E6F0] dark:bg-zinc-800 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#014250] dark:text-[#E0E0E0] mb-6" data-aos="fade-down">
        My Startup & Incubation
      </h1>

      <div className='w-full h-px bg-gray-300 dark:bg-gray-700 mb-8' data-aos="fade-in" data-aos-delay="100"></div>

      {myStartup ? (
        <div data-aos="fade-up" data-aos-delay="200">
          <StartupDetails
            startup={myStartup}
            onUpdate={handleUpdateStartup}
            onDelete={handleDeleteStartup}
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 md:p-8 text-center" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl md:text-3xl font-bold text-[#014250] dark:text-indigo-400 mb-4">
            No Startup Details Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            It looks like you haven't added any startup information yet.
            Use the form below to get started!
          </p>
          <AddStartupForm onAddStartup={handleAddStartup} />
        </div>
      )}
    </div>
  );
};

export default StartupIncubationPage;