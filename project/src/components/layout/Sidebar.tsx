import React from 'react';
import { 
  LayoutDashboard, 
  Award, 
  Users, 
  LayoutTemplate, 
  Send, 
  Settings, 
  HelpCircle,
  Crown
} from 'lucide-react';
import { currentUser } from '../../data/mockData';

const Sidebar: React.FC = () => {
  const navigation = [
    { name: 'Painel', href: '#', icon: LayoutDashboard, current: true },
    { name: 'Certificados', href: '#', icon: Award, current: false },
    { name: 'Modelos', href: '#', icon: LayoutTemplate, current: false },
    { name: 'Destinatários', href: '#', icon: Users, current: false },
    { name: 'Distribuição', href: '#', icon: Send, current: false },
    { name: 'Configurações', href: '#', icon: Settings, current: false },
    { name: 'Ajuda', href: '#', icon: HelpCircle, current: false },
  ];

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-2xl font-bold text-white">Diplomafy</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                `}
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={currentUser.logoUrl}
                alt="Logo da empresa"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{currentUser.companyName}</p>
              <div className="flex items-center text-xs font-medium text-gray-300">
                <span>{currentUser.subscriptionPlan === 'free' ? 'Plano Gratuito' : 'Plano Premium'}</span>
                {currentUser.subscriptionPlan !== 'free' && (
                  <Crown className="ml-1 h-3 w-3 text-yellow-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;