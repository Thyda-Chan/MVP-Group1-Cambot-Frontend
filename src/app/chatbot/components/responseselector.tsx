import React, { useState } from 'react';
import Image from 'next/image';
import botAvatar from "@/public/Assets_Images/cambotlogo.png";
import FileBox from './filebox';

interface ResponseOption {
  fileName: string;
  content: string;
  publishDate: string;
  fileId: string;
}

interface ResponseSelectorProps {
  options: ResponseOption[];
  onSelectResponse: (option: ResponseOption, index: number) => Promise<void> | void; // Updated to allow async
}

const ResponseSelector: React.FC<ResponseSelectorProps> = ({ options, onSelectResponse }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Format response content consistent with the main chat view
  const formatContent = (content: string) => {
    if (!content) return null;

    return (
      <div className="whitespace-pre-line">
        {content
          .split('\n')
          .filter((line) => line && line.trim() !== '')
          .map((line, lineIndex) => (
            <div key={lineIndex} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{line.replace(/^\*/g, '').trim()}</span>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-[85%]">
      <div className="flex items-start">
        <Image
          src={botAvatar}
          alt="Bot Avatar"
          width={40}
          height={40}
          className="rounded-full bg-white p-1 mr-2"
        />
        <div className="p-4 rounded-3xl bg-white text-[#005D7F] shadow-md w-full">
          <p className="font-medium mb-4">I found multiple potential answers. Which one seems most relevant to your question?</p>

          {/* Display full content for each option */}
          <div className="flex flex-col space-y-6">
            {options?.map((option, index) => (
              <div
                key={index}
                className={`border ${selectedIndex === index ? 'border-[#005D7F] ring-2 ring-[#99D4EB]' : 'border-[#99D4EB]'} 
                           rounded-lg p-4 hover:bg-[#E6F7FE] cursor-pointer transition-all`}
              >
                {/* Display formatted content */}
                {formatContent(option.content)}

                {/* Include the FileBox component with increased spacing */}
                <div className="mt-6">
                  <FileBox
                    fileId={option.fileId}
                    fileName={option.fileName}
                    publishDate={option.publishDate}
                  />
                </div>

                {/* Select button at the bottom-right corner */}
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-[#005D7F] text-white px-4 py-2 rounded-md hover:bg-[#004C6A] text-sm transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                    onClick={async () => {
                      setSelectedIndex(index);
                      await onSelectResponse(option, index); // Await the async function
                    }}
                  >
                    Select Response {index + 1}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseSelector;