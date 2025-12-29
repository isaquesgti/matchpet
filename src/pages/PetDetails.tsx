import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Calendar, Weight, Heart, PawPrint } from 'lucide-react';
import { toast } from 'sonner';
import PhotoGallery from '@/components/PhotoGallery';

interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  gender: 'male' | 'female';
  breed: string | null;
  birth_date: string | null;
  weight_kg: number | null;
  is_neutered: boolean | null;
  breeding_interest: 'interested' | 'not_interested' | 'open_to_discuss' | null;
  description: string | null;
  photos: string[] | null;
  owner_id: string;
  owner: {
    id: string;
    full_name: string;
    city: string | null;
    state: string | null;
  };
}

export default function PetDetails() {
  const { petId } = useParams<{ petId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (petId) {
      fetchPet();
    }
  }, [petId, user]);

  const fetchPet = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select(`
          *,
          owner:profiles!pets_owner_id_fkey (
            id,
            full_name,
            city,
            state
          )
        `)
        .eq('id', petId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Pet não encontrado');
        navigate('/dashboard');
        return;
      }

      setPet(data as Pet);

      // Check if current user is the owner
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        setIsOwner(profile?.id === data.owner_id);
      }
    } catch (error) {
      console.error('Error fetching pet:', error);
      toast.error('Erro ao carregar pet');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    if (years > 0) {
      return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
    return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  };

  const getBreedingInterestLabel = (interest: string) => {
    switch (interest) {
      case 'interested': return 'Interessado em cruzar';
      case 'open_to_discuss': return 'Aberto a conversar';
      default: return 'Não interessado';
    }
  };

  const getBreedingInterestVariant = (interest: string) => {
    switch (interest) {
      case 'interested': return 'default';
      case 'open_to_discuss': return 'secondary';
      default: return 'outline';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <PawPrint className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-bold text-xl text-foreground">{pet.name}</span>
          </div>
          {isOwner && (
            <Button variant="outline" onClick={() => navigate(`/pets/${pet.id}`)}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Photo Gallery */}
        <Card className="border-border/50 bg-card/80 mb-6">
          <CardContent className="p-4">
            <PhotoGallery photos={pet.photos || []} petName={pet.name} />
          </CardContent>
        </Card>

        {/* Pet Info */}
        <Card className="border-border/50 bg-card/80 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {pet.species === 'dog' ? '🐕' : '🐱'} {pet.name}
              <Badge variant="outline" className="ml-2">
                {pet.gender === 'male' ? '♂️ Macho' : '♀️ Fêmea'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Breed */}
            {pet.breed && (
              <div>
                <p className="text-sm text-muted-foreground">Raça</p>
                <p className="font-medium">{pet.breed}</p>
              </div>
            )}

            {/* Age */}
            {pet.birth_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Idade</p>
                  <p className="font-medium">{calculateAge(pet.birth_date)}</p>
                </div>
              </div>
            )}

            {/* Weight */}
            {pet.weight_kg && (
              <div className="flex items-center gap-2">
                <Weight className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Peso</p>
                  <p className="font-medium">{pet.weight_kg} kg</p>
                </div>
              </div>
            )}

            {/* Neutered Status */}
            <div>
              <p className="text-sm text-muted-foreground">Castrado(a)</p>
              <p className="font-medium">{pet.is_neutered ? 'Sim' : 'Não'}</p>
            </div>

            {/* Breeding Interest */}
            {pet.breeding_interest && (
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <Badge variant={getBreedingInterestVariant(pet.breeding_interest) as any}>
                  {getBreedingInterestLabel(pet.breeding_interest)}
                </Badge>
              </div>
            )}

            {/* Description */}
            {pet.description && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Sobre</p>
                <p className="text-foreground whitespace-pre-wrap">{pet.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Owner Info */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Dono(a)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{pet.owner.full_name}</p>
            {(pet.owner.city || pet.owner.state) && (
              <p className="text-sm text-muted-foreground">
                {[pet.owner.city, pet.owner.state].filter(Boolean).join(', ')}
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
