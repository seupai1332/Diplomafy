import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltam variáveis de ambiente do Supabase. Verifique o arquivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de tabelas do Supabase
export type Tables = {
  users: {
    Row: {
      id: string;
      email: string;
      company_name: string;
      logo_url?: string;
      subscription_plan: 'free' | 'pro' | 'enterprise';
      subscription_status: 'active' | 'inactive' | 'cancelled';
      role: 'user' | 'admin';
      created_at: string;
      last_login: string;
    };
    Insert: {
      id?: string;
      email: string;
      company_name: string;
      logo_url?: string;
      subscription_plan?: 'free' | 'pro' | 'enterprise';
      subscription_status?: 'active' | 'inactive' | 'cancelled';
      role?: 'user' | 'admin';
      created_at?: string;
      last_login?: string;
    };
    Update: {
      id?: string;
      email?: string;
      company_name?: string;
      logo_url?: string;
      subscription_plan?: 'free' | 'pro' | 'enterprise';
      subscription_status?: 'active' | 'inactive' | 'cancelled';
      role?: 'user' | 'admin';
      created_at?: string;
      last_login?: string;
    };
  };
  templates: {
    Row: {
      id: string;
      name: string;
      thumbnail_url: string;
      html_content: string;
      css_content: string;
      category: string;
      is_premium: boolean;
      popularity_score: number;
      created_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      thumbnail_url: string;
      html_content: string;
      css_content: string;
      category: string;
      is_premium?: boolean;
      popularity_score?: number;
      created_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      thumbnail_url?: string;
      html_content?: string;
      css_content?: string;
      category?: string;
      is_premium?: boolean;
      popularity_score?: number;
      created_at?: string;
    };
  };
  certificates: {
    Row: {
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
    };
    Insert: {
      id?: string;
      user_id: string;
      template_id: string;
      title: string;
      event_name: string;
      description?: string;
      custom_fields?: Record<string, string>;
      status?: 'draft' | 'published' | 'archived';
      created_at?: string;
      last_updated?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      template_id?: string;
      title?: string;
      event_name?: string;
      description?: string;
      custom_fields?: Record<string, string>;
      status?: 'draft' | 'published' | 'archived';
      created_at?: string;
      last_updated?: string;
    };
  };
};

// Tipos para as tabelas do Supabase
export interface Profile {
  id: string;
  company_name: string;
  role: 'admin' | 'user';
  subscription_plan: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'inactive' | 'cancelled';
  updated_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  template_id: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Recipient {
  id: string;
  user_id: string;
  certificate_id: string;
  email: string;
  name: string;
  sent_at: string | null;
  viewed_at: string | null;
  status: 'pending' | 'sent' | 'viewed';
}

export interface Template {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  html_content: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}