'use client'
import { LuWallet } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";
import { GoArrowDownRight } from "react-icons/go";
import Card from '@/components/Card';
import Chart from '@/components/Chart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import Popup from '@/components/Popup';
import { setAddTransactionPopup } from '@/store/slices/userSlice';
import DashboardLayout from '@/components/DashboardLayout';
import { useGetIncomesQuery } from '@/store/query/Auth-query';
import {  useGetExpensesQuery } from "@/store/query/Auth-query";
const Dashboard = () => {
  const dispatch = useDispatch();
  const showAddTransactionPopup = useSelector((state: RootState) => state.user.addTransactionPopup);
  const { data: expensesData } = useGetExpensesQuery();
  const totalExpense = expensesData?.reduce((total, item) => {
    return total + Number(item.amount);
  }, 0);
  const formattedExpense = totalExpense?.toLocaleString("en-NG", {
  style: "currency",
  currency: "NGN",
});
 const { data: incomesData } = useGetIncomesQuery();
const firstIncome = incomesData?.[0];
const totalAmount = firstIncome?.remaining_balance;
     const formattedIncome = totalAmount ? Number(totalAmount).toLocaleString("en-NG", {
  style: "currency",
  currency: "NGN",
}) : undefined;
   const totalAmountSaving = incomesData?.reduce((total, item) => {
        return total + Number(item.amount);
    }, 0);

const formattedAmount = totalAmountSaving && totalAmountSaving.toLocaleString("en-NG", {
  style: "currency",
  currency: "NGN",
});

  const savingsPercentage = totalAmountSaving && totalExpense 
    ? (((totalAmountSaving - totalExpense) / totalAmountSaving) * 100).toFixed(1)
    : 0;

  const expensePercentage = totalAmountSaving && totalExpense
    ? ((totalExpense / totalAmountSaving) * 100)
    : 0;
  const closePopup = () => {
    dispatch(setAddTransactionPopup(false));
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className='mb-20 flex flex-col gap-5'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Total Balance"
            value={formattedIncome || 'N0.00'}
            subtitle="Current Month Net"
            icon={<LuWallet />}
            valueColor="text-black"
            iconBgColor="bg-blue-200"
            iconColor="text-blue-500"
          />
          <Card
            title="Monthly Expenses"
            value={formattedExpense || 'N0.00'}
            subtitle={<span className="flex gap-2.5"><span className='text-green-600'>+12%</span> vs last month</span>}
            icon={expensePercentage > 50 ? <GoArrowDownRight /> : <MdArrowOutward />}
            valueColor="text-black"
            iconBgColor={expensePercentage > 50 ? "bg-red-200" : "bg-green-200"}
            iconColor={expensePercentage > 50 ? "text-red-500" : "text-green-500"}
          />
          <Card
            title="Savings Goal"
            value={`${savingsPercentage}%`}
            subtitle={<span className="flex gap-2.5">of income saved</span>}
            icon={Number(savingsPercentage) >= 50 ? <MdArrowOutward /> : <GoArrowDownRight />}
            valueColor="text-black"
            iconBgColor={Number(savingsPercentage) >= 50 ? "bg-green-200" : "bg-red-200"}
            iconColor={Number(savingsPercentage) >= 50 ? "text-green-500" : "text-red-500"}
          />
        </div>
        <div>
          <div className='shadow-sm bg-white p-5 rounded-md flex flex-col h-96'>
            <h4 className='font-bold'>Financial Overview</h4>
            <Chart />
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;