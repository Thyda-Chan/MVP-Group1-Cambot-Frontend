import { useState, useEffect } from "react";
import axios from "axios";

interface DocumentType {
  id: number;
  name: string;
}

export const DocumentTypeContext = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/docs/list/");
        setDocumentTypes(response.data);
      } catch (error) {
        setError("Error fetching document types");
        console.error("Error fetching document types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentTypes();
  }, []);

  return { documentTypes, loading, error };
};