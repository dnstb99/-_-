import { AppConfig } from "../types";

export const INITIAL_APP_DATA: AppConfig = {
  hero: {
    mainTitle: "Frame the Future",
    subTitle: "브랜드의 가치를 시각적으로 설계하는 디자이너 성은수입니다. 단순한 화면 구성을 넘어, 실무 신뢰와 고품질 결과물로 브랜드의 전환과 성장을 이끕니다.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" // High-end blue purple abstract
  },
  categories: ["ALL", "WEB", "BRANDING", "BANNER", "EDIT"],
  projects: [
    {
      id: "proj-1",
      name: "AURA PREMIUM ECOSYSTEM",
      category: "WEB",
      year: "2025",
      role: "Web & UX Detail Design",
      imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
      details: {
        client: "AURA Cosmetics International",
        category: "WEB (E-Commerce UX/UI)",
        work: "UI/UX Design, Interactive Prototyping",
        date: "2025. 02 - 2025. 04",
        tools: "Figma, Adobe Illustrator, React",
        purpose: "럭셔리 뷰티 프랜차이즈의 프리미엄 브랜드 아이덴티티 시각화 및 구매 문의 전환율 극대화 중심의 인터랙티브 상세 랜딩 페이지 설계",
        designPoint: "심플한 무채색 그리드 시스템에 무빙 로딩 애니메이션 및 블루+퍼플 그러데이션 포인트를 정교하게 가미하여 모던하고 신뢰감 높은 스튜디오 비주얼을 구현했습니다.",
        resultImages: [
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
        ]
      }
    },
    {
      id: "proj-2",
      name: "KRONOS CHRONOGRAPH INSIGHT",
      category: "BRANDING",
      year: "2025",
      role: "Visual Branding Sequence",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      details: {
        client: "KRONOS Swiss Watches",
        category: "BRANDING (Identity System)",
        work: "Brand Logo, Design Guideline, Mockup Design",
        date: "2025. 01 (3 Weeks)",
        tools: "Figma, Adobe Illustrator, Cinema 4D",
        purpose: "스위스 파인 워치메이킹 브랜드 크로노스의 하이엔드 이미지를 전달하기 위한 로고 마크, 서체 운용 가이드, 제품 패키징의 토탈 브랜딩 자산 설계",
        designPoint: "G마켓 영문 서체의 볼드함을 기하학적으로 해체 가공한 유니크 로고마크와 세련된 미니멀 화이트 박스 시스템에 메탈릭 퍼플 박을 입힌 절제된 완성도.",
        resultImages: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80"
        ]
      }
    },
    {
      id: "proj-3",
      name: "HYPER EV CAMPAIGN",
      category: "BANNER",
      year: "2025",
      role: "Digital Campaign Key Visual",
      imageUrl: "https://images.unsplash.com/photo-1617791160505-6f006e121980?auto=format&fit=crop&w=800&q=80",
      details: {
        client: "HYPER Automotive INC.",
        category: "BANNER (Ad Creative Campaign)",
        work: "Digital Retouching, Motion Graphic Banners",
        date: "2025. 03",
        tools: "Photoshop, After Effects",
        purpose: "차세대 프리미엄 친환경 SUV의 사전예약 런칭을 목표로 한 모바일 광고 배너 세트 개발 및 SNS 프로모션 메인 비주얼 가공",
        designPoint: "역동적인 속도감이 느껴지는 라이트 퍼플 트레일 라인 효과와 하이 콘트라스트 블랙 모놀리스 레이아웃을 통해 미래지향적인 첨단 기술 신뢰 마케팅 구체화.",
        resultImages: [
          "https://images.unsplash.com/photo-1617791160505-6f006e121980?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
        ]
      }
    },
    {
      id: "proj-4",
      name: "ARCH & VOID MAGAZINE",
      category: "EDIT",
      year: "2024",
      role: "Editorial Layout & Book Design",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      details: {
        client: "STUDIO ARCH Architecture Group",
        category: "EDIT (Premium Lookbook)",
        work: "Layout Design, Typography System, Print Direction",
        date: "2024. 11",
        tools: "InDesign, Illustrator",
        purpose: "건축 스튜디오의 연간 준공 포트폴리오를 우아한 단행본 형태로 가공하여 파트너십 유치와 디자인 아카이빙 비주얼 북 제작",
        designPoint: "극도로 억제된 극소의 폰트 사이즈 조합과 광활한 비백(Negative Space) 면적 설계를 통하여 현대 건축이 지향하는 아름다움을 종이 프레임 위에 완벽히 조율했습니다.",
        resultImages: [
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
        ]
      }
    }
  ]
};
