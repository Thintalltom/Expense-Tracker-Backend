'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken)
  const router = useRouter()

//  console.log("ProtectedRoute accessToken:", accessToken);
  useEffect(() => {
    if (!accessToken) {
      router.push('/login')
    }
  }, [accessToken, router])

  if (!accessToken) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute