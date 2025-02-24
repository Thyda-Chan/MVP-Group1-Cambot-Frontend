// components/FileBox.tsx
import React from 'react';

interface FileBoxProps {
  fileName: string;
  publishDate: string;
  fileUrl: string;
}

const FileBox: React.FC<FileBoxProps> = ({ fileName, publishDate, fileUrl }) => {
  return (
    <div
      className="bg-white p-3 rounded-lg shadow-md border border-gray-200
                 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg
                 transition-all duration-300 ease-in-out
                 w-[275px] h-[75px] flex items-center" 
    >
      <div className="flex items-center w-full">
        {/* Icon on the left side */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
          alt="File Icon"
          className="w-10 h-10 mr-3" 
        />
        <div className="min-w-0 flex-1 overflow-hidden">
          {/* Make the file name clickable */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#005D7F] text-sm font-medium hover:text-[#004A6B]
                       truncate block w-full" // Truncate the file name with ellipsis
            title={fileName} // Show full file name in a tooltip on hover
          >
            {fileName}
          </a>
          {/* Add space and make the published date italic */}
          <p className="text-xs text-gray-500 italic mt-1">Published: {publishDate}</p>
        </div>
      </div>
    </div>
  );
};

export default FileBox;