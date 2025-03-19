"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ChatbotSidebar from "@/app/chatbot/components/chatbotsidebar";
import DefaultSidebar from "@/app/chatbot/components/sidebar";
import UserAreaSelectBox from "@/app/chatbot/components/userprofilebox";
import logo from "@/public/Assets_Images/cambotlogo.png";
import { useUser } from "@/app/context/UserContext"; // Import the useUser hook

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { role } = useUser(); // Get the user's role from context

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const isChatbotPage = pathname.startsWith("/chatbot");

  // Define navigation links based on the user's role
  const userLinks = [
    { href: "/chatbot", label: "Chatbot" },
    { href: "/documents", label: "Document Dashboard" },
    { href: "/", label: "Homepage" },
  ];

  const adminLinks = [
    { href: "/chatbot", label: "Chatbot" },
    { href: "/documents", label: "Document Dashboard" },
    { href: "/users", label: "User Management" },
    { href: "/", label: "Homepage" },
  ];

  const navigationLinks =
    role === "admin" || "manager" ? adminLinks : userLinks;

  return (
    <div>
      {/* Header with Navbar and Logo */}
      <div className="bg-transparent flex justify-between items-center px-4 h-16 shadow-md relative z-20">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-10">
          {/* Hamburger Icon (FaBars) */}
          <div
            className={`ml-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              sidebarOpen ? "-translate-x-64" : "translate-x-0"
            }`}
          >
            {isChatbotPage ? (
              <FaBars
                onClick={toggleSidebar}
                className="text-xl cursor-pointer"
              />
            ) : (
              <div></div>
            )}
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

        {/* Right Section: Navigation Links and User Profile */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav className="flex space-x-4">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? "bg-[#005D7F] text-white" // Active link style
                    : "text-[#005D7F] hover:bg-[#C9F1FF] hover:text-[#0082B3]" // Inactive link style
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* User Profile */}
          <div className="relative">
            <UserAreaSelectBox />
          </div>
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
