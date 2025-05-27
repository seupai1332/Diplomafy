import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Template {
  id: string;
  name: string;
  html_content: string;
  css_content: string;
}

interface Props {
  templateId: string;
  formData: {
    title: string;
    description?: string;
    customFields?: Record<string, string>;
  };
}

const CertificatePreview: React.FC<Props> = ({ templateId, formData }) => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) throw error;
      setTemplate(data);
    } catch (err) {
      setError('Erro ao carregar modelo');
      console.error('Erro ao carregar modelo:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderCertificate = () => {
    if (!template) return null;

    // Substituir placeholders no HTML
    let html = template.html_content;
    html = html.replace('{{title}}', formData.title);
    html = html.replace('{{description}}', formData.description || '');

    // Substituir campos personalizados
    if (formData.customFields) {
      Object.entries(formData.customFields).forEach(([key, value]) => {
        html = html.replace(`{{${key}}}`, value);
      });
    }

    return (
      <div
        className="relative w-full aspect-[1.414] bg-white shadow-lg"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <style>{template.css_content}</style>
        <div
          className="certificate-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>Selecione um modelo para visualizar o certificado</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        {renderCertificate()}
      </div>
      <div className="absolute bottom-4 right-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;