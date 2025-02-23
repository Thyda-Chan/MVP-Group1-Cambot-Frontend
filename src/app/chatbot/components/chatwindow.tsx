//chatwindow.tsx: Manages messages, sends user input, and gets responses.
'use client';

import React, { useState } from 'react';
import MessageList from '../components/message';
import ChatInput from '../components/chatinput';

interface ChatWindowProps {
  initialMessage: string; 
}

const ChatWindow: React.FC<ChatWindowProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const getChatbotResponse = (query: string) => {
    setIsLoading(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        "hello": "Hey there! How can I assist you today?",
        "how are you": "I'm doing great! Thanks for asking. 😊",
        "what is AI": "AI stands for Artificial Intelligence, which enables machines to learn and make decisions.",
      };

      addMessage(responses[query.toLowerCase()] || "I'm not sure about that, but I'm learning every day!", 'bot');
      setIsLoading(false);
    }, 1000);
  };

  
  if (initialMessage && messages.length === 0) {
    setMessages([{ text: initialMessage, sender: 'user' }]);
    getChatbotResponse(initialMessage); 
  }

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSend = (query: string) => {
    if (!query.trim()) return;
    addMessage(query, 'user');
    getChatbotResponse(query);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-transparent">
        {/* MessageList */}
        <div className="flex-1 overflow-y-auto max-h-[500px]">
            <MessageList messages={messages} isLoading={isLoading} />
        </div>

        {/* ChatInput */}
        <div className="w-full h-24 bg-transparent border-t border-gray-200 flex justify-center items-center py-2">
            <div className="w-full max-w-xl">
            <ChatInput onUserMessage={handleSend} />
            </div>
        </div>
    </div>

  );
};

export default ChatWindow;