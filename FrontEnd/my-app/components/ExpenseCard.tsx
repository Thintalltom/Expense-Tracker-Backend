import React from 'react'
import { MdBookmark } from "react-icons/md";
interface ExpenseCardProps {
  name: string;
  limit: string;
  color: string;
}
const ExpenseCard = ({ name, limit, color }: ExpenseCardProps) => {
  return (
    <div className='flex gap-4 rounded-sm border p-4 shadow-sm hover:shadow-md transition-shadow items-center cursor-pointer'>
      <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: color }}>
        <MdBookmark className="text-white" />
      </div>
      <div>
        <h2 className="font-bold">{name}</h2>
        <p className="text-sm">Limit: {limit}</p>
      </div>
    </div>
  )
}

export default ExpenseCard