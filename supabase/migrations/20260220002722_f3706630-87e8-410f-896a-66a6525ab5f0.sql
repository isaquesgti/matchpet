
-- Fix: Change view to SECURITY INVOKER (default, but explicit)
DROP VIEW IF EXISTS public.banner_stats;
CREATE VIEW public.banner_stats
WITH (security_invoker = true)
AS
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

-- Fix: Replace overly permissive INSERT policy with a more restrictive one
-- that validates the event_type and requires a valid banner_id
DROP POLICY "Anyone can log banner events" ON public.banner_events;
CREATE POLICY "Anyone can log banner events"
  ON public.banner_events FOR INSERT
  WITH CHECK (
    event_type IN ('click', 'impression')
    AND banner_id IN (SELECT id FROM public.banners WHERE is_active = true)
  );
