import { useState, useEffect, useCallback } from 'react';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Heart, X, MapPin, Info, PawPrint, 
  Filter, Loader2, RefreshCw, AlertCircle, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MatchNotification } from '@/components/MatchNotification';

interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed: string | null;
  gender: 'male' | 'female';
  birth_date: string | null;
  description: string | null;
  photos: string[] | null;
  owner_id: string;
  breeding_interest: string | null;
  weight_kg: number | null;
  owner?: {
    city: string | null;
    state: string | null;
    latitude: number | null;
    longitude: number | null;
  };
}

interface Profile {
  id: string;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  state: string | null;
}

interface UserPet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  gender: 'male' | 'female';
  photos: string[] | null;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculateAge(birthDate: string | null): string {
  if (!birthDate) return 'Idade desconhecida';
  const birth = new Date(birthDate);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  
  if (years > 0) {
    return years === 1 ? '1 ano' : `${years} anos`;
  } else if (months > 0) {
    return months === 1 ? '1 mês' : `${months} meses`;
  }
  return 'Filhote';
}

function SwipeableCard({ 
  currentPet, currentPhotoIndex, setCurrentPhotoIndex, 
  onSwipeLeft, onSwipeRight, onShowDetails, swiping 
}: { 
  currentPet: Pet; currentPhotoIndex: number; 
  setCurrentPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
  onSwipeLeft: () => void; onSwipeRight: () => void; 
  onShowDetails: () => void; swiping: boolean;
}) {
  const { handlers, style, offsetX } = useSwipeGesture({
    onSwipeLeft,
    onSwipeRight,
    threshold: 80,
  });

  return (
    <Card className="overflow-hidden border-border/50 bg-card/80 shadow-lg" style={style} {...handlers}>
      {/* Swipe indicators */}
      {offsetX > 40 && (
        <div className="absolute top-8 left-8 z-20 border-4 border-primary text-primary font-bold text-2xl px-4 py-1 rounded-lg rotate-[-15deg]">
          LIKE ❤️
        </div>
      )}
      {offsetX < -40 && (
        <div className="absolute top-8 right-8 z-20 border-4 border-destructive text-destructive font-bold text-2xl px-4 py-1 rounded-lg rotate-[15deg]">
          NOPE ✕
        </div>
      )}

      <div className="aspect-[3/4] relative">
        {currentPet.photos && currentPet.photos.length > 0 ? (
          <>
            <img
              src={currentPet.photos[currentPhotoIndex] || currentPet.photos[0]}
              alt={currentPet.name}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
            {currentPet.photos.length > 1 && (
              <>
                <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 px-4">
                  {currentPet.photos.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        idx === currentPhotoIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                  onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(prev => Math.max(0, prev - 1)); }}
                  disabled={currentPhotoIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                  onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(prev => Math.min(currentPet.photos!.length - 1, prev + 1)); }}
                  disabled={currentPhotoIndex === currentPet.photos.length - 1}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <PawPrint className="w-24 h-24 text-muted-foreground/30" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {currentPet.name}
                <span className="text-lg font-normal text-white/80">
                  {calculateAge(currentPet.birth_date)}
                </span>
              </h2>
              <p className="text-white/80 flex items-center gap-1">
                {currentPet.species === 'dog' ? '🐕' : '🐱'} 
                {currentPet.breed || 'Sem raça definida'}
                <span className="mx-1">•</span>
                {currentPet.gender === 'male' ? '♂️' : '♀️'}
              </p>
              {currentPet.owner?.city && (
                <p className="text-white/60 text-sm flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {currentPet.owner.city}, {currentPet.owner.state}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); onShowDetails(); }}
            >
              <Info className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="absolute top-4 left-4 flex gap-2">
          {currentPet.breeding_interest === 'looking_for_mate' && (
            <Badge className="bg-primary/90">Procurando parceiro</Badge>
          )}
          {currentPet.breeding_interest === 'available_for_breeding' && (
            <Badge className="bg-secondary/90">Disponível</Badge>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function Swipe() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userPets, setUserPets] = useState<UserPet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(() => {
    // Recuperar último pet selecionado do localStorage
    const saved = localStorage.getItem('lastSelectedPetId');
    return saved || null;
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // Match notification state
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedPetData, setMatchedPetData] = useState<{
    matchId: string;
    name: string;
    photo?: string;
    species: 'dog' | 'cat';
  } | null>(null);
  
  // Filters
  const [maxDistance, setMaxDistance] = useState(100);
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'dog' | 'cat'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchInitialData();
    }
  }, [user]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, latitude, longitude, city, state')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      if (profileData) {
        // Fetch user's pets
        const { data: petsData, error: petsError } = await supabase
          .from('pets')
          .select('id, name, species, gender, photos')
          .eq('owner_id', profileData.id)
          .eq('is_active', true);

        if (petsError) throw petsError;
        setUserPets(petsData || []);
        
        if (petsData && petsData.length > 0) {
          // Verificar se o pet salvo ainda existe na lista
          const savedPetId = localStorage.getItem('lastSelectedPetId');
          const savedPetExists = savedPetId && petsData.some(p => p.id === savedPetId);
          
          if (savedPetExists) {
            setSelectedPetId(savedPetId);
          } else {
            setSelectedPetId(petsData[0].id);
            localStorage.setItem('lastSelectedPetId', petsData[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const fetchPetsToSwipe = useCallback(async () => {
    if (!profile || !selectedPetId) return;
    
    setLoading(true);
    try {
      const selectedPet = userPets.find(p => p.id === selectedPetId);
      if (!selectedPet) return;

      // Get already swiped pets
      const { data: swipedData } = await supabase
        .from('swipes')
        .select('swiped_pet_id')
        .eq('swiper_pet_id', selectedPetId);

      const swipedIds = swipedData?.map(s => s.swiped_pet_id) || [];

      // Fetch pets with owner info
      let query = supabase
        .from('pets')
        .select(`
          *,
          owner:profiles!pets_owner_id_fkey (
            city,
            state,
            latitude,
            longitude
          )
        `)
        .eq('is_active', true)
        .neq('owner_id', profile.id);
      
      // Filter by species if not "all"
      if (speciesFilter !== 'all') {
        query = query.eq('species', speciesFilter);
      } else {
        // Match same species
        query = query.eq('species', selectedPet.species);
      }

      // Filter opposite gender
      query = query.neq('gender', selectedPet.gender);

      const { data: petsData, error: petsError } = await query;

      if (petsError) throw petsError;

      // Filter out already swiped and apply distance filter
      let filteredPets = (petsData || []).filter(pet => {
        if (swipedIds.includes(pet.id)) return false;
        
        // Distance filter
        if (profile.latitude && profile.longitude && pet.owner?.latitude && pet.owner?.longitude) {
          const distance = calculateDistance(
            profile.latitude,
            profile.longitude,
            pet.owner.latitude,
            pet.owner.longitude
          );
          if (distance > maxDistance) return false;
        }
        
        return true;
      });

      setPets(filteredPets);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching pets:', error);
      toast.error('Erro ao carregar pets');
    } finally {
      setLoading(false);
    }
  }, [profile, selectedPetId, userPets, speciesFilter, maxDistance]);

  useEffect(() => {
    if (selectedPetId) {
      fetchPetsToSwipe();
    }
  }, [selectedPetId, fetchPetsToSwipe]);

  const handleSwipe = async (liked: boolean) => {
    if (!selectedPetId || currentIndex >= pets.length) return;
    
    setSwiping(true);
    const currentPet = pets[currentIndex];
    
    try {
      const { error } = await supabase
        .from('swipes')
        .insert({
          swiper_pet_id: selectedPetId,
          swiped_pet_id: currentPet.id,
          liked,
        });

      if (error) throw error;

      if (liked) {
        // Wait a moment for the database trigger to create the match
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if it's a match
        const { data: matchCheck } = await supabase
          .from('matches')
          .select('id')
          .or(`and(pet1_id.eq.${selectedPetId},pet2_id.eq.${currentPet.id}),and(pet1_id.eq.${currentPet.id},pet2_id.eq.${selectedPetId})`)
          .maybeSingle();

        if (matchCheck) {
          // Play a sound notification (optional visual feedback)
          toast.success('🎉 Você deu Match!', {
            description: `${currentPet.name} também curtiu você!`,
            duration: 5000,
          });
          
          // Show match notification modal
          setMatchedPetData({
            matchId: matchCheck.id,
            name: currentPet.name,
            photo: currentPet.photos?.[0],
            species: currentPet.species,
          });
          setShowMatchNotification(true);
        }
      }

      setCurrentIndex(prev => prev + 1);
      setCurrentPhotoIndex(0); // Reset photo index for next pet
    } catch (error: any) {
      console.error('Error swiping:', error);
      toast.error('Erro ao registrar swipe');
    } finally {
      setSwiping(false);
    }
  };

  const currentPet = pets[currentIndex];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Heart className="w-12 h-12 text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (userPets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-bold text-xl text-foreground">Encontrar Match</span>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 max-w-md">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhum pet cadastrado
              </h3>
              <p className="text-muted-foreground mb-6">
                Cadastre pelo menos um pet para começar a encontrar matches!
              </p>
              <Button onClick={() => navigate('/pets/new')}>
                <PawPrint className="w-4 h-4 mr-2" />
                Cadastrar Pet
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-bold text-xl text-foreground">Encontrar Match</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Pet Selector */}
            <Select 
              value={selectedPetId || ''} 
              onValueChange={(id) => {
                setSelectedPetId(id);
                localStorage.setItem('lastSelectedPetId', id);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar pet" />
              </SelectTrigger>
              <SelectContent>
                {userPets.map(pet => (
                  <SelectItem key={pet.id} value={pet.id}>
                    <div className="flex items-center gap-2">
                      <span>{pet.species === 'dog' ? '🐕' : '🐱'}</span>
                      <span>{pet.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {pet.gender === 'male' ? '♂️' : '♀️'}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>
                    Ajuste os filtros para encontrar o match perfeito
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  {/* Distance Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Distância máxima: {maxDistance} km
                    </label>
                    <Slider
                      value={[maxDistance]}
                      onValueChange={([value]) => setMaxDistance(value)}
                      max={200}
                      min={10}
                      step={10}
                    />
                    <p className="text-xs text-muted-foreground">
                      Mostrando pets em um raio de até {maxDistance} km
                    </p>
                  </div>

                  {/* Species Filter */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Espécie
                    </label>
                    <Select 
                      value={speciesFilter} 
                      onValueChange={(v) => setSpeciesFilter(v as 'all' | 'dog' | 'cat')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Mesma espécie do meu pet</SelectItem>
                        <SelectItem value="dog">🐕 Apenas cachorros</SelectItem>
                        <SelectItem value="cat">🐱 Apenas gatos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={fetchPetsToSwipe} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Aplicar Filtros
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-md">
        {!currentPet ? (
          <Card className="border-border/50 bg-card/80">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              {(() => {
                const selectedPet = userPets.find(p => p.id === selectedPetId);
                const searchingSpecies = selectedPet?.species === 'dog' ? 'cadelas' : 'gatas';
                const searchingGender = selectedPet?.gender === 'male' ? 'fêmeas' : 'machos';
                
                return (
                  <>
                    <div className="text-6xl mb-4">
                      {selectedPet?.species === 'dog' ? '🐕' : '🐱'}
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Sem {searchingSpecies} disponíveis
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Procurando {searchingGender} para <strong>{selectedPet?.name}</strong>
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        Dicas:
                      </p>
                      <ul className="text-left list-disc list-inside space-y-1">
                        <li>Troque o pet selecionado acima</li>
                        <li>Aumente a distância máxima nos filtros</li>
                        <li>Volte mais tarde para novos pets</li>
                      </ul>
                    </div>
                    <Button variant="outline" onClick={fetchPetsToSwipe}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Atualizar
                    </Button>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Pet Card */}
            <SwipeableCard
              currentPet={currentPet}
              currentPhotoIndex={currentPhotoIndex}
              setCurrentPhotoIndex={setCurrentPhotoIndex}
              onSwipeLeft={() => handleSwipe(false)}
              onSwipeRight={() => handleSwipe(true)}
              onShowDetails={() => setShowDetails(true)}
              swiping={swiping}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleSwipe(false)}
                disabled={swiping}
              >
                <X className="w-8 h-8" />
              </Button>
              <Button
                size="lg"
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent hover:opacity-90"
                onClick={() => handleSwipe(true)}
                disabled={swiping}
              >
                {swiping ? (
                  <Loader2 className="w-10 h-10 animate-spin" />
                ) : (
                  <Heart className="w-10 h-10" />
                )}
              </Button>
            </div>

            <p className="text-center text-muted-foreground text-sm mt-4">
              {pets.length - currentIndex - 1} pets restantes
            </p>

            {/* Pet Details Dialog */}
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {currentPet.species === 'dog' ? '🐕' : '🐱'} {currentPet.name}
                  </DialogTitle>
                  <DialogDescription>
                    {currentPet.breed || 'Sem raça definida'} • {calculateAge(currentPet.birth_date)}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Gênero:</span>
                      <p className="font-medium">{currentPet.gender === 'male' ? 'Macho' : 'Fêmea'}</p>
                    </div>
                    {currentPet.weight_kg && (
                      <div>
                        <span className="text-muted-foreground">Peso:</span>
                        <p className="font-medium">{currentPet.weight_kg} kg</p>
                      </div>
                    )}
                    {currentPet.owner?.city && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Localização:</span>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {currentPet.owner.city}, {currentPet.owner.state}
                        </p>
                      </div>
                    )}
                  </div>
                  {currentPet.description && (
                    <div>
                      <span className="text-muted-foreground text-sm">Sobre:</span>
                      <p className="mt-1">{currentPet.description}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Match Notification */}
            {matchedPetData && (
              <MatchNotification
                open={showMatchNotification}
                onClose={() => setShowMatchNotification(false)}
                matchId={matchedPetData.matchId}
                matchedPet={matchedPetData}
                yourPet={{
                  name: userPets.find(p => p.id === selectedPetId)?.name || '',
                  photo: userPets.find(p => p.id === selectedPetId)?.photos?.[0],
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
