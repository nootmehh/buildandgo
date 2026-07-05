'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './button';

export function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-white outline -outline-offset-1 outline-white80 px-6 md:px-12 py-4 flex justify-between items-center z-50">
      {/* Brand Logo */}
      <Link href="/" className="w-36 h-7 shrink-0 flex items-center">
        <img
          src="/buildandgo_logo.png"
          alt="Build and Go Logo"
          className="w-[144px] h-[28px] object-contain cursor-pointer"
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex justify-start items-center gap-2">
        <Link href="#features">
          <Button
            variant="ghost-black"
            leftIcon="https://cdn.lordicon.com/wbvqtfif.json"
          >
            Features
          </Button>
        </Link>

        <Link href="#testimonials">
          <Button
            variant="ghost-black"
            leftIcon="https://cdn.lordicon.com/gfmnqjba.json"
          >
            Testimonials
          </Button>
        </Link>

        <Link href="#pricing">
          <Button
            variant="ghost-black"
            leftIcon="https://cdn.lordicon.com/qfkpvtbg.json"
          >
            Pricing
          </Button>
        </Link>


      </div>

      {/* Action Button */}
      <Link href="/login">
        <Button
          variant="default"
          rightIcon="https://cdn.lordicon.com/jarmuava.json"
          rightIconState="hover-slide"
        >
          Get Started
        </Button>
      </Link>
    </nav>
  );
}
