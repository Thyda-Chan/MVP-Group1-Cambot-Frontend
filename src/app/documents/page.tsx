"use client";

import Header from "@/app/chatbot/components/header";
import { ArrowDown, CloudUpload, Search, Trash2 } from "lucide-react";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { useSubmission } from "../upload/components/SubmissionContext";
import Upload from "../upload/Upload";
import { useDocuments } from "../context/DocumentContext";

interface Document {
  id: number;
  name: string;
  size: string;
  type: string;
  department: string;
  author: string;
  date: string;
  fileURL?: string;
  postDocuments: (file: File) => Promise<void>;
  deleteDocument: (param: string) => Promise<void>;
  updateDocument: (file_name: string, new_file_name: string) => Promise<void>;
}

export default function Documents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data } = useSubmission();
  const [open, setOpen] = useState(false);
  const { documents, loading, updateDocument } = useDocuments();
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  const buttons = ["All documents", "Memo", "SOP", "Policies", "Others"];

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

            <div className="flex gap-4 items-center ml-6">
              <SearchDoc
                placeholder="Search documents"
                documents={documents}
                setFilteredDocuments={setFilteredDocuments}
              />
              <div className="flex items-center">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 bg-darkblue text-white rounded-xl"
                >
                  <div>Upload</div>
                  <CloudUpload />
                </button>
              </div>
            </div>

            <div className="font-semibold ml-6">All Documents</div>
            {loading ? (
              <div className="flex justify-center items-center h-[40vh]">
                <div className="w-10 h-10 border-4 border-darkblue border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <DocumentBox key={doc.id} doc={doc} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`absolute left-40 w-[75%] rounded-2xl ${
          open ? "opacity-100 h-auto" : "opacity-0 h-0"
        } transition-all duration-200 overflow-hidden top-12 right-0`}
      >
        <Upload setOpen={setOpen} />
      </div>
    </div>
  );
}

const DocumentBox = ({ doc }: { doc: Document }) => {
  const { deleteDocument, updateDocument } = useDocuments();
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState(doc.name);

  const updateDoc = async () => {
    if (newFileName !== doc.name) {
      await updateDocument(doc.name, newFileName);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex-1 flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-md flex justify-center items-center">
          <span className="text-gray-500">{doc.type}</span>
        </div>
        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="font-semibold truncate w-40"
            />
          ) : (
            <p className="font-semibold truncate w-40">{doc.name}</p>
          )}
          <button className="text-sm truncate w-40 text-start">
            <a
              href={doc.fileURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm truncate w-40 text-start"
            >
              link
            </a>
          </button>
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
        {isEditing ? (
          <button
            onClick={updateDoc}
            className="px-4 py-2 mr-8 bg-orange-400 text-white rounded-3xl"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 mr-6 bg-green text-white rounded-3xl"
          >
            Update
          </button>
        )}
        <button className="p-2 bg-gray-100 rounded-md">
          <ArrowDown />
        </button>
        <button
          onClick={() => deleteDocument(doc.name)}
          className="p-2 bg-gray-100 rounded-md"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

const SearchDoc = ({
  placeholder,
  documents,
  setFilteredDocuments,
}: {
  placeholder: string;
  documents: Document[];
  setFilteredDocuments: (docs: Document[]) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All departments");
  const [sortOrder, setSortOrder] = useState("Newest to Oldest");

  useEffect(() => {
    let filteredDocs = [...documents]; // Create a new array

    if (searchQuery) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDepartment !== "All departments") {
      filteredDocs = filteredDocs.filter(
        (doc) => doc.department === selectedDepartment
      );
    }

    // console.log(
    //   "Before sorting:",
    //   filteredDocs.map((d) => d.date)
    // );

    filteredDocs.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "Newest to Oldest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredDocuments([...filteredDocs]); // Force state update
  }, [searchQuery, selectedDepartment, sortOrder, documents]);

  return (
    <div className="flex gap-4">
      <div className="flex justify-between py-2 px-5 border rounded-3xl w-1/2 gap-2 bg-white focus:outline">
        <input
          type="search"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            // console.log("AFter sorting:", searchQuery);
          }}
          className="focus:outline-none w-full"
        />
        <button>
          <Search />
        </button>
      </div>

      <select
        className="p-2 border rounded-xl"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option>All departments</option>
        <option>Finance</option>
        <option>Legal</option>
        <option>HR</option>
      </select>

      <select
        className="p-2 border rounded-xl"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option>Newest to Oldest</option>
        <option>Oldest to Newest</option>
      </select>
      <button className="px-4 py-2 bg-darkblue text-white rounded-xl">
        Search
      </button>
    </div>
  );
};
