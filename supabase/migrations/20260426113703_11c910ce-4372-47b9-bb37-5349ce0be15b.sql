-- 1. Nouvelle table : sections d'accueil personnalisées
CREATE TABLE IF NOT EXISTS public.home_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  eyebrow text,
  title text NOT NULL,
  subtitle text,
  content text,
  image_url text,
  cta_label text,
  cta_url text,
  layout text NOT NULL DEFAULT 'text-image',
  display_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published home sections"
ON public.home_sections FOR SELECT
USING (published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage home sections"
ON public.home_sections FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_home_sections_updated_at
BEFORE UPDATE ON public.home_sections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Ajouter image_url optionnel aux textes du site
ALTER TABLE public.site_texts
  ADD COLUMN IF NOT EXISTS image_url text;

-- 3. Trigger updated_at sur site_texts si manquant
DROP TRIGGER IF EXISTS update_site_texts_updated_at ON public.site_texts;
CREATE TRIGGER update_site_texts_updated_at
BEFORE UPDATE ON public.site_texts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Trigger updated_at sur poles si manquant
DROP TRIGGER IF EXISTS update_poles_updated_at ON public.poles;
CREATE TRIGGER update_poles_updated_at
BEFORE UPDATE ON public.poles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();