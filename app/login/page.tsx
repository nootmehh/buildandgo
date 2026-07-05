'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/button';
import { InputBox } from '../../components/inputBox';
import { LordIcon } from '../../components/lord-icon';
import { GridPattern } from '../../components/ui/grid-pattern';

interface CarouselSlide {
  icon: string;
  colors: string;
  titlePartOrange: string;
  titlePartBlack: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    icon: 'https://cdn.lordicon.com/ejcofrht.json',
    colors: 'primary:#2ca58d,secondary:#f98b4c,tertiary:#b26836,quaternary:#ffffff,quinary:#ffc738,senary:#f9c9c0',
    titlePartOrange: 'Finance clarity ',
    titlePartBlack: 'for builders who mean business.',
    description: 'We help your construction business thrive financially.',
  },
  {
    icon: 'https://cdn.lordicon.com/hwxvzvhx.json',
    colors: 'primary:#ebe6ef,secondary:#110d31,tertiary:#f98b4c',
    titlePartOrange: 'Zero paperwork, ',
    titlePartBlack: '100% automated receipt extraction.',
    description: 'Extract totals, categories, vendors, and taxes automatically from any receipt.',
  },
  {
    icon: 'https://cdn.lordicon.com/pdgwlefy.json',
    colors: 'primary:#ebe6ef,secondary:#f84b4b,tertiary:#ffd84a,quaternary:#f98b4c,quinary:#110d31',
    titlePartOrange: 'Predict profits, ',
    titlePartBlack: 'not just expenses.',
    description: 'Know your real margin on each project the moment expenses are logged.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [key, setKey] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('tora@buildandgo.com');
  const [password, setPassword] = useState('test123');

  // Auto-scroll slides every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      setKey((prev) => prev + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeSlide, key]);

  const handleDotClick = (idx: number) => {
    setActiveSlide(idx);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-white90 flex flex-col lg:flex-row justify-start items-stretch overflow-hidden">

      {/* Left Column: Brand Mockup Slideshow */}
      <div className="hidden lg:flex flex-1 p-6 bg-white90 flex-col justify-center items-start gap-2.5 min-h-[400px] lg:min-h-screen">
        <div className="bg-linear-to-b from-[#F6F6F6] from-35% to-[#FFEBD7] self-stretch flex-1 p-8 md:p-12 rounded-[32px] outline -outline-offset-1 outline-white80 bg-white90 flex flex-col justify-center items-center gap-2 relative transition-all duration-300 overflow-hidden">

          {/* Active Slide Content */}
          <div className="flex flex-col items-center gap-3 max-w-[480px] text-center animate-fadeIn duration-500">
            <div className="flex justify-center items-center shrink-0">
              <LordIcon
                src={slides[activeSlide].icon}
                size={100}
                colors={slides[activeSlide].colors}
                trigger="loop"
              />
            </div>

            <div className="self-stretch flex flex-col gap-2">
              <h2 className="text-black text-3xl font-bold font-bricolage leading-tight">
                <span className="text-primary">{slides[activeSlide].titlePartOrange}</span>
                <span>{slides[activeSlide].titlePartBlack}</span>
              </h2>
              <p className="text-black/60 text-sm w-80 mx-auto text-center font-normal font-sans leading-relaxed">
                {slides[activeSlide].description}
              </p>
            </div>
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex justify-center items-center gap-2 h-4">
            {slides.map((_, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`relative cursor-pointer transition-all duration-300 ${isActive
                    ? 'w-8 h-1.5 bg-primary/10 rounded-full overflow-hidden'
                    : 'w-1.5 h-1.5 bg-primary/30 rounded-full hover:bg-primary/50'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {isActive && (
                    <div
                      key={key}
                      className="absolute left-0 top-0 bottom-0 bg-primary rounded-full animate-slide-progress"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Branding graphic footer */}
          <div className="w-24 h-7 shrink-0 flex items-center mt-3">
            <img
              src="/buildandgo_logo.png"
              alt="Build and Go Logo"
              className="w-[144px] h-[28px] object-contain"
            />
          </div>

        </div>
      </div>

      {/* Right Column: User Auth Form */}
      <div className="w-full lg:w-[520px] bg-white outline -outline-offset-1 outline-white80 px-8 md:px-16 flex flex-col justify-center items-center lg:items-start gap-8 py-12 lg:py-0">

        <div className="w-full max-w-[384px] flex flex-col gap-8">
          {/* Back Link */}
          <Link href="/" className="self-start">
            <Button variant="ghost-black" leftIcon="https://cdn.lordicon.com/hjashvmz.json" leftIconState="hover-slide" className="-ml-3">
              Back to Landing Page
            </Button>
          </Link>

          {/* Login Core Forms */}
          <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h1 className="text-black text-3xl font-bold font-bricolage leading-none">Welcome Back</h1>
              <div className="text-black/60 text-sm font-normal font-sans">
                Sign in to your <span className="font-semibold font-bricolage text-black">Build&</span><span className="font-semibold font-bricolage text-primary">Go</span> account.
              </div>
            </div>

            <div className="w-full h-px bg-white80"></div>

            {/* Email input field */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-black text-sm font-semibold font-bricolage">Your email</label>
              <InputBox
                variant="gray"
                placeholder="your@mail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>

            {/* Password input field */}
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-black text-sm font-semibold font-bricolage">Password</label>
                <InputBox
                  variant="gray"
                  placeholder="Fill your password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightIcon="https://cdn.lordicon.com/oxmjavzr.json"
                  iconTrigger="click"
                  iconColor="primary:#110d31"
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  containerClassName="w-full"
                  className="w-full"
                />
              </div>
              <div className="text-right text-primary text-sm font-semibold font-bricolage cursor-pointer hover:underline">
                Forget Password?
              </div>
            </div>

            <div className="w-full h-px bg-white80"></div>

            {/* Sign In Trigger Button */}
            <Link href="/dashboard" className="w-full">
              <Button variant="default" className="w-full justify-center">
                Sign In
              </Button>
            </Link>

            <div className="text-center text-sm font-sans text-black/60">
              Don’t have an account?{' '}
              <span className="text-primary font-semibold font-bricolage cursor-pointer hover:underline">
                Sign Up Here
              </span>
            </div>

            <div className="w-full h-px bg-white80"></div>
          </div>
        </div>

        {/* Alternate Login Actions */}
        <div className="group w-full max-w-[384px] p-6 bg-white90 rounded-3xl outline -outline-offset-1 outline-white80 flex flex-col items-center gap-4">
          <div className="self-stretch flex items-center gap-2 text-black font-bricolage font-semibold text-base">
            <LordIcon
              src="https://cdn.lordicon.com/ztarzlqa.json"
              size={20}
              colors="primary:#110D31"
              trigger="hover"
              target="div.group"
            />
            <span>Login Another Way</span>
          </div>

          <div className="w-full h-px bg-white80"></div>

          {/* Google Login button */}
          <Link href="/dashboard" className="w-full">
            <Button
              variant="white"
              className="w-full justify-center text-black font-semibold font-bricolage text-sm gap-2"
              leftIcon="https://cdn.lordicon.com/eziplgef.json"
              iconTrigger="hover"
              iconColor="primary:#f84b4b,secondary:#2ca58d,tertiary:#4bb3fd,quaternary:#ffc738,quinary:#ebe6ef"
              onClick={() => router.push('/dashboard')}
            >
              Continue with Google
            </Button>
          </Link>

          {/* GitHub Login button */}
          <Link href="/dashboard" className="w-full">
            <Button
              variant="white"
              className="w-full justify-center text-black font-semibold font-bricolage text-sm gap-2"
              leftIcon="https://cdn.lordicon.com/ioihllwu.json"
              iconTrigger="hover"
              leftIconState="hover-roll"
              iconColor="primary:#e4e4e4,secondary:#3a3347"
              onClick={() => router.push('/dashboard')}
            >
              Continue with Github
            </Button>
          </Link>
        </div>

      </div>

    </div>
  );
}
