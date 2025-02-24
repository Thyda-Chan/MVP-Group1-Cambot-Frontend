import Link from "next/link";
import React from "react";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#E6F7FE] text-black transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-10`} // Updated background color to #E6F7FE
    >
      <div className="p-4">
        {/* Sidebar Content (navigation links) */}
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/services"}>Services</Link>
          </li>
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/documents"}>Documents</Link>
          </li>
          <li>
            <Link href={"/users"}>Users Management</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
