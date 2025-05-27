import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import TemplateCard from './TemplateCard';
import { Template } from '../../types';
import { mockTemplates } from '../../data/mockData';

const TemplateGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState<boolean>(false);
  
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'education', name: 'Education' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'recognition', name: 'Recognition' },
    { id: 'technical', name: 'Technical' },
  ];
  
  const filteredTemplates = mockTemplates.filter(template => {
    if (showPremiumOnly && !template.isPremium) return false;
    if (selectedCategory !== 'all' && template.category !== selectedCategory) return false;
    return true;
  });
  
  const handleTemplateSelect = (template: Template) => {
    console.log('Selected template:', template);
    // In a real app, this would navigate to the certificate editor
  };

  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        {/* Category tabs */}
        <div className="flex overflow-x-auto pb-1 space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                ${selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Premium filter */}
        <div className="flex items-center">
          <button
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-1" />
            {showPremiumOnly ? 'All Templates' : 'Premium Only'}
          </button>
        </div>
      </div>
      
      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>
      
      {/* Empty state */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No templates found with the selected filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setShowPremiumOnly(false);
            }}
            className="mt-2 text-blue-600 hover:text-blue-500"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;