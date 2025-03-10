"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ChatbotSidebar from "@/app/chatbot/components/chatbotsidebar";
import DefaultSidebar from "@/app/chatbot/components/sidebar";
import UserAreaSelectBox from "@/app/chatbot/components/userprofilebox";
import logo from "@/public/Assets_Images/cambotlogo.png";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const isChatbotPage = pathname.startsWith("/chatbot");

  return (
    <div>
      {/* Header with Navbar and Logo */}
      <div className="bg-transparent flex justify-between items-center px-4 h-16 shadow-md relative z-20">
        {/* Left Section: Navbar and Logo */}
        <div className="flex items-center space-x-10">
          {/* Hamburger Icon (FaBars) */}
          <div
            className={`ml-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              sidebarOpen ? "-translate-x-64" : "translate-x-0"
            }`}
          >
            <FaBars
              onClick={toggleSidebar}
              className="text-xl cursor-pointer"
            />
          </div>

          {/* Logo */}
          <div
            className={`font-semibold text-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              sidebarOpen ? "-translate-x-64" : "translate-x-0"
            }`}
          >
            <Image src={logo} alt="Logo" width={100} height={40} priority />
          </div>
        </div>

        {/* Right Section: User Profile */}
        <div className="relative mr-6">
          <UserAreaSelectBox />
        </div>
      </div>

      {/* Conditionally Render Sidebar */}
      {isChatbotPage ? (
        <ChatbotSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <DefaultSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Add a class to the body to shift content when sidebar is open */}
      <style jsx global>{`
        body {
          transition: margin-left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          margin-left: ${sidebarOpen ? "256px" : "0"};
        }
      `}</style>
    </div>
  );
};

export default Header;