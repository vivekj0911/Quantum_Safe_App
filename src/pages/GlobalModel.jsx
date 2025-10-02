import { useNavigate } from 'react-router-dom';
import { Download, FileText, Globe, Users, Activity, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

function GlobalModel() {
  const navigate = useNavigate();
  const { globalModel, participants, dispatch } = useApp();

  const downloadModel = () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        title: 'Downloading Model',
        body: (
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p>Preparing encrypted model package...</p>
          </div>
        )
      }
    });

    setTimeout(() => {
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          title: 'Download Started',
          body: (
            <div className="text-center">
              <div className="text-5xl mb-4">📦</div>
              <p>
                Model package is being downloaded.<br />
                Size: 485 MB | Format: Encrypted .pqm
              </p>
            </div>
          )
        }
      });
    }, 1500);
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Global Model</h1>
          <p className="text-text-secondary">Aggregated intelligence from all participants</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Model Version</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">{globalModel.version}</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Last updated: {globalModel.lastUpdate}
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Accuracy</span>
              <span className="badge badge-success">Excellent</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-success" />
              <div className="text-4xl font-bold text-text-primary">{globalModel.accuracy}%</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Validated across all nodes
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Federation Rounds</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">{globalModel.rounds}</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Completed successfully
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Contributors</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">{participants.length}</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Active participants
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span>Precision</span>
                <span className="font-semibold">93.8%</span>
              </div>
              <div className="w-full bg-bg-main rounded-full h-2">
                <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '93.8%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Recall</span>
                <span className="font-semibold">91.2%</span>
              </div>
              <div className="w-full bg-bg-main rounded-full h-2">
                <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '91.2%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>F1 Score</span>
                <span className="font-semibold">92.5%</span>
              </div>
              <div className="w-full bg-bg-main rounded-full h-2">
                <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '92.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Details */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Model Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-3 font-medium">Architecture</td>
                  <td className="py-3">Transformer-based Neural Network</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-3 font-medium">Parameters</td>
                  <td className="py-3">127 million</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-3 font-medium">Training Time</td>
                  <td className="py-3">4.2 hours (distributed)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-3 font-medium">Model Size</td>
                  <td className="py-3">485 MB</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Encryption</td>
                  <td className="py-3">AES-256 + Kyber-1024</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={downloadModel}
              className="btn btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Model
            </button>
            <button
              onClick={() => navigate('/audit')}
              className="btn btn-secondary flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Audit Trail
            </button>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
}

export default GlobalModel;