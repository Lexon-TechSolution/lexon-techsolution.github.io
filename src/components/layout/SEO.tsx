import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Lexon Tech Solutions | Intelligent Automation & Cloud Systems", 
  description = "Lexon Tech Solutions provides enterprise-grade automation, ERP systems, and cloud infrastructure for churches and businesses across Africa.",
  image = "https://lexonchurch.com/og-image.jpg",
  url = "https://lexonchurch.com"
}) => {
  const siteTitle = title.includes("Lexon") ? title : `${title} | Lexon Tech Solutions`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="IT Solutions Africa, Church Management System Africa, ERP systems, eMinistry portal, Lexon Tech, Business Automation Africa, Cloud Hosting Africa" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
