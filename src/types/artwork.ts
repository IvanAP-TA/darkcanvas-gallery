export type LangCode = "en" | "it" | "es" | "zh";
export type Localized = Partial<Record<LangCode, string>>;

export interface Artwork {
  id: string;
  slug?: string;
  title: string;
  year: number;
  technique: string;
  theme: string;
  dimensions: string;
  description: string;          // legacy single-language fallback
  descriptions?: Localized;      // preferred: per-language translations
  imageUrl: string;
  detailImages?: string[];
  saatchiUrl?: string;
  featured?: boolean;
  sortOrder?: number;
}

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface AboutSection {
  key: string;
  kind?: "text" | "list"; // defaults to 'text' for backward compat
  title_en?: string; title_it?: string; title_es?: string; title_zh?: string;
  // text sections
  body_en?: string;  body_it?: string;  body_es?: string;  body_zh?: string;
  // list sections
  items?: Localized[]; // each item is a localized string
}

export interface AboutContent {
  portrait_url?: string;
  sections: AboutSection[];
}

export interface SiteSettings {
  hero_image_url?: string;
  hero_image_thumb_url?: string;
  hero_srcset?: string;
  hero_sizes?: string;
  home_intro?: { en?: string; it?: string; es?: string; zh?: string };
}
