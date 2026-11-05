export type QatarLink = { label: string; href: string; detail?: string };
export type QatarSection = { title: string; body?: string; items?: string[]; links?: QatarLink[] };
export type QatarPage = {
  slug: string; title: string; description: string; heading: string; intro: string;
  kind: 'home' | 'hub' | 'service' | 'industry' | 'article' | 'contact' | 'pricing' | 'work' | 'tool' | 'research';
  eyebrow?: string; sections: QatarSection[]; faqs?: { question: string; answer: string }[];
  related?: QatarLink[]; cta?: string; sources?: QatarLink[]; noindex?: boolean;
};
