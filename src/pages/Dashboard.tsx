import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Plus, LogOut, PawPrint, MessageCircle, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  id: string;
  full_name: string;
  city: string | null;
  avatar_url: string | null;
}

interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed: string | null;
  gender: 'male' | 'female';
  photos: string[];
}

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      if (profileData) {
        // Fetch pets
        const { data: petsData, error: petsError } = await supabase
          .from('pets')
          .select('*')
          .eq('owner_id', profileData.id);

        if (petsError) throw petsError;
        setPets(petsData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading || loadingData) {
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">PetMatchMate</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Olá, {profile?.full_name || 'Usuário'}
            </span>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-border/50 bg-card/80" onClick={() => navigate('/swipe')}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium text-foreground">Encontrar Match</span>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-border/50 bg-card/80" onClick={() => navigate('/pets/new')}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-secondary-foreground" />
              </div>
              <span className="font-medium text-foreground">Adicionar Pet</span>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-border/50 bg-card/80" onClick={() => navigate('/matches')}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <span className="font-medium text-foreground">Mensagens</span>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-border/50 bg-card/80" onClick={() => navigate('/profile')}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Settings className="w-6 h-6 text-muted-foreground" />
              </div>
              <span className="font-medium text-foreground">Configurações</span>
            </CardContent>
          </Card>
        </div>

        {/* My Pets */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <PawPrint className="w-5 h-5" />
                  Meus Pets
                </CardTitle>
                <CardDescription>Gerencie os perfis dos seus pets</CardDescription>
              </div>
              <Button onClick={() => navigate('/pets/new')} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Novo Pet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {pets.length === 0 ? (
              <div className="text-center py-12">
                <PawPrint className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nenhum pet cadastrado</h3>
                <p className="text-muted-foreground mb-4">
                  Adicione seu primeiro pet para começar a encontrar matches!
                </p>
                <Button onClick={() => navigate('/pets/new')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Pet
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets.map((pet) => (
                  <Card 
                    key={pet.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                    onClick={() => navigate(`/pets/${pet.id}`)}
                  >
                    <div className="aspect-square bg-muted relative">
                      {pet.photos && pet.photos[0] ? (
                        <img
                          src={pet.photos[0]}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PawPrint className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h4 className="font-semibold text-white">{pet.name}</h4>
                        <p className="text-sm text-white/80">
                          {pet.species === 'dog' ? '🐕' : '🐱'} {pet.breed || 'Sem raça definida'} • {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
