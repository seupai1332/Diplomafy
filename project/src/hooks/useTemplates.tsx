import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Template } from '../types';
import { useAuth } from './useAuth';
import { templateCache } from '../utils/templateCache';
import { logger } from '../utils/logger';

export function useTemplates() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);

  const fetchTemplates = async () => {
    try {
      // Verificar cache primeiro
      const cachedKeys = templateCache.getAllKeys();
      if (cachedKeys.length > 0) {
        const cachedTemplates = templateCache.getMany(cachedKeys)
          .filter((t): t is Template => t !== null)
          .sort((a, b) => b.popularity_score - a.popularity_score);
        
        setTemplates(cachedTemplates);
        setLoading(false);
        
        // Atualizar em background
        refreshTemplates();
        return;
      }

      // Se não houver cache, buscar do servidor
      await refreshTemplates();
    } catch (err) {
      const errorMessage = 'Erro ao carregar templates';
      setError(errorMessage);
      logger.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  };

  const refreshTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('popularity_score', { ascending: false });

      if (error) throw error;

      // Atualizar cache e estado
      templateCache.setMany(data || []);
      setTemplates(data || []);
    } catch (err) {
      const errorMessage = 'Erro ao atualizar templates';
      logger.error(errorMessage, err);
      throw err;
    }
  };

  const getTemplatesByCategory = (category: string) => {
    return templates.filter(template => template.category === category);
  };

  const getTemplateById = async (id: string) => {
    try {
      // Verificar cache primeiro
      const cachedTemplate = templateCache.get(id);
      if (cachedTemplate) {
        return cachedTemplate;
      }

      // Se não estiver em cache, buscar do servidor
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Atualizar cache
      if (data) {
        templateCache.set(id, data);
      }

      return data;
    } catch (err) {
      const errorMessage = `Erro ao carregar template ${id}`;
      logger.error(errorMessage, err);
      return null;
    }
  };

  const updateTemplatePopularity = async (id: string) => {
    try {
      const { error } = await supabase.rpc('increment_template_popularity', {
        template_id: id
      });

      if (error) throw error;

      // Atualizar cache e estado
      const template = await getTemplateById(id);
      if (template) {
        templateCache.set(id, template);
        setTemplates(prev => prev.map(t => t.id === id ? template : t));
      }
    } catch (err) {
      const errorMessage = `Erro ao atualizar popularidade do template ${id}`;
      logger.error(errorMessage, err);
    }
  };

  return {
    templates,
    loading,
    error,
    getTemplatesByCategory,
    getTemplateById,
    updateTemplatePopularity,
    refreshTemplates,
  };
} 