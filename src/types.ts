
export enum Language {
  EN = 'EN',
  SW = 'SW'
}

export type Industry = 'CHURCH' | 'SCHOOL' | 'HOTEL' | 'CORPORATE' | 'MINING' | 'LOGISTICS' | 'FINANCE';

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  impact: string;
  features: string[];
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  industry: Industry;
  thumbnail: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  content: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
  type: 'SaaS' | 'Enterprise' | 'Digital';
  image?: string;
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  process: { step: string; detail: string }[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt: any;
}
