import { useState, useEffect } from 'react';
import { offlineStorage } from '../utils/offlineStorage';
import { logger } from '../utils/logger';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [hasUnsyncedData, setHasUnsyncedData] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Monitorar estado da conexão
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Verificar dados não sincronizados
    checkUnsyncedData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Verificar dados não sincronizados quando voltar online
  useEffect(() => {
    if (!isOffline) {
      checkUnsyncedData();
    }
  }, [isOffline]);

  const checkUnsyncedData = async () => {
    try {
      const hasUnsynced = await offlineStorage.hasUnsyncedData();
      setHasUnsyncedData(hasUnsynced);
    } catch (err) {
      logger.error('Erro ao verificar dados não sincronizados:', err);
    }
  };

  const syncData = async () => {
    if (isOffline) {
      logger.warn('Tentativa de sincronização offline');
      return;
    }

    try {
      setIsSyncing(true);

      // Buscar dados offline
      const certificates = await offlineStorage.getOfflineCertificates();
      const templates = await offlineStorage.getOfflineTemplates();

      // Sincronizar com o servidor
      await Promise.all([
        syncCertificates(certificates),
        syncTemplates(templates),
      ]);

      // Atualizar última sincronização
      await offlineStorage.updateLastSync();
      setHasUnsyncedData(false);

      logger.info('Sincronização concluída com sucesso');
    } catch (err) {
      logger.error('Erro durante sincronização:', err);
      throw err;
    } finally {
      setIsSyncing(false);
    }
  };

  const syncCertificates = async (certificates: any[]) => {
    // Implementar sincronização de certificados com o servidor
    logger.info('Sincronizando certificados:', certificates.length);
  };

  const syncTemplates = async (templates: any[]) => {
    // Implementar sincronização de templates com o servidor
    logger.info('Sincronizando templates:', templates.length);
  };

  return {
    isOffline,
    hasUnsyncedData,
    isSyncing,
    syncData,
  };
} 