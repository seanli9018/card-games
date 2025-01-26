import { animated as originalAnimated } from '@react-spring/web';

declare module '@react-spring/web' {
  // Extend animated components
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface AnimatedProps<T> {
    myCustomProp?: string; // Add your custom property here
  }

  type ExtendedAnimated = typeof originalAnimated & {
    div: React.ComponentType<
      React.HTMLProps<HTMLDivElement> & AnimatedProps<{ children: Element }>
    >;
  };

  export const animated: ExtendedAnimated;
}

declare module 'lodash/omit' {
  import { Omit } from 'lodash';
  export default Omit;
}

declare module '*.scss';
