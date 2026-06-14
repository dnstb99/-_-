import { CSSProperties } from "react";
import { Check, Flame } from "lucide-react";

interface ServicesProps {
  onContactClick: (serviceName?: string) => void;
}

export default function Services({ onContactClick }: ServicesProps) {
  const plans = [
    {
      name: "BASIC",
      tagText: "#심플 #기본",
      tagline: "실속형 베이직 프로모션",
      price: "₩350,000+",
      draftCount: "1회 제공",
      sourceProvided: "미포함",
      revisions: "2회 제공",
      features: [
        "1:1 맞춤 디자인",
        "고해상도 파일 제공",
        "원본 파일 미제공",
        "상업적 이용 불가능"
      ],
      hoverBorder: "rgba(30, 79, 255, 0.4)",
      isPopular: false
    },
    {
      name: "STANDARD",
      tagText: "추천 PICK!",
      tagline: "실무형 스탠다드 프로모션",
      price: "₩750,000+",
      draftCount: "2회 제공",
      sourceProvided: "포함(원본 파일)",
      revisions: "3회 제공",
      features: [
        "1:1 맞춤 비즈니스 디자인",
        "고해상도 파일 제공",
        "원본 파일 제공 (소스파일 미제공)",
        "상업적 이용 가능"
      ],
      hoverBorder: "rgba(77, 99, 255, 0.6)",
      isPopular: true
    },
    {
      name: "PREMIUM",
      tagText: "올인원 패키지",
      tagline: "올인원 프리미엄 프로모션",
      price: "₩1,500,000+",
      draftCount: "3회 제공",
      sourceProvided: "포함(원본+소스 파일)",
      revisions: "5회 제공",
      features: [
        "1:1 맞춤 컨설팅 디자인",
        "고해상도 파일 제공",
        "원본 및 소스 파일 제공",
        "상업적 이용 가능"
      ],
      hoverBorder: "rgba(122, 92, 255, 0.6)",
      isPopular: false
    }
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen w-full bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full filter blur-[140px] pointer-events-none opacity-20 bg-gradient-to-tr from-[#1E4FFF] to-[#7A5CFF]" />

      <div className="w-full max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Core Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="en-subtitle text-[#7A5CFF] uppercase tracking-[0.2em] font-bold block text-[14px]">
            PROJECT PLAN
          </span>
          <h2 className="ko-title text-3xl sm:text-4xl text-white font-bold leading-tight" style={{ fontSize: "28px" }}>
            맞춤형 디자인 솔루션
          </h2>
          <p 
            className="ko-desc text-[#FFFFFF] max-w-2xl mx-auto leading-relaxed" 
            style={{ 
              fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif', 
              fontWeight: 300, 
              fontSize: "12pt" 
            }}
          >
            브랜드에 맞는 방향과 목적에 따라 최적의 디자인 솔루션을 제안합니다.
            <br />
            프로젝트 규모와 작업 범위에 맞춰 유연하게 선택 가능한 맞춤형 플랜입니다.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group bg-neutral-950/70 border ${
                plan.isPopular ? "border-[#4D63FF]/40 bg-gradient-to-b from-[#4D63FF]/5 to-transparent" : "border-white/5"
              } pt-[83px] pb-8 px-8 md:pt-[91px] md:pb-10 md:px-10 flex flex-col justify-between transition-all duration-500 hover:scale-[1.01] hover:bg-neutral-900/60`}
              style={
                {
                  "--hover-border-color": plan.hoverBorder,
                  marginTop: "-10pt",
                } as CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = plan.hoverBorder;
                e.currentTarget.style.boxShadow = `0 15px 30px ${plan.hoverBorder.replace("0.6", "0.08").replace("0.4", "0.05")}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = plan.isPopular ? "rgba(77, 99, 255, 0.4)" : "rgba(255,255,255,0.05)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Card Label Tag overlay */}
              <div 
                className="absolute left-8 md:left-10 flex items-center gap-1 py-1 px-3 bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] text-[10px] en-subtitle font-bold text-white tracking-widest leading-none"
                style={{ top: "40pt" }}
              >
                {plan.isPopular && <Flame className="w-3 h-3 text-white animate-pulse" />}
                {plan.tagText || plan.name}
              </div>

              {/* Top content */}
              <div className="space-y-6">
                <div>
                  <h3 className="services-plan-title text-white tracking-widest uppercase mb-2">
                    {plan.name}
                  </h3>
                  <p className="services-plan-desc text-[#FFFFFF] min-h-[36px] line-clamp-2">
                    {plan.tagline}
                  </p>
                </div>



                {/* Key Deliverable Spec items */}
                <div className="space-y-3.5 bg-black/40 p-4 border border-white/5" style={{ fontFamily: "GmarketSansMedium, sans-serif", fontWeight: 500, fontSize: "10pt" }}>
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFFFFF]">기획 시안</span>
                    <span className="text-white">{plan.draftCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFFFFF]">원본 파일</span>
                    <span className="text-white">{plan.sourceProvided}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#FFFFFF]">수정</span>
                    <span className="text-[#4D63FF]">{plan.revisions}</span>
                  </div>
                </div>

                {/* Bullets lists */}
                <ul 
                  className="space-y-3 pt-4"
                  style={{
                    fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontWeight: 500,
                    fontSize: "12pt"
                  }}
                >
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-2.5 items-start">
                      <Check className="w-4 h-4 text-[#1E4FFF] shrink-0 mt-1" />
                      <span className="ko-desc text-[#FFFFFF] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action button with interactive style changer */}
              <div className="pt-8">
                <button
                  onClick={() => onContactClick(plan.name)}
                  className="w-full py-4 text-xs tracking-widest font-bold font-sans cursor-pointer transition-all duration-300 border border-white/20 bg-transparent text-white hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#7A5CFF] hover:border-transparent hover:shadow-[0_0_20px_rgba(77,99,255,0.4)] uppercase flex items-center justify-center gap-2"
                  style={{ borderRadius: "0px" }}
                >
                  상담 신청하기
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
