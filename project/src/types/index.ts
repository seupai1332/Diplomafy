export interface User {
  id: string;
  email: string;
  company_name: string;
  logo_url?: string;
  subscription_plan: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'inactive' | 'cancelled';
  role: 'user' | 'admin';
  created_at: string;
  last_login: string;
}

export interface Template {
  id: string;
  name: string;
  thumbnail_url: string;
  html_content: string;
  css_content: string;
  category: string;
  is_premium: boolean;
  popularity_score: number;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  template_id: string;
  title: string;
  event_name: string;
  description?: string;
  custom_fields: Record<string, string>;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  last_updated: string;
}

export interface Recipient {
  id: string;
  certificate_id: string;
  name: string;
  email: string;
  custom_data: Record<string, string>;
  unique_code: string;
  sent_at?: string;
  viewed_at?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  max_certificates: number;
  max_recipients: number;
  is_premium_templates: boolean;
}

export interface PaymentInfo {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  payment_method: 'pix' | 'credit_card';
  created_at: string;
  updated_at: string;
}

export interface CertificateFormData {
  title: string;
  eventName: string;
  issueDate: string;
  hours?: string;
  location?: string;
  customMessage?: string;
  signatory1?: {
    name: string;
    title: string;
    signature?: string;
  };
  signatory2?: {
    name: string;
    title: string;
    signature?: string;
  };
}