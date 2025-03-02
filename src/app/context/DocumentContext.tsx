"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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

interface DocumentContextType {
  documents: Document[];
  fetchDocuments: () => Promise<void>;
  loading: boolean;
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

  const fetchDocuments = async () => {
    // axios
    //   .get("/documents/api")
    //   .then(function (response) {
    //     console.log(response);
    //     setDocuments(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     setLoading(false);
    //   });

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   const data: Document[] = await fetch("http://localhost:3000/");

      const data: Document[] = [
        {
          id: 1,
          name: "Company Policy.pdf",
          size: "7.2MB",
          type: "PDF",
          department: "Finance",
          author: "Admin",
          date: "2025-03-20",
        },
        {
          id: 2,
          name: "Employee Handbook.docx",
          size: "5.1MB",
          type: "DOCX",
          department: "HR",
          author: "HR Manager",
          date: "2025-02-18",
        },
        {
          id: 3,
          name: "SOP - IT Security.pdf",
          size: "3.8MB",
          type: "PDF",
          department: "IT",
          author: "Security Team",
          date: "2025-02-15",
        },
      ];
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <DocumentContext.Provider value={{ documents, fetchDocuments, loading }}>
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
