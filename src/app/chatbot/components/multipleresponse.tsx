// components/MultipleResponses.tsx
import React from 'react';
import FileBox from './filebox';

interface Response {
  response: string;
  files: { fileName: string; fileUrl: string; publishDate: string }[];
}

interface MultipleResponsesProps {
  responses: Response[];
}

const MultipleResponses: React.FC<MultipleResponsesProps> = ({ responses }) => {
  return (
    <div className="space-y-4">
      {responses.map((response, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {/* Response Text */}
          <div className="whitespace-pre-line text-sm text-gray-700">
            {response.response}
          </div>

          {/* Files */}
          {response.files.length > 0 && (
            <div className="mt-3 space-y-2">
              {response.files.map((file, fileIndex) => (
                <FileBox key={fileIndex} {...file} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultipleResponses;