import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Heart, PawPrint, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const petSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Nome muito longo'),
  species: z.enum(['dog', 'cat'], { required_error: 'Espécie é obrigatória' }),
  gender: z.enum(['male', 'female'], { required_error: 'Gênero é obrigatório' }),
  breed: z.string().max(100, 'Raça muito longa').optional(),
  birth_date: z.string().optional(),
  weight_kg: z.coerce.number().min(0.1).max(200).optional().or(z.literal('')),
  is_neutered: z.boolean().default(false),
  breeding_interest: z.enum(['looking_for_mate', 'available_for_breeding', 'not_interested']).default('not_interested'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
});

type PetFormData = z.infer<typeof petSchema>;

export default function PetForm() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  const form = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: '',
      species: undefined,
      gender: undefined,
      breed: '',
      birth_date: '',
      weight_kg: '',
      is_neutered: false,
      breeding_interest: 'not_interested',
      description: '',
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (isEditing && profileId) {
      fetchPet();
    }
  }, [isEditing, profileId]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user!.id)
      .maybeSingle();

    if (error) {
      toast.error('Erro ao carregar perfil');
      return;
    }
    setProfileId(data?.id || null);
  };

  const fetchPet = async () => {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', id)
      .eq('owner_id', profileId!)
      .maybeSingle();

    if (error || !data) {
      toast.error('Pet não encontrado');
      navigate('/dashboard');
      return;
    }

    form.reset({
      name: data.name,
      species: data.species,
      gender: data.gender,
      breed: data.breed || '',
      birth_date: data.birth_date || '',
      weight_kg: data.weight_kg || '',
      is_neutered: data.is_neutered || false,
      breeding_interest: data.breeding_interest || 'not_interested',
      description: data.description || '',
    });
  };

  const onSubmit = async (data: PetFormData) => {
    if (!profileId) {
      toast.error('Perfil não encontrado');
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('pets')
          .update({
            name: data.name,
            species: data.species,
            gender: data.gender,
            breed: data.breed || null,
            birth_date: data.birth_date || null,
            weight_kg: data.weight_kg ? Number(data.weight_kg) : null,
            is_neutered: data.is_neutered,
            breeding_interest: data.breeding_interest,
            description: data.description || null,
          })
          .eq('id', id!)
          .eq('owner_id', profileId);

        if (error) throw error;
        toast.success('Pet atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('pets')
          .insert({
            name: data.name,
            species: data.species,
            gender: data.gender,
            owner_id: profileId,
            breed: data.breed || null,
            birth_date: data.birth_date || null,
            weight_kg: data.weight_kg ? Number(data.weight_kg) : null,
            is_neutered: data.is_neutered,
            breeding_interest: data.breeding_interest,
            description: data.description || null,
          });

        if (error) throw error;
        toast.success('Pet cadastrado com sucesso!');
      }

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error saving pet:', error);
      toast.error(error.message || 'Erro ao salvar pet');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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
          <div className="flex items-center gap-2">
            <PawPrint className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-foreground">
              {isEditing ? 'Editar Pet' : 'Novo Pet'}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-foreground">Informações do Pet</CardTitle>
            <CardDescription>
              Preencha os dados do seu pet para encontrar o match perfeito
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Nome */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do pet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Espécie e Gênero */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Espécie *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dog">🐕 Cachorro</SelectItem>
                            <SelectItem value="cat">🐱 Gato</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gênero *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">♂️ Macho</SelectItem>
                            <SelectItem value="female">♀️ Fêmea</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Raça */}
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raça</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Labrador, Siamês..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data de Nascimento e Peso */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="birth_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight_kg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peso (kg)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1" 
                            placeholder="Ex: 12.5" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Castrado */}
                <FormField
                  control={form.control}
                  name="is_neutered"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Castrado(a)?</FormLabel>
                        <FormDescription>
                          Marque se o pet for castrado
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Interesse em Cruzamento */}
                <FormField
                  control={form.control}
                  name="breeding_interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interesse em Cruzamento</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="not_interested">Não interessado</SelectItem>
                          <SelectItem value="looking_for_mate">Procurando parceiro(a)</SelectItem>
                          <SelectItem value="available_for_breeding">Disponível para cruzamento</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Descrição */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Conte um pouco sobre a personalidade do seu pet..."
                          className="resize-none"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Máximo de 500 caracteres
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      isEditing ? 'Atualizar Pet' : 'Cadastrar Pet'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
