"use client";

import { useForm } from "react-hook-form";
import { useUser } from "@/app/context/UserContext";

interface AddUserProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddUser({ setOpen }: AddUserProps) {
  const { setUserData, createUser } = useUser();
  const { role } = useUser();

  const roleOptions =
    role.toLocaleLowerCase() === "manager" ? ["Admin", "Staff"] : ["Staff"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (data) {
      setUserData({ ...data });
      createUser(data);
      setOpen(false);
    } else {
      alert("Invalid submit data");
    }
  };

  return (
    <div className="min-h-[70vh] text-primary flex justify-center items-center">
      <div className="bg-white shadow-xl border border-gray-300 rounded-2xl p-6 w-full">
        <h2 className="text-xl font-semibold text-center mb-4">Add User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="Input First Name"
              register={register}
              errors={errors}
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Input Last Name"
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Employee ID"
              name="employeeId"
              placeholder="Input Employee ID"
              register={register}
              errors={errors}
            />

            <div>
              <label className="font-medium flex gap-1 mx-2">
                <div>Role</div>
                <div className="text-red-500">*</div>
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full p-2 border rounded-lg text-[#9ca3af]"
              >
                <option value="" disabled>
                  - Role -
                </option>
                {roleOptions.map((option, index) => (
                  <option key={index} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.role && (
                <div className="text-red-500 text-sm">
                  {errors.role?.message && String(errors.role.message)}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Email/Username"
              name="username"
              placeholder="Input Email/Username"
              register={register}
              errors={errors}
            />
            <InputField
              label="Password"
              name="password"
              placeholder="Enter password"
              register={register}
              errors={errors}
              type="password"
              validation={{
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Password must contain at least one uppercase letter and one number",
                },
              }}
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
  );
}

const InputField = ({
  label,
  name,
  placeholder,
  register,
  errors,
  type = "text",
  validation = { required: `${label} is required` },
}: any) => (
  <div>
    <label className="font-medium flex gap-1 mx-2">
      <div>{label}</div>
      <div className="text-red-500">*</div>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border rounded-lg text-[#9ca3af]"
      {...register(name, validation)}
    />
    {errors[name] && (
      <div className="text-red-500 text-sm">{errors[name]?.message}</div>
    )}
  </div>
);
