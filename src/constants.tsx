import React from 'react';
import { 
  GraduationCap, 
  Hotel, 
  Building2, 
  Layout, 
  Cpu, 
  PenTool, 
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  Lightbulb,
  Target,
  Newspaper,
  Shield,
  Zap,
  Globe,
  Database,
  Code2,
  Box,
  Layers,
  Smartphone,
  BarChart3,
  Search,
  MessageCircle,
  Clock,
  Briefcase,
  QrCode,
  CreditCard
} from 'lucide-react';
import { Service, Project, Product } from './types';
import churchPosterImg from './assets/images/lexon_church_poster_1782554597194.jpg';
import lexonSchoolDashboardImg from './assets/images/lexon_school_dashboard_1781473641711.jpg';
import lexonRetailErpPosterImg from './assets/images/lexon_retail_erp_poster_1782560676417.jpg';
import lexonChurchPromoImg from './assets/images/lexon_church_promo_1781473616005.jpg';


export const SERVICES: Service[] = [
  {
    id: 'school-management',
    title: 'Lexon School Systems',
    slug: 'ai-development', // Keep compatible slug
    description: 'Centralized school management platforms covering student results portals, automatic report cards, and parent SMS bulletin notification logs.',
    icon: 'GraduationCap',
    features: ['Instant student result rosters', 'Pre-school to high school grading databases', 'One-click mass parent notifications', 'Academic auditing and staff files'],
    process: [
      { step: 'Needs Mapping', detail: 'Mapping class sizes, grading formats, and curriculum indicators.' },
      { step: 'Onboarding', detail: 'Onboarding teacher accounts, parent registers, and past archives into system files.' },
      { step: 'Deployment', detail: 'Deploying custom login portals for staff, students, and school leaders.' },
      { step: 'Training', detail: 'Providing local systems training and operational run-books.' }
    ]
  },
  {
    id: 'eministry-suite',
    title: 'eMinistry Church Suite',
    slug: 'saas-development',
    description: 'Comprehensive software platform designed for modern churches. Maintain active member logs, cell groups, ministry departments, and newsletters. Learn more at lexonchurch.com.',
    icon: 'Layers',
    features: ['Secure member registration rosters', 'Cell group & location tracking maps', 'Automated announcements and newsletters', 'Department calendars and event dashboards'],
    process: [
      { step: 'Setup', detail: 'Configuring church branches, registry templates, and staff profiles.' },
      { step: 'Launch', detail: 'Publishing active member directories and communications modules.' }
    ]
  },
  {
    id: 'enterprise-erp',
    title: 'Retail ERP & Inventory SaaS',
    slug: 'blockchain-systems',
    description: 'Cloud accounting and inventory tracking database packages tailored specifically for wholesale, pharmacy, and retail merchants.',
    icon: 'Briefcase',
    features: ['Real-time barcode inventory logs', 'Stock expiration and balance indicators', 'Consolidated multi-branch warehouse audits', 'Taxes and inventory reconciliation histories'],
    process: [
      { step: 'Integration', detail: 'Importing stock sheets and barcoding system parameters.' }
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'eministry-grace',
    name: 'eMinistry Church System',
    tagline: 'Makanisa / Religious Institutions Suite',
    description: 'A comprehensive database management and department tracking platform designed specifically for churches. Features automated Member registers, cell group folders, and custom bulletins. Visit our dedicated product directly at lexonchurch.com.',
    icon: 'Layers',
    price: '$25, $55, or $75 / month',
    features: [
      'Digital member registries and cell groups tracking',
      'Automated custom SMS member alerts and announcements',
      'Secure department logs and administrative registers',
      'Direct redirection to our platform at lexonchurch.com'
    ],
    type: 'Digital',
    image: churchPosterImg,
    link: 'https://lexonchurch.com'
  },
  {
    id: 'mssis-school',
    name: 'Lexon School Management System',
    tagline: 'School administration & automatic report cards',
    description: 'Perfect for Preschool, Primary, and Secondary high schools in Tanzania. A centralized cloud solution that automatically tracks student invoicing, coordinates report cards, handles parent notifications, and maintains class curriculum files.',
    icon: 'GraduationCap',
    price: 'Tsh 50,000 / month',
    features: [
      'Comprehensive student profile & division results databases',
      'Instant parent notifications of attendance & results',
      'Electronic dashboards for school staff and administrators',
      'Custom division reports and grading rubrics'
    ],
    type: 'SaaS',
    image: lexonSchoolDashboardImg
  },
  {
    id: 'accounting-software',
    name: 'Lexon Retail ERP SaaS',
    tagline: 'All-in-One Cloud Invoicing & Stock accounting',
    description: 'Designed for supermarkets, pharmacies, wholesale stores, and retail enterprises. Seamlessly compile inventory counts, barcode register details, and supplier balances on-the-move. Fully integrated with Tanzania business guidelines.',
    icon: 'Briefcase',
    price: '$20 / month',
    features: [
      'Real-time automated inventory alert summaries',
      'Continuous barcode scanning hardware support',
      'Stock ledger records with instant tracking indices',
      'Multi-branch inventory registry synchronization'
    ],
    type: 'SaaS',
    image: lexonRetailErpPosterImg
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'national-school-rollout',
    title: 'Nationwide School Database Deployment',
    client: 'Tanzanian High School Cooperative',
    industry: 'FINANCE', // Keeps type safety with Enum
    thumbnail: lexonSchoolDashboardImg,
    description: 'A cloud-based real-time student system coordinating rosters, grades, parent letters, and report cards for over 150 school centers.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    metrics: [
      { label: 'Reporting Accuracy', value: '100% Reliable' },
      { label: 'Report Dispatch Speed', value: '+95%' }
    ],
    content: 'Case study analysis details...',
    slug: 'national-school-rollout'
  },
  {
    id: 'eministry-regional',
    title: 'eMinistry Platform Integration',
    client: 'Regional Church Diocese Association',
    industry: 'FINANCE',
    thumbnail: lexonChurchPromoImg,
    description: 'Database design and systems synchronization for active congregation profiles, automating branch calendars, and deploying centralized administrative rosters across provinces.',
    technologies: ['React', 'TypeScript', 'Go', 'PostgreSQL'],
    metrics: [
      { label: 'Roster Synchronization', value: '< 2 Seconds' },
      { label: 'Member Retention index', value: '+34% Growth' }
    ],
    content: 'Case study analysis details...',
    slug: 'eministry-regional'
  }
];

export const getIcon = (name: string, size = 24) => {
  const icons: Record<string, React.ReactNode> = {
    'GraduationCap': <GraduationCap size={size} />,
    'Hotel': <Hotel size={size} />,
    'Building2': <Building2 size={size} />,
    'Layout': <Layout size={size} />,
    'Cpu': <Cpu size={size} />,
    'PenTool': <PenTool size={size} />,
    'TrendingUp': <TrendingUp size={size} />,
    'Mail': <Mail size={size} />,
    'Phone': <Phone size={size} />,
    'MapPin': <MapPin size={size} />,
    'Facebook': <Facebook size={size} />,
    'Linkedin': <Linkedin size={size} />,
    'Twitter': <Twitter size={size} />,
    'Lightbulb': <Lightbulb size={size} />,
    'Target': <Target size={size} />,
    'Newspaper': <Newspaper size={size} />,
    'Shield': <Shield size={size} />,
    'Zap': <Zap size={size} />,
    'Globe': <Globe size={size} />,
    'Database': <Database size={size} />,
    'Code2': <Code2 size={size} />,
    'Box': <Box size={size} />,
    'Layers': <Layers size={size} />,
    'Smartphone': <Smartphone size={size} />,
    'QrCode': <QrCode size={size} />,
    'CreditCard': <CreditCard size={size} />,
    'BarChart3': <BarChart3 size={size} />,
    'Search': <Search size={size} />,
    'MessageCircle': <MessageCircle size={size} />,
    'Clock': <Clock size={size} />,
    'Briefcase': <Briefcase size={size} />
  };
  return icons[name] || <Cpu size={size} />;
};
