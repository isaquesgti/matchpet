import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerData {
  id: string;
  image_url: string;
  link_url: string;
  title: string;
}

interface AdBannerProps {
  slot: string;
  className?: string;
  size?: "leaderboard" | "medium" | "slim";
  rotationInterval?: number; // ms entre slides, padrão 6000
}

const sizeMap = {
  // No mobile (4/1) fica mais alto para leitura, no PC (8/1) fica horizontal padrão
  leaderboard: "w-full max-w-5xl aspect-[4/1] md:aspect-[8/1]",
  medium: "w-full max-w-2xl aspect-[16/9] md:aspect-[21/9]",
  slim: "w-full max-w-6xl aspect-[6/1] md:aspect-[12/1]",
};

export default function AdBanner({ slot, className, size = "leaderboard", rotationInterval = 6000 }: AdBannerProps) {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const impressionLogged = useRef<Set<string>>(new Set());
  const clickLogged = useRef<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Busca de banners no banco
  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await supabase
        .from('banners')
        .select('id, image_url, link_url, title')
        .eq('slot', slot)
        .eq('is_active', true)
        .order('display_order');

      setBanners(data || []);
    };
    fetchBanners();
  }, [slot]);

  // Log de visualização (Impression)
  const logImpression = useCallback((banner: BannerData) => {
    if (impressionLogged.current.has(banner.id)) return;
    impressionLogged.current.add(banner.id);
    supabase.from('banner_events').insert({ banner_id: banner.id, event_type: 'impression' }).then();
  }, []);

  // Log de clique
  const logClick = useCallback((banner: BannerData) => {
    if (clickLogged.current.has(banner.id)) return;
    clickLogged.current.add(banner.id);
    supabase.from('banner_events').insert({ banner_id: banner.id, event_type: 'click' }).then();
  }, []);

  // Função para navegar entre banners
  const goTo = useCallback((dir: -1 | 1) => {
    setCurrentIndex(prev => (prev + dir + banners.length) % banners.length);
  }, [banners.length]);

  // Rotação automática
  useEffect(() => {
    if (banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      goTo(1);
    }, rotationInterval);
    return () => clearInterval(timerRef.current);
  }, [banners.length, rotationInterval, goTo]);

  // Loga a impressão sempre que o banner mudar
  useEffect(() => {
    if (banners[currentIndex]) {
      logImpression(banners[currentIndex]);
    }
  }, [currentIndex, banners, logImpression]);

  if (banners.length === 0) return null;

  const current = banners[currentIndex];

  const handleClick = () => {
    logClick(current);
    if (current.link_url) {
      window.open(current.link_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn("w-full flex justify-center px-2 my-4", className)}>
      <div className={cn(
        "relative rounded-lg overflow-hidden group shadow-sm border bg-muted", 
        sizeMap[size]
      )}>
        {/* Imagem do Banner */}
        <div
          className="w-full h-full cursor-pointer relative"
          onClick={handleClick}
          role="link"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleClick()}
        >
          <img
            key={current.id} // Key força o navegador a tratar como nova imagem para animações
            src={current.image_url}
            alt={current.title || 'Publicidade'}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
        </div>

        {/* Setas de Navegação (Apenas se houver + de 1) */}
        {banners.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(-1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Indicadores (Dots) Clicáveis */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex 
                      ? "bg-white w-6" // Dot ativo mais longo
                      : "bg-white/40 w-2 hover:bg-white/60"
                  )}
                  aria-label={`Ir para o banner ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
