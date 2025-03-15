"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CloudUpload } from "lucide-react";
import Input from "./components/Input";
import { useUpload } from "../context/UploadContext";
import { DepartmentContext } from "../context/DepartmentContext";
import { DocumentTypeContext } from "../context/DocumentTypeContext";

interface UploadProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Upload({ setOpen }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const { setData, postDocuments, loading, documentType, department } =
    useUpload();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (file) {
      const title = data.title;
      const newFile = new File(
        [file],
        `${title}${file.name.substring(file.name.lastIndexOf("."))}`,
        {
          type: file.type,
        }
      );

      const formData = {
        title: data.title,
        adminName: data.adminName,
        documentType: data.documentType,
        department: data.department,
        publishedDate: data.publishedDate,
        ...data,
        file: newFile,
      };
      setData(formData);
      setOpen(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="bg-white shadow-xl border rounded-2xl p-6 w-full">
        <h2 className="text-xl font-semibold text-center mb-2">
          Upload Documents
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="h-44 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-[#c9e5ee]">
            <label htmlFor="uploadInput">
              <CloudUpload size={48} color="#0083B1" />
            </label>
            <input
              id="uploadInput"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
            {file && <p className="text-sm mt-2 text-gray-600">{file.name}</p>}
          </div>

          <Input
            label="Title"
            name="title"
            placeholder="Document Title"
            register={register}
            errors={errors}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium flex">
                <p className="mr-1">Document Type</p>
                <p className="text-red-500">*</p>
              </label>
              <select
                {...register("documentType", { required: true })}
                className="w-full p-2 border rounded-lg text-[#9ca3af]"
                // disabled={docTypesLoading}
              >
                <option value="">-Select Document Type-</option>
                {/* <option value="report">Report</option>
                <option value="invoice">Invoice</option>
                <option value="policies">Policies</option>
                <option value="memo">Memo</option>
                <option value="sop">SOP</option> */}
                {documentType.map((doctype, index) => (
                  <option key={index}>{doctype.name}</option>
                ))}
              </select>
              {errors.documentType && (
                <p className="text-red-500 text-sm">Required</p>
              )}
              {/* {docTypesError && (
                <p className="text-red-500 text-sm">{docTypesError}</p>
              )} */}
            </div>

            <div>
              <label className="font-medium flex">
                <p className="mr-1">Department</p>
                <p className="text-red-500">*</p>
              </label>
              <select
                {...register("department", { required: true })}
                className="w-full p-2 border rounded-lg text-[#9ca3af]"
              >
                <option value="">-Select Department-</option>
                {department.map((dept, index) => (
                  <option key={index}>{dept.name}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
          </div>

          <Input
            label="Published Date"
            name="publishedDate"
            type="date"
            register={register}
            errors={errors}
          />

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/4 bg-green text-white py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
