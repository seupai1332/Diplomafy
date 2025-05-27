import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Certificate {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  template_id: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
}

interface CertificateFormData {
  title: string;
  description?: string;
  template_id: string;
  customFields?: Record<string, string>;
}

export function useCertificates() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchCertificates();
    }
  }, [user]);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (err) {
      setError('Erro ao carregar certificados');
      console.error('Erro ao carregar certificados:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCertificate = async (formData: CertificateFormData) => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert([
          {
            user_id: user?.id,
            title: formData.title,
            description: formData.description,
            template_id: formData.template_id,
            status: 'draft',
            custom_fields: formData.customFields,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setCertificates([data, ...certificates]);
      return data;
    } catch (err) {
      setError('Erro ao criar certificado');
      console.error('Erro ao criar certificado:', err);
      throw err;
    }
  };

  const updateCertificate = async (id: string, formData: Partial<CertificateFormData>) => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .update({
          title: formData.title,
          description: formData.description,
          template_id: formData.template_id,
          custom_fields: formData.customFields,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setCertificates(certificates.map(cert => cert.id === id ? data : cert));
      return data;
    } catch (err) {
      setError('Erro ao atualizar certificado');
      console.error('Erro ao atualizar certificado:', err);
      throw err;
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCertificates(certificates.filter(cert => cert.id !== id));
    } catch (err) {
      setError('Erro ao excluir certificado');
      console.error('Erro ao excluir certificado:', err);
      throw err;
    }
  };

  const publishCertificate = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .update({ status: 'published', updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setCertificates(certificates.map(cert => cert.id === id ? data : cert));
      return data;
    } catch (err) {
      setError('Erro ao publicar certificado');
      console.error('Erro ao publicar certificado:', err);
      throw err;
    }
  };

  const archiveCertificate = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .update({ status: 'archived', updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setCertificates(certificates.map(cert => cert.id === id ? data : cert));
      return data;
    } catch (err) {
      setError('Erro ao arquivar certificado');
      console.error('Erro ao arquivar certificado:', err);
      throw err;
    }
  };

  return {
    certificates,
    loading,
    error,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    publishCertificate,
    archiveCertificate,
    refreshCertificates: fetchCertificates,
  };
} 