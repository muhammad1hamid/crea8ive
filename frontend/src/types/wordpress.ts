export interface WPPage {
  id: number;
  slug: string;
  status: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
  date: string;
  modified: string;
  parent: number;
  menu_order: number;
  yoast_head_json?: WPYoastMeta;
  _embedded?: WPEmbedded;
}

export interface WPPost {
  id: number;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
  date: string;
  modified: string;
  categories: number[];
  tags: number[];
  author: number;
  yoast_head_json?: WPYoastMeta;
  _embedded?: WPEmbedded;
  _crea8ivFaqs?: Array<{ question: string; answer: string }>;
  _crea8ivCoverAlt?: string;
  _crea8ivInternalLinks?: string[];
  _crea8ivRawMarkdown?: string;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPMenuItem {
  id: number;
  title: { rendered: string };
  url: string;
  parent: number;
  menu_order: number;
  classes: string[];
  target: string;
  attr_title: string;
  object: string;
  object_id: number;
}

export interface WPYoastMeta {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: Array<{ url: string; width: number; height: number }>;
  og_url?: string;
  og_site_name?: string;
  twitter_card?: string;
  schema?: object;
}

export interface WPEmbedded {
  'wp:featuredmedia'?: WPMedia[];
  author?: Array<{ name: string; avatar_urls: Record<string, string> }>;
  'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPService {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: WPEmbedded;
}

export type ContentType = WPPage | WPPost;
