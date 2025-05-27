import { User, Template, Certificate, Recipient } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  companyName: 'Acme Inc.',
  logoUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=150',
  subscriptionPlan: 'free',
  subscriptionStatus: 'active',
  createdAt: new Date('2023-01-15'),
  lastLogin: new Date()
};

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Executive Pro',
    thumbnailUrl: 'https://images.pexels.com/photos/4466172/pexels-photo-4466172.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'corporate',
    isPremium: true,
    popularityScore: 98,
    createdAt: new Date('2022-10-15')
  },
  {
    id: '2',
    name: 'Academic Excellence',
    thumbnailUrl: 'https://images.pexels.com/photos/5428004/pexels-photo-5428004.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'education',
    isPremium: true,
    popularityScore: 94,
    createdAt: new Date('2022-11-05')
  },
  {
    id: '3',
    name: 'Modern Achievement',
    thumbnailUrl: 'https://images.pexels.com/photos/4348557/pexels-photo-4348557.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'recognition',
    isPremium: false,
    popularityScore: 89,
    createdAt: new Date('2022-12-10')
  },
  {
    id: '4',
    name: 'Technical Mastery',
    thumbnailUrl: 'https://images.pexels.com/photos/5428008/pexels-photo-5428008.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'technical',
    isPremium: false,
    popularityScore: 85,
    createdAt: new Date('2023-01-20')
  },
  {
    id: '5',
    name: 'Minimal Classic',
    thumbnailUrl: 'https://images.pexels.com/photos/8867443/pexels-photo-8867443.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'corporate',
    isPremium: false,
    popularityScore: 79,
    createdAt: new Date('2023-02-15')
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    userId: '1',
    templateId: '1',
    title: 'Certificate of Completion',
    eventName: 'Advanced Web Development Course',
    customFields: {
      hours: '40',
      startDate: '2023-05-01',
      endDate: '2023-06-15',
      instructor: 'Dr. Emily Johnson'
    },
    createdAt: new Date('2023-06-20'),
    lastUpdated: new Date('2023-06-20')
  },
  {
    id: '2',
    userId: '1',
    templateId: '3',
    title: 'Certificate of Achievement',
    eventName: 'Digital Marketing Workshop',
    customFields: {
      hours: '16',
      date: '2023-07-10',
      location: 'Online'
    },
    createdAt: new Date('2023-07-12'),
    lastUpdated: new Date('2023-07-15')
  }
];

export const mockRecipients: Recipient[] = [
  {
    id: '1',
    certificateId: '1',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    customData: {
      grade: 'A',
      comments: 'Excellent performance throughout the course'
    },
    uniqueCode: 'CERT-SM-123456',
    sentAt: new Date('2023-06-21'),
    viewedAt: new Date('2023-06-22')
  },
  {
    id: '2',
    certificateId: '1',
    name: 'Michael Brown',
    email: 'michael@example.com',
    customData: {
      grade: 'A-',
      comments: 'Great participation and final project'
    },
    uniqueCode: 'CERT-MB-123457',
    sentAt: new Date('2023-06-21'),
    viewedAt: new Date('2023-06-23')
  },
  {
    id: '3',
    certificateId: '2',
    name: 'Jennifer Adams',
    email: 'jennifer@example.com',
    customData: {
      role: 'Team Lead',
      department: 'Marketing'
    },
    uniqueCode: 'CERT-JA-123458',
    sentAt: new Date('2023-07-16')
  }
];