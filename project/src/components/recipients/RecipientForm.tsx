import React, { useState } from 'react';
import { Recipient } from '../../types';
import { generateUniqueCode } from '../../utils/certificateUtils';

interface RecipientFormProps {
  certificateId: string;
  recipient?: Recipient;
  onSubmit: (recipient: Omit<Recipient, 'id'>) => void;
  onCancel: () => void;
}

const RecipientForm: React.FC<RecipientFormProps> = ({
  certificateId,
  recipient,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: recipient?.name || '',
    email: recipient?.email || '',
    customData: recipient?.customData || {},
  });

  const [customFields, setCustomFields] = useState<{ key: string; value: string }[]>(
    recipient?.customData
      ? Object.entries(recipient.customData).map(([key, value]) => ({ key, value: String(value) }))
      : [{ key: '', value: '' }]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomFieldChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const removeCustomField = (index: number) => {
    if (customFields.length > 1) {
      const updatedFields = [...customFields];
      updatedFields.splice(index, 1);
      setCustomFields(updatedFields);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert custom fields array to an object
    const customData = customFields.reduce((acc, { key, value }) => {
      if (key.trim()) {
        acc[key.trim()] = value;
      }
      return acc;
    }, {} as Record<string, string>);
    
    // Generate unique code if not editing
    const uniqueCode = recipient?.uniqueCode || generateUniqueCode(formData.name, certificateId);
    
    onSubmit({
      certificateId,
      name: formData.name,
      email: formData.email,
      customData,
      uniqueCode,
      sentAt: recipient?.sentAt,
      viewedAt: recipient?.viewedAt
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {recipient ? 'Edit Recipient' : 'Add Recipient'}
        </h3>
        
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Custom Fields (Optional)</h4>
            <button
              type="button"
              onClick={addCustomField}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              + Add Field
            </button>
          </div>
          
          <div className="mt-2 space-y-3">
            {customFields.map((field, index) => (
              <div key={index} className="flex space-x-2">
                <div className="w-2/5">
                  <input
                    type="text"
                    value={field.key}
                    onChange={(e) => handleCustomFieldChange(index, 'key', e.target.value)}
                    placeholder="Field name"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="w-3/5 flex">
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {customFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCustomField(index)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {recipient ? 'Update Recipient' : 'Add Recipient'}
        </button>
      </div>
    </form>
  );
};

export default RecipientForm;