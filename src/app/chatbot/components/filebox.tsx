import React from 'react';

interface FileBoxProps {
  fileName: string;
  publishDate?: string;
}

const FileBox: React.FC<FileBoxProps> = ({ fileName, publishDate }) => {
  // Generate the file URL dynamically
  const fileUrl = `https://ragfilemanagement.sgp1.cdn.digitaloceanspaces.com/${fileName}`;

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200
                 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg
                 transition-all duration-300 ease-in-out
                 w-[275px]"
    >
      <div className="flex items-center">
        {/* File Icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4208/4208479.png"
          alt="File Icon"
          className="w-10 h-10 mr-3"
        />
        <div className="min-w-0 flex-1">
          {/* File Name */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#005D7F] text-sm font-medium hover:text-[#004A6B]
                       truncate block"
            title={fileName}
          >
            {fileName}
          </a>
          {/* Publish Date */}
          {publishDate && (
            <p className="text-xs text-gray-500 italic mt-1">Published: {publishDate}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileBox;