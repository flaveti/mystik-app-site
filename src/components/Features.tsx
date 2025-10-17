import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Sparkles, Brain, Users, BookOpen, History, Shield } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sparkles,
      title: t('features.oracles.title'),
      description: t('features.oracles.description'),
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Brain,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      gradient: 'from-violet-500 to-blue-500'
    },
    {
      icon: Users,
      title: t('features.mediums.title'),
      description: t('features.mediums.description'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: t('features.personalized.title'),
      description: t('features.personalized.description'),
      gradient: 'from-cyan-500 to-teal-500'
    },
    {
      icon: History,
      title: t('features.history.title'),
      description: t('features.history.description'),
      gradient: 'from-teal-500 to-green-500'
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
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
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30">
            <Sparkles className="h-3 w-3 mr-2" />
            {t('features.badge')}
          </Badge>
          
          <h2 className="text-4xl md:text-5xl mb-4">
            {t('features.title')}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                {/* Hover gradient effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-bl-full -mr-16 -mt-16`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
