import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  X,
  Lock,
  Edit,
  Trash2,
  Plus,
  Compass,
  FileText,
  Bookmark,
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  Sliders,
  Sparkles,
  RefreshCw,
  FolderPlus,
  Image as ImageIcon
} from "lucide-react";
import { AppConfig, Project, InquirySubmission } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appData: AppConfig;
  onUpdateConfig: (newData: AppConfig) => void;
  submissions: InquirySubmission[];
  onUpdateSubmissions: (subs: InquirySubmission[]) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  appData,
  onUpdateConfig,
  submissions,
  onUpdateSubmissions
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");

  const [activeTab, setActiveTab] = useState<"hero" | "projects" | "categories" | "submissions">("hero");

  // Hero Fields Edit state
  const [heroMainTitle, setHeroMainTitle] = useState(appData.hero.mainTitle);
  const [heroSubTitle, setHeroSubTitle] = useState(appData.hero.subTitle);
  const [heroImageUrl, setHeroImageUrl] = useState(appData.hero.imageUrl);

  // New Category field
  const [newCategoryName, setNewCategoryName] = useState("");

  // Projects editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projName, setProjName] = useState("");
  const [projCategory, setProjCategory] = useState("");
  const [projYear, setProjYear] = useState("");
  const [projRole, setProjRole] = useState("");
  const [projImgUrl, setProjImgUrl] = useState("");

  // Detailed Project Fields
  const [detClient, setDetClient] = useState("");
  const [detCat, setDetCat] = useState("");
  const [detWork, setDetWork] = useState("");
  const [detDate, setDetDate] = useState("");
  const [detTools, setDetTools] = useState("");
  const [detPurpose, setDetPurpose] = useState("");
  const [detDesignPoint, setDetDesignPoint] = useState("");
  const [detResultImages, setDetResultImages] = useState<string[]>([]);
  const [newResultImgUrl, setNewResultImgUrl] = useState("");
  const [dragOverThumb, setDragOverThumb] = useState(false);

  if (!isOpen) return null;

  // Handle Password verification
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "6230") {
      setIsAuthenticated(true);
      setPassError("");
    } else {
      setPassError("비밀번호가 올바르지 않습니다. 다시 입력해주세요.");
    }
  };


  // Convert uploaded computer file to base64
  const processFile = (file: File, type: "hero" | "proj-thumb" | "proj-result") => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === "hero") {
        setHeroImageUrl(base64String);
      } else if (type === "proj-thumb") {
        setProjImgUrl(base64String);
      } else if (type === "proj-result") {
        setDetResultImages((prev) => [...prev, base64String]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    type: "hero" | "proj-thumb" | "proj-result"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file, type);
  };

  const handleDragOverThumb = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverThumb(true);
  };

  const handleDragLeaveThumb = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverThumb(false);
  };

  const handleDropThumb = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverThumb(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file, "proj-thumb");
    }
  };

  // Save HERO edits
  const handleSaveHero = () => {
    onUpdateConfig({
      ...appData,
      hero: {
        mainTitle: heroMainTitle,
        subTitle: heroSubTitle,
        imageUrl: heroImageUrl
      }
    });
    alert("히어로 레이아웃 텍스트와 비주얼 수정이 완료되었습니다.");
  };

  // CATEGORIES management
  const handleAddCategory = () => {
    const clean = newCategoryName.trim().toUpperCase();
    if (!clean) return;
    if (appData.categories.includes(clean)) {
      alert("이미 등록된 동일 이름의 카테고리 탭이 있습니다.");
      return;
    }
    const updated = [...appData.categories, clean];
    onUpdateConfig({
      ...appData,
      categories: updated
    });
    setNewCategoryName("");
  };

  const handleDeleteCategory = (cat: string) => {
    if (cat.toUpperCase() === "ALL") {
      alert("기본 루트 ALL 카테고리는 삭제가 불가능합니다.");
      return;
    }
    if (confirm(`카테고리 '${cat}'을(를) 삭제하시겠습니까? 해당 카테고리에 속한 작품들은 카테고리 명칭 수정이 필요할 수 있습니다.`)) {
      const updated = appData.categories.filter((c) => c !== cat);
      onUpdateConfig({
        ...appData,
        categories: updated
      });
    }
  };

  // PROJECTS management
  const handleSelectEditProject = (p: Project) => {
    setEditingProject(p);
    setProjName(p.name);
    setProjCategory(p.category);
    setProjYear(p.year);
    setProjRole(p.role);
    setProjImgUrl(p.imageUrl);

    // Load detailed lists
    setDetClient(p.details?.client || "");
    setDetCat(p.details?.category || "");
    setDetWork(p.details?.work || "");
    setDetDate(p.details?.date || "");
    setDetTools(p.details?.tools || "");
    setDetPurpose(p.details?.purpose || "");
    setDetDesignPoint(p.details?.designPoint || "");
    setDetResultImages(p.details?.resultImages || []);
  };

  const handleCreateNewProjectState = () => {
    const defaultCat = appData.categories.filter(c => c !== "ALL")[0] || "WEB";
    const id = "proj-" + Date.now();
    const newProj: Project = {
      id,
      name: "NEW VALUE ARCHITECT",
      category: defaultCat,
      year: new Date().getFullYear().toString(),
      role: "Web Detail Design",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      details: {
        client: "가상의 파트너스",
        category: `${defaultCat} Design`,
        work: "브랜딩 가이드 설계",
        date: "2025. 06",
        tools: "Figma, React",
        purpose: "브랜드 특징 핵심 전달 및 고품질 원본 설계 제공",
        designPoint: "컬러 조율 전략 및 미니멀 레이아웃 구조화",
        resultImages: []
      }
    };
    handleSelectEditProject(newProj);
  };

  const handleSaveProject = () => {
    if (!projName.trim()) {
      alert("프로젝트 명칭을 입력해주세요.");
      return;
    }

    const compiledProj: Project = {
      id: editingProject?.id || "proj-" + Date.now(),
      name: projName,
      category: projCategory || "WEB",
      year: projYear || "2025",
      role: projRole,
      imageUrl: projImgUrl,
      details: {
        client: detClient,
        category: detCat || projCategory,
        work: detWork,
        date: detDate,
        tools: detTools,
        purpose: detPurpose,
        designPoint: detDesignPoint,
        resultImages: detResultImages
      }
    };

    let updatedProjects = [...appData.projects];
    const existingIdx = updatedProjects.findIndex((p) => p.id === compiledProj.id);
    if (existingIdx !== -1) {
      updatedProjects[existingIdx] = compiledProj;
    } else {
      updatedProjects.push(compiledProj);
    }

    onUpdateConfig({
      ...appData,
      projects: updatedProjects
    });

    alert("프로젝트 데이터가 성공적으로 저장되었습니다.");
    setEditingProject(null);
  };

  const handleDeleteProject = (projId: string) => {
    if (confirm("정말 이 프로젝트를 삭제하시겠습니까?")) {
      const updated = appData.projects.filter((p) => p.id !== projId);
      onUpdateConfig({
        ...appData,
        projects: updated
      });
      if (editingProject?.id === projId) {
        setEditingProject(null);
      }
    }
  };

  // INQUIRIES management
  const toggleInquiryRead = (id: string) => {
    const updated = submissions.map((sub) =>
      sub.id === id ? { ...sub, read: !sub.read } : sub
    );
    onUpdateSubmissions(updated);
  };

  const deleteInquiry = (id: string) => {
    if (confirm("이 문의 내역을 삭제하시겠습니까?")) {
      const updated = submissions.filter((sub) => sub.id !== id);
      onUpdateSubmissions(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] overflow-y-auto block select-none">
      
      {/* Absolute Admin Frame Top navigation header */}
      <header className="sticky top-0 bg-neutral-950 border-b border-white/10 py-5 px-6 md:px-12 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] rounded-none">
            <Sliders className="w-5 h-5 text-white" />
          </div>
          <span className="en-title uppercase tracking-widest text-sm text-[#FFFFFF] font-extrabold">
            STUDIO ADMIN CORE CONSOLE
          </span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 py-1.5 px-3 border border-white/10 hover:border-white/50 text-white hover:bg-white/5 transition-all text-xs cursor-pointer"
        >
          <X className="w-4 h-4" />
          EXIT CONSOLE
        </button>
      </header>

      {/* PASSWORD GATE SECURITY IF NOT AUTHENTICATED */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto px-6 py-28 space-y-8 h-full flex flex-col justify-center">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6 text-[#7A5CFF]" />
            </div>
            <h2 className="ko-title text-xl font-bold text-white uppercase tracking-tight" style={{ fontSize: "20px" }}>
              관리자 모드 전용 액세스
            </h2>
            <p className="ko-subdesc text-white/50 text-xs">
              본 시스템은 포트폴리오 에디터 승인 페이지입니다. 설정을 변경하거나 문의 접수 현황을 보기 위해서는 지정 패스코드를 매치해 주십시오.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="ko-subtitle text-white/70 text-xs">보안 패스워드 번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="지정된 패스코드를 입력하세요"
                className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#1E4FFF] focus:outline-none text-white text-xs tracking-widest placeholder-white/25 text-center"
                autoFocus
              />
            </div>

            {passError && (
              <p className="ko-subdesc text-red-400 text-xs text-center border border-red-500/25 py-2.5 bg-red-950/10">
                {passError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] text-white font-bold text-xs tracking-widest uppercase cursor-pointer hover:opacity-90 active:scale-95 transition-all border-none"
            >
              인증 시스템 해제
            </button>
          </form>
        </div>
      ) : (
        /* CONTENT INTERACTION PANEL IF AUTHENTICATED */
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Internal Sidebar Menu Option switcher */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="p-4 bg-neutral-950 border border-white/10 text-left space-y-1 mb-2">
              <span className="ko-subdesc text-[10px] text-[#4D63FF] block uppercase tracking-widest font-extrabold">STATUS: VERIFIED</span>
              <p className="ko-desc text-white text-xs font-bold font-sans">관리자 성은수 님 로그인</p>
              <p className="ko-subdesc text-white/40 text-[11px]">마크 세션 데이터를 실시간 에디팅합니다.</p>
            </div>

            <nav className="flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab("hero"); setEditingProject(null); }}
                className={`w-full py-3 px-4 text-xs font-medium text-left flex items-center gap-3 transition-colors uppercase ${
                  activeTab === "hero"
                    ? "bg-[#1E4FFF] text-white font-bold"
                    : "bg-neutral-950 border border-white/5 text-white/60 hover:text-white"
                }`}
              >
                <Compass className="w-4 h-4" />
                히어로 문구 & 이미지
              </button>

              <button
                onClick={() => { setActiveTab("categories"); setEditingProject(null); }}
                className={`w-full py-3 px-4 text-xs font-medium text-left flex items-center gap-3 transition-colors uppercase ${
                  activeTab === "categories"
                    ? "bg-[#1E4FFF] text-white font-bold"
                    : "bg-neutral-950 border border-white/5 text-white/60 hover:text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                카테고리 탭 (탭 편집)
              </button>

              <button
                onClick={() => { setActiveTab("projects"); setEditingProject(null); }}
                className={`w-full py-3 px-4 text-xs font-medium text-left flex items-center gap-3 transition-colors uppercase ${
                  activeTab === "projects"
                    ? "bg-[#1E4FFF] text-white font-bold"
                    : "bg-neutral-950 border border-white/5 text-white/60 hover:text-white"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                포트폴리오 작품 관리 ({appData.projects.length})
              </button>

              <button
                onClick={() => { setActiveTab("submissions"); setEditingProject(null); }}
                className={`w-full py-3 px-4 text-xs font-medium text-left flex items-center justify-between transition-colors uppercase ${
                  activeTab === "submissions"
                    ? "bg-[#1E4FFF] text-white font-bold"
                    : "bg-neutral-950 border border-white/5 text-white/60 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>문의 신청서 모음</span>
                </div>
                {submissions.filter(s => !s.read).length > 0 && (
                  <span className="py-0.5 px-2 bg-red-600 rounded-full text-[10px] font-bold text-white animate-pulse">
                    {submissions.filter(s => !s.read).length}
                  </span>
                )}
              </button>
            </nav>
          </aside>

          {/* Main workspace container view */}
          <main className="lg:col-span-3 bg-neutral-950 border border-white/5 p-6 md:p-8 space-y-8 text-left">
            
            {/* TAB 1: HERO CONFIGURATION */}
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="ko-subtitle text-white font-bold text-[18px]">히어로 섹션 미장센 변경</h3>
                  <p className="ko-subdesc text-white/40 text-xs">첫 화면의 감각적 슬로건과 flex 비주얼 이미지를 실시간 재조정합니다.</p>
                </div>

                {/* Main title */}
                <div className="space-y-2">
                  <label className="ko-subtitle text-white/75 text-xs block">메인 헤딩 문구 (Pretendard ExtraBold 40pt)</label>
                  <input
                    type="text"
                    value={heroMainTitle}
                    onChange={(e) => setHeroMainTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#1E4FFF] text-white text-xs focus:outline-none"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                  <label className="ko-subtitle text-white/75 text-xs block">서브 서술 문구 (Pretendard Medium 14pt)</label>
                  <textarea
                    rows={4}
                    value={heroSubTitle}
                    onChange={(e) => setHeroSubTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#1E4FFF] text-white text-xs focus:outline-none leading-relaxed resize-none"
                  />
                </div>

                {/* Image Direct URL option */}
                <div className="space-y-2">
                  <label className="ko-subtitle text-white/75 text-xs block">대표 메인 이미지 주소 URL</label>
                  <input
                    type="text"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#1E4FFF] text-white text-xs focus:outline-none"
                  />
                </div>

                {/* Local File Direct Attachment to satisfy requirements */}
                <div className="space-y-2">
                  <label className="ko-subtitle text-white/75 text-xs block">내 컴퓨터에서 이미지 직접 첨부 (URL 자동 대체)</label>
                  <div className="relative border border-dashed border-white/20 p-6 text-center hover:border-[#1E4FFF]/50 bg-black/40 cursor-pointer transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "hero")}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="space-y-1.5 grayscale opacity-60">
                      <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto" />
                      <p className="ko-desc text-xs text-white">클릭하여 내 PC에 저장된 원본 올리기</p>
                      <p className="ko-subdesc text-[10px] text-white/40">jpg, png, webp 고해상도 지원</p>
                    </div>
                  </div>
                </div>

                {/* Hero Preview visual state */}
                {heroImageUrl && (
                  <div className="p-4 border border-white/10 bg-black flex gap-4 items-center rounded-none.">
                    <div className="w-20 aspect-video shrink-0 bg-neutral-800 overflow-hidden border border-white/5">
                      <img src={heroImageUrl} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="ko-subtitle text-white text-xs font-bold">이미지 실시간 갱신 완료</h4>
                      <p className="ko-subdesc text-neutral-500 text-[11px] truncate max-w-sm">{heroImageUrl}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleSaveHero}
                    className="px-8 py-3 bg-[#1E4FFF] text-white font-bold text-xs tracking-wider cursor-pointer hover:bg-[#4D63FF] transition-all uppercase"
                  >
                    히어로 설정 변경 즉시 저장
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: CATEGORY TABS EDITING */}
            {activeTab === "categories" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="ko-subtitle text-white font-bold text-[18px]">카테고리 탭 신설 및 삭제</h3>
                  <p className="ko-subdesc text-white/40 text-xs">포트폴리오 메인 화면에서 필터링에 핵심이 되는 카테고리 탭 항목을 영구 가공합니다.</p>
                </div>

                {/* Add new Category */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="새 카테고리 탭 명 입력 (예: BRANDING, Editorial 등)"
                    className="flex-1 px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#1E4FFF] text-white text-xs focus:outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-6 py-3 bg-gradient-to-r from-[#1E4FFF] to-[#7A5CFF] text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 border-none. md:shrink-0"
                    style={{ borderRadius: "0px" }}
                  >
                    <FolderPlus className="w-4 h-4" />
                    탭 신규 생성
                  </button>
                </div>

                {/* List categories with remove actions constraint */}
                <div className="space-y-3 pt-4">
                  <span className="ko-subtitle text-white/70 text-xs block">현재 활성화된 카테고리 필터 리스트</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {appData.categories.map((cat) => (
                      <div
                        key={cat}
                        className="flex justify-between items-center bg-neutral-900 px-4 py-3 border border-white/5 group hover:border-[#1E4FFF]/30 transition-colors"
                      >
                        <span className="en-subtitle text-white text-xs font-bold uppercase tracking-wider">{cat}</span>
                        {cat.toUpperCase() !== "ALL" ? (
                          <button
                            onClick={() => handleDeleteCategory(cat)}
                            className="p-1 px-2.5 text-red-400 hover:text-red-300 hover:bg-neutral-800 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            삭제
                          </button>
                        ) : (
                          <span className="text-[10px] text-white/30 en-subtitle">루트고정</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PROJECTS EDITING & CREATION ARCHIVE */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                
                {/* Switch Workspace visual depending on if a design project is loaded inside form */}
                {!editingProject ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div>
                        <h3 className="ko-subtitle text-white font-bold text-[18px]">포트폴리오 작품 자료 아카이빙</h3>
                        <p className="ko-subdesc text-white/40 text-xs">등록된 작품에 대한 구조, 상세 정보를 편집합니다.</p>
                      </div>
                      <button
                        onClick={handleCreateNewProjectState}
                        className="px-5 py-2.5 bg-[#1E4FFF] font-bold text-xs text-white uppercase hover:bg-[#4D63FF] transition-all cursor-pointer flex items-center gap-1.5 border-none"
                        style={{ borderRadius: "0px" }}
                      >
                        <Plus className="w-4 h-4" />
                        새 작품 등록
                      </button>
                    </div>

                    {/* Simple list of projects */}
                    <div className="space-y-3.5">
                      {appData.projects.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-4 bg-neutral-900 border border-white/5 hover:border-white/20 transition-all rounded-none"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-16 h-12 shrink-0 bg-neutral-850 overflow-hidden border border-white/10">
                              <img src={p.imageUrl} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left min-w-0">
                              <span className="en-subtitle text-[#7A5CFF] text-[10px] uppercase font-bold tracking-widest">{p.category} | {p.year}</span>
                              <h4 className="en-title text-white font-bold text-sm truncate uppercase tracking-tight">{p.name}</h4>
                              <p className="ko-subdesc text-[#FFFFFF]/50 text-xs truncate">{p.role}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSelectEditProject(p)}
                              className="p-2 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white rounded-none cursor-pointer border border-white/10 transition-colors"
                              title="상세 수정"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-none cursor-pointer border border-red-500/20 transition-colors"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* PORTFOLIO ACTIVE EDIT SCREEN COMPILATION */
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div>
                        <h3 className="ko-subtitle text-[#1E4FFF] font-bold text-sm uppercase">Currently Editing Project</h3>
                        <h2 className="en-title text-white font-extrabold text-[18px] uppercase tracking-wide">{projName || "무명 프로젝트"}</h2>
                      </div>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="py-1.5 px-3 border border-white/20 text-white/70 hover:text-white transition-all text-xs cursor-pointer"
                      >
                        목록으로 복귀
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="ko-subtitle text-white/50 text-xs">작품 프로젝트 명 (PROJECT NAME)</label>
                        <input
                          type="text"
                          value={projName}
                          onChange={(e) => setProjName(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs uppercase"
                        />
                      </div>

                      {/* Category Selection based on live state */}
                      <div className="space-y-1">
                        <label className="ko-subtitle text-white/50 text-xs">적합한 필터 카테고리 설정</label>
                        <select
                          value={projCategory}
                          onChange={(e) => setProjCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs cursor-pointer"
                        >
                          {appData.categories
                            .filter((c) => c !== "ALL")
                            .map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* Year */}
                      <div className="space-y-1">
                        <label className="ko-subtitle text-white/50 text-xs">작업 연도 (Year)</label>
                        <input
                          type="text"
                          value={projYear}
                          onChange={(e) => setProjYear(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs"
                        />
                      </div>

                      {/* Subtitle / Role description banner */}
                      <div className="space-y-1">
                        <label className="ko-subtitle text-white/50 text-xs font-sans">브리핑 텍스트 / 설계 범위 (e.g. Web Detail Design)</label>
                        <input
                          type="text"
                          value={projRole}
                          onChange={(e) => setProjRole(e.target.value)}
                          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 focus:border-[#4D63FF] focus:outline-none text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Thumbnail configuration */}
                    <div className="space-y-3.5 bg-neutral-900/60 p-5 border border-white/5">
                      <div className="flex justify-between items-center">
                        <h4 className="ko-subtitle text-white text-xs font-bold">대표 썸네일 노출 이미지 에셋</h4>
                        {projImgUrl && (
                          <span className="text-[10px] text-[#1E4FFF] font-bold">설정됨</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* URL Input */}
                        <div className="space-y-1.5 text-left flex flex-col justify-between">
                          <div>
                            <label className="ko-subdesc text-white/40 text-[11px] block mb-1">외부 웹 이미지 주소 전달</label>
                            <input
                              type="text"
                              value={projImgUrl}
                              onChange={(e) => setProjImgUrl(e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-2.5 bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-[#1E4FFF]"
                            />
                            <p className="ko-subdesc text-[10px] text-white/30 mt-1.5">인터넷 링크 이미지 경로를 직접 입력할 수도 있습니다.</p>
                          </div>
                          
                          {projImgUrl && (
                            <div className="mt-3">
                              <span className="ko-subdesc text-white/40 text-[10px] block mb-1">썸네일 미리보기</span>
                              <div className="w-full max-w-[180px] aspect-video overflow-hidden border border-white/10 relative group bg-neutral-950">
                                <img src={projImgUrl} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setProjImgUrl("")}
                                  className="absolute top-1 right-1 p-1 bg-red-600/90 hover:bg-red-500 text-white text-[10px] transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                                >
                                  삭제
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* File Drag and Drop zone */}
                        <div className="space-y-1.5">
                          <label className="ko-subdesc text-white/40 text-[11px] block">로컬 기기에서 드래그 앤 드롭 또는 클릭해서 이미지 첨부</label>
                          <div
                            onDragOver={handleDragOverThumb}
                            onDragLeave={handleDragLeaveThumb}
                            onDrop={handleDropThumb}
                            className={`relative border border-dashed p-6 text-center transition-all cursor-pointer min-h-[140px] flex flex-col justify-center items-center ${
                              dragOverThumb
                                ? "border-[#1E4FFF] bg-[#1E4FFF]/10 scale-[0.99]"
                                : "border-white/20 bg-black/40 hover:border-[#1E4FFF]/50"
                            }`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "proj-thumb")}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                            />
                            <div className="space-y-2 pointer-events-none">
                              <ImageIcon className={`w-8 h-8 mx-auto transition-transform ${dragOverThumb ? "text-[#1E4FFF] scale-110" : "text-neutral-400"}`} />
                              <div className="space-y-0.5">
                                <p className="ko-desc text-xs text-white">이동하여 파일 드롭하거나 클릭하여 선택</p>
                                <p className="ko-subdesc text-[10px] text-white/40">지원 형식: JPG, PNG, WEBP, GIF</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DETAILS SCHEMA CONFIGS (Client / Purpose / Strategy Points) */}
                    <div className="space-y-4 border-t border-white/15 pt-6 text-left">
                      <h3 className="ko-subtitle text-[#FFFFFF] font-bold text-[15px] border-b border-white/10 pb-2">※ 작품 상세 페이지 내부 메타 데이터 기입란</h3>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="ko-subdesc text-white/60 text-xs">상단 개요 서브타이틀 (PROJECT DETAIL SUBTITLE)</label>
                          <input type="text" value={detCat} onChange={(e) => setDetCat(e.target.value)} placeholder="PROJECT OVERVIEW 문구 커스터마이징 (예: WEB PROJECT OVERVIEW)" className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="ko-subdesc text-white/60 text-xs">고객 / 클라이언트 (Client)</label>
                          <input type="text" value={detClient} onChange={(e) => setDetClient(e.target.value)} placeholder="클라이언트 사명" className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="ko-subdesc text-white/60 text-xs">프로젝트 설명</label>
                          <textarea rows={3} value={detPurpose} onChange={(e) => setDetPurpose(e.target.value)} placeholder="프로젝트 목적 및 전반적인 설명을 입력하세요" className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none resize-none leading-relaxed" />
                        </div>
                        <div className="space-y-1">
                          <label className="ko-subdesc text-white/60 text-xs">기여도</label>
                          <textarea rows={3} value={detWork} onChange={(e) => setDetWork(e.target.value)} placeholder="본인의 구체적인 작업 기여도를 입력하세요 (예: UI/UX Design, 100%)" className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none resize-none leading-relaxed" />
                        </div>
                        <div className="space-y-1">
                          <label className="ko-subdesc text-white/60 text-xs">사용된 툴</label>
                          <input type="text" value={detTools} onChange={(e) => setDetTools(e.target.value)} placeholder="사용 편집 툴 (예: Figma, Photoshop)" className="w-full px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="ko-subdesc text-white/60 text-xs">작업 시간</label>
                          <input type="text" value={detDate} onChange={(e) => setDetDate(e.target.value)} placeholder="개발 및 작업 기간 (예: 2025. 02 - 3 Weeks)" className="w-full px-3 py-2 bg-[#1E4FFF]/20 border border-[#1E4FFF]/40 text-white text-xs focus:outline-none" />
                        </div>
                      </div>
                    </div>

                    {/* SCROLLING RESULT IMAGES MANAGER BLOCK (결과 이미지: 스크롤형) */}
                    <div className="space-y-4 border-t border-white/10 pt-6">
                      <h4 className="ko-subtitle text-white text-xs font-bold">상세 스크롤 결과 이미지 리스트 ({detResultImages.length})</h4>
                      
                      {/* Add new result Image url */}
                      <div className="flex gap-2.5">
                        <input
                          type="text"
                          value={newResultImgUrl}
                          onChange={(e) => setNewResultImgUrl(e.target.value)}
                          placeholder="추가하고 싶은 큰 결과 이미지 URL 주소 전달"
                          className="flex-1 px-3 py-2 bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const cleaned = newResultImgUrl.trim();
                              if (cleaned) {
                                setDetResultImages((prev) => [...prev, cleaned]);
                                setNewResultImgUrl("");
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const cleaned = newResultImgUrl.trim();
                            if (cleaned) {
                              setDetResultImages((prev) => [...prev, cleaned]);
                              setNewResultImgUrl("");
                            }
                          }}
                          className="px-4 py-2 bg-neutral-800 text-white text-xs font-medium hover:bg-neutral-700 cursor-pointer"
                        >
                          주소 추가
                        </button>
                      </div>

                      {/* Computer Upload supporting for detail result list */}
                      <div className="space-y-1.5 p-3.5 bg-black border border-white/5 flex justify-between items-center">
                        <span className="ko-subdesc text-white/40 text-[11px]">내 PC에서 직접 고해상 결과 이미지 첨부:</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "proj-result")}
                          className="text-xs text-white/50 cursor-pointer border border-white/10 p-1"
                        />
                      </div>

                      {/* Render listed results thumb boxes */}
                      {detResultImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-900/40 p-4">
                          {detResultImages.map((u, index) => (
                            <div key={index} className="relative aspect-video bg-black border border-white/10 overflow-hidden group/thumb">
                              <img src={u} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                              <button
                                onClick={() => {
                                  setDetResultImages((prev) => prev.filter((_, idx) => idx !== index));
                                }}
                                className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-500 text-white rounded-none cursor-pointer duration-300 opacity-60 group-hover/thumb:opacity-100"
                                title="이미지 삭제"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                              <span className="absolute bottom-1 left-1 px-1 bg-black/70 text-white/70 text-[9px] en-subtitle font-bold">
                                IMG {index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Master Actions inside edit panels */}
                    <div className="pt-6 border-t border-white/15 flex justify-end gap-3.5">
                      <button
                        onClick={() => setEditingProject(null)}
                        className="px-6 py-3 border border-white/20 hover:border-white/50 text-white text-xs font-bold cursor-pointer hover:bg-white/5"
                      >
                        변경 사항 취소
                      </button>
                      <button
                        onClick={handleSaveProject}
                        className="px-8 py-3 bg-[#1E4FFF] text-white text-xs font-bold tracking-wider cursor-pointer hover:bg-[#4D63FF] transition-all flex items-center gap-1.5 border-none"
                      >
                        <RefreshCw className="w-4 h-4 animate-spin-slow" />
                        작품 저장 및 아카이빙 적용
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB 4: CONTACT SUBMISSIONS REVIEW PANEL */}
            {activeTab === "submissions" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="ko-subtitle text-white font-bold text-[18px]">클라이언트 견적 상담 현황 ({submissions.length})</h3>
                  <p className="ko-subdesc text-white/40 text-xs">포트폴리오의 CONTACT 카탈로그를 통과해 등록된 실시간 영업 문의 목록입니다.</p>
                </div>

                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className={`p-6 border text-left flex flex-col justify-between rounded-none duration-500 ${
                          sub.read
                            ? "bg-neutral-900/60 border-white/5 opacity-80"
                            : "bg-neutral-950 border-[#4D63FF]/30 hover:border-[#4D63FF]/80 relative"
                        }`}
                      >
                        {/* New label tag overlay */}
                        {!sub.read && (
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 py-0.5 px-2 bg-red-600 font-bold text-[9px] text-white tracking-wider animate-pulse uppercase">
                            NEW
                          </div>
                        )}

                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-white/5">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="ko-subtitle text-white font-extrabold text-[15px]">{sub.name}</span>
                                <span className={`px-2 py-0.5 text-[9px] font-bold tracking-widest en-subtitle rounded-none ${
                                  sub.service === "PREMIUM"
                                    ? "bg-purple-950/40 text-purple-400 border border-purple-500/30"
                                    : sub.service === "STANDARD"
                                    ? "bg-blue-950/40 text-blue-400 border border-blue-500/30"
                                    : "bg-neutral-900 text-neutral-400 border border-white/10"
                                }`}>
                                  {sub.service}
                                </span>
                              </div>
                              <p className="ko-subdesc text-white/40 text-[11px] font-sans">등록 시간: {new Date(sub.date).toLocaleString("ko-KR")}</p>
                            </div>

                            {/* Client Direct Communication parameters */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
                              <div className="flex items-center gap-1.5 text-white/60">
                                <Phone className="w-3.5 h-3.5 text-[#1E4FFF]" />
                                <span>{sub.phone}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-white/60">
                                <Mail className="w-3.5 h-3.5 text-[#7A5CFF]" />
                                <a href={`mailto:${sub.email}`} className="hover:underline">{sub.email}</a>
                              </div>
                            </div>
                          </div>

                          {/* Message core values */}
                          <div className="bg-black/40 p-4 border border-white/5 leading-relaxed text-xs">
                            <span className="ko-subdesc text-white/30 text-[10px] block mb-1 uppercase tracking-widest">SUBMISSION MASSAGE DETAILS:</span>
                            <p className="ko-desc text-white/80 whitespace-pre-wrap leading-relaxed">{sub.content}</p>
                          </div>
                        </div>

                        {/* Action parameters */}
                        <div className="pt-4 flex justify-end gap-2.5">
                          <button
                            onClick={() => toggleInquiryRead(sub.id)}
                            className="p-2 py-1 px-3 bg-[#1e1e1e] hover:bg-neutral-800 text-white/70 hover:text-white text-[11px] font-medium flex items-center gap-1 border border-white/10 cursor-pointer"
                          >
                            {sub.read ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                                읽지 않음으로 전환
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5 text-[#4D63FF]" />
                                읽음 확인 체크
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => deleteInquiry(sub.id)}
                            className="p-2 py-1 px-3 bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 text-[11px] font-medium flex items-center gap-1 border border-red-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            영구 삭제
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center border border-dashed border-white/10 bg-neutral-900 flex flex-col items-center justify-center">
                    <Sparkles className="w-8 h-8 text-neutral-600 mb-2 animate-pulse" />
                    <p className="ko-desc text-white/50 text-sm">수신된 세부 견적 신청서가 한 개도 없습니다.</p>
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      )}
    </div>
  );
}
