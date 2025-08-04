"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppButton({ 
  phoneNumber = "905551234567", // Varsayılan numara - gerçek numarayla değiştirin
  message = "Merhaba! Marka tescil ve patent başvurusu hakkında bilgi almak istiyorum."
}: WhatsAppButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    // Analytics tracking (isteğe bağlı)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_button',
      })
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Desktop Version - Right Side */}
      <div className="hidden md:block fixed right-6 bottom-6 z-50">
        <div className="flex flex-col items-end space-y-3">
          {/* Expanded Info Card */}
          {isExpanded && (
            <div className="bg-white rounded-lg shadow-lg border p-4 max-w-xs animate-in slide-in-from-right-2 duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Tescilofisi</h4>
                    <p className="text-xs text-green-600">Çevrimiçi</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Marka tescil ve patent başvurusu için hemen WhatsApp&apos;tan iletişime geçin!
              </p>
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="sm"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Mesaj Gönder
              </Button>
            </div>
          )}

          {/* Main WhatsApp Button */}
          <div className="relative">
            <Button
              onClick={isExpanded ? handleWhatsAppClick : toggleExpanded}
              className={cn(
                "rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-200",
                isExpanded && "animate-pulse"
              )}
              size="icon"
            >
              <MessageCircle className="!w-6 !h-6" />
            </Button>
            
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Mobile Version - Bottom Center */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex flex-col items-center space-y-2">
          {/* Expanded Info Card for Mobile */}
          {isExpanded && (
            <div className="bg-white rounded-xl shadow-xl border p-5 w-80 max-w-[90vw] mx-4 animate-in slide-in-from-bottom-2 duration-200">
              <div className="text-center">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-base mb-2 text-gray-900">Hemen WhatsApp&apos;la İletişime Geçin</h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Marka tescil ve patent başvurusu için uzman desteği alın
                </p>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3"
                    size="default"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Mesaj Gönder
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={toggleExpanded}
                    className="px-4 py-3"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Mobile Button */}
          <Button
            onClick={isExpanded ? handleWhatsAppClick : toggleExpanded}
            className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
            size="icon"
          >
            <MessageCircle className="!w-6 !h-6" />
          </Button>
        </div>
      </div>
    </>
  )
}

// Global type declaration for gtag (optional)
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}