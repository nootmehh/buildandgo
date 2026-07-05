'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '../badge';
import { LordIcon } from '../lord-icon';

export function AISection() {
    const analysisIcon = 'https://cdn.lordicon.com/rhovcpjk.json';
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
        <section ref={sectionRef} className="w-full flex flex-col py-16 justify-start items-center overflow-hidden">
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-36 flex flex-col lg:flex-row justify-between items-center">

                {/* Left Side: Copy and Title */}
                <div className={`w-full lg:w-[560px] flex flex-col justify-start items-start gap-3 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <Badge color="primary">Go AI Intelligence</Badge>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-black text-4xl md:text-5xl font-bold font-bricolage leading-tight">
                            Your AI financial <br />
                            advisor, always on.
                        </h2>
                        <p className="text-black/60 text-sm font-normal font-sans leading-relaxed max-w-[480px] mt-2">
                            Ask GO AI anything about your finances. &ldquo;Which project is over budget?&rdquo; &ldquo;What&apos;s my cash position next month?&rdquo; Get answers instantly!
                        </p>
                    </div>
                </div>

                {/* Right Side: Interactive AI Dashboard mockups */}
                <div className="w-full lg:w-[472px] flex flex-col justify-start items-stretch gap-3">

                    {/* AI Analyzing Status Indicator */}
                    <div className={`flex justify-center items-center gap-2 ${isVisible ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
                        <LordIcon
                            src={analysisIcon}
                            size={24}
                            colors="primary:#f98b4c"
                            trigger="loop"
                            state="loop-line"
                            className="shrink-0"
                        />
                        <div className="text-black text-sm font-semibold font-bricolage leading-tight">
                            Go AI <span className="font-normal font-sans text-black">is analyzing your projects</span>
                        </div>
                    </div>

                    {/* Cards Container */}
                    <div className="flex flex-col gap-3">

                        {/* Sentosa Villa (Over risk) */}
                        <div className={`p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col gap-3 hover:shadow-xs ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
                            <div className="flex justify-between items-center bg-white90 px-3 py-2.5 rounded-3xl border border-white80 gap-2">
                                <div className="text-black text-sm font-normal font-sans leading-none">
                                    Budget used for <span className="font-semibold font-bricolage">Sentosa Villa</span>
                                </div>
                                <Badge color="red" icon="https://cdn.lordicon.com/juujmrhr.json">Over risk</Badge>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-primary text-3xl font-bold font-bricolage">$124,200</div>
                                <div className="flex justify-between items-center text-black/60 text-sm font-normal font-sans">
                                    <span>Budgeted $140,000</span>
                                    <span className="font-semibold">87.2%</span>
                                </div>
                            </div>

                            {/* Progress track */}
                            <div className="w-full h-1.5 bg-white80 rounded-full overflow-hidden relative">
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-stateRed rounded-full transition-all duration-500"
                                    style={{ width: '87.2%' }}
                                ></div>
                            </div>
                        </div>

                        {/* Marina Bay Office (On Track) */}
                        <div className={`p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col gap-4 hover:shadow-xs ${isVisible ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
                            <div className="flex justify-between items-center bg-white90 px-3 py-2.5 rounded-3xl border border-white80 gap-2">
                                <div className="text-black text-sm font-normal font-sans leading-none">
                                    Budget used for <span className="font-semibold font-bricolage">Marina Bay Office</span>
                                </div>
                                <Badge color="green" icon="https://cdn.lordicon.com/uvofdfal.json">On Track</Badge>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-primary text-3xl font-bold font-bricolage">$86,500</div>
                                <div className="flex justify-between items-center text-black/60 text-sm font-normal font-sans">
                                    <span>Budgeted $170,000</span>
                                    <span className="font-semibold">48%</span>
                                </div>
                            </div>

                            {/* Progress track */}
                            <div className="w-full h-1.5 bg-white80 rounded-full overflow-hidden relative">
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-stateGreen rounded-full transition-all duration-500"
                                    style={{ width: '48%' }}
                                ></div>
                            </div>
                        </div>

                        {/* AI Insight Card */}
                        <div className={`p-6 bg-linear-to-b from-white from-85% to-red-50 rounded-[32px] outline -outline-offset-1 hover:outline-primary outline-primary/40 flex justify-start items-center gap-6 ${isVisible ? 'animate-fade-in-up animation-delay-400' : 'opacity-0'}`}>
                            <div className="size-16 bg-white90 rounded-2xl outline -outline-offset-1 outline-white80 flex justify-center items-center shrink-0">
                                <LordIcon
                                    src="https://cdn.lordicon.com/ubaspilq.json"
                                    size={52}
                                    colors="primary:#110d31,secondary:#ebe6ef,tertiary:#f98b4c,quaternary:#ffc7a7"
                                    trigger="hover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="text-primary text-base font-semibold font-bricolage leading-none">
                                    AI Insight
                                </div>
                                <p className="text-black text-sm font-normal font-sans leading-relaxed">
                                    Sentosa Villa is projected to exceed budget by <span className="font-semibold font-bricolage">$15,800</span> based on current speed velocity. Consider renegotiating the tiling subcontract.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
