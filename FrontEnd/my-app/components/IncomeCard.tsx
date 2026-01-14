import {ReactNode} from 'react'

interface CardProps {
  title: string
  value?: string
  subtitle?: ReactNode
  icon?: ReactNode
  valueColor?: string
  iconBgColor?: string
  iconColor?: string
}

const IncomeCard = ({ title, value, subtitle, icon, valueColor, iconBgColor, iconColor }: CardProps) => {
  return (
    <div className='flex gap-3.5  bg-white p-6 rounded-lg border shadow'>
      <div className={`w-10 h-10 rounded-sm flex justify-center items-center ${iconBgColor}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-sm mb-2 text-gray-500">{title}</h3>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        <p className="text-sm mb-2 text-gray-500">{subtitle}</p>
      </div>
    </div>
  )
}

export default IncomeCard