"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SubmissionData {
  title: string;
  adminName: string;
  documentType: string;
  department: string;
  publishedDate: string;
  file?: File;
}

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

interface UploadContextType {
  documents: Document[];
  fetchDocuments: () => Promise<void>;
  loading: boolean;
  postDocuments: (data: SubmissionData) => Promise<void>;
  deleteDocument: (param: string) => Promise<void>;
  updateDocument: (file_name: string, new_file_name: string) => Promise<void>;
  data: SubmissionData | null;
  setData: (data: SubmissionData) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SubmissionData | null>(null);
  // console.log("Data::" + JSON.stringify(data));
  const author = data?.adminName;
  // console.log("author::" + author);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/file/list");
      const data = await response.json();

      const documents: Document[] = data.map((item: any, index: number) => ({
        id: item.id || index,
        name: item.file_name,
        size: formatSize(item.size),
        type: getFileType(item.file_name),
        department: "Unknown", // Manually set default department
        author: data?.adminName || "Admin", // Manually set default author or empty
        date: new Date(item.last_modified).toLocaleDateString(),
        fileURL: item.file_url.replace(
          "https://ragfilemanagement.https://",
          "https://ragfilemanagement."
        ),
      }));

      setDocuments(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const postDocuments = async (data: SubmissionData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.file!);

      const response = await fetch("http://127.0.0.1:8000/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const fileData = await response.json();
      const newDocument: Document = {
        id: fileData.id,
        name: fileData.file_name,
        size: formatSize(fileData.size),
        type: getFileType(fileData.file_name),
        department: data.department,
        author: data.adminName,
        date: new Date().toLocaleDateString(),
        fileURL: fileData.file_url,
      };

      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
      alert("File uploaded successfully: " + fileData.file_url);
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (file_name: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/file/delete?file_name=${file_name}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Delete failed");

      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.name !== file_name)
      );
      alert("File deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Error deleting file");
    }
  };

  const updateDocument = async (file_name: string, new_file_name: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/file/update?file_name=${file_name}&new_file_name=${new_file_name}`,
        { method: "PUT" }
      );

      if (!response.ok) throw new Error("Update failed");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Error updating file");
    }
  };

  useEffect(() => {
    fetchDocuments();
    if (data?.file) {
      postDocuments(data);
    }
  }, [data]);

  return (
    <UploadContext.Provider
      value={{
        documents,
        fetchDocuments,
        loading,
        postDocuments,
        deleteDocument,
        updateDocument,
        data,
        setData,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};

// Utility functions
const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
  else return `${(size / 1048576).toFixed(1)} MB`;
};

const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop();
  return extension ? extension.toUpperCase() : "Unknown";
};
