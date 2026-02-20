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
  rotationInterval?: number;
}

const sizeMap = {
  // Voltamos com proporções fixas para o container não ficar gigante
  leaderboard: "w-full max-w-5xl aspect-[3/1] md:aspect-[6/1]", 
  medium: "w-full max-w-2xl aspect-[16/9] md:aspect-[21/9]",
  slim: "w-full max-w-6xl aspect-[5/1] md:aspect-[12/1]",
};

export default function AdBanner({ slot, className, size = "leaderboard", rotationInterval = 6000 }: AdBannerProps) {
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
    <div className={cn("w-full flex justify-center px-4 my-4", className)}>
      <div className={cn(
        "relative rounded-xl overflow-hidden group bg-white border shadow-sm", 
        sizeMap[size]
      )}>
        {/* Container da Imagem */}
        <div
          className="w-full h-full cursor-pointer flex items-center justify-center p-0"
          onClick={handleClick}
        >
          <img
            key={current.id}
            src={current.image_url}
            alt={current.title || 'Publicidade'}
            // O segredo está aqui: h-full + object-contain
            // A imagem preenche a altura do container sem esticar a largura
            className="w-full h-full object-contain md:object-fill transition-all duration-500"
          />
        </div>

        {/* Setas e Dots (Mesma lógica anterior) */}
        {banners.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); goTo(-1); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goTo(1); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex ? "bg-primary w-6" : "bg-gray-300 w-1.5"
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
