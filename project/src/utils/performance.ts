import { logger } from './logger';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private readonly maxMetrics = 1000;

  private constructor() {
    this.setupPerformanceObserver();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private setupPerformanceObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Observar métricas Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(entry.name, entry.startTime, {
            entryType: entry.entryType,
          });
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  }

  recordMetric(name: string, value: number, tags?: Record<string, string>) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      tags,
    };

    this.metrics.push(metric);

    // Limitar número de métricas armazenadas
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      logger.info(`Performance Metric: ${name}`, metric);
    }

    // Enviar para serviço de monitoramento em produção
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(metric);
    }
  }

  private async sendToMonitoringService(metric: PerformanceMetric) {
    try {
      const endpoint = process.env.REACT_APP_MONITORING_ENDPOINT;
      if (endpoint) {
        await fetch(`${endpoint}/metrics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metric),
        });
      }
    } catch (err) {
      logger.error('Erro ao enviar métrica para serviço de monitoramento:', err);
    }
  }

  getMetrics(filter?: {
    name?: string;
    startTime?: number;
    endTime?: number;
    tags?: Record<string, string>;
  }): PerformanceMetric[] {
    let filtered = [...this.metrics];

    if (filter) {
      if (filter.name) {
        filtered = filtered.filter(m => m.name === filter.name);
      }
      if (filter.startTime) {
        filtered = filtered.filter(m => m.timestamp >= filter.startTime);
      }
      if (filter.endTime) {
        filtered = filtered.filter(m => m.timestamp <= filter.endTime);
      }
      if (filter.tags) {
        filtered = filtered.filter(m => {
          if (!m.tags) return false;
          return Object.entries(filter.tags!).every(
            ([key, value]) => m.tags![key] === value
          );
        });
      }
    }

    return filtered;
  }

  clearMetrics() {
    this.metrics = [];
  }

  // Métricas específicas da aplicação
  measureTemplateLoad(templateId: string, loadTime: number) {
    this.recordMetric('template_load', loadTime, {
      templateId,
      context: 'template-rendering',
    });
  }

  measureCertificateGeneration(certificateId: string, generationTime: number) {
    this.recordMetric('certificate_generation', generationTime, {
      certificateId,
      context: 'pdf-generation',
    });
  }

  measureAPIResponse(endpoint: string, responseTime: number, status: number) {
    this.recordMetric('api_response', responseTime, {
      endpoint,
      status: status.toString(),
      context: 'api-call',
    });
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance(); 