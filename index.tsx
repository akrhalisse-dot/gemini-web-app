import React, { useState, useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowDown, Plus, MapPin, Mail, Phone, Instagram, Linkedin, Menu, X, ArrowLeft } from 'lucide-react';

// --- 1. TYPES & INTERFACES ---

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
  concept?: LocalizedString;
  year: string;
  img: string;
  category: LocalizedString;
  desc: LocalizedString;
}

// --- 2. DATA CONSTANTS ---

// PROJETS ARCHITECTURE (EXTÉRIEUR)
const PROJECTS: ProjectData[] = [
  {
    id: "01",
    title: "LOGEMENT COLLECTIF",
    concept: { fr: "Séquences Urbaines & Verticalité Habitée", en: "Urban Sequences & Inhabited Verticality", ar: "تلسلسل حضري وعمودية مأهولة" },
    year: "2023",
    img: "/Logement Collectif.jpg",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { 
      fr: "Réponse sculpturale à la densité urbaine. Chaque appartement est pensé comme une villa suspendue, prolongée par de profonds espaces extérieurs.", 
      en: "A sculptural response to urban density. Each apartment is designed as a suspended villa with deep outdoor spaces.", 
      ar: "استجابة نحتية للكثافة الحضرية. تم تصميم كل شقة كفيلا معلقة مع مساحات خارجية عميقة." 
    }
  },
  {
    id: "02",
    title: "MOSQUÉE & CENTRE CULTUEL",
    concept: { fr: "Lumière Sacrée & Abstraction Géométrique", en: "Sacred Light & Geometric Abstraction", ar: "نور مقدس وتجريد هندسي" },
    year: "2022",
    img: "/Mosquée.jpg",
    category: { fr: "ÉQUIPEMENT PUBLIC", en: "Public Facility", ar: "مرفق عام" },
    desc: { 
      fr: "Une réinterprétation contemporaine de l'architecture sacrée. Conçu comme un monolithe de lumière, l'édifice s'ancre dans la ville avec une puissance silencieuse.", 
      en: "A contemporary reinterpretation of sacred architecture. Designed as a monolith of light, the building anchors itself in the city with silent power.", 
      ar: "إعادة تفسير معاصرة للعمارة المقدسة. صمم المبنى ككتلة من النور، يرسخ نفسه في المدينة بقوة صامتة." 
    }
  },
  {
    id: "03",
    title: "RÉSIDENCE MÉDITERRANÉENNE",
    concept: { fr: "Ancrage Tellurique & Matières Brutes", en: "Telluric Anchoring & Raw Materials", ar: "رسو أرضي ومواد خام" },
    year: "2023",
    img: "/Résidence méditéranée.jpg",
    category: { fr: "VILLA PRIVÉE", en: "Private Villa", ar: "فيلا خاصة" },
    desc: { 
      fr: "Architecture du néo-vernaculaire où le bâti semble émerger de la terre. La pierre sèche locale et le béton brut dialoguent avec la minéralité du site.", 
      en: "Neo-vernacular architecture where the building seems to emerge from the earth. Local dry stone and raw concrete dialogue with the site's minerality.", 
      ar: "عمارة محلية جديدة يبدو فيها البناء وكأنه ينبثق من الأرض. الحجر المحلي والخرسانة الخام يتحاوران مع طبيعة الموقع." 
    }
  },
  {
    id: "04",
    title: "MAISON NÉO-TRADITIONNELLE",
    concept: { fr: "Comment habiter la tradition aujourd'hui ?", en: "Inhabiting tradition today", ar: "كيف نسكن التقاليد اليوم؟" },
    year: "2024",
    img: "/Maison Néo-Traditionnelle.jpg",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { 
      fr: "Hybridation des codes classiques avec une écriture épurée. Nous avons revisité la silhouette archétypale de la maison à toiture tuiles en purifiant ses lignes.", 
      en: "Hybridizing classic codes with a clean style. We revisited the archetypal silhouette of the tiled-roof house by purifying its lines.", 
      ar: "تهجين الرموز الكلاسيكية بأسلوب مبسط. قمنا بإعادة صياغة الصورة النمطية للمنزل ذو السقف القرميدي بتنقية خطوطه." 
    }
  },
  {
    id: "05",
    title: "VILLA DESIGN",
    concept: { fr: "L'Éloge de l'Horizon", en: "In Praise of the Horizon", ar: "مدح الأفق" },
    year: "2023",
    img: "/Villa design .jpg",
    category: { fr: "LUXE", en: "Luxury", ar: "فاخر" },
    desc: { 
      fr: "Une architecture de la transparence conçue pour abolir les frontières. Les baies vitrées toute hauteur transforment le salon en une vaste loggia ouverte sur la nature.", 
      en: "Architecture of transparency designed to abolish boundaries. Full-height windows transform the living room into a vast loggia open to nature.", 
      ar: "عمارة الشفافية المصممة لإلغاء الحدود. النوافذ الممتدة من الأرض للسقف تحول الصالون إلى شرفة واسعة مفتوحة على الطبيعة." 
    }
  },
  {
    id: "06",
    title: "EXTENSION BOIS",
    concept: { fr: "Pavillon de Lumière & Transparence", en: "Pavilion of Light & Transparency", ar: "جناح النور والشفافية" },
    year: "2024",
    img: "/Villa  Extension Bois.jpg",
    category: { fr: "EXTENSION", en: "Extension", ar: "توسعة" },
    desc: { 
      fr: "Pensée comme un pavillon habité, cette villa explore la légèreté. L'alliance du bois et du verre minimise l'empreinte visuelle pour laisser entrer le jardin.", 
      en: "Conceived as an inhabited pavilion exploring lightness. The alliance of wood and glass minimizes the visual footprint to let the garden in.", 
      ar: "صممت كجناح مسكون يستكشف الخفة. تحالف الخشب والزجاج يقلل من البصمة البصرية ليسمح للحديقة بالدخول." 
    }
  },
  {
    id: "07",
    title: "VILLA FORESTIÈRE",
    concept: { fr: "Immersion Sylvestre & Mimétisme Matériel", en: "Forest Immersion & Material Mimicry", ar: "انغماس في الغابة ومحاكاة مادية" },
    year: "2023",
    img: "/Villa Forestière.jpg", 
    category: { fr: "VILLA PRIVÉE", en: "Private Villa", ar: "فيلا خاصة" },
    desc: { 
      fr: "Conçue comme un trait d'union entre l'homme et la forêt. Le bardage en bois patiné et les larges baies vitrées ancrent le bâti dans une temporalité lente.", 
      en: "Designed as a hyphen between man and forest. Weathered wood cladding and large windows anchor the building in a slow temporality.", 
      ar: "صممت كهمزة وصل بين الإنسان والغابة. تكسية الخشب المعتق والنوافذ الكبيرة ترسي المبنى في زمنية بطيئة." 
    }
  }
];

// --- PROJETS INTÉRIEURS ---
const INTERIOR_PROJECTS: ProjectData[] = [
  {
    id: "INT-01",
    title: "SALON MINIMALISTE",
    year: "2024",
    img: "/salon.jpg",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Jeu de lumière et mobilier sculptural.", en: "Light play and sculptural furniture.", ar: "تلاعب بالضوء وأثاث نحتي." }
  },
  {
    id: "INT-02",
    title: "CUISINE",
    year: "2023",
    img: "/cuisine.jpg",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Fonctionnalité et design intemporel.", en: "Functionality and timeless design.", ar: "وظيفية وتصميم خالد." }
  },
  {
    id: "INT-03",
    title: "SALLE À MANGER",
    year: "2024",
    img: "/salle à manger.jpg",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Espace de convivialité épuré.", en: "Refined conviviality space.", ar: "مساحة ضيافة راقية." }
  },
  {
    id: "INT-04",
    title: "CHAMBRE",
    year: "2023",
    img: "/chambre.jpg", 
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Atmosphère apaisante et textures douces.", en: "Soothing atmosphere and soft textures.", ar: "جو مريح وملمس ناعم." }
  },
  {
    id: "INT-05",
    title: "SALLE DE BAIN",
    year: "2023",
    img: "/sdb.jpg", 
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Matérialité brute et élégance.", en: "Raw materiality and elegance.", ar: "مواد خام وأناقة." }
  },
  {
    id: "INT-06",
    title: "ESPACE DE TRAVAIL",
    year: "2023",
    img: "/Bureau.jpg", 
    category: { fr: "BUREAU", en: "Office", ar: "مكتب" },
    desc: { fr: "Bureau à domicile minimaliste.", en: "Minimalist home office.", ar: "مكتب منزلي بسيط." }
  }
];

const TRANSLATIONS = {
  fr: {
    nav: { projects: "Projets", expertise: "Expertise", agency: "L'Agence", contact: "Contact", open_menu: "Menu", close_menu: "Fermer", back: "Retour" },
    hero: { 
      est: "EST. 2016 — MARSEILLE, FR", 
      title_1: "Architecture", title_2: "& Design", title_3: "Global", 
      desc: "Vision Stratégique | Conception Avancée | Exécution. A1 Studio opère à la croisée de l'exigence technique et de l'émotion spatiale.", 
      status_label: "APPROCHE", status_val: "RATIONALITÉ SENSIBLE", focus_label: "EXPERTISE", focus_val: "RÉSIDENTIEL / PUBLIC / URBAIN", cta: "Démarrer un projet" 
    },
    portfolio: { label: "Sélection de Projets", view_project: "VOIR LE PROJET", view_all: "Voir tout le portfolio", view_interior: "Portfolio Design Intérieur" },
    interior: { label: "Design Intérieur", desc: "Une exploration de la matière, de la lumière et du détail à l'échelle intime." },
    expertise: { 
      label: "Notre Processus", 
      intro: "De la Vision à la Réalité. Nous ne livrons pas seulement des plans, mais des solutions spatiales durables.", 
      services: [
        { title: "Analyse & Stratégie", desc: "Immersion sur site, décryptage du programme et définition des enjeux budgétaires." }, 
        { title: "Conception & Identité", desc: "Recherche volumétrique et écriture architecturale. Nous sculptons l'espace et validons les matérialités." }, 
        { title: "Définition Technique", desc: "Détails d'exécution, choix structurels et rédaction des descriptifs (CCTP)." }, 
        { title: "Direction de l'Exécution", desc: "Pilotage rigoureux des entreprises et contrôle financier jusqu'à la remise des clés." }
      ] 
    },
    agency: { 
      label: "L'Architecte", role: "AKRAM HALISSE — FONDATEUR", 
      quote: "L'architecture façonne la valeur de votre patrimoine.", 
      desc_1: "Architecte de la matière et de la lumière, Akram Halisse envisage l'acte de bâtir comme une recherche d'équilibre entre innovation typologique et sagesse vernaculaire.", 
      desc_2: "Sa signature se distingue par une élégance radicale, privilégiant les matériaux pérennes (pierre, béton, bois) qui vieillissent noblement.", 
      stats: { exp: "Années d'expérience", projects: "Projets Livrés", engagement: "Engagement" } 
    },
    contact: { label: "Contact & Études", intro: "Que vous envisagiez une construction neuve ou une réhabilitation complexe, A1 Studio concrétise vos ambitions.", address_label: "Adresse", phone_label: "Téléphone", email_label: "Email", form: { name: "Nom / Entreprise", email: "Email", type: "Type de projet", message: "Message", cta: "Envoyer la demande", placeholders: { name: "Entrez votre nom", email: "votre@email.com", message: "Décrivez votre projet..." }, options: ["Construction Neuve", "Rénovation / Réhabilitation", "Extension", "Autre"] } },
    footer: { legal: "Mentions Légales", privacy: "Politique de Confidentialité", sitemap: "Plan du site" }
  },
  en: {
    nav: { projects: "Projects", expertise: "Expertise", agency: "Agency", contact: "Contact", open_menu: "Menu", close_menu: "Close", back: "Back" },
    hero: { est: "EST. 2016 — MARSEILLE, FR", title_1: "Architecture", title_2: "& Global", title_3: "Design", desc: "Strategic Vision | Advanced Design | Execution. A1 Studio operates at the crossroads of technical exigency and spatial emotion.", status_label: "APPROACH", status_val: "SENSITIVE RATIONALITY", focus_label: "FOCUS", focus_val: "RESIDENTIAL / PUBLIC / URBAN", cta: "Start a project" },
    portfolio: { label: "Selected Projects", view_project: "VIEW PROJECT", view_all: "View full portfolio", view_interior: "Interior Design Portfolio" },
    interior: { label: "Interior Design", desc: "An exploration of material, light, and detail on an intimate scale." },
    expertise: { label: "Our Process", intro: "From Vision to Reality. We don't just deliver plans, but sustainable spatial solutions.", services: [{ title: "Analysis & Strategy", desc: "On-site immersion, program decoding, and definition of budgetary issues." }, { title: "Design & Identity", desc: "Volumetric research and architectural style. We sculpt space and validate materials." }, { title: "Technical Definition", desc: "Execution details, structural choices, and drafting of specifications." }, { title: "Construction Management", desc: "Rigorous management of contractors and financial control until key handover." }] },
    agency: { label: "The Architect", role: "AKRAM HALISSE — FOUNDER", quote: "Architecture shapes the value of your heritage.", desc_1: "Architect of matter and light, Akram Halisse envisions building as a balance between typological innovation and vernacular wisdom.", desc_2: "His signature is distinguished by radical elegance, prioritizing enduring materials (stone, concrete, wood) that age nobly.", stats: { exp: "Years of Experience", projects: "Delivered Projects", engagement: "Commitment" } },
    contact: { label: "Contact & Inquiries", intro: "Whether you plan a new construction or a complex rehabilitation, A1 Studio realizes your ambitions.", address_label: "Address", phone_label: "Phone", email_label: "Email", form: { name: "Name / Company", email: "Email", type: "Project Type", message: "Message", cta: "Send Request", placeholders: { name: "Enter your name", email: "your@email.com", message: "Describe your project..." }, options: ["New Construction", "Renovation / Rehab", "Extension", "Other"] } },
    footer: { legal: "Legal Notice", privacy: "Privacy Policy", sitemap: "Sitemap" }
  },
  ar: {
    nav: { projects: "المشاريع", expertise: "الخبرة", agency: "الوكالة", contact: "اتصل بنا", open_menu: "قائمة", close_menu: "إغلاق", back: "رجوع" },
    hero: { est: "تأسست 2016 - مارسيليا، فرنسا", title_1: "الهندسة", title_2: "والتصميم", title_3: "الشامل", desc: "رؤية استراتيجية | تصميم متقدم | تنفيذ. يعمل استوديو A1 عند تقاطع الصرامة التقنية والعاطفة المكانية.", status_label: "النهج", status_val: "عقلانية حساسة", focus_label: "التخصص", focus_val: "سكني / عام / حضري", cta: "ابدأ مشروعاً" },
    portfolio: { label: "مختارات من المشاريع", view_project: "عرض المشروع", view_all: "عرض المحفظة الكاملة", view_interior: "تصميم داخلي" },
    interior: { label: "التصميم الداخلي", desc: "استكشاف للمادة والضوء والتفاصيل على نطاق حميم." },
    expertise: { label: "عمليتنا", intro: "من الرؤية إلى الواقع. نحن لا نقدم مخططات فحسب، بل حلولاً مكانية مستدامة.", services: [{ title: "التحليل والاستراتيجية", desc: "الانغماس في الموقع، وفك رموز البرنامج وتحديد القضايا المالية." }, { title: "التصميم والهوية", desc: "البحث الحجمي والكتابة المعمارية. ننحت الفضاء ونتحقق من المواد." }, { title: "التعريف التقني", desc: "تفاصيل التنفيذ، الخيارات الهيكلية وصياغة المواصفات." }, { title: "إدارة التنفيذ", desc: "إدارة صارمة للمقاولين والرقابة المالية حتى تسليم المفتاح." }] },
    agency: { label: "المهندس المعماري", role: "أكرم حليس - المؤسس", quote: "العمارة تشكل قيمة تراثك.", desc_1: "مهندس المادة والضوء، يرى أكرم حليس البناء كبحث عن التوازن بين الابتكار النموذجي والحكمة المحلية.", desc_2: "تتميز بصمته بأناقة جذرية، مع إعطاء الأولوية للمواد الدائمة (الحجر، الخرسانة، الخشب) التي تعتق بنبل.", stats: { exp: "سنوات من الخبرة", projects: "مشاريع تم تسليمها", engagement: "التزام" } },
    contact: { label: "اتصل بنا", intro: "سواء كنت تفكر في بناء جديد أو إعادة تأهيل معقدة، يحقق A1 Studio طموحاتك.", address_label: "العنوان", phone_label: "الهاتف", email_label: "البريد الإلكتروني", form: { name: "الاسم / الشركة", email: "البريد الإلكتروني", type: "نوع المشروع", message: "الرسالة", cta: "إرسال الطلب", placeholders: { name: "أدخل اسمك", email: "your@email.com", message: "صف مشروعك..." }, options: ["بناء جديد", "تجديد / إعادة تأهيل", "توسعة", "أخرى"] } },
    footer: { legal: "إشعارات قانونية", privacy: "سياسة الخصوصية", sitemap: "خريطة الموقع" }
  }
};

const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'fr', setLang: () => {} });
const ViewContext = createContext<{ view: View; setView: (v: View) => void }>({ view: 'home', setView: () => {} });

// --- 3. CUSTOM HOOKS ---

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
      <div className="absolute inset-0 z-0">
         <img 
          src="/Villa Forestière.jpg"
          alt="Architecture Background"
          className="w-full h-full object-cover opacity-60 grayscale animate-pulse-slow" 
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
                      {data.concept && <p className="font-sans text-sm text-white mb-2 italic opacity-80">{data.concept[lang]}</p>}
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
         <ParallaxImage src="/salon.jpg" alt="Interior Hero" className="absolute inset-0 w-full h-full opacity-40 grayscale" height="h-full" />
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
                 {/* FIX: Utilisation d'une balise <img> standard avec un ratio 16/9 
                    pour afficher l'image en entier sans effet de zoom/crop excessif.
                 */}
                 <div className="overflow-hidden mb-8 aspect-[16/9] bg-neutral-900">
                    <img 
                      src={data.img} 
                      alt={data.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                 </div>
                 
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
            <ParallaxImage src="/Villa  Extension Bois.jpg" alt="Technical Expertise" height="h-[500px]" />
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
               <ParallaxImage src="/Architecte.jpg" alt="Akram Halisse" height="h-[700px]" className="z-10" />
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

  // FIX SCROLL: Remonter en haut de page à chaque changement de vue
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

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
