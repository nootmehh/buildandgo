'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../components/button';
import { LordIcon } from '../components/lord-icon';

export default function NotFound() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#F6F6F6] z-50 flex flex-col items-center justify-center p-6 text-center gap-6 select-none animate-fade-in">
      <div className="flex justify-center items-center shrink-0">
        <LordIcon
          src="https://cdn.lordicon.com/czyhjigp.json"
          size={100}
          trigger="loop"
        />
      </div>
      <div className="flex flex-col gap-2 max-w-[280px]">
        <h2 className="text-black text-2xl font-bold font-bricolage leading-tight">
          Page <span className='text-primary'>Not Found</span>
        </h2>
        <p className="text-black/60 text-sm font-normal font-sans leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link href="/">
        <Button
          variant="outline"
          leftIcon="https://cdn.lordicon.com/hjashvmz.json"
          leftIconState="hover-slide"
          iconTrigger="hover"
        >
          Back to Landing Page
        </Button>
      </Link>
    </div>
  );
}
