import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
} & HTMLMotionProps<'button'>;

function Button({
  variant,
  disabled,
  fullWidth,
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={clsx(
        'flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
        {
          'bg-purple-600 text-white hover:bg-purple-700':
            variant === 'primary' && !disabled,
          'bg-white text-black hover:bg-gray-50':
            variant === 'secondary' && !disabled,
          'border-2 border-gray-300 text-gray-700 hover:border-gray-400':
            variant === 'outline' && !disabled,
          'opacity-50 cursor-not-allowed': disabled,
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </motion.button>
  );
}

export default Button;