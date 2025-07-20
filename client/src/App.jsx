import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import ProtectedRoute from './components/ProtectedRoute';

// User Dashboard
import UserDashboardLayout from './components/UserDashboardLayout';
import Home from './pages/Users/Home';
import InnovationMetrics from './pages/Users/InnovationMetrics';
import ResearchPage from './pages/Users/Research';
import PublicationsPage from './pages/Users/Publication';
import GrantPage from './pages/Users/Grants';
import StartupPage from './pages/Users/StartUp';
import AwardPage from './pages/Users/Award';
import Patent from './pages/Users/Patent';
import SettingsPage from './pages/Users/Settings';

// College Dashboard
// import CollegeDashboardLayout from './components/CollegeDashboardLayout';
// import CollegeHome from './pages/College/Home';
// import CollegeManageUsers from './pages/College/ManageUsers';
// import CollegeApproveInnovations from './pages/College/ApproveInnovations';
// import CollegeGraphView from './pages/College/GraphView';

// Government Dashboard
import GovtDashboardLayout from './pages/Govt/GovtDashboardLayout';
import GovtHome from './pages/Govt/Home';
// import GovtAnalytics from './pages/Govt/Analytics';
// import GovtStateWiseView from './pages/Govt/StateWise';
// import GovtCollegeView from './pages/Govt/CollegeView';

import 'aos/dist/aos.css';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/feedback" element={<Feedback />} />

      {/* User Routes (Student/Faculty) */}
      <Route element={<ProtectedRoute allowedRoles={['student', 'faculty']} />}>
        <Route element={<UserDashboardLayout />}>
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
      </Route>

      {/* College Routes */}
      {/* <Route element={<ProtectedRoute allowedRoles={['college']} />}>
        <Route element={<CollegeDashboardLayout />}>
          <Route path="/college/home" element={<CollegeHome />} />
          <Route path="/college/manage-users" element={<CollegeManageUsers />} />
          <Route path="/college/approve-innovations" element={<CollegeApproveInnovations />} />
          <Route path="/college/graph-view" element={<CollegeGraphView />} />
        </Route>
      </Route> */}

      {/* Government Routes */}
      <Route element={<ProtectedRoute allowedRoles={['government']} />}>
        <Route element={<GovtDashboardLayout />}>
          <Route path="/govt/home" element={<GovtHome />} />
          {/* <Route path="/govt/analytics" element={<GovtAnalytics />} />
          <Route path="/govt/state-wise" element={<GovtStateWiseView />} />
          <Route path="/govt/college-view" element={<GovtCollegeView />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
