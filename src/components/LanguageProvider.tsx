import React, { createContext, useContext, useState } from 'react';

type Language = 'pt-BR' | 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  'pt-BR': {
    // Header
    'nav.features': 'Funcionalidades',
    'nav.mediums': 'Para Guias Espirituais',
    'nav.faq': 'FAQ',
    'nav.language': 'Idioma',
    
    // Hero
    'hero.badge': 'Em Breve no iOS e Android',
    'hero.title': 'Descubra o que o',
    'hero.titleHighlight': 'Universo Quer Te Dizer',
    'hero.description': 'Uma fusão entre espiritualidade e inteligência artificial. Realize tiragens personalizadas, receba leituras inteligentes e conecte-se autenticamente com o divino.',
    'hero.comingSoonIOS': 'Em breve no iOS',
    'hero.comingSoonAndroid': 'Em breve no Android',
    'hero.notify': 'Avise-me quando for lançado',
    
    // About
    'about.badge': 'Sobre o Mystik',
    'about.title': 'Espiritualidade Encontra Tecnologia',
    'about.description': 'O Mystik é uma plataforma revolucionária que combina sabedoria ancestral com inteligência artificial de ponta. Oferecemos tiragens personalizadas, interpretações automáticas e a possibilidade de consultar guias espirituais especialistas online.',
    'about.mission': 'Nossa missão é democratizar o acesso ao conhecimento espiritual, tornando-o mais acessível, preciso e transformador para todos.',
    'about.stat1': 'Oráculos',
    'about.stat2': 'Interpretação Automática',
    'about.stat3': 'Acesso aos Guias Espirituais',
    
    // Features
    'features.badge': 'Funcionalidades Principais',
    'features.title': 'Tudo que Você Precisa para Sua Jornada Espiritual',
    'features.description': 'Descubra uma experiência completa e envolvente com ferramentas poderosas para guiar seu caminho.',
    'features.oracles.title': 'Diversos Oráculos Disponíveis',
    'features.oracles.description': 'Acesse tarô, lenormand, runas, búzios, I-Ching e cartas dos anjos em um único lugar.',
    'features.ai.title': 'Interpretação Automática por IA',
    'features.ai.description': 'Receba análises instantâneas e personalizadas alimentadas por inteligência artificial avançada.',
    'features.mediums.title': 'Consulte Guias Espirituais Especialistas',
    'features.mediums.description': 'Conecte-se com profissionais certificados para orientação profunda e personalizada.',
    'features.personalized.title': 'Leituras Personalizadas',
    'features.personalized.description': 'Cada consulta é única e adaptada ao seu momento e necessidades específicas.',
    'features.history.title': 'Histórico de Consultas',
    'features.history.description': 'Acompanhe sua jornada e revise insights anteriores a qualquer momento.',
    'features.secure.title': 'Totalmente Seguro e Privado',
    'features.secure.description': 'Seus dados e consultas são protegidos com criptografia de última geração.',
    
    // Medium Section
    'medium.badge': 'Para Profissionais',
    'medium.title': 'Seja um Guia Espiritual no Mystik',
    'medium.description': 'O Mystik está formando uma comunidade de guias espirituais, oraculistas e terapeutas energéticos que desejam atender dentro da plataforma.',
    'medium.subtitle': 'Cadastre-se para ser um dos primeiros a oferecer consultas no ambiente Mystik.',
    'medium.benefit1.title': 'Plataforma Completa',
    'medium.benefit1.description': 'Ferramentas profissionais para gerenciar consultas, horários e pagamentos.',
    'medium.benefit2.title': 'Alcance Global',
    'medium.benefit2.description': 'Conecte-se com clientes do mundo todo através de nossa plataforma multilíngue.',
    'medium.benefit3.title': 'Suporte Profissional',
    'medium.benefit3.description': 'Equipe dedicada para ajudá-lo a crescer e ter sucesso na plataforma.',
    'medium.courses': 'Em breve, o Mystik também oferecerá cursos e formações exclusivas para guias espirituais que desejam aperfeiçoar suas habilidades espirituais e profissionais.',
    'medium.cta': 'Quero ser guia espiritual na plataforma',
    
    // Medium Form
    'mediumForm.title': 'Cadastro de Guia Espiritual',
    'mediumForm.description': 'Preencha o formulário abaixo e nossa equipe entrará em contato em breve para discutir sua participação na plataforma Mystik.',
    'mediumForm.firstNameLabel': 'Nome',
    'mediumForm.firstNamePlaceholder': 'Seu nome',
    'mediumForm.lastNameLabel': 'Sobrenome',
    'mediumForm.lastNamePlaceholder': 'Seu sobrenome',
    'mediumForm.emailLabel': 'E-mail',
    'mediumForm.emailPlaceholder': 'seu@email.com',
    'mediumForm.countryLabel': 'País',
    'mediumForm.countryPlaceholder': 'Selecione seu país',
    'mediumForm.phoneLabel': 'Telefone/WhatsApp',
    'mediumForm.phonePlaceholder': '(11) 99999-9999',
    'mediumForm.phoneValidation': 'Por favor, insira apenas números, +, espaços, parênteses ou hífens',
    'mediumForm.phoneHint': 'Número completo',
    'mediumForm.specialtyLabel': 'Especialidade Principal',
    'mediumForm.specialtyPlaceholder': 'Selecione sua especialidade',
    'mediumForm.specialty.tarot': 'Tarô',
    'mediumForm.specialty.lenormand': 'Lenormand',
    'mediumForm.specialty.runes': 'Runas',
    'mediumForm.specialty.buzios': 'Búzios',
    'mediumForm.specialty.iching': 'I-Ching',
    'mediumForm.specialty.angels': 'Cartas dos Anjos',
    'mediumForm.specialty.astrology': 'Astrologia',
    'mediumForm.specialty.numerology': 'Numerologia',
    'mediumForm.specialty.mediumship': 'Canalização Espiritual',
    'mediumForm.specialty.other': 'Outra',
    'mediumForm.experienceLabel': 'Nível de Experiência',
    'mediumForm.experiencePlaceholder': 'Selecione seu nível',
    'mediumForm.experience.beginner': 'Iniciante (menos de 1 ano)',
    'mediumForm.experience.intermediate': 'Intermediário (1-3 anos)',
    'mediumForm.experience.advanced': 'Avançado (3-5 anos)',
    'mediumForm.experience.professional': 'Profissional (5+ anos)',
    'mediumForm.messageLabel': 'Mensagem (opcional)',
    'mediumForm.messagePlaceholder': 'Conte-nos um pouco sobre sua experiência e por que deseja fazer parte do Mystik...',
    'mediumForm.contactInfo': 'Entraremos em contato pelo e-mail fornecido em até 48 horas úteis.',
    'mediumForm.submit': 'Enviar Cadastro',
    'mediumForm.submitting': 'Enviando...',
    'mediumForm.successMessage': 'Cadastro enviado com sucesso! Entraremos em contato em breve.',
    
    // FAQ
    'faq.badge': 'Perguntas Frequentes',
    'faq.title': 'Dúvidas Sobre o Mystik',
    'faq.description': 'Encontre respostas para as perguntas mais comuns sobre nossa plataforma.',
    'faq.q1.question': 'Quando o aplicativo estará disponível?',
    'faq.q1.answer': 'Estamos trabalhando duro para lançar o Mystik em breve no iOS e Android. Cadastre seu e-mail para ser notificado assim que estivermos prontos para o lançamento!',
    'faq.q2.question': 'Como funciona a interpretação por IA?',
    'faq.q2.answer': 'Nossa inteligência artificial foi treinada com milhares de interpretações de especialistas em tarô, astrologia e outras práticas místicas. Ela analisa suas tiragens e oferece insights precisos e personalizados instantaneamente.',
    'faq.q3.question': 'Preciso pagar para usar o Mystik?',
    'faq.q3.answer': 'O Mystik oferecerá funcionalidades gratuitas e planos premium. Mais detalhes sobre preços serão divulgados próximo ao lançamento.',
    'faq.q4.question': 'Como posso me tornar um guia espiritual na plataforma?',
    'faq.q4.answer': 'Clique no botão "Quero ser guia espiritual na plataforma" e preencha o formulário de interesse. Nossa equipe entrará em contato com mais informações sobre o processo de certificação e cadastro.',
    'faq.q5.question': 'Meus dados estarão seguros?',
    'faq.q5.answer': 'Sim! Utilizamos criptografia de última geração e seguimos rigorosos padrões de segurança para proteger todas as suas informações pessoais e consultas.',
    'faq.q6.question': 'Quais oráculos estarão disponíveis?',
    'faq.q6.answer': 'O Mystik oferecerá tarô, lenormand, runas, búzios, I-Ching, cartas dos anjos e muito mais. Novos oráculos serão adicionados regularmente.',
    
    // Waitlist
    'waitlist.badge': 'Cadastre-se',
    'waitlist.title': 'Seja um dos Primeiros a Usar o Mystik',
    'waitlist.description': 'Deixe seu e-mail e receba acesso antecipado quando lançarmos. Você também receberá atualizações exclusivas sobre o desenvolvimento do app.',
    'waitlist.email': 'Seu melhor e-mail',
    'waitlist.emailPlaceholder': 'exemplo@email.com',
    'waitlist.button': 'Avise-me quando lançar',
    'waitlist.success': 'Obrigado! Você será notificado assim que lançarmos.',
    'waitlist.privacy': 'Não compartilhamos seu e-mail com terceiros. Você pode cancelar a qualquer momento.',
    'waitlist.confirmedTitle': 'Cadastro Confirmado!',
    'waitlist.confirmedMessage': 'Você será um dos primeiros a saber quando o Mystik for lançado.',
    'waitlist.emailLabel': 'E-mail',
    'waitlist.stat1': 'Na Lista de Espera',
    'waitlist.stat2': 'Oráculos Disponíveis',
    'waitlist.stat3': 'Suporte Disponível',
    'waitlist.stat4': 'Idiomas',
    
    // Footer
    'footer.tagline': 'Conecte-se com o Universo',
    'footer.description': 'O Mystik está chegando para transformar sua jornada espiritual.',
    'footer.contact': 'Contato',
    'footer.email': 'hello@mystikapp.com',
    'footer.social': 'Siga-nos',
    'footer.links': 'Links',
    'footer.features': 'Funcionalidades',
    'footer.mediums': 'Para Guias Espirituais',
    'footer.faq': 'FAQ',
    'footer.waitlist': 'Lista de Espera',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos de Uso',
    'footer.copyright': '© Mystik 2025 – Todos os direitos reservados.',
    
    // Legal Pages
    'legal.back': 'Voltar',
    'legal.lastUpdated': 'Última atualização',
    'legal.questions': 'Dúvidas',
    
    // Terms of Use
    'legal.terms.title': 'Termos de Uso',
    'legal.terms.section1.title': '1. Aceitação dos Termos',
    'legal.terms.section1.content': 'Ao acessar e usar o Mystik, você concorda em cumprir estes Termos de Uso. Se você não concordar com alguma parte destes termos, não deverá usar nosso aplicativo.',
    'legal.terms.section2.title': '2. Descrição do Serviço',
    'legal.terms.section2.content': 'O Mystik é uma plataforma que oferece serviços espirituais, incluindo leituras de oráculos com interpretação por inteligência artificial e consultas com médiuns certificados. O serviço é fornecido "como está" e pode ser modificado ou descontinuado a qualquer momento.',
    'legal.terms.section3.title': '3. Cadastro e Conta',
    'legal.terms.section3.content': 'Para acessar determinados recursos, você precisará criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta.',
    'legal.terms.section4.title': '4. Uso Aceitável',
    'legal.terms.section4.content': 'Você concorda em usar o Mystik apenas para fins legais e de maneira que não viole os direitos de terceiros ou restrinja o uso do aplicativo por outros usuários. É proibido usar o serviço para atividades fraudulentas, ofensivas ou ilegais.',
    'legal.terms.section5.title': '5. Propriedade Intelectual',
    'legal.terms.section5.content': 'Todo o conteúdo do Mystik, incluindo textos, gráficos, logos e software, é de propriedade exclusiva do Mystik ou de seus licenciadores e está protegido por leis de direitos autorais.',
    'legal.terms.section6.title': '6. Limitação de Responsabilidade',
    'legal.terms.section6.content': 'O Mystik não se responsabiliza por decisões tomadas com base nas leituras ou consultas fornecidas. Os serviços são oferecidos para fins de entretenimento e desenvolvimento espiritual, não substituindo aconselhamento profissional médico, legal ou financeiro.',
    'legal.terms.section7.title': '7. Alterações nos Termos',
    'legal.terms.section7.content': 'Reservamos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação. É sua responsabilidade revisar os termos periodicamente.',
    
    // Privacy Policy
    'legal.privacy.title': 'Política de Privacidade',
    'legal.privacy.section1.title': '1. Informações que Coletamos',
    'legal.privacy.section1.content': 'Coletamos informações que você nos fornece diretamente, como nome, e-mail, data de nascimento (para mapas natais), e informações de pagamento. Também coletamos dados de uso do aplicativo para melhorar nossos serviços.',
    'legal.privacy.section2.title': '2. Como Usamos suas Informações',
    'legal.privacy.section2.content': 'Utilizamos suas informações para fornecer e melhorar nossos serviços, processar pagamentos, enviar comunicações sobre o app, personalizar sua experiência e garantir a segurança da plataforma.',
    'legal.privacy.section3.title': '3. Compartilhamento de Informações',
    'legal.privacy.section3.content': 'Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com prestadores de serviços essenciais (processamento de pagamentos, hospedagem) e quando exigido por lei.',
    'legal.privacy.section4.title': '4. Segurança dos Dados',
    'legal.privacy.section4.content': 'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.',
    'legal.privacy.section5.title': '5. Seus Direitos',
    'legal.privacy.section5.content': 'Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Também pode solicitar a portabilidade dos seus dados ou opor-se ao processamento em determinadas circunstâncias.',
    'legal.privacy.section6.title': '6. Cookies e Tecnologias Similares',
    'legal.privacy.section6.content': 'Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do app e personalizar conteúdo. Você pode gerenciar preferências de cookies nas configurações do navegador.',
    'legal.privacy.section7.title': '7. Alterações nesta Política',
    'legal.privacy.section7.content': 'Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas por e-mail ou através do aplicativo.',
  },
  'en': {
    // Header
    'nav.features': 'Features',
    'nav.mediums': 'For Spiritual Guides',
    'nav.faq': 'FAQ',
    'nav.language': 'Language',
    
    // Hero
    'hero.badge': 'Coming Soon to iOS and Android',
    'hero.title': 'Discover What the',
    'hero.titleHighlight': 'Universe Wants to Tell You',
    'hero.description': 'A fusion between spirituality and artificial intelligence. Perform personalized readings, receive intelligent interpretations, and connect authentically with the divine.',
    'hero.comingSoonIOS': 'Coming soon to iOS',
    'hero.comingSoonAndroid': 'Coming soon to Android',
    'hero.notify': 'Notify me when it launches',
    
    // About
    'about.badge': 'About Mystik',
    'about.title': 'Spirituality Meets Technology',
    'about.description': 'Mystik is a revolutionary platform that combines ancient wisdom with cutting-edge artificial intelligence. We offer personalized readings, automatic interpretations, and the ability to consult with expert spiritual guides online.',
    'about.mission': 'Our mission is to democratize access to spiritual knowledge, making it more accessible, accurate, and transformative for everyone.',
    'about.stat1': 'Oracles',
    'about.stat2': 'AI Interpretation',
    'about.stat3': 'Spiritual Guide Access',
    
    // Features
    'features.badge': 'Main Features',
    'features.title': 'Everything You Need for Your Spiritual Journey',
    'features.description': 'Discover a complete and engaging experience with powerful tools to guide your path.',
    'features.oracles.title': 'Various Oracles Available',
    'features.oracles.description': 'Access tarot, lenormand, runes, cowrie shells, I-Ching, and angel cards in one place.',
    'features.ai.title': 'Automatic AI Interpretation',
    'features.ai.description': 'Receive instant, personalized analyses powered by advanced artificial intelligence.',
    'features.mediums.title': 'Consult Expert Spiritual Guides',
    'features.mediums.description': 'Connect with certified professionals for deep and personalized guidance.',
    'features.personalized.title': 'Personalized Readings',
    'features.personalized.description': 'Each consultation is unique and tailored to your moment and specific needs.',
    'features.history.title': 'Consultation History',
    'features.history.description': 'Track your journey and review previous insights at any time.',
    'features.secure.title': 'Totally Safe and Private',
    'features.secure.description': 'Your data and consultations are protected with state-of-the-art encryption.',
    
    // Medium Section
    'medium.badge': 'For Professionals',
    'medium.title': 'Become a Spiritual Guide on Mystik',
    'medium.description': 'Mystik is building a community of spiritual guides, oracle readers, and energy therapists who want to offer services within the platform.',
    'medium.subtitle': 'Register to be one of the first to offer consultations in the Mystik environment.',
    'medium.benefit1.title': 'Complete Platform',
    'medium.benefit1.description': 'Professional tools to manage consultations, schedules, and payments.',
    'medium.benefit2.title': 'Global Reach',
    'medium.benefit2.description': 'Connect with clients worldwide through our multilingual platform.',
    'medium.benefit3.title': 'Professional Support',
    'medium.benefit3.description': 'Dedicated team to help you grow and succeed on the platform.',
    'medium.courses': 'Soon, Mystik will also offer exclusive courses and training for spiritual guides who want to improve their spiritual and professional skills.',
    'medium.cta': 'I want to be a spiritual guide on the platform',
    
    // Medium Form
    'mediumForm.title': 'Spiritual Guide Registration',
    'mediumForm.description': 'Fill out the form below and our team will contact you soon to discuss your participation on the Mystik platform.',
    'mediumForm.firstNameLabel': 'First Name',
    'mediumForm.firstNamePlaceholder': 'Your first name',
    'mediumForm.lastNameLabel': 'Last Name',
    'mediumForm.lastNamePlaceholder': 'Your last name',
    'mediumForm.emailLabel': 'Email',
    'mediumForm.emailPlaceholder': 'your@email.com',
    'mediumForm.countryLabel': 'Country',
    'mediumForm.countryPlaceholder': 'Select your country',
    'mediumForm.phoneLabel': 'Phone/WhatsApp',
    'mediumForm.phonePlaceholder': '(555) 123-4567',
    'mediumForm.phoneValidation': 'Please enter only numbers, +, spaces, parentheses, or hyphens',
    'mediumForm.phoneHint': 'Full number',
    'mediumForm.specialtyLabel': 'Main Specialty',
    'mediumForm.specialtyPlaceholder': 'Select your specialty',
    'mediumForm.specialty.tarot': 'Tarot',
    'mediumForm.specialty.lenormand': 'Lenormand',
    'mediumForm.specialty.runes': 'Runes',
    'mediumForm.specialty.buzios': 'Cowrie Shells',
    'mediumForm.specialty.iching': 'I-Ching',
    'mediumForm.specialty.angels': 'Angel Cards',
    'mediumForm.specialty.astrology': 'Astrology',
    'mediumForm.specialty.numerology': 'Numerology',
    'mediumForm.specialty.mediumship': 'Spiritual Channeling',
    'mediumForm.specialty.other': 'Other',
    'mediumForm.experienceLabel': 'Experience Level',
    'mediumForm.experiencePlaceholder': 'Select your level',
    'mediumForm.experience.beginner': 'Beginner (less than 1 year)',
    'mediumForm.experience.intermediate': 'Intermediate (1-3 years)',
    'mediumForm.experience.advanced': 'Advanced (3-5 years)',
    'mediumForm.experience.professional': 'Professional (5+ years)',
    'mediumForm.messageLabel': 'Message (optional)',
    'mediumForm.messagePlaceholder': 'Tell us a bit about your experience and why you want to be part of Mystik...',
    'mediumForm.contactInfo': 'We will contact you at the email provided within 48 business hours.',
    'mediumForm.submit': 'Submit Registration',
    'mediumForm.submitting': 'Submitting...',
    'mediumForm.successMessage': 'Registration submitted successfully! We will contact you soon.',
    
    // FAQ
    'faq.badge': 'Frequently Asked Questions',
    'faq.title': 'Questions About Mystik',
    'faq.description': 'Find answers to the most common questions about our platform.',
    'faq.q1.question': 'When will the app be available?',
    'faq.q1.answer': 'We are working hard to launch Mystik soon on iOS and Android. Register your email to be notified as soon as we are ready for launch!',
    'faq.q2.question': 'How does AI interpretation work?',
    'faq.q2.answer': 'Our artificial intelligence has been trained with thousands of interpretations from experts in tarot, astrology, and other mystical practices. It analyzes your readings and offers precise and personalized insights instantly.',
    'faq.q3.question': 'Do I need to pay to use Mystik?',
    'faq.q3.answer': 'Mystik will offer free features and premium plans. More details about pricing will be released closer to launch.',
    'faq.q4.question': 'How can I become a spiritual guide on the platform?',
    'faq.q4.answer': 'Click the "I want to be a spiritual guide on the platform" button and fill out the interest form. Our team will contact you with more information about the certification and registration process.',
    'faq.q5.question': 'Will my data be safe?',
    'faq.q5.answer': 'Yes! We use state-of-the-art encryption and follow strict security standards to protect all your personal information and consultations.',
    'faq.q6.question': 'Which oracles will be available?',
    'faq.q6.answer': 'Mystik will offer tarot, lenormand, runes, cowrie shells, I-Ching, angel cards, and much more. New oracles will be added regularly.',
    
    // Waitlist
    'waitlist.badge': 'Sign Up',
    'waitlist.title': 'Be One of the First to Use Mystik',
    'waitlist.description': 'Leave your email and get early access when we launch. You will also receive exclusive updates about the app development.',
    'waitlist.email': 'Your best email',
    'waitlist.emailPlaceholder': 'example@email.com',
    'waitlist.button': 'Notify me when it launches',
    'waitlist.success': 'Thank you! You will be notified as soon as we launch.',
    'waitlist.privacy': 'We do not share your email with third parties. You can unsubscribe at any time.',
    'waitlist.confirmedTitle': 'Registration Confirmed!',
    'waitlist.confirmedMessage': 'You will be one of the first to know when Mystik launches.',
    'waitlist.emailLabel': 'Email',
    'waitlist.stat1': 'On Waitlist',
    'waitlist.stat2': 'Oracles Available',
    'waitlist.stat3': 'Support Available',
    'waitlist.stat4': 'Languages',
    
    // Footer
    'footer.tagline': 'Connect with the Universe',
    'footer.description': 'Mystik is coming to transform your spiritual journey.',
    'footer.contact': 'Contact',
    'footer.email': 'hello@mystikapp.com',
    'footer.social': 'Follow us',
    'footer.links': 'Links',
    'footer.features': 'Features',
    'footer.mediums': 'For Spiritual Guides',
    'footer.faq': 'FAQ',
    'footer.waitlist': 'Waitlist',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of Use',
    'footer.copyright': '© Mystik 2025 – All rights reserved.',
    
    // Legal Pages
    'legal.back': 'Back',
    'legal.lastUpdated': 'Last updated',
    'legal.questions': 'Questions',
    
    // Terms of Use
    'legal.terms.title': 'Terms of Use',
    'legal.terms.section1.title': '1. Acceptance of Terms',
    'legal.terms.section1.content': 'By accessing and using Mystik, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, you should not use our application.',
    'legal.terms.section2.title': '2. Service Description',
    'legal.terms.section2.content': 'Mystik is a platform that offers spiritual services, including oracle readings with AI interpretation and consultations with certified spiritual guides. The service is provided "as is" and may be modified or discontinued at any time.',
    'legal.terms.section3.title': '3. Registration and Account',
    'legal.terms.section3.content': 'To access certain features, you will need to create an account. You are responsible for maintaining the confidentiality of your credentials and for all activities performed on your account.',
    'legal.terms.section4.title': '4. Acceptable Use',
    'legal.terms.section4.content': 'You agree to use Mystik only for lawful purposes and in a manner that does not violate the rights of third parties or restrict the use of the application by other users. It is prohibited to use the service for fraudulent, offensive, or illegal activities.',
    'legal.terms.section5.title': '5. Intellectual Property',
    'legal.terms.section5.content': 'All content on Mystik, including texts, graphics, logos, and software, is the exclusive property of Mystik or its licensors and is protected by copyright laws.',
    'legal.terms.section6.title': '6. Limitation of Liability',
    'legal.terms.section6.content': 'Mystik is not responsible for decisions made based on the readings or consultations provided. Services are offered for entertainment and spiritual development purposes and do not replace professional medical, legal, or financial advice.',
    'legal.terms.section7.title': '7. Changes to Terms',
    'legal.terms.section7.content': 'We reserve the right to modify these Terms of Use at any time. Changes will take effect immediately upon publication. It is your responsibility to review the terms periodically.',
    
    // Privacy Policy
    'legal.privacy.title': 'Privacy Policy',
    'legal.privacy.section1.title': '1. Information We Collect',
    'legal.privacy.section1.content': 'We collect information you provide directly to us, such as name, email, date of birth (for natal charts), and payment information. We also collect app usage data to improve our services.',
    'legal.privacy.section2.title': '2. How We Use Your Information',
    'legal.privacy.section2.content': 'We use your information to provide and improve our services, process payments, send communications about the app, personalize your experience, and ensure platform security.',
    'legal.privacy.section3.title': '3. Information Sharing',
    'legal.privacy.section3.content': 'We do not sell your personal information. We may share data only with essential service providers (payment processing, hosting) and when required by law.',
    'legal.privacy.section4.title': '4. Data Security',
    'legal.privacy.section4.content': 'We implement technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    'legal.privacy.section5.title': '5. Your Rights',
    'legal.privacy.section5.content': 'You have the right to access, correct, or delete your personal information at any time. You can also request data portability or object to processing in certain circumstances.',
    'legal.privacy.section6.title': '6. Cookies and Similar Technologies',
    'legal.privacy.section6.content': 'We use cookies and similar technologies to improve your experience, analyze app usage, and personalize content. You can manage cookie preferences in your browser settings.',
    'legal.privacy.section7.title': '7. Changes to This Policy',
    'legal.privacy.section7.content': 'We may update this Privacy Policy periodically. We will notify you of significant changes by email or through the application.',
  },
  'es': {
    // Header
    'nav.features': 'Funcionalidades',
    'nav.mediums': 'Para Guías Espirituales',
    'nav.faq': 'FAQ',
    'nav.language': 'Idioma',
    
    // Hero
    'hero.badge': 'Próximamente en iOS y Android',
    'hero.title': 'Descubre lo que el',
    'hero.titleHighlight': 'Universo Quiere Decirte',
    'hero.description': 'Una fusión entre espiritualidad e inteligencia artificial. Realiza lecturas personalizadas, recibe interpretaciones inteligentes y conéctate auténticamente con lo divino.',
    'hero.comingSoonIOS': 'Próximamente en iOS',
    'hero.comingSoonAndroid': 'Próximamente en Android',
    'hero.notify': 'Avísame cuando se lance',
    
    // About
    'about.badge': 'Sobre Mystik',
    'about.title': 'La Espiritualidad Encuentra la Tecnología',
    'about.description': 'Mystik es una plataforma revolucionaria que combina sabiduría ancestral con inteligencia artificial de vanguardia. Ofrecemos lecturas personalizadas, interpretaciones automáticas y la posibilidad de consultar con guías espirituales expertos online.',
    'about.mission': 'Nuestra misión es democratizar el acceso al conocimiento espiritual, haciéndolo más accesible, preciso y transformador para todos.',
    'about.stat1': 'Oráculos',
    'about.stat2': 'Interpretación IA',
    'about.stat3': 'Acceso a Guías Espirituales',
    
    // Features
    'features.badge': 'Funcionalidades Principales',
    'features.title': 'Todo lo que Necesitas para tu Viaje Espiritual',
    'features.description': 'Descubre una experiencia completa y envolvente con herramientas poderosas para guiar tu camino.',
    'features.oracles.title': 'Diversos Oráculos Disponibles',
    'features.oracles.description': 'Accede a tarot, lenormand, runas, caracoles, I-Ching y cartas de ángeles en un solo lugar.',
    'features.ai.title': 'Interpretación Automática por IA',
    'features.ai.description': 'Recibe análisis instantáneos y personalizados impulsados por inteligencia artificial avanzada.',
    'features.mediums.title': 'Consulta Guías Espirituales Expertos',
    'features.mediums.description': 'Conéctate con profesionales certificados para orientación profunda y personalizada.',
    'features.personalized.title': 'Lecturas Personalizadas',
    'features.personalized.description': 'Cada consulta es única y adaptada a tu momento y necesidades específicas.',
    'features.history.title': 'Historial de Consultas',
    'features.history.description': 'Sigue tu viaje y revisa insights anteriores en cualquier momento.',
    'features.secure.title': 'Totalmente Seguro y Privado',
    'features.secure.description': 'Tus datos y consultas están protegidos con encriptación de última generación.',
    
    // Medium Section
    'medium.badge': 'Para Profesionales',
    'medium.title': 'Sé un Guía Espiritual en Mystik',
    'medium.description': 'Mystik está formando una comunidad de guías espirituales, oráculistas y terapeutas energéticos que desean atender dentro de la plataforma.',
    'medium.subtitle': 'Regístrate para ser uno de los primeros en ofrecer consultas en el ambiente Mystik.',
    'medium.benefit1.title': 'Plataforma Completa',
    'medium.benefit1.description': 'Herramientas profesionales para gestionar consultas, horarios y pagos.',
    'medium.benefit2.title': 'Alcance Global',
    'medium.benefit2.description': 'Conéctate con clientes de todo el mundo a través de nuestra plataforma multilingüe.',
    'medium.benefit3.title': 'Soporte Profesional',
    'medium.benefit3.description': 'Equipo dedicado para ayudarte a crecer y tener éxito en la plataforma.',
    'medium.courses': 'Pronto, Mystik también ofrecerá cursos y formaciones exclusivas para guías espirituales que deseen perfeccionar sus habilidades espirituales y profesionales.',
    'medium.cta': 'Quiero ser guía espiritual en la plataforma',
    
    // Medium Form
    'mediumForm.title': 'Registro de Guía Espiritual',
    'mediumForm.description': 'Completa el formulario a continuación y nuestro equipo se pondrá en contacto pronto para discutir tu participación en la plataforma Mystik.',
    'mediumForm.firstNameLabel': 'Nombre',
    'mediumForm.firstNamePlaceholder': 'Tu nombre',
    'mediumForm.lastNameLabel': 'Apellido',
    'mediumForm.lastNamePlaceholder': 'Tu apellido',
    'mediumForm.emailLabel': 'Email',
    'mediumForm.emailPlaceholder': 'tu@email.com',
    'mediumForm.countryLabel': 'País',
    'mediumForm.countryPlaceholder': 'Selecciona tu país',
    'mediumForm.phoneLabel': 'Teléfono/WhatsApp',
    'mediumForm.phonePlaceholder': '(11) 99999-9999',
    'mediumForm.phoneValidation': 'Por favor, ingrese solo números, +, espacios, paréntesis o guiones',
    'mediumForm.phoneHint': 'Número completo',
    'mediumForm.specialtyLabel': 'Especialidad Principal',
    'mediumForm.specialtyPlaceholder': 'Selecciona tu especialidad',
    'mediumForm.specialty.tarot': 'Tarot',
    'mediumForm.specialty.lenormand': 'Lenormand',
    'mediumForm.specialty.runes': 'Runas',
    'mediumForm.specialty.buzios': 'Caracoles',
    'mediumForm.specialty.iching': 'I-Ching',
    'mediumForm.specialty.angels': 'Cartas de Ángeles',
    'mediumForm.specialty.astrology': 'Astrología',
    'mediumForm.specialty.numerology': 'Numerología',
    'mediumForm.specialty.mediumship': 'Canalización Espiritual',
    'mediumForm.specialty.other': 'Otra',
    'mediumForm.experienceLabel': 'Nivel de Experiencia',
    'mediumForm.experiencePlaceholder': 'Selecciona tu nivel',
    'mediumForm.experience.beginner': 'Principiante (menos de 1 año)',
    'mediumForm.experience.intermediate': 'Intermedio (1-3 años)',
    'mediumForm.experience.advanced': 'Avanzado (3-5 años)',
    'mediumForm.experience.professional': 'Profesional (5+ años)',
    'mediumForm.messageLabel': 'Mensaje (opcional)',
    'mediumForm.messagePlaceholder': 'Cuéntanos un poco sobre tu experiencia y por qué deseas formar parte de Mystik...',
    'mediumForm.contactInfo': 'Nos pondremos en contacto al email proporcionado en hasta 48 horas hábiles.',
    'mediumForm.submit': 'Enviar Registro',
    'mediumForm.submitting': 'Enviando...',
    'mediumForm.successMessage': '¡Registro enviado con éxito! Nos pondremos en contacto pronto.',
    
    // FAQ
    'faq.badge': 'Preguntas Frecuentes',
    'faq.title': 'Dudas Sobre Mystik',
    'faq.description': 'Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma.',
    'faq.q1.question': '¿Cuándo estará disponible la aplicación?',
    'faq.q1.answer': 'Estamos trabajando duro para lanzar Mystik pronto en iOS y Android. ¡Registra tu email para ser notificado tan pronto como estemos listos para el lanzamiento!',
    'faq.q2.question': '¿Cómo funciona la interpretación por IA?',
    'faq.q2.answer': 'Nuestra inteligencia artificial ha sido entrenada con miles de interpretaciones de expertos en tarot, astrología y otras prácticas místicas. Analiza tus lecturas y ofrece insights precisos y personalizados instantáneamente.',
    'faq.q3.question': '¿Necesito pagar para usar Mystik?',
    'faq.q3.answer': 'Mystik ofrecerá funcionalidades gratuitas y planes premium. Más detalles sobre precios serán divulgados cerca del lanzamiento.',
    'faq.q4.question': '¿Cómo puedo convertirme en guía espiritual en la plataforma?',
    'faq.q4.answer': 'Haz clic en el botón "Quiero ser guía espiritual en la plataforma" y completa el formulario de interés. Nuestro equipo se pondrá en contacto con más información sobre el proceso de certificación y registro.',
    'faq.q5.question': '¿Mis datos estarán seguros?',
    'faq.q5.answer': '¡Sí! Utilizamos encriptación de última generación y seguimos estrictos estándares de seguridad para proteger toda tu información personal y consultas.',
    'faq.q6.question': '¿Qué oráculos estarán disponibles?',
    'faq.q6.answer': 'Mystik ofrecerá tarot, lenormand, runas, caracoles, I-Ching, cartas de ángeles y mucho más. Se agregarán nuevos oráculos regularmente.',
    
    // Waitlist
    'waitlist.badge': 'Regístrate',
    'waitlist.title': 'Sé uno de los Primeros en Usar Mystik',
    'waitlist.description': 'Deja tu email y obtén acceso anticipado cuando lancemos. También recibirás actualizaciones exclusivas sobre el desarrollo de la app.',
    'waitlist.email': 'Tu mejor email',
    'waitlist.emailPlaceholder': 'ejemplo@email.com',
    'waitlist.button': 'Avísame cuando se lance',
    'waitlist.success': '¡Gracias! Serás notificado tan pronto como lancemos.',
    'waitlist.privacy': 'No compartimos tu email con terceros. Puedes cancelar en cualquier momento.',
    'waitlist.confirmedTitle': '¡Registro Confirmado!',
    'waitlist.confirmedMessage': 'Serás uno de los primeros en saber cuando Mystik se lance.',
    'waitlist.emailLabel': 'Email',
    'waitlist.stat1': 'En Lista de Espera',
    'waitlist.stat2': 'Oráculos Disponibles',
    'waitlist.stat3': 'Soporte Disponible',
    'waitlist.stat4': 'Idiomas',
    
    // Footer
    'footer.tagline': 'Conéctate con el Universo',
    'footer.description': 'Mystik está llegando para transformar tu viaje espiritual.',
    'footer.contact': 'Contacto',
    'footer.email': 'hello@mystikapp.com',
    'footer.social': 'Síguenos',
    'footer.links': 'Enlaces',
    'footer.features': 'Funcionalidades',
    'footer.mediums': 'Para Guías Espirituales',
    'footer.faq': 'FAQ',
    'footer.waitlist': 'Lista de Espera',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos de Uso',
    'footer.copyright': '© Mystik 2025 – Todos los derechos reservados.',
    
    // Legal Pages
    'legal.back': 'Volver',
    'legal.lastUpdated': 'Última actualización',
    'legal.questions': 'Dudas',
    
    // Terms of Use
    'legal.terms.title': 'Términos de Uso',
    'legal.terms.section1.title': '1. Aceptación de los Términos',
    'legal.terms.section1.content': 'Al acceder y usar Mystik, usted acepta cumplir con estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, no debe usar nuestra aplicación.',
    'legal.terms.section2.title': '2. Descripción del Servicio',
    'legal.terms.section2.content': 'Mystik es una plataforma que ofrece servicios espirituales, incluyendo lecturas de oráculos con interpretación por inteligencia artificial y consultas con guías espirituales certificados. El servicio se proporciona "tal cual" y puede ser modificado o descontinuado en cualquier momento.',
    'legal.terms.section3.title': '3. Registro y Cuenta',
    'legal.terms.section3.content': 'Para acceder a ciertas funciones, necesitará crear una cuenta. Usted es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades realizadas en su cuenta.',
    'legal.terms.section4.title': '4. Uso Aceptable',
    'legal.terms.section4.content': 'Usted acepta usar Mystik solo para fines legales y de manera que no viole los derechos de terceros o restrinja el uso de la aplicación por otros usuarios. Está prohibido usar el servicio para actividades fraudulentas, ofensivas o ilegales.',
    'legal.terms.section5.title': '5. Propiedad Intelectual',
    'legal.terms.section5.content': 'Todo el contenido de Mystik, incluyendo textos, gráficos, logos y software, es propiedad exclusiva de Mystik o de sus licenciantes y está protegido por leyes de derechos de autor.',
    'legal.terms.section6.title': '6. Limitación de Responsabilidad',
    'legal.terms.section6.content': 'Mystik no se responsabiliza por decisiones tomadas en base a las lecturas o consultas proporcionadas. Los servicios se ofrecen para fines de entretenimiento y desarrollo espiritual, no reemplazan asesoramiento profesional médico, legal o financiero.',
    'legal.terms.section7.title': '7. Cambios en los Términos',
    'legal.terms.section7.content': 'Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios entrarán en vigor inmediatamente después de la publicación. Es su responsabilidad revisar los términos periódicamente.',
    
    // Privacy Policy
    'legal.privacy.title': 'Política de Privacidad',
    'legal.privacy.section1.title': '1. Información que Recopilamos',
    'legal.privacy.section1.content': 'Recopilamos información que usted nos proporciona directamente, como nombre, correo electrónico, fecha de nacimiento (para mapas natales) e información de pago. También recopilamos datos de uso de la aplicación para mejorar nuestros servicios.',
    'legal.privacy.section2.title': '2. Cómo Usamos su Información',
    'legal.privacy.section2.content': 'Utilizamos su información para proporcionar y mejorar nuestros servicios, procesar pagos, enviar comunicaciones sobre la app, personalizar su experiencia y garantizar la seguridad de la plataforma.',
    'legal.privacy.section3.title': '3. Compartir Información',
    'legal.privacy.section3.content': 'No vendemos su información personal. Podemos compartir datos solo con proveedores de servicios esenciales (procesamiento de pagos, alojamiento) y cuando lo exija la ley.',
    'legal.privacy.section4.title': '4. Seguridad de los Datos',
    'legal.privacy.section4.content': 'Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.',
    'legal.privacy.section5.title': '5. Sus Derechos',
    'legal.privacy.section5.content': 'Tiene derecho a acceder, corregir o eliminar su información personal en cualquier momento. También puede solicitar la portabilidad de sus datos u oponerse al procesamiento en determinadas circunstancias.',
    'legal.privacy.section6.title': '6. Cookies y Tecnologías Similares',
    'legal.privacy.section6.content': 'Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el uso de la app y personalizar contenido. Puede gestionar las preferencias de cookies en la configuración del navegador.',
    'legal.privacy.section7.title': '7. Cambios en esta Política',
    'legal.privacy.section7.content': 'Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos por correo electrónico o a través de la aplicación.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Detect user's language from browser
  const detectLanguage = (): Language => {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    if (browserLang.startsWith('pt-BR')) return 'pt-BR';
    if (browserLang.startsWith('pt')) return 'pt-BR'; // Default Portuguese to BR
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    
    // Default to Portuguese BR
    return 'pt-BR';
  };

  const [language, setLanguage] = useState<Language>(detectLanguage());

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}