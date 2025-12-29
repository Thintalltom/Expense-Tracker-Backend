'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { LuLogOut } from "react-icons/lu";
interface SidebarItem {
  label: string
  href: string
  icon: ReactNode
}

interface SidebarProps {
  items: SidebarItem[]
}

const Sidebar = ({ items }: SidebarProps) => {
  const pathname = usePathname()

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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
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
        <button className='bg-blue-600 text-white font-semibold mx-auto px-7.5 py-2.5 shadow-sm rounded'> + Add Transaction</button>
        <div className='flex gap-1'>
        <p>icon</p>
        <p>username</p>
        <button><LuLogOut /></button>
        </div>
        <button></button>
      </div>
    </div>
 
     </>
  )
}

export default Sidebar