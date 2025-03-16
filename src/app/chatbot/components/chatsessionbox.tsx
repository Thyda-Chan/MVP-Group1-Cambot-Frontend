// components/ChatSessionBox.tsx
import React from "react";

interface ChatSessionBoxProps {
  session: {
    group_id: string;
    first_question: string;
  };
  isActive: boolean;
  onClick: () => void;
}

const ChatSessionBox: React.FC<ChatSessionBoxProps> = ({ session, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-lg transition-all duration-200 truncate hover:whitespace-normal hover:overflow-visible ${
        isActive
          ? "bg-[#c9f1ff] text-[#0a87b6]" // Active state
          : "bg-transparent text-[#005D7F] hover:bg-[#c9f1ff] hover:text-[#0a87b6]" // Default state with hover colors
      }`}
      title={session.first_question} // Show full text on hover
    >
      <span className="text-sm">{session.first_question}</span> {/* Smaller text */}
    </button>
  );
};

export default ChatSessionBox;