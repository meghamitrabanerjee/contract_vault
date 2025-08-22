import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { Contract } from '../types/index';

interface ContractsListProps {
  contracts: Contract[];
  onDownload: (contractId: number, fileName: string) => void;
}

export const ContractsList: React.FC<ContractsListProps> = ({ contracts, onDownload }) => {
  if (contracts.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No contracts available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {contracts.map((contract) => (
        <div
          key={contract.id}
          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {contract.name}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{new Date(contract.uploadDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>{contract.size}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDownload(contract.id, contract.name)}
            className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-all duration-200"
            title="Download contract"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};