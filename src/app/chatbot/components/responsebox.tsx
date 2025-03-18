import React from 'react';
import FileBox from './filebox';

interface ResponseBoxProps {
  content: string;
  fileName?: string;
  publishDate?: string;
  fileId?: string;
  showBorder?: boolean;
  onClick?: () => void;
}

const ResponseBox: React.FC<ResponseBoxProps> = ({
  content,
  fileName,
  publishDate,
  fileId,
  showBorder = false,
  onClick,
}) => {
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
    <div
      className={`border ${showBorder ? 'border-[#005D7F] ring-2 ring-[#99D4EB]' : 'border-[#99D4EB]'} 
                 rounded-lg p-4 hover:bg-[#E6F7FE] cursor-pointer transition-all`}
      onClick={onClick}
    >
      {formatContent(content)}
      {fileName && fileId && publishDate && (
        <div className="mt-6">
          <FileBox fileId={fileId} fileName={fileName} publishDate={publishDate} />
        </div>
      )}
    </div>
  );
};

export default ResponseBox;