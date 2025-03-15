'use client';

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface ChatSession {
  group_id: string;
  first_question: string;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ChatbotSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const router = useRouter();

  // Fetch chat history when component mounts
  useEffect(() => {
    const loadAllSessions = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("User is not authenticated");
        }

        // Fetch sessions from the API
        const response = await fetch("http://127.0.0.1:8000/chat/histories/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Fetch sessions from local storage (user-specific)
        const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage
        const localSessions = JSON.parse(localStorage.getItem(`chatSessions_${userId}`) || "[]");

        // Combine and filter sessions
        const combinedSessions = [...data.data, ...localSessions].filter(
          (session) => session?.group_id && session?.first_question
        );

        // Remove duplicates using group_id
        const uniqueSessions = Array.from(
          new Map(combinedSessions.map((session) => [session.group_id, session])).values()
        );

        setChatSessions(Array.from(uniqueSessions));
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setChatSessions([]); // Fallback to empty array if there's an error
      }
    };

    loadAllSessions();

    // Listen for storage changes (e.g., when a new session is added)
    const handleStorageChange = () => {
      loadAllSessions();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("chatSessionUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("chatSessionUpdate", handleStorageChange);
    };
  }, []);

  // Set active session based on URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const groupIdFromUrl = urlParams.get('groupId');
    setActiveSession(groupIdFromUrl);
  }, []);

  // Handle clicking on a chat session
  const handleSessionClick = useCallback((groupId: string) => {
    setActiveSession(groupId);
    router.push(`/chatbot?groupId=${groupId}`);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  }, [router, toggleSidebar]);

  // Handle starting a new chat
  const handleNewChat = useCallback(() => {
    setActiveSession(null);
    router.push('/chatbot');
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  }, [router, toggleSidebar]);

  // Filter sessions based on search query
  const filteredSessions = chatSessions.filter((session) =>
    session.first_question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#E6F7FE] text-black transition-transform transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } z-10 flex flex-col`}>
      <div className="flex-shrink-0 p-4 flex flex-col space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chat history..."
            className="w-full p-1 pl-3 pr-8 bg-[#E0E0E0] text-sm text-[#005D7F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005D7F]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
        <button
          className="w-fit flex items-center justify-center space-x-1 p-2 bg-[#99D4EB] text-[#005D7F] rounded-lg hover:bg-[#88C2D8] active:bg-[#77B0C5] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          onClick={handleNewChat}
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
      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4 sticky top-0 bg-[#E6F7FE] z-10">
          Chat History
        </h2>
        <ul>
          {filteredSessions.length === 0 ? (
            <p className="text-gray-500">No chat history yet.</p>
          ) : (
            filteredSessions.map((session) => (
              <li key={session.group_id} className="mb-2">
                <button
                  onClick={() => handleSessionClick(session.group_id)}
                  className={`w-full text-left p-2 hover:bg-gray-100 rounded ${
                    activeSession === session.group_id ? 'bg-blue-100' : ''
                  }`}
                >
                  {session.first_question}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatbotSidebar;