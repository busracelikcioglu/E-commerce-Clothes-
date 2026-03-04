import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    title: "Yeni Sezon Koleksiyonu",
    subtitle: "En yeni trendlerle tarzınızı yansıtın",
    accent: "Keşfet →",
  },
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200",
    title: "%50'ye Varan İndirim",
    subtitle: "Seçili ürünlerde büyük fırsatlar sizi bekliyor",
    accent: "Fırsatları Gör →",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
    title: "Özel Tasarımlar",
    subtitle: "Benzersiz parçalarla fark yaratın",
    accent: "İncele →",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => setCurrent((p) => (p + dir + slides.length) % slides.length);

  return (
    <div className="relative h-[380px] w-full overflow-hidden sm:h-[480px]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-all duration-700",
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          )}
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-16 lg:px-24">
            <span className="mb-3 inline-block rounded-full bg-primary/90 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              {slide.accent}
            </span>
            <h2 className="max-w-lg text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              {slide.title}
            </h2>
            <p className="mt-3 max-w-md text-base text-white/80 sm:text-lg">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <Button size="icon" variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 h-10 w-10" onClick={() => go(-1)}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 h-10 w-10" onClick={() => go(1)}>
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-6 left-8 flex gap-2 sm:left-16 lg:left-24">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={cn("h-1.5 rounded-full transition-all duration-300", i === current ? "w-10 bg-primary" : "w-4 bg-white/40 hover:bg-white/60")} />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
