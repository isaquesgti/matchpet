import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, MessageCircle, PawPrint } from 'lucide-react';
import { toast } from 'sonner';

interface Match {
  id: string;
  created_at: string;
  pet: {
    id: string;
    name: string;
    species: 'dog' | 'cat';
    breed: string | null;
    photos: string[] | null;
    owner: {
      full_name: string;
      city: string | null;
      state: string | null;
    };
  };
}

export default function Matches() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  const fetchMatches = async () => {
    try {
      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) return;
      
      setProfileId(profile.id);

      // Get user's pets
      const { data: userPets, error: petsError } = await supabase
        .from('pets')
        .select('id')
        .eq('owner_id', profile.id);

      if (petsError) throw petsError;
      const petIds = userPets?.map(p => p.id) || [];

      if (petIds.length === 0) {
        setLoading(false);
        return;
      }

      // Get matches where user's pet is involved
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select('*')
        .or(`pet1_id.in.(${petIds.join(',')}),pet2_id.in.(${petIds.join(',')})`)
        .order('created_at', { ascending: false });

      if (matchesError) throw matchesError;

      // For each match, get the OTHER pet's info
      const matchesWithPets: Match[] = [];
      
      for (const match of matchesData || []) {
        const otherPetId = petIds.includes(match.pet1_id) ? match.pet2_id : match.pet1_id;
        
        const { data: petData, error: petError } = await supabase
          .from('pets')
          .select(`
            id,
            name,
            species,
            breed,
            photos,
            owner:profiles!pets_owner_id_fkey (
              full_name,
              city,
              state
            )
          `)
          .eq('id', otherPetId)
          .maybeSingle();

        if (!petError && petData) {
          matchesWithPets.push({
            id: match.id,
            created_at: match.created_at,
            pet: petData as any,
          });
        }
      }

      setMatches(matchesWithPets);
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast.error('Erro ao carregar matches');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="font-bold text-xl text-foreground">Meus Matches</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {matches.length === 0 ? (
          <Card className="border-border/50 bg-card/80">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhum match ainda
              </h3>
              <p className="text-muted-foreground mb-6">
                Continue deslizando para encontrar o match perfeito!
              </p>
              <Button onClick={() => navigate('/swipe')}>
                <PawPrint className="w-4 h-4 mr-2" />
                Encontrar Matches
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <Card 
                key={match.id} 
                className="border-border/50 bg-card/80 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/chat/${match.id}`)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 p-4">
                    {/* Pet Photo */}
                    <div 
                      className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/pets/${match.pet.id}/details`);
                      }}
                    >
                      {match.pet.photos && match.pet.photos[0] ? (
                        <img
                          src={match.pet.photos[0]}
                          alt={match.pet.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PawPrint className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    
                    {/* Pet Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                        {match.pet.species === 'dog' ? '🐕' : '🐱'} {match.pet.name}
                      </h3>
                      <p className="text-muted-foreground text-sm truncate">
                        {match.pet.breed || 'Sem raça definida'}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Dono: {match.pet.owner.full_name}
                        {match.pet.owner.city && ` • ${match.pet.owner.city}`}
                      </p>
                    </div>

                    {/* Action */}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat/${match.id}`);
                      }}
                    >
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
