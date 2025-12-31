import { ReactNode } from 'react'

interface CardProps {
  title: string
  value: string
  subtitle: ReactNode
  icon: ReactNode
  valueColor: string
  iconBgColor: string
  iconColor: string
}

const Card = ({ title, value, subtitle, icon, valueColor, iconBgColor, iconColor }: CardProps) => {
  return (
    <div className='flex justify-between bg-white p-6 rounded-lg shadow'>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-sm mb-2 text-gray-500">{title}</h3>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        <p className="text-sm mb-2 text-gray-500">{subtitle}</p>
      </div>
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${iconBgColor}`}>
        <span className={iconColor}>{icon}</span>
      </div>
    </div>
  )
}

export default Card