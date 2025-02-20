'use client';

import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from './sidebar';
import UserAreaSelectBox from './userprofilebox'; // Import UserAreaSelectBox

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control the sidebar

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Header with Navbar and Logo */}
      <div className="bg-transparent flex justify-between items-center px-4 h-16 shadow-md relative z-20">
        {/* Left Section: Navbar and Logo */}
        <div className="flex items-center space-x-10">
          {/* Hamburger Icon (FaBars) */}
          <div className="ml-6">
            <FaBars onClick={toggleSidebar} className="text-xl cursor-pointer" />
          </div>

          {/* Logo */}
          <div className="font-semibold text-xl">
            <img src="/Assets_Images" alt="Logo" className="h-8" />
          </div>
        </div>

        {/* Right Section: User Profile (UserAreaSelectBox will be here) */}
        <div className="relative mr-6">
          <UserAreaSelectBox /> {/* Add UserAreaSelectBox here directly */}
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Header;
