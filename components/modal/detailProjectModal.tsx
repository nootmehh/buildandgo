'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../button';
import { IconButton } from '../iconButton';
import { LordIcon } from '../lord-icon';
import { Badge } from '../badge';

interface DetailProjectModalProps {
  project: {
    name: string;
    description: string;
    status: string;
    spent: number;
    budget: number;
    percentage: number;
    margin: number;
    statusColor: 'green' | 'yellow' | 'blue' | 'red';
    isRisk?: boolean;
    manager?: string;
  };
  onClose: () => void;
}

export function DetailProjectModal({ project, onClose }: DetailProjectModalProps) {
  const [isReady, setIsReady] = useState(false);

  // Defer LordIcon mounting so they don't compete with the panel paint
  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end items-stretch select-none"
      style={{ animation: 'fade-in 0.2s ease-out forwards' }}
      onClick={handleClose}
    >
      {/* Blur backdrop — isolated layer so it never causes scroll repaint */}
      <div
        className="absolute inset-0 bg-white/20"
        style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
      />

      {/* Panel */}
      <div
        className="relative w-[640px] h-screen bg-white90 border-l border-white80 flex flex-col justify-start items-start shadow-lg"
        style={{ contain: 'layout style' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navbar */}
        <div className="flex-none self-stretch px-6 py-4 bg-white border-b border-white80 inline-flex justify-between items-center w-full">
          <Button
            variant="ghost-black"
            onClick={handleClose}
            leftIcon="https://cdn.lordicon.com/hjashvmz.json"
            iconTrigger="hover"
            className="font-bricolage font-semibold text-sm text-black"
          >
            Back to Projects
          </Button>
          <IconButton
            variant="gray"
            icon="https://cdn.lordicon.com/xsjhqecw.json"
            iconColor="primary:#110D31"
            onClick={handleClose}
            state="hover-slide"
            className="rounded-xl border border-white80 shrink-0"
          />
        </div>

        {/* Scrollable Body — isolated scroll context */}
        <div className="flex-1 self-stretch p-6 bg-white90 flex flex-col justify-start items-start gap-4 overflow-y-auto overscroll-contain w-full">

          {/* Project Header */}
          <div className="self-stretch p-4 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-start items-start gap-3 w-full opacity-0 animate-fade-in-up animation-delay-100 detail-header-card">
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="size-6 flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon src="https://cdn.lordicon.com/piurhpdv.json" size={24} colors="primary:#110D31" trigger="hover" target=".detail-header-card" />
                  )}
                </div>
                <h2 className="text-black text-2xl font-bold font-bricolage">{project.name}</h2>
              </div>
              <span className="text-black/60 text-xs font-normal font-sans">14 Orchard Boulevard, Singapore 238843</span>
            </div>
            <div className="inline-flex justify-start items-start gap-2 flex-wrap">
              <Badge color={project.statusColor}>{project.status}</Badge>
              <Badge color="primary">Home Renovation</Badge>
              <div className="h-7 px-2 py-2 bg-white90 rounded-[100px] border border-white80 inline-flex justify-center items-center gap-1">
                <div className="w-3.5 h-3.5 flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon src="https://cdn.lordicon.com/bushiqea.json" size={14} colors="primary:#110D31" trigger="hover" target=".detail-header-card" />
                  )}
                </div>
                <span className="text-black/60 text-xs font-normal font-sans">Client: </span>
                <span className="text-black text-xs font-semibold font-bricolage">{project.description}</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="self-stretch inline-flex justify-start items-stretch gap-4 w-full">
            {/* Total Spend */}
            <div className="flex-1 p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-between items-start gap-2 opacity-0 animate-fade-in-up animation-delay-150 detail-spend-card min-w-0">
              <div className="self-stretch inline-flex justify-start items-center gap-1">
                <div className="size-[18px] flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon src="https://cdn.lordicon.com/yycecovd.json" size={18} colors="primary:#110D31" trigger="hover" target=".detail-spend-card" />
                  )}
                </div>
                <span className="text-black/60 text-[11px] font-normal font-sans truncate">Total Spend (MTD)</span>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                <span className="text-orange-400 text-xl font-bold font-bricolage truncate w-full">{formatCurrency(project.spent)}</span>
                <span className="text-black text-[11px] font-normal font-sans truncate w-full">of <span className="font-semibold font-bricolage">{formatCurrency(project.budget)}</span></span>
              </div>
            </div>

            {/* Budget Remaining */}
            <div className="flex-1 p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-between items-start gap-2 opacity-0 animate-fade-in-up animation-delay-200 detail-remaining-card min-w-0">
              <div className="self-stretch inline-flex justify-start items-center gap-1">
                <div className="size-[18px] flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon src="https://cdn.lordicon.com/dnupukmh.json" size={18} colors="primary:#110D31" trigger="hover" target=".detail-remaining-card" />
                  )}
                </div>
                <span className="text-black/60 text-[11px] font-normal font-sans truncate">Budget Remaining</span>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                <span className="text-orange-400 text-xl font-bold font-bricolage truncate w-full">{formatCurrency(project.budget - project.spent)}</span>
                <span className="text-black text-[11px] font-normal font-sans truncate w-full">of <span className="font-semibold font-bricolage">{formatCurrency(project.budget)}</span></span>
              </div>
            </div>

            {/* Margin */}
            <div className="flex-1 p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-between items-start gap-2 opacity-0 animate-fade-in-up animation-delay-250 detail-margin-card min-w-0">
              <div className="self-stretch inline-flex justify-start items-center gap-1">
                <div className="size-[18px] flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon src="https://cdn.lordicon.com/btfbysou.json" size={18} colors="primary:#110D31" trigger="hover" target=".detail-margin-card" />
                  )}
                </div>
                <span className="text-black/60 text-[11px] font-normal font-sans truncate">Margin</span>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                <span className="text-orange-400 text-xl font-bold font-bricolage">{project.margin}%</span>
                <span className="text-black text-[11px] font-normal font-sans">vs <span className="font-semibold font-bricolage">20%</span> target</span>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="self-stretch p-4 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-start items-start gap-4 w-full opacity-0 animate-fade-in-up animation-delay-300">
            <div className="self-stretch inline-flex justify-between items-start">
              <span className="text-black text-lg font-bold font-bricolage">Overall Budget</span>
              <span className="text-orange-400 text-lg font-bold font-bricolage">{project.percentage}%</span>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${project.isRisk ? 'bg-stateRed' : 'bg-orange-400'}`}
                  style={{ width: `${project.percentage}%` }}
                />
              </div>
              <div className="self-stretch inline-flex justify-between items-center text-black/60 text-xs font-normal font-sans">
                <span>Start <span className="font-semibold font-bricolage">15 Oct 2025</span></span>
                <span>End: <span className="font-semibold font-bricolage">30 Sep 2026</span></span>
              </div>
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="self-stretch p-4 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-start items-end gap-4 w-full opacity-0 animate-fade-in-up animation-delay-350 detail-expenses-card">
            <div className="self-stretch inline-flex justify-between items-center w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="size-5 flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon src="https://cdn.lordicon.com/qfkpvtbg.json" size={20} colors="primary:#110D31" trigger="hover" target=".detail-expenses-card" />
                  )}
                </div>
                <span className="text-black text-base font-semibold font-bricolage">Recent Expenses</span>
              </div>
              <Button variant="gray" size="small">View All Expenses</Button>
            </div>
            <div className="self-stretch h-px bg-white80" />
            <div className="self-stretch flex flex-col justify-start items-end gap-3 w-full">
              {[
                { category: 'Materials', vendor: 'BuildMart SG', date: '18 June', amount: 890, status: 'Approved', catColor: 'bg-rose-100 text-orange-400', statColor: 'bg-blue-500/20 text-blue-500' },
                { category: 'Labour', vendor: 'Sunrise Carpentry', date: '12 June', amount: 1200, status: 'Approved', catColor: 'bg-amber-300/20 text-amber-300', statColor: 'bg-blue-500/20 text-blue-500' },
                { category: 'Permits', vendor: 'City Permits Office', date: '04 June', amount: 450, status: 'Pending', catColor: 'bg-lime-600/20 text-lime-600', statColor: 'bg-rose-100 text-orange-400' },
              ].map((item, idx) => (
                <div key={idx} className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 border border-white80 hover:border-white70 transition-colors duration-150 rounded-2xl inline-flex justify-between items-center gap-4 w-full">
                  <div className="flex justify-start items-center gap-4 min-w-0">
                    <span className={`h-7 px-3 py-2 rounded-[100px] inline-flex justify-center items-center text-xs font-semibold font-bricolage shrink-0 ${item.catColor}`}>{item.category}</span>
                    <div className="inline-flex flex-col justify-start items-start min-w-0">
                      <span className="text-black text-sm font-semibold font-bricolage truncate w-full">{item.vendor}</span>
                      <span className="text-black/60 text-xs font-normal font-sans">{item.category}, {item.date}</span>
                    </div>
                  </div>
                  <div className="inline-flex flex-col justify-start items-end shrink-0">
                    <span className="text-black text-sm font-semibold font-bricolage">{formatCurrency(item.amount)}</span>
                    <span className={`h-5 px-2 rounded-full inline-flex justify-center items-center text-[10px] font-semibold font-bricolage ${item.statColor}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="self-stretch p-4 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-start items-start gap-4 w-full opacity-0 animate-fade-in-up animation-delay-400 detail-team-card">
            <div className="self-stretch inline-flex justify-between items-center w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="size-5 flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon src="https://cdn.lordicon.com/bushiqea.json" size={20} colors="primary:#110D31" trigger="hover" target=".detail-team-card" />
                  )}
                </div>
                <span className="text-black text-base font-semibold font-bricolage">Team</span>
              </div>
            </div>
            <div className="self-stretch h-px bg-white80" />
            <div className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 border border-white80 hover:border-white70 transition-colors duration-150 rounded-2xl inline-flex justify-start items-center gap-4 w-full">
              <div className="w-8 h-8 rounded-2xl bg-blue-500 flex justify-center items-center text-white text-sm font-bold font-bricolage shrink-0">DK</div>
              <div className="inline-flex flex-col justify-start items-start">
                <span className="text-black text-sm font-semibold font-bricolage">{project.manager || 'Daniel Koh'}</span>
                <span className="text-black/60 text-xs font-normal font-sans">Project Manager</span>
              </div>
            </div>
          </div>

          {/* Go AI Callout */}
          <div className="self-stretch p-4 bg-linear-to-b from-white from-85% to-red-50 rounded-[32px] border border-low hover:border-primary transition-colors duration-200 flex flex-col justify-start items-start gap-1 w-full opacity-0 animate-fade-in-up animation-delay-450 detail-ai-card">
            <div className="self-stretch inline-flex justify-between items-center w-full">
              <div className="flex justify-start items-center gap-2">
                <div className="size-8 flex justify-center items-center shrink-0">
                  {isReady && (
                    <LordIcon
                      src="https://cdn.lordicon.com/rhovcpjk.json"
                      size={24}
                      colors="primary:#f98b4c"
                      trigger="loop"
                      state="loop-line"
                      target=".detail-ai-card"
                    />
                  )}
                </div>
                <span className="text-black text-base font-semibold font-bricolage">Go AI Analysis</span>
              </div>
            </div>            <div className="self-stretch text-black/60 text-sm font-normal font-sans leading-relaxed">
              {project.isRisk
                ? 'Budget overrun risk detected. Labor costs are tracking 28% higher than projected. Immediate negotiation recommended.'
                : `Well within budget at ${project.percentage}%. Final margin expected ${project.margin - 1}%–${project.margin + 2}%. Watch Interior Fit-out, $100K remaining exposure.`}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex-none self-stretch px-6 py-4 bg-white border-t border-white80 inline-flex justify-end items-center w-full">
          <div className="inline-flex justify-start items-center gap-4">
            <Button variant="ghost-black" leftIcon="https://cdn.lordicon.com/yvvjqzpc.json" iconTrigger="hover" className="font-bricolage text-sm font-semibold text-black">
              Export Report
            </Button>
            <Button variant="outline" leftIcon="https://cdn.lordicon.com/jjjktlkk.json" iconTrigger="hover" className="font-bricolage text-sm font-semibold">
              Edit Project
            </Button>
            <Button variant="default" leftIcon="https://cdn.lordicon.com/swqmjczo.json" iconTrigger="hover" rightIconState="hover-rotation" className="font-bricolage text-sm font-semibold">
              Add Expenses
            </Button>
          </div>
        </div>

      </div>{/* end panel */}
    </div>
  );
}
