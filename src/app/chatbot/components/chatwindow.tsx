'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import MessageList from '../components/message';
import ChatInput from '../components/chatinput';
import FileBox from '../components/filebox';
import { useRouter, useSearchParams } from 'next/navigation';

interface ChatWindowProps {
  initialMessage: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState<{ text: React.ReactNode; sender: 'user' | 'bot' }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<string>('');
  const hasSentInitialMessage = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');

  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state when groupId is cleared (i.e., new chat)
    if (!groupId) {
      setMessages([]); // Clear messages
      setCurrentGroupId(''); // Clear groupId
      hasSentInitialMessage.current = false; // Reset initial message flag
    } else {
      setCurrentGroupId(groupId);
      fetchChatHistory(groupId);
    }
  }, [groupId]);

  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage.current && !groupId) {
      // Handle new chat
      hasSentInitialMessage.current = true;
      setMessages([{ text: initialMessage, sender: 'user' }]);
      getChatbotResponse(initialMessage);
    }
  }, [initialMessage, groupId]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatHistory = async (groupId: string) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(`http://127.0.0.1:8000/chat/history/?group_id=${groupId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const formattedMessages = formatMessages(data.data);
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setMessages([{ text: "Failed to load chat history. Please try again.", sender: 'bot' }]);
    }
  };

  const formatMessages = (chats: any[]) => {
    return chats.flatMap((chat: any) => {
      const userMessage = { text: chat.question, sender: 'user' as const };
      const botResponse = chat.answer.map((item: [string, string]) => {
        const [fileName, responseText] = item;
        const formattedText = responseText
          .split('\n')
          .filter((line: string) => line.trim() !== '')
          .map((line: string, lineIndex: number) => (
            <div key={lineIndex} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{line.replace(/^\*/g, '').trim()}</span>
            </div>
          ));

        return (
          <div key={fileName} className="mb-4">
            <div className="whitespace-pre-line">{formattedText}</div>
            <FileBox fileName={fileName} publishDate="No publish date available" fileUrl="#" />
          </div>
        );
      });

      return [
        userMessage, // User's question
        { text: botResponse, sender: 'bot' as const }, // Bot's answer
      ];
    });
  };

  const getChatbotResponse = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch('http://127.0.0.1:8000/chat/ask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ 
          question: query,
          groupId: currentGroupId || ""
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCurrentGroupId(data.group_id);

      // Format only the bot's response
      const botResponse = data.response.map((item: [string, string]) => {
        const [fileName, responseText] = item;
        const formattedText = responseText
          .split('\n')
          .filter((line: string) => line.trim() !== '')
          .map((line: string, lineIndex: number) => (
            <div key={lineIndex} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{line.replace(/^\*/g, '').trim()}</span>
            </div>
          ));

        return (
          <div key={fileName} className="mb-4">
            <div className="whitespace-pre-line">{formattedText}</div>
            <FileBox fileName={fileName} publishDate="No publish date available" fileUrl="#" />
          </div>
        );
      });

      // Add only the bot's response to the messages
      setMessages((prev) => [
        ...prev,
        { text: botResponse, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't fetch the response. Please try again.", sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [currentGroupId]);

  const handleSend = useCallback((query: string) => {
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { text: query, sender: 'user' }]);
    getChatbotResponse(query);
  }, [getChatbotResponse]);

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      {/* Chat messages with scroll */}
      <div className="flex-1 p-4 overflow-y-auto" ref={chatWindowRef}>
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Chat input fixed at the bottom */}
      <div className="w-full bg-transparent border-t border-gray-200 flex justify-center items-center py-2 fixed bottom-0">
        <div className="w-full max-w-xl">
          <ChatInput onUserMessage={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;