'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '../../components/sidebar';
import { Button } from '../../components/button';
import { LordIcon } from '../../components/lord-icon';
import { InputBox } from '../../components/inputBox';
import { IconButton } from '../../components/iconButton';
import { Badge } from '../../components/badge';
import { NotificationModal } from '../../components/modal/notificationModal';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebarModal, setShowSidebarModal] = useState(false);
  const [activeBarIndex, setActiveBarIndex] = useState<number>(7); // August is index 7
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2026');
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Mock projects data
  const projects = [
    {
      name: 'Orchard Rd Renovation',
      description: 'Mr Abraham',
      status: 'Active',
      spent: 420000,
      budget: 680000,
      percentage: 62,
      margin: 22.1,
      statusColor: 'green' as const,
    },
    {
      name: 'Sentosa Villa Build',
      description: 'Quantum Innovations',
      status: 'Active',
      spent: 847200,
      budget: 900000,
      percentage: 94,
      margin: 18.4,
      statusColor: 'green' as const,
      isRisk: true,
    },
    {
      name: 'Marina Bay Office',
      description: 'SkyVision Technologies',
      status: 'Paused',
      spent: 312000,
      budget: 650000,
      percentage: 48,
      margin: 27.8,
      statusColor: 'yellow' as const,
    },
  ];

  // Mock AI alerts
  const alerts = [
    {
      id: 1,
      boldText: 'Sentosa Villa is ',
      middleText: '87.2% of budget',
      normalText: ' with 3 months remaining. Projected overrun of ',
      highlight: '$15,800',
    },
    {
      id: 2,
      boldText: 'Material costs',
      normalText: ' up 18% this month. Steel prices rising, consider locking in Q4 orders now.',
    },
    {
      id: 3,
      boldText: 'Marina Bay Office ',
      normalText: 'has 12 unreconciled receipts older than 7 days. Assign to project manager.',
    },
  ];

  // Mock spend categories
  const categories = [
    { name: 'Materials', amount: 178400, percent: 80, color: 'bg-primary' },
    { name: 'Labour', amount: 54200, percent: 40, color: 'bg-stateYellow' },
    { name: 'Subcontractor', amount: 98700, percent: 60, color: 'bg-stateBlue' },
    { name: 'Permits', amount: 11200, percent: 15, color: 'bg-stateGreen' },
  ];

  // Mock expenses
  const expenses = [
    { merchant: 'Home Depot', details: 'Sentosa Villa, Materials', amount: 4280, time: 'Today' },
    { merchant: 'SG Electrical', details: 'Marina Bay, Subcontractor', amount: 4280, time: 'Yesterday' },
    { merchant: 'BuildMart Id', details: 'Orchard Rd, Materials', amount: 4280, time: '2 days ago' },
    { merchant: 'City Council', details: 'Marina Bay Office, Permits', amount: 4280, time: '3 days ago' },
  ];

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Helper to format specific values to matching decimal point style
  const formatYAxisAmount = (val: number) => {
    if (val === 0) return '$0';
    return `$${(val / 1000)}.000`;
  };

  return (
    <div className="w-full p-6 bg-neutral-100 flex flex-col xl:flex-row justify-start items-start gap-6 min-h-screen font-sans animate-fade-in">
      {/* Left Column: Sidebar Navigation (Hidden under 1024px, shown as modal instead) */}
      <Sidebar activeMenu="dashboard" className="hidden xl:flex xl:sticky xl:top-6 h-[calc(100vh-48px)] shrink-0 xl:w-64" />

      {/* Middle Column: Search, Header, Stats, Charts & Active Projects */}
      <div className="flex-1 flex flex-col justify-start items-start gap-6 min-w-0 w-full">

        {/* Search Row */}
        <div className="self-stretch inline-flex justify-start items-center gap-3 relative z-30">
          {/* Sidebar Trigger Button (visible only under 1024px) */}
          <IconButton
            variant="white"
            icon="https://cdn.lordicon.com/tewlfgbl.json"
            state="hover"
            iconColor="primary:#110d31"
            className="rounded-xl border border-white80 shrink-0 xl:hidden"
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

        {/* Welcome Greeting Row */}
        <div className="inline-flex justify-start items-end gap-3 welcome-text">
          <h1 className="text-black text-3xl font-bold font-bricolage">
            Welcome Back, Tora
          </h1>
          <div className="size-10 flex justify-center items-center shrink-0">
            <LordIcon
              src="https://cdn.lordicon.com/jxndnort.json"
              size={40}
              trigger="hover"
              colors="primary:#f9c9c0,secondary:#f98b4c"
              target='.welcome-text'
            />
          </div>
        </div>

        {/* Stats Metrics: 2 columns grid for 2x2 layout */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {/* Card 1: Total Spend */}
          <div className="self-stretch p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-1 dashboard-card-1 opacity-0 animate-fade-in-up animation-delay-100">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/yycecovd.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".dashboard-card-1"
              />
              <span className="text-black/60 text-sm font-normal font-sans">Total Spend (MTD)</span>
            </div>
            <div className="self-stretch text-primary text-3xl font-bold font-bricolage">$284,900</div>
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/excswhey.json"
                size={20}
                colors="primary:#57C439"
                trigger="loop-on-hover"
                target=".dashboard-card-1"
              />
              <span className="text-stateGreen text-sm font-semibold font-bricolage">12.4%</span>
              <span className="text-black text-sm font-normal font-sans">vs last month</span>
            </div>
          </div>

          {/* Card 2: Active Projects */}
          <div className="self-stretch p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-1 dashboard-card-2 opacity-0 animate-fade-in-up animation-delay-150">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/piurhpdv.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".dashboard-card-2"
              />
              <span className="text-black/60 text-sm font-normal font-sans">Active Projects</span>
            </div>
            <div className="self-stretch text-primary text-3xl font-bold font-bricolage">9</div>
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/excswhey.json"
                size={20}
                colors="primary:#57C439"
                trigger="loop-on-hover"
                target=".dashboard-card-2"
              />
              <span className="text-stateGreen text-sm font-semibold font-bricolage">+2</span>
              <span className="text-black text-sm font-normal font-sans">new this month</span>
            </div>
          </div>

          {/* Card 3: Budget Remaining */}
          <div className="self-stretch p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-1 dashboard-card-3 opacity-0 animate-fade-in-up animation-delay-200">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/dnupukmh.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".dashboard-card-3"
              />
              <span className="text-black/60 text-sm font-normal font-sans">Budget Remaining</span>
            </div>
            <div className="self-stretch text-primary text-3xl font-bold font-bricolage">$328,900</div>
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/zwtssiaj.json"
                size={20}
                colors="primary:#F94C4C"
                trigger="loop-on-hover"
                target=".dashboard-card-3"
              />
              <span className="text-stateRed text-sm font-semibold font-bricolage">8.2%</span>
              <span className="text-black text-sm font-normal font-sans">across all projects</span>
            </div>
          </div>

          {/* Card 4: Avg. Margin */}
          <div className="self-stretch p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-1 dashboard-card-4 opacity-0 animate-fade-in-up animation-delay-250">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/btfbysou.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".dashboard-card-4"
              />
              <span className="text-black/60 text-sm font-normal font-sans">Avg. Margin</span>
            </div>
            <div className="self-stretch text-primary text-3xl font-bold font-bricolage">23.4%</div>
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/excswhey.json"
                size={20}
                colors="primary:#57C439"
                trigger="loop-on-hover"
                target=".dashboard-card-4"
              />
              <span className="text-stateGreen text-sm font-semibold font-bricolage">4%</span>
              <span className="text-black text-sm font-normal font-sans">vs target</span>
            </div>
          </div>
        </div>

        {/* Monthly Spend Chart */}
        <div className="self-stretch h-96 p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-8 w-full monthly-spend-panel opacity-0 animate-scale-up animation-delay-300">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <LordIcon
                src="https://cdn.lordicon.com/lrzdmsmx.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".monthly-spend-panel"
              />
              <span className="text-black text-base font-semibold font-bricolage">Monthly Spend</span>
            </div>
            <div className="relative">
              <Button
                variant="gray"
                size="small"
                rightIcon="https://cdn.lordicon.com/gqfozvrp.json"
                iconTrigger="hover"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
              >
                {selectedYear}
              </Button>
              {showYearDropdown && (
                <div className="absolute right-0 top-[calc(100%+4px)] w-20 bg-white border border-white80 rounded-xl z-50 flex flex-col overflow-hidden animate-fade-in select-none">
                  {(['2026', '2025'] as const).map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setShowYearDropdown(false);
                      }}
                      className={`px-3 py-1 text-left text-xs font-semibold font-bricolage transition-colors cursor-pointer ${selectedYear === year ?
                        'text-primary bg-primary/10' : 'text-black/40 hover:text-primary'
                        }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chart Visualizer */}
          <div className="self-stretch flex-1 relative flex flex-col justify-between items-start mt-2">
            {[40000, 30000, 20000, 15000, 10000, 5000, 1000].map((amt) => (
              <div key={amt} className="self-stretch inline-flex justify-start items-center gap-3">
                <span className="w-16 justify-start text-black/40 text-xs font-semibold font-bricolage">
                  {formatYAxisAmount(amt)}
                </span>
                <div className="flex-1 h-px bg-neutral-100"></div>
              </div>
            ))}
            <div className="self-stretch opacity-0 inline-flex justify-start items-center gap-3">
              <span className="w-16 justify-start text-black/40 text-xs font-semibold font-bricolage">$0</span>
              <div className="flex-1 h-px bg-neutral-100"></div>
            </div>

            {/* Columns layout */}
            <div className="left-[80px] right-[24px] top-0 absolute h-[calc(100%-10px)] overflow-x-auto pr-2">
              <div className="inline-flex justify-between items-end h-full min-w-[612px] w-full gap-3 pb-1 pt-10">
                {(selectedYear === '2026'
                  ? [
                    { month: 'Jan', height: 'h-24', amount: '$18,400' },
                    { month: 'Feb', height: 'h-10', amount: '$9,200' },
                    { month: 'Mar', height: 'h-28', amount: '$24,500' },
                    { month: 'Apr', height: 'h-36', amount: '$28,000' },
                    { month: 'May', height: 'h-24', amount: '$19,000' },
                    { month: 'Jun', height: 'h-30', amount: '$25,200' },
                    { month: 'Jul', height: 'h-16', amount: '$14,800' },
                    { month: 'Aug', height: 'h-46', amount: '$31,000' },
                    { month: 'Sept', height: 'h-36', amount: '$28,000' },
                    { month: 'Okt', height: 'h-40', amount: '$31,000' },
                    { month: 'Nov', height: 'h-20', amount: '$16,500' },
                    { month: 'Dec', height: 'h-32', amount: '$26,000' },
                  ]
                  : [
                    { month: 'Jan', height: 'h-16', amount: '$12,500' },
                    { month: 'Feb', height: 'h-28', amount: '$22,000' },
                    { month: 'Mar', height: 'h-20', amount: '$15,800' },
                    { month: 'Apr', height: 'h-10', amount: '$8,400' },
                    { month: 'May', height: 'h-36', amount: '$29,000' },
                    { month: 'Jun', height: 'h-24', amount: '$19,200' },
                    { month: 'Jul', height: 'h-30', amount: '$23,000' },
                    { month: 'Aug', height: 'h-30', amount: '$25,000' },
                    { month: 'Sept', height: 'h-46', amount: '$31,500' },
                    { month: 'Okt', height: 'h-14', amount: '$11,000' },
                    { month: 'Nov', height: 'h-24', amount: '$18,000' },
                    { month: 'Dec', height: 'h-40', amount: '$32,000' },
                  ]
                ).map((item, idx) => {
                  const isActive = idx === activeBarIndex;
                  return (
                    <div key={idx} className="w-10 flex flex-col justify-start items-center gap-3 relative group">
                      {isActive && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-primary text-xs font-semibold font-bricolage rounded-xl border border-white80 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 flex items-center gap-1">
                          <LordIcon
                            src="https://cdn.lordicon.com/qfkpvtbg.json"
                            size={18}
                            colors="primary:#F98B4C"
                            trigger="loop"
                          />
                          <span>{item.amount}</span>
                        </div>
                      )}
                      <div
                        onClick={() => setActiveBarIndex(idx)}
                        className={`w-8 rounded-md transition-all duration-300 hover:scale-105 cursor-pointer ${isActive ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/45'
                          } ${item.height}`}
                      ></div>
                      <span className="text-center justify-start text-black/40 text-xs font-semibold font-bricolage">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Active Projects Table */}
        <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col gap-4 w-full active-projects-panel opacity-0 animate-fade-in-left animation-delay-350">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <LordIcon
                src="https://cdn.lordicon.com/piurhpdv.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".active-projects-panel"
              />
              <span className="text-black text-base font-semibold font-bricolage">Active Projects</span>
            </div>
            <Link href="/projects" className="no-underline">
              <Button
                variant="gray"
                size="small"
                rightIcon="https://cdn.lordicon.com/jarmuava.json"
                rightIconState="hover-slide"
                iconTrigger="hover"
              >
                View All
              </Button>
            </Link>
          </div>

          <div className="w-full h-px bg-white80"></div>

          {/* Table list rows wrapper */}
          <div className="self-stretch flex flex-col justify-start items-stretch gap-3 w-full">
            <div className="self-stretch px-3 grid grid-cols-[160px_1fr_1fr_1fr_1.2fr_1fr] max-[1359px]:xl:grid-cols-[160px_1fr_1fr_1fr] min-[1360px]:max-[1439px]:grid-cols-[160px_1fr_1fr_1fr_1.2fr] min-[1440px]:grid-cols-[180px_1fr_1fr_1fr_1.2fr_1fr] min-[1580px]:grid-cols-[240px_1fr_1fr_1fr_1.2fr_1fr] gap-4 items-center text-left">
              <div className="justify-start text-black/40 text-xs font-semibold font-bricolage">Project Name</div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage">Status</div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage">Spent</div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage">Budget</div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage max-[1359px]:xl:hidden">Budget Used</div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage max-[1439px]:xl:hidden">Margin</div>
            </div>

            {projects.slice(0, 4).map((proj, idx) => (
              <div
                key={idx}
                className={`self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 grid grid-cols-[160px_1fr_1fr_1fr_1.2fr_1fr] max-[1359px]:xl:grid-cols-[160px_1fr_1fr_1fr] min-[1360px]:max-[1439px]:grid-cols-[160px_1fr_1fr_1fr_1.2fr] min-[1440px]:grid-cols-[180px_1fr_1fr_1fr_1.2fr_1fr] min-[1580px]:grid-cols-[240px_1fr_1fr_1fr_1.2fr_1fr] gap-4 items-center dashboard-project-row-${idx}`}
              >
                <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0">
                  <div className="self-stretch justify-start text-black text-sm font-semibold font-bricolage truncate">
                    {proj.name}
                  </div>
                  <div className="self-stretch justify-start text-black/60 text-xs font-normal font-sans truncate">
                    {proj.description}
                  </div>
                </div>

                <div className="inline-flex flex-col justify-start items-start">
                  <Badge color={proj.statusColor}>{proj.status}</Badge>
                </div>

                <div className="justify-start text-black/60 text-xs font-normal font-sans truncate">
                  {formatCurrency(proj.spent)}
                </div>

                <div className="justify-start text-black/60 text-xs font-normal font-sans truncate">
                  {formatCurrency(proj.budget)}
                </div>

                <div className="flex max-[1359px]:xl:hidden justify-start items-center gap-1.5 min-w-0">
                  <div className="w-16 bg-neutral-200 h-1.5 rounded-full overflow-hidden shrink-0">
                    <div
                      className={`h-full rounded-full ${proj.isRisk ? 'bg-stateRed' : 'bg-stateGreen'}`}
                      style={{ width: `${proj.percentage}%` }}
                    ></div>
                  </div>
                  <span className={`text-right justify-start text-xs font-semibold font-bricolage shrink-0 ${proj.isRisk ? 'text-stateRed' : 'text-stateGreen'
                    }`}>
                    {proj.percentage}%
                  </span>
                </div>

                <div className="flex max-[1439px]:xl:hidden justify-start items-center gap-0.5 min-w-0">
                  <div className="size-5 relative overflow-hidden shrink-0">
                    <LordIcon
                      src="https://cdn.lordicon.com/btfbysou.json"
                      size={18}
                      colors="primary:#F98B4C"
                      trigger="hover"
                      target={`.dashboard-project-row-${idx}`}
                    />
                  </div>
                  <span className="text-right justify-start text-primary text-sm font-semibold font-bricolage shrink-0">
                    {proj.margin}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: GO AI Alerts, Spend Category breakdown & Recent Expenses */}
      <div className="w-full xl:w-96 flex flex-col justify-start items-start gap-6 shrink-0 min-w-0">

        {/* GO AI Alerts panel */}
        <div className="self-stretch p-6 bg-linear-to-b from-white from-85% to-[#FFF8F4] rounded-[32px] border border-orange-200 hover:border-primary transition-all duration-300 flex flex-col justify-start items-start gap-4 go-ai-alerts-panel opacity-0 animate-fade-in-right animation-delay-400">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="size- flex justify-start items-center gap-2">
              <LordIcon
                src="https://cdn.lordicon.com/rhovcpjk.json"
                size={24}
                colors="primary:#f98b4c"
                trigger="loop"
                state="loop-line"
                className="shrink-0"
                target=".go-ai-alerts-panel"
              />
              <div className="justify-start text-black text-base font-semibold font-bricolage">Go AI Alerts</div>
            </div>
            <Badge color="red" icon="https://cdn.lordicon.com/juujmrhr.json">3 Active</Badge>
          </div>

          <div className="self-stretch h-px bg-white80"></div>

          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 inline-flex justify-between items-center">
              <div className="flex-1 justify-start">
                <span className="text-black text-sm font-normal font-sans">Sentosa Villa is </span>
                <span className="text-black text-sm font-semibold font-bricolage">87.2% of budget</span>
                <span className="text-black text-sm font-normal font-sans"> with 3 months remaining. Projected overrun of </span>
                <span className="text-sm font-semibold font-bricolage text-stateRed">$15,800</span>
              </div>
            </div>
            <div className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 inline-flex justify-between items-center">
              <div className="flex-1 justify-start">
                <span className="text-black text-sm font-semibold font-bricolage">Material costs</span>
                <span className="text-black text-sm font-normal font-sans"> up 18% this month. Steel prices rising, consider locking in Q4 orders now.</span>
              </div>
            </div>
            <div className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 inline-flex justify-between items-center">
              <div className="flex-1 justify-start">
                <span className="text-black text-sm font-semibold font-bricolage">Marina Bay Office </span>
                <span className="text-black text-sm font-normal font-sans">has 12 unreconciled receipts older than 7 days. Assign to project manager.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spend Category Progress Panel */}
        <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-4 spend-category-panel opacity-0 animate-fade-in-right animation-delay-450">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <LordIcon
              src="https://cdn.lordicon.com/dutqakce.json"
              size={20}
              colors="primary:#110D31"
              trigger="hover"
              target=".spend-category-panel"
            />
            <span className="justify-start text-black text-base font-semibold font-bricolage">Spend Category</span>
          </div>
          <div className="self-stretch h-px bg-white80"></div>

          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 inline-flex justify-start items-start gap-2.5"
              >
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch inline-flex justify-between items-center">
                    <span className="text-black/60 text-sm font-normal font-sans">{cat.name}</span>
                    <span className="text-black/60 text-sm font-semibold font-bricolage">
                      {formatCurrency(cat.amount)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 rounded-[100px] overflow-hidden relative">
                    <div
                      className={`h-full rounded-[100px] ${cat.color}`}
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses List Panel */}
        <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-4 recent-expenses-panel opacity-0 animate-fade-in-right animation-delay-500">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <LordIcon
                src="https://cdn.lordicon.com/qfkpvtbg.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".recent-expenses-panel"
              />
              <span className="justify-start text-black text-base font-semibold font-bricolage">Recent Expenses</span>
            </div>
            <Link href="/expenses" className="no-underline">
              <Button variant="gray" size="small">
                View All
              </Button>
            </Link>
          </div>
          <div className="self-stretch h-px bg-white80"></div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            {expenses.map((exp, idx) => (
              <div
                key={idx}
                className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 inline-flex justify-start items-start gap-2.5"
              >
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-0.5">
                  <span className="self-stretch justify-start text-black text-sm font-semibold font-bricolage">
                    {exp.merchant}
                  </span>
                  <span className="self-stretch justify-start text-black/60 text-xs font-normal font-sans">
                    {exp.details}
                  </span>
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-0.5 text-right">
                  <span className="self-stretch text-right justify-start text-primary text-sm font-semibold font-bricolage">
                    {formatCurrency(exp.amount)}
                  </span>
                  <span className="self-stretch text-right justify-start text-black text-xs font-normal font-sans">
                    {exp.time}
                  </span>
                </div>
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
            <Sidebar activeMenu="dashboard" className="h-[calc(100vh-48px)] w-64 shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
