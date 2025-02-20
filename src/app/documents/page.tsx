"use client";

import { ArrowDown, Trash2 } from "lucide-react";

const documents = [
  {
    id: 1,
    name: "00001_Policy",
    size: "7.2MB",
    type: "PDF",
    department: "Finance",
    author: "wathrak",
    date: "February 20, 2025",
  },
];

interface Document {
  id: number;
  name: string;
  size: string;
  type: string;
  department: string;
  author: string;
  date: string;
}

const DocumentCard = ({ doc }: { doc: Document }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
        <div>
          <p className="font-semibold">{doc.name}</p>
          <p className="text-sm text-gray-500">
            {doc.size} • {doc.type}
          </p>
        </div>
      </div>
      <p className="text-gray-600">{doc.author}</p>
      <p className="text-gray-500">{doc.date}</p>
      <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">
        {doc.department}
      </span>
      <button className="px-4 py-2 text-white bg-green-500 rounded-md">
        Update
      </button>
      <div className="flex gap-2">
        <button className="p-2 bg-gray-100 rounded-md">
          <ArrowDown />
        </button>
        <button className="p-2 bg-gray-100 rounded-md">
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

const FileUpload = () => {
  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Choose file
      </button>
      <p className="text-gray-500 mt-2">or drag file in here</p>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search documents"
        className="p-2 border rounded-md flex-grow"
      />
      <select className="p-2 border rounded-md">
        <option>All departments</option>
      </select>
      <select className="p-2 border rounded-md">
        <option>Newest to lowest</option>
      </select>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Search
      </button>
    </div>
  );
};

export default function DocumentsPage() {
  return (
    <div className="min-h-screen text-primary bg-gradient-to-b from-white to-[#62C9F1] flex justify-center items-center">
      <div className="min-h-screen min-w-full p-6 space-y-6">
        <h1 className="text-2xl font-bold">Documents</h1>
        <SearchBar />
        <FileUpload />
        <div className="space-y-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
