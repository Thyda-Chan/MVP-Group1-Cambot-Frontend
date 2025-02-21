"use client";

import Header from "@/components/chatbot/header";
import { ArrowDown, Trash2 } from "lucide-react";
import SearchDoc from "./SearchDoc";
import Searchbar from "./Searchbar";
import Button from "./Button";
import { useState } from "react";
import { useSubmission } from "../upload/SubmissionContext";
interface Document {
  id: number;
  name: string;
  size: string;
  type: string;
  department: string;
  author: string;
  date: string;
}

export default function Documents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data } = useSubmission();

  const buttons = ["All documents", "Memo", "SOP", "Policies", "Others"];
  const submittedDocument = data
    ? [
        {
          id: Math.floor(Math.random() * 1000),
          name: data.title || "Untitled Document",
          size: "",
          type: data.file
            ? data.file.type.split("/")[1].toUpperCase()
            : "Unknown",
          department: data.department || "Unknown",
          author: data.adminName || "Unknown",
          date: data.publishedDate || new Date().toLocaleDateString(),
        },
      ]
    : [];

  const documents = [
    {
      id: 1,
      name: "00001_Policyd33safds212",
      size: "7.2MB",
      type: "PDF",
      department: "Finance",
      author: "Wathrak",
      date: "February 20, 2025",
    },
    {
      id: 2,
      name: "00001_SOP",
      size: "7.2MB",
      type: "PDF",
      department: "Finance",
      author: "Wathrak",
      date: "February 20, 2025",
    },
    ...submittedDocument,
  ];

  return (
    <div>
      <Header />
      <div className="min-h-screen text-primary bg-gradient-to-b from-white to-[#62C9F1] flex justify-center items-center">
        <div className="min-h-screen min-w-full p-6 space-y-6">
          <Searchbar />
          <div className="flex items-center gap-4 ml-6">
            <h1 className="text-2xl font-semibold">Documents</h1>
            <div className="flex space-x-2">
              {buttons.map((title, index) => (
                <Button
                  key={index}
                  title={title}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
          <SearchDoc placeholder="Search documents" />
          <FileUpload />
          <div className="font-semibold ml-6">All Documents</div>
          <div className="space-y-4">
            {documents.map((doc) => (
              <DocumentBox key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DocumentBox = ({ doc }: { doc: Document }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex-1 flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
        <div>
          <p className="font-semibold truncate w-32">{doc.name}</p>
          <p className="text-sm text-gray-500">
            {doc.size} • {doc.type}
          </p>
        </div>
      </div>
      <p className="flex-1 text-gray-600">{doc.author}</p>
      <p className="flex-1 text-gray-500">{doc.date}</p>
      <div className="flex-1">
        <div className="w-fit px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">
          {doc.department}
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <button className="px-4 py-2 bg-green text-white rounded-md">
          Update
        </button>
      </div>
      <div className="flex-1 gap-2 flex justify-end">
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
    <div className="p-6 border-2 border-dashed border-blue-400 bg-[#a1d8eb] rounded-lg text-center">
      <button className="px-4 py-2 bg-darkblue text-white rounded-xl">
        Choose file
      </button>
      <p className="text-gray-500 mt-2">or drag file in here</p>
    </div>
  );
};
