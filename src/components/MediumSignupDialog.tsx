import { useState } from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sparkles, Mail, Phone, User, Briefcase, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from './LanguageProvider';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface MediumSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Country codes with phone prefixes
const countries = [
  { code: 'BR', name: 'Brasil', nameEn: 'Brazil', nameEs: 'Brasil', phonePrefix: '+55' },
  { code: 'US', name: 'Estados Unidos', nameEn: 'United States', nameEs: 'Estados Unidos', phonePrefix: '+1' },
  { code: 'GB', name: 'Reino Unido', nameEn: 'United Kingdom', nameEs: 'Reino Unido', phonePrefix: '+44' },
  { code: 'CA', name: 'CanadÃ¡', nameEn: 'Canada', nameEs: 'CanadÃ¡', phonePrefix: '+1' },
  { code: 'MX', name: 'MÃ©xico', nameEn: 'Mexico', nameEs: 'MÃ©xico', phonePrefix: '+52' },
  { code: 'AR', name: 'Argentina', nameEn: 'Argentina', nameEs: 'Argentina', phonePrefix: '+54' },
  { code: 'CL', name: 'Chile', nameEn: 'Chile', nameEs: 'Chile', phonePrefix: '+56' },
  { code: 'CO', name: 'ColÃ´mbia', nameEn: 'Colombia', nameEs: 'Colombia', phonePrefix: '+57' },
  { code: 'PE', name: 'Peru', nameEn: 'Peru', nameEs: 'PerÃº', phonePrefix: '+51' },
  { code: 'UY', name: 'Uruguai', nameEn: 'Uruguay', nameEs: 'Uruguay', phonePrefix: '+598' },
  { code: 'PY', name: 'Paraguai', nameEn: 'Paraguay', nameEs: 'Paraguay', phonePrefix: '+595' },
  { code: 'BO', name: 'BolÃ­via', nameEn: 'Bolivia', nameEs: 'Bolivia', phonePrefix: '+591' },
  { code: 'EC', name: 'Equador', nameEn: 'Ecuador', nameEs: 'Ecuador', phonePrefix: '+593' },
  { code: 'VE', name: 'Venezuela', nameEn: 'Venezuela', nameEs: 'Venezuela', phonePrefix: '+58' },
  { code: 'ES', name: 'Espanha', nameEn: 'Spain', nameEs: 'EspaÃ±a', phonePrefix: '+34' },
  { code: 'PT', name: 'Portugal', nameEn: 'Portugal', nameEs: 'Portugal', phonePrefix: '+351' },
  { code: 'FR', name: 'FranÃ§a', nameEn: 'France', nameEs: 'Francia', phonePrefix: '+33' },
  { code: 'DE', name: 'Alemanha', nameEn: 'Germany', nameEs: 'Alemania', phonePrefix: '+49' },
  { code: 'IT', name: 'ItÃ¡lia', nameEn: 'Italy', nameEs: 'Italia', phonePrefix: '+39' },
  { code: 'AU', name: 'AustrÃ¡lia', nameEn: 'Australia', nameEs: 'Australia', phonePrefix: '+61' },
  { code: 'NZ', name: 'Nova ZelÃ¢ndia', nameEn: 'New Zealand', nameEs: 'Nueva Zelanda', phonePrefix: '+64' },
  { code: 'JP', name: 'JapÃ£o', nameEn: 'Japan', nameEs: 'JapÃ³n', phonePrefix: '+81' },
  { code: 'CN', name: 'China', nameEn: 'China', nameEs: 'China', phonePrefix: '+86' },
  { code: 'IN', name: 'Ãndia', nameEn: 'India', nameEs: 'India', phonePrefix: '+91' },
  { code: 'ZA', name: 'Ãfrica do Sul', nameEn: 'South Africa', nameEs: 'SudÃ¡frica', phonePrefix: '+27' },
  { code: 'OTHER', name: 'Outro', nameEn: 'Other', nameEs: 'Otro', phonePrefix: '+' },
];

export function MediumSignupDialog({ open, onOpenChange }: MediumSignupDialogProps) {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
    specialty: '',
    experience: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get country name based on current language
  const getCountryName = (country: typeof countries[0]) => {
    if (language === 'en') return country.nameEn;
    if (language === 'es') return country.nameEs;
    return country.name;
  };

  // Get phone prefix for selected country
  const selectedCountry = countries.find(c => c.code === formData.country);
  const phonePrefix = selectedCountry?.phonePrefix || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call backend API to save medium registration
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b85eb51c/medium-signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao enviar cadastro');
      }

      toast.success(t('mediumForm.successMessage'));
      onOpenChange(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phone: '',
        specialty: '',
        experience: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting medium registration:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar cadastro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string) => {
    // Remove all non-digit characters except + and spaces
    const cleaned = value.replace(/[^\d\s+()-]/g, '');
    handleChange('phone', cleaned);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-6 w-6 text-purple-500" />
            </motion.div>
            {t('mediumForm.title')}
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            {t('mediumForm.description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-purple-500" />
                {t('mediumForm.firstNameLabel')}
              </Label>
              <Input
                id="firstName"
                placeholder={t('mediumForm.firstNamePlaceholder')}
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
                className="border-purple-500/20 focus:border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                {t('mediumForm.lastNameLabel')}
              </Label>
              <Input
                id="lastName"
                placeholder={t('mediumForm.lastNamePlaceholder')}
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
                className="border-purple-500/20 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-500" />
              {t('mediumForm.emailLabel')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('mediumForm.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="border-purple-500/20 focus:border-purple-500"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-500" />
              {t('mediumForm.countryLabel')}
            </Label>
            <Select value={formData.country} onValueChange={(value) => handleChange('country', value)} required>
              <SelectTrigger className="border-purple-500/20 focus:border-purple-500">
                <SelectValue placeholder={t('mediumForm.countryPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {getCountryName(country)} {country.phonePrefix}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-500" />
              {t('mediumForm.phoneLabel')}
            </Label>
            <div className="flex gap-2">
              <Input
                value={phonePrefix}
                disabled
                className="w-20 border-purple-500/20 bg-muted text-center"
              />
              <Input
                id="phone"
                type="tel"
                placeholder={t('mediumForm.phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                pattern="[\d\s+()-]+"
                title={t('mediumForm.phoneValidation')}
                required
                className="flex-1 border-purple-500/20 focus:border-purple-500"
              />
            </div>
            {phonePrefix && (
              <p className="text-xs text-muted-foreground">
                {t('mediumForm.phoneHint')}: {phonePrefix} {formData.phone}
              </p>
            )}
          </div>

          {/* Specialty */}
          <div className="space-y-2">
            <Label htmlFor="specialty" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-purple-500" />
              {t('mediumForm.specialtyLabel')}
            </Label>
            <Select value={formData.specialty} onValueChange={(value) => handleChange('specialty', value)} required>
              <SelectTrigger className="border-purple-500/20 focus:border-purple-500">
                <SelectValue placeholder={t('mediumForm.specialtyPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tarot">{t('mediumForm.specialty.tarot')}</SelectItem>
                <SelectItem value="lenormand">{t('mediumForm.specialty.lenormand')}</SelectItem>
                <SelectItem value="runes">{t('mediumForm.specialty.runes')}</SelectItem>
                <SelectItem value="buzios">{t('mediumForm.specialty.buzios')}</SelectItem>
                <SelectItem value="iching">{t('mediumForm.specialty.iching')}</SelectItem>
                <SelectItem value="angels">{t('mediumForm.specialty.angels')}</SelectItem>
                <SelectItem value="astrology">{t('mediumForm.specialty.astrology')}</SelectItem>
                <SelectItem value="numerology">{t('mediumForm.specialty.numerology')}</SelectItem>
                <SelectItem value="mediumship">{t('mediumForm.specialty.mediumship')}</SelectItem>
                <SelectItem value="other">{t('mediumForm.specialty.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience">{t('mediumForm.experienceLabel')}</Label>
            <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)} required>
              <SelectTrigger className="border-purple-500/20 focus:border-purple-500">
                <SelectValue placeholder={t('mediumForm.experiencePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">{t('mediumForm.experience.beginner')}</SelectItem>
                <SelectItem value="intermediate">{t('mediumForm.experience.intermediate')}</SelectItem>
                <SelectItem value="advanced">{t('mediumForm.experience.advanced')}</SelectItem>
                <SelectItem value="professional">{t('mediumForm.experience.professional')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{t('mediumForm.messageLabel')}</Label>
            <Textarea
              id="message"
              placeholder={t('mediumForm.messagePlaceholder')}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={4}
              className="border-purple-500/20 focus:border-purple-500 resize-none"
            />
          </div>

          {/* Contact Info */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20">
            <p className="text-sm text-muted-foreground">
              {t('mediumForm.contactInfo')}
            </p>
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg shadow-purple-500/25"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  {t('mediumForm.submitting')}
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  {t('mediumForm.submit')}
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
