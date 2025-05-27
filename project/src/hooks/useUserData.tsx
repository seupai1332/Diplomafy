import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface Certificate {
  id: string;
  title: string;
  created_at: string;
  status: string;
}

export interface Recipient {
  id: string;
  email: string;
  certificate_id: string;
  sent_at: string | null;
  viewed_at: string | null;
}

export function useUserData() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Buscar certificados do usuário
        const { data: certificatesData, error: certificatesError } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', user.id);

        if (certificatesError) throw certificatesError;

        // Buscar destinatários dos certificados
        const { data: recipientsData, error: recipientsError } = await supabase
          .from('recipients')
          .select('*')
          .eq('user_id', user.id);

        if (recipientsError) throw recipientsError;

        setCertificates(certificatesData || []);
        setRecipients(recipientsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getStats = () => {
    return {
      totalCertificates: certificates.length,
      totalRecipients: recipients.length,
      viewedCertificates: recipients.filter(r => r.viewed_at).length,
      sentCertificates: recipients.filter(r => r.sent_at).length,
    };
  };

  return {
    certificates,
    recipients,
    loading,
    error,
    getStats,
  };
} 