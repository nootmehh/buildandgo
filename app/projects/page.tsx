'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar';
import { Button } from '../../components/button';
import { LordIcon } from '../../components/lord-icon';
import { InputBox } from '../../components/inputBox';
import { IconButton } from '../../components/iconButton';
import { Badge } from '../../components/badge';
import { Dropdown } from '../../components/dropdown';
import { NotificationModal } from '../../components/modal/notificationModal';
import { AddProjectModal } from '../../components/modal/addProjectModal';
import { DetailProjectModal } from '../../components/modal/detailProjectModal';

export default function ProjectPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'spent' | 'budget' | 'margin' | null>(null);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [selectedDetailProject, setSelectedDetailProject] = useState<any>(null);
  const [showSidebarModal, setShowSidebarModal] = useState(false);

  // Mock projects database (12 items)
  const projects = [
    {
      name: 'Orchard Rd Renovation',
      description: 'Mr Abraham',
      status: 'Active',
      spent: 420000,
      budget: 680000,
      percentage: 62,
      margin: 22.1,
      statusColor: 'green' as const,
    },
    {
      name: 'Sentosa Villa Build',
      description: 'Quantum Innovations',
      status: 'Active',
      spent: 847200,
      budget: 900000,
      percentage: 94,
      margin: 18.4,
      statusColor: 'green' as const,
      isRisk: true,
    },
    {
      name: 'Marina Bay Office',
      description: 'SkyVision Technologies',
      status: 'Paused',
      spent: 312000,
      budget: 650000,
      percentage: 48,
      margin: 27.8,
      statusColor: 'yellow' as const,
    },
    {
      name: 'Marina Bay Office',
      description: 'StellarSphere Solutions',
      status: 'Complete',
      spent: 550000,
      budget: 560000,
      percentage: 62,
      margin: 22.1,
      statusColor: 'blue' as const,
    },
    {
      name: 'Orchard Road Branch',
      description: 'GreenFusion Technologies',
      status: 'Active',
      spent: 320000,
      budget: 340000,
      percentage: 47,
      margin: 15.4,
      statusColor: 'green' as const,
    },
    {
      name: 'Sentosa HQ',
      description: 'WaveCrest Industries',
      status: 'Active',
      spent: 450000,
      budget: 465000,
      percentage: 53,
      margin: 18.9,
      statusColor: 'green' as const,
    },
    {
      name: 'Changi Business Park',
      description: 'Summit Tech Labs',
      status: 'Complete',
      spent: 620000,
      budget: 630000,
      percentage: 70,
      margin: 25.3,
      statusColor: 'blue' as const,
    },
    {
      name: 'Marina Bay Sands',
      description: 'Apex Holdings',
      status: 'Active',
      spent: 850000,
      budget: 870000,
      percentage: 65,
      margin: 18.9,
      statusColor: 'green' as const,
    },
    {
      name: 'Jurong East Hub',
      description: 'EarthNova Systems',
      status: 'Paused',
      spent: 400000,
      budget: 410000,
      percentage: 50,
      margin: 22.1,
      statusColor: 'yellow' as const,
    },
    {
      name: 'Bedok Reno Hub',
      description: 'Bedok Solutions',
      status: 'Active',
      spent: 280000,
      budget: 300000,
      percentage: 93,
      margin: 6.7,
      statusColor: 'green' as const,
      isRisk: true,
    },
    {
      name: 'Tampines HQ Reno',
      description: 'Tampines Partners',
      status: 'Complete',
      spent: 120000,
      budget: 150000,
      percentage: 80,
      margin: 20.0,
      statusColor: 'blue' as const,
    },
    {
      name: 'Woodlands Crossing',
      description: 'Woodlands Development',
      status: 'Canceled',
      spent: 98000,
      budget: 250000,
      percentage: 39,
      margin: 60.8,
      statusColor: 'red' as const,
    },
  ];

  // Format currency helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSort = (field: 'spent' | 'budget' | 'margin') => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(false); // default to descending (bigger to shorter)
    }
  };

  // Filter projects list dynamically using both search bars
  const filteredProjects = projects.filter((proj) => {
    const query = (projectSearchQuery || searchQuery).toLowerCase();
    const matchesSearch =
      proj.name.toLowerCase().includes(query) ||
      proj.description.toLowerCase().includes(query);
    const matchesStatus =
      selectedStatus === 'All Status' ||
      selectedStatus === 'All' ||
      proj.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Sort filtered projects dynamically
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (sortAscending) {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });

  const pageSize = 8;
  const maxPage = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const activePage = currentPage > maxPage ? 1 : currentPage;
  const paginatedProjects = sortedProjects.slice((activePage - 1) * pageSize, activePage * pageSize);

  return (
    <div className="w-full p-6 bg-white90 flex flex-col lg:flex-row justify-start items-start gap-6 min-h-screen font-sans animate-fade-in">
      {/* Left Column: Sidebar Navigation (Hidden under 1024px, shown as modal instead) */}
      <Sidebar activeMenu="projects" className="hidden lg:flex lg:sticky lg:top-6 h-[calc(100vh-48px)] shrink-0 lg:w-64" />

      {/* Middle Column: Projects panel Content */}
      <div className="flex-1 flex flex-col justify-start items-start gap-6 min-w-0 w-full">

        {/* Header Row */}
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
        <div className="inline-flex justify-start items-end gap-3 projects-title-row opacity-0 animate-fade-in-down animation-delay-100">
          <h1 className="text-black text-3xl font-bold font-bricolage">All of your projects</h1>
          <div className="size-10 flex justify-center items-center shrink-0">
            <LordIcon
              src="https://cdn.lordicon.com/szextnhi.json"
              size={40}
              trigger="hover"
              colors="primary:#ebe6ef,secondary:#f98b4c,tertiary:#110d31,quaternary:#b26836,quinary:#ffc738"
              target=".projects-title-row"
            />
          </div>
        </div>

        {/* Metrics summary cards */}
        <div className="self-stretch inline-flex justify-start items-center gap-3 flex-wrap content-center">
          {/* Card 1: Active Projects */}
          <div className="flex-1 h-28 p-4 bg-linear-to-b from-white from-85% to-[#FFF8F4] rounded-3xl border border-orange-200 hover:border-primary transition-all duration-300 inline-flex flex-col justify-start items-start gap-1 projects-card-1 opacity-0 animate-fade-in-up animation-delay-150">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/piurhpdv.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".projects-card-1"
              />
              <span className="text-black/60 text-sm font-normal font-sans">Active Projects</span>
            </div>
            <div className="text-primary text-3xl font-bold font-bricolage">
              {projects.filter((p) => p.status === 'Active').length}
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/excswhey.json"
                size={20}
                colors="primary:#57C439"
                trigger="loop-on-hover"
                target=".projects-card-1"
              />
              <span className="text-stateGreen text-sm font-semibold font-bricolage">12.4%</span>
              <span className="text-black text-sm font-normal font-sans">vs last month</span>
            </div>
          </div>

          {/* Card 2: Total Budget */}
          <div className="flex-1 h-28 p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 inline-flex flex-col justify-start items-start gap-1 projects-card-2 opacity-0 animate-fade-in-up animation-delay-200">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/dnupukmh.json"
                size={20}
                colors="primary:#110D31"
                trigger="hover"
                target=".projects-card-2"
              />
              <span className="text-black/60 text-sm font-normal font-sans">Total Budget</span>
            </div>
            <div className="text-primary text-3xl font-bold font-bricolage">
              {"$" + (projects.reduce((acc, p) => acc + p.budget, 0) / 1000000).toFixed(1) + "M"}
            </div>
            <span className="text-black text-sm font-normal font-sans">Across all active project</span>
          </div>

          {/* Card 3: Completion Rate */}
          <div className="flex-1 h-28 p-4 bg-white rounded-3xl border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 inline-flex flex-col justify-start items-start gap-1 projects-card-3 opacity-0 animate-fade-in-up animation-delay-250">
            <div className="self-stretch inline-flex justify-start items-start gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/uvofdfal.json"
                size={20}
                colors="primary:#110D31"
                trigger="morph"
                state='morph-select'
                target=".projects-card-3"
              />
              <span className="text-black/60 text-sm font-normal font-sans">Completion Rate</span>
            </div>
            <div className="text-primary text-3xl font-bold font-bricolage">
              {Math.round(projects.reduce((acc, p) => acc + p.percentage, 0) / projects.length)}%
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <LordIcon
                src="https://cdn.lordicon.com/excswhey.json"
                size={20}
                colors="primary:#57C439"
                trigger="loop-on-hover"
                target=".projects-card-3"
              />
              <span className="text-stateGreen text-sm font-semibold font-bricolage">On Track</span>
            </div>
          </div>
        </div>

        {/* All Projects Container */}
        <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 hover:border-low hover:bg-linear-to-b hover:from-white hover:from-85% hover:to-[#FFF8F4] transition-all duration-300 flex flex-col justify-start items-start gap-4 w-full projects-container-panel opacity-0 animate-fade-in-up animation-delay-300">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <LordIcon
              src="https://cdn.lordicon.com/piurhpdv.json"
              size={20}
              colors="primary:#110D31"
              trigger="hover"
              target=".projects-container-panel"
            />
            <span className="text-black text-base font-semibold font-bricolage">All Projects</span>
          </div>

          <div className="self-stretch h-px bg-white80"></div>

          {/* Filter Bar */}
          <div className="self-stretch flex flex-col xl:flex-row justify-between items-stretch xl:items-start gap-4">
            <div className="flex flex-row justify-start items-center gap-3 flex-1 w-full">
              <InputBox
                variant="gray"
                placeholder="Search Projects Name"
                leftIcon="https://cdn.lordicon.com/xaekjsls.json"
                iconColor="primary:#110D31"
                value={projectSearchQuery}
                onChange={(e) => setProjectSearchQuery(e.target.value)}
                containerClassName="flex-1 w-full"
                className="w-full"
              />
              <Dropdown
                variant="gray"
                placeholder="All Status"
                options={['All Status', 'Active', 'Paused', 'Complete', 'Canceled']}
                value={selectedStatus}
                onChange={(val) => setSelectedStatus(val)}
                containerClassName="w-40 shrink-0"
              />
            </div>
            <Button
              variant="default"
              size="default"
              rightIcon="https://cdn.lordicon.com/swqmjczo.json"
              iconTrigger="hover"
              rightIconState="hover-rotation"
              onClick={() => setShowAddProjectModal(true)}
              className="w-full xl:w-auto justify-center"
            >
              New Project
            </Button>
          </div>

          <div className="self-stretch h-px opacity-0 bg-neutral-200"></div>

          {/* Projects Table List */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
            <div className="self-stretch px-3 grid grid-cols-[160px_1fr_1fr_1fr_1.2fr_1fr_1fr] xl:grid-cols-[180px_1fr_1fr_1fr_1.2fr_1fr_1fr] gap-4 items-center text-left">
              <div className="justify-start text-black/40 text-xs font-semibold font-bricolage">Project Name</div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage">Status</div>
              <div
                onClick={() => handleSort('spent')}
                className="text-left text-black/40 text-xs font-semibold font-bricolage inline-flex items-center gap-1 cursor-pointer select-none px-2 py-1 rounded-2xl hover:bg-white90 transition-all duration-300 spent-header -ml-2 -my-1"
              >
                <span>Spent</span>
                <LordIcon
                  src="https://cdn.lordicon.com/rxcklbzp.json"
                  size={16}
                  colors="primary:#000000"
                  className="opacity-40"
                  trigger="hover"
                  target=".spent-header"
                />
              </div>
              <div
                onClick={() => handleSort('budget')}
                className="text-left text-black/40 text-xs font-semibold font-bricolage inline-flex items-center gap-1 cursor-pointer select-none px-2 py-1 rounded-2xl hover:bg-white90 transition-all duration-300 budget-header -ml-2 -my-1"
              >
                <span>Budget</span>
                <LordIcon
                  src="https://cdn.lordicon.com/rxcklbzp.json"
                  size={16}
                  colors="primary:#000000"
                  className="opacity-40"
                  trigger="hover"
                  target=".budget-header"
                />
              </div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage inline-flex items-center gap-1">
                <span>Budget Used</span>
              </div>
              <div
                onClick={() => handleSort('margin')}
                className="text-left text-black/40 text-xs font-semibold font-bricolage inline-flex items-center gap-1 cursor-pointer select-none px-2 py-1 rounded-2xl hover:bg-white90 transition-all duration-300 margin-header -ml-2 -my-1"
              >
                <span>Margin</span>
                <LordIcon
                  src="https://cdn.lordicon.com/rxcklbzp.json"
                  size={16}
                  colors="primary:#000000"
                  className="opacity-40"
                  trigger="hover"
                  target=".margin-header"
                />
              </div>
              <div className="text-left text-black/40 text-xs font-semibold font-bricolage">Detail</div>
            </div>

            {paginatedProjects.map((proj, idx) => (
              <div
                key={idx}
                className={`self-stretch px-3 py-2.5 bg-white90 hover:bg-white80 rounded-2xl border border-white80 hover:border-white70 transition-all duration-300 grid grid-cols-[160px_1fr_1fr_1fr_1.2fr_1fr_1fr] xl:grid-cols-[180px_1fr_1fr_1fr_1.2fr_1fr_1fr] gap-4 items-center project-page-row-${idx}`}
              >
                <div className="inline-flex flex-col justify-start items-start gap-0.5 min-w-0">
                  <span className="self-stretch justify-start text-black text-sm font-semibold font-bricolage truncate">
                    {proj.name}
                  </span>
                  <span className="self-stretch justify-start text-black/60 text-xs font-normal font-sans truncate">
                    {proj.description}
                  </span>
                </div>

                <div className="inline-flex flex-col justify-start items-start">
                  <Badge color={proj.statusColor}>{proj.status}</Badge>
                </div>

                <div className="justify-start text-black/60 text-xs font-normal font-sans truncate">
                  {formatCurrency(proj.spent)}
                </div>

                <div className="justify-start text-black/60 text-xs font-normal font-sans truncate">
                  {formatCurrency(proj.budget)}
                </div>

                <div className="flex justify-start items-center gap-1.5 min-w-0">
                  <div className="w-16 bg-neutral-200 h-1.5 rounded-full overflow-hidden shrink-0">
                    <div
                      className={`h-full rounded-full ${proj.isRisk ? 'bg-stateRed' : 'bg-stateGreen'}`}
                      style={{ width: `${proj.percentage}%` }}
                    ></div>
                  </div>
                  <span className={`text-right justify-start text-xs font-semibold font-bricolage shrink-0 ${proj.isRisk ? 'text-stateRed' : 'text-stateGreen'
                    }`}>
                    {proj.percentage}%
                  </span>
                </div>

                <div className="flex justify-start items-center gap-0.5 min-w-0">
                  <div className="size-5 relative overflow-hidden shrink-0">
                    <LordIcon
                      src="https://cdn.lordicon.com/btfbysou.json"
                      size={18}
                      colors="primary:#F98B4C"
                      trigger="hover"
                      target={`.project-page-row-${idx}`}
                    />
                  </div>
                  <span className="text-right justify-start text-orange-400 text-sm font-semibold font-bricolage shrink-0">
                    {proj.margin}%
                  </span>
                </div>

                <div className="min-w-0">
                  <Button
                    variant="gray"
                    size="small"
                    rightIcon="https://cdn.lordicon.com/jarmuava.json"
                    iconTrigger="hover"
                    rightIconState='hover-slide'
                    onClick={() => setSelectedDetailProject(proj)}
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
                {paginatedProjects.length > 0 ? (activePage - 1) * pageSize + 1 : 0} - {Math.min(activePage * pageSize, filteredProjects.length)}
              </span>
              <span className="text-black/40 text-xs font-normal font-sans"> out of </span>
              <span className="text-black/40 text-xs font-semibold font-bricolage">{filteredProjects.length} data</span>
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
      {showAddProjectModal && (
        <AddProjectModal
          onClose={() => setShowAddProjectModal(false)}
          onAddProject={(newProj) => {
            console.log('New project created:', newProj);
          }}
        />
      )}
      {selectedDetailProject && (
        <DetailProjectModal
          project={selectedDetailProject}
          onClose={() => setSelectedDetailProject(null)}
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
            <Sidebar activeMenu="projects" className="h-[calc(100vh-48px)] w-64 shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
