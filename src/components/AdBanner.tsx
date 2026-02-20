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
  // Ajustamos as proporções para serem mais flexíveis
  leaderboard: "w-full max-w-5xl aspect-[3/1] md:aspect-[8/1]",
  medium: "w-full max-w-2xl aspect-[16/9] md:aspect-[21/9]",
  slim: "w-full max-w-6xl aspect-[5/1] md:aspect-[12/1]",
};

export default function AdBanner({ slot, className, size = "leaderboard", rotationInterval = 6000 }: AdBannerProps) {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const impressionLogged = useRef<Set<string>>(new Set());
  const clickLogged = useRef<Set<string>>(new Set());
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
    <div className={cn("w-full flex justify-center px-2 my-4", className)}>
      <div className={cn(
        "relative rounded-lg overflow-hidden group border bg-white", 
        sizeMap[size]
      )}>
        <div
          className="w-full h-full cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={current.image_url}
            alt={current.title || 'Publicidade'}
            // MUDANÇA CHAVE AQUI:
            // Usamos 'object-contain' para garantir que a imagem inteira apareça.
            // 'bg-white' ou 'bg-transparent' evita faixas pretas se a imagem for menor.
            className="w-full h-full object-contain md:object-fill transition-all duration-500"
          />
        </div>

        {banners.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); goTo(-1); }} className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goTo(1); }} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
