import { useState } from 'react';
import { Search, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Audit() {
  const { ledgerEntries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = ledgerEntries.filter(entry =>
    entry.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.txHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Audit Trail</h1>
        <p className="text-text-secondary">Immutable blockchain ledger of all contributions and actions</p>
      </div>

      {/* Search Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-secondary" />
        </div>
        <input
          type="text"
          className="form-input pl-10"
          placeholder="Search by organization, action, or transaction hash..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Audit Table */}
      <div className="bg-bg-card rounded-custom overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-main">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Transaction Hash
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredEntries.map((entry, index) => (
                <tr key={index} className="hover:bg-bg-main transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {entry.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <strong className="text-sm">{entry.org}</strong>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {entry.action}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono break-all">
                    {entry.txHash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEntries.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            No entries found matching your search criteria.
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-primary-blue/5 border-l-4 border-primary-blue p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary-blue mt-0.5" />
          <div>
            <strong className="text-primary-blue">🔒 Blockchain Security</strong>
            <p className="mt-2 text-sm text-text-secondary">
              All entries are cryptographically signed and stored on an immutable distributed ledger. Each transaction is verified by multiple nodes before being added to the chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Audit;