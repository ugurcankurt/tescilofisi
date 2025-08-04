-- Insert sample blog posts for Tescilofisi
INSERT INTO public.blog_posts (
    title,
    slug,
    excerpt,
    content,
    author,
    category,
    tags,
    published,
    seo_title,
    seo_description
) VALUES 
(
    'Marka Tescil Sürecinde Dikkat Edilmesi Gereken 10 Önemli Nokta',
    'marka-tescil-surecinde-dikkat-edilmesi-gereken-10-onemli-nokta',
    'Marka tescil sürecinde başarılı olmak için dikkat etmeniz gereken kritik noktaları öğrenin.',
    '<h2>Marka Tescil Sürecinde Dikkat Edilmesi Gereken 10 Önemli Nokta</h2>
    <p>Marka tescil süreci, işletmenizin gelecekteki başarısı için kritik öneme sahiptir. İşte bu süreçte dikkat etmeniz gereken 10 önemli nokta:</p>
    <ol>
    <li><strong>Detaylı Marka Araştırması Yapın:</strong> Başvuru öncesi kapsamlı bir araştırma yaparak benzer markaları tespit edin.</li>
    <li><strong>Doğru Sınıf Seçimi:</strong> Markanızın kullanılacağı mal ve hizmet sınıflarını doğru belirleyin.</li>
    <li><strong>Ayırt Edici Özellik:</strong> Markanızın ayırt edici özelliğe sahip olduğundan emin olun.</li>
    <li><strong>Profesyonel Destek:</strong> Deneyimli marka vekilleri ile çalışın.</li>
    <li><strong>Zamanlama:</strong> Başvuru süreçlerini doğru zamanlayın.</li>
    </ol>',
    'Tescilofisi Uzmanları',
    'Marka Tescil',
    ARRAY['marka tescil', 'patent', 'fikri mülkiyet', 'başvuru süreci'],
    true,
    'Marka Tescil Sürecinde Dikkat Edilmesi Gereken 10 Önemli Nokta | Tescilofisi',
    'Marka tescil sürecinde başarılı olmak için dikkat etmeniz gereken kritik noktaları öğrenin. Uzman tavsiyeleri ve önemli ipuçları.'
),
(
    'Patent Başvurusu Nasıl Yapılır? Adım Adım Rehber',
    'patent-basvurusu-nasil-yapilir-adim-adim-rehber',
    'Patent başvuru sürecini adım adım öğrenin ve buluşunuzu koruma altına alın.',
    '<h2>Patent Başvurusu Nasıl Yapılır?</h2>
    <p>Patent başvurusu, buluşunuzu koruma altına almanın en etkili yoludur. İşte adım adım patent başvuru süreci:</p>
    <h3>1. Ön Araştırma</h3>
    <p>Buluşunuzun yeni olup olmadığını araştırın ve benzer patentleri inceleyin.</p>
    <h3>2. Patent Başvuru Dosyası Hazırlama</h3>
    <p>Teknik çizimler, açıklamalar ve istekler bölümünü hazırlayın.</p>
    <h3>3. TÜRKPATENT''e Başvuru</h3>
    <p>Gerekli belgelerle birlikte resmi başvurunuzu yapın.</p>',
    'Patent Uzmanları',
    'Patent Başvurusu',
    ARRAY['patent başvurusu', 'buluş', 'türkpatent', 'koruma'],
    true,
    'Patent Başvurusu Nasıl Yapılır? Adım Adım Rehber | Tescilofisi',
    'Patent başvuru sürecini adım adım öğrenin. Buluşunuzu koruma altına almak için gereken tüm adımlar ve önemli noktalar.'
),
(
    'Fikri Mülkiyet Hakkında Bilinmesi Gerekenler',
    'fikri-mulkiyet-hakkinda-bilinmesi-gerekenler',
    'Fikri mülkiyet haklarının temel prensiplerini ve korunma yöntemlerini öğrenin.',
    '<h2>Fikri Mülkiyet Nedir?</h2>
    <p>Fikri mülkiyet, insan zihni ürünü olan yaratıcı çalışmaları koruyan hukuki sistem...</p>',
    'Hukuk Uzmanları',
    'Fikri Mülkiyet',
    ARRAY['fikri mülkiyet', 'telif hakkı', 'patent', 'marka'],
    false,
    'Fikri Mülkiyet Hakkında Bilinmesi Gerekenler | Tescilofisi',
    'Fikri mülkiyet haklarının temel prensiplerini ve korunma yöntemlerini detaylı olarak öğrenin.'
);

-- Insert categories for better organization (optional)
-- This could be a separate table in the future if needed