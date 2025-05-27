import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import TemplateGrid from '../components/templates/TemplateGrid';

const Templates: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-6 text-gray-900 sm:truncate">
          Certificate Templates
        </h1>
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload Custom Template
          </button>
        </div>
      </div>

      <div className="mt-6">
        <TemplateGrid />
      </div>
    </DashboardLayout>
  );
};

export default Templates;