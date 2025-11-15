import { useMemo } from 'react';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  return useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    };
  }, [callback, delay]);
};

export default useDebounce;
