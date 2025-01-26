import { useState, useEffect } from 'react';
import useBreakpoint from '../useBreakpoint/useBreakpoint';
import { BreakpointType } from '@/types';

const breakpointsRange = {
  xs: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], // including all breakpoints that is xs and above
  sm: ['sm', 'md', 'lg', 'xl', 'xxl'], // including all breakpoints that is sm and above
  md: ['md', 'lg', 'xl', 'xxl'], // including all breakpoints that is md and above
  lg: ['lg', 'xl', 'xxl'], //  including all breakpoints that is lg and above
  xl: ['xl', 'xxl'], // including all breakpoints that is xl and above
  xxl: ['xxl'], // including xxl
};

const useBreakpointRange = (breakpoint: BreakpointType) => {
  const [isBreakpointAndAbove, setIsBreakpointAndAbove] = useState(false);
  const currentBreakpoint = useBreakpoint();

  useEffect(() => {
    if (!currentBreakpoint) return;

    const isInRange = breakpointsRange[breakpoint].includes(currentBreakpoint);

    setIsBreakpointAndAbove(isInRange);
  }, [currentBreakpoint, breakpoint]);

  return isBreakpointAndAbove;
};

export default useBreakpointRange;
