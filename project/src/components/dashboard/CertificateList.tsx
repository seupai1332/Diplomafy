import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, Send, Trash2 } from 'lucide-react';
import { useUserData } from '../../hooks/useUserData';
import { supabase } from '../../lib/supabase';

const CertificateList: React.FC = () => {
  const navigate = useNavigate();
  const { certificates, loading, error } = useUserData();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      // Recarregar a página para atualizar a lista
      window.location.reload();
    } catch (err) {
      console.error('Erro ao deletar certificado:', err);
      alert('Erro ao deletar certificado. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Erro ao carregar certificados: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Certificados Recentes</h2>
        <button
          onClick={() => navigate('/create')}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Novo Certificado
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {certificates.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              Nenhum certificado encontrado
            </li>
          ) : (
            certificates.map((cert) => (
              <li key={cert.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Criado em: {new Date(cert.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/certificates/${cert.id}`)}
                      className="text-gray-400 hover:text-blue-600"
                      title="Visualizar"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigate(`/certificates/${cert.id}/send`)}
                      className="text-gray-400 hover:text-green-600"
                      title="Enviar"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigate(`/certificates/${cert.id}/download`)}
                      className="text-gray-400 hover:text-purple-600"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja excluir este certificado?')) {
                          handleDelete(cert.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-600"
                      title="Excluir"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CertificateList;