'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../button';
import { Badge } from '../badge';

export function ReminderSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-36 pb-12 flex flex-col justify-start items-center gap-8">
      <div className="flex flex-col justify-start items-center gap-3">
        {/* Ready to try? Badge */}
        <Badge color="primary">Ready to try?</Badge>
        
        {/* Heading Content */}
        <div className="w-full max-w-[644px] flex flex-col justify-start items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-center gap-3">
            <h2 className="self-stretch text-center text-black text-4xl md:text-5xl font-bold font-bricolage leading-tight">
              Stop guessing. <br />
              Start Building <span className="text-primary">Profit!</span>
            </h2>
            <p className="w-full max-w-sm mx-auto text-center text-black/60 text-sm font-normal font-sans leading-relaxed">
              Join 3,200+ construction business that know exactly where every dollar goes.
            </p>
          </div>
          
          {/* Action button */}
          <div className="flex justify-center items-start gap-3">
            <Link href="/login">
              <Button
                variant="default"
                rightIcon="https://cdn.lordicon.com/jarmuava.json"
                rightIconState="hover-slide"
              >
                Get started free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
