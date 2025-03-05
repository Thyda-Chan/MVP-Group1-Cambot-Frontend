"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "./components/Input";
import { useSubmission } from "./components/SubmissionContext";
import { CloudUpload } from "lucide-react";
import { useDocuments } from "../context/DocumentContext";
interface UploadProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Upload({ setOpen }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { setData } = useSubmission();
  const router = useRouter();
  const { postDocuments } = useDocuments();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setData({ ...data, file });
    // router.push("/documents");
    setOpen(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      setPreviewUrl(URL.createObjectURL(uploadedFile));
    }
  };

  return (
    <div>
      <div className="min-h-[70vh] text-primary flex justify-center items-center">
        <div className="bg-white shadow-xl border border-gray-300 rounded-2xl p-6 w-full">
          <h2 className="text-xl font-semibold text-center mb-4">
            Upload Documents
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* File Upload */}
            <div>Upload Your Documents</div>
            <div className="h-96 border-2 border-dashed border-blue-300 rounded-lg gap-2 p-6 flex flex-col items-center justify-center cursor-pointer bg-[#c9e5ee]">
              <label htmlFor="uploadInput">
                <CloudUpload size={96} />
              </label>
              <label
                htmlFor="uploadInput"
                className="text-darkblue font-semibold"
              >
                Drag and drop to upload
              </label>
              <label
                htmlFor="uploadInput"
                className="text-sm p-2 text-white border rounded-xl bg-darkblue"
              >
                or browse
              </label>
              <input
                id="uploadInput"
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              {file && (
                <p className="text-sm mt-2 text-gray-600">{file.name}</p>
              )}
            </div>

            {/* <Input
              label="Title"
              name="title"
              placeholder="Document title"
              register={register}
              errors={errors}
            />
            <Input
              label="Admin's Name"
              name="adminName"
              placeholder="Your name"
              register={register}
              errors={errors}
            />

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
            /> */}

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/4 bg-green text-white py-2 rounded-lg"
                onClick={() => {
                  // console.log("file:::: " + file);
                  for (const property in file) {
                    console.log(`${property}: ${(file as any)[property]}`);
                  }
                  postDocuments(file as File);
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
