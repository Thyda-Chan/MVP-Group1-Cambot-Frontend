"use client";

import Header from "@/app/chatbot/components/header";
import Footer from "@/app/chatbot/components/footer";
import ChatbotSidebar from "@/app/chatbot/components/chatbotsidebar";
import DefaultSidebar from "@/app/chatbot/components/sidebar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isChatbotPage = pathname.startsWith("/chatbot");

  console.log("Current Path:", pathname);
  console.log("Sidebar Open:", sidebarOpen);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#F5FCFF] to-[#62C9F1]">
      {/* Header */}
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      {isChatbotPage ? (
        <ChatbotSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <DefaultSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 overflow-auto transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        } pl-6 pt-6 pb-2`}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-transparent text-white text-center py-2">
        <Footer />
      </footer>
    </div>
  );
}