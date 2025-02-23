// message.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import userAvatar from '@/public/Assets_Images/user.png';
import botAvatar from "@/public/Assets_Images/cambotlogo.png";

interface MessageListProps {
  messages: { text: string; sender: 'user' | 'bot' }[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div 
      ref={messageListRef} 
      className="flex-1 p-4 space-y-4 overflow-y-auto scroll-smooth scrollbar-custom"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
      }}
    >
      {messages.map((msg, index) => (
        <div 
          key={index} 
          ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to the last message
          className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.sender === 'bot' && (
            <Image
              src={botAvatar}
              alt="Bot Avatar"
              width={40}
              height={40}
              className="rounded-full bg-white p-1 mr-2" // Bot logo with white background
            />
          )}
          <div
            className={`p-3 rounded-3xl max-w-[70%] bg-white text-[#005D7F] shadow-md`} // Message box with shadow
          >
            {msg.text}
          </div>
          {msg.sender === 'user' && (
            <img
              src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-photo.jpg"
              alt="User Avatar"
              width={45} // Reduced width
              height={45} // Increased height
              className="rounded-full ml-2" // Removed bg-white
            />
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-500 italic">
          <Image
            src={botAvatar}
            alt="Bot Avatar"
            width={45}
            height={45}
            className="rounded-full bg-white p-1 mr-2" // Bot logo with white background
          />
          <div>Typing...</div>
        </div>
      )}

      {/* Empty div to act as the scroll target */}
      <div ref={lastMessageRef}></div>
    </div>
  );
};

export default MessageList;