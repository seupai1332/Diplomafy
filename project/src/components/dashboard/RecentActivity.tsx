import React from 'react';
import { useUserData } from '../../hooks/useUserData';
import { Eye, Send, Download } from 'lucide-react';

interface Activity {
  id: string;
  type: 'view' | 'send' | 'download';
  certificateTitle: string;
  recipientEmail?: string;
  timestamp: string;
}

const RecentActivity: React.FC = () => {
  const { certificates, recipients } = useUserData();
  const [activities, setActivities] = React.useState<Activity[]>([]);

  React.useEffect(() => {
    // Criar lista de atividades a partir dos certificados e destinatários
    const newActivities: Activity[] = [];

    recipients.forEach(recipient => {
      if (recipient.viewed_at) {
        const certificate = certificates.find(c => c.id === recipient.certificate_id);
        if (certificate) {
          newActivities.push({
            id: `view-${recipient.id}`,
            type: 'view',
            certificateTitle: certificate.title,
            recipientEmail: recipient.email,
            timestamp: recipient.viewed_at,
          });
        }
      }

      if (recipient.sent_at) {
        const certificate = certificates.find(c => c.id === recipient.certificate_id);
        if (certificate) {
          newActivities.push({
            id: `send-${recipient.id}`,
            type: 'send',
            certificateTitle: certificate.title,
            recipientEmail: recipient.email,
            timestamp: recipient.sent_at,
          });
        }
      }
    });

    // Ordenar por data mais recente
    newActivities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Limitar a 5 atividades mais recentes
    setActivities(newActivities.slice(0, 5));
  }, [certificates, recipients]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'view':
        return <Eye className="h-5 w-5 text-blue-500" />;
      case 'send':
        return <Send className="h-5 w-5 text-green-500" />;
      case 'download':
        return <Download className="h-5 w-5 text-purple-500" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'view':
        return `${activity.recipientEmail} visualizou o certificado "${activity.certificateTitle}"`;
      case 'send':
        return `Certificado "${activity.certificateTitle}" enviado para ${activity.recipientEmail}`;
      case 'download':
        return `${activity.recipientEmail} baixou o certificado "${activity.certificateTitle}"`;
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Atividades Recentes</h3>
        <p className="text-sm text-gray-500 text-center py-4">
          Nenhuma atividade recente
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Atividades Recentes</h3>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, idx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {idx !== activities.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {getActivityText(activity)}
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;