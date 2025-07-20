import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaClipboardCheck, FaCalendarAlt } from 'react-icons/fa'; // Importing icons
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import {
    publicationAPI,
    grantAPI,
    awardAPI,
    patentAPI,
    startupAPI,
    innovationProjectAPI
} from '../../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const { user } = useAuth();
    const [metrics, setMetrics] = useState({
        publications: 0,
        patents: 0,
        grants: 0,
        awards: 0,
        startups: 0,
        projects: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const [
                publicationsRes,
                patentsRes,
                grantsRes,
                awardsRes,
                startupsRes,
                projectsRes
            ] = await Promise.all([
                publicationAPI.getAll(),
                patentAPI.getAll(),
                grantAPI.getAll(),
                awardAPI.getAll(),
                startupAPI.getAll(),
                innovationProjectAPI.getAll()
            ]);

            // The backend should already filter by user, but let's double-check
            // Filter results to only show current user's data
            const userPublications = publicationsRes.data.filter(pub =>
                pub.createdBy === user?._id || pub.createdBy?._id === user?._id
            );

            const userPatents = patentsRes.data.filter(patent =>
                patent.createdBy === user?._id || patent.createdBy?._id === user?._id
            );

            const userGrants = grantsRes.data.filter(grant =>
                grant.createdBy === user?._id || grant.createdBy?._id === user?._id
            );

            const userAwards = awardsRes.data.filter(award =>
                award.createdBy === user?._id || award.createdBy?._id === user?._id
            );

            const userStartups = startupsRes.data.filter(startup =>
                startup.createdBy === user?._id || startup.createdBy?._id === user?._id
            );

            const userProjects = projectsRes.data.filter(project =>
                project.createdBy === user?._id || project.createdBy?._id === user?._id
            );

            setMetrics({
                publications: userPublications.length,
                patents: userPatents.length,
                grants: userGrants.length,
                awards: userAwards.length,
                startups: userStartups.length,
                projects: userProjects.length
            });
            setLoading(false);
        } catch (err) {
            console.error('Error fetching metrics:', err);
            setError(err.response?.data?.message || 'Failed to fetch metrics. Please try again.');
            setLoading(false);
        }
    };

    const chartData = {
        labels: ['Publications', 'Patents', 'Grants', 'Awards', 'Startups', 'Projects'],
        datasets: [
            {
                label: 'Your Innovation Metrics',
                data: [
                    metrics.publications,
                    metrics.patents,
                    metrics.grants,
                    metrics.awards,
                    metrics.startups,
                    metrics.projects
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Your Innovation Excellence Metrics'
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
            <div className="mb-6 bg-white p-4 rounded shadow">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Department:</strong> {user?.department}</p>
            </div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Publications</h3>
                    <p className="text-3xl font-bold text-blue-600">{metrics.publications}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Patents</h3>
                    <p className="text-3xl font-bold text-red-600">{metrics.patents}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Grants</h3>
                    <p className="text-3xl font-bold text-green-600">{metrics.grants}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Awards</h3>
                    <p className="text-3xl font-bold text-yellow-600">{metrics.awards}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Startups</h3>
                    <p className="text-3xl font-bold text-purple-600">{metrics.startups}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Projects</h3>
                    <p className="text-3xl font-bold text-orange-600">{metrics.projects}</p>
                </div>
            </div>
            {/* Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Home;