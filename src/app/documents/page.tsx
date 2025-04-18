"use client";

import Header from "@/app/chatbot/components/header";
import {
  ArrowDown,
  ChevronRight,
  CloudUpload,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Button from "./components/Button";
import { useEffect, useState, useCallback } from "react";
import Upload from "../upload/Upload";
import { useUpload } from "../context/UploadContext";
import UpdateDocument from "./components/UpdateDocument";
import { useUser } from "../context/UserContext";
import Link from "./components/Link";
import DeleteButton from "./components/DeleteButton";
import Image from "next/image";
import pdf_logo from "@/public/Assets_Images/pdf-logo.png";
import { AuthGuard } from "../context/AuthGuard";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export interface SimpleDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  department: string;
  author: string;
  date: string;
  department_id: string;
  document_type_id: string;
  fileURL?: string;
}

export default function Documents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const {
    documents,
    loading,
    department,
    documentType,
    loadingUpload,
    loadingUploadFlag,
    setLoadingUploadFlag,
    alertFlag,
    setAlertFlag,
  } = useUpload();
  const [filteredDocuments, setFilteredDocuments] = useState<SimpleDocument[]>(
    []
  );
  const { user, fetchUsers, role } = useUser();

  // In the Documents component, update handleFilter:
  const handleFilter = useCallback(
    (query: string, department: string, sortOrder: string, docType: string) => {
      // Don't set state if nothing has changed
      const filteredDocs = documents
        .map((doc) => ({
          ...doc,
          department: doc.department || "",
          document_type_id: doc.document_type_id || "",
        }))
        .filter((doc) => {
          const matchesQuery =
            !query ||
            (doc.name && doc.name.toLowerCase().includes(query.toLowerCase()));
          const matchesDepartment =
            department === "All departments" || doc.department === department;
          const matchesType = docType === "All Types" || doc.type === docType;

          return matchesQuery && matchesDepartment && matchesType;
        });

      // Sort the filtered documents
      filteredDocs.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "Newest to Oldest" ? dateB - dateA : dateA - dateB;
      });

      setFilteredDocuments(filteredDocs);
    },
    [documents] // Only depend on documents array
  );

  // Initialize filtered documents when documents change
  useEffect(() => {
    handleFilter("", "All departments", "Newest to Oldest", "All Types");
  }, [documents, handleFilter]);

  // In the SearchDoc component, update the useEffect:

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    if (open) {
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <AuthGuard>
      <div className="min-h-screen  bg-gradient-to-b from-[#F5FCFF] to-[#62C9F1] relative">
        <div className={`${open ? "opacity-20" : ""}`}>
          <Header />
          <div
            {...(open && { onClick: () => setOpen(false) })}
            className="flex justify-center items-center"
          >
            <div className="min-h-[calc(100vh-64px)] min-w-full p-6 space-y-6">
              <div className="flex items-center gap-4 ml-6">
                <h1 className="text-2xl font-semibold">Documents</h1>
                {loadingUploadFlag === true ? (
                  <div className="absolute right-0 top-[4.5rem]">
                    <LoadingBox loading={loadingUpload} />
                  </div>
                ) : null}
              </div>

              <div>
                <AlertBox
                  isVisible={alertFlag}
                  onClose={() => setAlertFlag(false)}
                />
              </div>

              <div className="flex gap-4 items-center ml-6">
                <SearchDoc
                  placeholder="Search documents"
                  documents={documents.map((doc) => ({
                    ...doc,
                    department_id: (doc as SimpleDocument).department_id || "",
                    document_type_id:
                      (doc as SimpleDocument).document_type_id || "",
                  }))}
                  setFilteredDocuments={setFilteredDocuments}
                  handleFilter={handleFilter}
                  departments={department.map((dept) => dept.name)}
                  documentTypes={documentType.map((type) => type.name)}
                />

                <div className="flex items-center">
                  {role !== "admin" && role !== "manager" ? (
                    <div></div>
                  ) : (
                    <button
                      onClick={() => setOpen((prev) => !prev)}
                      className="flex items-center gap-2 px-4 py-2 bg-darkblue text-white rounded-xl"
                    >
                      <div>Upload</div>
                      <CloudUpload />
                    </button>
                  )}
                </div>
              </div>

              <div className="font-semibold ml-6">All Documents</div>
              {role !== "admin" && role !== "manager" ? (
                loading ? (
                  <div className="flex justify-center items-center h-[40vh]">
                    <div className="w-10 h-10 border-4 border-darkblue border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments.map((doc, index) => (
                      <DocumentBoxUser
                        key={doc.id || `${doc.name}-${index}`}
                        doc={doc}
                        setFilteredDocuments={setFilteredDocuments}
                      />
                    ))}
                  </div>
                )
              ) : loading ? (
                <div className="flex justify-center items-center h-[40vh]">
                  <div className="w-10 h-10 border-4 border-darkblue border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDocuments.map((doc, index) => (
                    <DocumentBox
                      key={doc.id || `${doc.name}-${index}`}
                      doc={doc}
                      setFilteredDocuments={setFilteredDocuments}
                    />
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
    </AuthGuard>
  );
}

const DocumentBox = ({
  doc,
  setFilteredDocuments,
}: {
  doc: SimpleDocument;
  setFilteredDocuments: React.Dispatch<React.SetStateAction<SimpleDocument[]>>;
}) => {
  const {
    deleteDocument,
    updateDocument,
    loadingUpload,
    setLoadingUpload,
    setLoadingUploadFlag,
  } = useUpload();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update handleSave in DocumentBox component
  const handleSave = (updatedDoc: SimpleDocument) => {
    setLoadingUpload(true);
    setLoadingUploadFlag(true);

    updateDocument(doc.id, {
      title: updatedDoc.name,
      publiced_date: updatedDoc.date,
      document_type_id: updatedDoc.type,
      department_id: updatedDoc.department,
    });
    setFilteredDocuments((prevDocs) =>
      prevDocs.map((d) => (d.id === doc.id ? { ...d, ...updatedDoc } : d))
    );
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex-1 flex items-center gap-4">
        <Image src={pdf_logo} alt="pdf-logo" width={32} height={32} />
        <div className="flex flex-col">
          <div className="relative group w-64">
            <p className="font-semibold truncate w-full">{doc.name}</p>
            <span className="absolute left-0 top-[-25px] mt-1 w-max max-w-fit bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
              {doc.name}
            </span>
          </div>

          <button className="text-sm truncate w-40 text-start underline text-darkblue">
            <Link fileURL={doc.fileURL || ""}>Link</Link>
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
          {doc.author[0]}
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 mr-6 bg-green text-white rounded-3xl"
        >
          Update
        </button>
        {/* 
        <button className="p-2 bg-gray-100 rounded-md">
          <ArrowDown />
        </button> */}

        <DeleteButton doc={doc} />
      </div>

      <UpdateDocument
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doc={doc}
        onSave={handleSave}
      />
    </div>
  );
};

const SearchDoc = ({
  placeholder,
  documents,
  setFilteredDocuments,
  handleFilter,
  departments,
  documentTypes,
}: {
  placeholder: string;
  documents: SimpleDocument[];
  setFilteredDocuments: (docs: SimpleDocument[]) => void;
  handleFilter: (
    query: string,
    department: string,
    sortOrder: string,
    docType: string
  ) => void;
  departments: string[];
  documentTypes: string[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All departments");
  const [sortOrder, setSortOrder] = useState("Newest to Oldest");
  const [selectedType, setSelectedType] = useState("All Types");

  // Debounce the filter calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFilter(searchQuery, selectedDepartment, sortOrder, selectedType);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedDepartment, sortOrder, selectedType, handleFilter]);

  return (
    <div className="flex gap-4">
      <div className="flex justify-between py-2 px-5 border rounded-3xl w-1/2 gap-2 bg-white focus:outline">
        <input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
        {departments.map((dept, index) => (
          <option key={index}>{dept}</option>
        ))}
      </select>

      <select
        className="p-2 border rounded-xl"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option>All Types</option>
        {documentTypes.map((type, index) => (
          <option key={index}>{type}</option>
        ))}
      </select>

      <select
        className="p-2 border rounded-xl"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option>Newest to Oldest</option>
        <option>Oldest to Newest</option>
      </select>
    </div>
  );
};

const DocumentBoxUser = ({
  doc,
}: {
  doc: SimpleDocument;
  setFilteredDocuments: React.Dispatch<React.SetStateAction<SimpleDocument[]>>;
}) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex-1 flex items-center gap-4">
        <Image src={pdf_logo} alt="pdf-logo" width={32} height={32} />
        <div className="flex flex-col">
          <div className="relative group w-40">
            <p className="font-semibold truncate w-full">{doc.name}</p>
            <span className="absolute left-0 top-[-25px] mt-1 w-max max-w-xs bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
              {doc.name}
            </span>
          </div>

          <button className="text-sm truncate w-40 text-start underline text-darkblue">
            <Link fileURL={doc.fileURL || ""}>Link</Link>
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
          {doc.author[0]}
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
    </div>
  );
};

const LoadingBox: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [loading]);

  return (
    visible && (
      <div className="w-64 p-2 border rounded-lg shadow-md flex flex-col items-center text-center">
        {loading ? (
          <>
            <div className="flex space-x-5">
              <p className="text-sm text-gray-500">Uploading...</p>
              {/* <div className="w-4 h-4 border-4 border-gray-300 border-t-darkblue rounded-full animate-spin mb-3"></div> */}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="w-full bg-darkblue h-2 rounded-full animate-pulse"></div>
            </div>
          </>
        ) : (
          <div className="flex">
            <p className="text-sm text-gray-800 animate-pulse">
              Upload Complete!
            </p>
          </div>
        )}
      </div>
    )
  );
};

const AlertBox: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  const handleClose = () => {
    onClose();
    isVisible = false;
  };

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-4 rounded-md flex flex-col justify-center items-center space-y-4 shadow-lg"
      >
        <span>Document deleted successfully!</span>
        <button
          onClick={onClose}
          className="w-1/4 h-fit p-2 bg-red-500 text-white text-sm rounded-md"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};
