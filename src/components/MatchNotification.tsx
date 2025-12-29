import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface MatchNotificationProps {
  open: boolean;
  onClose: () => void;
  matchedPet: {
    name: string;
    photo?: string;
    species: 'dog' | 'cat';
  };
  yourPet: {
    name: string;
    photo?: string;
  };
}

export function MatchNotification({ open, onClose, matchedPet, yourPet }: MatchNotificationProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      // Trigger confetti animation
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [open]);

  const handleMessage = () => {
    onClose();
    navigate('/matches');
  };

  const handleContinue = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center border-none bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="py-6">
          {/* Hearts animation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg animate-pulse">
              {yourPet.photo ? (
                <img src={yourPet.photo} alt={yourPet.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <div className="relative">
              <Heart className="w-12 h-12 text-primary fill-primary animate-bounce" />
            </div>
            
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent shadow-lg animate-pulse">
              {matchedPet.photo ? (
                <img src={matchedPet.photo} alt={matchedPet.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  {matchedPet.species === 'dog' ? '🐕' : '🐱'}
                </div>
              )}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-2">
            É um Match! 🎉
          </h2>
          
          <p className="text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">{yourPet.name}</span> e{' '}
            <span className="font-semibold text-foreground">{matchedPet.name}</span> se curtiram!
          </p>

          <div className="flex flex-col gap-3">
            <Button onClick={handleMessage} className="w-full" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Enviar Mensagem
            </Button>
            <Button onClick={handleContinue} variant="outline" className="w-full" size="lg">
              Continuar Swipando
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
