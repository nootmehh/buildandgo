'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '../badge';
import { LordIcon } from '../lord-icon';

interface FeatureItem {
    icon: string;
    colors: string;
    trigger: string;
    state?: string;
    title: string;
    description: string;
    highlighted?: boolean;
}

const features: FeatureItem[] = [
    {
        icon: 'https://cdn.lordicon.com/xkluwebk.json',
        trigger: 'hover',
        colors: 'primary:#f98b4c,secondary:#ffc7a7',
        title: 'Live Budget Tracking',
        description: 'Real-time budget vs. actuals for every project phase. Get alerted before you overspend, not after.',
        highlighted: true,
    },
    {
        icon: 'https://cdn.lordicon.com/tkxfbyiu.json',
        trigger: 'hover',
        colors: 'primary:#f98b4c,secondary:#ebe6ef,tertiary:#110d31',
        title: 'AI Receipt Scanning',
        description: 'Snap a receipt, and our AI extracts vendor, amount, category, and project automatically.',
    },
    {
        icon: 'https://cdn.lordicon.com/wtewdzdl.json',
        trigger: 'hover',
        colors: 'primary:#f9c9c0,secondary:#f98b4c,tertiary:#ffc738',
        title: 'Financial Reports',
        description: 'One-click P&L, cost-per-project, and cash-flow statements formatted for accountants and clients alike.',
    },
    {
        icon: 'https://cdn.lordicon.com/skvwpjvd.json',
        trigger: 'hover',
        state: 'hover-slide',
        colors: 'primary:#f98b4c,secondary:#2ca58d,tertiary:#ffffff',
        title: 'AI Cost Forecasting',
        description: 'Predict project completion costs using historical data and live spend rates. Catch cost blowouts 3 weeks early.',
    },
    {
        icon: 'https://cdn.lordicon.com/bikwnzmg.json',
        trigger: 'hover',
        colors: 'primary:#f9c9c0,secondary:#f98b4c,tertiary:#ffffff',
        title: 'Subcontractor Manager',
        description: 'Track invoices, retentions, and payment schedules across all your subs in one unified ledger.',
    },
    {
        icon: 'https://cdn.lordicon.com/pdgwlefy.json',
        trigger: 'hover',
        colors: 'primary:#ebe6ef,secondary:#f84b4b,tertiary:#ffd84a,quaternary:#f98b4c,quinary:#110d31',
        title: 'Profit Margin Analysis',
        description: 'Know your real margin on each project the moment expenses are logged, not at project close.',
    },
];

// Stagger delays: top-left → bottom-right (100ms per step)
const cardDelays = [
    '',                    // card 0 – instant
    'animation-delay-100', // card 1
    'animation-delay-200', // card 2
    'animation-delay-300', // card 3
    'animation-delay-400', // card 4
    'animation-delay-500', // card 5
];

export function FeaturesSection() {
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
        <section ref={sectionRef} className="w-full bg-white outline -outline-offset-1 outline-white80 py-12 flex flex-col justify-start items-center gap-8 overflow-hidden">
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-36 flex flex-col gap-8">

                {/* Title Header */}
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                    <Badge color="primary">Core Features</Badge>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-black text-4xl md:text-5xl font-bold font-bricolage leading-tight">
                            Six features. <br />
                            Zero guesswork.
                        </h2>
                        <p className="text-black/60 text-sm font-normal font-sans leading-relaxed max-w-[480px] mt-1">
                            From jobsite receipt capture to board-ready P&L reports. Everything construction finance needs in one place.
                        </p>
                    </div>
                </div>

                {/* Top Cards Row */}
                <div className="w-full flex flex-col lg:flex-row gap-6 lg:pr-20">
                    {features.slice(0, 3).map((feature, idx) => (
                        <div
                            key={`top-${idx}`}
                            className={`flex-1 p-6 rounded-[32px] outline -outline-offset-1 flex flex-col justify-start items-start gap-5 transition-colors cursor-default
                                ${feature.highlighted
                                    ? 'bg-linear-to-b from-white from-85% to-red-50 outline-low hover:outline-primary'
                                    : 'bg-white90 outline-white80 hover:bg-white'}
                                ${isVisible ? `animate-fade-in-up ${cardDelays[idx]}` : 'opacity-0'}`}
                        >
                            {/* Icon Container */}
                            <div className="size-16 bg-white rounded-2xl outline -outline-offset-1 outline-white80 flex justify-center items-center shrink-0">
                                <LordIcon
                                    src={feature.icon}
                                    size={52}
                                    colors={feature.colors}
                                    trigger={feature.trigger}
                                    state={feature.state}
                                    target="div.flex-1"
                                />
                            </div>

                            {/* Card Divider */}
                            <div className="w-full h-px bg-white80"></div>

                            {/* Title & Description */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-black text-2xl font-semibold font-bricolage leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-black/60 text-sm font-normal font-sans leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Cards Row */}
                <div className="w-full flex flex-col lg:flex-row gap-6 lg:pl-20">
                    {features.slice(3, 6).map((feature, idx) => (
                        <div
                            key={`bottom-${idx}`}
                            className={`flex-1 p-6 rounded-[32px] outline -outline-offset-1 flex flex-col justify-start items-start gap-5 transition-colors cursor-default
                                ${feature.highlighted
                                    ? 'bg-linear-to-b from-white from-85% to-red-50 outline-low'
                                    : 'bg-white90 outline-white80 hover:bg-white'}
                                ${isVisible ? `animate-fade-in-up ${cardDelays[idx + 3]}` : 'opacity-0'}`}
                        >
                            {/* Icon Container */}
                            <div className="size-16 bg-white rounded-2xl outline -outline-offset-1 outline-white80 flex justify-center items-center shrink-0">
                                <LordIcon
                                    src={feature.icon}
                                    size={58}
                                    colors={feature.colors}
                                    trigger={feature.trigger}
                                    state={feature.state}
                                    target="div.flex-1"
                                />
                            </div>

                            {/* Card Divider */}
                            <div className="self-stretch h-0 outline outline-offset-[-0.5px] outline-white80"></div>

                            {/* Title & Description */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-black text-2xl font-semibold font-bricolage leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-black/60 text-sm font-normal font-sans leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
