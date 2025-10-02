import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Shield, 
  Brain, 
  RefreshCw, 
  Globe, 
  FileText, 
  Menu, 
  X,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { path: '/onboarding', icon: Shield, label: 'Onboarding' },
  { path: '/training', icon: Brain, label: 'Training' },
  { path: '/aggregation', icon: RefreshCw, label: 'Aggregation' },
  { path: '/global-model', icon: Globe, label: 'Global Model' },
  { path: '/audit', icon: FileText, label: 'Audit Trail' }
];

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleGuideClick = () => {
    navigate('/onboarding-guide');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-all duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ 
        backgroundColor: 'var(--color-bg-card)', 
        borderColor: 'var(--color-border-light)' 
      }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6" style={{ borderBottom: '1px solid var(--color-border-light)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--color-primary-blue)' }}>
                🛡️ QuantumSafe
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md transition-colors"
                style={{ ':hover': { backgroundColor: 'var(--color-bg-main)' } }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Actions */}
          <div className="p-6" style={{ borderTop: '1px solid var(--color-border-light)' }}>
            <div className="mb-4">
              <button
                onClick={handleGuideClick}
                className="flex items-center gap-2 w-full p-3 text-sm rounded-lg transition-colors"
                style={{ 
                  color: 'var(--color-text-secondary)',
                  ':hover': { 
                    color: 'var(--color-primary-blue)', 
                    backgroundColor: 'var(--color-bg-main)' 
                  }
                }}
              >
                <HelpCircle className="w-4 h-4" />
                How to Use
              </button>
            </div>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-main)' }}>
              <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Logged in as
              </p>
              <p className="font-semibold text-sm mb-3">
                {currentUser?.org || 'Unknown'}
              </p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full p-2 text-sm transition-colors"
                style={{ 
                  color: 'var(--color-text-secondary)',
                  ':hover': { color: 'var(--color-danger)' }
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden p-4" style={{ 
          backgroundColor: 'var(--color-bg-card)', 
          borderBottom: '1px solid var(--color-border-light)' 
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md transition-colors"
            style={{ ':hover': { backgroundColor: 'var(--color-bg-main)' } }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Layout;