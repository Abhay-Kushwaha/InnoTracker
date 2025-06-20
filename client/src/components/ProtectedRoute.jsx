// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ children }) => {
//     const { user, loading } = useAuth();

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!user) {
//         return <Navigate to="/login" />;
//     }

//     return children;
// };

// export default ProtectedRoute; 
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Make sure this path is correct

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // assumes user object exists in context

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
