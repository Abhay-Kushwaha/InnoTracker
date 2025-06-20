import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
        // Set up interval to refresh auth status
        const interval = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes
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
                withCredentials: true
            });

            setUser(response.data);
            setError(null);
        } catch (error) {
            console.error('Auth check error:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setUser(null);
            }
            setError(error.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', 
                { email, password },
                { withCredentials: true }
            );
            
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);
            
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            setError(message);
            return { 
                success: false, 
                message 
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', 
                userData,
                { withCredentials: true }
            );
            
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);
            
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            setError(message);
            return { 
                success: false, 
                message 
            };
        }
    };

    const updateProfile = async (userData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:3000/api/auth/profile',
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );
            
            setUser(response.data);
            setError(null);
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Profile update failed';
            setError(message);
            return {
                success: false,
                message
            };
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
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            error,
            login, 
            register, 
            logout,
            updateProfile,
            clearError
        }}>
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