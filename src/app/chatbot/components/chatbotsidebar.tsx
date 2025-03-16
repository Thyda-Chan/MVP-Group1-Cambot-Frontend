import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ChatSessionBox from "./chatsessionbox";
import { categorizeChatSessions } from "../ultils/categorizeChatSessions";

interface ChatSession {
  group_id: string;
  first_question: string;
  datetime: string;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ChatbotSidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const router = useRouter();

  const transformClasses = isOpen ? "translate-x-0" : "-translate-x-full";

  const loadAllSessions = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("User is not authenticated");

      const response = await fetch("http://127.0.0.1:8000/chat/histories/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      const userId = localStorage.getItem("userId");
      const localSessions = JSON.parse(localStorage.getItem(`chatSessions_${userId}`) || "[]");

      const validSessions = [...data.data, ...localSessions].filter(
        (session) => session?.group_id && session?.first_question
      );

      const uniqueSessions = Array.from(
        new Map(validSessions.map((session) => [session.group_id, session])).values()
      );

      setChatSessions(uniqueSessions);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setChatSessions([]);
    }
  }, []);

  useEffect(() => {
    loadAllSessions();

    const handleStorageChange = () => loadAllSessions();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("chatSessionUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("chatSessionUpdate", handleStorageChange);
    };
  }, [loadAllSessions]);

  useEffect(() => {
    const groupIdFromUrl = new URLSearchParams(window.location.search).get('groupId');
    setActiveSession(groupIdFromUrl);
  }, []);

  const navigateAndToggle = useCallback((path: string) => {
    router.push(path);
    if (window.innerWidth < 768) toggleSidebar();
  }, [router, toggleSidebar]);

  const handleSessionClick = useCallback((groupId: string) => {
    setActiveSession(groupId);
    navigateAndToggle(`/chatbot?groupId=${groupId}`);
  }, [navigateAndToggle]);

  const handleNewChat = useCallback(() => {
    setActiveSession(null);
    navigateAndToggle('/chatbot');
  }, [navigateAndToggle]);

  const { today, yesterday, previous7Days } = categorizeChatSessions(chatSessions);

  const renderSessionList = (sessions: ChatSession[], title: string) => (
    sessions.length > 0 && (
      <>
        <h3 className="text-sm font-semibold text-[#005D7F] mb-2">{title}</h3>
        <ul className="space-y-2 mb-4">
          {sessions.map((session) => (
            <li key={session.group_id}>
              <ChatSessionBox
                session={session}
                isActive={activeSession === session.group_id}
                onClick={() => handleSessionClick(session.group_id)}
              />
            </li>
          ))}
        </ul>
      </>
    )
  );

  return (
    <>
      <div className={`fixed top-0 left-0 w-64 h-16 bg-[#E6F7FE] transition-transform transform ${transformClasses} z-10`} />
      <div className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#E6F7FE] text-black transition-transform transform ${transformClasses} z-10 flex flex-col`}>
        <div className="flex-shrink-0 p-4">
          {/* New Chat button */}
          <button
            className="w-fit flex items-center justify-center space-x-1 p-2 bg-[#99D4EB] text-[#005D7F] rounded-lg hover:bg-[#88C2D8] active:bg-[#77B0C5] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            onClick={handleNewChat}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">New Chat</span>
          </button>
        </div>

        {/* Chat history list */}
        <div className="flex-grow overflow-y-auto p-4">
          {renderSessionList(today, "Today")}
          {renderSessionList(yesterday, "Yesterday")}
          {renderSessionList(previous7Days, "Previous 7 Days")}
          {today.length === 0 && yesterday.length === 0 && previous7Days.length === 0 && (
            <p className="text-gray-500">No chat history yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatbotSidebar;