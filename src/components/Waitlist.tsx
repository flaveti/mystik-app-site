import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sparkles, Mail, Check } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from '';

export function Waitlist() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um e-mail vÃ¡lido');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      toast.success(t('waitlist.success'));
    }, 1500);
  };

  return (
    <section id="waitlist" className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-blue-500/10" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/40 to-violet-500/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl"
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
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30">
            <Mail className="h-3 w-3 mr-2" />
            {t('waitlist.badge')}
          </Badge>

          <h2 className="text-4xl md:text-5xl mb-6">
            {t('waitlist.title')}
          </h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('waitlist.description')}
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder={t('waitlist.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-background/50 backdrop-blur-sm border-border focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="h-12 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      {t('waitlist.button')}
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                {t('waitlist.privacy')}
              </p>
            </motion.form>
          ) : (
            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/30">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Check className="h-8 w-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl mb-2">{t('waitlist.confirmedTitle')}</h3>
                <p className="text-muted-foreground">
                  {t('waitlist.confirmedMessage')}
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  {t('waitlist.emailLabel')}: <span className="text-foreground">{email}</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { number: '1,000+', label: t('waitlist.stat1') },
              { number: '6+', label: t('waitlist.stat2') },
              { number: '24/7', label: t('waitlist.stat3') },
              { number: '3', label: t('waitlist.stat4') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

