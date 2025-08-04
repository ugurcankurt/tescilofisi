"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Scale, 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Settings,
  LogOut
} from "lucide-react"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Blog Yazıları",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    name: "Yeni Yazı",
    href: "/admin/posts/new",
    icon: Plus,
  },
  {
    name: "Ayarlar",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/admin/login")
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-semibold">Tescilofisi Admin</span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="flex-shrink-0 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  )
}