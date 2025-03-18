import React from 'react';
import Image from 'next/image';
import userAvatar from '@/public/Assets_Images/user.png';
import botAvatar from "@/public/Assets_Images/cambotlogo.png";
import ResponseBox from './responsebox';

interface MessageListProps {
  messages: { text: React.ReactNode; sender: 'user' | 'bot' }[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="w-full">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          {msg.sender === 'bot' && (
            <Image
              src={botAvatar}
              alt="Bot Avatar"
              width={40}
              height={40}
              className="rounded-full bg-white p-1 mr-2"
            />
          )}
          <div className={`p-4 rounded-3xl max-w-[70%] bg-white text-[#005D7F] shadow-md`}>
            {msg.text}
          </div>
          {msg.sender === 'user' && (
            <img
              src="https://www.mockofun.com/wp-content/uploads/2019/12/circle-photo.jpg"
              alt="User Avatar"
              width={45}
              height={45}
              className="rounded-full ml-2"
            />
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-500 italic mb-4">
          <Image
            src={botAvatar}
            alt="Bot Avatar"
            width={45}
            height={45}
            className="rounded-full bg-white p-1 mr-2"
          />
          <div>Typing...</div>
        </div>
      )}
    </div>
  );
};

export default MessageList;