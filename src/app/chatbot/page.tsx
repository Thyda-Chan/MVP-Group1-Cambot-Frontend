'use client';

import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import cambotlogo from '@/public/Assets_Images/cambotlogo.png';
import ChatWindow from './components/chatwindow';
import ChatInput from './components/chatinput';
import { useSearchParams } from 'next/navigation';

export default function ChatbotPage() {
  const [hasStartedChat, setHasStartedChat] = useState(false); 
  const [userMessage, setUserMessage] = useState<string>(''); 
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');

  const handleUserMessage = (message: string) => {
    setUserMessage(message); 
    setHasStartedChat(true); 
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/ADLaMDisplay.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </Head>

      {/* Parent container with full height and no scrolling */}
      <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
        {/* Show default chat page only if no groupId and no chat has started */}
        {!groupId && !hasStartedChat ? (
          <div className="flex flex-col justify-center items-center h-full w-full">
            {/* Cambot Logo */}
            <Image
              src={cambotlogo}
              alt="Cambot Logo"
              width={250}
              height={150}
              priority
              className="mt-0"
            />

            {/* Welcome Message */}
            <p className="adlam-font font-bold text-[#0082B3] text-xl sm:text-2xl md:text-3xl mb-8 text-center">
              What can I help you today?
            </p>

            {/* Chat Input */}
            <div className="w-[600px] md:w-[600px]"> 
              <ChatInput onUserMessage={handleUserMessage} />
            </div>
          </div>
        ) : null}

        {/* Render ChatWindow only if chat has started or groupId is present */}
        {(groupId || hasStartedChat) && (
          <div className="flex flex-col h-full w-full">
            <ChatWindow initialMessage={hasStartedChat ? userMessage : ''} />
          </div>
        )}
      </div>
    </>
  );
}