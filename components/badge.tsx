'use client';

import React from 'react';
import { LordIcon } from './lord-icon';

type BadgeColor = 'primary' | 'black' | 'red' | 'green' | 'blue' | 'yellow';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  icon?: string;
  className?: string;
}

export function Badge({
  children,
  color = 'primary',
  icon,
  className = '',
}: BadgeProps) {
  // Map our preset brand colors to Tailwind text & background styles (using 20% opacity)
  const colorStyles: Record<BadgeColor, string> = {
    primary: 'text-primary bg-primary/20',
    black: 'text-black bg-black/20',
    red: 'text-stateRed bg-stateRed/20',
    green: 'text-stateGreen bg-stateGreen/20',
    blue: 'text-stateBlue bg-stateBlue/20',
    yellow: 'text-stateYellow bg-stateYellow/20',
  };

  // Map our preset brand colors to their hex values for LordIcon color syncing
  const hexColors: Record<BadgeColor, string> = {
    primary: '#F98B4C',
    black: '#110D31',
    red: '#F94C4C',
    green: '#57C439',
    blue: '#4C94F9',
    yellow: '#FFD84A',
  };

  const baseStyles =
    'h-8 px-3 py-2 rounded-[100px] inline-flex justify-center items-center gap-1 font-semibold font-bricolage text-xs transition-opacity hover:opacity-90';

  return (
    <div className={`${baseStyles} ${colorStyles[color]} ${className}`}>
      {icon && (
        <LordIcon
          src={icon}
          size={20}
          colors={`primary:${hexColors[color]}`}
          target="div"
          className="shrink-0"
        />
      )}
      <span>{children}</span>
    </div>
  );
}
