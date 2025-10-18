import { useState, useEffect } from 'react';
import { LanguageProvider } from './components/LanguageProvider';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { MediumSection } from './components/MediumSection';
import { FAQ } from './components/FAQ';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { AdminDebug } from './components/AdminDebug';
import { Toaster } from './components/ui/sonner';
import { ParticleBackground } from './components/ParticleBackground';
import { MouseTracker } from './components/MouseTracker';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

type Page = 'home' | 'terms' | 'privacy' | 'admin-login' | 'admin' | 'debug';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home'); // Start on home page
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Set page title, favicon, and meta tags for sharing (multilingual)
  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || navigator.languages?.[0] || 'pt-BR';
    let lang: 'pt-BR' | 'en' | 'es' = 'pt-BR'; // default
    
    if (browserLang.startsWith('en')) {
      lang = 'en';
    } else if (browserLang.startsWith('es')) {
      lang = 'es';
    }
    
    // Multilingual content
    const content = {
      'pt-BR': {
        title: 'Mystik App - Espiritualidade e IA',
        description: 'Descubra o que o Universo quer te dizer. Tiragens personalizadas de tarô, runas, I-Ching e mais, com interpretação por IA. Conecte-se com médiuns especialistas.',
        ogTitle: 'Mystik App - Espiritualidade Encontra Tecnologia',
        ogDescription: 'Uma fusão entre sabedoria ancestral e inteligência artificial. Realize tiragens personalizadas, receba leituras inteligentes e conecte-se com o divino.',
      },
      'en': {
        title: 'Mystik App - Spirituality & AI',
        description: 'Discover what the Universe wants to tell you. Personalized tarot, runes, I-Ching readings and more, with AI interpretation. Connect with expert mediums.',
        ogTitle: 'Mystik App - Spirituality Meets Technology',
        ogDescription: 'A fusion between ancient wisdom and cutting-edge AI. Perform personalized readings, receive intelligent interpretations, and connect with the divine.',
      },
      'es': {
        title: 'Mystik App - Espiritualidad e IA',
        description: 'Descubre lo que el Universo quiere decirte. Lecturas personalizadas de tarot, runas, I-Ching y más, con interpretación de IA. Conéctate con médiums expertos.',
        ogTitle: 'Mystik App - La Espiritualidad Encuentra la Tecnología',
        ogDescription: 'Una fusión entre sabiduría ancestral e inteligencia artificial de vanguardia. Realiza lecturas personalizadas, recibe interpretaciones inteligentes y conéctate con lo divino.',
      },
    };
    
    const selected = content[lang];
    const currentUrl = window.location.href;
    const ogImageUrl = 'https://images.unsplash.com/photo-1754851539824-5a87c5c7cb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';
    
    // Set page title
    document.title = selected.title;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = selected.description;
    
    // Open Graph meta tags
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:title', content: selected.ogTitle },
      { property: 'og:description', content: selected.ogDescription },
      { property: 'og:image', content: ogImageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Mystik App - Tarot cards and mystical spiritual imagery' },
      { property: 'og:site_name', content: 'Mystik App' },
      { property: 'og:locale', content: lang === 'pt-BR' ? 'pt_BR' : lang === 'es' ? 'es_ES' : 'en_US' },
    ];
    
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
    
    // Add alternate language tags for SEO
    const alternateLangs = [
      { hreflang: 'pt-BR', href: currentUrl },
      { hreflang: 'en', href: currentUrl },
      { hreflang: 'es', href: currentUrl },
      { hreflang: 'x-default', href: currentUrl },
    ];
    
    // Remove old alternate links
    document.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());
    
    alternateLangs.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });
    
    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: selected.ogTitle },
      { name: 'twitter:description', content: selected.ogDescription },
      { name: 'twitter:image', content: ogImageUrl },
      { name: 'twitter:image:alt', content: 'Mystik App - Tarot cards and mystical spiritual imagery' },
    ];
    
    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
    
    // Create a mystical purple moon favicon
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#6366F1;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#moonGradient)"/>
        <circle cx="35" cy="35" r="8" fill="rgba(255,255,255,0.3)"/>
        <circle cx="60" cy="45" r="12" fill="rgba(255,255,255,0.2)"/>
        <circle cx="40" cy="65" r="6" fill="rgba(255,255,255,0.25)"/>
      </svg>
    `;
    
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.type = 'image/svg+xml';
      newFavicon.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
      document.head.appendChild(newFavicon);
    }
  }, []);

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (page: 'terms' | 'privacy' | 'admin') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
    setCurrentPage('admin-login');
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleCancelLogin = () => {
    setCurrentPage('home');
  };

  const handleDebugAccess = () => {
    setCurrentPage('debug');
  };

  const handleBackFromDebug = () => {
    setCurrentPage('home');
  };

  const handleGoToDebug = () => {
    setCurrentPage('debug');
  };

  // Debug mode: hold Shift and press D-E-B-U-G quickly
  useEffect(() => {
    let keys = '';
    let shiftHeld = false;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        shiftHeld = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        shiftHeld = false;
        keys = '';
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!shiftHeld) return;
      
      keys += e.key.toLowerCase();
      
      if (keys.includes('debug')) {
        setCurrentPage('debug');
        keys = '';
      }
      
      // Keep only last 10 characters
      if (keys.length > 10) {
        keys = keys.slice(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen relative">
          {currentPage !== 'admin' && currentPage !== 'admin-login' && currentPage !== 'debug' && <ParticleBackground density={30} />}
          {currentPage !== 'admin' && currentPage !== 'admin-login' && currentPage !== 'debug' && <MouseTracker />}
          
          {currentPage !== 'admin' && currentPage !== 'admin-login' && currentPage !== 'debug' && (
            <Header onAdminAccess={handleAdminAccess} />
          )}
          
          <main className="relative z-10">
            {currentPage === 'home' && (
              <>
                <Hero />
                <About />
                <Features />
                <MediumSection />
                <FAQ />
                <Waitlist />
              </>
            )}
            
            {currentPage === 'terms' && <TermsPage onBack={navigateToHome} />}
            {currentPage === 'privacy' && <PrivacyPage onBack={navigateToHome} />}
            {currentPage === 'admin-login' && (
              <AdminLogin onLogin={handleAdminLogin} onCancel={handleCancelLogin} />
            )}
            {currentPage === 'admin' && isAdminAuthenticated && (
              <AdminPanel onLogout={handleAdminLogout} onDebug={handleGoToDebug} />
            )}
            {currentPage === 'debug' && <AdminDebug onBack={handleBackFromDebug} />}
          </main>
          
          {currentPage === 'home' && <Footer onNavigate={navigateToPage} />}
          
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}