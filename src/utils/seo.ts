// SEO Metadata by Language
export const seoMetadata = {
  'pt-BR': {
    title: 'Mystik - Encontre Guias Espirituais e Leituras com IA | Espiritualidade Digital',
    description: 'Conecte-se com guias espirituais profissionais e receba leituras personalizadas com IA. Tarot, astrologia, numerologia e orientação espiritual online.',
    keywords: 'guias espirituais, leituras espirituais, tarot online, astrologia, numerologia, espiritualidade, IA espiritual, orientação espiritual, consulta espiritual',
  },
  'pt': {
    title: 'Mystik - Encontre Guias Espirituais e Leituras com IA | Espiritualidade Digital',
    description: 'Conecte-se com guias espirituais profissionais e receba leituras personalizadas com IA. Tarot, astrologia, numerologia e orientação espiritual online.',
    keywords: 'guias espirituais, leituras espirituais, tarot online, astrologia, numerologia, espiritualidade',
  },
  'en': {
    title: 'Mystik - Find Spiritual Guides & AI-Powered Readings | Digital Spirituality',
    description: 'Connect with professional spiritual guides and receive personalized AI readings. Tarot, astrology, numerology and spiritual guidance online.',
    keywords: 'spiritual guides, spiritual readings, online tarot, astrology, numerology, spirituality, AI spirituality, spiritual guidance, spiritual consultation',
  },
  'es': {
    title: 'Mystik - Encuentra Guías Espirituales y Lecturas con IA | Espiritualidad Digital',
    description: 'Conéctate con guías espirituales profesionales y recibe lecturas personalizadas con IA. Tarot, astrología, numerología y orientación espiritual online.',
    keywords: 'guías espirituales, lecturas espirituales, tarot online, astrología, numerología, espiritualidad, IA espiritual, orientación espiritual',
  },
};

export function updateSeoMeta(language: string = 'pt-BR') {
  const meta = seoMetadata[language as keyof typeof seoMetadata] || seoMetadata['pt-BR'];
  
  // Update title
  document.title = meta.title;
  
  // Update meta description
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', meta.description);
  }
  
  // Update meta keywords
  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta) {
    keywordsMeta.setAttribute('content', meta.keywords);
  }
  
  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', meta.title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', meta.description);
  }
  
  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', meta.title);
  }
  
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', meta.description);
  }
  
  // Update html lang attribute
  document.documentElement.setAttribute('lang', language);
}

export function detectUserLanguage(): string {
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam) {
    return langParam;
  }
  
  // Check path (/en, /es, etc)
  const pathLang = window.location.pathname.split('/')[1];
  if (['en', 'es', 'pt'].includes(pathLang)) {
    return pathLang === 'pt' ? 'pt-BR' : pathLang;
  }
  
  // Check browser language
  const browserLang = navigator.language || navigator.languages?.[0] || 'pt-BR';
  
  // Map browser language to supported languages
  if (browserLang.startsWith('pt')) return 'pt-BR';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';
  
  return 'pt-BR'; // Default to Brazilian Portuguese
}
