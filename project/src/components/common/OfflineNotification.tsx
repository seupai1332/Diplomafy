import React from 'react';
import { useOffline } from '../../hooks/useOffline';

const OfflineNotification: React.FC = () => {
  const { isOffline, hasUnsyncedData, isSyncing, syncData } = useOffline();

  if (!isOffline && !hasUnsyncedData) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      {isOffline ? (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Você está offline</p>
            <p className="text-sm text-gray-500">
              Algumas funcionalidades podem estar indisponíveis
            </p>
          </div>
        </div>
      ) : hasUnsyncedData ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Dados não sincronizados</p>
              <p className="text-sm text-gray-500">
                Clique para sincronizar suas alterações
              </p>
            </div>
          </div>
          <button
            onClick={syncData}
            disabled={isSyncing}
            className={`ml-4 px-3 py-1 rounded-md text-sm font-medium text-white ${
              isSyncing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OfflineNotification; 