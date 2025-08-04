"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { isAuthenticated } from "@/lib/auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await isAuthenticated()
        setAuthenticated(isAuth)
        
        // If not authenticated and not on login page, redirect to login
        if (!isAuth && pathname !== "/admin/login") {
          router.push("/admin/login")
          return
        }
        
        // If authenticated and on login page, redirect to dashboard
        if (isAuth && pathname === "/admin/login") {
          router.push("/admin/dashboard")
          return
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [router, pathname])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If on login page, show login without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // If not authenticated, don't render anything (will redirect)
  if (!authenticated) {
    return null
  }

  // Show admin layout with sidebar for authenticated users
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}