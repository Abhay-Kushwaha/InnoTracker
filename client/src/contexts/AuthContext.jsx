import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
        const interval = setInterval(checkAuth, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:3000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            // console.log('User data fetched:', response.data);

            setUser(response.data);
            setError(null);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setUser(null);
            }
            setError(error.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', userData, { withCredentials: true });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);
            return { success: true, user };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, message };
        }
    };

    const login = async (email, password, role) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/login',
                { email, password, role },
                { withCredentials: true }
            );

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);

            return { success: true, user };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, error, login, register, logout, clearError }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
