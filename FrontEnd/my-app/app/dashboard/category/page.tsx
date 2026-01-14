'use client'
import React, {useState} from 'react'
import DashboardLayout from '@/components/DashboardLayout';
import CategoryPopup from '@/components/CategoryPopup';
import {  useGetCategoryQuery } from "@/store/query/Auth-query";
import ExpenseCard from '@/components/ExpenseCard';

const Category = () => {
  const [categoryPopup, setCategoryPopup] = useState<boolean>(false);
      const {data:categoryData, error:categoryError, isLoading:categoryLoading} = useGetCategoryQuery();    

  return (
    <DashboardLayout>
      <div className='flex justify-between'>
        <div className='flex flex-col '>
          <h1 className="text-3xl font-bold mb-6">Categories</h1>
          <p>Manage your expense categories here.</p>
        </div>
        <button onClick={() => setCategoryPopup(true)} className='text-white font-bold text-[14px] w-fit h-10 bg-blue-500 px-4 py-2 rounded shadow-md'>
          + Add Category
        </button>
      </div>
      {categoryPopup && <CategoryPopup closePopup={() => setCategoryPopup(false)} />}

    <div className='grid grid-cols-1 gap-3 mt-2'>
      {categoryLoading && <p>Loading categories...</p>}
      {categoryData && categoryData.map((category: { id: string; name: string; limit: string; color: string }) => (
        <ExpenseCard 
          key={category.id}
          name={category.name}
          limit={category.limit}
          color={category.color}
        />
      ))}
    </div>
    </DashboardLayout>
  )
}

export default Category