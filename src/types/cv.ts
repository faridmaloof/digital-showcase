export type Locale = 'es' | 'en';

export type LocalizedText = Record<Locale, string>;

export interface PersonalInfo {
  name: string;
  title: LocalizedText;
  tagline: LocalizedText;
  location: LocalizedText;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  company: string;
  role: LocalizedText;
  period: string;
  location: LocalizedText;
  highlights: LocalizedText[];
  technologies: string[];
}

export interface ProjectItem {
  name: LocalizedText;
  period: string;
  context: LocalizedText;
  impact: LocalizedText;
  technologies: string[];
}

export interface SkillGroup {
  name: LocalizedText;
  items: string[];
}

export interface EducationItem {
  institution: string;
  degree: LocalizedText;
  period: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  name: string;
  level: LocalizedText;
}

export interface RecommendationItem {
  author: string;
  quote: LocalizedText;
}

export interface FeaturedActivityItem {
  title: LocalizedText;
  note: LocalizedText;
}

export interface CVData {
  personal: PersonalInfo;
  summary: LocalizedText;
  sections: Record<
    | 'profile'
    | 'experience'
    | 'projects'
    | 'skills'
    | 'education'
    | 'certifications'
    | 'languages'
    | 'recommendations'
    | 'featured'
    | 'contact',
    LocalizedText
  >;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  recommendations: RecommendationItem[];
  featuredActivity: FeaturedActivityItem[];
}
