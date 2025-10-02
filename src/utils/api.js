// Mock API functions
export function generateRandomHex(length) {
  let result = '';
  const chars = '0123456789abcdef';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function incrementVersion(version) {
  const parts = version.split('.');
  parts[2] = parseInt(parts[2]) + 1;
  return parts.join('.');
}

export function fakeApi(endpoint, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = {
        'generate-cert': {
          success: true,
          certificate: {
            orgName: 'Unknown Org',
            algorithm: 'CRYSTALS-Dilithium',
            publicKey: generateRandomHex(64),
            issuedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          }
        },
        'register-blockchain': {
          success: true,
          txHash: '0x' + generateRandomHex(64),
          blockNumber: Math.floor(Math.random() * 1000000),
          status: 'confirmed'
        },
        'start-training': {
          success: true,
          jobId: 'train_' + Date.now()
        },
        'trigger-aggregation': {
          success: true,
          newModel: {
            version: '1.3.3',
            accuracy: (94.7 + Math.random() * 2).toFixed(1),
            rounds: 13,
            lastUpdate: new Date().toISOString().split('T')[0]
          }
        }
      };
      resolve(responses[endpoint] || { success: true });
    }, delay);
  });
}