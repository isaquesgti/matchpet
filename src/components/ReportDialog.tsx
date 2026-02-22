import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ReportDialogProps {
  reportedUserId: string;
  matchId: string;
  reportedName: string;
}

export default function ReportDialog({ reportedUserId, matchId, reportedName }: ReportDialogProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error('Descreva o motivo da denúncia');
      return;
    }
    if (!user) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('reports')
        .insert({
          reporter_user_id: user.id,
          reported_user_id: reportedUserId,
          match_id: matchId,
          reason: reason.trim(),
        });

      if (error) throw error;
      toast.success('Denúncia enviada com sucesso. Nossa equipe irá analisar.');
      setReason('');
      setOpen(false);
    } catch (error: any) {
      console.error('Error submitting report:', error);
      toast.error('Erro ao enviar denúncia');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Denunciar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Denunciar {reportedName}
          </DialogTitle>
          <DialogDescription>
            Descreva o motivo da denúncia. Nossa equipe analisará e tomará as medidas necessárias.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Descreva o que aconteceu..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground">{reason.length}/1000 caracteres</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleSubmit} disabled={submitting || !reason.trim()}>
              {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Enviar Denúncia
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
