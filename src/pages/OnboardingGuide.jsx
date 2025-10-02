import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Brain, 
  RefreshCw, 
  Globe, 
  FileText, 
  BarChart3,
  CheckCircle,
  Play,
  Download
} from 'lucide-react';

function OnboardingGuide() {
  const steps = [
    {
      title: "1. Login & Authentication",
      icon: Shield,
      description: "Start by logging into the system with your organization credentials.",
      details: [
        "Enter your email address and organization name",
        "The system will create a secure session for your organization",
        "You'll be redirected to the main dashboard"
      ]
    },
    {
      title: "2. Identity & Onboarding",
      icon: Shield,
      description: "Generate quantum-safe certificates and register on blockchain.",
      details: [
        "Click 'Generate PQC Certificate' to create a quantum-resistant identity",
        "The system uses CRYSTALS-Dilithium for post-quantum security",
        "Register your certificate on the blockchain for immutable identity verification",
        "View your certificate details including public key and expiration"
      ]
    },
    {
      title: "3. Local Training",
      icon: Brain,
      description: "Train your local model on private data within secure enclaves.",
      details: [
        "Review your dataset size and secure enclave status",
        "Click 'Start Training' to begin local model training",
        "Monitor training progress with real-time metrics",
        "Training happens within SGX secure enclaves to protect your data",
        "View accuracy and loss metrics during training"
      ]
    },
    {
      title: "4. Federated Aggregation",
      icon: RefreshCw,
      description: "Participate in secure model aggregation with other organizations.",
      details: [
        "View all participating organizations and their status",
        "See the federation network topology",
        "Trigger aggregation when all participants are ready",
        "The system securely combines model updates without sharing raw data"
      ]
    },
    {
      title: "5. Global Model",
      icon: Globe,
      description: "Access the aggregated global model and its performance metrics.",
      details: [
        "View the latest global model version and accuracy",
        "Check performance metrics like precision, recall, and F1 score",
        "Review model architecture and technical details",
        "Download the encrypted global model for deployment"
      ]
    },
    {
      title: "6. Audit Trail",
      icon: FileText,
      description: "Monitor all activities through the immutable blockchain ledger.",
      details: [
        "Search through all blockchain transactions",
        "View timestamps, organizations, and actions",
        "Verify transaction hashes for authenticity",
        "All entries are cryptographically signed and immutable"
      ]
    }
  ];

  const features = [
    {
      title: "Quantum-Safe Security",
      description: "Uses CRYSTALS-Dilithium for post-quantum cryptographic protection",
      icon: Shield
    },
    {
      title: "Privacy-Preserving",
      description: "Federated learning keeps your data local while enabling collaboration",
      icon: Brain
    },
    {
      title: "Blockchain Verified",
      description: "All actions are recorded on an immutable distributed ledger",
      icon: FileText
    },
    {
      title: "Real-time Monitoring",
      description: "Track training progress and system status in real-time",
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <div className="bg-bg-card border-b border-border-light">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-primary-blue hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Login
            </Link>
            <div className="h-6 w-px bg-border-light"></div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              🛡️ QuantumSafe - User Guide
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-primary-blue to-primary-dark text-white rounded-custom p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to QuantumSafe</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              A collaborative threat intelligence platform that uses quantum-safe federated learning 
              to enable secure knowledge sharing between organizations without compromising data privacy.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-text-primary mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center">
                  <Icon className="w-12 h-12 text-primary-blue mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-text-primary mb-6">Step-by-Step Guide</h3>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-blue" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-text-primary mb-2">{step.title}</h4>
                      <p className="text-text-secondary mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-text-primary mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Play className="w-12 h-12 text-primary-blue mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Start Training</h4>
              <p className="text-sm text-text-secondary mb-4">
                Begin local model training on your private dataset
              </p>
              <Link to="/training" className="btn btn-primary">
                Go to Training
              </Link>
            </div>

            <div className="card text-center">
              <RefreshCw className="w-12 h-12 text-primary-blue mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Trigger Aggregation</h4>
              <p className="text-sm text-text-secondary mb-4">
                Combine model updates from all participants
              </p>
              <Link to="/aggregation" className="btn btn-primary">
                Go to Aggregation
              </Link>
            </div>

            <div className="card text-center">
              <Download className="w-12 h-12 text-primary-blue mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Download Model</h4>
              <p className="text-sm text-text-secondary mb-4">
                Get the latest global model for deployment
              </p>
              <Link to="/global-model" className="btn btn-primary">
                Go to Global Model
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-primary-blue/5 border-l-4 border-primary-blue p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary-blue mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary-blue mb-2">Security & Privacy</h4>
              <p className="text-sm text-text-secondary">
                QuantumSafe is designed with security and privacy at its core. Your data never leaves your organization, 
                and all communications are protected with post-quantum cryptography. The blockchain ensures complete 
                transparency and auditability of all operations.
              </p>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center mt-12">
          <Link 
            to="/login" 
            className="btn btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OnboardingGuide;