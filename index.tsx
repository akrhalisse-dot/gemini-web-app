import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Plus, MapPin, Mail, Phone, Instagram, Linkedin, Menu, X, ArrowLeft } from 'lucide-react';

// --- TYPES ---
type Language = 'fr' | 'en' | 'ar';
type View = 'home' | 'interior' | 'project-detail';

interface LocalizedString { fr: string; en: string; ar: string; }
interface ProjectData {
  id: string;
  title: string;
  concept?: LocalizedString;
  year: string;
  img: string;
  gallery?: string[];
  category: LocalizedString;
  desc: LocalizedString;
  location?: string;
  surface?: string;
}

// --- DONNÉES (VOS FICHIERS EXACTS) ---
const PROJECTS: ProjectData[] = [
  {
    id: "01", title: "LOGEMENT COLLECTIF", year: "2023", location: "Marseille, FR", surface: "2400 m²",
    concept: { fr: "Séquences Urbaines", en: "Urban Sequences", ar: "تلسلسل حضري" },
    img: "/Logement Collectif.jpg",
    gallery: ["/Logement Collectif.jpg"],
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Réponse sculpturale à la densité urbaine.", en: "Sculptural response to urban density.", ar: "استجابة نحتية للكثافة الحضرية." }
  },
  {
    id: "02", title: "MOSQUÉE & CENTRE CULTUEL", year: "2022", location: "Lyon, FR", surface: "1200 m²",
    concept: { fr: "Lumière Sacrée", en: "Sacred Light", ar: "نور مقدس" },
    img: "/Mosquée.jpg",
    gallery: ["/Mosquée.jpg"],
    category: { fr: "ÉQUIPEMENT", en: "Facility", ar: "مرفق" },
    desc: { fr: "Architecture sacrée contemporaine.", en: "Contemporary sacred architecture.", ar: "عمارة مقدسة معاصرة." }
  },
  {
    id: "03", title: "RÉSIDENCE MÉDITERRANÉENNE", year: "2023", location: "Cassis, FR", surface: "350 m²",
    concept: { fr: "Ancrage Tellurique", en: "Telluric Anchoring", ar: "رسو أرضي" },
    img: "/Résidence méditéranée.jpg",
    gallery: ["/Résidence méditéranée.jpg"],
    category: { fr: "VILLA", en: "Villa", ar: "فيلا" },
    desc: { fr: "Architecture du néo-vernaculaire.", en: "Neo-vernacular architecture.", ar: "عمارة محلية جديدة." }
  },
  {
    id: "04", title: "MAISON NÉO-TRADITIONNELLE", year: "2024", location: "Aix, FR", surface: "180 m²",
    concept: { fr: "Habiter la tradition", en: "Inhabiting tradition", ar: "السكن التقليدي" },
    img: "/Maison Néo-Traditionnelle.jpg",
    gallery: ["/Maison Néo-Traditionnelle.jpg"],
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Hybridation des codes classiques.", en: "Hybridizing classic codes.", ar: "تهجين الرموز الكلاسيكية." }
  },
  {
    id: "05", title: "VILLA DESIGN", year: "2023", location: "Cannes, FR", surface: "420 m²",
    concept: { fr: "Éloge de l'Horizon", en: "Praise of Horizon", ar: "مدح الأفق" },
    img: "/Villa design .jpg", // Espace conservé
    gallery: ["/Villa design .jpg"],
    category: { fr: "LUXE", en: "Luxury", ar: "فاخر" },
    desc: { fr: "Architecture de la transparence.", en: "Architecture of transparency.", ar: "عمارة الشفافية." }
  },
  {
    id: "06", title: "EXTENSION BOIS", year: "2024", location: "Annecy, FR", surface: "85 m²",
    concept: { fr: "Pavillon de Lumière", en: "Light Pavilion", ar: "جناح النور" },
    img: "/Villa  Extension Bois.jpg", // Deux espaces conservés
    gallery: ["/Villa  Extension Bois.jpg"],
    category: { fr: "EXTENSION", en: "Extension", ar: "توسعة" },
    desc: { fr: "Légèreté et immersion végétale.", en: "Lightness and vegetal immersion.", ar: "خفة وانغماس نباتي." }
  },
  {
    id: "07", title: "VILLA FORESTIÈRE", year: "2023", location: "Vosges, FR", surface: "210 m²",
    concept: { fr: "Immersion Sylvestre", en: "Forest Immersion", ar: "انغماس غابوي" },
    img: "/Villa Forestière.jpg",
    gallery: ["/Villa Forestière.jpg"],
    category: { fr: "VILLA", en: "Villa", ar: "فيلا" },
    desc: { fr: "Trait d'union entre l'homme et la forêt.", en: "Link between man and forest.", ar: "وصل بين الإنسان والغابة." }
  }
];

const INTERIOR_PROJECTS: ProjectData[] = [
  { id: "INT-01", title: "SALON MINIMALISTE", year: "2024", img: "/salon.jpg", category: { fr: "SALON", en: "Living", ar: "صالون" }, desc: { fr: "Lumière et matière.", en: "Light and matter.", ar: "ضوء ومادة." } },
  { id: "INT-02", title: "CUISINE", year: "2023", img: "/cuisine.jpg", category: { fr: "CUISINE", en: "Kitchen", ar: "مطبخ" }, desc: { fr: "Fonctionnalité pure.", en: "Pure functionality.", ar: "وظيفية بحتة." } },
  { id: "INT-03", title: "SALLE À MANGER", year: "2024", img: "/salle à manger.jpg", category: { fr: "RÉCEPTION", en: "Dining", ar: "غرفة طعام" }, desc: { fr: "Convivialité épurée.", en: "Refined conviviality.", ar: "ضيافة راقية." } },
  { id: "INT-04", title: "CHAMBRE", year: "2023", img: "/chambre.jpg", category: { fr: "NUIT", en: "Bedroom", ar: "غرفة نوم" }, desc: { fr: "Atmosphère apaisante.", en: "Soothing atmosphere.", ar: "جو مريح." } },
  { id: "INT-05", title: "SALLE DE BAIN", year: "2023", img: "/sdb.jpg", category: { fr: "BAIN", en: "Bath", ar: "حمام" }, desc: { fr: "Élégance brute.", en: "Raw elegance.", ar: "أناقة خام." } },
  { id: "INT-06", title: "ESPACE DE TRAVAIL", year: "2023", img: "/Bureau.jpg", category: { fr: "BUREAU", en: "Office", ar: "مكتب" }, desc: { fr: "Concentration.", en: "Focus.", ar: "تركيز." } }
];

const TRANSLATIONS = {
  fr: {
    nav: { projects: "Projets", expertise: "Expertise", agency: "L'Agence", contact: "Contact", open_menu: "Menu", close_menu: "Fermer", back: "Retour" },
    hero: { est: "EST. 2016 — MARSEILLE, FR", title_1: "Architecture", title_2: "& Design", title_3: "Global", desc: "Vision Stratégique | Conception Avancée | Exécution.", status_label: "APPROCHE", status_val: "RATIONALITÉ SENSIBLE", focus_label: "EXPERTISE", focus_val: "RÉSIDENTIEL / PUBLIC", cta: "Démarrer un projet" },
    portfolio: { label: "Sélection de Projets", view_project: "VOIR", view_all: "Voir tout", view_interior: "Portfolio Intérieur" },
    interior: { label: "Design Intérieur", desc: "Le détail à l'échelle intime." },
    expertise: { label: "Savoir-faire", intro: "De la Vision à la Réalité.", services: [{ title: "Faisabilité", desc: "Analyse et potentiel." }, { title: "Conception", desc: "Création et permis." }, { title: "Technique", desc: "Détails et plans." }, { title: "Chantier", desc: "Suivi et qualité." }] },
    agency: { label: "L'Architecte", role: "AKRAM HALISSE", quote: "L'architecture façonne votre patrimoine.", desc_1: "Équilibre entre innovation et sagesse vernaculaire.", desc_2: "Matériaux pérennes et élégance radicale.", stats: { exp: "Années", projects: "Projets", engagement: "Engagement" } },
    contact: { label: "Contact", intro: "Concrétisons vos ambitions.", address_label: "Adresse", phone_label: "Tél", email_label: "Email", form: { name: "Nom", email: "Email", message: "Message", cta: "Envoyer" } },
    footer: { legal: "Mentions Légales", privacy: "Confidentialité", sitemap: "Plan" },
    detail: { client: "Client", year: "Année", surface: "Surface", location: "Lieu" }
  },
  en: { nav: { projects: "Projects", expertise: "Expertise", agency: "Agency", contact: "Contact", open_menu: "Menu", close_menu: "Close", back: "Back" }, hero: { est: "EST. 2016 — MARSEILLE, FR", title_1: "Architecture", title_2: "& Global", title_3: "Design", desc: "Strategic Vision | Execution.", status_label: "APPROACH", status_val: "SENSITIVE RATIONALITY", focus_label: "FOCUS", focus_val: "RESIDENTIAL / PUBLIC", cta: "Start Project" }, portfolio: { label: "Selected Projects", view_project: "VIEW", view_all: "View All", view_interior: "Interior Portfolio" }, interior: { label: "Interior Design", desc: "Detail at intimate scale." }, expertise: { label: "Expertise", intro: "From Vision to Reality.", services: [{ title: "Feasibility", desc: "Analysis." }, { title: "Design", desc: "Creation." }, { title: "Technical", desc: "Plans." }, { title: "Construction", desc: "Management." }] }, agency: { label: "Architect", role: "AKRAM HALISSE", quote: "Architecture shapes heritage.", desc_1: "Innovation and wisdom.", desc_2: "Timeless materials.", stats: { exp: "Years", projects: "Projects", engagement: "Commitment" } }, contact: { label: "Contact", intro: "Let's build.", address_label: "Address", phone_label: "Phone", email_label: "Email", form: { name: "Name", email: "Email", message: "Message", cta: "Send" } }, footer: { legal: "Legal", privacy: "Privacy", sitemap: "Sitemap" }, detail: { client: "Client", year: "Year", surface: "Area", location: "Location" } },
  ar: { nav: { projects: "المشاريع", expertise: "الخبرة", agency: "الوكالة", contact: "اتصل بنا", open_menu: "قائمة", close_menu: "إغلاق", back: "رجوع" }, hero: { est: "تأسست 2016", title_1: "الهندسة", title_2: "والتصميم", title_3: "الشامل", desc: "رؤية وتنفيذ", status_label: "النهج", status_val: "عقلانية", focus_label: "التخصص", focus_val: "سكني / عام", cta: "ابدأ" }, portfolio: { label: "المشاريع", view_project: "عرض", view_all: "الكل", view_interior: "تصميم داخلي" }, interior: { label: "تصميم داخلي", desc: "تفاصيل دقيقة" }, expertise: { label: "الخبرة", intro: "من الرؤية للواقع", services: [{ title: "تحليل", desc: "دراسة" }, { title: "تصميم", desc: "إبداع" }, { title: "تقني", desc: "مخططات" }, { title: "تنفيذ", desc: "إدارة" }] }, agency: { label: "المهندس", role: "أكرم حليس", quote: "العمارة تراث", desc_1: "ابتكار", desc_2: "أناقة", stats: { exp: "سنوات", projects: "مشاريع", engagement: "التزام" } }, contact: { label: "اتصل", intro: "لنبني", address_label: "عنوان", phone_label: "هاتف", email_label: "بريد", form: { name: "اسم", email: "بريد", message: "رسالة", cta: "إرسال" } }, footer: { legal: "قانوني", privacy: "خصوصية", sitemap: "خريطة" }, detail: { client: "عميل", year: "سنة", surface: "مساحة", location: "موقع" } }
};

const LanguageContext = createContext<any>(null);
const ViewContext = createContext<any>(null);

// --- COMPOSANTS ---

const Reveal = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const Navbar = () => {
  const { lang, setLang } = useContext(LanguageContext);
  const { view, setView } = useContext(ViewContext);
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang as Language].nav;
  
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference text-white">
      <button onClick={() => setView('home')} className="font-bold text-xl tracking-tighter flex items-center gap-2">
        {view !== 'home' && <ArrowLeft size={18} />} A1 STUDIO
      </button>
      <div className="hidden md:flex gap-6 text-xs font-mono uppercase">
        {view === 'home' && ['portfolio', 'expertise', 'agency'].map(k => <a key={k} href={`#${k}`} className="hover:opacity-50 transition-opacity">{TRANSLATIONS[lang as Language].nav[k as keyof typeof t]}</a>)}
        <div className="flex gap-2 ml-4">
          {['fr','en','ar'].map(l => <button key={l} onClick={() => setLang(l)} className={`${lang === l ? 'underline' : ''}`}>{l.toUpperCase()}</button>)}
        </div>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden"><Menu /></button>
      {isOpen && (
        <div className="fixed inset-0 bg-black flex flex-col justify-center items-center gap-8 z-50">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6"><X /></button>
          {['home', 'portfolio', 'contact'].map(k => <button key={k} onClick={() => { setIsOpen(false); setView('home'); }} className="text-2xl uppercase font-bold">{k}</button>)}
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang as Language].hero;
  return (
    <section className="h-screen flex flex-col justify-end px-6 pb-12 relative overflow-hidden">
      <img src="/Villa Forestière.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative z-10">
        <Reveal><h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-6 text-white">{t.title_1}<br/>{t.title_2}</h1></Reveal>
        <Reveal delay={200}><p className="text-xl md:text-2xl text-neutral-300 max-w-xl">{t.desc}</p></Reveal>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const { lang } = useContext(LanguageContext);
  const { setView, setCurrentProject } = useContext(ViewContext);
  const t = TRANSLATIONS[lang as Language].portfolio;
  
  return (
    <section id="portfolio" className="px-6 py-24 bg-black text-white">
      <Reveal><h2 className="text-xs font-mono uppercase text-neutral-500 mb-12">/ {t.label}</h2></Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className="group cursor-pointer" onClick={() => { setCurrentProject(p); setView('project-detail'); }}>
            <Reveal delay={i * 100}>
              <div className="overflow-hidden mb-4 aspect-[4/3]">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-bold uppercase mb-1">{p.title}</h3>
              <p className="text-xs font-mono text-neutral-400">{p.category[lang as Language]} — {p.year}</p>
            </Reveal>
          </article>
        ))}
      </div>
      <div className="mt-24 text-center">
        <button onClick={() => setView('interior')} className="border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors uppercase font-mono text-xs tracking-widest">{t.view_interior}</button>
      </div>
    </section>
  );
};

const InteriorView = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang as Language];
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-[60vh] relative flex items-center justify-center border-b border-neutral-900">
        <img src="/salon.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <h1 className="relative z-10 text-5xl md:text-8xl font-bold uppercase text-center">{t.interior.label}</h1>
      </div>
      <div className="px-6 py-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 gap-32">
          {INTERIOR_PROJECTS.map((p, i) => (
            <Reveal key={p.id}>
              <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <div className="md:w-3/5 w-full">
                  {/* FIX: Image en entier sans crop excessif */}
                  <img src={p.img} alt={p.title} className="w-full h-auto rounded-sm shadow-2xl" />
                </div>
                <div className="md:w-2/5 w-full">
                  <span className="font-mono text-xs text-neutral-500 mb-2 block">0{i+1}</span>
                  <h3 className="text-4xl font-bold uppercase mb-4">{p.title}</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">{p.desc[lang as Language]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  const { currentProject } = useContext(ViewContext);
  const { lang } = useContext(LanguageContext);
  const { setView } = useContext(ViewContext);
  
  if (!currentProject) return null;
  
  return (
    <div className="bg-black text-white min-h-screen animate-in fade-in">
      <div className="h-screen relative">
        <img src={currentProject.img} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black to-transparent pt-32">
          <h1 className="text-5xl md:text-8xl font-bold uppercase">{currentProject.title}</h1>
        </div>
      </div>
      <div className="px-6 py-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4 space-y-8">
          <div><h3 className="text-xs font-mono text-neutral-500 uppercase mb-2">Concept</h3><p className="text-xl">{currentProject.concept?.[lang as Language]}</p></div>
          <div><h3 className="text-xs font-mono text-neutral-500 uppercase mb-2">Description</h3><p className="text-neutral-400">{currentProject.desc[lang as Language]}</p></div>
        </div>
        <div className="md:col-span-8 grid gap-4">
          {currentProject.gallery?.map((src, i) => <img key={i} src={src} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />)}
        </div>
      </div>
      <div className="text-center py-12 border-t border-white/10">
        <button onClick={() => setView('home')} className="uppercase font-mono text-xs hover:text-neutral-400">Fermer</button>
      </div>
    </div>
  );
};

const Agency = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang as Language].agency;
  return (
    <section id="agency" className="px-6 py-32 bg-black text-white border-t border-neutral-900">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <Reveal><h2 className="text-4xl font-bold mb-8">"{t.quote}"</h2></Reveal>
          <p className="text-neutral-400 text-lg mb-6">{t.desc_1}</p>
          <p className="text-neutral-400 text-lg">{t.desc_2}</p>
        </div>
        <div className="md:w-1/2 relative">
          <Reveal delay={200}>
            <img src="/Architecte.jpg" alt="Architect" className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute bottom-4 left-4 bg-black p-4"><p className="font-mono text-xs">{t.role}</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { lang } = useContext(LanguageContext);
  const t = TRANSLATIONS[lang as Language].contact;
  return (
    <section id="contact" className="px-6 py-32 bg-neutral-950 text-white">
      <Reveal>
        <h2 className="text-6xl font-bold mb-16">{t.label}</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8 font-mono text-sm">
            <div><span className="text-neutral-500 block mb-1">{t.address_label}</span>Marseille, France</div>
            <div><span className="text-neutral-500 block mb-1">{t.email_label}</span>akr.halisse@gmail.com</div>
            <div><span className="text-neutral-500 block mb-1">{t.phone_label}</span>06 95 97 54 11</div>
          </div>
          <form className="space-y-6">
            <input type="text" placeholder={t.form.name} className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white outline-none" />
            <input type="email" placeholder={t.form.email} className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white outline-none" />
            <textarea placeholder={t.form.message} className="w-full bg-transparent border-b border-white/20 py-4 h-32 focus:border-white outline-none"></textarea>
            <button className="border border-white px-8 py-3 uppercase text-xs font-bold hover:bg-white hover:text-black transition-colors">{t.form.cta}</button>
          </form>
        </div>
      </Reveal>
    </section>
  );
};

const App = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [view, setView] = useState<View>('home');
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <ViewContext.Provider value={{ view, setView, currentProject, setCurrentProject }}>
        {view === 'home' && <><Navbar /><Hero /><Portfolio /><Agency /><Contact /></>}
        {view === 'interior' && <><Navbar /><InteriorView /><Contact /></>}
        {view === 'project-detail' && <ProjectDetail />}
      </ViewContext.Provider>
    </LanguageContext.Provider>
  );
};

const container = document.getElementById('root');
if (container) { createRoot(container).render(<App />); }
