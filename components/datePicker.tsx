'use client';

import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { LordIcon } from './lord-icon';
import { IconButton } from './iconButton';

type DatePickerVariant = 'white' | 'gray';

interface DatePickerProps {
  label?: string;
  variant?: DatePickerVariant;
  placeholder?: string;
  value?: string; // Format: 'YYYY-MM-DD'
  onChange?: (date: string) => void;
  containerClassName?: string;
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker({
  label,
  variant = 'white',
  placeholder = 'Pick a date...',
  value,
  onChange,
  containerClassName = '',
  className = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, '');

  // Parse initial state or current date
  const parsedDate = value ? new Date(value) : new Date();
  const validParsed = !isNaN(parsedDate.getTime()) ? parsedDate : new Date();

  const [currentMonth, setCurrentMonth] = useState(validParsed.getMonth());
  const [currentYear, setCurrentYear] = useState(validParsed.getFullYear());

  // Close popup when clicking outside the component boundaries
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync calendar position if value changes externally
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentMonth(d.getMonth());
        setCurrentYear(d.getFullYear());
      }
    }
  }, [value]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    // Format YYYY-MM-DD
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    if (onChange) {
      onChange(formatted);
    }
    setIsOpen(false);
  };

  const formatDateDisplay = (dateString?: string) => {
    if (!dateString) return placeholder;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${monthNamesShort[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Build calendar matrix arrays
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);
  const blanks = Array(firstDayIndex).fill(null);
  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const variantStyles: Record<DatePickerVariant, string> = {
    white: 'bg-white shadow-xs border border-white80 hover:border-white70',
    gray: 'bg-neutral-100 outline outline-1 outline-offset-[-1px] outline-white80 hover:bg-neutral-200/50',
  };

  // Determine if a calendar day is the selected value
  const isSelectedDay = (day: number) => {
    if (!value) return false;
    const d = new Date(value);
    return (
      d.getDate() === day &&
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  };

  return (
    <div ref={containerRef} className={`w-48 relative inline-flex flex-col justify-start items-start gap-1 select-none ${containerClassName}`}>
      {label && (
        <span className="self-stretch justify-start text-black text-sm font-normal font-sans">
          {label}
        </span>
      )}

      {/* Date Input Toggle */}
      <div
        className={`self-stretch h-10 px-3 py-2.5 rounded-[100px] inline-flex justify-between items-center gap-3 transition-all cursor-pointer datepicker-trigger-${uniqueId} ${variantStyles[variant]}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm font-semibold font-bricolage py-1 overflow-hidden truncate ${value ? 'text-black' : 'text-black/40'}`}>
          {formatDateDisplay(value)}
        </span>
        <LordIcon
          src="https://cdn.lordicon.com/uoljexdg.json"
          size={18}
          colors="primary:#110d31"
          trigger="hover"
          target={`.datepicker-trigger-${uniqueId}`}
          className="shrink-0 cursor-pointer"
        />
      </div>

      {/* Calendar Dropdown Card */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-64 p-4 bg-white border border-white80 rounded-[24px] shadow-lg z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Header Row */}
          <div className="self-stretch inline-flex justify-between items-center w-full">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer flex justify-center items-center"
            >
              <LordIcon
                src="https://cdn.lordicon.com/hjashvmz.json" // left arrow
                size={16}
                colors="primary:#110D31"
                trigger="hover"
                state='hover-slide'
              />
            </button>
            <span className="text-primary text-sm font-bold font-bricolage text-center shrink-0">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer flex justify-center items-center"
            >
              <LordIcon
                src="https://cdn.lordicon.com/ioabdriz.json" // right arrow
                size={16}
                colors="primary:#110D31"
                trigger="hover"
                state='hover-slide'
              />
            </button>
          </div>

          <div className="self-stretch h-px bg-white80" />

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1 gap-x-1.5 w-full text-center items-center justify-center">
            {/* Weekdays Labels */}
            {WEEKDAYS.map((day) => (
              <span key={day} className="text-slate-900/40 text-[10px] lg:text-[11px] font-semibold text-center font-sans py-0.5">
                {day}
              </span>
            ))}

            {/* Calendar Days Cells */}
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="w-7 h-7" />
            ))}

            {dayNumbers.map((day) => {
              const selected = isSelectedDay(day);
              return (
                <div
                  key={day}
                  onClick={() => handleSelectDay(day)}
                  className={`w-7 h-7 rounded-full flex justify-center items-center text-xs font-semibold font-bricolage cursor-pointer transition-all duration-150 ${selected
                    ? 'bg-primary text-white scale-105 shadow-xs'
                    : 'text-black hover:bg-primary/10 hover:text-primary'
                    }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
