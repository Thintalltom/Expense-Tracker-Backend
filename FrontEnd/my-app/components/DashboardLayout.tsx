'use client'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LuLogOut } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setAddTransactionPopup } from '@/store/slices/userSlice';
import { RootState } from '@/store/store';
import Popup from './Popup';
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" /></svg>
    },
    {
      label: 'Transactions',
      href: '/dashboard/transactions',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
    },
    {
      label: 'Budget',
      href: '/dashboard/budget',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
    },
    {
      label: 'Category',
      href: '/dashboard/category',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    }
  ];

  const dispatch = useDispatch();
  const pathname = usePathname();
   const showAddTransactionPopup = useSelector((state: RootState) => state.user.addTransactionPopup);
    
    const closePopup = () => {
      dispatch(setAddTransactionPopup(false));
    };
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar items={sidebarItems} />
      
      {/* Mobile Header */}
      <div className='block lg:hidden bg-white border-b-[0.5px] border-gray-200 p-2'>
        <div className='flex justify-between p-2'>
          <p>Finance Flow</p>
          <div className='flex gap-2.5'>
            <button 
              className='w-10 h-10 rounded bg-blue-500 shadow-md flex justify-center items-center' 
              onClick={() => dispatch(setAddTransactionPopup(true))}
            >
              <IoMdAdd className='text-white' />
            </button>
            <button><LuLogOut /></button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-x-auto overflow-y-auto h-[calc(100vh-120px)] lg:h-full">
        {children}
      </div>
          {showAddTransactionPopup && <Popup closePopup={closePopup} />}

      {/* Mobile Bottom Navigation */}
      <div className='lg:hidden block bg-white'>
        <div className='flex justify-around absolute bg-white bottom-0 w-full border-t-[0.5px] border-gray-200 p-4'>
          {sidebarItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={`flex flex-col cursor-pointer items-center ${
                pathname === item.href
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;