import { useEffect, useRef, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const timer = useRef<NodeJS.Timeout>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timer?.current) clearTimeout(timer.current);
    };
  }, [value, delay]);

  return debouncedValue;
}