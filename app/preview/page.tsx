'use client';

import { useState } from "react";
import { Button } from "../../components/button";
import { LordIcon } from "../../components/lord-icon";
import { InputBox } from "../../components/inputBox";
import { Dropdown } from "../../components/dropdown";
import { IconButton } from "../../components/iconButton";
import { Badge } from "../../components/badge";
import { Sidebar } from "../../components/sidebar";

export default function PreviewPage() {
  const [selectedWhite, setSelectedWhite] = useState('');
  const [selectedGray, setSelectedGray] = useState('');
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const courseOptions = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Machine Learning",
    "Data Science",
    "Cybersecurity"
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8 gap-8 animate-in fade-in duration-500">
      {/* Showcase of the dynamic Button component variants and sizes */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-gray-400 font-bricolage uppercase tracking-wider">Dynamic Button Component</h2>
        <div className="flex flex-wrap items-center justify-center gap-4 p-6 border border-white80 rounded-[24px] bg-white90">
          <Button 
            variant="default" 
            leftIcon="https://cdn.lordicon.com/gqfozvrp.json"
            rightIcon="https://cdn.lordicon.com/gqfozvrp.json"
          >
            Default Button
          </Button>
          
          <Button 
            variant="outline" 
            leftIcon="https://cdn.lordicon.com/gqfozvrp.json"
          >
            Outline Style
          </Button>

          <Button 
            variant="ghost-black" 
            rightIcon="https://cdn.lordicon.com/gqfozvrp.json"
          >
            Ghost Black
          </Button>

          <Button 
            variant="gray" 
            leftIcon="https://cdn.lordicon.com/gqfozvrp.json"
            size="small"
          >
            Small Gray
          </Button>

          <Button 
            variant="white" 
            rightIcon="https://cdn.lordicon.com/gqfozvrp.json"
            size="small"
          >
            Small White
          </Button>
        </div>
      </div>

      {/* Showcase of the dynamic InputBox component variants */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-gray-400 font-bricolage uppercase tracking-wider">Dynamic InputBox Component</h2>
        <div className="flex flex-wrap items-center justify-center gap-6 p-6 border border-white80 rounded-[24px] bg-white90">
          <InputBox
            label="Orange Icon (White)"
            variant="white"
            placeholder="Search Courses"
            leftIcon="https://cdn.lordicon.com/gqfozvrp.json"
            iconColor="primary:#F98B4C"
          />

          <InputBox
            label="No Icon (White)"
            variant="white"
            placeholder="Search Courses"
          />

          <InputBox
            label="Black Icon (Gray)"
            variant="gray"
            placeholder="Search Courses"
            leftIcon="https://cdn.lordicon.com/gqfozvrp.json"
            iconColor="primary:#110D31"
          />

          <InputBox
            label="No Icon (Gray)"
            variant="gray"
            placeholder="Search Courses"
          />
        </div>
      </div>

      {/* Showcase of the dynamic Dropdown component variants */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-gray-400 font-bricolage uppercase tracking-wider">Dynamic Dropdown (Combobox)</h2>
        <div className="flex flex-wrap items-center justify-center gap-6 p-6 border border-white80 rounded-[24px] bg-white90">
          <Dropdown
            label="Course Topic (White)"
            variant="white"
            placeholder="Search Topics..."
            options={courseOptions}
            value={selectedWhite}
            onChange={setSelectedWhite}
            rightIcon="https://cdn.lordicon.com/gqfozvrp.json"
          />

          <Dropdown
            label="Course Topic (Gray)"
            variant="gray"
            placeholder="Search Topics..."
            options={courseOptions}
            value={selectedGray}
            onChange={setSelectedGray}
            rightIcon="https://cdn.lordicon.com/gqfozvrp.json"
          />
        </div>
      </div>

      {/* Showcase of the dynamic IconButton component variants */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-gray-400 font-bricolage uppercase tracking-wider">Dynamic IconButton Component</h2>
        <div className="flex flex-wrap items-center justify-center gap-6 p-6 border border-white80 rounded-[24px] bg-white90">
          <IconButton
            variant="white"
            icon="https://cdn.lordicon.com/gqfozvrp.json"
            iconColor="primary:#110D31"
          />

          <IconButton
            variant="gray"
            icon="https://cdn.lordicon.com/gqfozvrp.json"
            iconColor="primary:#F98B4C"
          />
        </div>
      </div>

      {/* Showcase of the dynamic Badge component variants */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-gray-400 font-bricolage uppercase tracking-wider">Dynamic Badge Component</h2>
        <div className="flex flex-wrap items-center justify-center gap-4 p-6 border border-white80 rounded-[24px] bg-white90">
          <Badge color="primary" icon="https://cdn.lordicon.com/gqfozvrp.json">
            Primary Brand
          </Badge>
          
          <Badge color="black">
            Black Badge
          </Badge>

          <Badge color="red" icon="https://cdn.lordicon.com/gqfozvrp.json">
            Error State
          </Badge>

          <Badge color="green">
            Success State
          </Badge>

          <Badge color="blue" icon="https://cdn.lordicon.com/gqfozvrp.json">
            Info State
          </Badge>

          <Badge color="yellow">
            Warning State
          </Badge>
        </div>
      </div>

      {/* Showcase of the Sidebar component */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold text-gray-400 font-bricolage uppercase tracking-wider">Sidebar Component</h2>
        <div className="p-6 border border-white80 rounded-[24px] bg-white90">
          <Sidebar activeMenu={activeMenu} onChangeMenu={setActiveMenu} />
        </div>
      </div>

      {/* Standalone LordIcon requested in task instructions */}
      <div className="flex flex-col items-center gap-2 mt-8">
        <h2 className="text-sm font-semibold text-gray-400 font-bricolage uppercase tracking-wider">Standalone LordIcon</h2>
        <LordIcon
          src="https://cdn.lordicon.com/gqfozvrp.json"
          trigger="hover"
          colors="primary:#110d31"
          size={250}
        />
      </div>
    </div>
  );
}
