'use client'
import AuthCard from "@/components/AuthCard"
import InputField from "@/components/InputField"
import { FaGoogleWallet } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { setEmail, setPassword, setUsername } from "@/store/slices/userSlice";
import { useCreateUserMutation } from "@/store/query/Auth-query";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
const Page = () => {

  const [createUser, {data: SignupData, isLoading, error}] = useCreateUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {Email, username, password} = useSelector((state: RootState) => state.user);
  

  const handleSubmit = async () => {
    try {
     const response = await createUser({
        username: username || '',
        email: Email || '',
        password: password || ''
      }).unwrap();
      toast.success(response.message || 'Account created successfully!');
      router.push('/login');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.status === 400) {
   
        toast.error(err.data.error || 'Invalid input data');
      } else {
        toast.error('Failed to create account');
      }
    }
  };
  const inputFields = [
    {
      label: "User Name",
      type: "text",
      placeholder: "Enter your user name",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      value: username,
      onchange: setUsername
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>,
      value: Email,
      onchange: setEmail
    },
    {
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      icon: (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="focus:outline-none"
        >
          {showPassword ? <IoEyeOff className="w-5 h-5" /> : <IoEye className="w-5 h-5" />}
        </button>
      ),
      value: password,
      onchange: setPassword
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
                  value={field.value || ''}
                  onChange={(e) => dispatch(field.onchange(e.target.value))}
                />
              ))}
              <button 
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
        </AuthCard>
    </div>
  )
}

export default Page