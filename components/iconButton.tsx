'use client';

import React from 'react';
import { LordIcon } from './lord-icon';

type IconButtonVariant = 'white' | 'gray';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  icon: string;
  iconColor?: string;
  trigger?: string;
  state?: string;
  target?: string;
}

export function IconButton({
  variant = 'white',
  icon,
  iconColor = 'primary:#110D31',
  trigger = 'hover',
  state,
  target = 'button',
  className = '',
  ...props
}: IconButtonProps) {
  // Styles for the icon button wrapper based on figma designs
  const variantStyles: Record<IconButtonVariant, string> = {
    white: 'bg-white outline-white80 hover:bg-white90',
    gray: 'bg-neutral-100 outline-white80 hover:bg-neutral-200',
  };

  const baseStyles =
    'size-10 px-1.5 py-1.5 rounded-xl outline outline-1 outline-offset-[-1px] inline-flex flex-col justify-center items-center gap-1.5 transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <LordIcon
        src={icon}
        size={24}
        colors={iconColor}
        trigger={trigger}
        target={target}
        state={state}
      />
    </button>
  );
}
