'use client';

import React from 'react';
import { Badge } from '../badge';
import { LordIcon } from '../lord-icon';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Switching to Build&Go was a game changer. Our team is more productive and month-end reporting is seamless.",
    name: "Samantha Lee",
    role: "Finance Manager, Horizon Tech Solutions",
  },
  {
    quote: "The intuitive interface and powerful automation saved us countless hours each month. Highly recommend Build&Go!",
    name: "Rajesh Kumar",
    role: "CFO, BrightWave Inc.",
  },
  {
    quote: "With Build&Go, we reduced errors and sped up our closing process by 50%. The support team is fantastic too.",
    name: "Lena Ortiz",
    role: "Accounting Lead, Greenfield Enterprises",
  },
  {
    quote: "Build&Go’s analytics tools gave us insights that helped optimize cash flow and improve financial planning.",
    name: "David Chen",
    role: "Chief Accountant, Nova Logistics",
  },
  {
    quote: "Finally, a platform that understands construction workflows. Managing material receipts and payroll has never been this easy.",
    name: "Marcus Vance",
    role: "Founder, Vance Builders Group",
  },
];

export function TestimonialSection() {
  const quoteIcon = 'https://cdn.lordicon.com/swsgduma.json';

  // Highlight brand name 'Build&Go' with custom styling
  const renderQuote = (text: string) => {
    const parts = text.split(/(Build&Go)/g);
    return parts.map((part, idx) => {
      if (part === 'Build&Go') {
        return (
          <span key={idx} className="text-black text-sm font-semibold font-bricolage">
            Build&Go
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <section className="w-full bg-white outline -outline-offset-1 outline-white80 py-12 flex flex-col justify-start items-center gap-8 overflow-hidden">
      {/* Title Header */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-36 flex flex-col justify-start items-start gap-3">
        <Badge color="primary">Social Proof</Badge>
        <h2 className="self-stretch text-black text-4xl md:text-5xl font-bold font-bricolage leading-tight">
          Trusted by builders <br />
          across the region.
        </h2>
      </div>

      {/* Infinite Testimonial Ticker Row */}
      <div className="w-full relative overflow-hidden py-4">
        {/* Ambient fade-out overlays for modern aesthetic */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Ticker scrolling track */}
        <div className="flex w-max gap-6 animate-marquee-right hover:paused px-4">
          
          {/* First set of testimonials */}
          {testimonials.map((t, idx) => (
            <div
              key={`t1-${idx}`}
              className="group w-80 h-72 p-6 bg-white90 rounded-3xl outline -outline-offset-1 outline-white80 flex flex-col justify-between items-start transition-all hover:bg-white hover:shadow-xs cursor-default shrink-0"
            >
              <LordIcon
                src={quoteIcon}
                size={40}
                colors="primary:#F98B4C"
                trigger="hover"
                state="hover-erase"
                target="div"
                className="shrink-0"
              />
              <p className="self-stretch text-black/60 text-sm font-normal font-sans leading-relaxed">
                {renderQuote(t.quote)}
              </p>
              <div className="flex justify-start items-center gap-3">
                <div className="w-1 self-stretch bg-primary rounded-full min-h-[40px]"></div>
                <div className="flex flex-col justify-start items-start">
                  <div className="text-primary text-base font-semibold font-bricolage leading-tight">
                    {t.name}
                  </div>
                  <div className="text-black/60 text-xs font-normal font-sans leading-none mt-1">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicated set for seamless loop scrolling */}
          {testimonials.map((t, idx) => (
            <div
              key={`t2-${idx}`}
              className="group w-80 h-72 p-6 bg-white90 rounded-3xl outline -outline-offset-1 outline-white80 flex flex-col justify-between items-start transition-all hover:bg-white hover:shadow-xs cursor-default shrink-0"
            >
              <LordIcon
                src={quoteIcon}
                size={40}
                colors="primary:#F98B4C"
                trigger="hover"
                state="hover-erase"
                target="div"
                className="shrink-0"
              />
              <p className="self-stretch text-black/60 text-sm font-normal font-sans leading-relaxed">
                {renderQuote(t.quote)}
              </p>
              <div className="flex justify-start items-center gap-3">
                <div className="w-1 self-stretch bg-primary rounded-full min-h-[40px]"></div>
                <div className="flex flex-col justify-start items-start">
                  <div className="text-primary text-base font-semibold font-bricolage leading-tight">
                    {t.name}
                  </div>
                  <div className="text-black/60 text-xs font-normal font-sans leading-none mt-1">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
