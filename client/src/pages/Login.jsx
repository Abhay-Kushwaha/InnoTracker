import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../assets/img/logo.png'; // Assuming your logo is here

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, role });
    alert("Login Successful");
    // Redirect or show error based on backend response
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C9E6F0] p-4 font-poppins">
      <div
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
        data-aos="zoom-in"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Innovation Portal Logo" className="w-[120px] h-auto" />
        </div>

        <h2 className="text-center text-3xl font-bold text-[#014250] mb-8">
          Login to Innovation Portal
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#006073] focus:border-transparent"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#006073] focus:border-transparent"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-2">
              Role
            </label>
            <select
              id="role"
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#006073] focus:border-transparent"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select your role</option>
              <option value="government">Government</option>
              <option value="college_administrator">College Administrator</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-[#006073] hover:bg-[#004757] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-6">
            <a href="#" className="inline-block align-baseline font-bold text-sm text-[#006073] hover:text-[#004757]">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;