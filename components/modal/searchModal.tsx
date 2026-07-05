'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { LordIcon } from '../lord-icon';
import { Badge } from '../badge';
import { InputBox } from '../inputBox';

interface SearchItem {
  id: string;
  type: 'project' | 'expense' | 'report' | 'action';
  title: string;
  subtitle: string;
  badgeText: string;
  badgeColor: 'green' | 'red' | 'blue' | 'yellow' | 'primary' | 'black';
  icon: string;
  url: string;
}

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mount check for client-side hooks
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Global trigger event listeners (Cmd+K / Ctrl+K, and custom open-global-search event)
  useEffect(() => {
    if (!isMounted) return;

    function handleOpenSearch() {
      setIsOpen(true);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('open-global-search', handleOpenSearch);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-global-search', handleOpenSearch);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMounted]);

  // Click outside to close modal
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset query and selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Mock search database items
  const database: SearchItem[] = useMemo(() => [
    // Projects
    {
      id: 'p1',
      type: 'project',
      title: 'Sentosa Villa Project',
      subtitle: 'Residential • Budget $240,000 • Status: Over risk',
      badgeText: 'Project',
      badgeColor: 'red',
      icon: 'https://cdn.lordicon.com/piurhpdv.json',
      url: '/projects',
    },
    {
      id: 'p2',
      type: 'project',
      title: 'Marina Bay Office Project',
      subtitle: 'Commercial • Budget $680,000 • Status: On track',
      badgeText: 'Project',
      badgeColor: 'green',
      icon: 'https://cdn.lordicon.com/piurhpdv.json',
      url: '/projects',
    },
    {
      id: 'p3',
      type: 'project',
      title: 'Orchard Road Suite Project',
      subtitle: 'Commercial • Budget $150,000 • Status: Completed',
      badgeText: 'Project',
      badgeColor: 'blue',
      icon: 'https://cdn.lordicon.com/piurhpdv.json',
      url: '/projects',
    },
    {
      id: 'p4',
      type: 'project',
      title: 'Jurong HDB Reno Project',
      subtitle: 'Residential • Budget $84,000 • Status: On track',
      badgeText: 'Project',
      badgeColor: 'green',
      icon: 'https://cdn.lordicon.com/piurhpdv.json',
      url: '/projects',
    },
    // Expenses
    {
      id: 'e1',
      type: 'expense',
      title: 'Home Depot - Sentosa Villa',
      subtitle: 'Materials • Amount $4,280 • Date: Today',
      badgeText: 'Expense',
      badgeColor: 'primary',
      icon: 'https://cdn.lordicon.com/qfkpvtbg.json',
      url: '/expenses',
    },
    {
      id: 'e2',
      type: 'expense',
      title: 'SG Electrical - Marina Bay',
      subtitle: 'Subcontractor fee • Amount $4,280 • Date: Yesterday',
      badgeText: 'Expense',
      badgeColor: 'primary',
      icon: 'https://cdn.lordicon.com/qfkpvtbg.json',
      url: '/expenses',
    },
    {
      id: 'e3',
      type: 'expense',
      title: 'BuildMart Id - Orchard Rd',
      subtitle: 'Materials • Amount $4,280 • Date: 2 days ago',
      badgeText: 'Expense',
      badgeColor: 'primary',
      icon: 'https://cdn.lordicon.com/qfkpvtbg.json',
      url: '/expenses',
    },
    {
      id: 'e4',
      type: 'expense',
      title: 'City Council Permit - Marina Bay',
      subtitle: 'Permits • Amount $4,280 • Date: 3 days ago',
      badgeText: 'Expense',
      badgeColor: 'primary',
      icon: 'https://cdn.lordicon.com/qfkpvtbg.json',
      url: '/expenses',
    },
    {
      id: 'e5',
      type: 'expense',
      title: 'Wood & Timber Supplies - Sentosa Villa',
      subtitle: 'Materials • Amount $12,500 • Date: 4 days ago',
      badgeText: 'Expense',
      badgeColor: 'primary',
      icon: 'https://cdn.lordicon.com/qfkpvtbg.json',
      url: '/expenses',
    },
    {
      id: 'e6',
      type: 'expense',
      title: 'Steel Frames Inc - Marina Bay Office',
      subtitle: 'Materials • Amount $8,900 • Date: 5 days ago',
      badgeText: 'Expense',
      badgeColor: 'primary',
      icon: 'https://cdn.lordicon.com/qfkpvtbg.json',
      url: '/expenses',
    },
    // Reports
    {
      id: 'r1',
      type: 'report',
      title: 'Q2 Financial Audit Report',
      subtitle: 'Date: June 2026 • Format: PDF Format',
      badgeText: 'Report',
      badgeColor: 'yellow',
      icon: 'https://cdn.lordicon.com/jqqjtvlf.json',
      url: '/reports',
    },
    {
      id: 'r2',
      type: 'report',
      title: 'Sentiment Analysis Summary',
      subtitle: 'Date: May 2026 • Format: Excel Format',
      badgeText: 'Report',
      badgeColor: 'yellow',
      icon: 'https://cdn.lordicon.com/jqqjtvlf.json',
      url: '/reports',
    },
    {
      id: 'r3',
      type: 'report',
      title: 'Sentosa Villa Cost Projections',
      subtitle: 'Date: April 2026 • Format: PDF Format',
      badgeText: 'Report',
      badgeColor: 'yellow',
      icon: 'https://cdn.lordicon.com/jqqjtvlf.json',
      url: '/reports',
    },
    {
      id: 'r4',
      type: 'report',
      title: 'Orchard Rd Final Invoices',
      subtitle: 'Date: March 2026 • Format: Excel Format',
      badgeText: 'Report',
      badgeColor: 'yellow',
      icon: 'https://cdn.lordicon.com/jqqjtvlf.json',
      url: '/reports',
    },
    // Universal Actions
    {
      id: 'a1',
      type: 'action',
      title: 'Go to Dashboard Overview',
      subtitle: 'Open the main system dashboard overview panel',
      badgeText: 'Navigation',
      badgeColor: 'blue',
      icon: 'https://cdn.lordicon.com/htwehhiw.json',
      url: '/dashboard',
    },
    {
      id: 'a2',
      type: 'action',
      title: 'Ask Go AI Insight Bot',
      subtitle: 'Ask AI analytics and cost optimization ideas',
      badgeText: 'Navigation',
      badgeColor: 'blue',
      icon: 'https://cdn.lordicon.com/pkpmdwkx.json',
      url: '/ai-insight',
    },
  ], []);

  // Filter items based on user search query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      // If search is empty, show actions & projects as quick prompts
      return database.filter((item) => item.type === 'action' || item.id === 'p1' || item.id === 'p2');
    }
    const cleanQuery = query.toLowerCase().trim();
    return database.filter(
      (item) =>
        item.title.toLowerCase().includes(cleanQuery) ||
        item.subtitle.toLowerCase().includes(cleanQuery) ||
        item.badgeText.toLowerCase().includes(cleanQuery)
    );
  }, [query, database]);

  // Reset selection index if list size changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length]);

  // Keyboard navigation inside list items
  useEffect(() => {
    if (!isOpen) return;

    function handleArrows(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          const item = filteredItems[selectedIndex];
          setIsOpen(false);
          router.push(item.url);
        }
      }
    }

    document.addEventListener('keydown', handleArrows);
    return () => {
      document.removeEventListener('keydown', handleArrows);
    };
  }, [isOpen, selectedIndex, filteredItems, router]);

  if (!isMounted || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-start pt-[12vh] select-none"
      style={{ animation: 'fade-in 0.2s ease-out forwards' }}
      onClick={() => setIsOpen(false)}
    >
      {/* Blur backdrop — isolated layer so it never causes scroll repaint */}
      <div
        className="absolute inset-0 bg-white/20"
        style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-[640px] p-4 bg-white rounded-[32px] border border-white80 shadow-lg flex flex-col justify-start items-start gap-4 max-h-[500px] opacity-0 animate-fade-in-down search-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header box */}
        <div className="self-stretch inline-flex justify-between items-center gap-3 w-full opacity-0 animate-fade-in-up animation-delay-100">
          <InputBox
            variant="gray"
            placeholder="Search anything (projects, expenses, reports)..."
            leftIcon="https://cdn.lordicon.com/xaekjsls.json"
            iconColor="primary:#110D31"
            iconTrigger="hover"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            containerClassName="flex-1"
            className="w-full"
            autoFocus
          />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="size-10 px-1.5 py-1.5 rounded-xl border border-white80 bg-neutral-100 hover:bg-neutral-200 inline-flex flex-col justify-center items-center transition-colors shrink-0 cursor-pointer"
          >
            <LordIcon
              src="https://cdn.lordicon.com/xsjhqecw.json"
              size={24}
              colors="primary:#110D31"
              trigger="hover"
              target="button"
              state="hover-slide"
            />
          </button>
        </div>

        <div className="self-stretch h-px bg-white80 opacity-0 animate-fade-in-up animation-delay-150" />

        {/* Results layout panel */}
        <div className="self-stretch flex-1 overflow-y-auto flex flex-col gap-2 w-full px-0.5 max-h-[300px] opacity-0 animate-fade-in-up animation-delay-200">
          {filteredItems.length === 0 ? (
            <div className="self-stretch py-12 flex flex-col justify-center items-center gap-3">
              <LordIcon
                src="https://cdn.lordicon.com/qskvzkwm.json"
                size={100}
                trigger="hover"
                target=".search-modal-container"
                colors="primary:#b26836,secondary:#ffc738,tertiary:#242424,quaternary:#f98b4c,quinary:#ebe6ef"
              />
              <span className="text-black/50 text-sm font-semibold font-bricolage text-center">
                No matching results found for <span className="text-primary">"{query}"</span>
              </span>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    router.push(item.url);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`self-stretch px-3 py-2.5 rounded-2xl border transition-all duration-200 inline-flex justify-between items-center cursor-pointer group search-row-${item.id} opacity-0 animate-fade-in-up ${
                    idx === 0 ? 'animation-delay-250' : idx === 1 ? 'animation-delay-300' : 'animation-delay-350'
                  } ${isSelected
                    ? 'bg-linear-to-b from-white from-70% to-[#FFF8F4] border-low shadow-xs'
                    : 'bg-transparent border-transparent'
                    }`}
                >
                  <div className="inline-flex justify-start items-center gap-3 min-w-0 flex-1">
                    <div className="size-6 shrink-0 flex justify-center items-center">
                      <LordIcon
                        src={item.icon}
                        size={20}
                        colors={isSelected ? 'primary:#F98B4C' : 'primary:#110D31'}
                        trigger="hover"
                        target={`.search-row-${item.id}`}
                      />
                    </div>
                    <div className="inline-flex flex-col justify-start items-start min-w-0 flex-1">
                      <span className={`text-sm font-semibold font-bricolage truncate transition-colors duration-200 ${isSelected ? 'text-primary' : 'text-black'}`}>
                        {item.title}
                      </span>
                      <span className="text-xs font-normal font-sans truncate text-neutral-500">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex justify-end items-center gap-2 shrink-0">
                    <Badge color={item.badgeColor}>
                      {item.badgeText}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
