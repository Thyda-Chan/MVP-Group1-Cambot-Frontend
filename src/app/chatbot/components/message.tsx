import React from 'react';
import FileBox from './filebox';

interface MessageListProps {
  messages: { text: React.ReactNode; sender: 'user' | 'bot'; files: { fileName: string; fileUrl: string; publishDate: string }[] }[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="space-y-4 p-4">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <div className="whitespace-pre-line">{message.text}</div>
            {message.files.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.files.map((file, fileIndex) => (
                  <FileBox key={fileIndex} {...file} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[70%] p-3 rounded-lg bg-gray-100">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;