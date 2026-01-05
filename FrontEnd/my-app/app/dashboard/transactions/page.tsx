'use client'
import Table from '@/components/Table'
import Dropdown from '@/components/Dropdown'
import { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import {  useGetCategoryQuery, useGetExpensesQuery } from "@/store/query/Auth-query";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { setAddTransactionPopup } from '@/store/slices/userSlice';
import Popup from '@/components/Popup'
import DashboardLayout from '@/components/DashboardLayout';
const Transactions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
      const {data:categoryData } = useGetCategoryQuery();
      const {data:expensesData } = useGetExpensesQuery();
         const categoryOption = [
           { value: '', label: 'All' },
           ...(Array.isArray(categoryData) ? categoryData.map((cat: { id: number; name: string }) => ({ value: cat.name, label: cat.name })) : [])
         ];
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Transform expense data for table display
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allTransactions = Array.isArray(expensesData) ? expensesData.map((expense: any) => ({
    id: expense.id,
    date: expense.date,
    description: expense.description,
    amount: `-$${expense.amount}`,
    category: expense.category.name,
    // source: 'Expense'
  })) : [];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesCategory = selectedCategory 
      ? transaction.category.toLowerCase() === selectedCategory 
      : true;
    const matchesSearch = searchTerm
      ? transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (searchTerm.toLowerCase()) ||
        transaction.amount.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });
  
  const dispatch = useDispatch()
  const showAddTransactionPopup = useSelector((state:RootState) => state.user.addTransactionPopup)
     const closePopup = () => {
      dispatch(setAddTransactionPopup(false))
    }
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
        <div className='flex flex-col gap-4 mb-4 lg:flex-row justify-between '>
          <p>Manage and view your financial history</p>
          <div className='flex gap-5 flex-col lg:flex-row'>
            <div className='border border-gray-300 rounded-sm flex gap-1'>
              <button className='p-2'><IoIosSearch /></button>
              <input 
                type='text' 
                placeholder='Search for transaction' 
                className='outline-0'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='w-48'>
              <Dropdown 
                options={categoryOption}
                placeholder="Filter by category"
                onSelect={setSelectedCategory}
                value={selectedCategory}
              />
            </div>
            
          </div>
        </div>
        <div className='mb-20 flex flex-col gap-5'>
          {filteredTransactions.length > 0 ? (
            <Table
              columns={[
                { key: 'date', header: 'Date' },
                { key: 'description', header: 'Description' },
                { key: 'category', header: 'Category' },
                { key: 'amount', header: 'Amount' },
                // { key: 'source', header: 'Source' },
              ]}
              rows={filteredTransactions}
            />
          ) : (
            <div className='text-center py-8 text-gray-500'>
              {filteredTransactions.length === 0 ? (<p>No Data Present Currently</p>) : <p>No data present for keyword searched: {searchTerm  ? searchTerm : selectedCategory}</p>}
            </div>
          )}
        </div>
      {showAddTransactionPopup && <Popup closePopup={closePopup} />}
    </DashboardLayout>
  )
}

export default Transactions