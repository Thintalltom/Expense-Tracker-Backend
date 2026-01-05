import React from 'react'
import DashboardLayout from '@/components/DashboardLayout';
const page = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className='mb-20 flex flex-col gap-5'>
        <p>Manage your account settings here.</p>
        {/* Add your settings management content here */}
      </div>
    </DashboardLayout>
  )
}

export default page