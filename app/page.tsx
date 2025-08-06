import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Scale, 
  Award, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  FileText,
  Palette
} from "lucide-react"

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-right bg-no-repeat opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Türkiye&apos;nin #1 Marka Tescil ve Patent Uzmanı
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">Marka Tescil</span> ve 
                <span className="text-blue-600"> Patent Başvurusu</span><br />
                Hızlı ve Güvenilir
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                <strong>Marka tescil işlemleri</strong> ve <strong>patent başvurusu</strong> için Türkiye&apos;nin 
                en deneyimli ekibi. %98 başarı oranı, uygun fiyat, hızlı süreç garantisi ile 
                <strong> marka patent</strong> haklarınızı koruyun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/iletisim">
                    <Send className="mr-2 h-5 w-5" />
                    Ücretsiz Danışmanlık Alın
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/hizmetler">
                    Hizmetlerimizi İnceleyin
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Scale className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Marka Tescil</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Lightbulb className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Patent Başvurusu</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Palette className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Tasarım Tescili</h3>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FileText className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold">Hukuki Danışmanlık</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Profesyonel <span className="text-blue-600">Marka Tescil</span> ve <span className="text-blue-600">Patent</span> Hizmetleri
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              <strong>Marka tescil</strong>, <strong>patent başvurusu</strong> ve fikri mülkiyet haklarınızı korumak için 
              ihtiyacınız olan tüm <strong>marka patent</strong> hizmetlerini tek çatı altında sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Marka Tescil İşlemleri</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Marka tescil</strong> başvurunuzu ulusal ve uluslararası düzeyde 
                  hızlı ve güvenilir şekilde gerçekleştirin.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/hizmetler#marka-tescili">Marka Tescil Detayları</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Patent Başvuru Hizmetleri</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Patent başvurusu</strong> ile buluşunuzu koruma altına alın. 
                  Ulusal ve PCT patent başvuruları.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/hizmetler#patent-basvurusu">Patent Başvuru Detayları</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tasarım Tescili</h3>
                <p className="text-gray-600 mb-4">
                  Ürün tasarımlarınızı hukuki koruma altına alın.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/hizmetler#tasarim-tescili">Detaylar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hukuki Danışmanlık</h3>
                <p className="text-gray-600 mb-4">
                  Fikri mülkiyet konularında uzman hukuki destek.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/hizmetler#fikri-mulkiyet">Detaylar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Tescilofisi?
            </h2>
            <p className="text-xl text-gray-600">
              Deneyim, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uzman Kadro</h3>
              <p className="text-gray-600">
                Alanında uzman patent vekilleri ve hukukçulardan oluşan deneyimli ekip
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Müşteri Odaklı</h3>
              <p className="text-gray-600">
                Her müşterimize özel çözümler ve 7/24 destek hizmeti
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Başarı Garantisi</h3>
              <p className="text-gray-600">
                Yüksek başarı oranı ve şeffaf süreç yönetimi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Fikri Mülkiyetinizi Korumaya Bugün Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ücretsiz danışmanlık için hemen iletişime geçin. 
            Uzman ekibimiz size en uygun çözümü sunacak.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/iletisim">
              <Send className="mr-2 h-5 w-5" />
              Hemen İletişime Geçin
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
