import { X, ShieldAlert } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function ProjectDetail({
  project,
  onClose,
  onOpenContact,
}: ProjectDetailProps) {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] text-[#1A1A1A] pb-24 select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 space-y-16">
        
        {/* Main Header Block: Title, description, metadata and action button without separating lines or cards */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 pb-6">
          <div className="space-y-4 text-left max-w-3xl">
            <div className="space-y-1">
              <span className="en-subtitle text-[#1E4FFF] text-[11px] tracking-widest uppercase font-bold block">
                {project.details?.category || `${project.category.toUpperCase()} PROJECT OVERVIEW`}
              </span>
              <h1 className="en-title text-2xl sm:text-3xl font-extrabold uppercase text-neutral-900 tracking-tight">
                {project.name}
              </h1>
            </div>

            {/* 프로젝트 설명 */}
            <p className="text-neutral-700 leading-relaxed" style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}>
              {project.details?.purpose || "브랜드 제품 특징의 효과적인 전달과 전환율 제고 중심의 레이아웃 설계."}
            </p>

            {/* 한 줄로 정렬된 메타데이터 기여도, 사용된 툴, 작업 시간 */}
            <div className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <span className="text-[#1E4FFF]" style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}>기여도</span>
                <span className="text-neutral-800" style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}>{project.details?.work || "UX/UI Design (기여도 100%)"}</span>
              </div>
              <div className="hidden sm:block text-neutral-300">|</div>
              <div className="flex items-center gap-2">
                <span className="text-[#7A5CFF]" style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}>사용된 툴</span>
                <span className="text-neutral-800" style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}>{project.details?.tools || "Figma"}</span>
              </div>
              <div className="hidden sm:block text-neutral-300">|</div>
              <div className="flex items-center gap-2">
                <span className="text-[#1E4FFF]" style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}>작업 시간</span>
                <span className="text-neutral-800" style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}>{project.details?.date || "2025. 02"}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#1E4FFF] hover:opacity-80 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto pb-[1px] px-2 shrink-0 md:mb-[2px]"
            style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400, fontSize: "10pt" }}
          >
            목록 &rarr;
          </button>
        </div>

        {/* RESULTS FULL-SIZE IMAGES: SCROLLING VIEW (결과 이미지: 스크롤형) */}
        <div className="space-y-8">
          <div className="flex flex-col gap-6 md:gap-10">
            {project.details?.resultImages && project.details.resultImages.length > 0 ? (
              project.details.resultImages.map((imgUrl, idx) => (
                <div key={idx} className="relative w-full overflow-hidden border border-neutral-200 bg-white shadow-sm">
                  <img
                    src={imgUrl}
                    alt={`${project.name} Result Visual ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain block mx-auto"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <div className="py-20 bg-[#FAFAFA] flex flex-col items-center justify-center border border-dashed border-neutral-300 text-neutral-500 text-center">
                <ShieldAlert className="w-8 h-8 text-neutral-400 mb-2 animate-pulse" />
                <p className="ko-desc text-sm">상세 스크롤 이미지가 비어 있습니다.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
