import React from 'react';
import footerImage from '../assets/img/footer.png'; // Adjust path if necessary

const Footer = () => {
    return (
        <>
            <footer className="bg-[#02596b] text-white py-10 text-center">
                <img src={footerImage} alt="Footer Banner" className="w-full h-auto max-w-full md:w-[380px] md:h-[50px] lg:w-[1170px] lg:h-[50px] mx-auto mb-8" />
                <p>© 2024 Innovation Portal | <a href="#" className="text-[#b0b3b9] hover:text-white transition-colors duration-300">Privacy Policy</a></p>
            </footer>
        </>
    );
};

export default Footer;