
-- 1. App role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- user_roles policies
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Banners table
CREATE TABLE public.banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot text NOT NULL,
  title text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  link_url text DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Anyone can view active banners (public facing)
CREATE POLICY "Anyone can view active banners"
  ON public.banners FOR SELECT
  USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can manage banners"
  ON public.banners FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_banners_updated_at
  BEFORE UPDATE ON public.banners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Storage bucket for banner images
INSERT INTO storage.buckets (id, name, public) VALUES ('banner-images', 'banner-images', true);

-- Public read access
CREATE POLICY "Banner images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'banner-images');

-- Admins can upload banner images
CREATE POLICY "Admins can upload banner images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'banner-images' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete banner images
CREATE POLICY "Admins can delete banner images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'banner-images' AND public.has_role(auth.uid(), 'admin'));
