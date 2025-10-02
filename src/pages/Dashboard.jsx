import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Target, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

function Dashboard() {
  const navigate = useNavigate();
  const { participants, globalModel, ledgerEntries, dispatch } = useApp();

  const totalThreats = 1247;
  const activeRounds = globalModel.rounds;
  const participantCount = participants.length;

  const showSystemFlow = () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        title: 'System Architecture Flow',
        body: (
          <div className="text-center">
            <svg width="100%" height="300" viewBox="0 0 500 300" className="max-w-full">
              {/* Participants */}
              <rect x="20" y="20" width="100" height="60" rx="8" fill="#2B6EF6" opacity="0.2"/>
              <text x="70" y="55" textAnchor="middle" fontWeight="600" fontSize="14" fill="#1a202c">Participants</text>
              
              {/* PQC Identity */}
              <rect x="20" y="120" width="100" height="60" rx="8" fill="#10b981" opacity="0.2"/>
              <text x="70" y="155" textAnchor="middle" fontWeight="600" fontSize="14" fill="#1a202c">PQC Identity</text>
              
              {/* Local Training */}
              <rect x="200" y="20" width="100" height="60" rx="8" fill="#f59e0b" opacity="0.2"/>
              <text x="250" y="55" textAnchor="middle" fontWeight="600" fontSize="14" fill="#1a202c">Local Train</text>
              
              {/* Secure Agg */}
              <rect x="200" y="120" width="100" height="60" rx="8" fill="#2B6EF6" opacity="0.2"/>
              <text x="250" y="155" textAnchor="middle" fontWeight="600" fontSize="14" fill="#1a202c">Aggregation</text>
              
              {/* Global Model */}
              <rect x="380" y="70" width="100" height="60" rx="8" fill="#10b981" opacity="0.2"/>
              <text x="430" y="105" textAnchor="middle" fontWeight="600" fontSize="14" fill="#1a202c">Global Model</text>
              
              {/* Blockchain */}
              <rect x="200" y="220" width="100" height="60" rx="8" fill="#ef4444" opacity="0.2"/>
              <text x="250" y="255" textAnchor="middle" fontWeight="600" fontSize="14" fill="#1a202c">Blockchain</text>
              
              {/* Arrows */}
              <path d="M 120 50 L 200 50" stroke="#2B6EF6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
              <path d="M 120 150 L 200 150" stroke="#2B6EF6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
              <path d="M 300 50 L 350 80" stroke="#2B6EF6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
              <path d="M 300 150 L 350 120" stroke="#2B6EF6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
              <path d="M 250 180 L 250 220" stroke="#2B6EF6" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
              
              {/* Arrow marker */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#2B6EF6" />
                </marker>
              </defs>
            </svg>
            <p className="mt-4 text-text-secondary text-center">
              Quantum-safe collaborative threat intelligence with federated learning
            </p>
          </div>
        )
      }
    });
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">Real-time overview of quantum-safe threat intelligence fusion</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Active Participants</span>
              <span className="badge badge-success">Online</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">{participantCount}</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              All nodes synchronized
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Federation Rounds</span>
              <span className="badge badge-warning">In Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">{activeRounds}</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Round {activeRounds + 1} starting soon
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Threats Detected</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">{totalThreats.toLocaleString()}</div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success font-medium">12.5%</span>
              <span className="text-text-secondary ml-2">vs last period</span>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Model Accuracy</span>
              <span className="badge badge-success">Excellent</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-text-primary">{globalModel.accuracy}%</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Version {globalModel.version}
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {ledgerEntries.slice(0, 5).map((entry, index) => (
                <div key={index} className="p-3 border-l-3 border-primary-blue bg-bg-main rounded">
                  <div className="flex justify-between items-start mb-1">
                    <strong className="text-sm">{entry.org}</strong>
                    <span className="text-xs text-text-secondary">{entry.timestamp}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{entry.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/training')}
                className="btn btn-primary"
              >
                Start Training
              </button>
              <button
                onClick={() => navigate('/aggregation')}
                className="btn btn-secondary w-full"
              >
                Trigger Aggregation
              </button>
              <button
                onClick={showSystemFlow}
                className="btn btn-secondary w-full"
              >
                View System Flow
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
}

export default Dashboard;