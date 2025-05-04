import { renderHook, act } from '@testing-library/react';
import useOnboarding from './useOnboarding';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useOnboarding hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should start with isCompleted as false if localStorage is empty', () => {
    const { result } = renderHook(() => useOnboarding());
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.isOpen).toBe(true);
    expect(result.current.currentStep).toBe(0);
  });

  it('should start with isCompleted as true if localStorage has completion flag', () => {
    localStorage.setItem('aretrustOnboardingCompleted', 'true');
    const { result } = renderHook(() => useOnboarding());
    expect(result.current.isCompleted).toBe(true);
    expect(result.current.isOpen).toBe(false);
  });

  it('should advance to the next step correctly', () => {
    const { result } = renderHook(() => useOnboarding());
    expect(result.current.currentStep).toBe(0);
    
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.currentStep).toBe(1);
  });

  it('should go back to the previous step correctly', () => {
    const { result } = renderHook(() => useOnboarding());
    
    // First advance to step 1
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(1);
    
    // Then go back to step 0
    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(0);
  });

  it('should not go back before first step', () => {
    const { result } = renderHook(() => useOnboarding());
    expect(result.current.currentStep).toBe(0);
    
    act(() => {
      result.current.prevStep();
    });
    
    expect(result.current.currentStep).toBe(0);
  });

  it('should complete onboarding when reaching the last step and clicking next', () => {
    const { result } = renderHook(() => useOnboarding());
    const lastStepIndex = result.current.totalSteps - 1;
    
    // Advance to the last step
    for (let i = 0; i < lastStepIndex; i++) {
      act(() => {
        result.current.nextStep();
      });
    }
    
    expect(result.current.currentStep).toBe(lastStepIndex);
    
    // Click next on the last step
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.isCompleted).toBe(true);
    expect(result.current.isOpen).toBe(false);
    expect(localStorage.getItem('aretrustOnboardingCompleted')).toBe('true');
  });

  it('should skip onboarding when skipOnboarding is called', () => {
    const { result } = renderHook(() => useOnboarding());
    expect(result.current.isCompleted).toBe(false);
    
    act(() => {
      result.current.skipOnboarding();
    });
    
    expect(result.current.isCompleted).toBe(true);
    expect(result.current.isOpen).toBe(false);
    expect(localStorage.getItem('aretrustOnboardingCompleted')).toBe('true');
  });

  it('should reset onboarding when resetOnboarding is called', () => {
    localStorage.setItem('aretrustOnboardingCompleted', 'true');
    const { result } = renderHook(() => useOnboarding());
    expect(result.current.isCompleted).toBe(true);
    
    act(() => {
      result.current.resetOnboarding();
    });
    
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.currentStep).toBe(0);
    expect(localStorage.getItem('aretrustOnboardingCompleted')).toBe(null);
  });
}); 