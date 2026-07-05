'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar';
import { Button } from '../../components/button';
import { LordIcon } from '../../components/lord-icon';
import { InputBox } from '../../components/inputBox';
import { IconButton } from '../../components/iconButton';
import { NotificationModal } from '../../components/modal/notificationModal';

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebarModal, setShowSidebarModal] = useState(false);

  // Mock list of recent reports from the user's template
  const recentReports = [
    {
      title: 'P&L June 2026',
      date: 'Generated 18 Jun 2026',
      icon: 'https://cdn.lordicon.com/lrzdmsmx.json', // document icon
    },
    {
      title: 'Cash Flow June 2026',
      date: 'Generated 12 Jun 2026',
      icon: 'https://cdn.lordicon.com/tzynxkwl.json', // chart column icon
    },
    {
      title: 'Expense Summary June 2026',
      date: 'Generated 7 Jun 2026',
      icon: 'https://cdn.lordicon.com/qfkpvtbg.json', // calculator/coins icon
    },
    {
      title: 'Project Completion Report June 2026',
      date: 'Generated 4 Jun 2026',
      icon: 'https://cdn.lordicon.com/piurhpdv.json', // folders icon
    },
  ];

  return (
    <div className="w-full p-6 bg-white90 flex flex-col lg:flex-row justify-start items-start gap-6 min-h-screen font-sans animate-fade-in">
      {/* Left Column: Sidebar Navigation (Hidden under 1024px, shown as modal instead) */}
      <Sidebar activeMenu="reports" className="hidden lg:flex lg:sticky lg:top-6 h-[calc(100vh-48px)] shrink-0 lg:w-64" />

      {/* Middle Column: Reports panel Content */}
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
        <div className="inline-flex justify-start items-end gap-3 reports-title-row opacity-0 animate-fade-in-down animation-delay-100">
          <h1 className="text-black text-3xl font-bold font-bricolage">Generate Report That Suits You</h1>
          <div className="size-10 flex justify-center items-center shrink-0">
            <LordIcon
              src="https://cdn.lordicon.com/kjxlfdsb.json"
              size={40}
              trigger="hover"
              colors="primary:#ebe6ef,secondary:#f98b4c"
              target=".reports-title-row"
            />
          </div>
        </div>

        {/* Report Generation Option Cards */}
        <div className="self-stretch grid grid-cols-2 xl:grid-cols-4 gap-3">
          {/* Card 1: Profit & Loss Statement (Highlighted Brand Gradient) */}
          <div className="p-6 bg-linear-to-b from-white from-85% to-red-50 rounded-[32px] border border-orange-200 hover:border-primary transition-all duration-300 flex flex-col justify-between items-start gap-4 xl:gap-4 min-h-[180px] xl:min-h-[280px] opacity-0 animate-fade-in-up animation-delay-150 report-option-card-1">
            <LordIcon
              src="https://cdn.lordicon.com/gqjrlxao.json"
              size={80}
              colors="primary:#ffc738,secondary:#f98b4c,tertiary:#ffffff"
              trigger="loop-on-hover"
              target=".report-option-card-1"
            />
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <h3 className="self-stretch text-black text-base font-semibold font-bricolage">Profit & Loss Statement</h3>
              <p className="self-stretch text-black/60 text-sm font-normal font-sans">Full P&L breakdown by project, category, and period.</p>
            </div>
            <div className="self-stretch h-px bg-white80"></div>
            <Button
              variant="default"
              size="default"
              rightIcon="https://cdn.lordicon.com/yvvjqzpc.json"
              iconTrigger="hover"
              className="w-full justify-center"
            >
              Generate PDF
            </Button>
          </div>

          {/* Card 2: Cash Flow Forecast */}
          <div className="p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-between items-start gap-4 xl:gap-4 min-h-[220px] xl:min-h-[320px] opacity-0 animate-fade-in-up animation-delay-200 report-option-card-2">
            <LordIcon
              src="https://cdn.lordicon.com/dgcirmtx.json"
              size={80}
              colors="primary:#2ca58d,secondary:#f98b4c,tertiary:#ebe6ef"
              trigger="loop-on-hover"
              state='hover-slide'
              target=".report-option-card-2"
            />
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <h3 className="self-stretch text-black text-base font-semibold font-bricolage">Cash Flow Forecast</h3>
              <p className="self-stretch text-black/60 text-sm font-normal font-sans">30/60/90-day cash flow projection based on current commitments.</p>
            </div>
            <div className="self-stretch h-px bg-white80"></div>
            <Button
              variant="outline"
              size="default"
              rightIcon="https://cdn.lordicon.com/yvvjqzpc.json"
              iconTrigger="hover"
              className="w-full justify-center"
            >
              Generate PDF
            </Button>
          </div>

          {/* Card 3: Expense Summary */}
          <div className="p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-between items-start gap-4 xl:gap-4 min-h-[220px] xl:min-h-[320px] opacity-0 animate-fade-in-up animation-delay-250 report-option-card-3">
            <LordIcon
              src="https://cdn.lordicon.com/wtewdzdl.json"
              size={80}
              colors="primary:#f9c9c0,secondary:#f98b4c,tertiary:#ffc738"
              trigger="loop-on-hover"
              target=".report-option-card-3"
            />
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <h3 className="self-stretch text-black text-base font-semibold font-bricolage">Expense Summary</h3>
              <p className="self-stretch text-black/60 text-sm font-normal font-sans">Categorised expense totals for tax and accounting review.</p>
            </div>
            <div className="self-stretch h-px bg-white80"></div>
            <Button
              variant="outline"
              size="default"
              rightIcon="https://cdn.lordicon.com/yvvjqzpc.json"
              iconTrigger="hover"
              className="w-full justify-center"
            >
              Generate PDF
            </Button>
          </div>

          {/* Card 4: Project Completion Report */}
          <div className="p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-between items-start gap-3 xl:gap-6 min-h-[220px] xl:min-h-[320px] opacity-0 animate-fade-in-up animation-delay-300 report-option-card-4">
            <LordIcon
              src="https://cdn.lordicon.com/pmbbwkgy.json"
              size={80}
              colors="primary:#ebe6ef,secondary:#f98b4c"
              trigger="loop-on-hover"
              target=".report-option-card-4"
            />
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <h3 className="self-stretch text-black text-base font-semibold font-bricolage">Project Completion Report</h3>
              <p className="self-stretch text-black/60 text-sm font-normal font-sans">Final cost analysis and margin summary for completed projects.</p>
            </div>
            <div className="self-stretch h-px bg-white80"></div>
            <Button
              variant="outline"
              size="default"
              rightIcon="https://cdn.lordicon.com/yvvjqzpc.json"
              iconTrigger="hover"
              className="w-full justify-center"
            >
              Generate PDF
            </Button>
          </div>
        </div>

        {/* Recent Generated Reports Table */}
        <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-4 w-full recent-reports-panel opacity-0 animate-fade-in-up animation-delay-350">
          <div className="self-stretch inline-flex justify-between items-center w-full">
            <div className="flex justify-start items-center gap-2">
              <LordIcon
                src="https://cdn.lordicon.com/jqqjtvlf.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                state="hover-file-2"
                target=".recent-reports-panel"
              />
              <span className="text-black text-base font-semibold font-bricolage">Recent Generated Reports</span>
            </div>
            <Button variant="gray" size="small" rightIcon="https://cdn.lordicon.com/jarmuava.json" iconTrigger="hover">
              Showing All
            </Button>
          </div>

          <div className="self-stretch h-px bg-white80"></div>

          {/* List of generated elements */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
            {recentReports.map((rep, idx) => (
              <div
                key={idx}
                className={`self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 inline-flex justify-start items-center gap-4 recent-report-row-${idx}`}
              >
                <LordIcon
                  src={rep.icon}
                  size={20}
                  colors="primary:#110D31"
                  trigger="hover"
                  target={`.recent-report-row-${idx}`}
                />

                <div className="flex-1 inline-flex flex-col justify-start items-start gap-0.5">
                  <span className="self-stretch justify-start text-black text-sm font-semibold font-bricolage">
                    {rep.title}
                  </span>
                  <span className="self-stretch justify-start text-black/60 text-xs font-normal font-sans">
                    {rep.date}
                  </span>
                </div>

                <Button variant="ghost-black" size="small" rightIcon="https://cdn.lordicon.com/dxfkntgu.json" iconTrigger="hover">
                  Download
                </Button>
              </div>
            ))}
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
            <Sidebar activeMenu="reports" className="h-[calc(100vh-48px)] w-64 shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
