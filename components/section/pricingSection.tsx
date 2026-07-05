'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../button';
import { Badge } from '../badge';
import { LordIcon } from '../lord-icon';

export function PricingSection() {
  const checkSrc = 'https://cdn.lordicon.com/uvofdfal.json';
  const checkColors = 'primary:#110D31';
  const checkTrigger = 'morph';
  const checkState = 'morph-select';

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col justify-start items-center py-16 gap-8 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-36 flex flex-col justify-start items-center gap-8">
        {/* Title block */}
        <div className="w-full max-w-[507px] flex flex-col justify-start items-center gap-3">
          <Badge color="primary">Services Pricing</Badge>
          <h2 className="self-stretch text-center text-black text-4xl md:text-5xl font-bold font-bricolage leading-tight">
            Simple, yet honest pricing
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="w-full flex flex-col lg:flex-row justify-start items-stretch gap-6">

          {/* Beginner Card */}
          <div className={`flex-1 p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-between gap-6 hover:shadow-xs ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex flex-col gap-5">
              <div>
                <Badge color="yellow">Beginner</Badge>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-primary text-3xl font-bold font-bricolage">$9.99</span>
                  <span className="text-black/60 text-sm font-normal font-sans">/month</span>
                </div>
                <p className="text-black/60 text-sm font-normal font-sans">
                  For solo contractors and small teams.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Up to <span className="text-primary font-medium">3 active</span> projects
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    AI receipt scanning
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Basic expense tracking
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Monthly PDF reports
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src="https://cdn.lordicon.com/ebyacdql.json"
                    size={20}
                    colors="primary:#F94C4C"
                    trigger="hover"
                    state="hover-cross-2"
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans line-through decoration-black/20 transition-colors group-hover:text-black/80">
                    AI forecasting
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <div className="w-full h-px bg-white80"></div>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Professional Card */}
          <div className={`flex-1 p-6 bg-linear-to-b from-white from-85% to-[#FFF8F4] rounded-[32px] border border-orange-200 hover:border-primary transition-all duration-300 flex flex-col justify-between gap-6 hover:shadow-xs ${isVisible ? 'animate-fade-in-up animation-delay-150' : 'opacity-0'}`}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <Badge color="primary">Professional</Badge>
                <Badge color="green" icon="https://cdn.lordicon.com/wbvqtfif.json">Best Deal</Badge>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-primary text-3xl font-bold font-bricolage">$24.99</span>
                  <span className="text-black/60 text-sm font-normal font-sans">/month</span>
                </div>
                <p className="text-black/60 text-sm font-normal font-sans">
                  For growing construction businesses.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Unlimited projects
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    AI receipt scanning
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Full expense tracking
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    AI cost forecasting
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Mobile App for Teams
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <div className="w-full h-px bg-white80"></div>
              <Link href="/login" className="w-full">
                <Button
                  variant="default"
                  rightIcon="https://cdn.lordicon.com/jarmuava.json"
                  rightIconState="hover-slide"
                  className="w-full"
                >
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Enterprise Card */}
          <div className={`flex-1 p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-between gap-6 hover:shadow-xs ${isVisible ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
            <div className="flex flex-col gap-5">
              <div>
                <Badge color="blue">Enterprise</Badge>
              </div>

              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-primary text-3xl font-bold font-bricolage">$99.99</span>
                  <span className="text-black/60 text-sm font-normal font-sans">/month</span>
                </div>
                <p className="text-black/60 text-sm font-normal font-sans">
                  For large contractors and developers.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Everything in <span className="text-primary font-medium">Professional</span>
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Custom AI Models
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    White-label reports
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    Dedicated CSM
                  </span>
                </div>

                <div className="group flex justify-start items-center gap-2 cursor-default">
                  <LordIcon
                    src={checkSrc}
                    size={20}
                    colors={checkColors}
                    trigger={checkTrigger}
                    state={checkState}
                    target="div"
                    className="shrink-0"
                  />
                  <span className="text-black/60 text-sm font-normal font-sans transition-colors group-hover:text-black">
                    API Access
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-4">
              <div className="w-full h-px bg-white80"></div>
              <Button
                variant="outline"
                rightIcon="https://cdn.lordicon.com/wtywrnoz.json"
                className="w-full"
              >
                Contact Sales
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
