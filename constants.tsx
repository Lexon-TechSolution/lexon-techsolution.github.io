
import React from 'react';
import { 
  Church, 
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
  Newspaper
} from 'lucide-react';
import { Language, Dictionary, Solution } from './types';

export const TRANSLATIONS: Record<Language, Dictionary> = {
  [Language.EN]: {
    heroTitle: "Transforming Businesses Through Intelligent Automation",
    heroSubtext: "We eliminate manual paperwork, reduce operational costs, and increase revenue using smart digital systems tailored for your industry.",
    ctaDemo: "Request a Free Demo",
    ctaQuote: "Get a Custom Quote",
    solutionsTitle: "Industry-Specific Solutions",
    triadTitle: "The Lexon Triad Model",
    triadSubtext: "Powering your growth through a seamless synergy of development, design, and market acquisition.",
    roiTitle: "Calculate Your ROI",
    roiSubtext: "See exactly how much time and money automation can save your business.",
    whyLexonTitle: "Why Choose Lexon?",
    contactTitle: "Get In Touch",
  },
  [Language.SW]: {
    heroTitle: "Kubadilisha Biashara Kupitia Mifumo ya Akili ya Kidijitali",
    heroSubtext: "Tunaondoa karatasi za mikono, tunapunguza gharama za uendeshaji, na kuongeza mapato kwa kutumia mifumo mahiri iliyoundwa kwa ajili ya sekta yako.",
    ctaDemo: "Omba Demo ya Bure",
    ctaQuote: "Pata Makadirio ya Gharama",
    solutionsTitle: "Mifumo Kulingana na Sekta",
    triadTitle: "Mfumo wa Lexon Triad",
    triadSubtext: "Kuimarisha ukuaji wako kupitia ushirikiano wa maendeleo, ubunifu, na ukuaji wa soko.",
    roiTitle: "Kokotoa Faida Yako (ROI)",
    roiSubtext: "Angalia ni kiasi gani cha muda na fedha unachoweza kuokoa kupitia mifumo ya kisasa.",
    whyLexonTitle: "Kwa Nini Uchague Lexon?",
    contactTitle: "Wasiliana Nasi",
  }
};

export const SOLUTIONS: Solution[] = [
  {
    id: 'church',
    name: 'Lexon Grace',
    tagline: 'Church Automation',
    impact: 'Streamline ministry operations and engage your congregation digitally.',
    icon: 'Church',
    features: ['Member database system', 'Digital tithe tracking', 'Automated SMS notifications', 'Attendance dashboards']
  },
  {
    id: 'school',
    name: 'Lexon Academic',
    tagline: 'School Management',
    impact: 'The ultimate digital campus for modern educational institutions.',
    icon: 'GraduationCap',
    features: ['Student results management', 'Fee tracking automation', 'Parent & teacher portals', 'Communication automation']
  },
  {
    id: 'hotel',
    name: 'Lexon Stay',
    tagline: 'Hospitality & Hotels',
    impact: 'Maximize occupancy and guest satisfaction with zero manual friction.',
    icon: 'Hotel',
    features: ['Real-time booking engine', 'Inventory management', 'Automated guest billing', 'Analytics & reporting']
  },
  {
    id: 'corporate',
    name: 'Lexon Enterprise',
    tagline: 'Corporate Automation',
    impact: 'Custom ERP systems designed for high-performance productivity.',
    icon: 'Building2',
    features: ['Sales tracking', 'Expense management', 'Staff productivity metrics', 'Integrated workflow tools']
  },
  {
    id: 'web',
    name: 'Lexon Presence',
    tagline: 'Premium Web Design',
    impact: 'High-converting websites built to command authority and ROI.',
    icon: 'Layout',
    features: ['Brand authority focus', 'SEO optimization', 'Custom user experiences', 'Fast loading & mobile first']
  }
];

export const getIcon = (name: string, size = 24) => {
  switch (name) {
    case 'Church': return <Church size={size} />;
    case 'GraduationCap': return <GraduationCap size={size} />;
    case 'Hotel': return <Hotel size={size} />;
    case 'Building2': return <Building2 size={size} />;
    case 'Layout': return <Layout size={size} />;
    case 'Cpu': return <Cpu size={size} />;
    case 'PenTool': return <PenTool size={size} />;
    case 'TrendingUp': return <TrendingUp size={size} />;
    case 'Mail': return <Mail size={size} />;
    case 'Phone': return <Phone size={size} />;
    case 'MapPin': return <MapPin size={size} />;
    case 'Facebook': return <Facebook size={size} />;
    case 'Linkedin': return <Linkedin size={size} />;
    case 'Twitter': return <Twitter size={size} />;
    case 'Lightbulb': return <Lightbulb size={size} />;
    case 'Target': return <Target size={size} />;
    case 'Newspaper': return <Newspaper size={size} />;
    default: return <Cpu size={size} />;
  }
};
