"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface UploadContextType {
  documents: Document[];
  fetchDocuments: () => Promise<void>;
  loading: boolean;
  postDocuments: (data: SubmissionData) => Promise<void>;
  deleteDocument: (param: string) => Promise<void>;
  updateDocument: (
    document_id: string,
    updateData: {
      title?: string;
      publiced_date?: string;
      document_type_id?: string;
      department_id?: string;
    }
  ) => Promise<void>;
  data: SubmissionData | null;
  setData: (data: SubmissionData) => void;
  department: Department[];
  documentType: DocumentType[];
  loadingUpload: boolean;
  setLoadingUpload: React.Dispatch<React.SetStateAction<boolean>>;
  loadingUploadFlag: boolean;
  setLoadingUploadFlag: React.Dispatch<React.SetStateAction<boolean>>;
  alertFlag: boolean;
  setAlertFlag: React.Dispatch<React.SetStateAction<boolean>>;
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
  document_type_id: string;
  department_id: string;
  fileURL?: string;
  author: string;
}

interface Department {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface DocumentType {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const LOCALHOST = "http://127.0.0.1:8000";

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SubmissionData | null>(null);
  const [department, setDepartment] = useState<Department[]>([]);
  const [documentType, setDocumentType] = useState<DocumentType[]>([]);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const [loadingUploadFlag, setLoadingUploadFlag] = useState<boolean>(false);
  const [alertFlag, setAlertFlag] = useState<boolean>(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${LOCALHOST}/database/fetch_all?`);
      const data = await response.json();

      const documents: Document[] = data.map((item: any, index: number) => ({
        id: item.id || index,
        name: item.title,
        type: item.document_type || "Other",
        department: item.department_type || "Unknown",
        author: item.created_by || "Admin",
        date: item.publiced_date ? item.publiced_date.split("T")[0] : "Unknown",
        fileURL: `https://ragfilemanagement.sgp1.cdn.digitaloceanspaces.com/${item.id}.pdf`,
      }));

      setDocuments(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const postDocuments = async (data: SubmissionData) => {
    setLoadingUpload(true);
    setLoadingUploadFlag(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("User is not authenticated");
      }

      // Find the correct department ID based on the selected name
      const selectedDepartment = department.find(
        (dept) => dept.name === data.department
      );
      const selectedDocumentType = documentType.find(
        (docType) => docType.name === data.documentType
      );

      if (!selectedDepartment) {
        throw new Error("Invalid department selected");
      }
      if (!selectedDocumentType) {
        throw new Error("Invalid document type selected");
      }

      const formData = new FormData();

      if (data.file) {
        formData.append("file", data.file);
      }

      formData.append("title", data.title);
      formData.append("document_type_id", selectedDocumentType.id);
      formData.append("department_id", selectedDepartment.id);
      formData.append("publiced_date", data.publishedDate);

      console.log("Sending form data:", {
        file: data.file?.name,
        title: data.title,
        document_type_id: selectedDocumentType.id,
        department_id: selectedDepartment.id,
        published_date: data.publishedDate,
      });

      const response = await fetch(`${LOCALHOST}/file/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
        document_type_id: fileData.document_type_id,
        department_id: fileData.department_id,
        type: getFileType(fileData.file_name),
        department: selectedDepartment.name,
        date: new Date().toLocaleDateString(),
        fileURL: fileData.file_url,
        author: "",
      };

      setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
      // alert(
      //   "File uploaded successfully: " +
      //     fileData.file_url +
      //     " Name: " +
      //     fileData.file_name
      // );
      setLoadingUpload(false);
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      // setLoadingUpload(false);
    }
  };

  const deleteDocument = async (file_name: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${LOCALHOST}/file/delete?file_name=${file_name}`,
        { method: "DELETE" }
      );

      // setDocuments((prevDocuments) =>
      //   prevDocuments.filter((doc) => doc.name !== file_name)
      // );
      await fetchDocuments();
      // alert("File deleted successfully");
      setAlertFlag(true);
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (
    document_id: string,
    updateData: {
      title?: string;
      publiced_date?: string;
      document_type_id?: string;
      department_id?: string;
    }
  ) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("User is not authenticated");
      }

      // Find the department and document type by name
      const selectedDepartment = department.find(
        (dept) => dept.name === updateData.department_id
      );
      const selectedDocumentType = documentType.find(
        (docType) => docType.name === updateData.document_type_id
      );

      // Prepare update payload with actual IDs
      const updatePayload = {
        document_id,
        title: updateData.title,
        publiced_date: updateData.publiced_date,
        document_type_id:
          selectedDocumentType?.id || updateData.document_type_id,
        department_id: selectedDepartment?.id || updateData.department_id,
      };

      // Debug logs for request data
      console.log("Debug - Update Request:", {
        endpoint: `${LOCALHOST}/file/update`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        requestBody: updatePayload,
      });

      const response = await fetch(`${LOCALHOST}/file/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatePayload),
      });

      // ... rest of the function remains the same ...
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  };

  const fetchDepartments = async () => {
    // setLoading(true);

    try {
      const response = await fetch(`${LOCALHOST}/department/list/`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const dept: Department[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      // console.log("dept:", dept);
      setDepartment(dept);
    } catch (error) {
      console.error("Error fetching department:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchDocumentType = async () => {
    // setLoading(true);

    try {
      const response = await fetch(`${LOCALHOST}/docs/list/`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const doctype: Department[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      // console.log("doc type:", doctype);
      setDocumentType(doctype);
    } catch (error) {
      console.error("Error fetching Document Type:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    fetchDepartments();
    fetchDocumentType();
  }, []);

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
        department,
        documentType,
        loadingUpload,
        setLoadingUpload,
        loadingUploadFlag,
        setLoadingUploadFlag,
        alertFlag,
        setAlertFlag,
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
