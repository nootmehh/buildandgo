'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { LordIcon } from './lord-icon';

type DropdownVariant = 'white' | 'gray';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  variant?: DropdownVariant;
  placeholder?: string;
  options: (Option | string)[];
  value?: string;
  onChange?: (value: string) => void;
  iconColor?: string;
  rightIcon?: string;
  containerClassName?: string;
  className?: string;
}

export function Dropdown({
  label,
  variant = 'white',
  placeholder = 'Select option...',
  options,
  value,
  onChange,
  iconColor = 'primary:#110D31',
  rightIcon = 'https://cdn.lordicon.com/gqfozvrp.json',
  containerClassName = '',
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normalize options array
  const normalizedOptions: Option[] = useMemo(() => {
    return options.map((opt) =>
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    );
  }, [options]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset query to current selection label if query was left partially typed
        const selected = normalizedOptions.find((opt) => opt.value === value);
        setSearchQuery(selected ? selected.label : '');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, normalizedOptions]);

  // Sync searchQuery with value when value changes
  useEffect(() => {
    const selected = normalizedOptions.find((opt) => opt.value === value);
    setSearchQuery(selected ? selected.label : '');
  }, [value, normalizedOptions]);

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const filteredOptions = normalizedOptions.filter((opt) => {
    if (!searchQuery || searchQuery === (selectedOption ? selectedOption.label : '')) {
      return true;
    }
    return opt.label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (opt: Option) => {
    setSearchQuery(opt.label);
    setIsOpen(false);
    if (onChange) {
      onChange(opt.value);
    }
  };

  const variantStyles: Record<DropdownVariant, string> = {
    white: 'bg-white shadow-xs border border-white80 hover:border-white70',
    gray: 'bg-neutral-100 outline outline-1 outline-offset-[-1px] outline-white80 hover:bg-neutral-200/50',
  };

  return (
    <div ref={containerRef} className={`w-48 relative inline-flex flex-col justify-start items-start gap-1 ${containerClassName}`}>
      {label && (
        <label
          onClick={() => inputRef.current?.focus()}
          className="self-stretch justify-start text-black text-sm font-normal font-sans cursor-pointer"
        >
          {label}
        </label>
      )}

      <div
        className={`self-stretch h-10 px-3 py-2.5 rounded-[100px] inline-flex justify-start items-center gap-3 transition-all cursor-pointer focus-within:outline-1 focus-within:-outline-offset-1 focus-within:outline-primary ${variantStyles[variant]}`}
        onClick={() => setIsOpen(true)}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full bg-transparent border-none outline-none text-black/40 placeholder:text-black/40 text-sm font-semibold font-bricolage py-1 ${className}`}
        />

        {rightIcon && (
          <LordIcon
            src={rightIcon}
            size={20}
            colors={iconColor}
            target="div"
            className="shrink-0 cursor-pointer"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-white80 rounded-[16px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <ul className="max-h-48 overflow-y-auto font-bricolage text-sm text-black/40">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelectOption(opt)}
                  className={`px-3 py-2 hover:bg-black/3 cursor-pointer font-medium transition-colors ${value === opt.value ? 'bg-primary/10 hover:bg-primary/15 text-primary' : ''
                    }`}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-black/60 font-bricolage italic">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
