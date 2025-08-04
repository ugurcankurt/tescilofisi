# Supabase Migrations

Bu klasör Tescilofisi projesinin Supabase veritabanı migration dosyalarını içerir.

## Migration Dosyaları

1. **20250801000001_create_blog_posts.sql** - Blog yazıları tablosu ve ilgili fonksiyonlar
2. **20250801000002_create_rls_policies.sql** - Row Level Security politikaları  
3. **20250801000003_seed_data.sql** - Örnek blog yazıları

## Nasıl Çalıştırılır

### Supabase Dashboard Üzerinden:
1. Supabase projenizin dashboard'una gidin
2. SQL Editor'a gidin
3. Migration dosyalarını sırayla çalıştırın

### Supabase CLI ile (kuruluysa):
```bash
supabase db push
```

## Tablolar

### blog_posts
- **id**: UUID (Primary Key)
- **title**: Blog yazısı başlığı
- **slug**: SEO-friendly URL
- **excerpt**: Kısa özet
- **content**: HTML içerik
- **author**: Yazar adı
- **category**: Kategori
- **tags**: Etiketler (array)
- **featured_image**: Öne çıkan görsel URL
- **published**: Yayın durumu
- **seo_title**: SEO başlığı
- **seo_description**: SEO açıklaması
- **created_at**: Oluşturulma tarihi
- **updated_at**: Güncellenme tarihi (otomatik)
- **published_at**: Yayınlanma tarihi (otomatik)

## RLS Politikaları

- Herkes yayınlanmış yazıları okuyabilir
- Sadece authenticated kullanıcılar (admin) tüm işlemleri yapabilir
- Admin email adresleri: admin@tescilofisi.com, ugurcankurt@gmail.com