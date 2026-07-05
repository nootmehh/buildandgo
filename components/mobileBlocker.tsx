'use client';

import React from 'react';
import { LordIcon } from './lord-icon';

export function MobileBlocker() {
  return (
    <div className="hidden max-[719px]:flex fixed inset-0 w-screen h-screen bg-[#F6F6F6] z-999999 flex-col items-center justify-center p-6 text-center gap-6 select-none animate-fade-in">
      <div className="flex justify-center items-center shrink-0">
        <LordIcon
          src="https://cdn.lordicon.com/uruigbfr.json"
          size={100}
          colors="primary:#f98b4c,secondary:#242424,tertiary:#ebe6ef"
          trigger="loop"
        />
      </div>
      <div className="flex flex-col gap-2 max-w-[280px]">
        <h2 className="text-black text-2xl font-bold font-bricolage leading-tight">
          Mobile Version <span className='text-primary'>Unavailable</span>
        </h2>
        <p className="text-black/60 text-sm font-normal font-sans leading-relaxed">
          This website is still not available for Mobile Version. Please check back on tablet or desktop.
        </p>
      </div>
    </div>
  );
}
