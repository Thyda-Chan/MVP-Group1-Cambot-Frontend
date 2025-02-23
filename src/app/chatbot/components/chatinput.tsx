//chatinput.tsx
'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ChatInputProps {
  onUserMessage: (query: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onUserMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onUserMessage(input); // Send input message to parent
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full relative transition-all duration-300 ease-in-out"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message CamBot"
        className="w-full px-4 py-3 pr-12 rounded-full shadow-lg border border-gray-200 
        focus:outline-none focus:ring-2 focus:ring-[#0083B1] 
        transition-all duration-300 ease-in-out transform 
        hover:scale-[1.02] focus:scale-[1.04]"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center 
        bg-[#0083B1] text-white rounded-full shadow-md transition-all duration-300 
        hover:bg-[#007097] hover:scale-[1.1] active:scale-[0.95]"
      >
        <Search className="w-5 h-5 text-white transition-all duration-300" />
      </button>
    </form>
  );
};

export default ChatInput;
