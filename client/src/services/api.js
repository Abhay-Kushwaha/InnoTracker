import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API calls
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData), // userData should include all required fields
    getCurrentUser: () => api.get('/auth/me')
};

// Patent API calls
export const patentAPI = {
    getAll: () => api.get('/patents'),
    getById: (id) => api.get(`/patents/${id}`),
    create: (data) => api.post('/patents', data),
    update: (id, data) => api.put(`/patents/${id}`, data),
    delete: (id) => api.delete(`/patents/${id}`)
};

// Publication API calls
export const publicationAPI = {
    getAll: () => api.get('/publications'),
    getById: (id) => api.get(`/publications/${id}`),
    create: (data) => api.post('/publications', data),
    update: (id, data) => api.put(`/publications/${id}`, data),
    delete: (id) => api.delete(`/publications/${id}`)
};

// Grant API calls
export const grantAPI = {
    getAll: () => api.get('/grants'),
    getById: (id) => api.get(`/grants/${id}`),
    create: (data) => api.post('/grants', data),
    update: (id, data) => api.put(`/grants/${id}`, data),
    delete: (id) => api.delete(`/grants/${id}`)
};

// Award API calls
export const awardAPI = {
    getAll: () => api.get('/awards'),
    getById: (id) => api.get(`/awards/${id}`),
    create: (data) => api.post('/awards', data),
    update: (id, data) => api.put(`/awards/${id}`, data),
    delete: (id) => api.delete(`/awards/${id}`)
};

// Startup API calls
export const startupAPI = {
    getAll: () => api.get('/startups'),
    getById: (id) => api.get(`/startups/${id}`),
    create: (data) => api.post('/startups', data),
    update: (id, data) => api.put(`/startups/${id}`, data),
    delete: (id) => api.delete(`/startups/${id}`)
};

// Innovation Project API calls
export const innovationProjectAPI = {
    getAll: () => api.get('/innovation-projects'),
    getById: (id) => api.get(`/innovation-projects/${id}`),
    create: (data) => api.post('/innovation-projects', data),
    update: (id, data) => api.put(`/innovation-projects/${id}`, data),
    delete: (id) => api.delete(`/innovation-projects/${id}`)
};

export default api; 