import { useEffect, useRef } from "react";
import { Trophy, Briefcase, Sparkles } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const sellingPoints = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#1E4FFF]" />,
      title: "실무 중심의 디자인 프로세스",
      desc: "브랜드와 제품의 목적을 이해하고, 기획부터 디자인까지 명확한 흐름으로 작업합니다. 일정과 커뮤니케이션 또한 체계적으로 관리합니다."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#7A5CFF]" />,
      title: "전환을 고려한 비주얼 설계",
      desc: "단순히 보기 좋은 작업물이 아닌 사용자의 시선 흐름과 정보 전달 구조를 고려해 브랜드의 핵심 가치가 효과적으로 전달되도록 설계합니다."
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#4D63FF]" />,
      title: "협업에 최적화된 작업 방식",
      desc: "수정과 운영까지 고려한 구조로 작업하며, 실무 환경에 맞는 정리된 소스와 효율적인 협업 프로세스를 제공합니다."
    }
  ];

  const experienceStats = [
    { count: "120+", label: "실무 프로젝트", labelEn: "Projects Completed" },
    { count: "7년+", label: "디자인 실무 경력", labelEn: "Years of Experience" },
    { count: "1:1", label: "빠른 커뮤니케이션", labelEn: "Fast Communication" },
  ];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    let isTransitioning = false;

    const handleWheel = (e: WheelEvent) => {
      // Only hijack scroll on desktop screens where columns fit side-by-side without overflowing
      if (window.innerWidth < 1024) return;

      // Ignore trivial scrolls to prevent hyper-sensitivity
      if (Math.abs(e.deltaY) < 10) return;

      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        // Scroll down -> custom transition to works section
        const nextElem = document.getElementById("works");
        if (nextElem) {
          e.preventDefault();
          isTransitioning = true;
          nextElem.scrollIntoView({ behavior: "smooth" });
          
          setTimeout(() => {
            isTransitioning = false;
          }, 1200); // 1.2s cooldown to prevent double triggering
        }
      } else if (e.deltaY < 0) {
        // Scroll up -> custom transition to hero section
        const prevElem = document.getElementById("hero");
        if (prevElem) {
          e.preventDefault();
          isTransitioning = true;
          prevElem.scrollIntoView({ behavior: "smooth" });

          setTimeout(() => {
            isTransitioning = false;
          }, 1200);
        }
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen w-full bg-[#FFFFFF] py-24 md:py-32 px-6 md:px-12 flex items-center border-t border-black/5 overflow-hidden">
      {/* Visual Ambient line background decoration */}
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-black/5 to-transparent z-0" />
      <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent z-0" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* Left Column: Bold Selling Statement & Slogan */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div className="space-y-4">
            <span className="en-subtitle text-[#4D63FF] uppercase tracking-[0.2em] font-bold block text-[14px]">
              ABOUT THE DESIGN
            </span>
            <h2 className="ko-title about-title-custom text-3xl sm:text-4xl text-[#000000] font-bold" style={{ fontSize: "28px" }}>
              실무 경험을 기반으로<br />
              <span className="bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] bg-clip-text text-transparent font-extrabold inline-block">브랜드의 가치를 설계하는</span><br />
              컨텐츠 디자이너 성은수
            </h2>
          </div>
          
          <p className="about-desc-custom text-[#000000] max-w-md leading-relaxed">
            실무 경험을 바탕으로<br />
            비주얼 완성도와 정보 전달,<br />
            사용자 흐름까지 고려한 디자인을 제작합니다.
          </p>

          {/* Real Estate Stats Cards */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/20">
            {experienceStats.map((stat, i) => (
              <div key={i} className="text-left">
                <div className="about-stat-count">
                   {stat.count}
                </div>
                <div className="about-stat-label mt-1 line-clamp-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Key Selling Point Cards */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          {sellingPoints.map((point, index) => (
            <div
              key={index}
              className="group p-8 bg-neutral-50/70 border border-black/10 hover:border-[#1E4FFF]/30 rounded-none transition-all duration-500 hover:shadow-2xl hover:shadow-[#1E4FFF]/5 block relative overflow-hidden"
            >
              {/* Top Accent Gradient Border on Hover Grid */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] group-hover:w-full transition-all duration-750" />
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Floating Rounded Icon */}
                <div className="p-4 bg-black/5 rounded-none border border-black/10 group-hover:bg-[#1E4FFF]/10 group-hover:border-[#1E4FFF]/30 transition-all duration-500 shrink-0">
                  {point.icon}
                </div>
                
                {/* Text blocks */}
                <div className="space-y-3">
                  <h3 className="about-card-title group-hover:text-[#4D63FF] transition-colors">
                    {point.title}
                  </h3>
                  <div className="about-card-desc">
                    {point.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
