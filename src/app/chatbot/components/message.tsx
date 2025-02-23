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

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={messageListRef} 
      className="flex-1 p-4 space-y-4 max-h-[80vh] overflow-y" 
    >
      {messages.map((msg, index) => (
        <div key={index} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.sender === 'bot' && (
            <Image src={botAvatar} alt="Bot Avatar" width={40} height={40} className="rounded-full mr-2" />
          )}
          <div
            className={`p-3 rounded-lg max-w-[70%] shadow-md ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {msg.text}
          </div>
          {msg.sender === 'user' && (
            <img
                src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-photo.jpg" 
                alt="User Avatar" width={40} height={40} className="rounded-full ml-2" 
            />
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-500 italic">
          <Image src={botAvatar} alt="Bot Avatar" width={40} height={40} className="rounded-full mr-2" />
          <div>Typing...</div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
