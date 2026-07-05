'use client';

import React from 'react';
import { Button } from '../button';
import { LordIcon } from '../lord-icon';

interface DisclaimerModalProps {
  onClose: () => void;
}

export function DisclaimerModal({ onClose }: DisclaimerModalProps) {
  return (
    <div className="fixed inset-0 z-999999 flex justify-center items-center select-none">
      {/* Backdrop with a slight blur overlay */}
      <div
        className="absolute inset-0 bg-white/20 animate-fade-in"
        style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[440px] p-5 bg-white rounded-[32px] border border-white80 flex flex-col justify-start items-center gap-4 outline-white80 animate-scale-up">

        {/* Animated Lordicon */}
        <div className="flex justify-center items-center shrink-0">
          <LordIcon
            src="https://cdn.lordicon.com/klcgmfzh.json"
            size={100}
            trigger="in"
            state="in-reveal"
            colors="primary:#242424,secondary:#f9c9c0,tertiary:#e4e4e4,quaternary:#f98b4c,quinary:#c71f16"
          />
        </div>

        {/* Text Details */}
        <div className="self-stretch flex flex-col items-center text-center gap-3">
          <h3 className="text-primary text-2xl font-bold font-bricolage leading-tight">
            Concept Disclaimer
          </h3>
          <p className="text-black/60 text-sm font-normal font-sans leading-relaxed">
            Hello! Please note that this is a front-end concept website created to showcase the Lordicon application. Some features are for demonstration purposes only and may not be fully functional. Enjoy exploring the site, and don't forget to check out the <span className="text-black/60 font-semibold">SaaS demo!</span>
          </p>

          <div className="w-full h-px bg-white80 my-1" />

          <span className="text-black/40 text-xs font-normal font-sans">
            Special thanks to <a href="https://lordicon.com" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-primary">Lordicons</a>
          </span>
        </div>

        {/* Action Button: Outline style with Continue icon */}
        <Button
          variant="outline"
          rightIcon="https://cdn.lordicon.com/jarmuava.json"
          rightIconState="hover-slide"
          iconTrigger="hover"
          onClick={onClose}
          className="w-full justify-center"
        >
          Continue
        </Button>

      </div>
    </div>
  );
}
