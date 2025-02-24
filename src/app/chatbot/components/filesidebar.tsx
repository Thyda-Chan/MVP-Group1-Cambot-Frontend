// components/FilesSidebar.tsx
import React, { useEffect, useRef } from 'react';
import FileBox from './filebox';

interface File {
  fileName: string;
  fileUrl: string;
  publishDate: string;
}

interface FilesSidebarProps {
  files: File[];
  onClose: () => void;
}

const FilesSidebar: React.FC<FilesSidebarProps> = ({ files, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // smooth slide-in animation when the sidebar appears
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = 'translateX(0)';
    }
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-50" // blur effect
      onClick={onClose}
    >
      <div
        ref={sidebarRef}
        className="fixed right-6 top-6 h-[calc(100vh-48px)] w-[310px] bg-white shadow-2xl rounded-lg transform transition-transform duration-300 ease-in-out translate-x-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title and Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">File Sources</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* File List */}
        <div className="p-4 overflow-y-auto h-[calc(100%-56px)] space-y-3">
          {files.map((file, index) => (
            <FileBox key={index} {...file} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesSidebar;