'use client';

import React from 'react';
import { LordIcon } from './lord-icon';

type ButtonVariant = 'default' | 'outline' | 'ghost-black' | 'ghost-white' | 'gray' | 'white';
type ButtonSize = 'default' | 'small';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: string;
  leftIconState?: string;
  rightIcon?: string;
  rightIconState?: string;
  iconColor?: string;
  iconTrigger?: string;
}

export function Button({
  variant = 'default',
  size = 'default',
  leftIcon,
  leftIconState,
  rightIcon,
  rightIconState,
  iconColor,
  iconTrigger,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Styles for variations mapped to our Tailwind v4 custom colors
  const variantStyles: Record<ButtonVariant, string> = {
    default: 'bg-primary hover:bg-primary/90 outline-low outline outline-1 outline-offset-[-1px] text-white hover:bg-opacity-90',
    outline: 'border border-primary text-primary hover:bg-primary/5',
    'ghost-black': 'text-black hover:bg-black/5',
    'ghost-white': 'text-white hover:bg-white/10',
    gray: 'bg-neutral-100 outline outline-1 outline-offset-[-1px] outline-black/40 text-black hover:bg-neutral-200',
    white: 'bg-white outline outline-1 outline-offset-[-1px] outline-white80 text-black hover:bg-white90',
  };

  // Color mapping for LordIcon elements based on variant
  const iconColorMap: Record<ButtonVariant, string> = {
    default: 'primary:#ffffff',
    outline: 'primary:#f98b4c',
    'ghost-black': 'primary:#110D31',
    'ghost-white': 'primary:#ffffff',
    gray: 'primary:#110D31',
    white: 'primary:#110D31',
  };

  // Size configurations
  const sizeStyles: Record<ButtonSize, string> = {
    default: 'h-10 px-4 py-2.5 text-sm gap-1.5',
    small: 'h-7 px-3 text-xs gap-1.5',
  };

  const iconSizes: Record<ButtonSize, number> = {
    default: 20,
    small: 16,
  };

  const baseStyles =
    'inline-flex justify-center items-center font-semibold font-bricolage rounded-[100px] transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {leftIcon && (
        <LordIcon
          src={leftIcon}
          size={iconSizes[size]}
          colors={iconColor || iconColorMap[variant]}
          target="button"
          trigger={iconTrigger}
          state={leftIconState}
        />
      )}
      <span>{children}</span>
      {rightIcon && (
        <LordIcon
          src={rightIcon}
          size={iconSizes[size]}
          colors={iconColor || iconColorMap[variant]}
          target="button"
          trigger={iconTrigger}
          state={rightIconState}
        />
      )}
    </button>
  );
}
