import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { themeStore } from '../stores/theme';

// Mock browser environment
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(global, 'document', {
  value: {
    documentElement: {
      setAttribute: vi.fn(),
    },
  },
  writable: true,
});

describe('Theme Store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with dark theme', () => {
    expect(get(themeStore)).toBe('dark');
  });

  it('should toggle between light and dark themes', () => {
    themeStore.toggle();
    expect(get(themeStore)).toBe('light');
    
    themeStore.toggle();
    expect(get(themeStore)).toBe('dark');
  });
});