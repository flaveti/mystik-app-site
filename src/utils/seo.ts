// SEO Metadata by Language
export const seoMetadata = {
  'pt-BR': {
    title: 'Mystik - Oráculos com IA 24/7 | Consulte Tarot, Astrologia e Guias Espirituais a Qualquer Hora',
    description: 'Oráculos de IA disponíveis 24h! Consulte tarot, astrologia, numerologia quando quiser. Conecte-se com guias espirituais e receba orientação personalizada instantânea.',
    keywords: 'oráculos IA, tarot IA 24 horas, consulta espiritual online, tarot online, astrologia IA, guias espirituais, leitura instantânea, oráculo digital, consulta mística',
  },
  'pt': {
    title: 'Mystik - Oráculos com IA 24/7 | Consulte Tarot e Guias Espirituais Sempre',
    description: 'Oráculos de IA disponíveis 24h! Consulte tarot, astrologia, numerologia quando quiser. Conecte-se com guias espirituais e receba orientação personalizada.',
    keywords: 'oráculos IA, tarot IA, consulta espiritual, tarot online, astrologia, guias espirituais, leitura instantânea',
  },
  'en': {
    title: 'Mystik - 24/7 AI Oracles | Consult Tarot, Astrology & Spiritual Guides Anytime',
    description: 'AI oracles available 24/7! Consult tarot, astrology, numerology whenever you want. Connect with spiritual guides and receive instant personalized guidance.',
    keywords: 'AI oracles, 24/7 tarot AI, online spiritual consultation, instant tarot, AI astrology, spiritual guides, digital oracle, mystic readings, instant guidance',
  },
  'es': {
    title: 'Mystik - Oráculos con IA 24/7 | Consulta Tarot, Astrología y Guías Espirituales Siempre',
    description: '¡Oráculos de IA disponibles 24h! Consulta tarot, astrología, numerología cuando quieras. Conéctate con guías espirituales y recibe orientación personalizada instantánea.',
    keywords: 'oráculos IA, tarot IA 24 horas, consulta espiritual online, tarot online, astrología IA, guías espirituales, lectura instantánea, oráculo digital',
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
