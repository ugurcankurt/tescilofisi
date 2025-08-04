import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog Yazısı Bulunamadı
          </h1>
          
          <p className="text-gray-600 mb-6">
            Aradığınız blog yazısı mevcut değil ya da kaldırılmış olabilir.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Blog&apos;a Dön
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                Ana Sayfaya Git
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}