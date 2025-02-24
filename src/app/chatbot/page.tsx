//page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import cambotlogo from '@/public/Assets_Images/cambotlogo.png';
import ChatWindow from './components/chatwindow';
import ChatInput from './components/chatinput';

export default function ChatbotPage() {
  const [hasStartedChat, setHasStartedChat] = useState(false); 
  const [userMessage, setUserMessage] = useState<string>(''); 

  const handleUserMessage = (message: string) => {
    setUserMessage(message); 
    setHasStartedChat(true); 
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/ADLaMDisplay.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </Head>

      <div className="flex flex-col justify-center items-center h-full px-0">
        {!hasStartedChat ? (
          <>
            {/* Cambot Logo */}
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

            {/* Show Chat Input only if chat hasn't started */}
            <div className="w-[600px] md:w-[600px]"> 
              <ChatInput onUserMessage={handleUserMessage} />
            </div>
          </>
        ) : (
          // Show ChatWindow once the user starts chatting
          <ChatWindow initialMessage={userMessage} />
        )}
      </div>
    </>
  );
}
