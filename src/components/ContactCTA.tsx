import { useState, useEffect, FormEvent } from "react";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

interface ContactCTAProps {
  preselectedService: string;
  onInquirySubmit: (inquiry: {
    name: string;
    phone: string;
    email: string;
    service: string;
    content: string;
  }) => void;
}

export default function ContactCTA({ preselectedService, onInquirySubmit }: ContactCTAProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("STANDARD");
  const [content, setContent] = useState("");
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync state if preselectedService changes on parent
  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService.toUpperCase());
    }
  }, [preselectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Verification check
    if (!name.trim()) {
      setErrorMsg("성함(또는 기업명)을 정확히 작성해 주세요.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("상담 접수를 위한 연락처를 기재해 주세요.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      setErrorMsg("문의하시는 세부 세부 요구사항을 전달해 주세요.");
      return;
    }

    onInquirySubmit({
      name,
      phone,
      email,
      service,
      content,
    });

    setIsSuccess(true);
    setErrorMsg("");
    
    // Clear state
    setName("");
    setPhone("");
    setEmail("");
    setService("STANDARD");
    setContent("");
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-black py-24 md:py-32 px-6 md:px-12 overflow-hidden flex items-center justify-center"
    >
      {/* Background soft blue+purple gradient glow starting from bottom right */}
      <div className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] max-w-[800px] rounded-full bg-gradient-to-br from-[#1E4FFF]/15 via-[#4D63FF]/10 to-[#7A5CFF]/15 filter blur-[130px] pointer-events-none z-0" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left column: Inspiring Big Slogan Callout */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-4">
            <span className="en-subtitle text-[#1E4FFF] uppercase tracking-[0.25em] font-bold block text-[14px]">
              PROJECT CONSULTING
            </span>
            {/* Big quote statement layout */}
            <h2 className="hero-main-title leading-[1.3] text-white tracking-tight" style={{ fontSize: "36px", fontWeight: 800 }}>
              브랜드의 가치를<br />
              <span className="gradient-text-gradient font-black">디자인으로 연결</span> 합니다.
            </h2>
          </div>

          <p 
            className="ko-desc text-[#FFFFFF] leading-relaxed max-w-lg whitespace-pre-line"
            style={{
              fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              fontWeight: 300,
              fontSize: "12pt"
            }}
          >
            단순한 디자인을 넘어{"\n"}
            브랜드의 가치와 경험을 함께 설계합니다.{"\n"}
            프로젝트 목적에 맞는 방향을 제안해드려요!{"\n"}
            편하게 문의해주세요.
          </p>
        </div>

        {/* Right column: Interactive Application Card Form */}
        <div className="lg:col-span-6">
          <div className="relative group p-8 md:p-10 bg-neutral-950 border border-white/10 rounded-none shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {/* Glowing active outline block overlay */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#1E4FFF] via-[#4D63FF] to-[#7A5CFF]" />

            {isSuccess ? (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-[#1E4FFF]/10 border border-[#1E4FFF]/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-[#1E4FFF]" />
                </div>
                <div className="space-y-2">
                  <h3 className="ko-title text-xl text-white font-bold" style={{ fontSize: "20px" }}>
                    상담 신청이 완벽히 전송 되었습니다!
                  </h3>
                  <p className="ko-desc text-[#FFFFFF] text-xs">
                    디자이너 성은수가 확인 후 신속히 연락 드리겠습니다. 감사합니다.
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-white/5 border border-white/20 hover:border-white/50 text-white font-medium text-xs tracking-wider cursor-pointer"
                >
                  새로운 상담 신청하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col border-b border-white/10 pb-2">
                  <h3 
                    className="ko-subtitle text-white"
                    style={{
                      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                      fontWeight: 500,
                      fontSize: "15pt"
                    }}
                  >
                    무료 상담 신청
                  </h3>
                </div>

                {/* Validation Warnings */}
                {errorMsg && (
                  <div className="p-4 bg-red-950/20 border border-red-500/35 flex items-center gap-3 text-red-400 text-xs text-left">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="ko-desc leading-relaxed">{errorMsg}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2 text-left">
                  <label 
                    className="ko-subtitle text-[#FFFFFF] block"
                    style={{
                      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                      fontWeight: 500,
                      fontSize: "12pt"
                    }}
                  >
                    성함 및 기업명 <span className="text-[#1E4FFF]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs placeholder-white/20 transition-colors"
                  />
                </div>

                {/* Grid layout for Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-2 text-left">
                    <label 
                      className="ko-subtitle text-[#FFFFFF] block"
                      style={{
                        fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                        fontWeight: 500,
                        fontSize: "12pt"
                      }}
                    >
                      연락처 <span className="text-[#1E4FFF]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs placeholder-white/20 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 text-left">
                    <label 
                      className="ko-subtitle text-[#FFFFFF] block"
                      style={{
                        fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                        fontWeight: 500,
                        fontSize: "12pt"
                      }}
                    >
                      이메일
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs placeholder-white/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Dropdown Choice */}
                <div className="space-y-2 text-left">
                  <label 
                    className="ko-subtitle text-[#FFFFFF] block"
                    style={{
                      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                      fontWeight: 500,
                      fontSize: "12pt"
                    }}
                  >
                    서비스 선택 <span className="text-[#1E4FFF]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white cursor-pointer appearance-none"
                      style={{
                        fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                        fontWeight: 300,
                        fontSize: "12pt"
                      }}
                    >
                      <option value="BASIC" style={{ backgroundColor: "#000000" }}>BASIC</option>
                      <option value="STANDARD" style={{ backgroundColor: "#000000" }}>STANDARD</option>
                      <option value="PREMIUM" style={{ backgroundColor: "#000000" }}>PREMIUM</option>
                    </select>
                    {/* 우측 화살표 아이콘 및 왼쪽으로 5pt 정도 이동 (기본 16px/right-4에 해당하여 21px로 추가 조정) */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-white/60 flex items-center"
                      style={{ right: "21px" }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Details text area */}
                <div className="space-y-2 text-left">
                  <label 
                    className="ko-subtitle text-[#FFFFFF] block"
                    style={{
                      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                      fontWeight: 500,
                      fontSize: "12pt"
                    }}
                  >
                    상세 문의
                  </label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="준비 중이신 비즈니스의 현재 진행 상황, 원하시는 참고 래퍼런스 웹 링크, 타겟 오픈 일정을 간략히 설명해 주세요."
                    className="w-full px-4 py-3 bg-[000000] border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs placeholder-white/20 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submission core trigger with premium design and hover fill */}
                <div className="pt-2 space-y-2">
                  {(!name.trim() || !phone.trim()) && (
                    <div 
                      className="text-[#FF4D4D] text-left"
                      style={{
                        fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                        fontWeight: 300,
                        fontSize: "10pt"
                      }}
                    >
                      * 필수 항목을 입력해주세요.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={!name.trim() || !phone.trim()}
                    className={`w-full py-4 text-xs font-bold font-sans tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 border-none ${
                      (!name.trim() || !phone.trim())
                        ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                        : "bg-[#1E4FFF] hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#7A5CFF] text-white hover:gradient-border-glow cursor-pointer"
                    }`}
                    style={{ borderRadius: "0px" }}
                  >
                    <Send className="w-4.5 h-4.5" />
                    상담 신청하기
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
