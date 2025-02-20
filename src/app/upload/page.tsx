"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

export default function Upload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = (data: any) => {
    console.log({ ...data, file });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen text-primary bg-gradient-to-b from-white to-[#62C9F1] flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Upload Documents
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Upload */}
          <div>Upload Your Documents</div>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-[#c9e5ee]">
            <p className="text-blue-600">Drag and drop to upload</p>
            <p className="text-sm text-gray-500">or browse</p>
            <input type="file" onChange={handleFileUpload} />
            {file && <p className="text-sm mt-2 text-gray-600">{file.name}</p>}
          </div>

          <Input
            label="Title"
            name="title"
            placeholder="Input the title of your document"
            register={register}
            errors={errors}
          />

          <Input
            label="Admin's Name"
            name="adminName"
            placeholder="Input your name here"
            register={register}
            errors={errors}
          />

          {/* Type & Dept */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Document Type *</label>
              <select
                {...register("documentType", { required: true })}
                className="w-full p-2 border rounded-lg text-[#9ca3af]"
              >
                <option value="">-Select Document Type-</option>
                <option value="report">Report</option>
                <option value="invoice">Invoice</option>
              </select>
              {errors.documentType && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Department *</label>
              <select
                {...register("department", { required: true })}
                className="w-full p-2 border rounded-lg text-[#9ca3af]"
              >
                <option value="">-Select Department-</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
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
              className="w-1/4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
