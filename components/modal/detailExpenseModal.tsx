'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../button';
import { IconButton } from '../iconButton';
import { LordIcon } from '../lord-icon';
import { Badge } from '../badge';

interface DetailExpenseModalProps {
    expense: {
        date: string;
        vendor: string;
        category: string;
        project: string;
        amount: number;
        status: string;
        categoryColor: string;
        statusColor: string;
        receiptNo?: string;
        invoiceRef?: string;
        notes?: string;
    };
    onClose: () => void;
}

export function DetailExpenseModal({ expense, onClose }: DetailExpenseModalProps) {
    const [isReady, setIsReady] = useState(false);

    // Defer LordIcon mounting so they don't compete with the panel paint
    useEffect(() => {
        const t = setTimeout(() => setIsReady(true), 200);
        return () => clearTimeout(t);
    }, []);

    const handleClose = useCallback(() => onClose(), [onClose]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <div
            className="fixed inset-0 z-50 flex justify-end items-stretch select-none"
            style={{ animation: 'fade-in 0.2s ease-out forwards' }}
            onClick={handleClose}
        >
            {/* Blur backdrop — isolated layer so it never causes scroll repaint */}
            <div
                className="absolute inset-0 bg-white/20"
                style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
            />

            {/* Panel */}
            <div
                className="relative w-[640px] h-screen bg-white90 border-l border-white80 flex flex-col justify-start items-start shadow-lg"
                style={{ contain: 'layout style' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top Navbar */}
                <div className="flex-none self-stretch px-6 py-4 bg-white border-b border-white80 inline-flex justify-between items-center w-full">
                    <Button
                        variant="ghost-black"
                        onClick={handleClose}
                        leftIcon="https://cdn.lordicon.com/hjashvmz.json"
                        iconTrigger="hover"
                        className="font-bricolage font-semibold text-sm text-black"
                    >
                        Back to Expenses
                    </Button>
                    <IconButton
                        variant="gray"
                        icon="https://cdn.lordicon.com/xsjhqecw.json"
                        iconColor="primary:#110D31"
                        onClick={handleClose}
                        state="hover-slide"
                        className="rounded-xl border border-white80 shrink-0"
                    />
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 self-stretch p-6 bg-white90 flex flex-col justify-start items-start gap-4 overflow-y-auto overscroll-contain w-full">

                    {/* Card 1: Amount & Vendor Header */}
                    <div className="self-stretch p-4 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-start items-start gap-3 w-full opacity-0 animate-fade-in-up animation-delay-100 detail-amount-card">
                        <div className="self-stretch flex flex-col justify-start items-start gap-1">
                            <div className="self-stretch inline-flex justify-start items-center gap-2">
                                <div className="size-5 flex justify-center items-center shrink-0">
                                    {isReady && (
                                        <LordIcon
                                            src="https://cdn.lordicon.com/qfkpvtbg.json"
                                            size={20}
                                            colors="primary:#f98b4c"
                                            trigger="hover"
                                            target=".detail-amount-card"
                                        />
                                    )}
                                </div>
                                <span className="text-orange-400 text-2xl font-bold font-bricolage">
                                    {formatCurrency(expense.amount)}
                                </span>
                            </div>
                            <span className="text-black/60 text-xs font-normal font-sans">
                                {expense.vendor}
                            </span>
                        </div>
                        <div className="inline-flex justify-start items-start gap-2">
                            <Badge color="primary">{expense.category}</Badge>
                            <Badge color={expense.status === 'Approved' ? 'green' : expense.status === 'Pending' ? 'yellow' : 'red'}>
                                {expense.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Card 2: Expense Details Grid */}
                    <div className="self-stretch p-4 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-start items-start gap-4 w-full opacity-0 animate-fade-in-up animation-delay-150 detail-info-card">
                        <div className="self-stretch inline-flex justify-between items-center w-full">
                            <div className="flex justify-start items-center gap-2">
                                <div className="size-5 flex justify-center items-center shrink-0">
                                    {isReady && (
                                        <LordIcon
                                            src="https://cdn.lordicon.com/yhtmwrae.json"
                                            size={20}
                                            colors="primary:#110D31"
                                            trigger="hover"
                                            target=".detail-info-card"
                                        />
                                    )}
                                </div>
                                <span className="text-black text-base font-semibold font-bricolage">Expenses Details</span>
                            </div>
                        </div>
                        <div className="self-stretch h-px bg-white80" />

                        <div className="self-stretch flex flex-col justify-start items-stretch gap-3 w-full">
                            {/* Row 1: Date & Project */}
                            <div className="self-stretch inline-flex justify-start items-stretch gap-4 w-full">
                                <div className="flex-1 px-3 py-2.5 bg-white90 border border-white80 hover:border-white70 hover:bg-white80 transition-colors duration-150 rounded-2xl flex justify-start items-center gap-3 detail-date-subcard">
                                    <div className="size-5 flex justify-center items-center shrink-0">
                                        {isReady && (
                                            <LordIcon
                                                src="https://cdn.lordicon.com/uoljexdg.json"
                                                size={20}
                                                colors="primary:#110D31"
                                                trigger="hover"
                                                target=".detail-date-subcard"
                                            />
                                        )}
                                    </div>
                                    <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0">
                                        <span className="text-black text-sm font-semibold font-bricolage">Date</span>
                                        <span className="text-black/60 text-xs font-normal font-sans truncate">{expense.date}</span>
                                    </div>
                                </div>

                                <div className="flex-1 px-3 py-2.5 bg-white90 border border-white80 hover:border-white70 hover:bg-white80 transition-colors duration-150 rounded-2xl flex justify-start items-center gap-3 detail-project-subcard">
                                    <div className="size-5 flex justify-center items-center shrink-0">
                                        {isReady && (
                                            <LordIcon
                                                src="https://cdn.lordicon.com/piurhpdv.json"
                                                size={20}
                                                colors="primary:#110D31"
                                                trigger="hover"
                                                target=".detail-project-subcard"
                                            />
                                        )}
                                    </div>
                                    <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0">
                                        <span className="text-black text-sm font-semibold font-bricolage">Project</span>
                                        <span className="text-black/60 text-xs font-normal font-sans truncate">{expense.project}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Receipt No. & Invoice Ref. */}
                            <div className="self-stretch inline-flex justify-start items-stretch gap-4 w-full">
                                <div className="flex-1 px-3 py-2.5 bg-white90 border border-white80 hover:border-white70 hover:bg-white80 transition-colors duration-150 rounded-2xl flex justify-start items-center gap-3 detail-receiptno-subcard">
                                    <div className="size-5 flex justify-center items-center shrink-0">
                                        {isReady && (
                                            <LordIcon
                                                src="https://cdn.lordicon.com/svhkgnlk.json"
                                                size={20}
                                                colors="primary:#110D31"
                                                trigger="hover"
                                                target=".detail-receiptno-subcard"
                                            />
                                        )}
                                    </div>
                                    <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0">
                                        <span className="text-black text-sm font-semibold font-bricolage">Receipt No.</span>
                                        <span className="text-black/60 text-xs font-normal font-sans truncate">
                                            {expense.receiptNo || `EXP-2026-${String(expense.amount).substring(0, 3)}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 px-3 py-2.5 bg-white90 border border-white80 hover:border-white70 hover:bg-white80 transition-colors duration-150 rounded-2xl flex justify-start items-center gap-3 detail-invoice-subcard">
                                    <div className="size-5 flex justify-center items-center shrink-0">
                                        {isReady && (
                                            <LordIcon
                                                src="https://cdn.lordicon.com/jqqjtvlf.json"
                                                size={20}
                                                colors="primary:#110D31"
                                                trigger="hover"
                                                state='hover-file-2'
                                                target=".detail-invoice-subcard"
                                            />
                                        )}
                                    </div>
                                    <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0">
                                        <span className="text-black text-sm font-semibold font-bricolage">Invoice Ref.</span>
                                        <span className="text-black/60 text-xs font-normal font-sans truncate">
                                            {expense.invoiceRef || `INV-${expense.vendor.substring(0, 2).toUpperCase()}-2026`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Notes (Full Width) */}
                            <div className="self-stretch px-3 py-2.5 bg-white90 border border-white80 hover:border-white70 hover:bg-white80 transition-colors duration-150 rounded-2xl inline-flex justify-start items-center gap-3 w-full">
                                <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0 w-full">
                                    <span className="text-black text-sm font-semibold font-bricolage">Notes:</span>
                                    <span className="text-black/60 text-xs font-normal font-sans leading-relaxed">
                                        {expense.notes || 'Structural materials purchased for ground floor construction. Quality checks approved.'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Receipt Attachment */}
                    <div className="self-stretch p-4 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-colors duration-200 flex flex-col justify-start items-start gap-4 w-full opacity-0 animate-fade-in-up animation-delay-200 detail-receipt-card">
                        <div className="self-stretch inline-flex justify-between items-center w-full">
                            <div className="flex justify-start items-center gap-2">
                                <div className="size-5 flex justify-center items-center shrink-0">
                                    {isReady && (
                                        <LordIcon
                                            src="https://cdn.lordicon.com/cbxbmugr.json"
                                            size={20}
                                            colors="primary:#110D31"
                                            trigger="hover"
                                            target=".detail-receipt-card"
                                        />
                                    )}
                                </div>
                                <span className="text-black text-base font-semibold font-bricolage">Receipt File</span>
                            </div>
                        </div>
                        <div className="self-stretch h-px bg-white80" />

                        <div className="self-stretch p-4 bg-white90 border border-white80 rounded-2xl flex flex-col justify-center items-center gap-3 w-full detail-receipt-inner">
                            <div className="size-12 flex justify-center items-center shrink-0">
                                {isReady && (
                                    <LordIcon
                                        src="https://cdn.lordicon.com/tkxfbyiu.json"
                                        size={48}
                                        colors="primary:#f98b4c"
                                        trigger="hover"
                                        target=".detail-receipt-inner"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col justify-start items-center gap-0.5">
                                <span className="text-black text-sm font-semibold font-bricolage text-center">Receipt File</span>
                                <span className="text-black/60 text-xs font-normal font-sans text-center">Scanned using Go AI</span>
                            </div>
                            <Button
                                variant="default"
                                size="small"
                                leftIcon="https://cdn.lordicon.com/oxmjavzr.json"
                                iconTrigger="hover"
                                className="font-bricolage text-xs font-semibold"
                            >
                                View Full Receipt
                            </Button>
                        </div>
                    </div>

                    {/* Card 4: Go AI Analysis Card */}
                    <div className="self-stretch p-4 bg-linear-to-b from-white from-85% to-red-50 rounded-[32px] border border-orange-200 hover:border-primary transition-colors duration-200 flex flex-col justify-start items-start w-full opacity-0 animate-fade-in-up animation-delay-250 detail-ai-card">
                        <div className="self-stretch inline-flex justify-between items-center w-full">
                            <div className="flex justify-start items-center gap-2">
                                <div className="size-8 flex justify-center items-center shrink-0">
                                    {isReady && (
                                        <LordIcon
                                            src="https://cdn.lordicon.com/rhovcpjk.json"
                                            size={24}
                                            colors="primary:#f98b4c"
                                            trigger="loop"
                                            state="loop-line"
                                            target=".detail-ai-card"
                                        />
                                    )}
                                </div>
                                <span className="text-black text-base font-semibold font-bricolage">Go AI Analysis</span>
                            </div>
                        </div>
                        <div className="self-stretch text-black/60 text-sm font-normal font-sans leading-relaxed">
                            Within typical threshold. Average similar purchase: $3,766. Category spend up 18% MTD.
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="flex-none self-stretch px-6 py-4 bg-white border-t border-white80 inline-flex justify-end items-center w-full">
                    <div className="inline-flex justify-start items-center gap-4">
                        <Button
                            variant="outline"
                            leftIcon="https://cdn.lordicon.com/jjjktlkk.json"
                            iconTrigger="hover"
                            className="font-bricolage text-sm font-semibold"
                        >
                            Edit Expenses
                        </Button>
                        <Button
                            variant="default"
                            leftIcon="https://cdn.lordicon.com/swqmjczo.json"
                            iconTrigger="hover"
                            className="font-bricolage text-sm font-semibold"
                        >
                            Mark as Paid
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
