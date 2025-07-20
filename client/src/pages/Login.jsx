import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../assets/img/logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        AOS.init();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password, role);
            if (result.success) {
                const userRole = result.user.role;
                if (userRole === 'college') {
                    navigate('/college/home');
                } else if (userRole === 'government') {
                    navigate('/govt/home');
                } else {
                    navigate('/home');
                }
            } else {
                console.error('Login failed:', result.message);
                setError(result.message || 'Invalid credentials');
            }
        } catch {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#C9E6F0] p-4 font-poppins">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full" data-aos="zoom-in">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Innovation Portal Logo" className="w-[120px] h-auto" />
                </div>

                <h2 className="text-center text-3xl font-bold text-[#014250] mb-8">
                    Login to Innovation Portal
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <span>{error}</span>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                required
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 text-sm text-gray-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            id="role"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="college">College</option>
                            <option value="government">Government</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <Link to="/forgot-password" className="text-sm font-semibold text-[#006073] hover:text-[#004757]">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
