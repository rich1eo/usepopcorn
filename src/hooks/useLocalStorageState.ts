import { useEffect, useState } from 'react';

export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return initialState;
    return JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
