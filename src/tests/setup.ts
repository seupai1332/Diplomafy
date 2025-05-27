import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock do navigator.onLine
Object.defineProperty(window, 'navigator', {
  value: {
    onLine: true,
  },
  writable: true,
}) 