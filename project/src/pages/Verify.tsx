import React from 'react';
import VerificationForm from '../components/verify/VerificationForm';

const Verify: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Certificate Verification
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Verify the authenticity of certificates issued through Diplomafy
          </p>
        </div>
        
        <VerificationForm />
        
        <div className="mt-16 text-center">
          <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
            Learn more about Diplomafy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Verify;