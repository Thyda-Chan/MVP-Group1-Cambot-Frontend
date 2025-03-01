import Link from "next/link";
import React from "react";

interface ChatSession {
  chatId: string;
  chatName: string;
  messages: { sender: "user" | "bot"; text: string; files: { fileName: string; fileUrl: string; publishDate: string }[] }[];
}

interface ChatHistoryProps {
  chatHistory: ChatSession[];
  onSelectChat: (chatId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory, onSelectChat }) => {
  return (
    <div className="h-[50%] overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <ul>
        {chatHistory.map((session) => (
          <li key={session.chatId} className="mb-2">
            <button
              onClick={() => onSelectChat(session.chatId)}
              className="text-left w-full hover:text-[#005D7F]"
            >
              {session.chatName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;

// import Link from "next/link";
// import React from "react";

// const ChatHistory = () => {
//   // Chat history data
//   const chatHistoryLinks = [
//     { href: "/chatbot/history/session1", label: "Session 1" },
//     { href: "/chatbot/history/session2", label: "Session 2" },
//     { href: "/chatbot/history/session3", label: "Session 3" },
//   ];

//   return (
//     <div className="h-[50%] overflow-y-auto p-4">
//       <h2 className="text-lg font-semibold mb-4">Chat History</h2>
//       <ul>
//         {chatHistoryLinks.map((link, index) => (
//           <li key={index} className="mb-2">
//             <Link href={link.href}>{link.label}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatHistory;