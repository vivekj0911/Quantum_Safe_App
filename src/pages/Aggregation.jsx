import { useNavigate } from 'react-router-dom';
import { RefreshCw, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fakeApi, generateRandomHex, incrementVersion } from '../utils/api';
import Modal from '../components/Modal';

function Aggregation() {
  const navigate = useNavigate();
  const { participants, globalModel, dispatch } = useApp();

  const triggerAggregation = async () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        title: 'Secure Aggregation',
        body: (
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p>Aggregating model updates from all participants...</p>
          </div>
        )
      }
    });

    try {
      const result = await fakeApi('trigger-aggregation', 2500);
      const newModel = {
        version: incrementVersion(globalModel.version),
        accuracy: (globalModel.accuracy + Math.random() * 2).toFixed(1),
        rounds: globalModel.rounds + 1,
        lastUpdate: new Date().toISOString().split('T')[0]
      };
      
      dispatch({ type: 'SET_GLOBAL_MODEL', payload: newModel });
      
      // Add to ledger
      dispatch({
        type: 'ADD_LEDGER_ENTRY',
        payload: {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          org: 'Federation Hub',
          action: 'Aggregation Completed',
          txHash: '0x' + generateRandomHex(64)
        }
      });
      
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          title: 'Aggregation Complete',
          body: (
            <div className="text-center">
              <div className="text-5xl mb-4">🌐</div>
              <div className="bg-bg-main p-4 rounded-lg text-left text-sm font-mono">
                <div><strong>New Version:</strong> {newModel.version}</div>
                <div><strong>Accuracy:</strong> {newModel.accuracy}%</div>
                <div><strong>Round:</strong> {newModel.rounds}</div>
              </div>
              <p className="mt-4 text-text-secondary">
                Global model has been updated!
              </p>
            </div>
          ),
          onClose: () => navigate('/global-model')
        }
      });
    } catch (error) {
      console.error('Error triggering aggregation:', error);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Federated Aggregation</h1>
          <p className="text-text-secondary">Securely aggregate model updates from all participants</p>
        </div>

        {/* Participant Updates */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Participant Updates</h3>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center p-4 bg-bg-card border border-border-light rounded-lg hover:shadow-sm hover:border-primary-blue transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-blue to-primary-dark text-white flex items-center justify-center font-bold mr-4">
                  {participant.initials}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{participant.name}</h4>
                  <p className="text-sm text-text-secondary">Dataset: {participant.datasetSize.toLocaleString()} samples</p>
                </div>
                <span className="badge badge-success">{participant.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Federation Map */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Federation Map</h3>
          <div className="text-center py-10">
            <svg width="400" height="200" className="max-w-full mx-auto">
              <circle cx="200" cy="100" r="40" fill="#2B6EF6" opacity="0.2"/>
              <circle cx="200" cy="100" r="30" fill="#2B6EF6"/>
              <text x="200" y="105" textAnchor="middle" fill="white" fontWeight="bold">HUB</text>
              
              <line x1="200" y1="100" x2="100" y2="50" stroke="#2B6EF6" strokeWidth="2" opacity="0.5"/>
              <circle cx="100" cy="50" r="25" fill="#10b981"/>
              <text x="100" y="55" textAnchor="middle" fill="white" fontSize="12">CA</text>
              
              <line x1="200" y1="100" x2="300" y2="50" stroke="#2B6EF6" strokeWidth="2" opacity="0.5"/>
              <circle cx="300" cy="50" r="25" fill="#10b981"/>
              <text x="300" y="55" textAnchor="middle" fill="white" fontSize="12">CB</text>
              
              <line x1="200" y1="100" x2="200" y2="180" stroke="#2B6EF6" strokeWidth="2" opacity="0.5"/>
              <circle cx="200" cy="180" r="25" fill="#10b981"/>
              <text x="200" y="185" textAnchor="middle" fill="white" fontSize="12">CC</text>
            </svg>
          </div>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={triggerAggregation}
              className="btn btn-primary flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Trigger Aggregation
            </button>
            <button
              onClick={() => navigate('/global-model')}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              View Global Model
            </button>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
}

export default Aggregation;