// chatwindow.tsx
'use client';

import React, { useState } from 'react';
import MessageList from '../components/message';
import ChatInput from '../components/chatinput';
import FileBox from '../components/filebox';
import ExtraFilesBox from '../components/extrafilesbox';
import FilesSidebar from '../components/filesidebar';
import { responses } from '../data/mockResponses'; 

interface ChatWindowProps {
  initialMessage: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<{ text: React.ReactNode; sender: 'user' | 'bot' }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [files, setFiles] = useState<{ fileName: string; fileUrl: string; publishDate: string }[]>([]);

  const getChatbotResponse = (query: string) => {
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = responses[query.toLowerCase()] || {
        response: "I'm not sure about that, but I'm learning every day!",
        files: [],
      };

      // Add the bot's response with formatting
      addMessage(
        <>
          <div className="whitespace-pre-line">{botResponse.response}</div>
          {botResponse.files.length > 0 && (
            <div className="mt-4 mb-4 space-y-2"> 
              {/* Display first 2 files side by side */}
              <div className="flex gap-2">
                {botResponse.files.slice(0, 2).map((file: { fileName: string; fileUrl: string; publishDate: string }, index: number) => (
                  <FileBox key={index} {...file} />
                ))}
                {/* Display extra box for additional files */}
                {botResponse.files.length > 2 && (
                  <ExtraFilesBox
                    fileCount={botResponse.files.length - 2}
                    onClick={() => {
                      setFiles(botResponse.files);
                      setShowSidebar(true);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </>,
        'bot'
      );

      setIsLoading(false);
    }, 1000);
  };

  const addMessage = (text: React.ReactNode, sender: 'user' | 'bot') => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSend = (query: string) => {
    if (!query.trim()) return;
    addMessage(query, 'user');
    getChatbotResponse(query);
  };

  if (initialMessage && messages.length === 0) {
    setMessages([{ text: initialMessage, sender: 'user' }]);
    getChatbotResponse(initialMessage);
  }

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

      {/* Sidebar for displaying all files */}
      {showSidebar && <FilesSidebar files={files} onClose={() => setShowSidebar(false)} />}
    </div>
  );
};

export default ChatWindow;