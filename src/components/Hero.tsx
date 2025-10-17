import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';
import appStoreImage from 'figma:asset/afe736262e2cc69ba0ede3895327dcb683b63935.png';
import googlePlayImage from 'figma:asset/aa91c242da8aca2be6b0f5c65c2df8619f0d68c7.png';
import heroCardImage from 'figma:asset/eba28ab63d9e0fd215e37e04e75301fa01b2e0aa.png';
import { useLanguage } from './LanguageProvider';
import { MouseFollower } from './MouseTracker';

export function Hero() {
  const { t } = useLanguage();
  
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-violet-500/40 to-purple-500/40 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-56 h-56 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge variant="secondary" className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30">
                <Sparkles className="h-3 w-3 mr-2" />
                {t('hero.badge')}
              </Badge>
            </motion.div>

            <MouseFollower intensity={0.02}>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t('hero.title')}
                <br />
                <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </motion.h1>
            </MouseFollower>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.button
              onClick={scrollToWaitlist}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {t('hero.notify')} →
            </motion.button>
          </motion.div>

          {/* Visual - App Screenshot from provided image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative max-w-sm mx-auto lg:max-w-md">
              {/* Glowing background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-violet-500/20 to-blue-500/30 rounded-3xl blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Phone mockup container */}
              <div className="relative bg-gradient-to-b from-gray-900 to-black p-3 rounded-[3rem] shadow-2xl border border-gray-800">
                <div className="bg-black rounded-[2.5rem] overflow-hidden">
                  {/* App screenshot with animated card */}
                  <div className="relative overflow-hidden bg-gradient-to-b from-purple-900/50 via-violet-900/50 to-blue-900/50 flex items-center justify-center">
                    <img 
                      src={heroCardImage}
                      alt="Mystik App Preview"
                      className="w-full h-[600px] object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Store badges positioned on the image */}
                    <motion.div
                      className="absolute bottom-6 right-6 flex flex-col gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                      >
                        <img 
                          src={appStoreImage} 
                          alt={t('hero.comingSoonIOS')}
                          className="h-12 opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                      >
                        <img 
                          src={googlePlayImage} 
                          alt={t('hero.comingSoonAndroid')}
                          className="h-12 opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/20"
                animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-8 w-8 text-purple-400" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/20"
                animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Sparkles className="h-6 w-6 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
