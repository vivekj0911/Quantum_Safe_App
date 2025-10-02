import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Login() {
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, org, id: Date.now() };
    dispatch({ type: 'SET_USER', payload: user });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5">
      <div className="bg-bg-card p-12 rounded-custom shadow-lg w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center justify-center gap-2">
            🛡️ QuantumSafe
          </h1>
          <p className="text-text-secondary text-sm">
            Collaborative Threat Intelligence Fusion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-sm text-text-primary">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="org" className="block mb-2 font-medium text-sm text-text-primary">
              Organization Name
            </label>
            <input
              type="text"
              id="org"
              className="form-input"
              placeholder="Company A"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/onboarding-guide"
            className="inline-flex items-center gap-2 text-sm text-primary-blue hover:text-primary-dark transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            New to QuantumSafe? Learn how to use it
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;