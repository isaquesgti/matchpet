import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
}

const sizeMap = {
  leaderboard: "w-full max-w-4xl h-[90px] md:h-[100px]",
  medium: "w-full max-w-2xl h-[200px] md:h-[250px]",
  slim: "w-full max-w-5xl h-[60px] md:h-[70px]",
};

export default function AdBanner({ slot, className, size = "leaderboard" }: AdBannerProps) {
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      const { data } = await supabase
        .from('banners')
        .select('id, image_url, link_url, title')
        .eq('slot', slot)
        .eq('is_active', true)
        .order('display_order')
        .limit(1)
        .maybeSingle();

      setBanner(data);
    };
    fetchBanner();
  }, [slot]);

  // Don't render anything if no banner for this slot
  if (!banner) return null;

  const content = (
    <img
      src={banner.image_url}
      alt={banner.title || 'Publicidade'}
      className="w-full h-full object-cover rounded-xl"
    />
  );

  return (
    <div className={cn("mx-auto px-4", className)}>
      <div className={cn("relative rounded-xl overflow-hidden", sizeMap[size])}>
        {banner.link_url ? (
          <a href={banner.link_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
