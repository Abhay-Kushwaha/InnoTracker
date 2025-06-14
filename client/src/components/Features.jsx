import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Features = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className="my-5" id="features">
            <h2 className="text-center mb-10 text-4xl font-extrabold" data-aos="zoom-in">OUR KEY FEATURES</h2>

            <div className="container mx-auto px-20 my-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1: Startup Records */}
                    <div className="mt-4" data-aos="flip-right">
                        <div className="bg-black text-white min-h-500 rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <h3 className="font-bold text-[#94d2bd] text-2xl mb-2">Startup Records</h3>
                            <p className="font-bold text-[#f0f0f0]">
                                Maintain a detailed history of startups founded within your institution.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Awards and Recognition */}
                    <div className="mt-4" data-aos="flip-right">
                        <div className="bg-black text-white rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <h3 className="font-bold text-[#94d2bd] text-2xl mb-2">Awards and Recognition</h3>
                            <p className="font-bold text-[#f0f0f0]">
                                Log and visualize awards earned at individual and institutional levels in fields of Health, Ayurveda and Technology.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Interactive Dashboards */}
                    <div className="mt-4" data-aos="flip-right">
                        <div className="bg-black text-white rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <h3 className="font-bold text-[#94d2bd] text-2xl mb-2">Interactive Dashboards</h3>
                            <p className="font-bold text-[#f0f0f0]">
                                Use charts and graphs to gain <br />actionable insights from your data.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4: Patent Management */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-4" data-aos="flip-right">
                        <div className="bg-black text-white rounded-lg p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg w-full md:w-1/2 lg:w-1/3 text-center">
                            <h3 className="font-bold text-[#94d2bd] text-2xl mb-2">Patent Management</h3>
                            <p className="font-bold text-[#f0f0f0]">
                                Track and analyze patents <br /> filed by individuals, teams, or
                                departments effortlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;