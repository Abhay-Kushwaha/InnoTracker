import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const InnoTracker = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <nav className="bg-[#006073] text-white h-32 flex items-center justify-center">
            <div className="container mx-auto px-4" data-aos="flip-up">
                <h2 className="text-center text-5xl font-bold">Inno Tracker</h2>
                <p className="text-center font-bold text-base mt-2">Track Ayurvedic Patents, Startups, and Awards with Powerful Visualizations</p>
            </div>
        </nav>
    );
};

export default InnoTracker;