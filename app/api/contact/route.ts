import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  service: z.string().min(1, "Hizmet türü seçiniz"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = contactSchema.parse(body)
    
    // Create Supabase client with service role for bypassing RLS
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data, error } = await supabaseClient
      .from('contact_forms')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          service: validatedData.service,
          message: validatedData.message,
          status: 'new'
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Veritabanı hatası oluştu. Lütfen tekrar deneyin.',
          details: error.message,
          code: error.code 
        },
        { status: 500 }
      )
    }
    
    // Log successful submission (optional)
    console.log('New contact form submission:', {
      id: data.id,
      name: data.name,
      email: data.email,
      service: data.service,
      created_at: data.created_at
    })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size geri dönüş yapacağız.',
        id: data.id
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Form verilerinde hata var.',
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}