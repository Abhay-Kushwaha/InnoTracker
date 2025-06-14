import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroImage from '../assets/img/test.png'; // Adjust path if necessary

const HeroSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <section className="relative flex flex-col lg:flex-row justify-between items-center py-16 px-18 lg:px-20 bg-hero-gradient text-[#014250] overflow-hidden">
            {/* Background Circles */}
            <div id="circle1" className="circle absolute bg-orange-700 bg-opacity-70 left-[10%] top-[10%]"></div>
            <div id="circle2" className="circle absolute bg-gray-600 left-[5%] top-[60%]"></div>
            <div id="circle3" className="circle absolute bg-[#006073] left-[30%] top-[30%]"></div>
            <div id="circle4" className="circle absolute bg-orange-700 bg-opacity-60 left-[35%] top-[80%]"></div>

            <img
                data-aos="slide-right"
                src={heroImage}
                alt="Professional Woman with Degree"
                className="hero-img max-w-[30%] h-auto lg:ml-[6%] mb-8 lg:mb-0"
            />

            <div className="hero-content max-w-full lg:max-w-[50%] text-left">
                <div data-aos="slide-left">
                    <h1 className="text-4xl lg:text-5xl font-bold">Visualise Your <br />Achievements</h1>
                    <h7 className="text-secondary font-medium text-lg block my-6">
                        Our platform helps you maintain a detailed record of patents, startups, and
                        <br />
                        awards related to health, Ayurveda and Advancing Technology within your institution. Analyze and share
                        insights with interactive patents,
                        <br />
                        startups, and
                        <br />
                        charts and visualizations.
                    </h7>
                </div>
                <a href="/login" className="btn inline-block mt-8"><span className='px-8'>Sign in</span></a>
            </div>
        </section>
    );
};

export default HeroSection;