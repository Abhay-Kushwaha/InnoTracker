import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import InnovationMetrics from './pages/InnovationMetrics';
import ResearchPage from './pages/Research';
import PublicationsPage from './pages/Publication';
import GrantPage from './pages/Grant';
import StartupPage from './pages/StartUp';
import AwardPage from './pages/Award';
import SettingsPage from './pages/Settings';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Register from './pages/Register';
import Patent from './pages/Patent';
import ProtectedRoute from './components/ProtectedRoute';

import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard routes wrapped in DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/innovation-metrics" element={<InnovationMetrics />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/grants" element={<GrantPage />} />
        <Route path="/startup" element={<StartupPage />} />
        <Route path="/awards" element={<AwardPage />} />
        <Route path="/patents" element={<Patent />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;