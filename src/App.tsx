import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";
import Services from "./components/Services";
import Process from "./components/Process";
import ContactCTA from "./components/ContactCTA";
import AdminPanel from "./components/AdminPanel";
import ProjectDetail from "./components/ProjectDetail";
import { INITIAL_APP_DATA } from "./data/initialData";
import { AppConfig, InquirySubmission, Project } from "./types";
import { MessageSquare, Settings } from "lucide-react";

export default function App() {
  // Load configuration from localStorage, fallback to static defaults
  const [appData, setAppData] = useState<AppConfig>(() => {
    const cached = localStorage.getItem("eunsu_portfolio_data");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {
        console.error("Cache corrupted, loading defaults", err);
      }
    }
    return INITIAL_APP_DATA;
  });

  // Load inquiry list from localStorage
  const [submissions, setSubmissions] = useState<InquirySubmission[]>(() => {
    const cached = localStorage.getItem("eunsu_submissions_data");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Inquiries corrupted", e);
      }
    }
    return [];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"home" | "works">("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync state data to localStorage upon modification
  const handleUpdateConfig = (newData: AppConfig) => {
    setAppData(newData);
    localStorage.setItem("eunsu_portfolio_data", JSON.stringify(newData));
  };

  const handleUpdateSubmissions = (subs: InquirySubmission[]) => {
    setSubmissions(subs);
    localStorage.setItem("eunsu_submissions_data", JSON.stringify(subs));
  };

  // Add a new client inquiry
  const handleInquirySubmit = (inquiry: {
    name: string;
    phone: string;
    email: string;
    service: string;
    content: string;
  }) => {
    const newSub: InquirySubmission = {
      id: "sub-" + Date.now(),
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email,
      service: inquiry.service,
      content: inquiry.content,
      date: new Date().toISOString(),
      read: false,
    };
    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("eunsu_submissions_data", JSON.stringify(updated));
  };

  // Monitor scroll for header hide/reveal and active sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.7; // past 70% of Hero
      
      // Toggle navbar visibility past threshold
      setIsNavbarVisible(scrollY > threshold);

      // Simple active tab trigger depending on scroll bounds
      const sections = ["hero", "about", "works", "services", "process", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to establish correct states
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Action callback from pricing tables to Contact CTA form
  const handleServiceSelect = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Skip down directly to ABOUT past Hero
  const handleScrollNext = () => {
    const nextElem = document.getElementById("about");
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Replicate Navbar scrolling control for the footer links
  const handleFooterNav = (id: string) => {
    setSelectedProject(null);
    if (id === "works") {
      setViewMode("works");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setViewMode("home");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 50);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#1E4FFF] selection:text-white no-scrollbar">
      
      {/* Dynamic Ambient Background Glow Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-[-1024px] md:right-[-400px] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#1E4FFF]/5 to-transparent filter blur-[150px] opacity-70" />
        <div className="absolute bottom-[20%] left-[-1024px] md:left-[-350px] w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#7A5CFF]/5 to-transparent filter blur-[150px] opacity-70" />
      </div>

      {/* FLOATING NAVIGATION */}
      <Navbar
        visible={viewMode === "works" || selectedProject !== null || isNavbarVisible}
        onAdminClick={() => setIsAdminOpen(true)}
        activeSection={selectedProject !== null ? "works" : (viewMode === "works" ? "works" : activeSection)}
        viewMode={viewMode}
        setViewMode={(mode) => {
          setViewMode(mode);
          setSelectedProject(null);
        }}
        onClearSelectedProject={() => setSelectedProject(null)}
      />

      {/* CORE SECTOR WRAPPERS */}
      <div className="relative z-10 w-full flex flex-col">
        {selectedProject ? (
          <div className="pt-20 min-h-screen bg-[#FAFAFA]">
            {/* PROJECT DETAIL SUB-PAGE VIEW */}
            <ProjectDetail
              project={selectedProject}
              onClose={() => {
                setSelectedProject(null);
                setViewMode("works");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenContact={() => {
                setSelectedProject(null);
                handleServiceSelect("STANDARD");
              }}
            />
          </div>
        ) : viewMode === "home" ? (
          <>
            {/* HERO */}
            <Hero config={appData.hero} projects={appData.projects} onScrollNext={handleScrollNext} />

            {/* ABOUT */}
            <About />

            {/* WORKS */}
            <Works
              categories={appData.categories}
              projects={appData.projects}
              onOpenContact={() => handleServiceSelect("STANDARD")}
              onProjectSelect={(proj) => {
                setSelectedProject(proj);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              onViewAllClick={() => {
                setViewMode("works");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* SERVICES */}
            <Services onContactClick={handleServiceSelect} />

            {/* PROCESS */}
            <Process />

            {/* CONTACT CTA */}
            <ContactCTA
              preselectedService={preselectedService}
              onInquirySubmit={handleInquirySubmit}
            />
          </>
        ) : (
          <div className="pt-16 min-h-screen bg-[#FAFAFA]">
            {/* WORKS */}
            <Works
              categories={appData.categories}
              projects={appData.projects}
              onOpenContact={() => handleServiceSelect("STANDARD")}
              onProjectSelect={(proj) => {
                setSelectedProject(proj);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              isFullPage={true}
              onBackToHome={() => {
                setViewMode("home");
                setTimeout(() => {
                  const elem = document.getElementById("works");
                  if (elem) {
                    elem.scrollIntoView({ behavior: "instant" });
                  }
                }, 50);
              }}
            />
          </div>
        )}
        
        {/* FOOTER */}
        <footer className="w-full bg-[#030303] border-t border-white/5 py-16 px-6 md:px-12 relative overflow-hidden select-none">
          <div 
            className="max-w-7xl mx-auto flex flex-col justify-start items-start gap-8"
            style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "10pt", fontWeight: 400, color: "#ffffff" }}
          >
            {/* TOP ABOUT WORKS SERVICES PROCESS CONTACT LINKS */}
            <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2.5">
              <button
                onClick={() => handleFooterNav("hero")}
                className="text-white hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#9F3FFF] hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer text-left w-fit block"
                style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "10pt", fontWeight: 400 }}
              >
                TOP
              </button>
              <button
                onClick={() => handleFooterNav("about")}
                className="text-white hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#9F3FFF] hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer text-left w-fit block"
                style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "10pt", fontWeight: 400 }}
              >
                ABOUT
              </button>
              <button
                onClick={() => handleFooterNav("works")}
                className="text-white hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#9F3FFF] hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer text-left w-fit block"
                style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "10pt", fontWeight: 400 }}
              >
                WORKS
              </button>
              <button
                onClick={() => handleFooterNav("services")}
                className="text-white hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#9F3FFF] hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer text-left w-fit block"
                style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "10pt", fontWeight: 400 }}
              >
                SERVICES
              </button>
              <button
                onClick={() => handleFooterNav("process")}
                className="text-white hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#9F3FFF] hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer text-left w-fit block"
                style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "10pt", fontWeight: 400 }}
              >
                PROCESS
              </button>
              <button
                onClick={() => handleFooterNav("contact")}
                className="text-white hover:bg-gradient-to-r hover:from-[#1E4FFF] hover:to-[#9F3FFF] hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer text-left w-fit block"
                style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "10pt", fontWeight: 400 }}
              >
                CONTACT
              </button>
            </div>

            {/* 디자이너 성은수 / Info block */}
            <div className="flex flex-col gap-1.5 text-left">
              <span>디자이너 성은수</span>
              <span>Email dnstb99@gmail.com</span>
              <span>Business number 010-7139-0756</span>
            </div>

            {/* Copyright block */}
            <div className="text-left">
              <span>Copyright ⓒ 2026 성은수 Allrights reserved.</span>
            </div>

            {/* Admin entry point - beautiful minimalist design */}
            <div className="pt-4 w-full flex justify-between items-center border-t border-white/5">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hover:opacity-80 text-[9pt] text-white/45 cursor-pointer flex items-center gap-1.5 transition-all"
                style={{ fontFamily: "'Pretendard', sans-serif", fontWeight: 400 }}
              >
                <Settings className="w-3.5 h-3.5" />
                SYSTEM ADMIN ACCESSIBILITY
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* SYSTEM ADMIN MANAGEMENT PANEL (Gated via password '6230') */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        appData={appData}
        onUpdateConfig={handleUpdateConfig}
        submissions={submissions}
        onUpdateSubmissions={handleUpdateSubmissions}
      />

      {/* QUICK INQUIRY NOTIFICATION BADGE ON FOOTER */}
      {submissions.filter(s => !s.read).length > 0 && (
        <button
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-6 right-6 z-30 p-4 bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] rounded-full shadow-2xl border border-white/20 hover:scale-[1.08] transition-transform animate-bounce flex items-center gap-2 cursor-pointer"
          title="새로운 문의가 접수되었습니다"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-650 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
            {submissions.filter(s => !s.read).length}
          </span>
        </button>
      )}

    </div>
  );
}
