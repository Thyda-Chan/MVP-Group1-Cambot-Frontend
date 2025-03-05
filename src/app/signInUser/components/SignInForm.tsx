"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import InputField from './InputField';

const SignInForm: React.FC = () => {
  const [workEmail, setWorkEmail] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [pinCode, setPinCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log({ workEmail, employeeName, employeeId, pinCode });
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-xl font-bold text-center mb-6">Sign In</h1> {/* Smaller "Sign In" heading */}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Work Email"
          type="email"
          placeholder="nichrich123@techassist.com"
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
        />
        <InputField
          label="Employee Name"
          type="text"
          placeholder="Deth Sokunbobo"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <InputField
          label="Employee ID"
          type="text"
          placeholder="2024-381"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <InputField
          label="PIN Code"
          type="password"
          placeholder="**********"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">OR</p>
        <button className="text-blue-500 hover:underline">Sign in to Admin Account</button>
      </div>
    </div>
  );
};

export default SignInForm;