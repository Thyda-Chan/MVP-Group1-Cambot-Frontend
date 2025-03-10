'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import cambotlogo from '@/public/Assets_Images/cambotlogo.png';
import ChatWindow from './components/chatwindow';
import ChatInput from './components/chatinput';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ChatbotPage() {
  const [hasStartedChat, setHasStartedChat] = useState(false); 
  const [userMessage, setUserMessage] = useState<string>(''); 
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');
  const router = useRouter();

  // Check for existing session on page load
  useEffect(() => {
    // If there's a groupId in the URL, we're already in a session
    if (groupId) {
      setHasStartedChat(true);
    } else {
      // Reset to welcome screen when there's no groupId
      setHasStartedChat(false);
      setUserMessage('');
    }
  }, [groupId]);

  const handleUserMessage = (message: string) => {
    setUserMessage(message); 
    setHasStartedChat(true); 
  };

  // Function to handle new chat request
  const handleNewChat = () => {
    setHasStartedChat(false);
    setUserMessage('');
    router.push('/chatbot');
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/ADLaMDisplay.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </Head>
      <div className="flex flex-col h-screen">
        {!groupId && !hasStartedChat ? (
          <div className="flex flex-col justify-center items-center h-full w-full">
            <Image
              src={cambotlogo}
              alt="Cambot Logo"
              width={250}
              height={150}
              priority
              className="mt-0"
            />
            <p className="adlam-font font-bold text-[#0082B3] text-xl sm:text-2xl md:text-3xl mb-8 text-center">
              What can I help you today?
            </p>
            <div className="w-full max-w-[600px] px-4"> 
              <ChatInput onUserMessage={handleUserMessage} />
            </div>
          </div>
        ) : (
          <ChatWindow initialMessage={hasStartedChat ? userMessage : ''} onNewChat={handleNewChat} />
        )}
      </div>
    </>
  );
}