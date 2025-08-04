-- Create contact_forms table
CREATE TABLE IF NOT EXISTS public.contact_forms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_forms_status ON public.contact_forms(status);
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON public.contact_forms(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_forms_service ON public.contact_forms(service);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON public.contact_forms(email);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_contact_forms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER handle_contact_forms_updated_at
    BEFORE UPDATE ON public.contact_forms
    FOR EACH ROW EXECUTE PROCEDURE public.handle_contact_forms_updated_at();

-- Enable RLS (Row Level Security)
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert contact forms
CREATE POLICY "Anyone can insert contact forms" ON public.contact_forms
    FOR INSERT TO anon WITH CHECK (true);

-- Create policy for authenticated users to read all contact forms (admin access)
CREATE POLICY "Authenticated users can read contact forms" ON public.contact_forms
    FOR SELECT TO authenticated USING (true);

-- Create policy for authenticated users to update contact forms (admin access)
CREATE POLICY "Authenticated users can update contact forms" ON public.contact_forms
    FOR UPDATE TO authenticated USING (true);