import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0, // Extra Small
  sm: 640, // Small
  md: 768, // Medium
  lg: 1024, // Large
  xl: 1280, // Extra Large
  xxl: 1536, // Extra Extra Large
};

const getBreakpoint = (width: number) => {
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() => {
    if (typeof window !== 'undefined') {
      return getBreakpoint(window.innerWidth);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        // Safe to use window here
        const breakpoint = getBreakpoint(window.innerWidth);
        setBreakpoint(breakpoint);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
