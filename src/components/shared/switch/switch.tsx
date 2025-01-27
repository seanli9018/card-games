import clsx from 'clsx';
import type { SwitchProps } from './switch.type';

export default function Switch({
  label,
  isOn,
  disabled = false,
  onToggle,
  ...restProps
}: SwitchProps) {
  const switchContainerStyles = clsx(
    'flex items-center space-x-2',
    restProps.className
  );
  return (
    <div className={switchContainerStyles}>
      {label && (
        <span
          className={`text-sm font-medium ${disabled ? 'text-gray-400' : ''}`}
        >
          {label}
        </span>
      )}
      <button
        onClick={!disabled ? onToggle : undefined}
        disabled={disabled}
        className={`relative inline-flex items-center h-6 w-11 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isOn && !disabled
            ? 'bg-sky-500'
            : isOn && disabled
              ? 'bg-gray-500'
              : 'bg-gray-300'
        }`}
        aria-checked={isOn}
        aria-disabled={disabled}
        role="switch"
      >
        <span
          className={`transition-transform duration-200 transform ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 bg-white rounded-full ${disabled ? 'bg-gray-200' : ''}`}
        />
      </button>
    </div>
  );
}
