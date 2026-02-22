
-- Add birth_date and accepted_terms_at to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS birth_date date,
  ADD COLUMN IF NOT EXISTS accepted_terms_at timestamp with time zone;

-- Create reports table
CREATE TABLE public.reports (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_user_id uuid NOT NULL,
  reported_user_id uuid NOT NULL,
  match_id uuid REFERENCES public.matches(id),
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  resolved_at timestamp with time zone
);

-- Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Users can create reports
CREATE POLICY "Users can create reports"
  ON public.reports
  FOR INSERT
  WITH CHECK (auth.uid() = reporter_user_id);

-- Users can view their own reports
CREATE POLICY "Users can view their own reports"
  ON public.reports
  FOR SELECT
  USING (auth.uid() = reporter_user_id);

-- Admins can view all reports
CREATE POLICY "Admins can view all reports"
  ON public.reports
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update reports
CREATE POLICY "Admins can update reports"
  ON public.reports
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add is_blocked column to profiles for admin blocking
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_blocked boolean NOT NULL DEFAULT false;
