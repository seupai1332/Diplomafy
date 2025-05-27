import { renderHook, act } from '@testing-library/react';
import { useTemplates } from '../../hooks/useTemplates';
import { supabase } from '../../lib/supabase';
import { templateCache } from '../../utils/templateCache';
import { vi } from 'vitest';

// Mock do Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
      })),
    })),
    rpc: vi.fn(),
  },
}));

// Mock do templateCache
vi.mock('../../utils/templateCache', () => ({
  templateCache: {
    getAllKeys: vi.fn(),
    getMany: vi.fn(),
    setMany: vi.fn(),
    get: vi.fn(),
    set: vi.fn(),
  },
}));

describe('useTemplates Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve iniciar com estado inicial correto', () => {
    const { result } = renderHook(() => useTemplates());

    expect(result.current.templates).toEqual([]);
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeNull();
  });

  it('deve buscar templates do cache primeiro', async () => {
    const mockTemplates = [
      { id: '1', name: 'Template 1', popularity_score: 10 },
      { id: '2', name: 'Template 2', popularity_score: 5 },
    ];

    (templateCache.getAllKeys as any).mockReturnValue(['1', '2']);
    (templateCache.getMany as any).mockReturnValue(mockTemplates);

    const { result } = renderHook(() => useTemplates());

    await act(async () => {
      await result.current.fetchTemplates();
    });

    expect(result.current.templates).toEqual(mockTemplates);
    expect(result.current.loading).toBeFalsy();
  });

  it('deve buscar templates do servidor quando não há cache', async () => {
    const mockTemplates = [
      { id: '1', name: 'Template 1', popularity_score: 10 },
      { id: '2', name: 'Template 2', popularity_score: 5 },
    ];

    (templateCache.getAllKeys as any).mockReturnValue([]);
    (supabase.from as any).mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: mockTemplates,
          error: null,
        }),
      }),
    });

    const { result } = renderHook(() => useTemplates());

    await act(async () => {
      await result.current.fetchTemplates();
    });

    expect(templateCache.setMany).toHaveBeenCalledWith(mockTemplates);
    expect(result.current.templates).toEqual(mockTemplates);
  });

  it('deve filtrar templates por categoria', async () => {
    const mockTemplates = [
      { id: '1', name: 'Template 1', category: 'educação', popularity_score: 10 },
      { id: '2', name: 'Template 2', category: 'eventos', popularity_score: 5 },
    ];

    const { result } = renderHook(() => useTemplates());

    act(() => {
      result.current.templates = mockTemplates;
    });

    const educacaoTemplates = result.current.getTemplatesByCategory('educação');
    expect(educacaoTemplates).toHaveLength(1);
    expect(educacaoTemplates[0].id).toBe('1');
  });

  it('deve atualizar popularidade do template', async () => {
    const mockTemplate = {
      id: '1',
      name: 'Template 1',
      popularity_score: 11,
    };

    (supabase.rpc as any).mockResolvedValue({ error: null });
    (templateCache.get as any).mockReturnValue(mockTemplate);

    const { result } = renderHook(() => useTemplates());

    await act(async () => {
      await result.current.updateTemplatePopularity('1');
    });

    expect(supabase.rpc).toHaveBeenCalledWith('increment_template_popularity', {
      template_id: '1',
    });
    expect(templateCache.set).toHaveBeenCalledWith('1', mockTemplate);
  });
}); 