'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar';
import { Button } from '../../components/button';
import { LordIcon } from '../../components/lord-icon';
import { InputBox } from '../../components/inputBox';
import { IconButton } from '../../components/iconButton';
import { NotificationModal } from '../../components/modal/notificationModal';
import { Badge } from '../../components/badge';

export default function AIInsightPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Go AI',
      time: '10:30 AM',
      text: "Hello Tora! I've completed the real-time budget review for your active projects. Sentosa Villa requires immediate action due to a labor cost overrun. How can I assist you with this analysis?",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebarModal, setShowSidebarModal] = useState(false);

  const handleSend = () => {
    if (!chatInput.trim()) return;

    // Add user message
    const newMsgs = [
      ...chatMessages,
      {
        sender: 'Tora',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: chatInput,
      },
    ];
    setChatMessages(newMsgs);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'Go AI',
          time: 'Just now',
          text: "I'm analyzing that query for you. It looks like 'Marina Bay Sands' currently holds the highest projected profit margin at 25.3% due to optimized material sourcing.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full p-6 bg-white90 flex flex-col lg:flex-row justify-start items-start gap-6 min-h-screen font-sans animate-fade-in">
      {/* Left Column: Sidebar Navigation (Hidden under 1024px, shown as modal instead) */}
      <Sidebar activeMenu="ai-insight" className="hidden lg:flex lg:sticky lg:top-6 h-[calc(100vh-48px)] shrink-0 lg:w-64" />

      {/* Middle Column: GO AI Insight panel Content */}
      <div className="flex-1 flex flex-col justify-start items-start gap-6 min-w-0 w-full">

        {/* Header Row */}
        <div className="self-stretch inline-flex justify-start items-center gap-3 relative z-30">
          {/* Sidebar Trigger Button (visible only under 1024px) */}
          <IconButton
            variant="white"
            icon="https://cdn.lordicon.com/tewlfgbl.json"
            state="hover"
            iconColor="primary:#110d31"
            className="rounded-xl border border-white80 shrink-0 lg:hidden"
            onClick={() => setShowSidebarModal(true)}
          />

          <div className="relative notifications-trigger-group">
            <IconButton
              variant="white"
              icon="https://cdn.lordicon.com/ahxaipjb.json"
              state="hover"
              target=".notifications-trigger-group"
              iconColor="primary:#110D31"
              className="rounded-xl border border-white80 shrink-0"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="absolute left-0 mt-2 z-50">
                <NotificationModal onClose={() => setShowNotifications(false)} />
              </div>
            )}
          </div>
          <InputBox
            variant="white"
            placeholder="Search Anything"
            leftIcon="https://cdn.lordicon.com/xaekjsls.json"
            iconColor="primary:#110D31"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            containerClassName="w-96 cursor-pointer"
            className="w-full cursor-pointer"
            onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
            readOnly
          />
        </div>

        {/* Title Row */}
        <div className="inline-flex justify-start items-end gap-3 ai-title-row opacity-0 animate-fade-in-down animation-delay-100">
          <h1 className="text-black text-3xl font-bold font-bricolage">Go AI Insight</h1>
          <div className="size-10 flex justify-center items-center shrink-0">
            <LordIcon
              src="https://cdn.lordicon.com/cuywyxhb.json"
              size={40}
              trigger="hover"
              target=".ai-title-row"
            />
          </div>
        </div>

        {/* AI Insight Breakdown Cards */}
        <div className="self-stretch inline-flex justify-start items-stretch gap-6 flex-wrap lg:flex-nowrap">
          {/* Card 1: Sentosa Villa (Over risk gradient card) */}
          <div className="flex-1 p-6 bg-linear-to-b from-white from-85% to-red-50 rounded-[32px] border border-orange-200 hover:border-primary transition-all duration-300 flex flex-col justify-start items-start gap-4 min-w-[320px] opacity-0 animate-fade-in-up animation-delay-150 risk-card-container">
            <div className="self-stretch px-3 py-2.5 bg-white90 rounded-3xl border border-white80 hover:bg-white80 hover:border-white70 transition-all duration-300 inline-flex justify-between items-center">
              <div className="justify-start">
                <span className="text-black text-sm font-normal font-sans">Budget used for </span>
                <span className="text-black text-sm font-semibold font-bricolage">Sentosa Villa</span>
              </div>
              <Badge
                color="red"
                icon="https://cdn.lordicon.com/juujmrhr.json"
              >
                Over risk
              </Badge>
            </div>

            <div className="self-stretch h-16 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-orange-400 text-3xl font-bold font-bricolage">$124,200</div>
              <div className="self-stretch inline-flex justify-between items-center">
                <span className="justify-start text-black/60 text-sm font-normal font-sans">Budgeted $140,000</span>
                <span className="justify-start text-black/60 text-sm font-normal font-sans">87.2%</span>
              </div>
            </div>

            {/* Custom Responsive Progress Bar */}
            <div className="self-stretch h-1.5 bg-gray-200 rounded-[100px] overflow-hidden relative">
              <div className="h-full bg-stateRed rounded-[100px]" style={{ width: '87.2%' }}></div>
            </div>

            <div className="self-stretch h-px bg-white80"></div>

            <p className="self-stretch justify-start text-black/60 text-sm font-normal font-sans leading-relaxed">
              Based on current spend velocity, this project will exceed its{' '}
              <span className="text-black/60 text-sm font-semibold font-bricolage">$140,000</span>{' '}
              budget by approximately{' '}
              <span className="text-black/60 text-sm font-semibold font-bricolage">$15,800</span>{' '}
              within 3 weeks. Labour costs are the primary driver (+28% vs plan).
            </p>

            <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch inline-flex justify-start items-center gap-1 recommendation-label-row">
                <LordIcon
                  src="https://cdn.lordicon.com/pkpmdwkx.json"
                  size={16}
                  colors="primary:#110D31"
                  trigger="hover"
                  target=".recommendation-label-row"
                />
                <span className="justify-start text-black text-sm font-normal font-sans">Recommendation:</span>
              </div>
              <div className="self-stretch px-3 py-2.5 bg-white90 rounded-2xl border border-white80 hover:bg-white80 hover:border-white70 transition-all duration-300 inline-flex justify-between items-center">
                <span className="flex-1 justify-start text-black/60 text-sm font-normal font-sans text-left">
                  Renegotiate tiling subcontract, Review daily site labour
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Marina Bay Office (On Track card) */}
          <div className="flex-1 p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-4 min-w-[320px] opacity-0 animate-fade-in-up animation-delay-200 track-card-container">
            <div className="self-stretch px-3 py-2.5 bg-white90 rounded-3xl border border-white80 hover:bg-white80 hover:border-white70 transition-all duration-300 inline-flex justify-between items-center">
              <div className="justify-start">
                <span className="text-black text-sm font-normal font-sans">Budget used for </span>
                <span className="text-black text-sm font-semibold font-bricolage">Marina Bay Office</span>
              </div>
              <Badge
                color="green"
                icon="https://cdn.lordicon.com/uvofdfal.json"
              >
                On Track
              </Badge>
            </div>

            <div className="self-stretch h-16 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-orange-400 text-3xl font-bold font-bricolage">$86,500</div>
              <div className="self-stretch inline-flex justify-between items-center">
                <span className="justify-start text-black/60 text-sm font-normal font-sans">Budgeted $170,000</span>
                <span className="justify-start text-black/60 text-sm font-normal font-sans">48%</span>
              </div>
            </div>

            {/* Custom Responsive Progress Bar */}
            <div className="self-stretch h-1.5 bg-gray-200 rounded-[100px] overflow-hidden relative">
              <div className="h-full bg-lime-600 rounded-[100px]" style={{ width: '48%' }}></div>
            </div>

            <div className="self-stretch h-px bg-white80"></div>

            <p className="self-stretch justify-start text-black/60 text-sm font-normal font-sans leading-relaxed">
              Marina Bay is tracking 6% under budget with 52% remaining. This creates a{' '}
              <span className="text-black/60 text-sm font-semibold font-bricolage">$38K margin</span>{' '}
              opportunity if current cost discipline is maintained through fit-out phase.
            </p>

            <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch inline-flex justify-start items-center gap-1 action-label-row">
                <LordIcon
                  src="https://cdn.lordicon.com/pkpmdwkx.json"
                  size={16}
                  colors="primary:#110D31"
                  trigger="hover"
                  target=".action-label-row"
                />
                <span className="justify-start text-black text-sm font-normal font-sans">Action:</span>
              </div>
              <div className="self-stretch px-3 py-2.5 bg-white90 rounded-2xl border border-white80 hover:bg-white80 hover:border-white70 transition-all duration-300 inline-flex justify-between items-center">
                <span className="flex-1 justify-start text-black/60 text-sm font-normal font-sans text-left">
                  Maintain current procurement pace · Lock in FF&E pricing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversational Interface Panel */}
        <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-4 w-full chat-interface-panel opacity-0 animate-fade-in-up animation-delay-250">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <LordIcon
              src="https://cdn.lordicon.com/rhovcpjk.json"
              size={20}
              colors="primary:#f98b4c"
              trigger="loop"
              state="loop-line"
            />
            <span className="text-black text-base font-semibold font-bricolage">Ask Go AI</span>
          </div>

          <div className="self-stretch h-px bg-white80"></div>

          {/* Conversation history block */}
          <div className="self-stretch flex flex-col justify-start items-start gap-4 max-h-[300px] overflow-y-auto pr-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[480px] flex flex-col justify-start items-start gap-1 ${msg.sender === 'Tora' ? 'self-end items-end' : ''
                  }`}
              >
                <div className={`px-4 py-2.5 rounded-2xl border border-neutral-200 inline-flex justify-start items-center gap-3 ${msg.sender === 'Tora' ? 'bg-primary text-white' : 'bg-neutral-100 text-black'
                  }`}>
                  <span className="text-sm font-normal font-sans leading-relaxed">
                    {msg.text.includes('Tora') ? (
                      <>
                        {msg.text.split('Tora')[0]}
                        <span className="font-semibold font-bricolage text-black">Tora</span>
                        {msg.text.split('Tora')[1]}
                      </>
                    ) : (
                      msg.text
                    )}
                  </span>
                </div>

                <span className="text-black/60 text-xs font-semibold font-bricolage">
                  {msg.sender} <span className="font-normal font-sans">· {msg.time}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="self-stretch h-px bg-white80"></div>

          {/* Input control block */}
          <div className="self-stretch inline-flex justify-start items-center gap-3 w-full">
            <InputBox
              variant="gray"
              placeholder="Ask anything.. e.g. Which project has the best margin?"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              containerClassName="flex-1"
              className="w-full"
            />
            <Button
              variant="default"
              size="default"
              rightIcon="https://cdn.lordicon.com/jarmuava.json"
              iconTrigger="hover"
              rightIconState='hover-slide'
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar Modal (visible under 1024px to 720px when open) */}
      {showSidebarModal && (
        <div 
          className="fixed inset-0 z-50 flex justify-start items-stretch select-none"
          onClick={() => setShowSidebarModal(false)}
        >
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-white/20"
            style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
          />

          {/* Sidebar Drawer Container */}
          <div
            className="relative h-screen bg-transparent p-6 shrink-0 z-10 flex flex-col justify-start items-start animate-fade-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar activeMenu="ai-insight" className="h-[calc(100vh-48px)] w-64 shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
