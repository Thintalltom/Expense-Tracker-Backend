'use client';
import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
   sideIcon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type, placeholder, icon, value, onChange, sideIcon }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          readOnly={!onChange}
          suppressHydrationWarning={true}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {sideIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {sideIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;