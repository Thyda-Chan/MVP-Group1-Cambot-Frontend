// chatwindow.tsx
'use client';

import React, { useState } from 'react';
import MessageList from '../components/message';
import ChatInput from '../components/chatinput';
import FileBox from '../components/filebox'; // Import the FileBox component

interface ChatWindowProps {
  initialMessage: string; 
}

const ChatWindow: React.FC<ChatWindowProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<{ text: React.ReactNode; sender: 'user' | 'bot' }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getChatbotResponse = (query: string) => {
    setIsLoading(true);

    setTimeout(() => {
      const responses: Record<string, { response: string; fileSource: string; publishDate: string }> = {
        "mini agent": {
          response: ` 
            We are excited to introduce the Mini Agent Service, designed to improve customer accessibility and enhance banking convenience. This initiative aims to provide essential banking services through authorized agents in local communities.

            **Key Highlights:**
            - Enhanced Accessibility: Customers can access basic banking services closer to their location.
            - Faster Transactions: Reduce wait times at branches by enabling quick transactions via agents.
            - Secure & Reliable: Ensures compliance with banking regulations for safe transactions.
            - Increased Financial Inclusion: Expands banking access to underserved areas.

            **Implementation Date:** The Mini Agent Service is scheduled to launch on February 24, 2025. Further details on training and rollout will be shared soon.
          `,
          fileSource: "https://example.com/memo-mini-agent-2025.pdf",
          publishDate: "01/15/2025",
        },
        "hello": {
          response: "Hey there! How can I assist you today?",
          fileSource: "",
          publishDate: "",
        },
        "how are you": {
          response: "I'm doing great! Thanks for asking. 😊",
          fileSource: "",
          publishDate: "",
        },
        "what is ai": {
          response: "AI stands for Artificial Intelligence, which enables machines to learn and make decisions.",
          fileSource: "",
          publishDate: "",
        },
      };

      const botResponse = responses[query.toLowerCase()] || {
        response: "I'm not sure about that, but I'm learning every day!",
        fileSource: "",
        publishDate: "",
      };

      // Add the bot's response with formatting
      addMessage(
        <>
          <div className="whitespace-pre-line">{botResponse.response}</div>
          {botResponse.fileSource && (
            <FileBox
              fileName="Memo_012-Mini Agent_2024"
              publishDate={botResponse.publishDate}
              fileUrl={botResponse.fileSource}
            />
          )}
        </>,
        'bot'
      );

      setIsLoading(false);
    }, 1000);
  };

  if (initialMessage && messages.length === 0) {
    setMessages([{ text: initialMessage, sender: 'user' }]);
    getChatbotResponse(initialMessage); 
  }

  const addMessage = (text: React.ReactNode, sender: 'user' | 'bot') => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSend = (query: string) => {
    if (!query.trim()) return;
    addMessage(query, 'user');
    getChatbotResponse(query);
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
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
  );
};

export default ChatWindow;