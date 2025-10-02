# QuantumSafe - Threat Intelligence Fusion

A React-based quantum-safe collaborative threat intelligence platform that uses federated learning to enable secure knowledge sharing between organizations without compromising data privacy.

## Features

- **Quantum-Safe Security**: Uses CRYSTALS-Dilithium for post-quantum cryptographic protection
- **Privacy-Preserving**: Federated learning keeps your data local while enabling collaboration
- **Blockchain Verified**: All actions are recorded on an immutable distributed ledger
- **Real-time Monitoring**: Track training progress and system status in real-time
- **Responsive Design**: Built with Tailwind CSS for modern, responsive UI

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context + useReducer

## Getting Started

### Prerequisites

- Node.js (version 20.19+ or 22.12+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quantum-safe-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage Guide

### 1. Login
- Enter your email address and organization name
- The system will create a secure session for your organization

### 2. Identity & Onboarding
- Generate a quantum-resistant identity certificate
- Register your certificate on the blockchain for immutable verification

### 3. Local Training
- Train your local model on private data within secure enclaves
- Monitor training progress with real-time metrics
- Training happens within SGX secure enclaves to protect your data

### 4. Federated Aggregation
- View all participating organizations and their status
- Trigger aggregation when all participants are ready
- The system securely combines model updates without sharing raw data

### 5. Global Model
- Access the aggregated global model and performance metrics
- Download the encrypted global model for deployment
- View detailed model architecture and technical specifications

### 6. Audit Trail
- Monitor all activities through the immutable blockchain ledger
- Search through transactions by organization, action, or hash
- All entries are cryptographically signed and immutable

## Key Components

### Pages
- **Login**: Authentication and organization selection
- **Dashboard**: Real-time overview and quick actions
- **Onboarding**: Certificate generation and blockchain registration
- **Training**: Local model training with progress monitoring
- **Aggregation**: Federated learning coordination
- **GlobalModel**: Global model access and metrics
- **Audit**: Blockchain transaction history
- **OnboardingGuide**: Comprehensive user guide

### Components
- **Layout**: Main application layout with sidebar navigation
- **Modal**: Reusable modal component for notifications and forms

### Context
- **AppContext**: Global state management for user data, training progress, and blockchain entries

## Security Features

- **Post-Quantum Cryptography**: CRYSTALS-Dilithium signatures
- **Secure Enclaves**: SGX protection for local training
- **Blockchain Ledger**: Immutable audit trail
- **Privacy-Preserving**: Federated learning architecture
- **Encrypted Communications**: AES-256 + Kyber-1024

## Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── pages/              # Page components
├── utils/              # Utility functions and API mocks
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.