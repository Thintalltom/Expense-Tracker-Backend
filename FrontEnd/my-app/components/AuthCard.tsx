import React from "react"

interface cardDetails {
children: React.ReactNode
}
const AuthCard = ({children}: cardDetails ) => {
  return (
    <div className="rounded-[10px] shadow-sm border-0.5 w-fit h-fit px-5 py-5">
        {children}
    </div>
  )
}

export default AuthCard