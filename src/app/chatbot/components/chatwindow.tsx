'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import MessageList from '../components/message';
import ChatInput from '../components/chatinput';
import FileBox from '../components/filebox';

interface ChatWindowProps {
  initialMessage: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<{ text: React.ReactNode; sender: 'user' | 'bot' }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasSentInitialMessage = useRef(false); // Prevent duplicate requests

  const addMessage = useCallback((text: React.ReactNode, sender: 'user' | 'bot') => {
    setMessages((prev) => [...prev, { text, sender }]);
  }, []);

  const getChatbotResponse = useCallback(async (query: string) => {
    setIsLoading(true);

    try {
      console.log("Sending request to backend...");
      const response = await fetch('http://127.0.0.1:8000/chat/ask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) {
        console.error("Response not OK:", response.status, response.statusText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Received response from backend:", data);

      const { response: botResponse } = data;

      // Format the bot's response with bullet points and file references
      const formattedResponse = botResponse.map((item: [string, string], index: number) => {
        const [fileName, responseText] = item;

        const formattedText = responseText.split('\n')
          .filter((line: string) => line.trim() !== '') // Filter out empty lines
          .map((line: string, lineIndex: number) => {
            // Remove the '*' from the start of each line
            const cleanedLine = line.replace(/^\*/g, '').trim();

            return (
              <div key={lineIndex} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{cleanedLine}</span>
              </div>
            );
          });

        return (
          <div key={index} className="mb-4">
            <div className="whitespace-pre-line">{formattedText}</div>
            <FileBox
              fileName={fileName}
              publishDate="No publish date available"
              fileUrl="#"
            />
          </div>
        );
      });

      addMessage(
        <div className="whitespace-pre-line">{formattedResponse}</div>,
        'bot'
      );
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      addMessage("Sorry, I couldn't fetch the response. Please try again.", 'bot');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const handleSend = useCallback((query: string) => {
    if (!query.trim()) return;
    addMessage(query, 'user');
    getChatbotResponse(query);
  }, [addMessage, getChatbotResponse]);

  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage.current) {
      hasSentInitialMessage.current = true; // Prevent duplicate execution
      setMessages([{ text: initialMessage, sender: 'user' }]);
      getChatbotResponse(initialMessage);
    }
  }, [initialMessage, getChatbotResponse]);

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      <div className="w-full bg-transparent border-t border-gray-200 flex justify-center items-center py-2">
        <div className="w-full max-w-xl">
          <ChatInput onUserMessage={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
