import { Certificate, Recipient } from '../types';

/**
 * Generates a unique verification code for a certificate
 */
export const generateUniqueCode = (recipientName: string, certificateId: string): string => {
  const nameInitials = recipientName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
  
  return `CERT-${nameInitials}-${randomPart}`;
};

/**
 * Formats a date for display on certificates
 */
export const formatCertificateDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
};

/**
 * Validates if a certificate is authentic by checking the code
 */
export const validateCertificate = (
  code: string, 
  certificates: Certificate[], 
  recipients: Recipient[]
): { isValid: boolean; certificate?: Certificate; recipient?: Recipient } => {
  const recipient = recipients.find(r => r.uniqueCode === code);
  
  if (!recipient) {
    return { isValid: false };
  }
  
  const certificate = certificates.find(c => c.id === recipient.certificateId);
  
  if (!certificate) {
    return { isValid: false };
  }
  
  return {
    isValid: true,
    certificate,
    recipient
  };
};

/**
 * Generates a QR code URL for a certificate
 */
export const getQRCodeUrl = (verificationCode: string): string => {
  // In a real implementation, this would generate an actual QR code
  // For now, we'll return a placeholder
  const baseUrl = 'https://diplomafy.com/verify';
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${baseUrl}/${verificationCode}`;
};