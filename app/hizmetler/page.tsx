import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StructuredData } from "@/components/structured-data"
import { 
  Scale, 
  Lightbulb, 
  Palette, 
  FileText, 
  CheckCircle, 
  Clock,
  Globe,
  Shield,
  ArrowRight,
  Send
} from "lucide-react"

export default function ServicesPage() {
  return (
    <>
      <StructuredData type="service" />
      <div className="font-sans">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Türkiye&apos;nin En Kapsamlı Marka Patent Hizmetleri
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Marka Tescil</span> ve <span className="text-blue-600">Patent Başvurusu</span> Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <strong>Marka tescil işlemleri</strong>, <strong>patent başvurusu</strong> ve fikri mülkiyet haklarınızı 
            korumak için gereken tüm <strong>marka patent</strong> hizmetlerini profesyonel ekibimizle sunuyoruz.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Marka Tescili */}
          <div id="marka-tescili" className="scroll-mt-20">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-blue-50 p-8 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/trademark-bg.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-blue-50/70"></div>
                  <div className="text-center relative z-10">
                    <div className="bg-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scale className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900">Marka Tescili</h3>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Profesyonel Marka Tescil İşlemleri
                  </h2>
                  <p className="text-gray-600 mb-6">
                    <strong>Marka tescil</strong> sürecinizi Türkiye&apos;nin en deneyimli ekibi ile tamamlayın. 
                    Ulusal ve uluslararası <strong>marka tescil işlemleri</strong> için güvenilir çözümler sunuyoruz. 
                    %98 başarı oranı ile <strong>marka patent</strong> haklarınızı koruyun.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      "Marka araştırması ve analizi",
                      "Ulusal marka tescil başvurusu",
                      "Uluslararası marka tescili (Madrid Sistemi)",
                      "Marka yenileme işlemleri",
                      "Marka ihlali takibi ve korunması",
                      "Marka portföy yönetimi"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      6-12 ay
                    </Badge>
                    <Badge variant="outline">
                      <Globe className="mr-1 h-3 w-3" />
                      Ulusal & Uluslararası
                    </Badge>
                    <Badge variant="outline">
                      <Shield className="mr-1 h-3 w-3" />
                      10 yıl koruma
                    </Badge>
                  </div>

                  <Button asChild>
                    <Link href="/iletisim">
                      Marka Tescili İçin İletişime Geçin
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Patent Başvurusu */}
          <div id="patent-basvurusu" className="scroll-mt-20">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Uzman Patent Başvuru Hizmetleri
                  </h2>
                  <p className="text-gray-600 mb-6">
                    <strong>Patent başvurusu</strong> ile buluşunuzu koruma altına alın ve rekabet avantajı elde edin. 
                    Teknik ve hukuki uzmanlığımızla <strong>patent</strong> sürecinizi baştan sona yönetiyoruz. 
                    Ulusal ve PCT <strong>patent başvuruları</strong> için güvenilir hizmet.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      "Patent araştırması ve patentlenebilirlik analizi",
                      "Ulusal patent başvurusu",
                      "PCT (Uluslararası) patent başvurusu",
                      "Faydalı model tescili",
                      "Patent ihlali analizi ve korunması",
                      "Patent portföy stratejisi"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      18-24 ay
                    </Badge>
                    <Badge variant="outline">
                      <Globe className="mr-1 h-3 w-3" />
                      150+ ülke
                    </Badge>
                    <Badge variant="outline">
                      <Shield className="mr-1 h-3 w-3" />
                      20 yıl koruma
                    </Badge>
                  </div>

                  <Button asChild>
                    <Link href="/iletisim">
                      Patent Başvurusu İçin İletişime Geçin
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
                <div className="bg-green-50 p-8 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/patent-bg.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-green-50/70"></div>
                  <div className="text-center relative z-10">
                    <div className="bg-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900">Patent Başvurusu</h3>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tasarım Tescili */}
          <div id="tasarim-tescili" className="scroll-mt-20">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-purple-50 p-8 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/design-bg.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-purple-50/70"></div>
                  <div className="text-center relative z-10">
                    <div className="bg-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Palette className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900">Tasarım Tescili</h3>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Endüstriyel Tasarım Tescili
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Ürün tasarımlarınızın görsel özelliklerini koruma altına alın. 
                    Tasarım haklarınızı güvence altına alarak pazardaki konumunuzu güçlendirin.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      "Tasarım araştırması ve analizi",
                      "Ulusal tasarım tescili",
                      "Avrupa Birliği tasarım tescili",
                      "Uluslararası tasarım tescili",
                      "Tasarım ihlali takibi",
                      "Tasarım portföy yönetimi"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      2-6 ay
                    </Badge>
                    <Badge variant="outline">
                      <Globe className="mr-1 h-3 w-3" />
                      AB & Uluslararası
                    </Badge>
                    <Badge variant="outline">
                      <Shield className="mr-1 h-3 w-3" />
                      25 yıl koruma
                    </Badge>
                  </div>

                  <Button asChild>
                    <Link href="/iletisim">
                      Tasarım Tescili İçin İletişime Geçin
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Fikri Mülkiyet Danışmanlığı */}
          <div id="fikri-mulkiyet" className="scroll-mt-20">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Fikri Mülkiyet Danışmanlığı
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Fikri mülkiyet haklarınızı korumak ve değerlendirmek için 
                    kapsamlı hukuki danışmanlık hizmetleri sunuyoruz.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      "Fikri mülkiyet stratejisi geliştirme",
                      "IP portföy değerlendirmesi",
                      "Lisanslama anlaşmaları",
                      "Fikri mülkiyet ihlali davaları",
                      "Ticari sır korunması",
                      "Telif hakkı danışmanlığı"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline">Hukuki Danışmanlık</Badge>
                    <Badge variant="outline">Stratejik Planlama</Badge>
                    <Badge variant="outline">Dava Takibi</Badge>
                  </div>

                  <Button asChild>
                    <Link href="/iletisim">
                      Hukuki Danışmanlık İçin İletişime Geçin
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
                <div className="bg-orange-50 p-8 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/legal-bg.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-orange-50/70"></div>
                  <div className="text-center relative z-10">
                    <div className="bg-orange-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-orange-900">Hukuki Danışmanlık</h3>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hangi Hizmete İhtiyacınız Var?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Uzman ekibimiz size en uygun çözümü sunmak için hazır. 
            Ücretsiz danışmanlık için hemen iletişime geçin.
          </p>
          <Button size="lg" asChild>
            <Link href="/iletisim">
              <Send className="mr-2 h-5 w-5" />
              Ücretsiz Danışmanlık Alın
            </Link>
          </Button>
        </div>
      </section>
      </div>
    </>
  )
}