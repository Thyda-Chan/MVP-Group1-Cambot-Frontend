import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#E6F7FE] text-black transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-10`} // Updated background color to #E6F7FE
    >
      <div className="p-4">
        {/* Sidebar Content (navigation links) */}
        <ul>
          <li><a href="#home" className="text-black">Home</a></li>
          <li><a href="#services" className="text-black">Services</a></li>
          <li><a href="#about" className="text-black">About</a></li>
          <li><a href="#contact" className="text-black">Contact</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
