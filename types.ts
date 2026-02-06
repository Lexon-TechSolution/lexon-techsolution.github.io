
export enum Language {
  EN = 'EN',
  SW = 'SW'
}

export type Industry = 'CHURCH' | 'SCHOOL' | 'HOTEL' | 'CORPORATE';

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  impact: string;
  features: string[];
  icon: string;
}

export interface Dictionary {
  heroTitle: string;
  heroSubtext: string;
  ctaDemo: string;
  ctaQuote: string;
  solutionsTitle: string;
  triadTitle: string;
  triadSubtext: string;
  roiTitle: string;
  roiSubtext: string;
  whyLexonTitle: string;
  contactTitle: string;
}
