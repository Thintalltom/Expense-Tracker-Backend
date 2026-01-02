'use client'
import AuthCard from "@/components/AuthCard"
import InputField from "@/components/InputField"
import { FaGoogleWallet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setUsername, setPassword, setAccessToken, setRefreshToken } from "@/store/slices/userSlice";
import { useLoginUserMutation } from "@/store/query/Auth-query";
import { toast } from "sonner";
const Page = () => {
    const dispatch = useDispatch();
    const [loginUser, {data: LoginData, isLoading, error}] = useLoginUserMutation();
    const {username, password} = useSelector((state:RootState) => state.user);
    const router = useRouter();
    const handleSubmit = async () => {
      try {
        const response = await loginUser({
          username: username || '',
          password: password || ''
        }).unwrap();

        dispatch(setAccessToken(response.access || ''));
        dispatch(setRefreshToken(response.refresh || ''));
        toast.success(response.message || 'Login successful!');
        router.push('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.status === 401) {
          toast.error(err.data?.error || 'Invalid credentials');
        } else {
          toast.error('Login failed');
        }
      }
    };
 
    
      const inputFields = [
   
    {
      label: "User Name",
      type: "text",
      placeholder: "Enter your username",
      value: username || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setUsername(e.target.value)),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      value: password || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setPassword(e.target.value)),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    },
   
  ];
    return (
        <div className="w-full h-screen flex flex-col gap-5 justify-center items-center ">

            <div>
                <FaGoogleWallet className="w-20 h-20" />
            </div>
                    <h1 className="text-2xl font-bold">Sign In to FinanceFlow</h1>
                    <div className="flex gap-1">
                    <p>or</p>
                    <Link href='/signup' className="text-blue-800">Create a new account</Link>
                    </div>
            <AuthCard>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 w-96">
                        {inputFields.map((field, index) => (
                            <InputField
                                key={index}
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                icon={field.icon}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        ))}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Login
                        </button>
                    </div>          
                </div>
            </AuthCard>
        </div>
    )
}

export default Page