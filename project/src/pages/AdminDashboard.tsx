import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Users, CreditCard, QrCode, Search } from 'lucide-react';

interface User {
  id: string;
  email: string;
  company_name: string;
  subscription_plan: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'inactive' | 'cancelled';
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error('Erro ao carregar usuários:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = async (userId: string, newPlan: 'free' | 'pro' | 'enterprise') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_plan: newPlan })
        .eq('id', userId);

      if (error) throw error;
      fetchUsers();
    } catch (err) {
      setError('Erro ao atualizar plano');
      console.error('Erro ao atualizar plano:', err);
    }
  };

  const generateQRCode = async (userId: string) => {
    try {
      // Gerar QR Code para pagamento PIX
      const planPrices = {
        pro: 49.90,
        enterprise: 99.90,
      };

      const selectedUserPlan = users.find(u => u.id === userId)?.subscription_plan;
      if (!selectedUserPlan || selectedUserPlan === 'free') return;

      const amount = planPrices[selectedUserPlan as keyof typeof planPrices];
      const pixKey = process.env.REACT_APP_PIX_KEY;
      
      // Em produção, use uma API real de QR Code PIX
      const qrCodeData = `pix://payment?key=${pixKey}&amount=${amount}&description=Upgrade de Plano - Diplomafy`;
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`);
    } catch (err) {
      setError('Erro ao gerar QR Code');
      console.error('Erro ao gerar QR Code:', err);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <li className="px-6 py-4 text-center text-gray-500">
                Nenhum usuário encontrado
              </li>
            ) : (
              filteredUsers.map(user => (
                <li key={user.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{user.email}</h3>
                      <p className="text-sm text-gray-500">{user.company_name}</p>
                      <p className="text-xs text-gray-400">
                        Criado em: {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={user.subscription_plan}
                        onChange={(e) => handlePlanChange(user.id, e.target.value as 'free' | 'pro' | 'enterprise')}
                        className="border border-gray-300 rounded-md text-sm"
                      >
                        <option value="free">Gratuito</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                      {user.subscription_plan !== 'free' && (
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            generateQRCode(user.id);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <QrCode className="h-4 w-4 mr-1" />
                          Gerar QR Code PIX
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {selectedUser && qrCodeUrl && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              QR Code PIX para {selectedUser.email}
            </h3>
            <img src={qrCodeUrl} alt="QR Code PIX" className="mx-auto" />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setQrCodeUrl('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;