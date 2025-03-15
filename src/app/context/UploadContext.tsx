"use client";


import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface DocumentDatabase {
  id: string;
  created_by_id: string;
  document_type_id: string;
  department_id: string;
  title: string;
  publiced_date: string;
  created_at: string;
  updated_at: string;
}

interface SubmissionData {
  title: string;
  adminName: string;
  documentType: string;
  department: string;
  publishedDate: string;
  file?: File;
}

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
  department: string;
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
  // fetchDocumentsFromDataBase: () => Promise<void>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SubmissionData | null>(null);

  // console.log("Data::" + JSON.stringify(data));
  // const author = data?.adminName;
  // console.log("author::" + author);

  const fetchDocuments1 = async () => {
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
        author: data?.adminName || "Admin",
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
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("User is not authenticated");
      }

      const formData = new FormData();
      
      // Append file
      if (data.file) {
        formData.append("file", data.file);
      }
  
      // Append each field individually
      formData.append("title", data.title);
      formData.append("document_type_id", data.documentType);
      formData.append("department_id", data.department);
      formData.append("publiced_date", data.publishedDate);
  
      console.log("Sending form data:", {
        file: data.file?.name,
        title: data.title,
        document_type_id: data.documentType,
        department_id: data.department,
        published_date: data.publishedDate
      });
  
      const response = await fetch("http://127.0.0.1:8000/file/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload error details:", errorData);
        throw new Error(errorData.message || "Upload failed");
      }

      const fileData = await response.json();
      const newDocument: Document = {
        id: fileData.id,
        name: fileData.file_name,
        size: formatSize(fileData.size),
        type: getFileType(fileData.file_name),
        department: data.department,
        date: new Date().toLocaleDateString(),
        fileURL: fileData.file_url,
      };

      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
      alert(
        "File uploaded successfully: " +
          fileData.file_url +
          "Name: " +
          fileData.file_name
      );
    } catch (error) {
      console.error("Error uploading document:", error);
      // alert("Error uploading file");
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

  const fetchDocuments = async () => {
    // const fetchDocumentsFromDataBase = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/database/fetch_all/",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data::", data[0].id);

      const documents: Document[] = data.map((item: any, index: number) => ({
        id: item.id,
        created_by_id: item.created_by_id,
        document_type_id: item.document_type_id,
        department_id: item.department_id,
        name: item.title,
        date: item.publiced_date,
        created_at: item.created_at,
        updated_at: item.updated_at,
        author: data?.adminName || "Admin",
        type: "pdf",
        fileURL: `https://ragfilemanagement.sgp1.cdn.digitaloceanspaces.com/${item.id}.pdf`,
      }));

      // https://ragfilemanagement.sgp1.cdn.digitaloceanspaces.com/08485333-d8fa-4f6b-8757-89590c1331f8.pdf
      // https://ragfilemanagement.sgp1.cdn.digitaloceanspaces.com/a063e260-bac7-49e0-a448-0fdfb24a0fb1.pdf

      setDocuments(documents);
      console.log("documents::", documents[0].id);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
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
