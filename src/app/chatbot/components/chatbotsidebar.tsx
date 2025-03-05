//chatsidebar.tsx
import Link from "next/link";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ChatbotSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  // Reusable link data
  const chatHistoryLinks = [
    { href: "/chatbot/history/session1", label: "Session 1" },
    { href: "/chatbot/history/session2", label: "Session 2" },
    { href: "/chatbot/history/session3", label: "Session 3" },
  ];

  const referenceLinks = [
    { href: "/help", label: "Help", icon: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" },
    { href: "/faq", label: "FAQ", icon: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" },
    { href: "/about", label: "About Cambot", icon: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" },
    { href: "/privacy-policy", label: "Privacy Policy", icon: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" },
    { href: "/settings", label: "Settings", icon: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" },
  ];

  return (
    <div
      className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#E6F7FE] text-black transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-10 flex flex-col`}
    >
      {/* Container 1: Search Bar and New Chat Button */}
      <div className="h-[15%] p-4 flex flex-col space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search chat history..."
            className="w-full p-1 pl-3 pr-8 bg-[#E0E0E0] text-sm text-[#005D7F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005D7F]"
          />
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-[#005D7F]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* New Chat Button */}
        <button
          className="w-fit flex items-center justify-center space-x-1 p-2 bg-[#99D4EB] text-[#005D7F] rounded-lg hover:bg-[#88C2D8] active:bg-[#77B0C5] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          onClick={() => console.log("New Chat button clicked")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs">New Chat</span>
        </button>
      </div>

      {/* Container 2: Chat History Area */}
      <div className="h-[50%] overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
        <ul>
          {chatHistoryLinks.map((link, index) => (
            <li key={index} className="mb-2">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Container 3: Link References */}
      <div className="h-[20%] flex flex-col p-4">
        <ul className="space-y-2">
          {referenceLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="flex items-center space-x-2 text-sm text-[#005D7F] p-1 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d={link.icon} clipRule="evenodd" />
                </svg>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatbotSidebar;