import React, { useState, useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowDown, Plus, MapPin, Mail, Phone, Instagram, Linkedin, Menu, X, ArrowLeft } from 'lucide-react';

// --- 1. TYPES & INTERFACES (Strict Typing) ---

type Language = 'fr' | 'en' | 'ar';
type View = 'home' | 'interior';

interface LocalizedString {
  fr: string;
  en: string;
  ar: string;
}

interface ProjectData {
  id: string;
  title: string;
  year: string;
  img: string;
  category: LocalizedString;
  desc: LocalizedString;
}

interface ServiceData {
  title: string;
  desc: string;
}

// --- 2. DATA CONSTANTS ---

const PROJECTS: ProjectData[] = [
  {
    id: "01",
    title: "RESIDENCE PANIER",
    year: "2024",
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "RÉHABILITATION", en: "Rehabilitation", ar: "إعادة تأهيل" },
    desc: { fr: "Restructuration lourde en secteur sauvegardé.", en: "Major restructuring in a protected sector.", ar: "إعادة هيكلة كبرى في قطاع محمي." }
  },
  {
    id: "02",
    title: "VILLA CALANQUES",
    year: "2023",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "CONSTRUCTION NEUVE", en: "New Construction", ar: "بناء جديد" },
    desc: { fr: "Insertion bioclimatique en site classé.", en: "Bioclimatic insertion in a classified site.", ar: "إدراج مناخي حيوي في موقع مصنف." }
  },
  {
    id: "03",
    title: "CENTRE CULTUREL",
    year: "2022",
    img: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "EQUIPEMENT PUBLIC", en: "Public Facility", ar: "مرفق عام" },
    desc: { fr: "Conception d'un espace polyvalent urbain.", en: "Design of an urban multipurpose space.", ar: "تصميم مساحة حضرية متعدد الأغراض." }
  },
  {
    id: "04",
    title: "LOFT INDUSTRIEL",
    year: "2023",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "AMÉNAGEMENT INTÉRIEUR", en: "Interior Design", ar: "تصميم داخلي" },
    desc: { fr: "Transformation d'un ancien atelier de mécanique.", en: "Transformation of an old mechanical workshop.", ar: "تحويل ورشة ميكانيكية قديمة." }
  },
  {
    id: "05",
    title: "TOUR HORIZON",
    year: "2024",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "BUREAUX", en: "Offices", ar: "مكاتب" },
    desc: { fr: "Siège social haute performance énergétique.", en: "High energy performance headquarters.", ar: "مقر رئيسي عالي الأداء في مجال الطاقة." }
  },
  {
    id: "06",
    title: "PAVILLON NOIR",
    year: "2023",
    img: "https://images.unsplash.com/photo-1517581177697-002c81300852?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "EXPOSITION", en: "Exhibition", ar: "معرض" },
    desc: { fr: "Espace éphémère pour l'art contemporain.", en: "Ephemeral space for contemporary art.", ar: "مساحة مؤقتة للفن المعاصر." }
  },
  {
    id: "07",
    title: "MÉDIATHÈQUE DU PORT",
    year: "2025",
    img: "https://images.unsplash.com/photo-1534333682228-c1729c159846?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "CULTUREL", en: "Cultural", ar: "ثقافي" },
    desc: { fr: "Espace de savoir ouvert sur la mer.", en: "Knowledge space open to the sea.", ar: "فضاء للمعرفة مفتوح على البحر." }
  }
];

const INTERIOR_PROJECTS: ProjectData[] = [
  {
    id: "INT-01",
    title: "APPARTEMENT HAUSSMANN",
    year: "2024",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Rénovation complète style minimaliste.", en: "Complete minimalist renovation.", ar: "تجديد كامل بأسلوب بسيط." }
  },
  {
    id: "INT-02",
    title: "BOUTIQUE LUXE",
    year: "2023",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "RETAIL", en: "Retail", ar: "بيع بالتجزئة" },
    desc: { fr: "Concept store monochrome.", en: "Monochrome concept store.", ar: "متجر بمفهوم أحادي اللون." }
  },
  {
    id: "INT-03",
    title: "LOBBY HOTEL",
    year: "2023",
    img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2700&auto=format&fit=crop",
    category: { fr: "HOSPITALITY", en: "Hospitality", ar: "ضيافة" },
    desc: { fr: "Espace d'accueil chaleureux et brut.", en: "Warm and raw reception space.", ar: "مساحة استقبال دافئة وخام." }
  }
];

const TRANSLATIONS = {
  fr: {
    nav: { projects: "Projets", expertise: "Expertise", agency: "L'Agence", contact: "Contact", open_menu: "Menu", close_menu: "Fermer", back: "Retour" },
    hero: { est: "EST. 2016 — MARSEILLE, FR", title_1: "Architecture", title_2: "& Maîtrise", title_3: "d'Œuvre", desc: "Conception, Réhabilitation et Construction. Une approche qui lie rigueur technique et sensibilité architecturale pour des lieux de vie pérennes.", status_label: "STATUT", status_val: "DISPONIBLE", focus_label: "EXPERTISE", focus_val: "RÉSIDENTIEL / PUBLIC / URBAIN", cta: "Démarrer un projet" },
    portfolio: { label: "Sélection de Projets", view_project: "VOIR LE PROJET", view_all: "Voir tout le portfolio", view_interior: "Portfolio Design Intérieur" },
    interior: { label: "Design Intérieur", desc: "Une exploration de la matière, de la lumière et du détail à l'échelle intime." },
    expertise: { label: "Nos Domaines", intro: "Nous refusons l'effet de mode pour nous concentrer sur l'essentiel : la structure, l'espace et la lumière.", services: [{ title: "Études de Faisabilité", desc: "Analyse réglementaire, technique et financière. Diagnostics initiaux pour valider le potentiel constructible." }, { title: "Conception & PC", desc: "Élaboration des plans (ESQ, APD, PRO) et gestion complète des dossiers administratifs." }, { title: "Maîtrise d'Œuvre (DET)", desc: "Direction de l'exécution des travaux. Coordination des entreprises et contrôle qualité rigoureux." }, { title: "BIM & Synthèse", desc: "Modélisation 3D avancée pour une gestion technique centralisée et une anticipation des conflits." }] },
    agency: { label: "L'Architecte", role: "ARCHITECTE — FONDATEUR", quote: "Construire, c'est collaborer avec la terre : c'est mettre une marque humaine sur un paysage qui en sera modifié à jamais.", desc_1: "Basée à Marseille, l'agence intervient sur l'ensemble du territoire PACA. Notre approche se distingue par une écriture sobre et intemporelle, privilégiant les matériaux bruts et durables (béton, pierre, bois).", desc_2: "Nous ne construisons pas seulement des murs, nous bâtissons des lieux de vie pérennes, respectueux des normes mondiales et harmonieux dans leurs volumes.", stats: { exp: "Années d'expérience", projects: "Projets Livrés", engagement: "Engagement" } },
    contact: { label: "Contact & Études", intro: "Que vous envisagiez une construction neuve, une extension ou une réhabilitation complexe, l'agence A1 Studio est à votre écoute.", address_label: "Adresse", phone_label: "Téléphone", email_label: "Email", form: { name: "Nom / Entreprise", email: "Email", type: "Type de projet", message: "Message", cta: "Envoyer la demande", placeholders: { name: "Entrez votre nom", email: "votre@email.com", message: "Décrivez votre projet..." }, options: ["Construction Neuve", "Rénovation / Réhabilitation", "Extension", "Autre"] } },
    footer: { legal: "Mentions Légales", privacy: "Politique de Confidentialité", sitemap: "Plan du site" }
  },
  en: {
    nav: { projects: "Projects", expertise: "Expertise", agency: "Agency", contact: "Contact", open_menu: "Menu", close_menu: "Close", back: "Back" },
    hero: { est: "EST. 2016 — MARSEILLE, FR", title_1: "Architecture", title_2: "& Project", title_3: "Management", desc: "Design, Rehabilitation, and Construction. An approach linking technical rigor with architectural sensitivity for enduring living spaces.", status_label: "STATUS", status_val: "AVAILABLE", focus_label: "FOCUS", focus_val: "RESIDENTIAL / PUBLIC / URBAN", cta: "Start a project" },
    portfolio: { label: "Selected Projects", view_project: "VIEW PROJECT", view_all: "View full portfolio", view_interior: "Interior Design Portfolio" },
    interior: { label: "Interior Design", desc: "An exploration of material, light, and detail on an intimate scale." },
    expertise: { label: "Our Expertise", intro: "We refuse trends to focus on the essential: structure, space, and light.", services: [{ title: "Feasibility Studies", desc: "Regulatory, technical, and financial analysis. Initial diagnostics to validate build potential." }, { title: "Design & Permits", desc: "Plan development (Schematic, Design Dev) and full administrative file management." }, { title: "Construction Supervision", desc: "Execution management. Coordination of contractors and rigorous quality control." }, { title: "BIM & Synthesis", desc: "Advanced 3D modeling for centralized technical management and conflict anticipation." }] },
    agency: { label: "The Architect", role: "ARCHITECT — FOUNDER", quote: "To build is to collaborate with the earth: it is to put a human mark on a landscape that will be changed forever.", desc_1: "Based in Marseille, the agency operates throughout the PACA region. Our approach is distinguished by a sober and timeless style, prioritizing raw and sustainable materials (concrete, stone, wood).", desc_2: "We do not just build walls, we build enduring living spaces, respectful of global standards and harmonious in their volumes.", stats: { exp: "Years of Experience", projects: "Delivered Projects", engagement: "Commitment" } },
    contact: { label: "Contact & Inquiries", intro: "Whether you are considering a new construction, an extension, or a complex rehabilitation, A1 Studio is at your disposal.", address_label: "Address", phone_label: "Phone", email_label: "Email", form: { name: "Name / Company", email: "Email", type: "Project Type", message: "Message", cta: "Send Request", placeholders: { name: "Enter your name", email: "your@email.com", message: "Describe your project..." }, options: ["New Construction", "Renovation / Rehab", "Extension", "Other"] } },
    footer: { legal: "Legal Notice", privacy: "Privacy Policy", sitemap: "Sitemap" }
  },
  ar: {
    nav: { projects: "المشاريع", expertise: "الخبرة", agency: "الوكالة", contact: "اتصل بنا", open_menu: "قائمة", close_menu: "إغلاق", back: "رجوع" },
    hero: { est: "تأسست 2016 - مارسيليا، فرنسا", title_1: "الهندسة", title_2: "المعمارية", title_3: "وإدارة المشاريع", desc: "التصميم، إعادة التأهيل والبناء. نهج يربط الصرامة التقنية بالحساسية المعمارية لمساحات معيشية دائمة.", status_label: "الحالة", status_val: "متاح للمشاريع", focus_label: "التخصص", focus_val: "سكني / عام / حضري", cta: "ابدأ مشروعاً" },
    portfolio: { label: "مختارات من المشاريع", view_project: "عرض المشروع", view_all: "عرض المحفظة الكاملة", view_interior: "تصميم داخلي" },
    interior: { label: "التصميم الداخلي", desc: "استكشاف للمادة والضوء والتفاصيل على نطاق حميم." },
    expertise: { label: "مجالاتنا", intro: "نرفض الموضة العابرة لنركز على الجوهر: الهيكل، الفراغ والضوء.", services: [{ title: "دراسات الجدوى", desc: "تحليل تنظيمي، تقني ومالي. تشخيصات أولية للتحقق من إمكانية البناء." }, { title: "التصميم والتراخيص", desc: "إعداد المخططات (الأولية والتفصيلية) وإدارة الملفات الإدارية بالكامل." }, { title: "الإشراف على التنفيذ", desc: "إدارة تنفيذ الأعمال. تنسيق المقاولين ومراقبة الجودة بصرامة." }, { title: "نمذجة معلومات البناء BIM", desc: "نمذجة ثلاثية الأبعاد متقدمة للإدارة التقنية المركزية وتوقع التعارضات." }] },
    agency: { label: "المهندس المعماري", role: "مهندس معماري - المؤسس", quote: "البناء هو التعاون مع الأرض: هو وضع بصمة إنسانية على مشهد سيتغير إلى الأبد.", desc_1: "يقع مقر الوكالة في مرسيليا، وتعمل في جميع أنحاء المنطقة. يتميز نهجنا بأسلوب رصين وخالد، مع إعطاء الأولوية للمواد الخام والمستدامة (الخرسانة، الحجر، الخشب).", desc_2: "نحن لا نبني جدرانًا فحسب، بل نبني أماكن معيشة دائمة، تحترم المعايير العالمية وتتناغم في أحجامها.", stats: { exp: "سنوات من الخبرة", projects: "مشاريع تم تسليمها", engagement: "التزام" } },
    contact: { label: "اتصل بنا", intro: "سواء كنت تفكر في بناء جديد، أو توسعة، أو إعادة تأهيل معقدة، فإن وكالة A1 Studio في خدمتك.", address_label: "العنوان", phone_label: "الهاتف", email_label: "البريد الإلكتروني", form: { name: "الاسم / الشركة", email: "البريد الإلكتروني", type: "نوع المشروع", message: "الرسالة", cta: "إرسال الطلب", placeholders: { name: "أدخل اسمك", email: "your@email.com", message: "صف مشروعك..." }, options: ["بناء جديد", "تجديد / إعادة تأهيل", "توسعة", "أخرى"] } },
    footer: { legal: "إشعارات قانونية", privacy: "سياسة الخصوصية", sitemap: "خريطة الموقع" }
  }
};

const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'fr', setLang: () => {} });
const ViewContext = createContext<{ view: View; setView: (v: View) => void }>({ view: 'home', setView: () => {} });

// --- 3. CUSTOM HOOKS ---

// Optimized scroll hook with simple state for parallax
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

// Intersection Observer for Reveal animations
const useReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
};

// --- 4. ATOMIC COMPONENTS ---

const Reveal = ({ children, className = "", delay = 0, y = 20 }: { children?: ReactNode; className?: string; delay?: number; y?: number }) => {
  const { ref, isVisible } = useReveal(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const SectionLabel = ({ number, title }: { number: string; title: string }) => (
  <Reveal>
    <div className="flex items-baseline gap-4 mb-16 border-b border-neutral-800 pb-4">
      <span className="font-mono text-xs text-neutral-500">/{number}</span>
      <h2 className="font-sans text-3xl uppercase tracking-tight font-bold">{title}</h2>
    </div>
  </Reveal>
);

const ParallaxImage = ({ src, alt, speed = 0.05, className, height = "h-96" }: { src: string; alt: string; speed?: number; className?: string; height?: string }) => {
  const scrollY = useScroll();
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const { top, height } = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = top + height / 2;
    const viewportCenter = windowHeight / 2;
    
    // Calculate offset based on element position relative to viewport center
    // Only update if element is roughly visible
    if (top < windowHeight && top + height > 0) {
      setOffset((elementCenter - viewportCenter) * speed * -1);
    }
  }, [scrollY, speed]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${height} ${className} bg-neutral-900 group`}>
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        className="absolute w-full h-[120%] -top-[10%] object-cover grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] transition-opacity duration-500 group-hover:opacity-50"></div>
    </div>
  );
};

const Button = ({ children, primary = false, className = "", onClick }: { children?: React.ReactNode; primary?: boolean; className?: string; onClick?: () => void }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <button onClick={onClick} className={`
      group relative px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold
      transition-all duration-300 ease-out border
      ${primary 
        ? 'bg-white text-black border-white hover:bg-neutral-200' 
        : 'bg-transparent text-white border-neutral-800 hover:bg-white hover:text-black hover:border-white'}
      ${className}
    `}>
      <span className="relative z-10 flex items-center justify-center gap-4">
        {children}
        <ArrowRight size={14} className={`group-hover:translate-x-1 transition-transform duration-300 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
      </span>
    </button>
  );
};

// --- 5. LAYOUT BLOCKS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useContext(LanguageContext);
  const { view, setView } = useContext(ViewContext);
  const t = TRANSLATIONS[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${scrolled ? 'bg-black/90 backdrop-blur-md border-neutral-900 h-20' : 'bg-transparent border-transparent h-24'} flex justify-between items-center px-6 md:px-12`}>
        <div className="flex items-center gap-4 z-50">
          {view === 'interior' ? (
             <button onClick={() => setView('home')} className="flex items-center gap-2 group text-white hover:text-neutral-400 transition-colors">
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
               <span className="font-mono text-xs uppercase">{t.back}</span>
             </button>
          ) : (
            <button onClick={() => setView('home')} className="flex items-center gap-4 group">
              <div className="w-4 h-4 bg-white transition-transform duration-500 group-hover:rotate-45"></div>
              <span className="font-sans font-bold text-lg tracking-tighter text-white">A1 STUDIO</span>
            </button>
          )}
        </div>
        
        <nav role="navigation" className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400">
          {view === 'home' && ['portfolio', 'expertise', 'agency', 'contact'].map(item => (
            <a key={item} href={`#${item}`} className="hover:text-white transition-colors py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              {t[item as keyof typeof t]}
            </a>
          ))}
          <div className="w-px h-4 bg-neutral-800 mx-2"></div>
          <div className="flex items-center gap-4">
            {(['fr', 'en', 'ar'] as Language[]).map((l) => (
              <button 
                key={l} 
                onClick={() => setLang(l)} 
                className={`transition-colors duration-300 ${lang === l ? 'text-white font-bold' : 'hover:text-white'}`}
                aria-label={`Switch to ${l}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white uppercase font-mono text-xs border border-neutral-800 px-3 py-2 z-50 flex items-center gap-2 hover:bg-neutral-900 transition-colors"
          aria-label={isOpen ? t.close_menu : t.open_menu}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={14} /> : <Menu size={14} />}
          <span>{isOpen ? t.close_menu : t.open_menu}</span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-black flex flex-col justify-center items-center space-y-8 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`} 
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        {['portfolio', 'expertise', 'agency', 'contact'].map((item, i) => (
          <a 
            key={item} 
            href={`#${item}`} 
            onClick={() => { setIsOpen(false); setView('home'); }} 
            className="font-sans text-4xl font-bold text-white hover:text-neutral-400 transition-colors"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {t[item as keyof typeof t]}
          </a>
        ))}
        <div className="flex gap-8 mt-12 pt-12 border-t border-neutral-800">
           {(['fr', 'en', 'ar'] as Language[]).map((l) => (
              <button 
                key={l} 
                onClick={() => setLang(l)} 
                className={`font-mono text-xl uppercase transition-colors ${lang === l ? 'text-white font-bold' : 'text-neutral-600'}`}
              >
                {l}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 border-b border-neutral-900 overflow-hidden pb-16 pt-32">
      {/* Background with slight parallax via simple fixed positioning technique */}
      <div className="absolute inset-0 z-0">
         <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop"
          alt="Architecture Background"
          className="w-full h-full object-cover opacity-40 grayscale animate-pulse-slow" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-end gap-12 lg:gap-32" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="lg:mb-0">
          <Reveal delay={200}>
            <div className="font-mono text-xs text-neutral-400 flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {t.est}
            </div>
          </Reveal>
          <h1 className="font-sans text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter uppercase text-white">
            <Reveal delay={300}>{t.title_1}</Reveal>
            <Reveal delay={450}>
              <span className="ml-12 md:ml-24 rtl:mr-12 rtl:md:mr-24 rtl:ml-0 block text-white">{t.title_2}</span>
            </Reveal>
            <Reveal delay={600}>
              <span className="block">{t.title_3}</span>
            </Reveal>
          </h1>
        </div>
        
        <div className="hidden lg:block w-px h-[400px] bg-neutral-800 self-end origin-bottom animate-grow-up"></div>

        <div className="flex flex-col justify-end lg:w-[480px]">
          <div className="space-y-12">
            <Reveal delay={800} className="border-l border-neutral-800 pl-8 rtl:border-l-0 rtl:border-r rtl:pr-8 rtl:pl-0">
              <p className="font-sans text-lg md:text-xl text-neutral-300 leading-relaxed">{t.desc}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-8 rtl:pr-8 rtl:pl-0">
              <Reveal delay={900} className="flex flex-col font-mono text-[10px] uppercase tracking-wider text-neutral-500 border-l border-neutral-800 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
                <span className="mb-1">{t.status_label}</span>
                <span className="text-white font-bold">{t.status_val}</span>
              </Reveal>
              <Reveal delay={1000} className="flex flex-col font-mono text-[10px] uppercase tracking-wider text-neutral-500 border-l border-neutral-800 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
                <span className="mb-1">{t.focus_label}</span>
                <span className="text-white font-bold">{t.focus_val}</span>
              </Reveal>
            </div>
            <Reveal delay={1100} className="pl-8 rtl:pr-8 rtl:pl-0">
               <Button primary className="w-full md:w-auto justify-center">{t.cta}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const { lang } = useContext(LanguageContext);
  const { setView } = useContext(ViewContext);
  const t = TRANSLATIONS[lang].portfolio;

  return (
    <section id="portfolio" className="relative z-10 px-6 md:px-12 py-32 border-b border-neutral-900 bg-black" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="01" title={t.label} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {PROJECTS.map((data, i) => (
            <article key={data.id} className={`group ${i % 2 === 1 ? 'md:mt-32' : ''}`}>
              <Reveal delay={i * 100}>
                <div className="border-t border-neutral-800 pt-6 mb-8 flex justify-between items-start">
                  <div className="flex gap-4">
                    <span className="font-mono text-xs text-neutral-500">{data.id}</span>
                    <div>
                      <h3 className="font-sans text-2xl font-bold uppercase mb-2 group-hover:text-neutral-400 transition-colors">{data.title}</h3>
                      <p className="font-mono text-xs text-neutral-500 uppercase">{data.category[lang]} — <time>{data.year}</time></p>
                    </div>
                  </div>
                  <Plus size={16} className="text-neutral-600 group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <ParallaxImage src={data.img} alt={data.title} height="h-[400px] md:h-[500px]" className="mb-6 rounded-sm" />
                <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 ease-out">
                   <p className="font-sans text-sm text-neutral-400 max-w-xs">{data.desc[lang]}</p>
                   <span className="font-mono text-xs underline cursor-pointer uppercase text-white hover:text-neutral-400">{t.view_project}</span>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
        <div className="mt-40 flex justify-center gap-8 flex-col md:flex-row items-center">
           <Reveal>
             <Button>{t.view_all}</Button>
           </Reveal>
           <Reveal delay={200}>
             <Button onClick={() => setView('interior')} className="bg-neutral-900 border-neutral-700 hover:bg-white hover:text-black hover:border-white">
                {t.view_interior}
             </Button>
           </Reveal>
        </div>
      </div>
    </section>
  );
};

const InteriorView = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[60vh] flex flex-col justify-center items-center px-6 border-b border-neutral-900">
         <ParallaxImage src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2700&auto=format&fit=crop" alt="Interior Hero" className="absolute inset-0 w-full h-full opacity-40 grayscale" height="h-full" />
         <div className="relative z-10 text-center max-w-2xl mx-auto">
           <Reveal>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4 block">{t.portfolio.view_interior}</span>
            <h1 className="font-sans text-5xl md:text-7xl font-bold uppercase mb-8">{t.interior.label}</h1>
            <p className="font-sans text-xl text-neutral-300">{t.interior.desc}</p>
           </Reveal>
         </div>
      </section>

      <section className="px-6 md:px-12 py-32 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INTERIOR_PROJECTS.map((data, i) => (
             <article key={data.id} className="group">
               <Reveal delay={i * 100}>
                 <ParallaxImage src={data.img} alt={data.title} height="h-[600px]" className="mb-8" />
                 <div className="flex justify-between items-baseline border-b border-neutral-800 pb-4 mb-4">
                    <h3 className="font-sans text-2xl font-bold uppercase">{data.title}</h3>
                    <span className="font-mono text-xs text-neutral-500">{data.year}</span>
                 </div>
                 <div className="flex justify-between text-sm text-neutral-400">
                   <span>{data.category[lang]}</span>
                   <span>{data.desc[lang]}</span>
                 </div>
               </Reveal>
             </article>
          ))}
        </div>
      </section>
    </div>
  );
};

const Expertise = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang].expertise;

  return (
    <section id="expertise" className="relative z-10 px-6 md:px-12 py-32 bg-neutral-950 border-b border-neutral-900" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-end gap-16 lg:gap-32">
        <div className="flex-1 lg:max-w-xl">
          <SectionLabel number="02" title={t.label} />
          <Reveal delay={200}>
            <p className="font-sans text-lg text-neutral-400 leading-relaxed mb-12 border-l border-neutral-800 pl-6 rtl:border-l-0 rtl:border-r rtl:pr-6">{t.intro}</p>
          </Reveal>
          <Reveal delay={300}>
            <ParallaxImage src="https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2600&auto=format&fit=crop" alt="Structural Expertise" height="h-[500px]" />
          </Reveal>
        </div>
        <div className="hidden lg:block w-px h-[600px] bg-neutral-800 mt-20 self-end"></div>
        <div className="flex-1 flex flex-col justify-end lg:w-[480px]">
          <div className="mt-12 lg:mt-0">
            {t.services.map((s, i) => (
              <React.Fragment key={i}>
                <Reveal delay={i * 100}>
                  <div className="group border-t border-neutral-800 py-12 hover:bg-neutral-900 transition-colors px-6 -mx-6">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                      <span className="font-mono text-xs text-neutral-600 min-w-[3rem]">0{i+1}</span>
                      <div className="flex-1">
                        <h3 className="font-sans text-3xl md:text-4xl font-medium mb-4 group-hover:pl-4 rtl:group-hover:pr-4 rtl:group-hover:pl-0 transition-all duration-300 text-white">{s.title}</h3>
                        <p className="font-sans text-neutral-500 max-w-md group-hover:text-neutral-300 transition-colors">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </React.Fragment>
            ))}
            <div className="border-t border-neutral-800"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Agency = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang].agency;

  return (
    <section id="agency" className="relative z-10 px-6 md:px-12 py-32 border-b border-neutral-900 bg-black" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
       <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-end gap-16 lg:gap-32">
           <div className="flex-1 lg:max-w-xl">
             <SectionLabel number="03" title={t.label} />
             <Reveal delay={200}>
               <figure className="mb-32">
                 <blockquote className="font-serif text-3xl md:text-5xl leading-tight text-white italic opacity-90">"{t.quote}"</blockquote>
               </figure>
             </Reveal>
             <div className="space-y-12 text-neutral-400 font-sans text-lg leading-relaxed">
               <Reveal delay={300}><p>{t.desc_1}</p></Reveal>
               <Reveal delay={400}><p>{t.desc_2}</p></Reveal>
             </div>
             <Reveal delay={500}>
                <div className="grid grid-cols-3 gap-12 mt-32 border-t border-neutral-800 pt-16">
                    <div>
                      <span className="block font-sans text-5xl font-bold text-white mb-2">8+</span>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase">{t.stats.exp}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-5xl font-bold text-white mb-2">45</span>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase">{t.stats.projects}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-5xl font-bold text-white mb-2">100%</span>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase">{t.stats.engagement}</span>
                    </div>
                </div>
             </Reveal>
           </div>
           <div className="hidden lg:block w-px h-[800px] bg-neutral-800 self-end"></div>
           <div className="relative flex-1 lg:max-w-lg w-full">
             <Reveal delay={600}>
               <ParallaxImage src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2580&auto=format&fit=crop" alt="Akram Halisse" height="h-[700px]" className="z-10" />
               <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 bg-black p-6 border-t border-r rtl:border-r-0 rtl:border-l border-neutral-800 z-20">
                 <p className="font-mono text-sm text-white mb-1">AKRAM HALISSE</p>
                 <p className="font-mono text-[10px] text-neutral-500 uppercase">{t.role}</p>
               </div>
             </Reveal>
           </div>
       </div>
    </section>
  );
};

const Contact = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang].contact;

  return (
    <section id="contact" className="relative z-10 px-6 md:px-12 py-32 bg-neutral-950" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-end gap-16 lg:gap-32">
        <div className="flex-1 lg:max-w-md">
           <SectionLabel number="04" title={t.label} />
           <div className="space-y-16">
             <Reveal>
                <p className="font-sans text-2xl text-white mb-12 leading-normal">{t.intro}</p>
             </Reveal>
             <address className="space-y-8 not-italic">
               <Reveal delay={100}>
                 <div className="flex items-start gap-6 group">
                   <div className="p-3 border border-neutral-800 rounded-full group-hover:border-white transition-colors">
                      <MapPin size={20} className="text-neutral-500 group-hover:text-white transition-colors" />
                   </div>
                   <div>
                     <p className="font-mono text-xs text-neutral-500 uppercase mb-2">{t.address_label}</p>
                     <p className="font-sans text-xl text-white">Marseille</p>
                   </div>
                 </div>
               </Reveal>
               <Reveal delay={200}>
                 <div className="flex items-start gap-6 group">
                   <div className="p-3 border border-neutral-800 rounded-full group-hover:border-white transition-colors">
                      <Phone size={20} className="text-neutral-500 group-hover:text-white transition-colors" />
                   </div>
                   <div>
                     <p className="font-mono text-xs text-neutral-500 uppercase mb-2">{t.phone_label}</p>
                     <p className="font-sans text-xl text-white">0.6.95.97.54.11</p>
                   </div>
                 </div>
               </Reveal>
               <Reveal delay={300}>
                 <div className="flex items-start gap-6 group">
                   <div className="p-3 border border-neutral-800 rounded-full group-hover:border-white transition-colors">
                      <Mail size={20} className="text-neutral-500 group-hover:text-white transition-colors" />
                   </div>
                   <div>
                     <p className="font-mono text-xs text-neutral-500 uppercase mb-2">{t.email_label}</p>
                     <p className="font-sans text-xl text-white">akr.halisse@gmail.com</p>
                   </div>
                 </div>
               </Reveal>
             </address>
             <Reveal delay={400}>
                <div className="pt-8 border-t border-neutral-800 flex gap-8">
                    <a href="#" aria-label="Instagram" className="text-neutral-500 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Instagram size={28} /></a>
                    <a href="#" aria-label="LinkedIn" className="text-neutral-500 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Linkedin size={28} /></a>
                </div>
             </Reveal>
          </div>
        </div>

        <div className="hidden lg:block w-px h-[600px] bg-neutral-800 self-end"></div>

        <div className="flex-1 lg:max-w-2xl w-full">
            <Reveal delay={500}>
              <form className="space-y-12 border border-neutral-800 p-8 md:p-16 bg-black shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="font-mono text-xs uppercase text-neutral-500">{t.form.name}</label>
                    <input type="text" required className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white focus:outline-none transition-colors text-lg placeholder-neutral-800" placeholder={t.form.placeholders.name} />
                  </div>
                  <div className="space-y-4">
                    <label className="font-mono text-xs uppercase text-neutral-500">{t.form.email}</label>
                    <input type="email" required className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white focus:outline-none transition-colors text-lg placeholder-neutral-800" placeholder={t.form.placeholders.email} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="font-mono text-xs uppercase text-neutral-500">{t.form.type}</label>
                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white focus:outline-none transition-colors appearance-none rounded-none text-lg cursor-pointer">
                      {t.form.options.map((opt, i) => <option key={i} className="bg-black">{opt}</option>)}
                    </select>
                    <ArrowDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="font-mono text-xs uppercase text-neutral-500">{t.form.message}</label>
                  <textarea required className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white focus:outline-none transition-colors h-32 resize-none text-lg placeholder-neutral-800" placeholder={t.form.placeholders.message}></textarea>
                </div>
                <Button primary className="w-full justify-center">{t.form.cta}</Button>
              </form>
            </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang].footer;
  return (
    <footer className="bg-black py-12 px-6 md:px-12 border-t border-neutral-900 relative z-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-white flex items-center justify-center font-bold font-sans text-xs">A1</div>
          <span className="font-mono text-xs text-neutral-500">© 2025 A1 STUDIO INC.</span>
        </div>
        <nav className="flex flex-col md:flex-row gap-8 font-mono text-[10px] uppercase text-neutral-600 text-right md:text-left rtl:md:text-right">
          <a href="#" className="hover:text-white transition-colors">{t.legal}</a>
          <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
          <a href="#" className="hover:text-white transition-colors">{t.sitemap}</a>
        </nav>
      </div>
    </footer>
  );
};

const App = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [view, setView] = useState<View>('home');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <ViewContext.Provider value={{ view, setView }}>
        <div className="bg-black min-h-screen text-neutral-200 selection:bg-white selection:text-black font-sans w-full scroll-smooth">
          <Navbar />
          <main>
            {view === 'home' ? (
              <>
                <Hero />
                <Portfolio />
                <Expertise />
                <Agency />
                <Contact />
              </>
            ) : (
              <>
                <InteriorView />
                <Contact />
              </>
            )}
          </main>
          <Footer />
        </div>
      </ViewContext.Provider>
    </LanguageContext.Provider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
