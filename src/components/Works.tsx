import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Project } from "../types";

interface WorksProps {
  categories: string[];
  projects: Project[];
  onOpenContact: () => void;
  onViewAllClick?: () => void;
  isFullPage?: boolean;
  onBackToHome?: () => void;
  onProjectSelect: (project: Project) => void;
}

export default function Works({
  categories,
  projects,
  onOpenContact,
  onViewAllClick,
  isFullPage = false,
  onBackToHome,
  onProjectSelect,
}: WorksProps) {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  // Filter projects depending on selected tab
  const filteredProjects = useMemo(() => {
    if (activeTab === "ALL") {
      return projects;
    }
    return projects.filter(
      (proj) => proj.category.toUpperCase() === activeTab.toUpperCase()
    );
  }, [projects, activeTab]);

  return (
    <section
      id="works"
      className={`relative min-h-screen w-full bg-[#FAFAFA] px-6 md:px-12 border-t border-black/5 ${
        isFullPage ? "pt-12 md:pt-16 pb-24 md:pb-32" : "py-24 md:py-32"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Header Block Section */}
        {!isFullPage && (
          <div className="flex flex-col items-center justify-center text-center gap-6">
            <div className="space-y-4">
              <span className="en-subtitle text-[#1E4FFF] uppercase tracking-[0.2em] font-bold block text-[14px]">
                SELECTED PORTFOLIO
              </span>
              <h2 className="ko-title text-3xl sm:text-4xl text-[#000000] font-bold" style={{ fontSize: "28px" }}>
                실무 기반 디자인 컬렉션
              </h2>
            </div>
          </div>
        )}

        {/* Categories Tab Navigation bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black/10 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = activeTab.toUpperCase() === cat.toUpperCase();
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`works-category-btn px-6 py-2.5 uppercase transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? "text-[#1E4FFF] font-bold"
                      : "text-[#000000] hover:opacity-80"
                  }`}
                >
                  {cat}
                  {isSelected && (
                    <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#1E4FFF]" />
                  )}
                </button>
              );
            })}
          </div>

          {isFullPage ? (
            <button
              onClick={onBackToHome}
              className="works-category-menu-custom text-[#000000]/60 hover:text-[#000000] font-medium transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto py-2.5 px-2"
            >
              &larr; 홈으로 돌아가기
            </button>
          ) : (
            <button
              onClick={onViewAllClick}
              className="works-category-menu-custom text-[#1E4FFF] font-bold hover:opacity-80 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto py-2.5 px-2"
            >
              전체보기 &rarr;
            </button>
          )}
        </div>

        {/* Projects Display Grid (Strictly 1-column on mobile) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onProjectSelect(proj)}
                className="group cursor-pointer space-y-5"
              >
                {/* Large Thumbnail Image with subtle hover scale 1.02 as Good interaction tip */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200 border border-black/10">
                  <img
                    src={proj.imageUrl}
                    alt={proj.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    style={{ contentVisibility: "auto" }}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <span className="en-subtitle text-xs text-white/90 tracking-widest flex items-center gap-2">
                      VIEW WORK PROCESS
                      <ArrowRight className="w-4 h-4 text-[#1E4FFF] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Info block under thumbnails */}
                <div className="flex justify-between items-start pt-1">
                  <div className="space-y-1">
                    <h3 className="works-item-title text-[#000000] group-hover:text-[#4D63FF] transition-colors tracking-wide uppercase">
                      {proj.name}
                    </h3>
                    <p className="works-item-desc text-[#000000]/80">
                      {proj.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-neutral-200 border border-black/5">
            <p className="ko-desc text-[#000000] mb-2">등록된 작업물이 없습니다.</p>
            <p className="ko-subdesc text-[#000000]/60 text-xs">관리자 메뉴에서 프로젝트를 편집해보세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}
