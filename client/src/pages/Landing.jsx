import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import InnoTracker from '../components/InnoTrackerSection';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import WorksSection from '../components/WorksSection';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import '../App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, 
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className="App">
            <Navbar />
            <InnoTracker />
            <HeroSection />
            <Features />
            <WorksSection />
            <Reviews />
            <Footer />
        </div>
    );
}

export default Landing
