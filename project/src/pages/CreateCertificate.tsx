import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import CertificateForm from '../components/certificates/CertificateForm';
import CertificatePreview from '../components/certificates/CertificatePreview';
import { useCertificates } from '../hooks/useCertificates';

interface FormData {
  title: string;
  description?: string;
  template_id: string;
  customFields?: Record<string, string>;
}

const CreateCertificate: React.FC = () => {
  const navigate = useNavigate();
  const { createCertificate } = useCertificates();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    template_id: '1', // ID do template padrão
    customFields: {},
  });

  const handleSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const certificate = await createCertificate(data);
      navigate(`/certificates/${certificate.id}`);
    } catch (err) {
      setError('Erro ao criar certificado. Por favor, tente novamente.');
      console.error('Erro ao criar certificado:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-6 text-gray-900">
          Criar Novo Certificado
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Preencha os detalhes abaixo para criar um novo certificado usando o modelo selecionado.
        </p>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <CertificateForm
            initialData={formData}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/dashboard')}
            loading={loading}
          />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pré-visualização</h3>
            <CertificatePreview
              templateId={formData.template_id}
              formData={formData}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCertificate;