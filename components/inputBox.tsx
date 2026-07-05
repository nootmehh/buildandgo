'use client';

import React, { useId } from 'react';
import { LordIcon } from './lord-icon';

type InputBoxVariant = 'white' | 'gray';

interface InputBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: InputBoxVariant;
  leftIcon?: string;
  rightIcon?: string;
  rightIconState?: string;
  rightIconDirection?: number;
  iconTrigger?: string;
  iconColor?: string;
  containerClassName?: string;
  onRightIconClick?: () => void;
}

export function InputBox({
  label,
  variant = 'white',
  leftIcon,
  rightIcon,
  rightIconState,
  rightIconDirection,
  iconTrigger,
  iconColor = 'primary:#110D31',
  placeholder = 'Search Courses',
  containerClassName = '',
  className = '',
  id,
  onRightIconClick,
  ...props
}: InputBoxProps) {
  const variantStyles: Record<InputBoxVariant, string> = {
    white: 'bg-white border border-white80 hover:border-white70',
    gray: 'bg-neutral-100 outline -outline-offset-1 outline-white80 hover:bg-neutral-200/50',
  };

  const reactId = useId();
  const uniqueId = id || reactId;

  return (
    <div className={`inline-flex flex-col justify-start items-start gap-1 ${containerClassName || 'w-48'}`}>
      {label && (
        <label
          htmlFor={uniqueId}
          className="self-stretch justify-start text-black text-sm font-normal font-sans"
        >
          {label}
        </label>
      )}
      <div
        className={`self-stretch h-10 px-3 py-2.5 rounded-[100px] inline-flex justify-start items-center gap-3 transition-all focus-within:outline-1 focus-within:-outline-offset-1 focus-within:outline-primary ${variantStyles[variant]}`}
      >
        {leftIcon && (
          <LordIcon
            src={leftIcon}
            size={20}
            colors={iconColor}
            target="div"
            trigger={iconTrigger}
            className="shrink-0"
          />
        )}
        <input
          id={uniqueId}
          placeholder={placeholder}
          className={`w-full bg-transparent border-none outline-none text-black placeholder:text-black/40 text-sm font-semibold font-bricolage py-1 ${className}`}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="shrink-0 cursor-pointer focus:outline-none flex justify-center items-center"
            aria-label="Toggle input visibility"
          >
            <LordIcon
              src={rightIcon}
              size={20}
              colors={iconColor}
              trigger={iconTrigger}
              target="button"
              state={rightIconState}
              direction={rightIconDirection}
            />
          </button>
        )}
      </div>
    </div>
  );
}
