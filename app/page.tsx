'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { Button } from "../components/button";
import { Navbar } from "../components/navbar";
import { HeroSection } from "../components/section/heroSection";
import { FeaturesSection } from "../components/section/featuresSection";
import { AISection } from "../components/section/AISection";
import { TestimonialSection } from "../components/section/testimonialSection";
import { PricingSection } from "../components/section/pricingSection";
import { ReminderSection } from "../components/section/reminderSection";
import { Footer } from "../components/footer";

// Reusable Intersection Observer wrapper for viewport scroll-triggered animations
function ScrollAnimate({
  children,
  animationClass = 'animate-fade-in-up',
  delayClass = '',
}: {
  children: React.ReactNode;
  animationClass?: string;
  delayClass?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay trigger slightly to allow scroll to settle and make animation more visible
          setTimeout(() => {
            setIsVisible(true);
          }, 150);
          observer.unobserve(entry.target); // Animate once
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={isVisible ? `${animationClass} ${delayClass}` : 'opacity-0'}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F6]">
      {/* Brand Navigation: Sticky, blurred glassmorphic header container */}
      <div className="sticky top-0 z-50 opacity-0 animate-fade-in-down w-full bg-white/80 backdrop-blur-md">
        <Navbar />
      </div>

      {/* Main Sections */}
      <main className="flex-1 flex flex-col">
        <ScrollAnimate animationClass="animate-fade-in-up" delayClass="animation-delay-100">
          <HeroSection />
        </ScrollAnimate>
        <ScrollAnimate animationClass="animate-fade-in-up">
          <FeaturesSection />
        </ScrollAnimate>
        <ScrollAnimate animationClass="animate-fade-in-up">
          <AISection />
        </ScrollAnimate>
        <ScrollAnimate animationClass="animate-fade-in-up">
          <TestimonialSection />
        </ScrollAnimate>
        <ScrollAnimate animationClass="animate-fade-in-up">
          <PricingSection />
        </ScrollAnimate>
        <ScrollAnimate animationClass="animate-fade-in-up">
          <ReminderSection />
        </ScrollAnimate>
      </main>

      {/* Footer Details */}
      <ScrollAnimate animationClass="animate-fade-in-up">
        <Footer />
      </ScrollAnimate>
    </div>
  );
}
