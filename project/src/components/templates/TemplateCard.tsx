import React from 'react';
import { Crown, Star } from 'lucide-react';
import { Template } from '../../types';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <div 
      className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
      onClick={() => onSelect(template)}
    >
      {/* Premium badge */}
      {template.isPremium && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white rounded-full px-2 py-0.5 text-xs font-medium flex items-center z-10">
          <Crown className="h-3 w-3 mr-1" />
          Premium
        </div>
      )}
      
      {/* Template thumbnail */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 group-hover:opacity-90 transition-opacity">
        <img 
          src={template.thumbnailUrl} 
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
          <button 
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            Use Template
          </button>
        </div>
      </div>
      
      {/* Template info */}
      <div className="p-4">
        <h3 className="text-gray-900 font-medium">{template.name}</h3>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 capitalize">
            {template.category}
          </span>
          
          <div className="flex items-center">
            <Star className="h-3 w-3 text-amber-400 mr-1" />
            <span className="text-xs text-gray-600">{Math.floor(template.popularityScore)}% popular</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;