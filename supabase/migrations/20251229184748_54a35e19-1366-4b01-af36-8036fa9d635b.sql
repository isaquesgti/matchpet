-- Create storage bucket for pet photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('pet-photos', 'pet-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

-- Allow authenticated users to upload photos
CREATE POLICY "Users can upload pet photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'pet-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to update their photos
CREATE POLICY "Users can update their pet photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'pet-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to delete their photos
CREATE POLICY "Users can delete their pet photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'pet-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access to pet photos
CREATE POLICY "Pet photos are publicly accessible"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'pet-photos');