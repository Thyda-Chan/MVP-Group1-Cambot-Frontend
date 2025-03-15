"use client"; // Add this directive at the top of the file

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import logo from '@/public/Assets_Images/cambotlogo.png'; // Adjust the path to your logo
import usFlag from '@/public/Assets_Images/us-flag.png'; // Import US flag image
import khFlag from '@/public/Assets_Images/kh-flag.png'; // Import Khmer flag image

const Header: React.FC = () => {
  const [language, setLanguage] = useState('English');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 p-4 w-full flex justify-between items-center">
      {/* Main Logo */}
      <Image src={logo} alt="CAMBOT Logo" width={150} height={50} />

      {/* Language Switcher with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center bg-transparent text-[#0082B3] px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 active:bg-gray-200 transform transition-transform duration-300 hover:scale-105"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Circular Flag Icon */}
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent mr-2">
            <Image
              src={language === 'English' ? usFlag : khFlag}
              alt={language === 'English' ? 'US Flag' : 'Khmer Flag'}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          {language}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
            <button
              className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('English')}
            >
              {/* Circular Flag Icon for English */}
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent mr-2">
                <Image
                  src={usFlag}
                  alt="US Flag"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              English
            </button>
            <button
              className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => handleLanguageChange('Khmer')}
            >
              {/* Circular Flag Icon for Khmer */}
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent mr-2">
                <Image
                  src={khFlag}
                  alt="Khmer Flag"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              Khmer
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;