"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated()
      
      if (authenticated) {
        router.push("/admin/dashboard")
      } else {
        router.push("/admin/login")
      }
    }
    
    checkAuth()
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}