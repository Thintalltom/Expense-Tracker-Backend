'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

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
    <div className="w-64 bg-white text-black h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">FinanceFlow</h2>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar