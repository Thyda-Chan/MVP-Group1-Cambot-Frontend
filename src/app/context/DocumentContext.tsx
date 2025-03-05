"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSubmission } from "../upload/components/SubmissionContext";

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

interface DocumentContextType {
  documents: Document[];
  fetchDocuments: () => Promise<void>;
  loading: boolean;
  postDocuments: (file: File) => Promise<void>;
  deleteDocument: (param: string) => Promise<void>;
  updateDocument: (file_name: string, new_file_name: string) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export const DocumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, setData } = useSubmission();

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
        department: "Unknown",
        author: "",
        date: new Date(item.last_modified).toLocaleDateString(),
        fileURL: item.file_url.replace(
          "https://ragfilemanagement.https://",
          "https://ragfilemanagement."
        ),
      }));

      console.log(
        "dfata::: " + JSON.stringify(documents.map((item) => item.fileURL))
      );

      setDocuments(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const postDocuments = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      alert("File uploaded successfully: " + data.file_url);
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
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.name !== file_name)
      );
      alert("File deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Error deleting file" + file_name);
    }
  };

  const updateDocument = async (file_name: string, new_file_name: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/file/update?file_name=${file_name}&new_file_name=${new_file_name}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Error updating file" + file_name);
    }
  };

  useEffect(() => {
    fetchDocuments();
    if (data && data.file) {
      postDocuments(data.file);
    }
  }, [data]);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        fetchDocuments,
        loading,
        postDocuments,
        deleteDocument,
        updateDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
};

const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
  else return `${(size / 1048576).toFixed(1)} MB`;
};

const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop();
  if (extension) {
    return extension.toUpperCase();
  }
  return "Unknown";
};
