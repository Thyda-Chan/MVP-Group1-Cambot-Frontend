"use client";

import Header from "@/app/chatbot/components/header";
import { ArrowDown, CloudUpload, Trash2 } from "lucide-react";
import SearchDoc from "./components/SearchDoc";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import { useState } from "react";
import { useSubmission } from "../upload/components/SubmissionContext";
import pdfImg from "@/public/Assets_Images/pdf1.png";
import Upload from "../upload/page";

interface Document {
  id: number;
  name: string;
  size: string;
  type: string;
  department: string;
  author: string;
  date: string;
  fileURL?: string;
}

export default function Documents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data } = useSubmission();
  const [open, setOpen] = useState(false);

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
          fileURL: data.file ? URL.createObjectURL(data.file) : "",
        },
      ]
    : [];

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "00001_Policyd33safds212",
      size: "7.2MB",
      type: "PDF",
      department: "Finance",
      author: "Wathrak",
      date: "February 20, 2025",
      fileUrl: pdfImg,
    },
    {
      id: 2,
      name: "00002_SOP",
      size: "7.2MB",
      type: "PDF",
      department: "Legal",
      author: "Wathrak",
      date: "February 20, 2025",
    },
    ...submittedDocument,
  ]);

  const deleteFile = (id: number) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc) => doc.id !== id)
    );
  };

  return (
    <div>
      <div className={`${open ? "opacity-20" : ""}`}>
        <Header />
        <div
          {...(open && { onClick: () => setOpen(false) })}
          className="text-primary bg-gradient-to-b from-white to-[#62C9F1] flex justify-center items-center"
        >
          <div className="min-h-[calc(100vh-64px)] min-w-full p-6 space-y-6">
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
            <div className="flex items-center justify-end">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="px-4 py-2 bg-green text-white rounded-xl"
              >
                <CloudUpload />
              </button>
            </div>

            <div className="font-semibold ml-6">All Documents</div>
            <div className="space-y-4">
              {documents.map((doc) => (
                <DocumentBox
                  key={doc.id}
                  doc={doc}
                  deleteFile={() => deleteFile(doc.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-40 w-[75%] rounded-2xl ${
          open ? "opacity-100 h-auto" : "opacity-0 h-0"
        } transition-all duration-200 overflow-hidden absolute top-12 right-0`}
      >
        <Upload />
      </div>
    </div>
  );
}

const DocumentBox = ({
  doc,
  deleteFile,
}: {
  doc: Document;
  deleteFile: () => void;
}) => {
  const isPDF = doc.type.toLowerCase() === "pdf";
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex-1 flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-md">
          {isPDF ? (
            <embed
              src={doc.fileURL}
              type="application/pdf"
              className="w-12 h-12 rounded-md"
            />
          ) : (
            <span className="text-gray-500">{doc.type}</span>
          )}
        </div>
        <div>
          <p className="font-semibold truncate w-40">{doc.name}</p>
        </div>
      </div>
      <div className="flex-1 flex gap-x-4 justify-center">
        <div className="border rounded-xl px-2 text-sm font-semibold bg-skyblue">
          {doc.type}
        </div>
        <p className="text-sm text-darkblue">{doc.size}</p>
      </div>

      <div className="flex-1 flex items-center gap-x-4">
        <div className="w-10 h-10 border bg-gray-200 rounded-full flex justify-center items-center">
          W
        </div>
        <div>
          <p className="text-gray-600">{doc.author}</p>
          <p className="text-gray-500">{doc.date}</p>
        </div>
      </div>
      <div className="flex-1">
        <div className="w-fit min-w-20 px-3 py-1 text-center text-sm bg-blue-100 text-blue-600 rounded-md">
          {doc.department}
        </div>
      </div>
      <div className="flex-1 gap-2 flex justify-end">
        <button className="px-4 py-2 mr-6 bg-green text-white rounded-md">
          Update
        </button>
        <button className="p-2 bg-gray-100 rounded-md">
          <ArrowDown />
        </button>
        <button onClick={deleteFile} className="p-2 bg-gray-100 rounded-md">
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
