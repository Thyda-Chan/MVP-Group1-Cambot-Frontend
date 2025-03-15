"use client"; // Add this directive at the top of the file

import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
import Header from './components/header';
import Image from 'next/image';
import bot from '@/public/Assets_Images/bot.png'; // Ensure this path is correct
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const MainPage = () => {
  const [showBotImage, setShowBotImage] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [showSmallText, setShowSmallText] = useState(false);
  const [showSignInButton, setShowSignInButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out animation
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Show the bot image first with a pop-up animation
    const botImageTimeout = setTimeout(() => {
      setShowBotImage(true);
    }, 500); // Delay before showing the bot image

    // Show the welcome text after the bot image appears
    const welcomeTimeout = setTimeout(() => {
      setShowWelcomeText(true);
    }, 1500); // Delay after bot image appears

    // Show the small text after the welcome text finishes typing
    const smallTextTimeout = setTimeout(() => {
      setShowSmallText(true);
    }, 4000); // Delay after welcome text finishes typing

    // Show the Sign In button after the small text appears
    const signInButtonTimeout = setTimeout(() => {
      setShowSignInButton(true);
    }, 4500); // Delay after small text appears

    // Cleanup timeouts to avoid memory leaks
    return () => {
      clearTimeout(botImageTimeout);
      clearTimeout(welcomeTimeout);
      clearTimeout(smallTextTimeout);
      clearTimeout(signInButtonTimeout);
    };
  }, []);

  // Handle Sign In button click
  const handleSignInClick = () => {
    setIsFadingOut(true); // Start fade-out animation
    setTimeout(() => {
      router.push('/signInUser'); // Redirect to the sign-in page after animation
    }, 500); // Wait for the fade-out animation to complete
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#F5FCFF] to-[#62C9F1] relative ${
        isFadingOut ? 'fade-out' : ''
      }`}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto p-8 flex flex-col justify-center items-center h-screen">
        {/* Bot Image at the Top */}
        <div
          className={`mt-8 transform transition-transform duration-300 ${
            showBotImage ? 'pop-up' : 'invisible'
          }`}
        >
          <Image src={bot} alt="CAMBOT Bot" width={200} height={200} />
        </div>

        {/* Add space below the bot image */}
        <div className="mb-8"></div>

        {/* Welcome Text and Sign In Button at the Bottom */}
        <div className="text-center">
          {/* Welcome Text with Typing Animation */}
          <h1
            className={`text-4xl font-bold text-[#0082B3] mb-4 ${
              showWelcomeText ? 'typing-animation' : 'invisible'
            }`}
          >
            Welcome to CAMBOT Document Search Engine!
          </h1>

          {/* Small Text */}
          <p
            className={`text-lg text-[#0082B3] mb-8 ${
              showSmallText ? 'pop-up' : 'invisible'
            }`}
          >
            For secure access, please sign in to ensure you are a part of the company.
          </p>

          {/* Sign In Button */}
          <button
            onClick={handleSignInClick} // Add onClick handler
            className={`bg-[#0082B3] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#006A9B] active:bg-[#005580] transform transition-transform duration-300 hover:scale-105 ${
              showSignInButton ? 'pop-up' : 'invisible'
            }`}
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;