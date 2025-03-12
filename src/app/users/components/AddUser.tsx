"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/app/upload/components/Input";
import { useState } from "react";
import { useUpload } from "@/app/context/UploadContext";

export default function AddUser() {
  const { setData } = useUpload();
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setData({ ...data });
    console.log(data);
    // router.push("/users");
  };

  const radioActive = (active: boolean) => {
    if (active) {
      return "bg-darkblue rounded-full h-4 w-4 justify-center items-center flex";
    } else {
      return "border-2 border-darkblue box-border rounded-full h-4 w-4 justify-center items-center flex";
    }
  };

  return (
    <div>
      <div className="min-h-[70vh] text-primary flex justify-center items-center">
        <div className="bg-white shadow-xl border border-gray-300 rounded-2xl p-6 w-full">
          <h2 className="text-xl font-semibold text-center mb-4">Add User</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstname"
                placeholder="Input First Name"
                register={register}
                errors={errors}
              />
              <Input
                label="Last Name"
                name="lastname"
                placeholder="Input Last Name"
                register={register}
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Address"
                name="address"
                placeholder="Input Address"
                register={register}
                errors={errors}
              />

              <InputOption
                label="Role"
                name="Select Employee Role"
                register={register}
                errors={errors}
                options={["Admin", "Manager", "Staff"]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email/Username"
                name="email"
                placeholder="Input Email/Username"
                register={register}
                errors={errors}
              />
              <Input
                label="Password"
                name="password"
                placeholder="Enter password"
                register={register}
                errors={errors}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/12 bg-green text-white py-2 rounded-xl"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface InputOptionProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  options: string[];
}

const InputOption = ({
  label,
  name,
  register,
  errors,
  options,
}: InputOptionProps) => {
  return (
    <div>
      <label className="font-medium flex gap-1 mx-2">
        <div>{label}</div>
        <div className="text-red-500">*</div>
      </label>
      <select
        {...register(name, { required: `${label} is required` })}
        className="w-full p-2 border rounded-lg text-[#9ca3af]"
      >
        <option value="">-{name}-</option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <div className="text-red-500 text-sm">{errors[name]?.message}</div>
      )}
    </div>
  );
};
