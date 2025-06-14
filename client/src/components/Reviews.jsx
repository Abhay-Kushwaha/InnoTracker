import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Reviews = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    const reviewData = [
        {
            text: "This platform made it so easy to manage our institution's patents and awards. The visualizations are top-notch!",
        },
        {
            text: "The user-friendly interface and powerful tools have transformed how we showcase achievements.",
        },
        {
            text: "We've been able to track startups effectively, and the data insights have been incredibly helpful.",
        },
    ];

    return (
        <div className="py-12 px-20 bg-[#02596b]" id="review">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8" data-aos="fade-up">
                    <h1 className="text-[#87b7b7] text-4xl font-extrabold">What Our Users Say</h1>
                </div>
                <div className="w-full h-1.5 bg-gray-300 my-8"></div>
                <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
                    {reviewData.map((review, index) => (
                        <div className="w-full md:w-1/3" key={index} data-aos="zoom-in" data-aos-delay={index * 200}>
                            <div className="bg-white shadow-lg border-0 h-full p-6 rounded-lg flex items-center justify-center">
                                <p className="text-center italic text-gray-800">
                                    {review.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;