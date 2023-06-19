import { useEffect } from 'react';

export function useKey(key: string, action: () => void) {
  useEffect(() => {
    function callback(event: KeyboardEvent) {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [key, action]);
}
