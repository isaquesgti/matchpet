-- Add message content length constraint
ALTER TABLE public.messages 
ADD CONSTRAINT message_content_length 
CHECK (length(content) >= 1 AND length(content) <= 5000);

-- Add UPDATE policy for messages (only allow updating read_at for received messages)
CREATE POLICY "Users can mark received messages as read"
ON public.messages
FOR UPDATE
USING (
  -- User is the recipient (message is in a match involving their pet, but they didn't send it)
  match_id IN (
    SELECT matches.id
    FROM matches
    WHERE (
      matches.pet1_id IN (
        SELECT pets.id FROM pets
        WHERE pets.owner_id IN (
          SELECT profiles.id FROM profiles
          WHERE profiles.user_id = auth.uid()
        )
      )
      OR matches.pet2_id IN (
        SELECT pets.id FROM pets
        WHERE pets.owner_id IN (
          SELECT profiles.id FROM profiles
          WHERE profiles.user_id = auth.uid()
        )
      )
    )
  )
  AND sender_id NOT IN (
    SELECT profiles.id FROM profiles
    WHERE profiles.user_id = auth.uid()
  )
)
WITH CHECK (
  -- Only allow updating read_at field (content must remain unchanged)
  match_id IN (
    SELECT matches.id
    FROM matches
    WHERE (
      matches.pet1_id IN (
        SELECT pets.id FROM pets
        WHERE pets.owner_id IN (
          SELECT profiles.id FROM profiles
          WHERE profiles.user_id = auth.uid()
        )
      )
      OR matches.pet2_id IN (
        SELECT pets.id FROM pets
        WHERE pets.owner_id IN (
          SELECT profiles.id FROM profiles
          WHERE profiles.user_id = auth.uid()
        )
      )
    )
  )
  AND sender_id NOT IN (
    SELECT profiles.id FROM profiles
    WHERE profiles.user_id = auth.uid()
  )
);