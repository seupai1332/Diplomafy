import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { vi } from 'vitest';

// Mock do Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  },
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve iniciar com estado inicial correto', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBeTruthy();
    expect(result.current.isAdmin).toBeFalsy();
  });

  it('deve realizar login com sucesso', async () => {
    const mockUser = {
      id: '123',
      email: 'teste@exemplo.com',
    };

    (supabase.auth.signInWithPassword as any).mockResolvedValueOnce({
      data: { user: mockUser },
      error: null,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.signIn('teste@exemplo.com', 'senha123');
    });

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'teste@exemplo.com',
      password: 'senha123',
    });
  });

  it('deve realizar logout com sucesso', async () => {
    (supabase.auth.signOut as any).mockResolvedValueOnce({
      error: null,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it('deve verificar status de admin corretamente', async () => {
    const mockUser = {
      id: '123',
      email: 'admin@exemplo.com',
    };

    (supabase.from as any).mockReturnValueOnce({
      select: vi.fn().mockReturnValueOnce({
        eq: vi.fn().mockReturnValueOnce({
          single: vi.fn().mockResolvedValueOnce({
            data: { role: 'admin' },
            error: null,
          }),
        }),
      }),
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.checkAdminStatus(mockUser.id);
    });

    expect(result.current.isAdmin).toBeTruthy();
  });
}); 