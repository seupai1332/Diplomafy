type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };

    this.logs.push(entry);

    // Manter apenas os últimos maxLogs registros
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Enviar para serviço de monitoramento em produção
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(entry);
    }

    // Log no console em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console[level](message, data);
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }

  private async sendToMonitoringService(entry: LogEntry) {
    try {
      // Aqui você implementaria a integração com seu serviço de monitoramento
      // Por exemplo: Sentry, LogRocket, etc.
      const monitoringEndpoint = process.env.REACT_APP_MONITORING_ENDPOINT;
      if (monitoringEndpoint) {
        await fetch(monitoringEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry),
        });
      }
    } catch (err) {
      console.error('Erro ao enviar log para serviço de monitoramento:', err);
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 