
-- Banner events table for tracking clicks and impressions
CREATE TABLE public.banner_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_id uuid NOT NULL REFERENCES public.banners(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('click', 'impression')),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.banner_events ENABLE ROW LEVEL SECURITY;

-- Anyone can insert events (anonymous tracking)
CREATE POLICY "Anyone can log banner events"
  ON public.banner_events FOR INSERT
  WITH CHECK (true);

-- Only admins can view events
CREATE POLICY "Admins can view banner events"
  ON public.banner_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Index for fast aggregation queries
CREATE INDEX idx_banner_events_banner_id ON public.banner_events(banner_id);
CREATE INDEX idx_banner_events_type_created ON public.banner_events(event_type, created_at);

-- Aggregated stats view for admin dashboard (avoids scanning all events)
CREATE OR REPLACE VIEW public.banner_stats AS
SELECT
  b.id AS banner_id,
  b.slot,
  b.title,
  b.image_url,
  b.is_active,
  COALESCE(SUM(CASE WHEN e.event_type = 'impression' THEN 1 ELSE 0 END), 0) AS impressions,
  COALESCE(SUM(CASE WHEN e.event_type = 'click' THEN 1 ELSE 0 END), 0) AS clicks,
  CASE 
    WHEN COALESCE(SUM(CASE WHEN e.event_type = 'impression' THEN 1 ELSE 0 END), 0) > 0 
    THEN ROUND(
      (COALESCE(SUM(CASE WHEN e.event_type = 'click' THEN 1 ELSE 0 END), 0)::numeric /
       COALESCE(SUM(CASE WHEN e.event_type = 'impression' THEN 1 ELSE 0 END), 0)::numeric) * 100, 2
    )
    ELSE 0
  END AS ctr
FROM public.banners b
LEFT JOIN public.banner_events e ON e.banner_id = b.id
GROUP BY b.id, b.slot, b.title, b.image_url, b.is_active;
