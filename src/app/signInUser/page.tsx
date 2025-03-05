import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignInForm from './components/SignInForm';
import Image from 'next/image';
import bot from '@/public/Assets_Images/bot.png'; // Import the bot image

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5FCFF] to-[#62C9F1] relative">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto p-8 flex justify-center items-center h-screen">
        <div className="grid grid-cols-2 gap-8 w-full">
          {/* Left Column: Welcome Message and Bot Image (40% width) */}
          <div className="col-span-1 flex flex-col items-center justify-center -ml-20">
            {/* Welcome Text (Split into 2 lines) */}
            <h1 className="text-2xl font-bold mb-12 text-center" style={{ color: '#005D7F' }}>
              <span className="hover:underline">CAMBOT</span>: Your Effective<br /> Document Search Engine.
            </h1>

            {/* Bot Image (Smaller, Spaced, and Moved to the Left) */}
            <div className="flex justify-start -ml-20 transform transition-transform duration-300 hover:scale-110"> {/* Hover effect to pop up */}
              <Image src={bot} alt="CAMBOT Bot" width={250} height={250} className="transition-transform duration-300 hover:rotate-12" /> {/* Hover effect to rotate */}
            </div>
          </div>

          {/* Right Column: Login Form (60% width) */}
          <div className="col-span-1 bg-white rounded-lg shadow-lg">
            <SignInForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignInPage;