// components/ExtraFilesBox.tsx
import React from 'react';

interface ExtraFilesBoxProps {
  fileCount: number;
  onClick: () => void;
}

const ExtraFilesBox: React.FC<ExtraFilesBoxProps> = ({ fileCount, onClick }) => {
  return (
    <div
      className="bg-white p-3 rounded-lg shadow-md border border-gray-200
                 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg
                 transition-all duration-300 ease-in-out
                 w-[150px] h-[75px] cursor-pointer flex items-center" 
      onClick={onClick}
    >
      <div className="flex items-center">
        {/* Icon on the left side */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
          alt="File Icon"
          className="w-10 h-10 mr-2" 
        />
        <div className="min-w-0 flex-1">
          {/* Display the number of additional files */}
          <p className="text-[#005D7F] text-sm font-medium truncate">
            +{fileCount} More
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraFilesBox;