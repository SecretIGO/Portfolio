export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type SocialName = 'twitter' | 'facebook' | 'linkedin' | 'github';

export type SocialItem = {
  name: SocialName;
  href: string;
};

export const PAGE_NAV: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const SITE_SECTIONS: NavItem[] = [
  { id: 'recognitions', label: 'Recognitions', href: '#recognitions' },
  { id: 'awards', label: 'Awards', href: '#awards' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experiments', label: 'Experiments', href: '#devops' },
  { id: 'uhh', label: 'uhh', href: '#uhh' },
];

// Social links (icons are mapped in components)
export const SOCIALS: SocialItem[] = [
  { name: 'twitter', href: '#twitter' },
  { name: 'facebook', href: 'https://www.facebook.com/MarschExecutioner26/' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/johanz-david-n-tolentino-b0944a2a9/' },
  { name: 'github', href: 'https://github.com/SecretIGO' },
];
