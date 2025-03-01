import React from 'react';

interface ChatSession {
  chatId: string;
  chatName: string;
  messages: { sender: 'user' | 'bot'; text: string; files: { fileName: string; fileUrl: string; publishDate: string }[] }[];
}

interface ChatHistorySidebarProps {
  chatHistory: ChatSession[];
  onSelectChat: (chatId: string) => void;
  currentChatId: string | null;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({ chatHistory, onSelectChat, currentChatId }) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <ul className="space-y-2">
        {chatHistory.map((chat) => (
          <li
            key={chat.chatId}
            className={`p-2 rounded-lg cursor-pointer ${
              chat.chatId === currentChatId ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectChat(chat.chatId)}
          >
            <p className="text-sm font-medium">{chat.chatName}</p>
            <p className="text-xs text-gray-500">{chat.messages.length} messages</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistorySidebar;