import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 hover:text-purple-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('legal.back')}
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 mb-6">
            <FileText className="h-8 w-8 text-purple-500" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">{t('legal.terms.title')}</h1>
          <p className="text-muted-foreground">{t('legal.lastUpdated')}: 16/10/2025</p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl text-foreground mb-4">{t('legal.terms.section1.title')}</h2>
              <p>{t('legal.terms.section1.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl text-foreground mb-4">{t('legal.terms.section2.title')}</h2>
              <p>{t('legal.terms.section2.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl text-foreground mb-4">{t('legal.terms.section3.title')}</h2>
              <p>{t('legal.terms.section3.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl text-foreground mb-4">{t('legal.terms.section4.title')}</h2>
              <p>{t('legal.terms.section4.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl text-foreground mb-4">{t('legal.terms.section5.title')}</h2>
              <p>{t('legal.terms.section5.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl text-foreground mb-4">{t('legal.terms.section6.title')}</h2>
              <p>{t('legal.terms.section6.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl text-foreground mb-4">{t('legal.terms.section7.title')}</h2>
              <p>{t('legal.terms.section7.content')}</p>
            </section>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground text-center">
            {t('legal.questions')}: <a href="mailto:hello@mystikapp.com" className="text-purple-500 hover:underline">hello@mystikapp.com</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default TermsPage;
