'use client'; 

import ChatInput from "@/components/chatbot/chatbox"; // Import ChatInput
import Head from 'next/head'; // Import Head for custom head elements

export default function ChatbotPage() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query); // Handle the search query
  };

  return (
    <>
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=ADLaM+Display&display=swap');
          `}
        </style>
      </Head>

      <div className="flex flex-col justify-center items-center h-full px-4">
        {/* Cambot Logo */}
        <img src="/path-to-your-assets/cambotlogo.png" alt="Cambot Logo" className="mb-4" />

        {/* Smaller text with ADLaM Display font */}
        <p className="adlam-display-regular font-bold text-[#0082B3] text-xl sm:text-2xl md:text-3xl mb-6 text-center">
          What can I help you today?
        </p>

        {/* Centered ChatInput component */}
        <div className="w-full max-w-xl">
          <ChatInput onSearch={handleSearch} />
        </div>
      </div>
    </>
  );
}
