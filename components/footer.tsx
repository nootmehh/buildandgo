'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { IconButton } from './iconButton';
import { InputBox } from './inputBox';
import { LordIcon } from './lord-icon';

export function Footer() {
    return (
        <footer className="w-full bg-linear-to-b from-white from-85% to-red-50 rounded-t-[32px] outline -outline-offset-1 outline-low py-14 z-10">
            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20 flex flex-col justify-start items-center gap-8 overflow-hidden">
                <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12">

                    {/* Left Side: Brand and Contacts */}
                    <div className="flex-1 flex flex-col justify-start items-start gap-6">
                        <Link href="/" className="w-36 h-7 shrink-0 flex items-center">
                            <img
                                src="/buildandgo_logo.png"
                                alt="Build and Go Logo"
                                className="w-[144px] h-[28px] object-contain cursor-pointer"
                            />
                        </Link>
                        <div className="self-stretch text-black text-2xl font-semibold font-bricolage leading-snug">
                            We help your construction <br />
                            business thrive financially.
                        </div>

                        <div className="flex flex-col justify-start items-start gap-2">
                            <div className="text-black/40 text-sm font-semibold font-bricolage">
                                Get in Track
                            </div>
                            <div className="flex flex-col justify-center items-start gap-3">
                                <div className="group rounded-[100px] inline-flex justify-start items-center gap-1.5">
                                    <LordIcon
                                        src="https://cdn.lordicon.com/aynysgyl.json"
                                        size={20}
                                        colors="primary:#110D31"
                                        target="div"
                                        className="shrink-0 opacity-60"
                                    />
                                    <span className="text-black/60 text-sm font-semibold font-bricolage">
                                        info@buildandgo.com
                                    </span>
                                </div>

                                <div className="group rounded-[100px] inline-flex justify-start items-center gap-1.5">
                                    <LordIcon
                                        src="https://cdn.lordicon.com/wtywrnoz.json"
                                        size={20}
                                        colors="primary:#110D31"
                                        target="div"
                                        className="shrink-0 opacity-60"
                                    />
                                    <span className="text-black/60 text-sm font-semibold font-bricolage">
                                        +12 1572 8721
                                    </span>
                                </div>

                                <div className="group rounded-[100px] inline-flex justify-start items-center gap-1.5">
                                    <LordIcon
                                        src="https://cdn.lordicon.com/innuazqa.json"
                                        size={20}
                                        colors="primary:#110D31"
                                        target="div"
                                        state="hover-jump"
                                        className="shrink-0 opacity-60"
                                    />
                                    <span className="text-black/60 text-sm font-semibold font-bricolage">
                                        Jakarta, Indonesia
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Links and Subscription */}
                    <div className="flex flex-col md:flex-row justify-start items-start gap-12 lg:gap-24">

                        {/* Menus Column */}
                        <div className="w-32 flex flex-col justify-start items-start gap-1">
                            <div className="self-stretch text-black/40 text-sm font-semibold font-bricolage">
                                Menus
                            </div>
                            <div className="self-stretch flex flex-col justify-center items-start gap-2">
                                <Link href="#about">
                                    <Button
                                        variant="ghost-black"
                                        leftIcon="https://cdn.lordicon.com/gqfozvrp.json"
                                        className="w-full justify-start animate-none"
                                    >
                                        About
                                    </Button>
                                </Link>
                                <Link href="#features">
                                    <Button
                                        variant="ghost-black"
                                        leftIcon="https://cdn.lordicon.com/wbvqtfif.json"
                                        className="w-full justify-start animate-none"
                                    >
                                        Features
                                    </Button>
                                </Link>
                                <Link href="#pricing">
                                    <Button
                                        variant="ghost-black"
                                        leftIcon="https://cdn.lordicon.com/qfkpvtbg.json"
                                        className="w-full justify-start animate-none"
                                    >
                                        Pricing
                                    </Button>
                                </Link>
                                <Link href="#faq">
                                    <Button
                                        variant="ghost-black"
                                        leftIcon="https://cdn.lordicon.com/lijglgpd.json"
                                        className="w-full justify-start animate-none"
                                    >
                                        FAQ
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Socials & Subscription Column */}
                        <div className="flex-1 flex flex-col justify-start items-start gap-8">

                            {/* Social Media */}
                            <div className="flex flex-col justify-start items-start gap-1">
                                <div className="text-black/40 text-sm font-semibold font-bricolage">
                                    Social Media
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <IconButton
                                        variant="gray"
                                        icon="https://cdn.lordicon.com/wbuzyhjx.json"
                                        iconColor="primary:#ebe6ef,secondary:#f98b4c,tertiary:#ffc7a7,quaternary:#ffffff"
                                        state="hover-rotate"
                                    />
                                    <IconButton
                                        variant="gray"
                                        icon="https://cdn.lordicon.com/fgctxlnd.json"
                                        iconColor="primary:#F98B4C"
                                        state="hover-draw"
                                    />
                                    <IconButton
                                        variant="gray"
                                        icon="https://cdn.lordicon.com/cbxaxfqs.json"
                                        iconColor="primary:#F98B4C"
                                    />
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="self-stretch flex flex-col justify-start items-start gap-1">
                                <div className="text-black/40 text-sm font-semibold font-bricolage">
                                    Subscribe to our newsletter
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <InputBox
                                        variant="gray"
                                        placeholder="your@mail.com"
                                        containerClassName="w-60"
                                    />
                                    <Button
                                        variant="default"
                                        leftIcon="https://cdn.lordicon.com/wbvqtfif.json"
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                            </div>

                            {/* Copyright */}
                            <div className="text-black/40 text-sm font-semibold font-bricolage pt-4">
                                © 2025 Build&Go. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch h-0 outline-[0.80px] outline-offset-[-0.40px] outline-white80"></div>
            </div>
        </footer>
    );
}
