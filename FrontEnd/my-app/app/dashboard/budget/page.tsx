'use client'
import DashboardLayout from '@/components/DashboardLayout';

const Budget = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Budget</h1>
      <div className='mb-20 flex flex-col gap-5'>
        <p>Your budget management will appear here.</p>
        {/* Add your budget management content here */}
      </div>
    </DashboardLayout>
  )
}

export default Budget