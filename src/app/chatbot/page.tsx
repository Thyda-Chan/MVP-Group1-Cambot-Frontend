'use client';

import Image from 'next/image';
import ChatInput from "@/app/chatbot/components/chatbox";
import Head from 'next/head';
import cambotlogo from '@/public/Assets_Images/cambotlogo.png';

export default function ChatbotPage() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/ADLaMDisplay.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </Head>

      <div className="flex flex-col justify-center items-center h-full px-0">
        {/* Cambot Logo */}
        <Image 
          src={cambotlogo} 
          alt="Cambot Logo" 
          width={250} 
          height={150} 
          priority 
          className="mt-0"
        />

        {/* Text with ADLaM Display font */}
        <p className="adlam-font font-bold text-[#0082B3] text-xl sm:text-2xl md:text-3xl mb-8 text-center">
          What can I help you today?
        </p>

        {/* ChatInput */}
        <div className="w-full max-w-xl">
          <ChatInput onSearch={handleSearch} />
        </div>
      </div>
    </>
  );
}
