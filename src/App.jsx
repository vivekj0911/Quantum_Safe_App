import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Training from './pages/Training';
import Aggregation from './pages/Aggregation';
import GlobalModel from './pages/GlobalModel';
import Audit from './pages/Audit';
import OnboardingGuide from './pages/OnboardingGuide';
import { useApp } from './context/AppContext';


function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  return currentUser ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
}


function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding-guide" element={<OnboardingGuide />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
      <Route path="/aggregation" element={<ProtectedRoute><Aggregation /></ProtectedRoute>} />
      <Route path="/global-model" element={<ProtectedRoute><GlobalModel /></ProtectedRoute>} />
      <Route path="/audit" element={<ProtectedRoute><Audit /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;