'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../button';
import DashboardPage from '../../app/dashboard/page';
import { GridPattern } from '../ui/grid-pattern';

export function HeroSection() {
  return (
    <section className="w-full bg-linear-to-b from-[#F6F6F6] from-35% to-[#FFEBD7] max-h-[850px] mx-auto md:px-36 pt-16 flex flex-col justify-start items-center gap-8 overflow-hidden relative">
      <GridPattern
        width={40}
        height={40}
        strokeDasharray="1"
        className="absolute inset-0 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,white,transparent)] stroke-neutral-400/25 fill-neutral-400/10 pointer-events-none"
      />
      {/* Content wrapper */}
      <div className="w-full max-w-[644px] flex flex-col justify-start items-center gap-6">
        <div className="self-stretch flex flex-col justify-start items-center gap-3">
          <h1 className="self-stretch text-center text-black text-4xl md:text-5xl font-bold font-bricolage leading-tight">
            Every dollar your project spends, tracked in real time.
          </h1>
          <p className="w-full max-w-sm text-center text-black/60 text-sm font-normal font-sans leading-relaxed">
            The financial intelligence platform built exclusively for construction and home renovation businesses.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center items-start">
          <Link href="/login">
            <Button
              variant="default"
              rightIcon="https://cdn.lordicon.com/jarmuava.json"
              rightIconState="hover-slide"
            >
              View Live Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Mockup Card: Scaled-down live Dashboard component */}
      <div
        className="w-full max-w-[1152px] h-[550px] md:h-[680px] p-4 bg-white/50 rounded-[32px] border border-white80 shrink-0 overflow-hidden relative select-none"
        onClickCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Live interactive Dashboard component scaled down to act as a preview */}
        <div className="w-[166.67%] h-[166.67%] origin-top-left scale-[0.6] pointer-events-auto border border-white80 overflow-hidden rounded-[36px]">
          <DashboardPage />
        </div>
      </div>
    </section>
  );
}
