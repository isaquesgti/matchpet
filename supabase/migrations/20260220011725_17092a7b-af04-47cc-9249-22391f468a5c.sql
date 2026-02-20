
-- 1. Prevent admins from modifying their own roles (privilege escalation prevention)
CREATE POLICY "Users cannot modify their own roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (user_id != auth.uid());

CREATE POLICY "Users cannot delete their own roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (user_id != auth.uid());

-- 2. Rate limit banner events: max 50 events per banner per 5 minutes (server-side)
DROP POLICY IF EXISTS "Anyone can log banner events" ON public.banner_events;

CREATE POLICY "Anyone can log banner events with rate limit"
  ON public.banner_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (event_type = ANY (ARRAY['click'::text, 'impression'::text]))
    AND (banner_id IN (SELECT id FROM banners WHERE is_active = true))
    AND (
      (SELECT COUNT(*) FROM public.banner_events be
       WHERE be.banner_id = banner_events.banner_id
       AND be.created_at > NOW() - INTERVAL '5 minutes') < 50
    )
  );
