import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Recipient } from '../types';

export function useRecipients(certificateId: string) {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipients = async () => {
    try {
      const { data, error } = await supabase
        .from('recipients')
        .select('*')
        .eq('certificate_id', certificateId)
        .order('name');

      if (error) throw error;
      setRecipients(data || []);
    } catch (err) {
      setError('Erro ao carregar destinatários');
      console.error('Erro ao carregar destinatários:', err);
    } finally {
      setLoading(false);
    }
  };

  const addRecipient = async (recipientData: Omit<Recipient, 'id' | 'certificate_id'>) => {
    try {
      const { data, error } = await supabase
        .from('recipients')
        .insert([
          {
            certificate_id: certificateId,
            ...recipientData,
            unique_code: generateUniqueCode(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setRecipients([...recipients, data]);
      return data;
    } catch (err) {
      setError('Erro ao adicionar destinatário');
      console.error('Erro ao adicionar destinatário:', err);
      throw err;
    }
  };

  const addRecipientsBatch = async (recipientsData: Omit<Recipient, 'id' | 'certificate_id' | 'unique_code'>[]) => {
    try {
      const recipientsToInsert = recipientsData.map(recipient => ({
        certificate_id: certificateId,
        ...recipient,
        unique_code: generateUniqueCode(),
      }));

      const { data, error } = await supabase
        .from('recipients')
        .insert(recipientsToInsert)
        .select();

      if (error) throw error;
      setRecipients([...recipients, ...data]);
      return data;
    } catch (err) {
      setError('Erro ao adicionar destinatários em lote');
      console.error('Erro ao adicionar destinatários em lote:', err);
      throw err;
    }
  };

  const updateRecipient = async (id: string, recipientData: Partial<Recipient>) => {
    try {
      const { data, error } = await supabase
        .from('recipients')
        .update(recipientData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setRecipients(recipients.map(r => r.id === id ? data : r));
      return data;
    } catch (err) {
      setError('Erro ao atualizar destinatário');
      console.error('Erro ao atualizar destinatário:', err);
      throw err;
    }
  };

  const deleteRecipient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('recipients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setRecipients(recipients.filter(r => r.id !== id));
    } catch (err) {
      setError('Erro ao excluir destinatário');
      console.error('Erro ao excluir destinatário:', err);
      throw err;
    }
  };

  const generateUniqueCode = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  return {
    recipients,
    loading,
    error,
    fetchRecipients,
    addRecipient,
    addRecipientsBatch,
    updateRecipient,
    deleteRecipient,
  };
} 