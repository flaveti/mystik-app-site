import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-full blur-3xl"
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
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30">
            <Sparkles className="h-3 w-3 mr-2" />
            {t('about.badge')}
          </Badge>

          <h2 className="text-4xl md:text-5xl mb-6">
            {t('about.title')}
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            {t('about.description')}
          </p>

          <motion.p 
            className="text-base text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('about.mission')}
          </motion.p>
        </motion.div>

        {/* Visual Elements */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              number: '6+',
              label: t('about.stat1'),
              gradient: 'from-purple-500 to-violet-500'
            },
            {
              number: 'IA',
              label: t('about.stat2'),
              gradient: 'from-violet-500 to-blue-500'
            },
            {
              number: '24/7',
              label: t('about.stat3'),
              gradient: 'from-blue-500 to-cyan-500'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                {/* Hover gradient effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                <div className="relative text-center">
                  <div className={`text-5xl mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.number}
                  </div>
                  <div className="text-muted-foreground">
                    {item.label}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-5 rounded-bl-full -mr-12 -mt-12`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
