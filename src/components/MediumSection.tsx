import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, Globe, Headphones, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import mediumImage from 'figma:asset/a00152d524d1531e54e8e3d5dba494e0a9e9c88a.png';
import { MediumSignupDialog } from './MediumSignupDialog';

export function MediumSection() {
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);

  const benefits = [
    {
      icon: TrendingUp,
      title: t('medium.benefit1.title'),
      description: t('medium.benefit1.description'),
    },
    {
      icon: Globe,
      title: t('medium.benefit2.title'),
      description: t('medium.benefit2.description'),
    },
    {
      icon: Headphones,
      title: t('medium.benefit3.title'),
      description: t('medium.benefit3.description'),
    }
  ];

  const handleMediumSignup = () => {
    setDialogOpen(true);
  };

  return (
    <section id="mediums" className="relative py-24 overflow-hidden bg-gradient-to-b from-muted/20 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30">
              <Sparkles className="h-3 w-3 mr-2" />
              {t('medium.badge')}
            </Badge>

            <h2 className="text-4xl md:text-5xl mb-6">
              {t('medium.title')}
            </h2>

            <p className="text-lg text-muted-foreground mb-4">
              {t('medium.description')}
            </p>

            <p className="text-base text-muted-foreground mb-8">
              {t('medium.subtitle')}
            </p>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30">
                    <benefit.icon className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Course notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 mb-8"
            >
              <p className="text-sm text-muted-foreground">
                {t('medium.courses')}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                onClick={handleMediumSignup}
                className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {t('medium.cta')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-transparent z-10 rounded-2xl"
                animate={{ 
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <img
                src={mediumImage}
                alt="Cartas de Tarô Místicas - A Sacerdotisa e O Louco"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              
              {/* Floating stats */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 bg-background/90 backdrop-blur-md rounded-xl p-6 border border-border z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">500+</div>
                    <div className="text-xs text-muted-foreground mt-1">Médiuns</div>
                  </div>
                  <div>
                    <div className="text-2xl bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">10k+</div>
                    <div className="text-xs text-muted-foreground mt-1">Consultas</div>
                  </div>
                  <div>
                    <div className="text-2xl bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">4.9★</div>
                    <div className="text-xs text-muted-foreground mt-1">Avaliação</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Medium Signup Dialog */}
      <MediumSignupDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
