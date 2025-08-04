"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Scale, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Ana navigasyon">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Tescilofisi</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button asChild>
              <Link href="/iletisim">
                <Shield className="mr-2 h-4 w-4" />
                Ücretsiz Danışmanlık
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full">
                <Link href="/iletisim" onClick={() => setMobileMenuOpen(false)}>
                  <Shield className="mr-2 h-4 w-4" />
                  Ücretsiz Danışmanlık
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}