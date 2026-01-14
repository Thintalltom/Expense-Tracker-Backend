'use client';
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/Card';
import { PiChartLineUpBold } from "react-icons/pi";
import { PiChartLineDown } from "react-icons/pi";
import { LuDollarSign } from "react-icons/lu";
import IncomeCard from '@/components/IncomeCard';
import IncomePopup from '@/components/IncomePopup';
import Table from '@/components/Table';
import { useGetIncomesQuery,  useGetExpensesQuery  } from '@/store/query/Auth-query';

const Income = () => {
    const [incomePopup, setIncomePopup] = useState<boolean>(false);
    const { data: incomesData } = useGetIncomesQuery();
    const totalAmount = incomesData?.reduce((total, item) => {
        return total + Number(item.amount);
    }, 0);

const formattedAmount = totalAmount && totalAmount.toLocaleString("en-NG", {
  style: "currency",
  currency: "NGN",
});
const { data: expensesData } = useGetExpensesQuery();

    return (
        <DashboardLayout>
            <div className='flex justify-between mb-4'>
                <div className='flex flex-col '>
                    <h1 className="text-3xl font-bold mb-6">Categories</h1>
                    <p>Manage your expense categories here.</p>
                </div>
                <button onClick={() => setIncomePopup(true)} className='text-white font-bold text-[14px] w-fit h-10 bg-blue-500 px-4 py-2 rounded shadow-md'>
                    + Add Income Source
                </button>
            </div>
            <div className=' flex flex-col gap-5'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        title="Monthly Income"
                        value={formattedAmount || 'N0.00'}
                        subtitle="Current Month Total"
                        icon={<PiChartLineUpBold />}
                        valueColor="text-black"
                        iconBgColor="bg-blue-200"
                        iconColor="text-blue-600"
                    />
                    <Card
                        title="Active Sources"
                        value={incomesData?.length || 0}
                        subtitle={<span className="flex gap-2.5">Income Streams</span>}
                        icon={<LuDollarSign />}
                        valueColor="text-black"
                        iconBgColor="bg-green-200"
                        iconColor="text-green-600"
                    />
                    <Card
                        title="Transactions"
                        value={expensesData?.length || 0}
                        subtitle={<span className="flex gap-2.5">This Month</span>}
                        icon={<PiChartLineDown />}
                        valueColor="text-black"
                        iconBgColor="bg-red-200"
                        iconColor="text-red-600"
                    />
                </div>

                {/* <h1 className="text-3xl font-bold mb-6">Income Sources</h1>
                <div className='mb-20 flex flex-col gap-5'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <IncomeCard
                            title="Main Job"
                            value="$0"
                            // subtitle="Current Month Total"
                            icon={<LuDollarSign />}
                            valueColor="text-black"
                            iconBgColor="bg-blue-600"
                            iconColor="text-white"
                        />
                        <IncomeCard
                            title="Side Gigs"
                            value="$0"
                            // subtitle={<span className="flex gap-2.5">Income Streams</span>}
                            icon={<LuDollarSign />}
                            valueColor="text-black"
                            iconBgColor="bg-green-600"
                            iconColor="text-white"
                        />
                        <IncomeCard
                            title="Investments"
                            value="$0"
                            // subtitle={<span className="flex gap-2.5">This Month</span>}
                            icon={<LuDollarSign />}
                            valueColor="text-black"
                            iconBgColor="bg-purple-600"
                            iconColor="text-white"
                        />

                    </div>
                </div> */}
                {/* <div>
          <div className='shadow-sm bg-white p-5 rounded-md flex flex-col h-96'>
            <h4 className='font-bold'>Financial Overview</h4>
            <Chart />
          </div>
        </div> */}
            </div>
            <div className='w-full mb-20 mt-20 p-5 rounded-sm border flex flex-col gap-2'>
                <h2 className='font-bold text-lg'>Income History</h2>
                {incomesData && incomesData.length > 0 ? <Table

                    columns={[
                        { key: 'date', header: 'Date' },
                        { key: 'source', header: 'Source' },
                        { key: 'amount', header: 'Amount' },
                        // { key: 'source', header: 'Source' },
                    ]}
                    rows={incomesData} /> :  <p>No income records found.</p>}
            </div>
            {incomePopup && <IncomePopup closePopup={() => setIncomePopup(false)} />}
        </DashboardLayout>
    )
}

export default Income