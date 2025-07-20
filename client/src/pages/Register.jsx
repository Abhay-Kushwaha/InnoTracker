import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        collegeId: '',
        collegeName: '',
        branch: '',
        state: '',
        city: '',
        rollNumber: '',
        contactNumber: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await register(form);
            if (result.success) {
                navigate('/home');
            } else {
                console.error('Registration failed:', result.message);
                setError(result.message);
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#C9E6F0] p-4 font-poppins">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-center text-3xl font-bold text-[#014250] mb-8">
                    Register for Innovation Portal
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <select
                        name="role"
                        required
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="college">College</option>
                        <option value="government">Government</option>
                    </select>
                    <input
                        type="text"
                        name="collegeId"
                        placeholder="College ID"
                        required={form.role !== 'government'}
                        value={form.collegeId}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="collegeName"
                        placeholder="College Name"
                        value={form.collegeName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        required={['student', 'faculty'].includes(form.role)}
                        value={form.branch}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="rollNumber"
                        placeholder="Roll Number"
                        required={form.role === 'student'}
                        value={form.rollNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={form.contactNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
