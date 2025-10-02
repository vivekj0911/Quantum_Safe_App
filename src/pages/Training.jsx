import { useState, useEffect } from 'react';
import { Database, Cpu, Shield, Play, Pause, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fakeApi, generateRandomHex } from '../utils/api';
import Modal from '../components/Modal';

function Training() {
  const { trainingProgress, trainingActive, currentUser, dispatch } = useApp();
  const [trainingInterval, setTrainingInterval] = useState(null);

  const startTraining = async () => {
    dispatch({ type: 'SET_TRAINING_ACTIVE', payload: true });
    await fakeApi('start-training', 500);
    
    const interval = setInterval(() => {
      const newProgress = Math.min(trainingProgress + 2, 100);
      dispatch({ type: 'SET_TRAINING_PROGRESS', payload: newProgress });
      
      if (newProgress >= 100) {
        clearInterval(interval);
        dispatch({ type: 'SET_TRAINING_ACTIVE', payload: false });
        
        // Show completion modal
        dispatch({
          type: 'SHOW_MODAL',
          payload: {
            title: 'Training Complete',
            body: (
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <p>
                  Local model training completed successfully!<br />
                  Accuracy: 92.3% | Loss: 0.187
                </p>
              </div>
            )
          }
        });
        
        // Add to ledger
        dispatch({
          type: 'ADD_LEDGER_ENTRY',
          payload: {
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            org: currentUser.org,
            action: 'Model Update Submitted',
            txHash: '0x' + generateRandomHex(64)
          }
        });
      }
    }, 500);
    
    setTrainingInterval(interval);
  };

  const pauseTraining = () => {
    dispatch({ type: 'SET_TRAINING_ACTIVE', payload: false });
    if (trainingInterval) {
      clearInterval(trainingInterval);
      setTrainingInterval(null);
    }
  };

  const resetTraining = () => {
    dispatch({ type: 'SET_TRAINING_PROGRESS', payload: 0 });
    dispatch({ type: 'SET_TRAINING_ACTIVE', payload: false });
    if (trainingInterval) {
      clearInterval(trainingInterval);
      setTrainingInterval(null);
    }
  };

  useEffect(() => {
    return () => {
      if (trainingInterval) {
        clearInterval(trainingInterval);
      }
    };
  }, [trainingInterval]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (trainingProgress / 100) * circumference;

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Local Training</h1>
          <p className="text-text-secondary">Train your local model on private data within secure enclave</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Dataset Size</span>
            </div>
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">15,000</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Training samples
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Current Epoch</span>
            </div>
            <div className="flex items-center gap-3">
              <Cpu className="w-8 h-8 text-primary-blue" />
              <div className="text-4xl font-bold text-text-primary">{Math.floor(trainingProgress / 10)}/10</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Batch size: 32
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Secure Enclave</span>
              <span className="badge badge-success">Active</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-success" />
              <div className="text-xl font-semibold text-text-primary">SGX Enabled</div>
            </div>
            <div className="mt-3 text-sm text-text-secondary">
              Data encrypted at rest
            </div>
          </div>
        </div>

        {/* Training Progress */}
        <div className="card text-center">
          <h3 className="text-lg font-semibold mb-6">Training Progress</h3>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="#e2e8f0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="#2B6EF6"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-text-primary">{trainingProgress}%</div>
              <div className="text-sm text-text-secondary">Complete</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            {!trainingActive ? (
              <button onClick={startTraining} className="btn btn-primary flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Training
              </button>
            ) : (
              <button onClick={pauseTraining} className="btn btn-secondary flex items-center gap-2">
                <Pause className="w-4 h-4" />
                Pause Training
              </button>
            )}
            <button onClick={resetTraining} className="btn btn-secondary flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Training Metrics */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Training Metrics</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Accuracy</span>
                <span className="font-semibold">92.3%</span>
              </div>
              <div className="w-full bg-bg-main rounded-full h-2">
                <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '92.3%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Loss</span>
                <span className="font-semibold">0.187</span>
              </div>
              <div className="w-full bg-bg-main rounded-full h-2">
                <div className="bg-primary-blue h-2 rounded-full transition-all duration-500" style={{ width: '18.7%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
}

export default Training;