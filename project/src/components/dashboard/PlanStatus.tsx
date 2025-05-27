import React from 'react';
import { Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const PlanStatus: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3 mt-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const planInfo = {
    free: {
      name: 'Gratuito',
      color: 'gray',
      features: ['5 certificados/mês', 'Templates básicos', 'Suporte por email'],
    },
    pro: {
      name: 'Pro',
      color: 'blue',
      features: ['Certificados ilimitados', 'Templates premium', 'Suporte prioritário'],
    },
    enterprise: {
      name: 'Enterprise',
      color: 'purple',
      features: ['Tudo do Pro', 'API access', 'Suporte 24/7'],
    },
  };

  const currentPlan = planInfo[profile.subscription_plan as keyof typeof planInfo];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Seu Plano</h3>
        <Crown className={`h-6 w-6 text-${currentPlan.color}-500`} />
      </div>
      
      <div className="mt-4">
        <p className={`text-${currentPlan.color}-600 font-semibold`}>
          {currentPlan.name}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Status: {profile.subscription_status === 'active' ? 'Ativo' : 'Inativo'}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900">Recursos incluídos:</h4>
        <ul className="mt-2 space-y-2">
          {currentPlan.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-500 flex items-center">
              <svg
                className={`h-4 w-4 text-${currentPlan.color}-500 mr-2`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {profile.subscription_plan === 'free' && (
        <button
          onClick={() => navigate('/settings/billing')}
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Fazer Upgrade
        </button>
      )}
    </div>
  );
};

export default PlanStatus;