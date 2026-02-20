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
  rotationInterval?: number; // ms between slides, default 6000
}

const sizeMap = {
  leaderboard: "w-full max-w-4xl h-[90px] md:h-[100px]",
  medium: "w-full max-w-2xl h-[200px] md:h-[250px]",
  slim: "w-full max-w-5xl h-[60px] md:h-[70px]",
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

  // Log impression when a banner becomes visible
  const logImpression = useCallback((banner: BannerData) => {
    if (impressionLogged.current.has(banner.id)) return;
    impressionLogged.current.add(banner.id);
    supabase.from('banner_events').insert({ banner_id: banner.id, event_type: 'impression' }).then();
  }, []);

  // Log click (deduplicated per session)
  const logClick = useCallback((banner: BannerData) => {
    if (clickLogged.current.has(banner.id)) return;
    clickLogged.current.add(banner.id);
    supabase.from('banner_events').insert({ banner_id: banner.id, event_type: 'click' }).then();
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, rotationInterval);
    return () => clearInterval(timerRef.current);
  }, [banners.length, rotationInterval]);

  // Log impression when current banner changes
  useEffect(() => {
    if (banners[currentIndex]) {
      logImpression(banners[currentIndex]);
    }
  }, [currentIndex, banners, logImpression]);

  if (banners.length === 0) return null;

  const current = banners[currentIndex];

  const goTo = (dir: -1 | 1) => {
    setCurrentIndex(prev => (prev + dir + banners.length) % banners.length);
    // Reset timer on manual nav
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % banners.length);
      }, rotationInterval);
    }
  };

  const handleClick = () => {
    logClick(current);
    if (current.link_url) {
      window.open(current.link_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn("mx-auto px-4", className)}>
      <div className={cn("relative rounded-xl overflow-hidden group", sizeMap[size])}>
        {/* Banner image */}
        <div
          className="w-full h-full cursor-pointer transition-opacity duration-500"
          onClick={handleClick}
          role="link"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleClick()}
        >
          <img
            src={current.image_url}
            alt={current.title || 'Publicidade'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation arrows (only if multiple banners) */}
        {banners.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(-1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Banner anterior"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Próximo banner"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    i === currentIndex ? "bg-primary w-3" : "bg-background/60"
                  )}
                  aria-label={`Banner ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
