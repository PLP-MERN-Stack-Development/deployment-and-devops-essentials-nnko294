import { useState, useEffect } from 'react';

/**
 * Generic hook to persist state to localStorage
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value or lazy initializer function
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (err) {
      console.error('useLocalStorage: read error', err);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error('useLocalStorage: write error', err);
    }
  }, [key, state]);

  return [state, setState];
}
