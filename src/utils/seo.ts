// SEO Metadata by Language
export const seoMetadata = {
  'pt-BR': {
    title: 'Mystik - Em Breve | Oráculos IA + Consultas com Guias Espirituais 24/7',
    description: 'Em breve: Oráculos de IA instantâneos E consultas particulares com guias espirituais profissionais. Tarot, astrologia, numerologia disponíveis 24h. Escolha entre IA rápida ou orientação humana personalizada.',
    keywords: 'oráculos IA, guias espirituais, consulta particular, tarot online, astrologia IA, consulta espiritual privada, médium online, leitura espiritual, tarot 24 horas, orientação espiritual',
  },
  'pt': {
    title: 'Mystik - Em Breve | Oráculos IA + Consultas com Guias Espirituais',
    description: 'Em breve: Oráculos de IA instantâneos E consultas com guias espirituais. Tarot, astrologia, numerologia 24h. IA rápida ou orientação humana personalizada.',
    keywords: 'oráculos IA, guias espirituais, consulta particular, tarot online, astrologia, consulta espiritual, médium online',
  },
  'en': {
    title: 'Mystik - Coming Soon | AI Oracles + Private Sessions with Spiritual Guides 24/7',
    description: 'Coming soon: Instant AI oracles AND private consultations with professional spiritual guides. Tarot, astrology, numerology available 24/7. Choose between fast AI or personalized human guidance.',
    keywords: 'AI oracles, spiritual guides, private consultation, online tarot, AI astrology, spiritual session, online medium, spiritual reading, 24/7 tarot, spiritual guidance',
  },
  'es': {
    title: 'Mystik - Próximamente | Oráculos IA + Consultas con Guías Espirituales 24/7',
    description: 'Próximamente: Oráculos de IA instantáneos Y consultas privadas con guías espirituales profesionales. Tarot, astrología, numerología disponibles 24h. IA rápida u orientación humana personalizada.',
    keywords: 'oráculos IA, guías espirituales, consulta privada, tarot online, astrología IA, consulta espiritual, médium online, lectura espiritual',
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
