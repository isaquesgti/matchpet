import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Heart, Plus, Trash2, Upload, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Banner {
  id: string;
  slot: string;
  title: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
  display_order: number;
}

const SLOT_OPTIONS = [
  { value: 'home-top', label: 'Home - Topo' },
  { value: 'home-mid', label: 'Home - Meio' },
  { value: 'home-bottom', label: 'Home - Rodapé' },
  { value: 'dashboard-top', label: 'Dashboard' },
  { value: 'matches-bottom', label: 'Matches' },
];

export default function Admin() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // New banner form
  const [newSlot, setNewSlot] = useState('home-top');
  const [newTitle, setNewTitle] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/');
      toast.error('Acesso negado');
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchBanners();
  }, [isAdmin]);

  const fetchBanners = async () => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('slot')
      .order('display_order');

    if (error) {
      toast.error('Erro ao carregar banners');
    } else {
      setBanners(data || []);
    }
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!newFile) {
      toast.error('Selecione uma imagem');
      return;
    }

    setUploading(true);
    try {
      const ext = newFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('banner-images')
        .upload(fileName, newFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('banner-images')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('banners')
        .insert({
          slot: newSlot,
          title: newTitle,
          image_url: urlData.publicUrl,
          link_url: newLink,
          is_active: true,
          display_order: banners.filter(b => b.slot === newSlot).length,
        });

      if (insertError) throw insertError;

      toast.success('Banner adicionado!');
      setNewTitle('');
      setNewLink('');
      setNewFile(null);
      // Reset file input
      const fileInput = document.getElementById('banner-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      fetchBanners();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar banner');
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (banner: Banner) => {
    const { error } = await supabase
      .from('banners')
      .update({ is_active: !banner.is_active })
      .eq('id', banner.id);

    if (error) {
      toast.error('Erro ao atualizar');
    } else {
      fetchBanners();
    }
  };

  const deleteBanner = async (banner: Banner) => {
    // Extract file name from URL to delete from storage
    try {
      const url = new URL(banner.image_url);
      const parts = url.pathname.split('/');
      const fileName = parts[parts.length - 1];
      await supabase.storage.from('banner-images').remove([fileName]);
    } catch { }

    const { error } = await supabase
      .from('banners')
      .delete()
      .eq('id', banner.id);

    if (error) {
      toast.error('Erro ao excluir');
    } else {
      toast.success('Banner excluído');
      fetchBanners();
    }
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-primary" />
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="font-bold text-xl text-foreground">Painel Admin — Banners</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Add New Banner */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Plus className="w-5 h-5" /> Novo Banner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Posição (slot)</Label>
                <Select value={newSlot} onValueChange={setNewSlot}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOT_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Título (opcional)</Label>
                <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ex: Promoção Pet Shop" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Link de destino (opcional)</Label>
              <Input value={newLink} onChange={e => setNewLink(e.target.value)} placeholder="https://exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label>Imagem do Banner</Label>
              <Input
                id="banner-file"
                type="file"
                accept="image/*"
                onChange={e => setNewFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button onClick={handleUpload} disabled={uploading || !newFile}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Enviando...' : 'Adicionar Banner'}
            </Button>
          </CardContent>
        </Card>

        {/* Existing Banners */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-foreground">Banners Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            {banners.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhum banner cadastrado ainda.</p>
            ) : (
              <div className="space-y-4">
                {banners.map(banner => (
                  <div
                    key={banner.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border/50 bg-background/50"
                  >
                    <img
                      src={banner.image_url}
                      alt={banner.title || 'Banner'}
                      className="w-24 h-14 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {banner.title || '(sem título)'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {SLOT_OPTIONS.find(s => s.value === banner.slot)?.label || banner.slot}
                      </p>
                      {banner.link_url && (
                        <a href={banner.link_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 mt-0.5">
                          <ExternalLink className="w-3 h-3" /> Link
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{banner.is_active ? 'Ativo' : 'Inativo'}</span>
                        <Switch checked={banner.is_active} onCheckedChange={() => toggleActive(banner)} />
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteBanner(banner)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
