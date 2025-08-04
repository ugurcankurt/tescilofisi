"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Search, 
  Eye,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Download
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { ContactForm } from "@/lib/supabase"

export default function ContactsList() {
  const [contacts, setContacts] = useState<ContactForm[]>([])
  const [filteredContacts, setFilteredContacts] = useState<ContactForm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const filterContacts = useCallback(() => {
    let filtered = [...contacts]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    // Service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter(contact => contact.service === serviceFilter)
    }

    setFilteredContacts(filtered)
  }, [contacts, searchTerm, statusFilter, serviceFilter])

  useEffect(() => {
    filterContacts()
  }, [filterContacts])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setContacts(data || [])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Bir hata oluştu"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: ContactForm['status']) => {
    try {
      const { error } = await supabase
        .from('contact_forms')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      setContacts(contacts.map(contact => 
        contact.id === id 
          ? { ...contact, status: newStatus }
          : contact
      ))

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus })
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Bir hata oluştu"
      setError(errorMessage)
    }
  }

  const exportContacts = () => {
    const csvContent = [
      ['Ad Soyad', 'E-posta', 'Telefon', 'Hizmet', 'Durum', 'Tarih'],
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone,
        contact.service,
        contact.status,
        new Date(contact.created_at).toLocaleDateString('tr-TR')
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `iletisim-mesajlari-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const services = [...new Set(contacts.map(contact => contact.service))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'destructive'
      case 'read': return 'secondary'
      case 'replied': return 'default'
      case 'closed': return 'outline'
      default: return 'secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Yeni'
      case 'read': return 'Okundu'
      case 'replied': return 'Yanıtlandı'
      case 'closed': return 'Kapatıldı'
      default: return status
    }
  }

  const getServiceText = (service: string) => {
    switch (service) {
      case 'marka-tescili': return 'Marka Tescili'
      case 'patent-basvurusu': return 'Patent Başvurusu'
      case 'tasarim-tescili': return 'Tasarım Tescili'
      case 'fikri-mulkiyet': return 'Fikri Mülkiyet Danışmanlığı'
      case 'genel-danismanlik': return 'Genel Danışmanlık'
      case 'diger': return 'Diğer'
      default: return service
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">İletişim Mesajları</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gelen iletişim formlarını yönetin
          </p>
        </div>
        <Button onClick={exportContacts} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          CSV İndir
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Ad, e-posta veya mesaj ara..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="new">Yeni</SelectItem>
                <SelectItem value="read">Okundu</SelectItem>
                <SelectItem value="replied">Yanıtlandı</SelectItem>
                <SelectItem value="closed">Kapatıldı</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Hizmet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Hizmetler</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {getServiceText(service)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className={contact.status === 'new' ? 'border-red-200 bg-red-50/30' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex space-x-4 flex-1">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {contact.name}
                      </h3>
                      <Badge variant={getStatusColor(contact.status)}>
                        {getStatusText(contact.status)}
                      </Badge>
                    </div>
                  
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(contact.created_at).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                  
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {contact.message}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{getServiceText(contact.service)}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedContact(contact)
                          if (contact.status === 'new') {
                            updateStatus(contact.id, 'read')
                          }
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>İletişim Mesajı Detayı</DialogTitle>
                      </DialogHeader>
                      {selectedContact && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Ad Soyad</label>
                              <p className="text-sm text-gray-900">{selectedContact.name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">E-posta</label>
                              <p className="text-sm text-gray-900">{selectedContact.email}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Telefon</label>
                              <p className="text-sm text-gray-900">{selectedContact.phone}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Hizmet</label>
                              <p className="text-sm text-gray-900">{getServiceText(selectedContact.service)}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Durum</label>
                              <div className="flex items-center space-x-2">
                                <Badge variant={getStatusColor(selectedContact.status)}>
                                  {getStatusText(selectedContact.status)}
                                </Badge>
                                <Select 
                                  value={selectedContact.status} 
                                  onValueChange={(value) => updateStatus(selectedContact.id, value as ContactForm['status'])}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">Yeni</SelectItem>
                                    <SelectItem value="read">Okundu</SelectItem>
                                    <SelectItem value="replied">Yanıtlandı</SelectItem>
                                    <SelectItem value="closed">Kapatıldı</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Tarih</label>
                              <p className="text-sm text-gray-900">
                                {new Date(selectedContact.created_at).toLocaleString('tr-TR')}
                              </p>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Mesaj</label>
                            <div className="mt-2 p-3 bg-gray-50 rounded-md">
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Select 
                    value={contact.status} 
                    onValueChange={(value) => updateStatus(contact.id, value as ContactForm['status'])}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Yeni</SelectItem>
                      <SelectItem value="read">Okundu</SelectItem>
                      <SelectItem value="replied">Yanıtlandı</SelectItem>
                      <SelectItem value="closed">Kapatıldı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredContacts.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all" || serviceFilter !== "all"
                  ? "Arama kriterlerinize uygun mesaj bulunamadı."
                  : "Henüz iletişim mesajı yok."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Statistics */}
      {contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
                <div className="text-sm text-gray-500">Toplam Mesaj</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {contacts.filter(c => c.status === 'new').length}
                </div>
                <div className="text-sm text-gray-500">Yeni</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {contacts.filter(c => c.status === 'replied').length}
                </div>
                <div className="text-sm text-gray-500">Yanıtlandı</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {contacts.filter(c => c.status === 'closed').length}
                </div>
                <div className="text-sm text-gray-500">Kapatıldı</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}