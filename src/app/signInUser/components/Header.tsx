import React from 'react';
import Image from 'next/image';
import logo from '@/public/Assets_Images/cambotlogo.png'; // Adjust the path to your logo

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 p-4">
      <Image src={logo} alt="CAMBOT Logo" width={150} height={50} />
    </header>
  );
};

export default Header;