import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import innovationIcon from '../assets/img/vector2239-1r9.svg';
import decisionMakingIcon from '../assets/img/vector2243-u6xq.svg';
import metricsIcon from '../assets/img/vector2254-f1on.svg';
import analyticsIcon from '../assets/img/vector2258-xpv.svg';
import collaborativeIcon from '../assets/img/bookreader2262-wzhp.svg';

const WorksSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    const iconBoxes = [
        {
            icon: innovationIcon,
            title: 'Research & Development',
            description: 'Innovative approaches to research and development in field of Health, Ayurved and technology.',
        },
        {
            icon: decisionMakingIcon,
            title: 'Strategic Decision-Making',
            description: 'Data-driven strategies for effective decision-making.',
        },
        {
            icon: metricsIcon,
            title: 'Health Innovation Metrics',
            description: 'Tracking key metrics for innovation success.',
        },
        {
            icon: analyticsIcon,
            title: 'Data Analytics & Visualization',
            description: 'Turning data into actionable insights through visualization.',
        },
        {
            icon: collaborativeIcon,
            title: 'Collaborative Projects',
            description: 'Fostering teamwork and collaboration to drive innovation.',
        },
    ];

    return (
        <div className="container mx-auto py-12 px-20" data-aos="flip-up">
            <div className="flex flex-col lg:flex-row mb-12">
                <div className="lg:w-1/2 flex justify-start items-center mb-8 lg:mb-0">
                    <div>
                        <h1 className="font-bold uppercase text-5xl lg:text-6xl leading-tight">
                            Ignite Innovation: Empowering Educational<span className="text-[#0a697c]"> <i>Excellence</i></span>
                        </h1>
                        <p className="text-gray-600 text-2xl mt-4">Through Data-Driven Insights</p>
                    </div>
                </div>

                <div className="lg:w-1/2 flex justify-end">
                    <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 text-center bg-[#0a697c] rounded-lg p-5">
                        {iconBoxes.map((box, index) => (
                            <div className="mb-4" key={index}>
                                <div className="flex flex-col items-center bg-feature-gradient p-4 rounded-lg shadow-md h-full transition-transform duration-300 ease-in-out hover:scale-105">
                                    <img src={box.icon} alt={box.title} className="mb-3 w-16" />
                                    <h5 className="font-bold text-black text-lg mb-1">{box.title}</h5>
                                    <p className="text-gray-700 text-sm">{box.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 mb-20" data-aos="slide-right">
                <h2 className="font-bold uppercase text-5xl lg:text-6xl p-1 text-[#171414] tracking-wider drop-shadow-lg font-poppins">
                    Innovation <br /> & <br />Excellence at Your
                    <span className="text-[#0a697c]"> Fingertips.</span>
                </h2>
            </div>
        </div>
    );
};

export default WorksSection;