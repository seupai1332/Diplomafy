import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { PaymentInfo, SubscriptionPlan } from '../types';
import { useAuth } from './useAuth';

export function usePayments() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price');

      if (error) throw error;
      return data as SubscriptionPlan[];
    } catch (err) {
      setError('Erro ao carregar planos');
      console.error('Erro ao carregar planos:', err);
      return [];
    }
  };

  const createPayment = async (planId: string) => {
    try {
      setLoading(true);
      const { data: plan } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', planId)
        .single();

      if (!plan) throw new Error('Plano não encontrado');

      const paymentData = {
        user_id: user?.id,
        plan_id: planId,
        amount: plan.price,
        status: 'pending',
        payment_method: 'pix',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('payments')
        .insert([paymentData])
        .select()
        .single();

      if (error) throw error;
      return data as PaymentInfo;
    } catch (err) {
      setError('Erro ao criar pagamento');
      console.error('Erro ao criar pagamento:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generatePixQRCode = async (paymentId: string) => {
    try {
      setLoading(true);
      // Aqui você implementaria a integração com sua API de pagamentos
      // Por enquanto, vamos simular um QR Code
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (!payment) throw new Error('Pagamento não encontrado');

      // Simular geração de QR Code
      const qrCodeData = {
        payment_id: paymentId,
        amount: payment.amount,
        pix_key: process.env.REACT_APP_PIX_KEY,
        description: `Diplomafy - Upgrade de Plano`,
      };

      return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(qrCodeData))}`;
    } catch (err) {
      setError('Erro ao gerar QR Code');
      console.error('Erro ao gerar QR Code:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId: string) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (error) throw error;
      return data as PaymentInfo;
    } catch (err) {
      setError('Erro ao verificar status do pagamento');
      console.error('Erro ao verificar status do pagamento:', err);
      throw err;
    }
  };

  const getUserPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PaymentInfo[];
    } catch (err) {
      setError('Erro ao carregar histórico de pagamentos');
      console.error('Erro ao carregar histórico de pagamentos:', err);
      return [];
    }
  };

  return {
    loading,
    error,
    getPlans,
    createPayment,
    generatePixQRCode,
    checkPaymentStatus,
    getUserPayments,
  };
} 