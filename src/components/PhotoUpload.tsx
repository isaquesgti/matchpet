import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, X, Loader2, Plus, Image } from 'lucide-react';
import { toast } from 'sonner';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  userId: string;
  maxPhotos?: number;
}

export function PhotoUpload({ photos, onPhotosChange, userId, maxPhotos = 6 }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxPhotos - photos.length;
    if (remainingSlots <= 0) {
      toast.error(`Máximo de ${maxPhotos} fotos permitidas`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    setUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        // Validate file
        if (!file.type.startsWith('image/')) {
          throw new Error('Apenas imagens são permitidas');
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Arquivo muito grande (máx 5MB)');
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('pet-photos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('pet-photos')
          .getPublicUrl(filePath);

        return urlData.publicUrl;
      });

      const newPhotos = await Promise.all(uploadPromises);
      onPhotosChange([...photos, ...newPhotos]);
      toast.success(`${newPhotos.length} foto(s) adicionada(s)`);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Erro ao fazer upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePhoto = async (photoUrl: string, index: number) => {
    try {
      // Extract path from URL
      const url = new URL(photoUrl);
      const pathMatch = url.pathname.match(/\/pet-photos\/(.+)$/);
      if (pathMatch) {
        const filePath = decodeURIComponent(pathMatch[1]);
        
        // Validate that the path belongs to this user before attempting deletion
        if (!filePath.startsWith(`${userId}/`)) {
          toast.error('Não é possível remover fotos de outro usuário');
          // Still remove from local state as it shouldn't be there
          const newPhotos = photos.filter((_, i) => i !== index);
          onPhotosChange(newPhotos);
          return;
        }
        
        await supabase.storage.from('pet-photos').remove([filePath]);
      }

      const newPhotos = photos.filter((_, i) => i !== index);
      onPhotosChange(newPhotos);
      toast.success('Foto removida');
    } catch (error) {
      console.error('Error removing photo:', error);
      // Still remove from UI even if storage delete fails
      const newPhotos = photos.filter((_, i) => i !== index);
      onPhotosChange(newPhotos);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Fotos ({photos.length}/{maxPhotos})
        </label>
        {photos.length < 3 && (
          <span className="text-xs text-amber-500">
            Mínimo de 3 fotos recomendado
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <Card key={index} className="relative aspect-square overflow-hidden group">
            <img
              src={photo}
              alt={`Foto ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removePhoto(photo, index)}
            >
              <X className="w-4 h-4" />
            </Button>
            {index === 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-xs py-1 text-center">
                Principal
              </div>
            )}
          </Card>
        ))}

        {photos.length < maxPhotos && (
          <Card 
            className="aspect-square flex flex-col items-center justify-center border-dashed border-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
            ) : (
              <>
                <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground text-center px-2">
                  Adicionar foto
                </span>
              </>
            )}
          </Card>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        disabled={uploading}
      />

      {photos.length === 0 && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Selecionar Fotos
            </>
          )}
        </Button>
      )}

      <p className="text-xs text-muted-foreground">
        Formatos aceitos: JPG, PNG, WebP, GIF. Máximo 5MB por foto.
      </p>
    </div>
  );
}
