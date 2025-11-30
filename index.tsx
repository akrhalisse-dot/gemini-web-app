import React, { useState, useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowDown, Plus, MapPin, Mail, Phone, Instagram, Linkedin, Menu, X, ArrowLeft, Layers } from 'lucide-react';

// --- 1. TYPES & INTERFACES (Strict Typing) ---

type Language = 'fr' | 'en' | 'ar';
type View = 'home' | 'interior' | 'project-detail';

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
  location?: string;
  surface?: string;
  gallery?: string[]; // Pour le diaporama
}

interface ServiceData {
  title: string;
  desc: string;
}

// --- 2. DATA CONSTANTS (MISES À JOUR AVEC TES IMAGES) ---

// PROJETS ARCHITECTURE (EXTÉRIEUR)
const PROJECTS: ProjectData[] = [
  {
    id: "01",
    title: "LOGEMENT COLLECTIF",
    concept: { fr: "Séquences Urbaines & Verticalité Habitée", en: "Urban Sequences & Inhabited Verticality", ar: "تلسلسل حضري وعمودية مأهولة" },
    year: "2023",
    location: "Bordeaux, FR",
    surface: "2400 m²",
    img: "/images/projets/logement-collectif.jpg",
    gallery: ["/images/projets/logement-collectif.jpg"],
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
    location: "Lyon, FR",
    surface: "1200 m²",
    img: "/images/projets/mosquee-main-image.jpg",
    gallery: [
      "/images/projets/mosquee-main-image.jpg",
      "/images/projets/Mosquee-details.jpg",
      "/images/projets/mosquee-side.jpg"
    ],
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
    location: "Cassis, FR",
    surface: "350 m²",
    img: "/images/projets/residence-med.jpg",
    gallery: ["/images/projets/residence-med.jpg"],
    category: { fr: "VILLA PRIVÉE", en: "Private Villa", ar: "فيلا خاصة" },
    desc: { 
      fr: "Architecture du néo-vernaculaire où le bâti semble émerger de la terre. La pierre sèche locale et le béton brut dialoguent avec la minéralité du site.", 
      en: "Neo-vernacular architecture where the building seems to emerge from the earth. Local dry stone and raw concrete dialogue with the site's minerality.", 
      ar: "عمارة محلية جديدة يبدو فيها البناء وكأنه ينبثق من الأرض. الحجر المحلي والخرسانة الخام يتحاوران مع طبيعة الموقع." 
    }
  },
  {
    id: "04",
    title: "VILLA DESIGN",
    concept: { fr: "L'Éloge de l'Horizon", en: "In Praise of the Horizon", ar: "مدح الأفق" },
    year: "2023",
    location: "Cannes, FR",
    surface: "420 m²",
    img: "/images/projets/villa-design.jpg",
    gallery: ["/images/projets/villa-design.jpg"],
    category: { fr: "LUXE", en: "Luxury", ar: "فاخر" },
    desc: { 
      fr: "Une architecture de la transparence conçue pour abolir les frontières. Les baies vitrées toute hauteur transforment le salon en une vaste loggia ouverte sur la nature.", 
      en: "Architecture of transparency designed to abolish boundaries. Full-height windows transform the living room into a vast loggia open to nature.", 
      ar: "عمارة الشفافية المصممة لإلغاء الحدود. النوافذ الممتدة من الأرض للسقف تحول الصالون إلى شرفة واسعة مفتوحة على الطبيعة." 
    }
  },
  {
    id: "05",
    title: "MAISON NÉO-TRADITIONNELLE",
    concept: { fr: "Comment habiter la tradition aujourd'hui ?", en: "Inhabiting tradition today", ar: "كيف نسكن التقاليد اليوم؟" },
    year: "2024",
    location: "Aix-en-Provence, FR",
    surface: "180 m²",
    img: "/images/projets/maison-neo.jpg",
    gallery: [
      "/images/projets/maison-neo.jpg",
      "/images/projets/maison-neo-side.jpg"
    ],
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { 
      fr: "Hybridation des codes classiques avec une écriture épurée. Nous avons revisité la silhouette archétypale de la maison à toiture tuiles en purifiant ses lignes.", 
      en: "Hybridizing classic codes with a clean style. We revisited the archetypal silhouette of the tiled-roof house by purifying its lines.", 
      ar: "تهجين الرموز الكلاسيكية بأسلوب مبسط. قمنا بإعادة صياغة الصورة النمطية للمنزل ذو السقف القرميدي بتنقية خطوطه." 
    }
  },
  {
    id: "06",
    title: "VILLA FORESTIÈRE",
    concept: { fr: "Immersion Sylvestre & Mimétisme Matériel", en: "Forest Immersion & Material Mimicry", ar: "انغماس في الغابة ومحاكاة مادية" },
    year: "2023",
    location: "Vosges, FR",
    surface: "210 m²",
    img: "/images/projets/villa-forestiere.jpg",
    gallery: [
      "/images/projets/villa-forestiere.jpg",
      "/images/projets/villa-forestiere-at-night-2.jpg",
      "/images/projets/isometric-process-of-villa-forestiere.jpg"
    ], 
    category: { fr: "VILLA PRIVÉE", en: "Private Villa", ar: "فيلا خاصة" },
    desc: { 
      fr: "Conçue comme un trait d'union entre l'homme et la forêt. Le bardage en bois patiné et les larges baies vitrées ancrent le bâti dans une temporalité lente.", 
      en: "Designed as a hyphen between man and forest. Weathered wood cladding and large windows anchor the building in a slow temporality.", 
      ar: "صممت كهمزة وصل بين الإنسان والغابة. تكسية الخشب المعتق والنوافذ الكبيرة ترسي المبنى في زمنية بطيئة." 
    }
  },
  {
    id: "07",
    title: "EXTENSION BOIS",
    concept: { fr: "Pavillon de Lumière & Transparence", en: "Pavilion of Light & Transparency", ar: "جناح النور والشفافية" },
    year: "2024",
    location: "Annecy, FR",
    surface: "85 m²",
    img: "/images/projets/extension-bois.jpg",
    gallery: ["/images/projets/extension-bois.jpg"],
    category: { fr: "EXTENSION", en: "Extension", ar: "توسعة" },
    desc: { 
      fr: "Pensée comme un pavillon habité, cette villa explore la légèreté. L'alliance du bois et du verre minimise l'empreinte visuelle pour laisser entrer le jardin.", 
      en: "Conceived as an inhabited pavilion exploring lightness. The alliance of wood and glass minimizes the visual footprint to let the garden in.", 
      ar: "صممت كجناح مسكون يستكشف الخفة. تحالف الخشب والزجاج يقلل من البصمة البصرية ليسمح للحديقة بالدخول." 
    }
  }
];

// --- PROJETS INTÉRIEURS ---
const INTERIOR_PROJECTS: ProjectData[] = [
  {
    id: "INT-01",
    title: "BUREAU EXECUTIVE",
    year: "2023",
    location: "La Défense, FR",
    surface: "350 m²",
    img: "/images/interieurs/int-bureau.jpg",
    category: { fr: "BUREAU", en: "Office", ar: "مكتب" },
    desc: { fr: "Espace de travail minimaliste favorisant la concentration et la sérénité. Lignes pures et acoustique maîtrisée.", en: "Minimalist workspace promoting concentration and serenity. Pure lines and controlled acoustics.", ar: "مكتب منزلي بسيط." }
  },
  {
    id: "INT-02",
    title: "SALON MINIMALISTE",
    year: "2024",
    location: "Paris 16e",
    surface: "60 m²",
    img: "/images/interieurs/int-salon.jpg",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Jeu de lumière et mobilier sculptural.", en: "Light play and sculptural furniture.", ar: "تلاعب بالضوء وأثاث نحتي." }
  },
  {
    id: "INT-03",
    title: "CUISINE",
    year: "2023",
    location: "Lyon, FR",
    surface: "35 m²",
    img: "/images/interieurs/int-cuisine.jpg",
    category: { fr: "RÉSIDENTIEL", en: "Residential", ar: "سكني" },
    desc: { fr: "Fonctionnalité et design intemporel.", en: "Functionality and timeless design.", ar: "وظيفية وتصميم خالد." }
  },
  {
    id: "INT-04",
    title: "SALLE DE BAIN",
    year: "2023",
    location: "Bordeaux, FR",
    surface: "18 m²",
    img: "/images/interieurs/int-sdb.jpg", 
    category: { fr
