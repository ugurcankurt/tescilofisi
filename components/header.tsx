"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b transition-all duration-200">
      <nav className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8" aria-label="Ana navigasyon">
        <div className="flex h-14 sm:h-16 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/logo.png"
                alt="Tescilofisi Logo"
                width={180}
                height={48}
                className="h-8 w-auto sm:h-12"
              />
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
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="tel:+902129092657">
                <Phone className="mr-2 h-4 w-4" />
                Ücretsiz Danışmanlık
              </a>
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Button asChild size="sm" className="text-xs px-2 py-1 h-8 bg-blue-600 hover:bg-blue-700">
              <a href="tel:+902129092657">
                <Phone className="mr-1 h-3 w-3" />
                Ücretsiz Danışmanlık
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              className="h-9 w-9"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        )}>
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200",
                  "transform translate-x-0 opacity-100"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: mobileMenuOpen ? 'slideInFromLeft 0.3s ease-out forwards' : undefined
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}