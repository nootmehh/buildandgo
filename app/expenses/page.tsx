'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar';
import { Button } from '../../components/button';
import { LordIcon } from '../../components/lord-icon';
import { InputBox } from '../../components/inputBox';
import { IconButton } from '../../components/iconButton';
import { Dropdown } from '../../components/dropdown';
import { NotificationModal } from '../../components/modal/notificationModal';
import { AddExpenseModal } from '../../components/modal/addExpenseModal';
import { DetailExpenseModal } from '../../components/modal/detailExpenseModal';

// Initial mock expenses database
const initialExpenses = [
  {
    date: '20 Jun 2026',
    vendor: 'Home Depot',
    category: 'Materials',
    project: 'Sentosa Villa',
    amount: 4280,
    status: 'Approved',
    categoryColor: 'bg-rose-100 text-orange-400',
    statusColor: 'bg-blue-500/20 text-blue-500',
  },
  {
    date: '22 Jun 2026',
    vendor: 'Sunrise Carpentry',
    category: 'Labour',
    project: 'Sentosa Villa',
    amount: 3150,
    status: 'Pending',
    categoryColor: 'bg-amber-300/20 text-amber-300',
    statusColor: 'bg-rose-100 text-orange-400',
  },
  {
    date: '23 Jun 2026',
    vendor: 'Elite Subcontractors',
    category: 'Subcontractor',
    project: 'Sentosa Villa',
    amount: 6800,
    status: 'Approved',
    categoryColor: 'bg-blue-500/20 text-blue-500',
    statusColor: 'bg-blue-500/20 text-blue-500',
  },
  {
    date: '24 Jun 2026',
    vendor: 'City Permits Office',
    category: 'Permits',
    project: 'Sentosa Villa',
    amount: 1200,
    status: 'Approved',
    categoryColor: 'bg-lime-600/20 text-lime-600',
    statusColor: 'bg-blue-500/20 text-blue-500',
  },
  {
    date: '25 Jun 2026',
    vendor: 'Green Materials Co.',
    category: 'Materials',
    project: 'Sentosa Villa',
    amount: 2970,
    status: 'Pending',
    categoryColor: 'bg-rose-100 text-orange-400',
    statusColor: 'bg-rose-100 text-orange-400',
  },
  {
    date: '26 Jun 2026',
    vendor: 'Rapid Renovations',
    category: 'Labour',
    project: 'Sentosa Villa',
    amount: 4400,
    status: 'Approved',
    categoryColor: 'bg-amber-300/20 text-amber-300',
    statusColor: 'bg-blue-500/20 text-blue-500',
  },
  {
    date: '27 Jun 2026',
    vendor: 'Precision Plumbing',
    category: 'Subcontractor',
    project: 'Sentosa Villa',
    amount: 5300,
    status: 'Pending',
    categoryColor: 'bg-blue-500/20 text-blue-500',
    statusColor: 'bg-rose-100 text-orange-400',
  },
  {
    date: '28 Jun 2026',
    vendor: 'County Building Permits',
    category: 'Permits',
    project: 'Sentosa Villa',
    amount: 850,
    status: 'Approved',
    categoryColor: 'bg-lime-600/20 text-lime-600',
    statusColor: 'bg-blue-500/20 text-blue-500',
  },
  {
    date: '29 Jun 2026',
    vendor: 'Cement Solutions',
    category: 'Materials',
    project: 'Woodlands Crossing',
    amount: 9200,
    status: 'Approved',
    categoryColor: 'bg-rose-100 text-orange-400',
    statusColor: 'bg-blue-500/20 text-blue-500',
  },
  {
    date: '30 Jun 2026',
    vendor: 'Electric Builders',
    category: 'Labour',
    project: 'Woodlands Crossing',
    amount: 5100,
    status: 'Pending',
    categoryColor: 'bg-amber-300/20 text-amber-300',
    statusColor: 'bg-rose-100 text-orange-400',
  },
  {
    date: '01 Jul 2026',
    vendor: 'Timber & Log Supply',
    category: 'Materials',
    project: 'Woodlands Crossing',
    amount: 6700,
    status: 'Rejected',
    categoryColor: 'bg-rose-100 text-orange-400',
    statusColor: 'bg-stateRed/20 text-stateRed',
  },
  {
    date: '02 Jul 2026',
    vendor: 'Steel Frame Logistics',
    category: 'Subcontractor',
    project: 'Woodlands Crossing',
    amount: 8900,
    status: 'Approved',
    categoryColor: 'bg-blue-500/20 text-blue-500',
    statusColor: 'bg-blue-500/20 text-blue-500',
  },
];

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expenseSearchQuery, setExpenseSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'date' | 'amount' | null>(null);
  const [sortAscending, setSortAscending] = useState(true);

  // Stateful array of expenses so users can dynamically add items
  const [expenses, setExpenses] = useState(initialExpenses);
  const [selectedDetailExpense, setSelectedDetailExpense] = useState<any>(null);
  const [showSidebarModal, setShowSidebarModal] = useState(false);

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(false); // default to descending (bigger to shorter)
    }
  };

  // Filter logic matching search boxes, project, and category selections
  const filteredExpenses = expenses.filter((exp) => {
    const query = (expenseSearchQuery || searchQuery).toLowerCase();
    const matchesSearch =
      exp.vendor.toLowerCase().includes(query) ||
      exp.project.toLowerCase().includes(query) ||
      exp.category.toLowerCase().includes(query);
    const matchesProject =
      selectedProject === 'All Projects' ||
      exp.project.toLowerCase() === selectedProject.toLowerCase();
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      exp.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesProject && matchesCategory;
  });

  // Sort filtered expenses dynamically
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortField) return 0;
    if (sortField === 'amount') {
      return sortAscending ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortField === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortAscending ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const pageSize = 8;
  const maxPage = Math.max(1, Math.ceil(filteredExpenses.length / pageSize));
  const activePage = currentPage > maxPage ? 1 : currentPage;
  const paginatedExpenses = sortedExpenses.slice((activePage - 1) * pageSize, activePage * pageSize);

  return (
    <div className="w-full p-6 bg-white90 flex flex-col lg:flex-row justify-start items-start gap-6 min-h-screen font-sans animate-fade-in">
      {/* Left Column: Sidebar Navigation (Hidden under 1024px, shown as modal instead) */}
      <Sidebar activeMenu="expenses" className="hidden lg:flex lg:sticky lg:top-6 h-[calc(100vh-48px)] shrink-0 lg:w-64" />

      {/* Middle Column: Expenses Content */}
      <div className="flex-1 flex flex-col justify-start items-start gap-6 min-w-0 w-full">

        {/* Search Row */}
        <div className="self-stretch inline-flex justify-start items-center gap-3 relative z-30">
          {/* Sidebar Trigger Button (visible only under 1024px) */}
          <IconButton
            variant="white"
            icon="https://cdn.lordicon.com/tewlfgbl.json"
            state="hover"
            iconColor="primary:#110d31"
            className="rounded-xl border border-white80 shrink-0 lg:hidden"
            onClick={() => setShowSidebarModal(true)}
          />

          <div className="relative notifications-trigger-group">
            <IconButton
              variant="white"
              icon="https://cdn.lordicon.com/ahxaipjb.json"
              state="hover"
              target=".notifications-trigger-group"
              iconColor="primary:#110D31"
              className="rounded-xl border border-white80 shrink-0"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="absolute left-0 mt-2 z-50">
                <NotificationModal onClose={() => setShowNotifications(false)} />
              </div>
            )}
          </div>
          <InputBox
            variant="white"
            placeholder="Search Anything"
            leftIcon="https://cdn.lordicon.com/xaekjsls.json"
            iconColor="primary:#110D31"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            containerClassName="w-96 cursor-pointer"
            className="w-full cursor-pointer"
            onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
            readOnly
          />
        </div>

        {/* Title Row */}
        <div className="inline-flex justify-start items-end gap-3 opacity-0 animate-fade-in-down animation-delay-100 expenses-title-row">
          <h1 className="text-black text-3xl font-bold font-bricolage">Expenses throughout project</h1>
          <div className="size-10 flex justify-center items-center shrink-0">
            <LordIcon
              size={40}
              trigger="hover"
              src="https://cdn.lordicon.com/wtewdzdl.json"
              colors="primary:#f9c9c0,secondary:#f98b4c,tertiary:#ffc738"
              target=".expenses-title-row"
            />
          </div>
        </div>

        {/* Main Expenses Table Container */}
        <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-4 opacity-0 animate-fade-in-up animation-delay-150">

          {/* Header title element */}
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-2">
              <LordIcon
                src="https://cdn.lordicon.com/qfkpvtbg.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
              />
              <span className="text-black text-base font-semibold font-bricolage">Expenses</span>
            </div>
          </div>

          <div className="self-stretch h-px bg-white80"></div>

          {/* Action Filters Bar */}
          {/* Filter Bar */}
          <div className="self-stretch flex flex-col xl:flex-row justify-between items-stretch xl:items-start gap-4">
            <div className="flex flex-row justify-start items-center gap-3 flex-1 w-full">
              <InputBox
                variant="gray"
                placeholder="Search Expenses"
                leftIcon="https://cdn.lordicon.com/xaekjsls.json"
                iconColor="primary:#110D31"
                value={expenseSearchQuery}
                onChange={(e) => setExpenseSearchQuery(e.target.value)}
                containerClassName="flex-1 w-full"
                className="w-full"
              />
              <Dropdown
                variant="gray"
                placeholder="All Projects"
                options={['All Projects', 'Sentosa Villa', 'Woodlands Crossing']}
                value={selectedProject}
                onChange={(val) => setSelectedProject(val)}
                containerClassName="w-40 shrink-0"
              />
              <Dropdown
                variant="gray"
                placeholder="All Categories"
                options={['All Categories', 'Materials', 'Labour', 'Subcontractor', 'Permits']}
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                containerClassName="w-40 shrink-0"
              />
            </div>
            <Button
              variant="default"
              size="default"
              rightIcon="https://cdn.lordicon.com/swqmjczo.json"
              iconTrigger="hover"
              rightIconState="hover-rotation"
              onClick={() => setShowAddExpenseModal(true)}
              className="w-full xl:w-auto justify-center"
            >
              Add Expenses
            </Button>
          </div>

          <div className="self-stretch h-px opacity-0 bg-neutral-200"></div>

          {/* Expenses List Table */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
            <div className="self-stretch px-3 inline-flex justify-start items-center gap-4 text-left">
              <div
                onClick={() => handleSort('date')}
                className="flex-1 text-left text-black/40 text-xs font-semibold font-bricolage inline-flex items-center gap-1 cursor-pointer select-none px-2 py-1 rounded-2xl hover:bg-white90 transition-all duration-300 date-header -ml-2 -my-1"
              >
                <span>Date</span>
                <LordIcon
                  src="https://cdn.lordicon.com/rxcklbzp.json"
                  size={16}
                  colors="primary:#000000"
                  className="opacity-40"
                  trigger="hover"
                  target=".date-header"
                />
              </div>
              <div className="flex-1 text-left text-black/40 text-xs font-semibold font-bricolage">Vendor</div>
              <div className="flex-1 text-left text-black/40 text-xs font-semibold font-bricolage">Category</div>
              <div className="flex-1 text-left text-black/40 text-xs font-semibold font-bricolage">Project</div>
              <div
                onClick={() => handleSort('amount')}
                className="flex-1 text-left text-black/40 text-xs font-semibold font-bricolage inline-flex items-center gap-1 cursor-pointer select-none px-2 py-1 rounded-2xl hover:bg-white90 transition-all duration-300 amount-header -ml-2 -my-1"
              >
                <span>Amount</span>
                <LordIcon
                  src="https://cdn.lordicon.com/rxcklbzp.json"
                  size={16}
                  colors="primary:#000000"
                  className="opacity-40"
                  trigger="hover"
                  target=".amount-header"
                />
              </div>
              <div className="flex-1 text-left text-black/40 text-xs font-semibold font-bricolage">Status</div>
              <div className="flex-1 text-left text-black/40 text-xs font-semibold font-bricolage">Detail</div>
            </div>

            {paginatedExpenses.map((exp, idx) => (
              <div
                key={idx}
                className="self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 inline-flex justify-start items-center gap-4"
              >
                <div className="flex-1 justify-start text-black text-sm font-semibold font-bricolage">
                  {exp.date}
                </div>

                <div className="flex-1 justify-start text-black/60 text-xs font-normal font-sans">
                  {exp.vendor}
                </div>

                <div className="flex-1 inline-flex flex-col justify-start items-start">
                  <span className={`h-7 px-3 py-2 rounded-[100px] inline-flex justify-center items-center text-xs font-semibold font-bricolage ${exp.categoryColor}`}>
                    {exp.category}
                  </span>
                </div>

                <div className="flex-1 justify-start text-black/60 text-xs font-normal font-sans">
                  {exp.project}
                </div>

                <div className="flex-1 justify-start text-black/60 text-xs font-normal font-sans">
                  {formatCurrency(exp.amount)}
                </div>

                <div className="flex-1 inline-flex flex-col justify-start items-start">
                  <span className={`h-7 px-3 py-2 rounded-[100px] inline-flex justify-center items-center text-xs font-semibold font-bricolage ${exp.statusColor}`}>
                    {exp.status}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <Button
                    variant="gray"
                    size="small"
                    rightIcon="https://cdn.lordicon.com/jarmuava.json"
                    rightIconState="hover-slide"
                    iconTrigger="hover"
                    onClick={() => setSelectedDetailExpense(exp)}
                  >
                    <span className="hidden xl:inline">View </span>Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="self-stretch h-px bg-white80 mt-2"></div>

          {/* Pagination Footer */}
          <div className="self-stretch inline-flex justify-between items-center w-full mt-2">
            <div className="justify-start">
              <span className="text-black/40 text-xs font-normal font-sans">Showing </span>
              <span className="text-black/40 text-xs font-semibold font-bricolage">
                {paginatedExpenses.length > 0 ? (activePage - 1) * pageSize + 1 : 0} - {Math.min(activePage * pageSize, filteredExpenses.length)}
              </span>
              <span className="text-black/40 text-xs font-normal font-sans"> out of </span>
              <span className="text-black/40 text-xs font-semibold font-bricolage">{filteredExpenses.length} data</span>
            </div>

            <div className="inline-flex justify-start items-center gap-2">
              <Button
                variant="outline"
                size="small"
                leftIcon="https://cdn.lordicon.com/hjashvmz.json"
                leftIconState="hover-slide"
                iconTrigger="hover"
                onClick={() => activePage > 1 && setCurrentPage(activePage - 1)}
                className={activePage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Previous
              </Button>

              <div className="inline-flex justify-start items-center gap-1">
                {Array.from({ length: maxPage }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center text-xs font-semibold font-bricolage transition-colors ${pageNum === activePage
                      ? 'text-primary bg-primary/20'
                      : 'text-black hover:bg-white90'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <Button
                variant="default"
                size="small"
                rightIcon="https://cdn.lordicon.com/ioabdriz.json"
                rightIconState="hover-slide"
                iconTrigger="hover"
                onClick={() => activePage < maxPage && setCurrentPage(activePage + 1)}
                className={activePage === maxPage ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Next
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Add Expense modal popup overlay */}
      {showAddExpenseModal && (
        <AddExpenseModal
          onClose={() => setShowAddExpenseModal(false)}
          onAddExpense={(newExpense) => {
            setExpenses((prev) => [newExpense, ...prev]);
          }}
        />
      )}

      {/* Detail Expense modal popup overlay */}
      {selectedDetailExpense && (
        <DetailExpenseModal
          expense={selectedDetailExpense}
          onClose={() => setSelectedDetailExpense(null)}
        />
      )}

      {/* Sidebar Modal (visible under 1024px to 720px when open) */}
      {showSidebarModal && (
        <div 
          className="fixed inset-0 z-50 flex justify-start items-stretch select-none"
          onClick={() => setShowSidebarModal(false)}
        >
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-white/20"
            style={{ backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
          />

          {/* Sidebar Drawer Container */}
          <div
            className="relative h-screen bg-transparent p-6 shrink-0 z-10 flex flex-col justify-start items-start animate-fade-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar activeMenu="expenses" className="h-[calc(100vh-48px)] w-64 shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
