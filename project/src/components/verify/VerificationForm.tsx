import React, { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { validateCertificate } from '../../utils/certificateUtils';
import { mockCertificates, mockRecipients } from '../../data/mockData';

const VerificationForm: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
    details?: {
      recipientName: string;
      certificateTitle: string;
      eventName: string;
      issueDate: string;
    };
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      return;
    }
    
    const result = validateCertificate(verificationCode, mockCertificates, mockRecipients);
    
    if (result.isValid && result.certificate && result.recipient) {
      setVerificationResult({
        isValid: true,
        message: 'Certificate verified successfully!',
        details: {
          recipientName: result.recipient.name,
          certificateTitle: result.certificate.title,
          eventName: result.certificate.eventName,
          issueDate: new Date(result.certificate.createdAt).toLocaleDateString(),
        }
      });
    } else {
      setVerificationResult({
        isValid: false,
        message: 'Invalid certificate code. This certificate could not be verified.'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 bg-blue-600 sm:p-10 sm:pb-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Verify Certificate Authenticity
            </h2>
            <p className="mt-2 text-lg text-blue-100">
              Enter the verification code found on the certificate to verify its authenticity
            </p>
          </div>
        </div>
        
        <div className="px-6 py-8 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="verification-code" className="sr-only">
                Verification Code
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="verification-code"
                  id="verification-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code (e.g., CERT-JD-123456)"
                  className="flex-1 min-w-0 block w-full px-3 py-3 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300"
                />
                <button
                  type="submit"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Search className="h-5 w-5 mr-1" />
                  Verify
                </button>
              </div>
            </div>
          </form>
          
          {verificationResult && (
            <div className={`mt-6 p-4 rounded-md ${verificationResult.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {verificationResult.isValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${verificationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                    {verificationResult.message}
                  </h3>
                  
                  {verificationResult.isValid && verificationResult.details && (
                    <div className="mt-4 text-sm text-gray-700">
                      <div className="border border-green-200 rounded-md bg-white p-4">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                            <dd className="mt-1 text-sm text-gray-900">{verificationResult.details.recipientName}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Certificate</dt>
                            <dd className="mt-1 text-sm text-gray-900">{verificationResult.details.certificateTitle}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Event</dt>
                            <dd className="mt-1 text-sm text-gray-900">{verificationResult.details.eventName}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                            <dd className="mt-1 text-sm text-gray-900">{verificationResult.details.issueDate}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">How to verify a certificate?</h3>
        <div className="mt-4 max-w-xl mx-auto text-sm text-gray-500">
          <p>Each certificate includes a unique verification code in the format CERT-XX-XXXXXX. You can find this code at the bottom of the certificate, usually near the QR code.</p>
          <p className="mt-2">Alternatively, you can scan the QR code on the certificate with your phone's camera to be directed to this verification page automatically.</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;