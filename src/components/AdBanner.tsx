import { cn } from "@/lib/utils";

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
  return (
    <div className={cn("mx-auto px-4", className)}>
      <div
        className={cn(
          "relative rounded-xl border border-border/50 bg-muted/30 backdrop-blur-sm overflow-hidden flex items-center justify-center",
          sizeMap[size]
        )}
        data-ad-slot={slot}
      >
        {/* Replace this placeholder with actual ad content or an <img> tag */}
        <div className="flex flex-col items-center gap-1 text-muted-foreground/40 select-none">
          <span className="text-xs font-medium uppercase tracking-widest">Publicidade</span>
        </div>
      </div>
    </div>
  );
}
