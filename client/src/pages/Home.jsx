import React, { useEffect } from 'react'; // Import useEffect
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaClipboardCheck, FaCalendarAlt } from 'react-icons/fa'; // Importing icons
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

// Register all necessary components from Chart.js
Chart.register(...registerables);

export default function Home() {
  // Sample data for metrics (replace with actual data as needed)
  const metricsData = {
    publications: [5, 10, 7, 15], // Sample data for last 4 years
    patents: [2, 3, 5, 4], // Sample data for last 4 years
    impactScores: [89.5, 90, 88, 92], // Sample data for last 4 years
    grantsReceived: 200000, // Total grants received
    totalGrants: 300000, // Total potential grants
  };

  // Initialize AOS within Home component if it has its own animations
  // However, it's better to initialize once in DashboardLayout if it wraps everything.
  // Keeping it here for component-specific animations.
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // Set to true if you only want animations to happen once per element
      easing: 'ease-in-out',
    });
  }, []);

  // Chart data for publications over the years
  const publicationsChartData = {
    labels: ['2021', '2022', '2023', '2024'], // Years
    datasets: [
      {
        label: 'Publications',
        data: metricsData.publications,
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Brighter blue
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for patents over the years
  const patentsChartData = {
    labels: ['2021', '2022', '2023', '2024'], // Years
    datasets: [
      {
        label: 'Patents',
        data: metricsData.patents,
        backgroundColor: 'rgba(234, 179, 8, 0.7)', // Tailwind yellow-500
        borderColor: 'rgba(234, 179, 8, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for impact scores over the years
  const impactScoresChartData = {
    labels: ['2021', '2022', '2023', '2024'], // Years
    datasets: [
      {
        label: 'Impact Score',
        data: metricsData.impactScores,
        backgroundColor: 'rgba(168, 85, 247, 0.7)', // Tailwind purple-500
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options for consistency
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to shrink/grow freely
    scales: {
      x: {
        ticks: {
          color: 'rgba(55, 65, 81, 1)', // gray-700
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // gray-300 light
        },
      },
      y: {
        ticks: {
          color: 'rgba(55, 65, 81, 1)', // gray-700
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.3)', // gray-300 light
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(55, 65, 81, 1)', // gray-700
        },
      },
    },
  };

  // Dark mode versions of chart options
  const darkChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)', // gray-300
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', // gray-500 light
        },
      },
      y: {
        ticks: {
          color: 'rgba(209, 213, 219, 1)', // gray-300
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.3)', // gray-500 light
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(209, 213, 219, 1)', // gray-300
        },
      },
    },
  };

  // Determine which chart options to use based on dark mode (you'll need to pass this state down or use context)
  // For now, let's assume global dark mode class on html applies
  const currentChartOptions = document.documentElement.classList.contains('dark')
    ? darkChartOptions
    : chartOptions;

  // Calculate grant progress percentage
  const grantProgress = (metricsData.grantsReceived / metricsData.totalGrants) * 100;

  // Recent activities data (example data)
  const recentActivities = [
    { id: 1, activity: "Published paper on AI Ethics", date: "2024-09-15" },
    { id: 2, activity: "Filed patent for a new algorithm", date: "2024-09-10" },
    { id: 3, activity: "Received funding from XYZ grant", date: "2024-08-30" },
  ];

  // Upcoming events data (example data)
  const upcomingEvents = [
    { id: 1, event: "AI Research Conference 2024", date: "2024-10-05" },
    { id: 2, event: "Grant Submission Deadline", date: "2024-11-01" },
    { id: 3, event: "Webinar on Research Impact", date: "2024-11-15" },
  ];

  return (
    <div className="font-poppins">
      <section className="py-8">
        <div className="max-w-screen-xl px-4 mx-auto grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          {/* Main content column */}
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            <h1 className="text-4xl text-[#014250] dark:text-[#E0E0E0] font-bold mb-4" data-aos="fade-right">
              Welcome,
              <br />
              Vineet Bhai
            </h1>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300" data-aos="fade-right" data-aos-delay="100">
              It’s great to have you back! Here’s a quick look at your recent activities and achievements:
            </p>

            {/* Quick Stats Card */}
            <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-lg p-6 mb-8" data-aos="fade-up" data-aos-delay="200">
              <h2 className="text-xl font-semibold text-[#014250] dark:text-indigo-400 mb-4">Your Recent Metrics</h2>
              <ul className="list-none space-y-3 text-gray-800 dark:text-gray-200 mb-6">
                <li><strong>Publications this year:</strong> <span className="font-semibold text-indigo-600 dark:text-indigo-400">{metricsData.publications[3]}</span></li>
                <li><strong>Patents Filed:</strong> <span className="font-semibold text-yellow-600 dark:text-yellow-400">{metricsData.patents[3]}</span></li>
                <li><strong>Grants Received:</strong> <span className="font-semibold text-green-600 dark:text-green-400">${metricsData.grantsReceived.toLocaleString()}</span> out of <span className="font-semibold text-green-700 dark:text-green-500">${metricsData.totalGrants.toLocaleString()}</span></li>
                <li><strong>Research Impact Score:</strong> <span className="font-semibold text-purple-600 dark:text-purple-400">{metricsData.impactScores[3]}</span></li>
              </ul>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Grant Utilization:</h3>
                <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-3 mb-1">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                    style={{ width: `${grantProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{grantProgress.toFixed(2)}% utilized</p>
              </div>
            </div>

            {/* Recent Activities Section */}
            <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-lg p-6 mb-8" data-aos="fade-up" data-aos-delay="300">
              <h2 className="flex items-center text-xl font-semibold text-[#014250] dark:text-indigo-400 mb-4">
                <FaClipboardCheck className="mr-3 text-indigo-600 dark:text-indigo-400 text-2xl" /> Recent Activities
              </h2>
              <ul className="space-y-4">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 flex justify-between items-center">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{activity.activity}</p>
                    <span className="text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">{activity.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upcoming Events Section */}
            <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-lg p-6" data-aos="fade-up" data-aos-delay="400">
              <h2 className="flex items-center text-xl font-semibold text-[#014250] dark:text-indigo-400 mb-4">
                <FaCalendarAlt className="mr-3 text-indigo-600 dark:text-indigo-400 text-2xl" /> Upcoming Events
              </h2>
              <ul className="space-y-4">
                {upcomingEvents.map(event => (
                  <li key={event.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 flex justify-between items-center">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{event.event}</p>
                    <span className="text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">{event.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Charts Column */}
          <div className="lg:col-span-5 lg:flex lg:flex-col justify-start items-center">
            <div className="bg-gradient-to-r from-[#006073] to-[#014250] p-6 rounded-lg shadow-xl text-center text-white w-full mb-6" data-aos="zoom-in" data-aos-delay="500">
              <h1 className="text-3xl font-bold">Your Innovation Insights</h1>
              <p className="mt-2 text-gray-200">Visualize your progress over the years</p>
            </div>

            {/* Metrics Charts */}
            <div className="space-y-6 w-full">
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4" data-aos="fade-left" data-aos-delay="600">
                <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Publications</h3>
                <div className="h-64"> {/* Fixed height for charts */}
                  <Bar data={publicationsChartData} options={currentChartOptions} />
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4" data-aos="fade-left" data-aos-delay="700">
                <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Patents</h3>
                <div className="h-64">
                  <Bar data={patentsChartData} options={currentChartOptions} />
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4" data-aos="fade-left" data-aos-delay="800">
                <h3 className="text-xl font-bold text-[#014250] dark:text-indigo-400 mb-4">Impact Score</h3>
                <div className="h-64">
                  <Bar data={impactScoresChartData} options={currentChartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}