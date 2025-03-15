import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full p-4 text-center text-sm text-[#005D7F] bg-transparent">
      <p>© CamBot Co.LTD All rights reserved | <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> | <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a></p>
    </footer>
  );
};

export default Footer;