import { useState } from "react";
import { Menu, X, Settings2 } from "lucide-react";

interface NavbarProps {
  visible: boolean;
  onAdminClick: () => void;
  activeSection: string;
  viewMode: "home" | "works";
  setViewMode: (mode: "home" | "works") => void;
  onClearSelectedProject?: () => void;
}

export default function Navbar({
  visible,
  onAdminClick,
  activeSection,
  viewMode,
  setViewMode,
  onClearSelectedProject,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "hero", label: "TOP", isEn: true },
    { id: "about", label: "ABOUT", isEn: true },
    { id: "works", label: "WORKS", isEn: true },
    { id: "services", label: "SERVICES", isEn: true },
    { id: "process", label: "PROCESS", isEn: true },
    { id: "contact", label: "CONTACT", isEn: true },
  ];

  const handleScroll = (id: string) => {
    setIsOpen(false);
    if (onClearSelectedProject) {
      onClearSelectedProject();
    }
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
    <nav
      id="top-nav"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 pointer-events-auto ${
        visible
          ? "translate-y-0 opacity-100 bg-black/80 backdrop-blur-md border-b border-white/5 py-4"
          : "-translate-y-full opacity-0 pointer-events-none py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo / Designer Signature */}
        <button
          onClick={() => handleScroll("hero")}
          className="en-title tracking-widest text-[#FFFFFF] hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-2"
          style={{ fontSize: "20px" }}
        >
          EUNSU <span className="text-[#1E4FFF]">SEONG</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`en-subtitle transition-all duration-300 relative py-1 cursor-pointer text-[14px] ${
                activeSection === item.id
                  ? "text-[#4D63FF] font-bold"
                  : "text-[#FFFFFF] hover:opacity-80"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF]" />
              )}
            </button>
          ))}

          {/* Admin access trigger */}
          <button
            onClick={onAdminClick}
            className="p-2 text-[#FFFFFF] hover:bg-white/5 rounded-full transition-all duration-300 border border-white/10 hover:border-white/20"
            title="관리자 설정"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggles */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onAdminClick}
            className="p-2 text-[#FFFFFF] hover:bg-white/5 rounded-full transition-all duration-300 border border-white/10"
            title="관리자 설정"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#FFFFFF] hover:opacity-80 transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-screen py-8 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-10">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`en-subtitle text-[18px] tracking-wider py-1 w-full text-center ${
                activeSection === item.id ? "text-[#4D63FF]" : "text-[#FFFFFF]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
