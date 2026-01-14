'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { LuLogOut } from "react-icons/lu";
import { setAddTransactionPopup, clearUserData } from '@/store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation,  useGetUserDetailsQuery, AuthApi } from '@/store/query/Auth-query';
import { FiUser } from 'react-icons/fi';
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { persistor } from '@/store/store';
interface SidebarItem {
  label: string
  href: string
  icon: ReactNode
}

interface SidebarProps {
  items: SidebarItem[]
}

const Sidebar = ({ items }: SidebarProps) => {
  const { refreshToken } = useSelector((state: RootState) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const { data: userDetails } = useGetUserDetailsQuery();
  const dispatch = useDispatch()
  const pathname = usePathname()
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      // const response = await logoutUser({
      //   refresh: refreshToken || ''
      // }).unwrap();
      
      // Clear Redux persist storage
      dispatch(clearUserData());
      await persistor.purge();
      //always add this to reset api state
      dispatch(AuthApi.util.resetApiState());
      // toast.success(response.message);
      router.push('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: string | any) {
      // Clear storage even if logout API fails
      dispatch(clearUserData());
      await persistor.purge();
      dispatch(AuthApi.util.resetApiState());
      
      if (error.status === 401) {
        toast.error(error.data?.error || 'Invalid credentials');
      } else {
        toast.error('Logout failed');
      }
      router.push('/login');
    }
  }
  return (
    <>

      <div className="w-64 bg-white border-[0.1px] border-gray-300 shadow-sm text-black h-screen hidden lg:block">
        <div className="mb-8 border-b-[0.1px] border-gray-300 pb-4 p-4">
          <h2 className="text-xl font-bold">FinanceFlow</h2>
        </div>
        <nav className="space-y-2 p-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                ? 'text-blue-600 bg-blue-100'
                : 'text-gray-500  hover:bg-blue-100 hover:text-blue-600 '
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className='flex flex-col absolute bottom-0 p-4 min-w-64 border-t-[0.1px] border-gray-300'>
          <button className='bg-blue-600 text-white font-semibold mx-auto px-7.5 py-2.5 shadow-sm rounded' onClick={() => dispatch(setAddTransactionPopup(true))}> + Add Transaction</button>
          <div className='flex mt-2 justify-center items-center gap-4'>
            <div className='w-10 h-10 rounded-full bg-blue-100 p-2 flex justify-center items-center'>

              <FiUser className='text-blue-500' />
            </div>

            <p>{userDetails?.username}</p>
            <button onClick={logoutHandler}><LuLogOut className='text-slate-400' /></button>
          </div>
          <button></button>
        </div>
      </div>

    </>
  )
}

export default Sidebar