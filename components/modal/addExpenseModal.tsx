'use client';

import React, { useState } from 'react';
import { Button } from '../button';
import { IconButton } from '../iconButton';
import { InputBox } from '../inputBox';
import { Dropdown } from '../dropdown';
import { LordIcon } from '../lord-icon';

interface AddExpenseModalProps {
  onClose: () => void;
  onAddExpense: (expense: {
    date: string;
    vendor: string;
    category: string;
    project: string;
    amount: number;
    status: string;
    categoryColor: string;
    statusColor: string;
  }) => void;
}

export function AddExpenseModal({ onClose, onAddExpense }: AddExpenseModalProps) {
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Materials');
  const [project, setProject] = useState('');
  const [notes, setNotes] = useState('');

  // Map category to styles/colors matching the mock database configurations
  const categoryColorMap: Record<string, string> = {
    Materials: 'bg-rose-100 text-orange-400',
    Labour: 'bg-amber-300/20 text-amber-300',
    Subcontractor: 'bg-blue-500/20 text-blue-500',
    Permits: 'bg-lime-600/20 text-lime-600',
  };

  const handleSubmit = () => {
    if (!vendor.trim() || !amount.trim() || !project.trim()) {
      alert('Please fill in all required fields (Vendor, Amount, and Project)');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Generate formatted date (e.g. "02 Jul 2026")
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    onAddExpense({
      date: formattedDate,
      vendor: vendor.trim(),
      category: category,
      project: project.trim(),
      amount: numAmount,
      status: 'Pending',
      categoryColor: categoryColorMap[category] || 'bg-neutral-100 text-black',
      statusColor: 'bg-rose-100 text-orange-400', // default style for 'Pending'
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center select-none"
      style={{ animation: 'fade-in 0.2s ease-out forwards' }}
      onClick={onClose}
    >
      {/* Blur backdrop — isolated layer so it never causes scroll repaint */}
      <div
        className="absolute inset-0 bg-white/20"
        style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
      />

      {/* Modal Container */}
      <div
        className="relative w-[640px] p-6 bg-white rounded-[32px] border border-white80 flex flex-col justify-start items-start gap-6 shadow-lg animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Block */}
        <div className="self-stretch inline-flex justify-start items-center gap-4">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="flex justify-start items-center gap-2">
                <LordIcon
                  src="https://cdn.lordicon.com/qfkpvtbg.json" // Calculator/cash icon
                  size={24}
                  colors="primary:#110D31"
                  trigger="hover"
                />
                <span className="text-black text-2xl font-semibold font-bricolage">Add Expense</span>
              </div>
            </div>
            <span className="text-black/60 text-sm font-normal font-sans">
              Capture a new expense for your active projects.
            </span>
          </div>
          
          <IconButton
            variant="gray"
            icon="https://cdn.lordicon.com/xsjhqecw.json" // Close icon
            iconColor="primary:#110D31"
            onClick={onClose}
            state="hover-slide"
            className="rounded-xl border border-white80 shrink-0"
          />
        </div>

        <div className="self-stretch h-px bg-white80"></div>

        {/* Input Form Fields */}
        <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
          
          {/* Row 1: Vendor & Amount */}
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Vendor Name*</span>
              <InputBox
                variant="gray"
                placeholder="e.g. Home Depot"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>
            
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Amount (USD)*</span>
              <InputBox
                variant="gray"
                placeholder="0.00"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>
          </div>

          {/* Row 2: Category & Project */}
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Category*</span>
              <Dropdown
                variant="gray"
                placeholder="Select Category"
                options={['Materials', 'Labour', 'Subcontractor', 'Permits']}
                value={category}
                onChange={(val) => setCategory(val)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Project*</span>
              <Dropdown
                variant="gray"
                placeholder="Pick a Project"
                options={['Sentosa Villa', 'Woodlands Crossing', 'Jurong East Hub', 'Bedok Reno Hub', 'Tampines HQ Reno']}
                value={project}
                onChange={(val) => setProject(val)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>
          </div>

          {/* Notes (Optional) */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <span className="text-black text-sm font-semibold font-bricolage">Notes (Optional)</span>
            <InputBox
              variant="gray"
              placeholder="Brief Description.."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              containerClassName="w-full"
              className="w-full"
            />
          </div>

        </div>

        <div className="self-stretch h-px bg-white80"></div>

        {/* Action Buttons */}
        <div className="self-stretch inline-flex justify-end items-center gap-4">
          <Button
            variant="outline"
            size="default"
            onClick={onClose}
            className="w-36 justify-center"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleSubmit}
            className="justify-center"
            rightIcon="https://cdn.lordicon.com/swqmjczo.json" // plus/edit icon
            iconTrigger="hover"
            rightIconState="hover-rotation"
          >
            Add Expense
          </Button>
        </div>

      </div>
    </div>
  );
}
