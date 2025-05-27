import { Certificate, Template } from '../types';
import { logger } from './logger';

interface OfflineData {
  certificates: Certificate[];
  templates: Template[];
  lastSync: number;
}

class OfflineStorage {
  private static instance: OfflineStorage;
  private readonly STORAGE_KEY = 'diplomafy_offline_data';
  private readonly MAX_OFFLINE_CERTIFICATES = 50;
  private readonly MAX_OFFLINE_TEMPLATES = 20;

  private constructor() {}

  static getInstance(): OfflineStorage {
    if (!OfflineStorage.instance) {
      OfflineStorage.instance = new OfflineStorage();
    }
    return OfflineStorage.instance;
  }

  private getStorageData(): OfflineData {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        return {
          certificates: [],
          templates: [],
          lastSync: 0,
        };
      }
      return JSON.parse(data);
    } catch (err) {
      logger.error('Erro ao ler dados offline:', err);
      return {
        certificates: [],
        templates: [],
        lastSync: 0,
      };
    }
  }

  private setStorageData(data: OfflineData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      logger.error('Erro ao salvar dados offline:', err);
    }
  }

  // Certificados
  async saveCertificateOffline(certificate: Certificate): Promise<void> {
    try {
      const data = this.getStorageData();
      
      // Remover certificado existente se houver
      data.certificates = data.certificates.filter(c => c.id !== certificate.id);
      
      // Adicionar novo certificado
      data.certificates.unshift(certificate);
      
      // Manter apenas os últimos MAX_OFFLINE_CERTIFICATES
      if (data.certificates.length > this.MAX_OFFLINE_CERTIFICATES) {
        data.certificates = data.certificates.slice(0, this.MAX_OFFLINE_CERTIFICATES);
      }

      this.setStorageData(data);
      logger.info('Certificado salvo offline:', certificate.id);
    } catch (err) {
      logger.error('Erro ao salvar certificado offline:', err);
      throw err;
    }
  }

  async getOfflineCertificates(): Promise<Certificate[]> {
    try {
      const data = this.getStorageData();
      return data.certificates;
    } catch (err) {
      logger.error('Erro ao buscar certificados offline:', err);
      return [];
    }
  }

  // Templates
  async saveTemplateOffline(template: Template): Promise<void> {
    try {
      const data = this.getStorageData();
      
      // Remover template existente se houver
      data.templates = data.templates.filter(t => t.id !== template.id);
      
      // Adicionar novo template
      data.templates.unshift(template);
      
      // Manter apenas os últimos MAX_OFFLINE_TEMPLATES
      if (data.templates.length > this.MAX_OFFLINE_TEMPLATES) {
        data.templates = data.templates.slice(0, this.MAX_OFFLINE_TEMPLATES);
      }

      this.setStorageData(data);
      logger.info('Template salvo offline:', template.id);
    } catch (err) {
      logger.error('Erro ao salvar template offline:', err);
      throw err;
    }
  }

  async getOfflineTemplates(): Promise<Template[]> {
    try {
      const data = this.getStorageData();
      return data.templates;
    } catch (err) {
      logger.error('Erro ao buscar templates offline:', err);
      return [];
    }
  }

  // Sincronização
  async updateLastSync(): Promise<void> {
    try {
      const data = this.getStorageData();
      data.lastSync = Date.now();
      this.setStorageData(data);
    } catch (err) {
      logger.error('Erro ao atualizar última sincronização:', err);
    }
  }

  async getLastSync(): Promise<number> {
    try {
      const data = this.getStorageData();
      return data.lastSync;
    } catch (err) {
      logger.error('Erro ao buscar última sincronização:', err);
      return 0;
    }
  }

  async clearOfflineData(): Promise<void> {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      logger.info('Dados offline limpos com sucesso');
    } catch (err) {
      logger.error('Erro ao limpar dados offline:', err);
      throw err;
    }
  }

  // Verificar se há dados não sincronizados
  async hasUnsyncedData(): Promise<boolean> {
    try {
      const data = this.getStorageData();
      const lastSync = data.lastSync;
      const now = Date.now();
      
      // Considerar dados não sincronizados se passaram mais de 24 horas
      return now - lastSync > 24 * 60 * 60 * 1000;
    } catch (err) {
      logger.error('Erro ao verificar dados não sincronizados:', err);
      return false;
    }
  }
}

export const offlineStorage = OfflineStorage.getInstance(); 