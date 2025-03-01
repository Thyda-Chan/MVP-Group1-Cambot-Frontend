"use client";

import React from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import UserAreaSelectBox from "@/app/chatbot/components/userprofilebox";
import logo from "@/public/Assets_Images/cambotlogo.png";

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ sidebarOpen, toggleSidebar }: HeaderProps) => {
  return (
    <div>
      {/* Header with Navbar and Logo */}
      <div className="bg-transparent flex justify-between items-center px-4 h-16 shadow-md relative z-20">
        {/* Left Section: Navbar and Logo */}
        <div className="flex items-center space-x-10">
          {/* Hamburger Icon (FaBars) */}
          <div className="ml-6">
            <FaBars
              onClick={toggleSidebar}
              className="text-xl cursor-pointer"
            />
          </div>

          {/* Logo */}
          <div className="font-semibold text-xl">
            <Image src={logo} alt="Logo" width={100} height={40} priority />
          </div>
        </div>

        {/* Right Section: User Profile */}
        <div className="relative mr-6">
          <UserAreaSelectBox />
        </div>
      </div>
    </div>
  );
};

export default Header;