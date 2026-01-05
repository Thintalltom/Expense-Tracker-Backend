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

const Dashboard = () => {
  const dispatch = useDispatch();
  const showAddTransactionPopup = useSelector((state: RootState) => state.user.addTransactionPopup);
  
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
            value="$12,345.67"
            subtitle="Current Month Net"
            icon={<LuWallet />}
            valueColor="text-green-600"
            iconBgColor="bg-blue-200"
            iconColor="text-blue-500"
          />
          <Card
            title="Monthly Expenses"
            value="$2,456.78"
            subtitle={<span className="flex gap-2.5"><span className='text-green-600'>+12%</span> vs last month</span>}
            icon={<MdArrowOutward />}
            valueColor="text-red-600"
            iconBgColor="bg-green-200"
            iconColor="text-green-500"
          />
          <Card
            title="Savings Goal"
            value="75%"
            subtitle={<span className="flex gap-2.5"><span className='text-red-600'>+12%</span> vs last month</span>}
            icon={<GoArrowDownRight />}
            valueColor="text-blue-600"
            iconBgColor="bg-red-200"
            iconColor="text-red-500"
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