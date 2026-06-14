export interface HeroConfig {
  mainTitle: string;
  subTitle: string;
  imageUrl: string;
}

export interface ProjectDetail {
  client: string;
  category: string;
  work: string;
  date: string;
  tools: string;
  purpose: string;
  designPoint: string;
  resultImages: string[]; // URLs or base64 text
}

export interface Project {
  id: string;
  name: string;
  category: string; // WEB, BRANDING, BANNER, EDIT
  year: string;
  role: string; // e.g. "Web Detail Design"
  imageUrl: string;
  details: ProjectDetail;
}

export interface InquirySubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string; // BASIC, STANDARD, PREMIUM
  content: string;
  date: string; // ISO date string
  read: boolean;
}

export interface AppConfig {
  hero: HeroConfig;
  categories: string[];
  projects: Project[];
}
