import { Shield, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fakeApi, generateRandomHex } from '../utils/api';
import Modal from '../components/Modal';

function Onboarding() {
  const { certificate, currentUser, dispatch } = useApp();

  const generateCertificate = async () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        title: 'Generating Certificate',
        body: (
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p>Generating quantum-safe certificate...</p>
          </div>
        )
      }
    });

    try {
      const result = await fakeApi('generate-cert', 1500);
      const newCert = {
        ...result.certificate,
        orgName: currentUser?.org || 'Unknown Org'
      };
      
      dispatch({ type: 'SET_CERTIFICATE', payload: newCert });
      
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          title: 'Certificate Generated',
          body: (
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <div className="bg-bg-main p-4 rounded-lg text-left text-sm font-mono">
                <div><strong>Organization:</strong> {newCert.orgName}</div>
                <div><strong>Algorithm:</strong> {newCert.algorithm}</div>
                <div><strong>Public Key:</strong> {newCert.publicKey}</div>
                <div><strong>Issued:</strong> {new Date(newCert.issuedAt).toLocaleString()}</div>
              </div>
            </div>
          )
        }
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const registerBlockchain = async () => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: {
        title: 'Registering on Blockchain',
        body: (
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p>Broadcasting transaction...</p>
          </div>
        )
      }
    });

    try {
      const result = await fakeApi('register-blockchain', 2000);
      
      // Add to ledger
      dispatch({
        type: 'ADD_LEDGER_ENTRY',
        payload: {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          org: currentUser.org,
          action: 'Identity Registered',
          txHash: result.txHash
        }
      });
      
      dispatch({
        type: 'SHOW_MODAL',
        payload: {
          title: 'Registration Complete',
          body: (
            <div className="text-center">
              <div className="text-5xl mb-4">🎉</div>
              <div className="bg-bg-main p-4 rounded-lg text-left text-sm font-mono">
                <div><strong>Status:</strong> {result.status}</div>
                <div><strong>Transaction Hash:</strong> {result.txHash}</div>
                <div><strong>Block Number:</strong> {result.blockNumber}</div>
              </div>
              <p className="mt-4 text-text-secondary">
                Your identity is now registered on the blockchain!
              </p>
            </div>
          )
        }
      });
    } catch (error) {
      console.error('Error registering on blockchain:', error);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Identity & Onboarding</h1>
          <p className="text-text-secondary">Generate post-quantum cryptographic certificates and register on blockchain</p>
        </div>

        <div className="bg-primary-blue/5 border-l-4 border-primary-blue p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary-blue mt-0.5" />
            <div>
              <strong className="text-primary-blue">🔐 Quantum-Safe Security</strong>
              <p className="mt-2 text-sm text-text-secondary">
                This system uses CRYSTALS-Dilithium for post-quantum digital signatures, ensuring security against quantum computer attacks.
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Step 1: Generate Certificate</h3>
            <p className="text-text-secondary mb-6">
              Create a quantum-resistant identity certificate for your organization.
            </p>
            
            {certificate ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="badge badge-success">Certificate Generated</span>
                </div>
                <div className="bg-bg-main p-4 rounded-lg text-sm font-mono">
                  <div><strong>Org:</strong> {certificate.orgName}</div>
                  <div><strong>Algorithm:</strong> {certificate.algorithm}</div>
                  <div><strong>Public Key:</strong> {certificate.publicKey.substring(0, 32)}...</div>
                  <div><strong>Issued:</strong> {new Date(certificate.issuedAt).toLocaleString()}</div>
                </div>
              </div>
            ) : (
              <button onClick={generateCertificate} className="btn btn-primary">
                Generate PQC Certificate
              </button>
            )}
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Step 2: Blockchain Registration</h3>
            <p className="text-text-secondary mb-6">
              Register your certificate on the immutable blockchain ledger.
            </p>
            
            {certificate ? (
              <button onClick={registerBlockchain} className="btn btn-primary">
                Register on Blockchain
              </button>
            ) : (
              <div>
                <button className="btn btn-secondary opacity-50 cursor-not-allowed" disabled>
                  Register on Blockchain
                </button>
                <p className="text-xs text-text-secondary mt-3">
                  Generate certificate first
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Details */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
          {certificate ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-3 font-medium">Organization</td>
                    <td className="py-3">{certificate.orgName}</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 font-medium">Algorithm</td>
                    <td className="py-3">{certificate.algorithm}</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 font-medium">Public Key</td>
                    <td className="py-3 font-mono text-xs break-all">{certificate.publicKey}</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 font-medium">Issued At</td>
                    <td className="py-3">{new Date(certificate.issuedAt).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Expires At</td>
                    <td className="py-3">{new Date(certificate.expiresAt).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-text-secondary">
              No certificate generated yet. Click "Generate PQC Certificate" to get started.
            </div>
          )}
        </div>
      </div>
      <Modal />
    </>
  );
}

export default Onboarding;