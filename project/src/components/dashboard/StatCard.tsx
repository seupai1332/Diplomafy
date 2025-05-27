import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  change?: string;
  isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  isPositive,
}) => {
  return (
    <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className="absolute bg-blue-500 rounded-md p-3">
          {icon}
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          {title}
        </p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">
          {value}
        </p>
        {change && (
          <p
            className={`ml-2 flex items-baseline text-sm font-semibold ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? '+' : '-'}{change}
          </p>
        )}
      </dd>
    </div>
  );
};

export default StatCard;