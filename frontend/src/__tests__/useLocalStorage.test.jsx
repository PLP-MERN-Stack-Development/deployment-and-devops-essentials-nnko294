import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const KEY = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with provided initial value', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, ['a']));
    expect(result.current[0]).toEqual(['a']);
  });

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, []));
    act(() => result.current[1](['x', 'y']));
    expect(JSON.parse(localStorage.getItem(KEY))).toEqual(['x', 'y']);
  });
});
