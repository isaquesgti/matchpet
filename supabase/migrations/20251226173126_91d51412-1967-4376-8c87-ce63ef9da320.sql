
-- Create enum for pet species
CREATE TYPE public.pet_species AS ENUM ('dog', 'cat');

-- Create enum for pet gender
CREATE TYPE public.pet_gender AS ENUM ('male', 'female');

-- Create enum for breeding interest
CREATE TYPE public.breeding_interest AS ENUM ('looking_for_mate', 'available_for_breeding', 'not_interested');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'Brasil',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pets table
CREATE TABLE public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  species pet_species NOT NULL,
  breed TEXT,
  gender pet_gender NOT NULL,
  birth_date DATE,
  weight_kg DECIMAL(5,2),
  is_neutered BOOLEAN DEFAULT false,
  breeding_interest breeding_interest DEFAULT 'not_interested',
  description TEXT,
  photos TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create swipes table
CREATE TABLE public.swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  swiped_pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  liked BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(swiper_pet_id, swiped_pet_id)
);

-- Create matches table
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet1_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  pet2_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(pet1_id, pet2_id)
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Pets policies
CREATE POLICY "Users can view active pets"
  ON public.pets FOR SELECT
  TO authenticated
  USING (is_active = true OR owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own pets"
  ON public.pets FOR INSERT
  TO authenticated
  WITH CHECK (owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own pets"
  ON public.pets FOR UPDATE
  TO authenticated
  USING (owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their own pets"
  ON public.pets FOR DELETE
  TO authenticated
  USING (owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Swipes policies
CREATE POLICY "Users can view their own swipes"
  ON public.swipes FOR SELECT
  TO authenticated
  USING (swiper_pet_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));

CREATE POLICY "Users can insert swipes for their pets"
  ON public.swipes FOR INSERT
  TO authenticated
  WITH CHECK (swiper_pet_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));

-- Matches policies
CREATE POLICY "Users can view their matches"
  ON public.matches FOR SELECT
  TO authenticated
  USING (
    pet1_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
    OR pet2_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
  );

-- Messages policies
CREATE POLICY "Users can view messages from their matches"
  ON public.messages FOR SELECT
  TO authenticated
  USING (
    match_id IN (
      SELECT id FROM public.matches 
      WHERE pet1_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
      OR pet2_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
    )
  );

CREATE POLICY "Users can send messages to their matches"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    AND match_id IN (
      SELECT id FROM public.matches 
      WHERE pet1_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
      OR pet2_id IN (SELECT id FROM public.pets WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
    )
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
  BEFORE UPDATE ON public.pets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email));
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to check and create match
CREATE OR REPLACE FUNCTION public.check_and_create_match()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only check if this is a "like" swipe
  IF NEW.liked = true THEN
    -- Check if the other pet has already liked this pet
    IF EXISTS (
      SELECT 1 FROM public.swipes 
      WHERE swiper_pet_id = NEW.swiped_pet_id 
      AND swiped_pet_id = NEW.swiper_pet_id 
      AND liked = true
    ) THEN
      -- Create a match (use smaller id first to avoid duplicates)
      INSERT INTO public.matches (pet1_id, pet2_id)
      VALUES (
        LEAST(NEW.swiper_pet_id, NEW.swiped_pet_id),
        GREATEST(NEW.swiper_pet_id, NEW.swiped_pet_id)
      )
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to automatically create match when mutual like
CREATE TRIGGER on_swipe_check_match
  AFTER INSERT ON public.swipes
  FOR EACH ROW EXECUTE FUNCTION public.check_and_create_match();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
