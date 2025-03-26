"use client";

import Header from "@/app/chatbot/components/header";
import Footer from "@/app/chatbot/components/footer";
import { createContext, useContext, useState } from "react";
import { AuthGuard } from "../context/AuthGuard";

// Create a context to share the chat state across components
export const ChatContext = createContext({
  hasMessages: false,
  setHasMessages: (value: boolean) => {},
});

export const useChatContext = () => useContext(ChatContext);

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasMessages, setHasMessages] = useState(false);

  return (
    <AuthGuard>
      <ChatContext.Provider value={{ hasMessages, setHasMessages }}>
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#F5FCFF] to-[#62C9F1]">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main
            className={`flex-1 ${
              hasMessages ? "overflow-auto" : "overflow-hidden"
            } pl-6 pt-6 pb-2 transition-all duration-300 ease-in-out`}
          >
            {children}
          </main>

          {/* Footer */}
          {/* <footer className="bg-transparent text-white text-center py-2">
          <Footer />
        </footer> */}
        </div>
      </ChatContext.Provider>
    </AuthGuard>
  );
}
