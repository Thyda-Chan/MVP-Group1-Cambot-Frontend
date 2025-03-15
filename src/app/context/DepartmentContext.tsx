import { useState, useEffect } from "react";
import axios from "axios";

interface Department {
  id: string;
  name: string;
  
}

export const DepartmentContext = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/department/list");
        setDepartments(response.data);
      } catch (error) {
        setError("Error fetching departments");
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return { departments, loading, error };
};