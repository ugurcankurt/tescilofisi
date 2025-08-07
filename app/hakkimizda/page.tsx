import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
  Users, 
  CheckCircle,
  Target,
  Eye,
  Heart,
  Globe,
  Briefcase,
  Clock,
  Shield
} from "lucide-react"

export const metadata: Metadata = {
  title: "Hakkımızda - Tescilofisi | Marka Tescil ve Patent Uzmanları",
  description: "Türkiye'de fikri mülkiyet alanında öncü danışmanlık firması. 10+ yıl deneyim, 500+ başarılı marka tescili, 200+ patent başvurusu. Uzman kadro ile güvenilir hizmet.",
  keywords: "tescilofisi hakkında, marka tescil uzmanları, patent vekilleri, fikri mülkiyet danışmanları, türkiye patent uzmanları, marka tescil firması",
  openGraph: {
    title: "Hakkımızda - Tescilofisi | Marka Tescil ve Patent Uzmanları",
    description: "Türkiye'de fikri mülkiyet alanında öncü danışmanlık firması. 10+ yıl deneyim, 500+ başarılı marka tescili, 200+ patent başvurusu.",
    url: "https://tescilofisi.com/hakkimizda",
    type: "website",
  },
  alternates: {
    canonical: "https://tescilofisi.com/hakkimizda",
  },
}

export default function AboutPage() {
  return (
    <div className="font-sans">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Deneyim ve Güvenilirlik
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Türkiye&apos;nin Güvenilir Marka Tescil ve Patent Uzmanları
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Türkiye&apos;de fikri mülkiyet alanında öncü bir danışmanlık firması olarak, 
            müşterilerimizin haklarını korumak için çalışıyoruz.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Fikri Mülkiyet Alanında Güvenilir Ortağınız
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Tescilofisi, Türkiye&apos;de marka tescili, patent başvurusu ve fikri mülkiyet 
                hukuku alanında uzmanlaşmış bir danışmanlık firmasıdır. Yılların deneyimi 
                ile şirketlerin ve girişimcilerin fikri mülkiyet haklarını koruma konusunda 
                güvenilir çözümler sunmaktayız.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Müşteri odaklı yaklaşımımız, uzman kadromuz ve başarı odaklı çalışma anlayışımız 
                ile sektörde öncü konumdayız. Her proje için özelleştirilmiş stratejiler 
                geliştiriyor, müşterilerimizin hedeflerine ulaşmalarını sağlıyoruz.
              </p>
              <Button asChild>
                <Link href="/iletisim">
                  <Shield className="mr-2 h-5 w-5" />
                  Bizimle Çalışın
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Card className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <p className="text-gray-600">Başarılı Marka Tescili</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                    <p className="text-gray-600">Patent Başvurusu</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
                    <p className="text-gray-600">Yıllık Deneyim</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                    <p className="text-gray-600">Müşteri Memnuniyeti</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Misyon, Vizyon ve Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600">
              Fikri mülkiyet alanında Türkiye&apos;nin önde gelen danışmanlık firması olma yolunda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Misyonumuz</h3>
              <p className="text-gray-600">
                Müşterilerimizin fikri mülkiyet haklarını en iyi şekilde koruyarak, 
                inovasyonu desteklemek ve sürdürülebilir başarı sağlamak.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Vizyonumuz</h3>
              <p className="text-gray-600">
                Türkiye&apos;de fikri mülkiyet alanında öncü, güvenilir ve yenilikçi 
                çözümler sunan lider danışmanlık firması olmak.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Değerlerimiz</h3>
              <p className="text-gray-600">
                Dürüstlük, uzman bilgi, müşteri odaklılık, şeffaflık ve 
                sürekli gelişim ilkelerimiz doğrultusunda hizmet veriyoruz.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Tescilofisi&apos;ni Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600">
              Rakiplerimizden bizi ayıran özellikler ve avantajlarımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Uzman Kadro</h3>
                <p className="text-gray-600">
                  Alanında uzman patent vekilleri ve hukukçulardan oluşan deneyimli ekibimiz
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 p-3 rounded-lg flex-shrink-0">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Hızlı Süreç</h3>
                <p className="text-gray-600">
                  Etkin süreç yönetimi ile başvurularınızı en kısa sürede sonuçlandırıyoruz
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-600 p-3 rounded-lg flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Müşteri Odaklı</h3>
                <p className="text-gray-600">
                  Her müşterimize özel çözümler ve 7/24 destek hizmeti sunuyoruz
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-600 p-3 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Yüksek Başarı Oranı</h3>
                <p className="text-gray-600">
                  %98 müşteri memnuniyeti ve yüksek başarı oranlarımızla güven veriyoruz
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-indigo-600 p-3 rounded-lg flex-shrink-0">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Uluslararası Hizmet</h3>
                <p className="text-gray-600">
                  150+ ülkede patent ve marka başvuru imkanı sunuyoruz
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-600 p-3 rounded-lg flex-shrink-0">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Kapsamlı Portföy</h3>
                <p className="text-gray-600">
                  Marka, patent, tasarım ve telif hakkı konularında tam hizmet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Çalışma Sürecimiz
            </h2>
            <p className="text-xl text-blue-100">
              Şeffaf ve etkin süreç yönetimi ile başarıya ulaşıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Danışmanlık</h3>
              <p className="text-blue-100">
                Ücretsiz ön danışmanlık ve ihtiyaç analizi
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Araştırma</h3>
              <p className="text-blue-100">
                Detaylı araştırma ve patentlenebilirlik analizi
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Başvuru</h3>
              <p className="text-blue-100">
                Profesyonel başvuru hazırlığı ve sunumu
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Takip</h3>
              <p className="text-blue-100">
                Süreç takibi ve tescil sonrası koruma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sizinle Çalışmayı Dört Gözle Bekliyoruz
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Fikri mülkiyet haklarınızı korumak için bugün harekete geçin. 
            Ücretsiz danışmanlık için hemen iletişime geçin.
          </p>
          <Button size="lg" asChild>
            <Link href="/iletisim">
              <Shield className="mr-2 h-5 w-5" />
              Ücretsiz Danışmanlık Alın
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}