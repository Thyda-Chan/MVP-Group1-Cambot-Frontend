import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

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
      textareaRef.current.style.height = 'auto'; // Reset height to auto
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`; // Limit height to 300px
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
    <form onSubmit={handleSubmit} className="flex items-center w-full relative mb-2">
      <div className="w-full relative rounded-xl shadow-sm border border-gray-200 flex items-center">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message CamBot"
          rows={1}
          className="w-full px-4 py-2.5 pr-14 rounded-xl 
                     focus:outline-none focus:ring-1 focus:ring-[#0083B1] focus:border-transparent 
                     resize-none overflow-y-auto transition-all duration-200 ease-in-out border-0 
                     max-h-[300px]" // Set max-height to 300px
        />
        <div className="absolute right-3 inset-y-0 flex items-center z-10">
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-8 h-8 flex items-center justify-center 
                        bg-[#0083B1] text-white rounded-lg shadow-sm transition-all duration-200 
                        hover:bg-[#007097] ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;