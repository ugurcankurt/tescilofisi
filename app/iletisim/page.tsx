"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  Scale,
  Lightbulb,
  Palette,
  FileText,
  CheckCircle
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { StructuredData } from "@/components/structured-data"

const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(11, "Geçerli bir telefon numarası giriniz"),
  service: z.string().min(1, "Hizmet türü seçiniz"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır")
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  })

  const watchService = watch("service")

  const onSubmit = async (data: ContactForm) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Form data:', data)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  if (isSubmitted) {
    return (
      <>
        <StructuredData type="faq" />
        <div className="font-sans">
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mesajınız Başarıyla Gönderildi!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              En kısa sürede size geri dönüş yapacağız. Teşekkür ederiz.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Yeni Mesaj Gönder
            </Button>
          </div>
        </section>
        </div>
      </>
    )
  }

  return (
    <>
      <StructuredData type="faq" />
      <div className="font-sans">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Size Nasıl Yardımcı Olabiliriz?
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            İletişime Geçin
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fikri mülkiyet haklarınızla ilgili sorularınız için bizimle iletişime geçin. 
            Ücretsiz danışmanlık hizmeti sunuyoruz.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    İletişim Bilgileri
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Telefon</p>
                        <p className="text-gray-600">+90 (212) 555 0123</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">E-posta</p>
                        <p className="text-gray-600">info@ugurpatent.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Adres</p>
                        <p className="text-gray-600">
                          Maslak Mahallesi<br />
                          Büyükdere Caddesi No: 123<br />
                          Sarıyer, İstanbul
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Çalışma Saatleri</p>
                        <p className="text-gray-600">
                          Pazartesi - Cuma: 09:00 - 18:00<br />
                          Cumartesi: 09:00 - 14:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Quick Reference */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hizmetlerimiz</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Scale className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Marka Tescili</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Patent Başvurusu</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Tasarım Tescili</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">Hukuki Danışmanlık</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bize Mesaj Gönderin</CardTitle>
                  <p className="text-gray-600">
                    Formu doldurun, size en kısa sürede geri dönelim.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Ad Soyad *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className="mt-1"
                          placeholder="Adınız ve soyadınız"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          className="mt-1"
                          placeholder="0532 123 45 67"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">E-posta Adresi *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1"
                        placeholder="ornek@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="service">Hangi Hizmetimizle İlgileniyorsunuz? *</Label>
                      <Select onValueChange={(value) => setValue("service", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Hizmet türü seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marka-tescili">Marka Tescili</SelectItem>
                          <SelectItem value="patent-basvurusu">Patent Başvurusu</SelectItem>
                          <SelectItem value="tasarim-tescili">Tasarım Tescili</SelectItem>
                          <SelectItem value="fikri-mulkiyet">Fikri Mülkiyet Danışmanlığı</SelectItem>
                          <SelectItem value="genel-danismanlik">Genel Danışmanlık</SelectItem>
                          <SelectItem value="diger">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-red-600 text-sm mt-1">{errors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Mesajınız *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="mt-1"
                        rows={5}
                        placeholder="Projeniz veya ihtiyaçlarınız hakkında detayları yazabilirsiniz..."
                      />
                      {errors.message && (
                        <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Ücretsiz Danışmanlık:</strong> Tüm başvurular için ilk danışmanlık hizmeti ücretsizdir. 
                        Size özel çözüm önerilerimizi paylaşacağız.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Mesajı Gönder
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-lg text-gray-600">
              En çok merak edilen konular hakkında bilgiler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Marka tescili ne kadar sürer?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Marka tescil süreci genellikle 6-12 ay arasında tamamlanır. 
                  İtiraz süreci ve inceleme detaylarına göre süre değişebilir.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Patent başvurusu maliyeti nedir?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Patent maliyetleri başvuru türüne göre değişir. 
                  Ücretsiz danışmanlık ile size özel fiyat teklifi sunuyoruz.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Uluslararası başvuru yapabiliyor musunuz?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Evet, 150+ ülkede marka ve patent başvurusu yapabiliyoruz. 
                  Madrid Sistemi ve PCT başvuruları da hizmetlerimiz arasındadır.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Danışmanlık hizmeti gerçekten ücretsiz mi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  İlk danışmanlık görüşmemiz tamamen ücretsizdir. 
                  İhtiyaçlarınızı anlayıp size en uygun çözümü sunuyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}