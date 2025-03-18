import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface ChatInputProps {
  onUserMessage: (query: string) => void;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onUserMessage, isDisabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isDisabled) {
      onUserMessage(input);
      setInput('');
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isDisabled) {
      e.preventDefault(); // Prevent new line
      handleSubmit(e); // Submit the form
    }
    // If Shift + Enter is pressed, allow a new line (default behavior)
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full relative">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message CamBot"
        rows={1}
        className={`w-full px-4 py-3 pr-12 rounded-full shadow-lg border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-[#0083B1] resize-none overflow-hidden
                   transition-all duration-300 ease-in-out transform 
                   hover:scale-[1.02] focus:scale-[1.04]`}
      />
      <button
        type="submit"
        disabled={isDisabled}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center 
                    bg-[#0083B1] text-white rounded-full shadow-md transition-all duration-300 
                    hover:bg-[#007097] hover:scale-[1.1] active:scale-[0.95] ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Search className="w-5 h-5 text-white transition-all duration-300" />
      </button>
    </form>
  );
};

export default ChatInput;