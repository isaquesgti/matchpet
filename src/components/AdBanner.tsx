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
  rotationInterval?: number;
}

export default function AdBanner({ slot, className, rotationInterval = 6000 }: AdBannerProps) {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

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

  const goTo = useCallback((dir: -1 | 1) => {
    setCurrentIndex(prev => (prev + dir + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    timerRef.current = setInterval(() => goTo(1), rotationInterval);
    return () => clearInterval(timerRef.current);
  }, [banners.length, rotationInterval, goTo]);

  if (banners.length === 0) return null;
  const current = banners[currentIndex];

  const handleClick = () => {
    if (current.link_url) window.open(current.link_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={cn("w-full flex justify-center my-4", className)}>
      {/* Container Principal: 
          - No PC: max-w-screen-xl (para não ficar infinitamente largo)
          - No celular: w-full
      */}
      <div className="relative w-full max-w-[1400px] overflow-hidden group">
        
        {/* Container da Imagem com proporção flexível */}
        <div
          className="w-full cursor-pointer flex items-center justify-center"
          onClick={handleClick}
        >
          <img
            key={current.id}
            src={current.image_url}
            alt={current.title || 'Publicidade'}
            /* ESTILO DO EXEMPLO:
               - w-full h-auto: faz a imagem ocupar toda a largura e a altura seguir o desenho da foto.
               - object-fill: garante que preencha o espaço (como no código que você mandou).
            */
            className="w-full h-auto object-fill block transition-opacity duration-500 rounded-lg md:rounded-xl"
          />
        </div>

        {/* Setas de Navegação (Estilo flutuante do exemplo) */}
        {banners.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); goTo(-1); }} 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); goTo(1); }} 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Dots (Indicadores) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 shadow-sm",
                    i === currentIndex 
                      ? "bg-white w-8" 
                      : "bg-white/50 w-2 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
