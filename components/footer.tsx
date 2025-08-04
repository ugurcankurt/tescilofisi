import Link from "next/link"
import { Scale, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Tescilofisi</span>
            </div>
            <p className="text-gray-300 text-sm">
              Türkiye'de marka tescili, patent başvurusu ve fikri mülkiyet hukuku alanında 
              uzman danışmanlık hizmetleri sunuyoruz.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/hizmetler#marka-tescili" className="hover:text-white transition-colors">
                  Marka Tescili
                </Link>
              </li>
              <li>
                <Link href="/hizmetler#patent-basvurusu" className="hover:text-white transition-colors">
                  Patent Başvurusu
                </Link>
              </li>
              <li>
                <Link href="/hizmetler#fikri-mulkiyet" className="hover:text-white transition-colors">
                  Fikri Mülkiyet Danışmanlığı
                </Link>
              </li>
              <li>
                <Link href="/hizmetler#tasarim-tescili" className="hover:text-white transition-colors">
                  Tasarım Tescili
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+90 (212) 555 0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@tescilofisi.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Tescilofisi. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/gizlilik" className="text-gray-400 hover:text-white text-sm transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-white text-sm transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}