export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
  popularity_score: number;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  template_id: string;
  recipient_name: string;
  recipient_email: string;
  issue_date: string;
  expiry_date?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'issued' | 'revoked';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
} 