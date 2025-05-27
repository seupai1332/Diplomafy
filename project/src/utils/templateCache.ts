import { Template } from '../types';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

class TemplateCache {
  private static instance: TemplateCache;
  private cache: Map<string, CacheItem<Template>> = new Map();
  private readonly defaultExpiration = 1000 * 60 * 30; // 30 minutos

  private constructor() {}

  static getInstance(): TemplateCache {
    if (!TemplateCache.instance) {
      TemplateCache.instance = new TemplateCache();
    }
    return TemplateCache.instance;
  }

  set(key: string, data: Template, expiresIn: number = this.defaultExpiration): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
    });
  }

  get(key: string): Template | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  setMany(templates: Template[]): void {
    templates.forEach(template => {
      this.set(template.id, template);
    });
  }

  getMany(keys: string[]): (Template | null)[] {
    return keys.map(key => this.get(key));
  }

  getAllKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  size(): number {
    return this.cache.size;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiresIn) {
        this.cache.delete(key);
      }
    }
  }

  // Iniciar limpeza automática a cada hora
  startAutoCleanup(interval: number = 1000 * 60 * 60): void {
    setInterval(() => this.cleanup(), interval);
  }
}

export const templateCache = TemplateCache.getInstance(); 