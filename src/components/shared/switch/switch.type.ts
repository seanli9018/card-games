export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'label'> {
  label?: string;
  isOn: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}
