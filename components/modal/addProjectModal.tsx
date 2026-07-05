'use client';

import React, { useState } from 'react';
import { Button } from '../button';
import { IconButton } from '../iconButton';
import { InputBox } from '../inputBox';
import { Dropdown } from '../dropdown';
import { LordIcon } from '../lord-icon';
import { DatePicker } from '../datePicker';

interface AddProjectModalProps {
  onClose: () => void;
  onAddProject: (project: {
    name: string;
    client: string;
    budget: number;
    spent: number;
    margin: string;
    manager: string;
    status: string;
    statusColor: string;
  }) => void;
}

export function AddProjectModal({ onClose, onAddProject }: AddProjectModalProps) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [address, setAddress] = useState('');
  const [budget, setBudget] = useState('');
  const [manager, setManager] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !client.trim() || !budget.trim() || !manager.trim()) {
      alert('Please fill in all required fields (Project Name, Client, Budget, and Manager)');
      return;
    }

    const numBudget = parseFloat(budget);
    if (isNaN(numBudget) || numBudget <= 0) {
      alert('Please enter a valid budget amount');
      return;
    }

    onAddProject({
      name: name.trim(),
      client: client.trim(),
      budget: numBudget,
      spent: 0,
      margin: '100%', // brand new project has 100% margin remaining
      manager: manager.trim(),
      status: 'Active',
      statusColor: 'bg-green-100 text-lime-600',
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
                  src="https://cdn.lordicon.com/piurhpdv.json" // Folder icon
                  size={24}
                  colors="primary:#110D31"
                  trigger="hover"
                />
                <span className="text-black text-2xl font-semibold font-bricolage">Add Project</span>
              </div>
            </div>
            <span className="text-black/60 text-sm font-normal font-sans">
              Set up a new construction or renovation project.
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

          {/* Row 1: Project Name & Client Name */}
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Project Name*</span>
              <InputBox
                variant="gray"
                placeholder="e.g. Villa ABC"
                value={name}
                onChange={(e) => setName(e.target.value)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Client Name*</span>
              <InputBox
                variant="gray"
                placeholder="e.g. The ABC Group"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>
          </div>

          {/* Site Address */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <span className="text-black text-sm font-semibold font-bricolage">Site Address</span>
            <InputBox
              variant="gray"
              placeholder="Full site address, Indonesia.."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              containerClassName="w-full"
              className="w-full"
            />
          </div>

          <div className="self-stretch h-px bg-white80"></div>

          {/* Row 2: Total Budget & Project Manager */}
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Total Budget (USD)*</span>
              <InputBox
                variant="gray"
                placeholder="0.00"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <span className="text-black text-sm font-semibold font-bricolage">Project Manager*</span>
              <Dropdown
                variant="gray"
                placeholder="Pick a Project Manager"
                options={['John Doe', 'Jane Smith', 'Tora Tyson', 'Alex Rivera']}
                value={manager}
                onChange={(val) => setManager(val)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>
          </div>

          {/* Row 3: Start Date & Expected End Date */}
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1">
              <DatePicker
                label="Start Date*"
                variant="gray"
                placeholder="Pick Start Date"
                value={startDate}
                onChange={(val) => setStartDate(val)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>

            <div className="flex-1">
              <DatePicker
                label="Expected End Date*"
                variant="gray"
                placeholder="Pick End Date"
                value={endDate}
                onChange={(val) => setEndDate(val)}
                containerClassName="w-full"
                className="w-full"
              />
            </div>
          </div>

        </div>

        {/* Go AI Automation Callout Banner */}
        <div className="self-stretch p-3 bg-linear-to-b from-white from-85% to-red-50 rounded-3xl border border-orange-200 hover:border-primary transition-colors duration-200 flex flex-col justify-start items-start w-full add-project-ai-card">
          <div className="self-stretch inline-flex justify-between items-center w-full">
            <div className="flex justify-start items-center gap-2">
              <div className="size-8 flex justify-center items-center shrink-0">
                <LordIcon
                  src="https://cdn.lordicon.com/rhovcpjk.json"
                  size={24}
                  colors="primary:#f98b4c"
                  trigger="loop"
                  state="loop-line"
                  target=".add-project-ai-card"
                />
              </div>
              <span className="text-black text-base font-semibold font-bricolage">Go AI Will Automatically</span>
            </div>
          </div>
          <div className="self-stretch text-black/60 text-sm font-normal font-sans leading-relaxed">
            Start tracking expenses as soon as you save.
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
            rightIconState='hover-rotation'
          >
            Add Project
          </Button>
        </div>

      </div>
    </div>
  );
}
