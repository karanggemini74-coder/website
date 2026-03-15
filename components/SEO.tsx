import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "stock market, equity research, SEBI registered, investment advisor, Karan Vijayvargiya, fundamental analysis, long term investing", 
  image = "https://lh3.googleusercontent.com/d/12GfNjWA-HHrpeqmKhSyCgnp7hbAhcneF", 
  url = window.location.href,
  type = 'website'
}) => {
  const siteTitle = "Karan Vijayvargiya | SEBI Registered Research Analyst";
  const fullTitle = title.includes('|') ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
