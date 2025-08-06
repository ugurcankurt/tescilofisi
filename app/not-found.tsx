"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Home,
  ArrowLeft,
  FileQuestion
} from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="h-10 w-10 text-blue-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            4<span className="text-blue-600">0</span>4
          </h1>
          
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Sayfa Bulunamadı
          </h2>
          
          <p className="text-gray-600 mb-6">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            <strong> Marka tescil</strong> ve <strong>patent başvurusu</strong> 
            hizmetlerimizi keşfetmek için ana sayfamıza dönebilirsiniz.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/hizmetler">
                Hizmetlerimizi İnceleyin
              </Link>
            </Button>
            
            <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}