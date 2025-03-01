// chatwindow.tsx
'use client';

import React, { useState } from 'react';
import MessageList from '../components/message';
import ChatInput from '../components/chatinput';
import ChatHistorySidebar from './chatHistorysidebar';
import { mockChatHistory } from '../data/mockResponses';
import FileBox from '../components/filebox'; // Import the FileBox component

interface ChatWindowProps {
  initialMessage: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<{ text: React.ReactNode; sender: 'user' | 'bot'; files: { fileName: string; fileUrl: string; publishDate: string }[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Handle selecting a chat session
  const handleSelectChat = (chatId: string) => {
    const selectedChat = chatHistory.find((chat) => chat.chatId === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(chatId);
    }
  };

  // Handle sending a new message
  const handleSend = async (query: string) => {
    if (!query.trim()) return;

    // Add user message
    const userMessage = { text: query, sender: 'user' as const, files: [] };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response (like a backend API call)
    setIsLoading(true);
    setTimeout(() => {
      // Simulate a bot response with files (for testing)
      const botResponse = {
        text: "Here's a response to your query.",
        sender: 'bot' as const,
        files: [
          {
            fileName: "Example_File.pdf",
            fileUrl: "https://example.com/example-file.pdf",
            publishDate: "01/01/2024",
          },
        ],
      };

      // Add bot response to messages
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);

      // Update chat history
      if (currentChatId) {
        // Update existing chat session
        const updatedChatHistory = chatHistory.map((chat) =>
          chat.chatId === currentChatId
            ? { ...chat, messages: [...chat.messages, userMessage, botResponse] }
            : chat
        );
        setChatHistory(updatedChatHistory);
      } else {
        // Create a new chat session
        const newChatId = String(chatHistory.length + 1);
        const newChatSession = {
          chatId: newChatId,
          chatName: `Chat ${newChatId}`,
          messages: [userMessage, botResponse],
        };
        setChatHistory((prev) => [...prev, newChatSession]);
        setCurrentChatId(newChatId);
      }
    }, 1000);
  };

  return (
    <div className="flex h-full w-full bg-transparent">
      {/* Chat History Sidebar */}
      <ChatHistorySidebar
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* MessageList */}
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>

        {/* ChatInput */}
        <div className="w-full bg-transparent border-t border-gray-200 flex justify-center items-center py-2">
          <div className="w-full max-w-xl">
            <ChatInput onUserMessage={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;