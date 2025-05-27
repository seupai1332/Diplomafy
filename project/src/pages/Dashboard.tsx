import React from 'react';
import { Award, Users, Eye, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import PlanStatus from '../components/dashboard/PlanStatus';
import RecentActivity from '../components/dashboard/RecentActivity';
import CertificateList from '../components/dashboard/CertificateList';
import { useUserData } from '../hooks/useUserData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, getStats } = useUserData();
  const stats = getStats();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-600">
          <p>Erro ao carregar dados: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-6 text-gray-900 sm:truncate">
          Dashboard
        </h1>
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => navigate('/create')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Criar Certificado
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Certificados"
          value={stats.totalCertificates}
          icon={<Award className="h-6 w-6 text-white" />}
        />
        <StatCard
          title="Total de Destinatários"
          value={stats.totalRecipients}
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <StatCard
          title="Certificados Visualizados"
          value={stats.viewedCertificates}
          icon={<Eye className="h-6 w-6 text-white" />}
        />
        <StatCard
          title="Certificados Enviados"
          value={stats.sentCertificates}
          icon={<FileCheck className="h-6 w-6 text-white" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CertificateList />
        </div>
        <div className="space-y-5">
          <PlanStatus />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;