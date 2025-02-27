export type VariantType = 'primary' | 'secondary' | 'tertiary';
export type ShapeType = 'rectangle' | 'round';
export type SizeType = 'small' | 'regular' | 'large';
export type WidthType = 'content' | 'layout';
export type Color = 'regular' | 'monochromatic';
export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type AbsolutePositionType = 'left' | 'center' | 'right';
export type NotificationVariantType = 'info' | 'warn' | 'error';
export type DirectionType = 'horizontal' | 'vertical';
export type revealMode = 'single' | 'multiple';
export type shuffleMode = 'fisherYates' | 'oneLiner' | 'none';

export type UserType = {
  username: string;
  email: string;
  role: string;
  profile_picture: string;
};
