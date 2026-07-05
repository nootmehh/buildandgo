'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '../button';
import { LordIcon } from '../lord-icon';
import { Badge } from '../badge';
import { IconButton } from '../iconButton';

interface NotificationModalProps {
  onClose: () => void;
}

export function NotificationModal({ onClose }: NotificationModalProps) {
  const [activeTab, setActiveTab] = useState<'unread' | 'all'>('unread');
  const modalRef = useRef<HTMLDivElement>(null);

  // Click outside hook listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const notifications = [
    {
      id: 1,
      isUnread: false,
      icon: 'https://cdn.lordicon.com/juujmrhr.json', // warning alert icon
      boldText: 'Budget Overrun Risk, ',
      accentText: 'Sentosa Villa',
      desc: 'Projected to exceed budget by ',
      boldDesc: '$34,400',
      normalDesc: ' in ~3 weeks. Labour costs are the primary driver. ',
      time: 'Just now.',
    },
    {
      id: 2,
      isUnread: false,
      icon: 'https://cdn.lordicon.com/skvwpjvd.json', // receipt checklist icon
      boldText: '12 Receipts',
      accentText: ' Need Reconciliation',
      desc: 'Jurong HDB Reno has unassigned expenses totalling $8,420 older than 7 days. ',
      time: '5 hours ago',
    },
  ];

  const displayedNotifications = activeTab === 'unread'
    ? notifications.filter(n => n.isUnread)
    : notifications;

  return (
    <div
      ref={modalRef}
      className="w-[460px] p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-center items-end gap-4 shadow-md select-none notifications-modal-container opacity-0 animate-fade-in-down"
    >
      {/* Header element */}
      <div className="self-stretch inline-flex justify-start items-center gap-4 opacity-0 animate-fade-in-up animation-delay-100">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-2 notifications-title-row">
              <LordIcon
                src="https://cdn.lordicon.com/ahxaipjb.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".notifications-title-row"
              />
              <span className="justify-start text-black text-xl font-semibold font-bricolage">
                Notifications
              </span>
            </div>
            <Badge color="primary">
              {notifications.filter(n => n.isUnread).length} New
            </Badge>
          </div>
        </div>
        <IconButton
          variant="gray"
          icon="https://cdn.lordicon.com/xsjhqecw.json"
          iconColor="primary:#110D31"
          onClick={onClose}
          state="hover-slide"
          className="rounded-xl border border-neutral-200 shrink-0"
        />
      </div>

      <div className="self-stretch h-px bg-neutral-200 opacity-0 animate-fade-in-up animation-delay-150"></div>

      {/* Tabs */}
      <div className="self-stretch inline-flex justify-start items-center gap-4 opacity-0 animate-fade-in-up animation-delay-200">
        <Button
          variant={activeTab === 'unread' ? 'default' : 'outline'}
          size="default"
          onClick={() => setActiveTab('unread')}
          className="flex-1 justify-center font-bricolage font-semibold rounded-[100px]"
        >
          Unread Notification
        </Button>
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          size="default"
          onClick={() => setActiveTab('all')}
          className="flex-1 justify-center font-bricolage font-semibold rounded-[100px]"
        >
          All Notification
        </Button>
      </div>

      {/* Notification items */}
      <div className="self-stretch flex flex-col justify-start items-center gap-3 w-full h-[192px] mb-3">
        {displayedNotifications.length === 0 ? (
          <div className="self-stretch flex-1 flex flex-col justify-center items-center gap-2 w-full opacity-0 animate-fade-in-up animation-delay-250">
            <LordIcon
              src="https://cdn.lordicon.com/nzwkwnsr.json"
              size={100}
              trigger="hover"
              target=".notifications-modal-container"
              colors="primary:#f9c9c0,secondary:#545454,tertiary:#b26836,quaternary:#e8e230,quinary:#f98b4c,senary:#5c230a,septenary:#ebe6ef"
            />
            <span className="text-black/60 text-sm font-semibold font-bricolage text-center">
              All of the <span className='text-primary'>notifications</span> has <br></br>been read
            </span>
          </div>
        ) : (
          displayedNotifications.map((n, idx) => (
            <div
              key={n.id}
              className={`self-stretch px-3 py-2.5 bg-neutral-100 hover:bg-white hover:shadow-xs rounded-2xl border border-neutral-200 transition-all duration-200 inline-flex justify-start items-center gap-3 notifications-row-${n.id} opacity-0 animate-fade-in-up ${
                idx === 0 ? 'animation-delay-250' : 'animation-delay-300'
              }`}
            >
              <div className="size-5 shrink-0 flex justify-center items-center">
                <LordIcon
                  src="https://cdn.lordicon.com/juujmrhr.json"
                  size={20}
                  colors="primary:#EF4444"
                  trigger="hover"
                  target={`.notifications-row-${n.id}`}
                />
              </div>

              <div className="flex-1 inline-flex flex-col justify-start items-start">
                <div className="self-stretch justify-start">
                  {n.id === 1 ? (
                    <>
                      <span className="text-black text-sm font-semibold font-bricolage">
                        {n.boldText}
                      </span>
                      <span className="text-primary text-sm font-semibold font-bricolage">
                        {n.accentText}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-primary text-sm font-semibold font-bricolage">
                        {n.boldText}
                      </span>
                      <span className="text-black text-sm font-semibold font-bricolage">
                        {n.accentText}
                      </span>
                    </>
                  )}
                </div>

                <div className="self-stretch justify-start leading-relaxed text-left">
                  <span className="text-black/60 text-xs font-normal font-sans">
                    {n.desc}
                  </span>
                  {n.boldDesc && (
                    <span className="text-black/60 text-xs font-semibold font-bricolage">
                      {n.boldDesc}
                    </span>
                  )}
                  {n.normalDesc && (
                    <span className="text-black/60 text-xs font-normal font-sans">
                      {n.normalDesc}
                    </span>
                  )}
                  <span className="text-black/60 text-xs font-semibold font-bricolage">
                    {n.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="self-stretch h-px bg-neutral-200 opacity-0 animate-fade-in-up animation-delay-350"></div>

      {/* Redirect link to Go AI Insight */}
      <Link href="/ai-insight" className="w-full opacity-0 animate-fade-in-up animation-delay-400">
        <Button
          variant="ghost-black"
          size="default"
          rightIcon="https://cdn.lordicon.com/jarmuava.json"
          iconTrigger="hover"
          rightIconState='hover-slide'
          className="self-stretch justify-center w-full"
        >
          View All Alert in Go AI Insight
        </Button>
      </Link>
    </div>
  );
}
