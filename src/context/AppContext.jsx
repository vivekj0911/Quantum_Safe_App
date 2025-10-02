import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  currentUser: null,
  trainingProgress: 0,
  trainingActive: false,
  participants: [
    { id: 1, name: 'Company A', initials: 'CA', datasetSize: 15000, status: 'active' },
    { id: 2, name: 'Company B', initials: 'CB', datasetSize: 12500, status: 'active' },
    { id: 3, name: 'Company C', initials: 'CC', datasetSize: 18000, status: 'active' }
  ],
  globalModel: {
    version: '1.3.2',
    accuracy: 94.7,
    rounds: 12,
    lastUpdate: '2025-09-28'
  },
  ledgerEntries: [],
  certificate: null,
  showModal: false,
  modalContent: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_TRAINING_PROGRESS':
      return { ...state, trainingProgress: action.payload };
    case 'SET_TRAINING_ACTIVE':
      return { ...state, trainingActive: action.payload };
    case 'SET_CERTIFICATE':
      return { ...state, certificate: action.payload };
    case 'SET_GLOBAL_MODEL':
      return { ...state, globalModel: action.payload };
    case 'ADD_LEDGER_ENTRY':
      return { 
        ...state, 
        ledgerEntries: [action.payload, ...state.ledgerEntries] 
      };
    case 'SET_LEDGER_ENTRIES':
      return { ...state, ledgerEntries: action.payload };
    case 'SHOW_MODAL':
      return { 
        ...state, 
        showModal: true, 
        modalContent: action.payload 
      };
    case 'HIDE_MODAL':
      return { 
        ...state, 
        showModal: false, 
        modalContent: null 
      };
    case 'LOGOUT':
      return { 
        ...initialState, 
        ledgerEntries: state.ledgerEntries,
        participants: state.participants,
        globalModel: state.globalModel
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
    }

    const storedCert = localStorage.getItem('certificate');
    if (storedCert) {
      dispatch({ type: 'SET_CERTIFICATE', payload: JSON.parse(storedCert) });
    }

    let storedEntries = localStorage.getItem('ledgerEntries');
    if (storedEntries) {
      dispatch({ type: 'SET_LEDGER_ENTRIES', payload: JSON.parse(storedEntries) });
    } else {
      // Initialize with default entries
      const defaultEntries = [
        {
          timestamp: '2025-09-28 14:32:11',
          org: 'Company A',
          action: 'Model Update Submitted',
          txHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385'
        },
        {
          timestamp: '2025-09-28 14:28:45',
          org: 'Company B',
          action: 'Identity Registered',
          txHash: '0x3c3f8b6c5d4e2f1a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5'
        },
        {
          timestamp: '2025-09-28 14:15:22',
          org: 'Company C',
          action: 'Aggregation Completed',
          txHash: '0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2'
        }
      ];
      dispatch({ type: 'SET_LEDGER_ENTRIES', payload: defaultEntries });
      localStorage.setItem('ledgerEntries', JSON.stringify(defaultEntries));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    }
  }, [state.currentUser]);

  useEffect(() => {
    if (state.certificate) {
      localStorage.setItem('certificate', JSON.stringify(state.certificate));
    }
  }, [state.certificate]);

  useEffect(() => {
    localStorage.setItem('ledgerEntries', JSON.stringify(state.ledgerEntries));
  }, [state.ledgerEntries]);

  const value = {
    ...state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}