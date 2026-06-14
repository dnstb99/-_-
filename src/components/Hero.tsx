import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { HeroConfig, Project } from "../types";

interface HeroProps {
  config: HeroConfig;
  projects?: Project[];
  onScrollNext: () => void;
}

export default function Hero({ config, projects = [], onScrollNext }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Wheel tick to slide down immediately
  useEffect(() => {
    let fired = false;
    const handleWheel = (e: WheelEvent) => {
      if (fired) return;
      if (e.deltaY > 15) {
        fired = true;
        e.preventDefault();
        onScrollNext();
        // Reset state after a short period to allow normal scrolling behavior afterwards
        setTimeout(() => {
          fired = false;
        }, 1200);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [onScrollNext]);

  // Handle data duplication for infinite marquee list wrap
  const list1 = [...projects, ...projects, ...projects, ...projects];
  const list2 = [...projects, ...projects, ...projects, ...projects].reverse();

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-white bg-black overflow-hidden px-6 md:px-12 py-12 select-none"
    >
      {/* Portfolio Thumbnails Background Marquee (Opacity 50%) */}
      <div className="absolute inset-y-0 right-0 w-[63%] h-full z-0 overflow-hidden opacity-50 pointer-events-none select-none flex gap-[7px] pr-[7px]">
        {/* Left-fading black edge mask: "반정도 그라데이션으로 투명도를 주어 왼쪽에 이미지가 잘린 선이 보이지 않도록 날렸으면 좋겠음" */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Column 1 (Scrolls Upwards) */}
        {projects.length > 0 && (
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <div className="flex flex-col animate-scroll-up">
              {list1.map((p, idx) => (
                <div key={`bg1-${p.id}-${idx}`} className="w-full pb-[10px]">
                  <img
                    src={p.imageUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="block w-full h-auto object-cover border border-white/5"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Column 2 (Scrolls Downwards) */}
        {projects.length > 1 && (
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <div className="flex flex-col animate-scroll-down">
              {list2.map((p, idx) => (
                <div key={`bg2-${p.id}-${idx}`} className="w-full pb-[10px]">
                  <img
                    src={p.imageUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="block w-full h-auto object-cover border border-white/5"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Background Glow Elements (behind marquee text) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full filter blur-[150px] bg-gradient-to-br from-[#1E4FFF] to-[#7A5CFF] opacity-30" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full filter blur-[150px] bg-[#4D63FF]/20" />
      </div>

      {/* Hero Body Content */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center z-10 my-auto py-10">
        {/* Texts container - aligned left beautifully inside the 12-column system */}
        <div className="lg:col-span-8 flex flex-col justify-center text-left space-y-8">
          <div className="space-y-4">
            <span className="inline-block py-1 px-3 bg-white/5 border border-white/10 rounded-full text-[#4D63FF] en-subtitle text-xs uppercase tracking-widest">
              Visual Space Architect
            </span>
            {/* Main title: ExtraBold 40pt (approx 40px - 52px) */}
            <h1 className="hero-main-title leading-[1.25] text-white tracking-tight sm:text-5xl md:text-[40px]">
              {config.mainTitle}
            </h1>
          </div>
          
          {/* Subtitle: Medium 14pt (approx 14px - 18px) */}
          <p className="hero-sub-title text-[#FFFFFF] max-w-xl leading-relaxed">
            {config.subTitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onScrollNext}
              className="px-8 py-4 bg-gradient-to-r from-[#1E4FFF] via-[#4D63FF] to-[#7A5CFF] text-white font-medium text-sm rounded-none transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer hover:shadow-lg hover:shadow-[#1E4FFF]/25 tracking-wider font-sans border-0 flex items-center gap-3"
            >
              PROJECTS VIEW
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-transparent text-white font-medium text-sm rounded-none border border-white/20 hover:border-white/80 transition-all duration-300 hover:bg-white/5 cursor-pointer flex items-center gap-2"
            >
              CONTACT ME
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom - Scroll Indicator */}
      <div className="flex flex-col items-center gap-2 z-10 animate-pulse cursor-pointer mt-4" onClick={onScrollNext}>
        <span className="en-subtitle text-[11px] tracking-[0.3em] text-[#FFFFFF]">
          SCROLL TO EXPLORE
        </span>
        <ArrowDown className="w-4 h-4 text-[#FFFFFF]" />
      </div>
    </section>
  );
}
