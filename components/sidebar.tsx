'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { LordIcon } from './lord-icon';

interface SidebarProps {
    activeMenu?: string;
    onChangeMenu?: (menu: string) => void;
    className?: string;
}

export function Sidebar({
    activeMenu = 'dashboard',
    onChangeMenu,
    className = '',
}: SidebarProps) {
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: 'https://cdn.lordicon.com/htwehhiw.json',
            iconState: 'hover',
        },
        {
            id: 'projects',
            label: 'Projects',
            icon: 'https://cdn.lordicon.com/piurhpdv.json',
        },
        {
            id: 'expenses',
            label: 'Expenses',
            icon: 'https://cdn.lordicon.com/qfkpvtbg.json',
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: 'https://cdn.lordicon.com/jqqjtvlf.json',
            iconState: 'hover-file-2',
        },
        {
            id: 'ai-insight',
            label: 'Go AI Insight',
            icon: 'https://cdn.lordicon.com/pkpmdwkx.json',
        },
    ];

    const heightClass = className.includes('h-') ? '' : 'h-[687px]';

    return (
        <div
            className={`w-64 ${heightClass} p-4 bg-white rounded-[32px] border border-neutral-200 flex flex-col items-start shrink-0 ${className}`}
        >
            <div className="self-stretch flex flex-col justify-start items-start gap-8 w-full">
                {/* Brand Logo Header */}
                <div className="self-stretch px-4 py-2 flex flex-col justify-start items-start">
                    <Link href="/">
                        <img
                            src="/buildandgo_logo.png"
                            alt="Build and Go Logo"
                            className="w-[144px] h-[28px] object-contain cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Navigation Menu Buttons */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                    {menuItems.map((item) => {
                        const isActive = activeMenu === item.id;
                        const hrefMap: Record<string, string> = {
                            dashboard: '/dashboard',
                            projects: '/projects',
                            expenses: '/expenses',
                            reports: '/reports',
                            'ai-insight': '/ai-insight',
                        };
                        const href = hrefMap[item.id] || '/dashboard';

                        return (
                            <Link href={href} key={item.id} className="w-full">
                                <Button
                                    variant={isActive ? 'default' : 'ghost-black'}
                                    leftIcon={item.icon}
                                    leftIconState={item.iconState}
                                    iconTrigger="loop-on-hover"
                                    iconColor={isActive ? 'primary:#ffffff' : 'primary:#110D31'}
                                    className="w-full justify-start text-left font-sans text-sm gap-2.5 h-10 px-4 rounded-[100px] outline-none"
                                >
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* User Profile Footer */}
            <Link href="/login" className="self-stretch block w-full mt-auto">
                <div className="self-stretch px-3 py-2.5 bg-neutral-100 hover:bg-white hover:shadow-xs transition-all duration-300 rounded-2xl border border-neutral-200 flex justify-between items-center cursor-pointer group w-full">
                    <div className="flex justify-start items-center gap-3">
                        {/* Circular avatar container with LordIcon profile avatar */}
                        <div className="w-8 h-8 rounded-full bg-white border border-white80 flex justify-center items-center shrink-0 shadow-xs overflow-hidden">
                            <LordIcon
                                src="https://cdn.lordicon.com/wqnekara.json"
                                size={24}
                                trigger="hover"
                                colors="primary:#ffc738,secondary:#f9c9c0,tertiary:#110d31,quaternary:#ebe6ef,quinary:#f98b4c,senary:#f98b4c"
                                target="div.group"
                            />
                        </div>
                        <div className="inline-flex flex-col justify-start items-start">
                            <div className="self-stretch justify-start text-black text-sm font-semibold font-bricolage">
                                Tora Tyson
                            </div>
                            <div className="justify-start text-primary text-xs font-semibold font-sans">
                                Professional
                            </div>
                        </div>
                    </div>

                    {/* Profile/Logout settings icon */}
                    <div className="size-5 shrink-0 flex justify-center items-center">
                        <LordIcon
                            src="https://cdn.lordicon.com/tcbrnqze.json"
                            size={18}
                            colors="primary:#110D31"
                            trigger="hover"
                            target="div.group"
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
}
