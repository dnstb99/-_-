import { MessageSquare, Search, Compass, RotateCcw, PackageCheck } from "lucide-react";

export default function Process() {
  const steps = [
    {
      stepNum: "01",
      icon: <MessageSquare className="w-5 h-5 text-[#1E4FFF]" />,
      title: "문의 & 상담",
      subtitle: "INQUIRY & CONSULT",
      desc: "간단한 상담을 통해\n프로젝트 방향과 목표를 파악하고\n작업 범위를 함께 정리합니다."
    },
    {
      stepNum: "02",
      icon: <Search className="w-5 h-5 text-[#7A5CFF]" />,
      title: "브랜드 분석",
      subtitle: "BRAND ANALYSIS",
      desc: "브랜드 성격과 제품 특성을 분석해\n디자인 방향과 비주얼 무드를 설정합니다."
    },
    {
      stepNum: "03",
      icon: <Compass className="w-5 h-5 text-[#1E4FFF]" />,
      title: "시안 제안",
      subtitle: "DRAFT PROPOSALS",
      desc: "구조와 레이아웃을 기반으로\n프로젝트 목적에 맞는 시안을 제작합니다."
    },
    {
      stepNum: "04",
      icon: <RotateCcw className="w-5 h-5 text-[#7A5CFF]" />,
      title: "피드백 & 수정",
      subtitle: "FEEDBACKS & REVISION",
      desc: "피드백을 바탕으로\n디자인 완성도를 높이고\n세부 요소를 조정합니다."
    },
    {
      stepNum: "05",
      icon: <PackageCheck className="w-5 h-5 text-[#1E4FFF]" />,
      title: "최종 납품",
      subtitle: "FINAL DELIVERY",
      desc: "최종 결과물과 함께\n정리된 원본 파일 및 작업 데이터를\n전달해드립니다."
    }
  ];

  return (
    <section
      id="process"
      className="relative min-h-screen w-full bg-[#FFFFFF] py-24 md:py-32 px-6 md:px-12 border-t border-black/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Section header block */}
        <div className="flex flex-col items-center text-center pb-3">
          <div className="space-y-2">
            <span className="en-subtitle text-[#1E4FFF] uppercase tracking-[0.2em] font-bold block text-[14px]">
              WORK PROCESS
            </span>
            <h2 className="ko-title text-3xl sm:text-4xl text-[#000000] font-bold" style={{ fontSize: "28px" }}>
              프로젝트 진행 과정
            </h2>
          </div>
        </div>

        {/* Step Cards List Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 pt-4">
          {steps.map((st, index) => (
            <div
              key={index}
              className="group relative p-6 bg-neutral-50 border border-black/5 hover:border-[#1E4FFF]/30 rounded-none transition-all duration-500 hover:bg-neutral-100 flex flex-col justify-start min-h-[320px]"
            >
              <div className="space-y-6 h-28">
                {/* Step indicator header */}
                <div className="flex justify-between items-center">
                  <span 
                    className="text-[#000000] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#1E4FFF] group-hover:to-[#7A5CFF] transition-all tracking-tight"
                    style={{
                      fontFamily: '"GmarketSansBold", sans-serif',
                      fontWeight: 700,
                      fontSize: "20pt"
                    }}
                  >
                    {st.stepNum}
                  </span>
                </div>
 
                {/* Text groups */}
                <div className="space-y-2">
                  <h3 
                    className="ko-subtitle text-[#000000] group-hover:text-[#4D63FF] transition-all"
                    style={{
                      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: "15pt"
                    }}
                  >
                    {st.title}
                  </h3>
                </div>
              </div>
 
              {/* Desc item */}
              <div className="pt-6 border-t border-black/5">
                <p 
                  className="ko-subdesc text-[#000000] leading-relaxed"
                  style={{
                    fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontWeight: 300,
                    fontSize: "10pt",
                    whiteSpace: "pre-line"
                  }}
                >
                  {st.desc}
                </p>
              </div>

              {/* Bottom accent glow */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
