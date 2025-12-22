'use client'
import AuthCard from "@/components/AuthCard"
import InputField from "@/components/InputField"
import { FaGoogleWallet } from "react-icons/fa";
import Link from "next/link";
const page = () => {
  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    },
     {
      label: " Confirm Password",
      type: "password",
      placeholder: "Enter your password",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    }
  ];

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center ">
        <div>
            <FaGoogleWallet className="w-20 h-20" />
        </div>
        <h4>Create your account</h4>
        <div className="flex gap-0.5">
        <p>Already have an account?</p>
        <Link className="text-blue-800" href='/login'>Sign in</Link>
        </div>
        <AuthCard>
            <div className="flex flex-col gap-4 w-96">
              
              {inputFields.map((field, index) => (
                <InputField
                  key={index}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  icon={field.icon}
                />
              ))}
              <button className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Create Account
              </button>
            </div>
        </AuthCard>
    </div>
  )
}

export default page