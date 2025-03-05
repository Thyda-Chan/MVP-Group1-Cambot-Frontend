"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SubmissionData {
  title: string;
  adminName: string;
  documentType: string;
  department: string;
  publishedDate: string;
  file?: File;
}

interface SubmissionContextType {
  data: SubmissionData | null;
  setData: (data: SubmissionData) => void;
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(
  undefined
);

export const useSubmission = () => {
  const context = useContext(SubmissionContext);

  if (!context) {
    throw new Error("useSubmission must be used within a SubmissionProvider");
  }

  // console.log("context::: " + JSON.stringify(context));
  return context;
};

export const SubmissionProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SubmissionData | null>(null);

  return (
    <SubmissionContext.Provider value={{ data, setData }}>
      {children}
    </SubmissionContext.Provider>
  );
};
