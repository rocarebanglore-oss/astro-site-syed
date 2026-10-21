import React, { useState, useRef, useEffect } from 'react';
import {
  Phone, MapPin, Check, ShieldCheck, Star, Clock, Wrench, CheckCircle2, ChevronDown, Search, User, ArrowRight, X, Menu, CheckCircle, IndianRupee, Settings, HelpCircle, Lock, Loader2, Home
} from 'lucide-react';
import type { BrandInfo } from '@/types';
import { BUSINESS_DETAILS } from '@/data/content';
import { optimizeCloudinary, generateCloudinarySrcSet } from '@/utils/imageOptimizer';

interface BrandPageLayoutProps {
  brand: BrandInfo;
}

const BRAND_RELEVANT_FOOTER_KEYWORDS: Record<string, string> = {
  kent: 'Kent RO Repair Bangalore | Kent Water Purifier Service Near Me | Kent RO Filter Change | Kent AMC Service | Kent RO Service Center | Same Day Kent RO Repair',
  aquaguard: 'Aquaguard RO Repair Bangalore | Aquaguard Water Purifier Service Near Me | Aquaguard Filter Replacement | Aquaguard AMC Service | Aquaguard Service Center | Same Day Aquaguard Repair',
  'ao-smith': 'AO Smith RO Repair Bangalore | AO Smith Water Purifier Service Near Me | AO Smith Filter Replacement | AO Smith AMC Service | AO Smith Service Center | Same Day AO Smith Repair',
  pureit: 'Pureit RO Repair Bangalore | Pureit Water Purifier Service Near Me | Pureit Filter Replacement | Pureit AMC Service | Pureit Service Center | Same Day Pureit Repair',
  livpure: 'Livpure RO Repair Bangalore | Livpure Water Purifier Service Near Me | Livpure Filter Replacement | Livpure AMC Service | Livpure Service Center | Same Day Livpure Repair',
  havells: 'Havells RO Repair Bangalore | Havells Water Purifier Service Near Me | Havells Filter Replacement | Havells AMC Service | Havells Service Center | Same Day Havells Repair',
};

const SEO_CONTENT_DATA: Record<string, { intro: string; sections: { title: string; text: string }[] }> = {
  kent: {
    intro: "Searching for a trusted Kent RO service near me? We provide top-rated doorstep Kent water purifier repair, installation, and maintenance in Bangalore. Whether your Kent Grand Plus is leaking or your Kent Prime is showing a UV failure, our certified technicians are just a call away. Get your Kent RO fixed today with a 90-day service warranty and 100% genuine spare parts.",
    sections: [
      { title: "1. Kent RO Repair & Filter Replacement", text: "Is your Kent water purifier not working properly? We offer fast, same-day Kent RO repair at your doorstep. From fixing mineral RO issues and water leakage to replacing clogged sediment filters and high-TDS membranes, we do it all. Our technicians use advanced TDS meters to ensure your Kent purifier perfectly balances minerals for safe drinking water. Every repair is backed by a written 90-day warranty." },
      { title: "2. New Kent RO Installation & Setup", text: "Bought a new Kent RO system? Don't let a local plumber ruin it. We provide professional Kent water purifier installation services in Bangalore. Our team handles the complete wall-mounting setup, checks the inlet water pressure, calibrates the TDS controller, and gives you a full demonstration of how to use and maintain the machine for long-lasting performance." },
      { title: "3. Kent Annual Maintenance Plans (AMC)", text: "To keep your Kent purifier running smoothly year-round, we offer affordable Kent AMC plans. Regular servicing prevents sudden breakdowns and extends the life of your RO. Our Kent AMC includes scheduled filter cleaning, UV lamp checks, priority customer support, and exclusive discounts on genuine Kent spare parts." }
    ]
  },
  aquaguard: {
    intro: "Looking for an Aquaguard service center near me? We offer expert doorstep Aquaguard water purifier repair, active copper filter replacement, and AMC services in Bangalore. Whether your Eureka Forbes Aquaguard is blinking a red error light or the water flow has slowed down, our certified technicians can fix it the same day with genuine parts.",
    sections: [
      { title: "1. Aquaguard RO Repair & Copper Filter Change", text: "Is your Aquaguard active copper cartridge exhausted? We offer fast doorstep Aquaguard repair. From replacing active copper cartridges and fixing UV sterilizer failures to resolving leakage and motor issues, we do it all. Our experts use original replacement parts to ensure your Aquaguard delivers 100% safe, copper-infused water for your family's health." },
      { title: "2. New Aquaguard Installation & Setup", text: "Need to install a new Aquaguard purifier? Our certified technicians provide professional installation for all Eureka Forbes models, including Geneus, Enhance, and Blaze. We handle the complete plumbing, pressure testing, and provide a full demo of the hot, cold, and normal water dispensing features to ensure you get the best out of your machine." },
      { title: "3. Aquaguard AMC & Maintenance", text: "Protect your investment with our comprehensive Aquaguard AMC plans. We offer yearly maintenance contracts that cover scheduled sanitization, filter replacements, and unlimited breakdown visits. Enjoy priority service and zero labor charges with our affordable Aquaguard service plans designed to save you money." }
    ]
  },
  pureit: {
    intro: "Searching for a reliable Pureit service center near me? We provide same-day doorstep Pureit water purifier repair, Germkill Kit (GKK) replacement, and installation in Bangalore. If your Pureit Ultima is locked with a red indicator or your Marvella is not dispensing water, our experts are just a call away to restore your pure water supply.",
    sections: [
      { title: "1. Pureit RO Repair & GKK Replacement", text: "The red indicator on your Pureit means the Germkill Kit is exhausted. We provide fast doorstep replacement of original Pureit GKK kits along with digital sensor resets. From fixing motor noise and water leakage to replacing faulty solenoid valves, our technicians handle all Pureit models efficiently and affordably." },
      { title: "2. New Pureit Installation & Setup", text: "Bought a new Pureit RO system? Our professionals offer seamless installation for all Pureit models, including Eco Water Saver and Copper RO. We ensure proper wall mounting, water inlet connection, and perform a complete TDS and purity test right after installation to guarantee your family's safety and peace of mind." },
      { title: "3. Pureit AMC & Maintenance Plans", text: "Keep your Pureit running smoothly with our affordable AMC plans. Our annual maintenance covers scheduled GKK replacements, internal tank sanitization, and priority breakdown support. Save money and stay worry-free with our genuine Pureit service contracts tailored for Bangalore households." }
    ]
  },
  'ao-smith': {
    intro: "Looking for expert AO Smith RO service near me? We specialize in doorstep repair, SCM membrane replacement, and AMC for all AO Smith water purifiers in Bangalore. Whether your AO Smith Z8 hot water function has failed or your ProPlanet is leaking, our certified technicians use genuine MIN-TECH and SCM parts for a perfect fix.",
    sections: [
      { title: "1. AO Smith RO Repair & SCM Filter Change", text: "Is your AO Smith purifier showing a filter change alert? We offer premium doorstep repair for all AO Smith models, including Z8, Z9, X8, and Green Series. From replacing the patented SCM membrane and MIN-TECH mineralizer to fixing electronic PCB and hot water heating elements, we do it all with precision." },
      { title: "2. New AO Smith Installation & Setup", text: "Proper installation is key to AO Smith's advanced technology. Our trained technicians ensure correct wall mounting, precise inlet plumbing, and optimal water pressure balancing. We also demonstrate how to use the digital touch panel and MIN-TECH mineralizer controls to get the best-tasting water." },
      { title: "3. AO Smith AMC & Priority Support", text: "Our specialized AO Smith AMC plans offer complete peace of mind. We cover scheduled preventive maintenance, genuine filter replacements, and provide priority emergency support. Ensure your premium AO Smith purifier always delivers pure, mineral-rich water without any sudden repair costs." }
    ]
  },
  livpure: {
    intro: "Searching for a trusted Livpure water purifier service near me? We provide fast doorstep Livpure RO repair, filter replacement, and installation in Bangalore. If your Livpure Bolt or Touch model has a blocked filter or an unresponsive touch panel, our expert technicians are ready to fix it the same day with original spare parts.",
    sections: [
      { title: "1. Livpure RO Repair & 7-Stage Filter Replacement", text: "Is your Livpure purifier dispensing water slowly? We offer complete doorstep repair, including the replacement of 7-stage filters, RO membranes, and booster pumps. From fixing smart touch panel errors to resolving leakage, we use 100% genuine Livpure-compatible parts to restore your water quality and machine performance." },
      { title: "2. New Livpure Installation & Setup", text: "Get your new Livpure water purifier installed by experts. We handle safe wall mounting, inlet water connection, and pressure testing for all Livpure models. Our technicians will also calibrate the TDS controller and show you how to operate the smart LED indicators and maintenance alerts." },
      { title: "3. Livpure AMC & Maintenance Plans", text: "Keep your Livpure purifier in top condition with our affordable AMC plans. Our comprehensive contracts include scheduled filter cleaning, deep tank sanitization, and unlimited breakdown support. Get priority service and save money on expensive repairs with our reliable Livpure service network." }
    ]
  }
};

const defaultSeoContent = {
  intro: "Searching for a trusted RO service near me? We provide top-rated doorstep repair, installation, and maintenance for all major water purifier brands. Whether your purifier is leaking, making noise, or giving bad-tasting water, our certified technicians are just a call away. Get your water purifier fixed today with a 90-day service warranty and 100% genuine spare parts.",
  sections: [
    { title: "1. RO Repair & Filter Replacement", text: "Is your RO water purifier not working properly? We offer fast, same-day water purifier repair at your doorstep. From fixing motor issues and water leakage to replacing clogged filters and membranes, we do it all. Our technicians use advanced TDS meters to ensure your water is perfectly safe to drink. Every repair is backed by a written 90-day warranty for your peace of mind." },
    { title: "2. New RO Installation & Setup", text: "Bought a new RO system? Don't let a local plumber ruin it. We provide professional new RO installation services for homes and offices. Our team handles the complete setup, checks the inlet water pressure, calibrates the TDS levels, and gives you a full demonstration of how to use and maintain the machine. We also offer free water testing after installation." },
    { title: "3. Annual Maintenance Plans (AMC)", text: "To keep your purifier running smoothly year-round, we offer affordable AMC plans. Regular servicing prevents sudden breakdowns and extends the life of your RO. Our AMC includes scheduled filter cleaning, priority customer support, and discounts on genuine spare parts." }
  ]
};

export function BrandPageLayout({ brand }: BrandPageLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const brandDisplayName = brand.id === 'ro-service-24x7' || brand.name.toLowerCase().includes('multi-brand') || brand.name.toLowerCase().includes('ro service center') ? 'RO' : brand.name === 'KENT' ? 'Kent' : brand.name;
  const lookingForHeading = `${brandDisplayName} Water Purifier Repair Service Bangalore`;
  const isHomepage = brand.id === 'ro-service-24x7' || brand.slug === '/' || brand.name.toLowerCase().includes('ro service center');

  const HOMEPAGE_BOTTOM_KEYWORDS = 'RO Service Near Me | Water Purifier Repair Bangalore | RO Repair Service | Same Day RO Service | RO Filter Replacement Bangalore | Aquaguard Service Near Me | Kent RO Repair Bangalore | Pureit RO Service | AO Smith Water Purifier Repair | Livpure RO Service | RO AMC Bangalore | RO Installation Bangalore | RO Water Purifier Service Center';

  const lookingForKeywords = isHomepage
    ? ['RO Service Near Me', 'Water Purifier Repair Bangalore', 'RO Repair Service', 'Same Day RO Service', 'RO Filter Replacement Bangalore', 'Aquaguard Service Near Me', 'Kent RO Repair Bangalore', 'Pureit RO Service', 'AO Smith Water Purifier Repair', 'Livpure RO Service', 'RO AMC Bangalore', 'RO Installation Bangalore']
    : [
        `${brandDisplayName} RO Repair Bangalore`,
        `${brandDisplayName} Water Purifier Service Near Me`,
        `${brandDisplayName} Filter Replacement Bangalore`,
        `${brandDisplayName} AMC Service Bangalore`,
        `${brandDisplayName} Service Center Near Me`,
        `Same Day ${brandDisplayName} RO Repair`,
        `${brandDisplayName} RO Installation Bangalore`,
      ];

  const getRelevantBrandKeywords = (): string | null => {
    if (isHomepage) return null;
    const key = brand.id.toLowerCase().replace(/-service$/, '');
    if (BRAND_RELEVANT_FOOTER_KEYWORDS[key]) return BRAND_RELEVANT_FOOTER_KEYWORDS[key];
    const nameLower = brand.name.toLowerCase();
    if (nameLower.includes('kent')) return BRAND_RELEVANT_FOOTER_KEYWORDS.kent;
    if (nameLower.includes('aquaguard')) return BRAND_RELEVANT_FOOTER_KEYWORDS.aquaguard;
    if (nameLower.includes('smith') || nameLower.includes('ao-smith')) return BRAND_RELEVANT_FOOTER_KEYWORDS['ao-smith'];
    if (nameLower.includes('pureit')) return BRAND_RELEVANT_FOOTER_KEYWORDS.pureit;
    if (nameLower.includes('livpure')) return BRAND_RELEVANT_FOOTER_KEYWORDS.livpure;
    if (nameLower.includes('havells')) return BRAND_RELEVANT_FOOTER_KEYWORDS.havells;
    return `${brand.name} RO Repair Bangalore | ${brand.name} Water Purifier Service Near Me | ${brand.name} Filter Replacement | ${brand.name} AMC Service | Same Day ${brand.name} Repair`;
  };

  const relevantBrandKeywordString = getRelevantBrandKeywords();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState(''); 
  const [serviceType, setServiceType] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checkPincode, setCheckPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState({ checked: false, available: false, message: '' });

  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({ 0: true, 1: true });
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const bookingFormRef = useRef<HTMLDivElement>(null);
  const scrollToBookingForm = () => {
    if (bookingFormRef.current) {
      const yOffset = -80;
      const y = bookingFormRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) setIsHeaderHidden(true);
      else setIsHeaderHidden(false);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleCallClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.getAttribute('href')?.startsWith('tel:')) {
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', { 
            'send_to': 'AW-10934329019/darZCOiX3qAdELu98t0o',
            'value': 1.0,
            'currency': 'INR'
          });
        }
      }
    };

    document.addEventListener('click', handleCallClick);
    return () => document.removeEventListener('click', handleCallClick);
  }, []);

  const primaryColor = brand.brandThemeColors?.primary || brand.accentColor || '#007A53';
  
  const displayPhone = '7090170092'; 
  const formEmail = 'syedsmaula786@gmail.com';

  const heroImageRaw = brand.heroBgImage || '/images/hero-bg.webp';
  
  const heroImageSrcSet = generateCloudinarySrcSet(heroImageRaw, [400, 600, 800, 1200, 1600]);
  const heroImageDefault = optimizeCloudinary(heroImageRaw, { width: 1200, quality: 'auto:good' });

  const bottomBannerToDisplay = '/images/bottom-banner.webp';
  const currentSeoContent = SEO_CONTENT_DATA[brand.id] || defaultSeoContent;

  const toggleFaq = (index: number) => setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && (window as any).WM_BLOCKED === true) {
      alert('Access Restricted: Suspicious activity detected from this device.');
      return; 
    }

    if (!fullName.trim()) { setFormError('Please enter your full name.'); return; }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) { setFormError('Please enter a valid 10-digit mobile number.'); return; }
    if (!serviceType) { setFormError('Please select a service type.'); return; }
    setFormError('');
    setIsSubmitting(true);

    const bookingId = 'RO-' + Math.floor(100000 + Math.random() * 900000);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

    try {
      // ✅ FIX: await wapas laga diya taaki mail pakka jaye
      await fetch(`https://formsubmit.co/ajax/${formEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Booking ID': bookingId,
          'Customer Name': fullName.trim(),
          'Mobile Number': cleanPhone,
          'Pincode': pincode.trim() || 'Bangalore (Not specified)',
          'Address': address.trim() || 'Not specified',
          'Service Type': serviceType,
          'Brand': brand.name,
          'Page URL': typeof window !== 'undefined' ? window.location.href : '',
          'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          _subject: `New RO Lead: ${fullName.trim()} - ${brand.name} (${cleanPhone}) - ID: ${bookingId}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      
      setFormSubmitted(true);
      
      // ✅ FIX: replace() use kiya taaki browser naya URL load kare aur wapas pichle page par na jaye
      const returnPath = currentPath === '/' ? '/' : currentPath;
      window.location.replace(`/thank-you?bookingId=${bookingId}&returnUrl=${encodeURIComponent(returnPath)}`);

    } catch (err) {
      console.warn('FormSubmit lead sending note:', err);
      setFormSubmitted(true);
      
      // ✅ FIX: Catch block mein bhi replace() use kiya
      const returnPath = currentPath === '/' ? '/' : currentPath;
      window.location.replace(`/thank-you?bookingId=${bookingId}&returnUrl=${encodeURIComponent(returnPath)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = checkPincode.trim();
    if (!cleanPin || cleanPin.length !== 6 || !/^\d+$/.test(cleanPin)) {
      setPincodeResult({ checked: true, available: false, message: 'Please enter a valid 6-digit Indian postal pincode.' });
      return;
    }
    setPincodeResult({ checked: true, available: true, message: `Service is Available! Our certified ${brand.name} technician can reach your doorstep within 60 to 90 minutes.` });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      await fetch(`https://formsubmit.co/ajax/${formEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Email: newsletterEmail.trim(),
          Brand: brand.name,
          Subscription: 'Newsletter & Updates',
          _subject: `New Newsletter Subscriber: ${newsletterEmail.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
    } catch (err) {
      console.warn('Newsletter submission:', err);
    }
    setNewsletterSubmitted(true);
  };

  const repairImage = '/images/technician.webp';

  const servicesList = [
    { title: `Installation of all ${brand.name} models`, description: `Professional doorstep installation for all ${brand.name} RO, UV, and UF water purifiers.` },
    { title: `Repair of leaks, motor & TDS issues`, description: `Fast diagnosis and repair for water leakage, motor failure, and high TDS problems.` },
    { title: `Filter & membrane replacement`, description: `Restore water purity with genuine sediment, carbon, and RO membrane replacement.` },
    { title: `Affordable AMC plans for ${brand.name} purifiers`, description: `Save money with our yearly maintenance contracts. Free filter changes and priority support.` },
  ];

  const commonProblems = [
    { problem: 'High TDS in Borewell Water', cause: 'Rapid scaling and choking of the RO membrane due to high mineral content in Bangalore groundwater.' },
    { problem: 'Hard Water White Residue', cause: 'Ineffective pre-filters causing white stains on taps, glasses, and internal storage tanks.' },
    { problem: 'Slow Water Output & Pressure Drop', cause: 'Clogged sediment filters or a weak booster pump unable to push water through the membrane.' },
    { problem: 'Foul Smell or Algae Growth', cause: 'No UV sterilization or un-sanitized storage tanks leading to bacterial growth in standing water.' },
    { problem: 'Motor/Adapter Burnt Out', cause: 'Voltage fluctuations and power surges damaging the SMPS board or the motor.' },
    { problem: 'Continuous Water Leakage', cause: 'Worn-out O-rings, cracked filter housings, or damaged auto-shutoff valves (SV).' },
    { problem: 'Filter Change Alert Stuck', cause: 'Sensor malfunction or failure to reset the digital timer after replacing the cartridges.' },
  ];

  const whyChoosePoints = [
    { title: 'Background-Verified Experts', description: 'Our technicians are police-verified, highly trained, and respect your home hygiene.' },
    { title: '100% Genuine & OEM Parts', description: 'We strictly use original membranes and food-grade filters—never cheap local duplicates.' },
    { title: '60-90 Minute Arrival Time', description: 'We know water is essential. Our local teams are strategically placed for lightning-fast response.' },
    { title: 'Zero Hidden Charges Policy', description: 'Get a transparent, itemized quote on WhatsApp before any repair work begins.' },
    { title: 'Free Pre & Post TDS Test', description: 'We scientifically prove the water purity before and after the service using digital meters.' },
    { title: 'Deep Tank Sanitization', description: 'We don’t just change filters; we chemically sanitize the internal tank to eliminate hidden bacteria.' },
  ];

  const primaryFaqs = [
    { question: `How long does a typical ${brand.name} service take?`, answer: `A standard ${brand.name} service takes 45-60 minutes. Basic cleaning and filter checks take about 30-45 minutes, while comprehensive servicing with part replacements may take up to 90 minutes.` },
    { question: `Do you use genuine ${brand.name} spare parts?`, answer: `Yes, we use 100% genuine compatible spare parts for all ${brand.name} purifiers. Every part comes with a 90-day service warranty. We are an independent multi-brand service provider and use OEM-grade parts that match the original specifications.` },
    { question: `Which ${brand.name} models do you service?`, answer: `We service all ${brand.name} models including Grand, Grand Plus, Crystal, Crystal Plus, Prime, Supreme, Ace, Gold, and all RO, UV, and UF variants. Our technicians are trained on the latest technology.` },
    { question: `Is there a visiting charge?`, answer: `No, we do not charge any visiting fee. Our technician inspects your ${brand.name} purifier for free and gives you an honest quotation. You pay only if you decide to proceed with the repair.` },
    { question: `How quickly can a technician reach my home?`, answer: `For urgent cases, our technician reaches within 2-4 hours in most Bangalore areas. Regular bookings get same-day or next-day slots based on your convenience.` },
    { question: `Do you offer AMC for ${brand.name} purifiers?`, answer: `Yes, we offer affordable AMC plans specifically for ${brand.name} water purifiers. Our AMC covers regular servicing, filter replacements, priority support, and discounts on spare parts.` },
    ...(brand.brandFaqs || []),
  ];

  const displayedFaqs = showAllFaqs ? primaryFaqs : primaryFaqs.slice(0, 8);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white overflow-x-hidden">
      
      {/* HEADER */}
      <header className={`sticky top-0 z-50 bg-white border-b border-slate-200 shadow-2xs transition-transform duration-300 ${isHeaderHidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="bg-[#002b66] text-white py-1.5 sm:py-2 px-2 overflow-hidden select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 min-[380px]:gap-2 sm:gap-4 md:gap-6 whitespace-nowrap flex-nowrap text-[9px] min-[360px]:text-[10px] sm:text-xs font-medium">
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-amber-400">⭐</span>
              <span className="font-semibold">4.8</span>
              <span className="text-white/60">|</span>
              <span className="font-semibold">20,000+</span>
            </div>
            <span className="text-white/40 font-light shrink-0 select-none">|</span>
            <div className="flex items-center gap-1 shrink-0">
              <span className="font-semibold">Same-Day Repair</span>
            </div>
            <span className="text-white/40 font-light shrink-0 select-none">|</span>
            <div className="flex items-center gap-1 shrink-0">
              <span className="font-semibold">24x7 Support</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="/" className="flex items-center gap-2 sm:gap-3 group select-none">
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-xs shrink-0 group-hover:scale-[1.03] transition-transform">
                  <img
                    src={optimizeCloudinary("https://res.cloudinary.com/dieq3fjuv/image/upload/v1789813995/IMG-20260918-WA0070_skegej.jpg", { width: 100 })}
                    alt="Roservice Support Online 24x7"
                    width={44}
                    height={44}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[15px] sm:text-[18px] lg:text-[20px] text-[#002b66] tracking-tight leading-tight group-hover:text-[#0052a3] transition-colors">Roservice Support</span>
                  
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-wide text-[#0070e0]">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                      Customer Service Center
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-5 text-slate-800">
              <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search Services" className="hover:text-blue-700 transition-colors"><Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></button>
              <button onClick={scrollToBookingForm} aria-label="User Profile" title="Account / My Bookings" className="hover:text-blue-700 transition-colors"><User className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></button>
              <a href={`tel:${displayPhone}`} aria-label="Call Helpline" className="hover:text-blue-700 transition-colors"><Phone className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /></a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu" className="md:hidden hover:text-blue-700 transition-colors focus:outline-none">
                {mobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <div className="max-w-xl mx-auto flex items-center gap-2">
              <input type="text" aria-label={`Search ${brand.name} RO services`} placeholder={`Search ${brand.name} RO services, filter change, AMC...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400" />
              <button onClick={scrollToBookingForm} aria-label="Find RO Service" style={{ backgroundColor: primaryColor }} className="text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer">Find</button>
            </div>
          </div>
        )}
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white flex flex-col pt-4 px-6 pb-6 overflow-y-auto animate-fadeIn">
          <div className="flex justify-end mb-8">
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Close menu"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col space-y-4 text-xl font-extrabold text-slate-800">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 text-slate-900">Home</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Services</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">AMC Plans</a>
            <a href="#parts" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Filters &amp; Parts</a>
            <a href="#why-choose-us" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Why {brand.name}</a>
            <a href="#support-faqs" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Support</a>
            <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 text-slate-800 font-extrabold">Blog</a>
          </nav>
          <div className="mt-auto pt-8 flex flex-col items-start gap-4">
            <div className="w-full pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Helpline</span>
              <a href={`tel:${displayPhone}`} className="text-lg font-black text-[#0b5cbe]">{displayPhone}</a>
            </div>
            <a href={`tel:${displayPhone}`} onClick={() => setMobileMenuOpen(false)} className="w-full bg-[#0b5cbe] hover:bg-[#094fa5] text-white text-base font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"><Phone className="w-5 h-5 fill-current" /><span>Call 7090170092</span></a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[380px] sm:min-h-[420px] max-h-none sm:max-h-[560px] lg:max-h-[620px] flex items-start sm:items-center overflow-hidden border-b border-slate-200/80 bg-white">
        {heroImageRaw && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={heroImageDefault}
              srcSet={heroImageSrcSet}
              sizes="100vw"
              alt={`${brand.name} RO Service Bangalore`}
              width={1200}
              height={630}
              loading="eager"
              fetchpriority="high"
              className="absolute inset-0 w-full h-full object-cover object-[center_top]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/85 sm:bg-gradient-to-r sm:from-white/75 sm:via-white/40 sm:to-transparent" />
          </div>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start sm:items-center">
            <div className="lg:col-span-6 xl:col-span-5 space-y-2 sm:space-y-3 text-left">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                {brand.id === 'ro-service-24x7' ? 'CERTIFIED RO REPAIR EXPERTS IN BANGALORE' : `CERTIFIED ${brand.name.toUpperCase()} RO REPAIR EXPERTS IN BANGALORE`}
              </div>

              <h1 className="text-[22px] leading-[1.2] sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0c2b5e] sm:leading-[1.15]">
                <span className="block">{brand.id === 'ro-service-24x7' ? 'RO Water Purifier Repair & Service in Bangalore' : `${brand.name} Water Purifier Repair & Service in Bangalore`}</span>
                <span className="block text-[#0066cc] text-base sm:text-2xl mt-1 sm:mt-0">Same Day Doorstep Service</span>
              </h1>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-md">
                {brand.id === 'ro-service-24x7'
                  ? "Looking for RO service near me? We repair all water purifier brands — leakage, motor, TDS, filter change. Certified technicians, genuine spare parts, 90-day warranty. Call now for same-day service."
                  : `Looking for ${brand.name} RO service near me? Get same-day doorstep repair in Bangalore. Verified technicians, 100% genuine compatible parts, 90-day warranty, transparent pricing.`}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-0.5 max-w-lg">
                {[
                  { label: '15+ Years Experience', icon: Star },
                  { label: '20,000+ Happy Families', icon: User },
                  { label: '4.8★ Rated Service', icon: Star },
                  { label: 'Genuine Spare Parts', icon: Settings },
                  { label: 'Transparent Pricing', icon: IndianRupee },
                  { label: '90-Day Warranty', icon: CheckCircle },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={`marquee-item-${idx}`} className="flex items-center gap-1.5 bg-white/95 border border-slate-200/90 rounded-md px-2 py-1 shadow-2xs">
                      <div className="w-4 h-4 rounded-full border border-blue-200 bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0"><IconComp className="w-2.5 h-2.5" /></div>
                      <span className="text-[10px] font-semibold text-slate-800 leading-tight">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2">
                <a href={`tel:${displayPhone}`} className="bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>Call Now 7090170092</span>
                </a>
                <a href="#booking-section" className="bg-white border-2 border-[#0066cc] text-[#0066cc] hover:bg-blue-50 text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer">
                  <span>Book Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 pt-1">
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white/90 backdrop-blur-2xs border border-slate-200/90 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 shadow-2xs">
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((i) => (<Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />))}
                    <div className="relative w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"><Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-slate-300 fill-slate-200" /><div className="absolute inset-0 overflow-hidden w-1/2"><Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" /></div></div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold text-slate-900">4.8</span>
                </div>
                <span className="text-[9px] sm:text-xs font-semibold text-slate-800 bg-white/70 sm:bg-transparent rounded-md px-1.5 sm:px-0 py-0.5"><span className="font-bold text-slate-950">20,000+</span> happy customers</span>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="bg-slate-50 py-4 sm:py-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={bookingFormRef} id="booking-section" className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 text-white relative shadow-xl overflow-hidden bg-[#0c2b5e] border border-blue-900/30">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-12 xl:col-span-12 space-y-4">
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">Book RO Service in 30 Seconds</h2>
                  <p className="text-xs sm:text-sm text-blue-100/90 mt-1">Fill the form below and our team will call you back within 30 minutes. Same-day doorstep service available.</p>
                </div>
                {formSubmitted ? (
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 text-center space-y-2">
                    <CheckCircle className="w-9 h-9 text-emerald-400 mx-auto" />
                    <h3 className="text-base font-bold text-white">Service Request Received!</h3>
                    <p className="text-xs text-blue-100 max-w-md mx-auto">Thank you, <strong className="text-white">{fullName}</strong>. A certified {brand.id === 'ro-service-24x7' ? 'RO' : brand.name.toUpperCase()} technician will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    {formError && <div className="bg-rose-900/80 border border-rose-400 text-rose-100 text-xs px-3 py-2 rounded-lg">{formError}</div>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><User className="w-3.5 h-3.5" /></div>
                        <input type="text" id="booking-full-name" aria-label="Full Name" required placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Phone className="w-3.5 h-3.5" /></div>
                        <input type="tel" id="booking-phone" aria-label="Mobile Number" required maxLength={10} placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><MapPin className="w-3.5 h-3.5" /></div>
                        <input type="text" id="booking-pincode" aria-label="Enter Your Pincode" maxLength={6} placeholder="Enter Your Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Home className="w-3.5 h-3.5" /></div>
                        <input type="text" id="booking-address" aria-label="Full Address" required placeholder="Full Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                      <div className="relative sm:col-span-7">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Wrench className="w-3.5 h-3.5" /></div>
                        <select id="booking-service-type" aria-label="Select Service Type" value={serviceType} onChange={(e) => setServiceType(e.target.value)} className={`w-full pl-9 pr-8 py-3 sm:py-2.5 bg-white text-sm sm:text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none cursor-pointer ${serviceType === '' ? 'text-slate-400' : 'text-slate-900'}`}>
                          <option value="" disabled>Select Service Type</option>
                          <option value="RO Service & Repair" className="text-slate-900">RO Service &amp; Repair</option>
                          <option value="Water Purifier UV Service" className="text-slate-900">Water Purifier UV Service</option>
                          <option value="Filter Replacement" className="text-slate-900">Filter Replacement</option>
                          <option value="AMC Maintenance Plans" className="text-slate-900">AMC Maintenance Plans</option>
                          <option value="Installation & Relocation" className="text-slate-900">Installation &amp; Relocation</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400"><ChevronDown className="w-3.5 h-3.5" /></div>
                      </div>
                      <div className="sm:col-span-5">
                        <button type="submit" aria-label="Book Service Now" disabled={isSubmitting} className="w-full bg-[#0070e0] hover:bg-[#0060c5] disabled:opacity-75 text-white font-bold text-sm sm:text-xs py-3 sm:py-2.5 px-5 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap">
                          {isSubmitting ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Submitting...</span></>) : (<><span>BOOK SERVICE NOW</span><ArrowRight className="w-4 h-4" /></>)}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-blue-200/90 pt-1"><Lock className="w-3 h-3 text-blue-200" /><span>Your information is safe with us.</span></div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-10 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Our {brand.name} Water Purifier Service in Bangalore</h2>
          
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
            <div>
              <div className="text-2xl sm:text-4xl font-black text-[#002b66]">15+</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-[#002b66]">20,000+</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Happy Families</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-[#002b66]">4.8★</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Average Rating</div>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Certified technicians · Genuine spare parts · Transparent pricing · 90-day service warranty
          </p>

          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-6">
            <img
              src={repairImage}
              alt={`${brand.name} Technician`}
              width={800}
              height={450}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 mb-1">Certified & Verified Technicians</h3>
          <p className="text-xs sm:text-sm text-slate-500">Trained on all major water purifier brands</p>
          
          <div className="flex justify-center gap-8 sm:gap-16 mt-8 pt-8 border-t border-slate-100">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Clock className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-slate-800">Same Day</span>
              <span className="text-[10px] text-slate-500">Service</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><CheckCircle2 className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-slate-800">Genuine</span>
              <span className="text-[10px] text-slate-500">Parts</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><ShieldCheck className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-slate-800">90-Day</span>
              <span className="text-[10px] text-slate-500">Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SEO LONG CONTENT */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6 text-left">
            Expert {brand.id === 'ro-service-24x7' ? 'Water Purifier' : brand.name} Service & Repair Solutions
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-10 text-justify">
            {currentSeoContent.intro}
          </p>

          <div className="space-y-8">
            {currentSeoContent.sections.map((section, idx) => (
              <div key={`seo-sec-${idx}`}>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0c2b5e] mb-3 text-left">
                  {section.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CHECKLIST */}
      <section id="services" className="py-10 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">WHAT WE OFFER</span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#002b66] tracking-tight">Our {brand.name} Water Purifier Services</h2>
          </div>
          
          <div className="space-y-6">
            {servicesList.map((service, idx) => (
              <div key={`service-${idx}`} className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-[#1a3673] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-1 leading-snug">{service.title}</h3>
                  <p className="text-[13.5px] text-slate-500 leading-relaxed text-justify">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON PROBLEMS */}
      <section className="py-10 sm:py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">Common {brand.name} Purifier Problems We Fix</h2>
          <div className="space-y-5">
            {commonProblems.map((item, idx) => (
              <div key={`prob-${idx}`} className="flex items-start gap-3 text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block text-[15px] mb-1">{item.problem}</span>
                  <span className="text-slate-500 leading-relaxed text-justify block text-[13.5px]">{item.cause}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-choose-us" className="py-10 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">Why Choose Roservice Support for Your {brand.name} Purifier?</h2>
          <div className="space-y-5">
            {whyChoosePoints.map((point, idx) => (
              <div key={`why-${idx}`} className="flex items-start gap-3 text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0055b3] mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block text-[15px] mb-1">{point.title}</span>
                  <span className="text-slate-500 leading-relaxed text-justify block text-[13.5px]">{point.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="support-faqs" className="py-10 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Frequently Asked <span className="text-blue-600">Questions</span></h2>
            <p className="text-sm text-slate-600">Common questions about {brand.name} water purifier service in Bangalore.</p>
          </div>
          
          <div className="space-y-3">
            {displayedFaqs.map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <div key={`faq-${idx}`} className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200">
                  <button onClick={() => toggleFaq(idx)} aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`} className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                      <span className="text-sm font-bold text-slate-800">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (<div id={`faq-answer-${idx}`} className="px-4 sm:px-5 pb-5 pt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 ml-8 text-justify">{faq.answer}</div>)}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-12 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12">
            <div className="max-w-2xl mx-auto items-center">
              <div className="space-y-5 text-center">
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">Doorstep {brand.name} RO Repair Across Bangalore</h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify">Check real-time technician availability in your neighborhood. We serve all Bangalore localities, tech corridors, and residential apartments with 60–90 minute arrivals.</p>
                <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 max-w-lg mx-auto">
                  <div className="relative w-full sm:flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><MapPin className="w-3.5 h-3.5" /></div>
                    <input type="text" id="check-pincode-input" aria-label="Enter Your Pincode to check service availability" maxLength={6} placeholder="Enter Your Pincode" value={checkPincode} onChange={(e) => setCheckPincode(e.target.value)} className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm sm:text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all" />
                  </div>
                  <button type="submit" aria-label="Check Service Availability" style={{ backgroundColor: primaryColor }} className="w-full sm:w-auto text-white font-bold text-sm sm:text-xs py-3 sm:py-2.5 px-5 rounded-xl shadow-xs hover:opacity-95 transition-all whitespace-nowrap cursor-pointer">Check Availability →</button>
                </form>
                {pincodeResult.checked && (
                  <div className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2 ${pincodeResult.available ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" /><span className="text-justify">{pincodeResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="w-full bg-white border-b border-slate-200">
        <img
          src={bottomBannerToDisplay}
          alt={`${brand.name} Banner`}
          width={1200}
          height={360}
          loading="lazy"
          className="w-full h-auto object-cover block"
        />
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-12 pb-8 text-slate-700 text-xs border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-start mb-10">
            <div className="col-span-2 sm:col-span-1 flex flex-col items-start gap-2">
              <a href="/" className="flex flex-col group select-none">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-xs shrink-0">
                    <img
                      src={optimizeCloudinary("https://res.cloudinary.com/dieq3fjuv/image/upload/v1789813995/IMG-20260918-WA0070_skegej.jpg", { width: 90 })}
                      alt="Roservice Support Online 24x7"
                      width={36}
                      height={36}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0070e0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>24x7</span>
                </div>
                <span className="font-extrabold text-base text-[#002b66] tracking-tight leading-tight group-hover:text-[#0052a3] transition-colors">Roservice Support</span>
                <span className="text-[10px] font-bold tracking-wide text-[#0070e0] mt-0.5 uppercase">Customer Service Center</span>
              </a>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed max-w-[170px] text-justify">Certified doorstep water purifier repair &amp; maintenance service.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">Quick Links</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="/" className="hover:text-slate-950 transition-colors">Home</a></li>
                <li><a href="/services" className="hover:text-slate-950 transition-colors">Our Services</a></li>
                <li><a href="/blog" className="hover:text-slate-950 transition-colors">Blog</a></li>
                <li><a href="/faq" className="hover:text-slate-950 transition-colors">FAQ</a></li>
                <li><a href="/contact" className="hover:text-slate-950 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">Company</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="/about-us" className="hover:text-slate-950 transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-slate-950 transition-colors">Contact Us</a></li>
                <li><a href="/warranty-policy" className="hover:text-slate-950 transition-colors">Warranty Policy</a></li>
                <li><a href="/cancellation-policy" className="hover:text-slate-950 transition-colors">Cancellation Policy</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">Policies &amp; Legal</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><a href="/privacy-policy" className="hover:text-slate-950 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-slate-950 transition-colors">Terms &amp; Conditions</a></li>
                <li><a href="/disclaimer" className="hover:text-slate-950 transition-colors">Disclaimer &amp; Notice</a></li>
                <li><a href="/refund-policy" className="hover:text-slate-950 transition-colors">Refund &amp; Return Policy</a></li>
                <li><a href="/cookie-policy" className="hover:text-slate-950 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">Follow Us</h3>
              <div className="flex items-center gap-3.5 text-slate-800 pt-0.5">
                <a href="#" aria-label="Facebook" className="hover:text-[#1877F2] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-[#E4405F] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-[#FF0000] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-[#0A66C2] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
                </a>
              </div>
            </div>
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">Subscribe for Updates</h3>
              {newsletterSubmitted ? (
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">✓ Subscribed for updates</div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                  <input type="email" required placeholder="Enter your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 text-slate-800 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800" />
                  <button type="submit" aria-label="Submit newsletter subscription" className="w-9 h-9 rounded-full bg-[#0d3b84] hover:bg-[#092b63] text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer transition-colors"><ArrowRight className="w-4 h-4 stroke-[2.5]" /></button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-8 pb-6 border-t border-slate-200">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">{lookingForHeading}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 pt-1">
                {lookingForKeywords.map((kw, idx) => (
                  <button key={`kw-tick-${idx}`} onClick={scrollToBookingForm} className="flex items-start gap-3 text-left group cursor-pointer transition-colors py-0.5">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="text-sm sm:text-base font-medium text-slate-800 group-hover:text-blue-700 transition-colors">{kw}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 pb-6 border-t border-slate-200">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide"><ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" /><span>Formal Disclaimer &amp; Brand Notice</span></div>
              <p className="text-[11px] sm:text-xs leading-relaxed text-slate-600 text-justify"><strong>Roservice Support</strong> is an independent multi-brand doorstep water purifier sales, service, maintenance, and repair provider. We are <strong>not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected</strong> with Kent RO Systems Ltd., Eureka Forbes Ltd. (Aquaguard), Hindustan Unilever Ltd. (Pureit), A.O. Smith India Water Products Pvt. Ltd., Livpure Pvt. Ltd., Havells India Ltd., or any of their respective subsidiaries or affiliates.</p>
              <p className="text-[11px] sm:text-xs leading-relaxed text-slate-500 text-justify">All brand names, product logos, model numbers, and registered trademarks displayed on this website belong to their respective proprietary holders. Any reference to these trademarks is strictly made for customer convenience, identification, compatibility, and descriptive purposes to indicate the types of water purifiers our certified independent technicians service. We use 100% genuine compatible spare parts and provide our own 30-day labor and service warranty on all completed repairs.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
            <div>© 2026 Roservice Support. All rights reserved.</div>
            <div className="text-slate-600 font-normal">{brand.heroMotto || 'Pure Water. Healthy Families. Brighter Tomorrows.'}</div>
          </div>

          {isHomepage && (
            <div className="pt-3 pb-1 text-center sm:text-left">
              <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                {HOMEPAGE_BOTTOM_KEYWORDS}
              </p>
            </div>
          )}
          
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setVideoModalOpen(false)} aria-label="Close video modal" className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 bg-slate-100 cursor-pointer"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-3">
              <div style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }} className="w-10 h-10 rounded-xl flex items-center justify-center"><Wrench className="w-5 h-5" /></div>
              <div><h3 className="text-lg font-bold text-slate-900">How {brand.name} Service Works</h3><p className="text-xs text-slate-500">Doorstep Technician Service in 4 Simple Steps</p></div>
            </div>
            <div className="space-y-3 py-2 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3"><span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">1</span><div><strong className="text-slate-900 block">Book Service Online / Call</strong><span className="text-slate-500">Share your details and purifier problem.</span></div></div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3"><span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">2</span><div><strong className="text-slate-900 block">Technician Assigned in Minutes</strong><span className="text-slate-500">Doorstep visit arranged with genuine spares.</span></div></div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3"><span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">3</span><div><strong className="text-slate-900 block">Comprehensive Multi-Point Inspection</strong><span className="text-slate-500">TDS check, pressure testing, and filter replacement.</span></div></div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3"><span style={{ backgroundColor: primaryColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0">4</span><div><strong className="text-slate-900 block">Post-Service Warranty</strong><span className="text-slate-500">Enjoy clean drinking water with 90-day service warranty.</span></div></div>
            </div>
            <a href={`tel:${displayPhone}`} onClick={() => { setVideoModalOpen(false); }} aria-label={`Call ${brand.name} Helpline`} style={{ backgroundColor: primaryColor }} className="w-full text-white font-bold py-3 rounded-xl text-sm shadow-xs cursor-pointer flex items-center justify-center gap-2"><Phone className="w-4 h-4 fill-current" /><span>Call 7090170092</span></a>
          </div>
        </div>
      )}

    </div>
  );
}
