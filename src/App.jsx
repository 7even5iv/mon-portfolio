import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Database, Smartphone, ChevronDown, Layers, Sparkles, Menu, X, Star, Zap, Heart, Send, Download, Globe, Cpu, Server, MessageCircle, Facebook, Home } from 'lucide-react';

export default function App() {
  
  // --- ÉTATS ---
  const [activeTab, setActiveTab] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [typedText, setTypedText] = useState('');
  
  // --- REFS ---
  const containerRef = useRef();
  const heroRef = useRef();
  const projetsRef = useRef();
  const competencesRef = useRef();
  const contactRef = useRef();
  const menuRef = useRef();
  
  // --- SCROLL ANIMATIONS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Détection du scroll pour la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, []);

  // Transformations avancées
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // --- ANIMATION DE TEXTE TYPÉ ---
  useEffect(() => {
    const text = "Développeur Web & Mobile | React.js & UX";
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= text.length) {
        setTypedText(text.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  // --- GESTION DU SCROLL POUR LES SECTIONS (CORRIGÉ) ---
  const handleScrollToSection = (section) => {
    setIsMenuOpen(false);
    setActiveTab(section);
    
    // Petit délai pour la fermeture du menu
    setTimeout(() => {
      switch(section) {
        case 'accueil':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'projets':
          const projetsElement = document.getElementById('projets');
          if (projetsElement) {
            const yOffset = -80; // Pour compenser la navbar fixe
            const y = projetsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }
          break;
        case 'competences':
          const competencesElement = document.getElementById('competences');
          if (competencesElement) {
            const yOffset = -80; // Pour compenser la navbar fixe
            const y = competencesElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }
          break;
        case 'contact':
          const contactElement = document.getElementById('contact');
          if (contactElement) {
            const yOffset = -80; // Pour compenser la navbar fixe
            const y = contactElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }
          break;
      }
    }, 150); // Délai pour la fermeture du menu
  };

  // --- CLICK OUTSIDE POUR FERMER LE MENU MOBILE ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // --- SUIVI DE LA SOURIS AVANCÉ ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- DONNÉES ---
  const profile = {
    nom: "Loïc Ngoumou",
    titre: "Développeur Web & Mobile | React.js & UX",
    bio: "Je ne fais pas que coder, je conçois des expériences digitales. Spécialisé dans les applications modernes (SaaS, FoodTech et Autres) adaptées au marché camerounais et africain.",
    email: "loicngoumou75@gmail.com",
    github: "https://github.com/7even5iv",
    facebook: "https://web.facebook.com/profile.php?id=61582833287960",
    whatsapp: "https://wa.me/237690316766",
    whatsappNumber: "+237 690 31 67 66",
    stats: [
      { label: "Projets", value: "15+", icon: <Layers size={14} /> },
      { label: "Expérience", value: "3+ ans", icon: <Zap size={14} /> },
      { label: "Clients", value: "100%", icon: <Heart size={14} /> },
      { label: "Techs", value: "12+", icon: <Cpu size={14} /> }
    ]
  };

  const projects = [
    {
      id: 1,
      titre: "AFRILANE",
      category: "EdTech / SaaS",
      desc: "Plateforme Intranet complète pour la gestion académique. Authentification sécurisée, Dashboard analytique et génération de badges QR Code.",
      tech: ["React", "Vite", "Tailwind", "QR API"],
      image: "/projet-afrilane.png",
      demo: "https://afrilane-website.vercel.app/",
      github: "https://github.com/7even5iv/afrilane-website",
      featured: true,
      glowColor: "rgba(59, 130, 246, 0.5)",
      color: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      titre: "KmerDelice",
      category: "FoodTech / E-commerce",
      desc: "L'expérience de commande de repas ultime pour le Cameroun. Panier dynamique, UI/UX soignée et commande instantanée via WhatsApp.",
      tech: ["React", "WhatsApp API", "Framer Motion"],
      image: "/projet-resto.png",
      demo: "https://kmer-delice.vercel.app",
      github: "https://github.com/7even5iv/kmer-delice",
      featured: true,
      glowColor: "rgba(249, 115, 22, 0.5)",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      titre: "WAKA",
      category: "FoodTech / E-commerce",
      desc: "Plateforme de commande de repas pour les étudiants. Interface utilisateur moderne et processus de commande simplifié.",
      tech: ["React", "WhatsApp API", "Framer Motion"],
      image: "/projet-waka.png",
      demo: "https://waka-gold.vercel.app",
      github: "https://github.com/7even5iv/waka",
      featured: false,
      glowColor: "rgba(249, 115, 22, 0.5)",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      titre: "NOZIAH ACADEMY",
      category: "EdTech / SaaS",
      desc: "Plateforme d'oganisation d'évènements et formation des hotesses.",
      tech: ["Next"],
      image: "/projet-noziah.png",
      demo: "https://noziah-academy.vercel.app",
      github: "https://github.com/7even5iv/noziah-academy",
      featured: false,
      glowColor: "rgba(59, 130, 246, 0.5)",
      color: "from-blue-600 to-cyan-500"
    }
  ];

  const skills = [
    { name: "React.js", level: 90, icon: <Code2 />, color: "from-cyan-500 to-blue-500" },
    { name: "Tailwind CSS", level: 95, icon: <Sparkles />, color: "from-purple-500 to-pink-500" },
    { name: "UI/UX Design", level: 85, icon: <Layers />, color: "from-green-500 to-emerald-500" },
    { name: "Git & GitHub", level: 88, icon: <Github />, color: "from-gray-700 to-black" },
    { name: "Mobile First", level: 92, icon: <Smartphone />, color: "from-blue-500 to-indigo-500" },
    { name: "TypeScript", level: 80, icon: <Terminal />, color: "from-blue-600 to-cyan-500" },
    { name: "Framer Motion", level: 85, icon: <Zap />, color: "from-yellow-500 to-orange-500" },
    { name: "API Integration", level: 87, icon: <Database />, color: "from-green-600 to-teal-500" }
  ];

  // --- ANIMATIONS VARIANTS AVANCÉES ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const staggerContainer = {
    visible: { 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3 
      } 
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const imageHover = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05,
      rotate: 2,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const cardHover = {
    initial: { y: 0, scale: 1 },
    hover: { 
      y: -20,
      scale: 1.02,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glitchAnimation = {
    initial: { x: 0 },
    hover: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const menuItemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // --- COMPOSANT FOND ANIMÉ MODERNE ---
  const AnimatedBackground = () => {
    return (
      <>
        {/* Fond principal avec dégradé dynamique */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: `
              radial-gradient(circle at ${50 + mousePosition.x * 0.03}% ${50 + mousePosition.y * 0.03}%, rgba(59, 130, 246, 0.15) 0%, transparent 70%),
              radial-gradient(circle at ${30 - mousePosition.x * 0.02}% ${70 + mousePosition.y * 0.02}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at ${70 + mousePosition.x * 0.02}% ${30 - mousePosition.y * 0.02}%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
              linear-gradient(to bottom, #0a0a0a, #111111, #0a0a0a)
            `,
            backgroundBlendMode: 'overlay'
          }}
        />
        
        {/* Grille 3D animée */}
        <div 
          className="fixed inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `
              perspective(1000px) 
              rotateX(${mousePosition.y * 0.1}deg) 
              rotateY(${mousePosition.x * 0.1}deg) 
              translateZ(-100px)
            `,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Éclats de lumière flottants */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="fixed z-0 w-32 h-32 rounded-full blur-[80px]"
            style={{
              left: `${(i * 20 + 10) % 100}%`,
              top: `${(i * 30) % 100}%`,
              background: `radial-gradient(circle, ${
                i % 4 === 0 ? 'rgba(59, 130, 246, 0.2)' :
                i % 4 === 1 ? 'rgba(139, 92, 246, 0.2)' :
                i % 4 === 2 ? 'rgba(6, 182, 212, 0.2)' :
                'rgba(236, 72, 153, 0.2)'
              }, transparent 70%)`
            }}
            animate={{
              x: [0, Math.sin(i) * 50, 0],
              y: [0, Math.cos(i) * 50, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden bg-[#0a0a0a]"
    >
      
      {/* --- FOND ANIMÉ MODERNE --- */}
      <AnimatedBackground />
      
      {/* --- PROGRESS BAR DE SCROLL AVANCÉE --- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{ scaleX: scrollProgress }}
      >
        <div className="h-full w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"></div>
        <motion.div
          className="absolute -top-1 w-3 h-3 rounded-full bg-white shadow-lg shadow-blue-500"
          style={{ left: `${scrollProgress * 100}%` }}
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: ['0 0 10px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 10px rgba(59, 130, 246, 0.5)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      </motion.div>

      {/* --- BOUTON WHATSAPP FLOATING AVEC ANIMATION --- */}
      <motion.a
        href={profile.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all group"
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          boxShadow: [
            '0 10px 40px rgba(34, 197, 94, 0.4)',
            '0 20px 50px rgba(34, 197, 94, 0.6)',
            '0 10px 40px rgba(34, 197, 94, 0.4)'
          ]
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <MessageCircle size={28} className="text-white" />
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping opacity-75"></div>
      </motion.a>

      {/* --- NAV BAR MODERNE AVEC MENU MOBILE CORRIGÉ --- */}
      <motion.nav 
        ref={menuRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-500 ${
          isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo avec animation */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleScrollToSection('accueil')}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-50"></div>
                <img 
                  src="/mon-logo.png" 
                  alt="Logo" 
                  className="relative w-10 h-10 rounded-full ring-2 ring-blue-500/50 group-hover:ring-cyan-500 transition-all duration-300"
                  onError={(e) => e.target.style.display='none'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-[length:200%] bg-clip-text text-transparent animate-gradient">
                  Code & Design
                </span>
              </motion.div>
            </motion.div>

            {/* Menu Desktop avec animations */}
            <div className="hidden md:flex gap-8 text-sm font-medium">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'projets', label: 'Projets' },
                { id: 'competences', label: 'Compétences' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className="relative text-gray-300 hover:text-white transition-colors px-2 py-1 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 rounded-lg group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Boutons réseaux sociaux Desktop - Facebook et WhatsApp uniquement */}
            <div className="hidden md:flex items-center gap-3">
              {/* Bouton Facebook avec le même style que WhatsApp */}
              <motion.a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <Facebook size={14} className="relative z-10" />
                <span className="relative z-10">Facebook</span>
              </motion.a>

              {/* Bouton WhatsApp Desktop */}
              <motion.a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <MessageCircle size={14} className="relative z-10" />
                <span className="relative z-10">WhatsApp</span>
              </motion.a>
            </div>

            {/* Menu Mobile Toggle - CORRIGÉ */}
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Menu"
            >
              <div className="relative w-6 h-6">
                <motion.div
                  className="absolute top-1 left-0 w-6 h-0.5 bg-white rounded-full"
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-3 left-0 w-6 h-0.5 bg-white rounded-full"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-5 left-0 w-6 h-0.5 bg-white rounded-full"
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/10"
                animate={{ scale: isMenuOpen ? 1.5 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Menu Mobile - COMPLÈTEMENT CORRIGÉ */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="md:hidden mt-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="py-2"
                >
                  {/* Accueil avec icône Lucide */}
                  <motion.button
                    onClick={() => handleScrollToSection('accueil')}
                    variants={menuItemAnimation}
                    className={`w-full text-left px-6 py-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5 flex items-center gap-3 group ${
                      activeTab === 'accueil' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Home size={20} className="text-blue-400" />
                    <span className="font-medium">Accueil</span>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 text-blue-400"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </motion.button>

                  {/* Projets avec icône Lucide */}
                  <motion.button
                    onClick={() => handleScrollToSection('projets')}
                    variants={menuItemAnimation}
                    className={`w-full text-left px-6 py-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5 flex items-center gap-3 group ${
                      activeTab === 'projets' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Layers size={20} className="text-blue-400" />
                    <span className="font-medium">Projets</span>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 text-blue-400"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </motion.button>

                  {/* Compétences avec icône Lucide */}
                  <motion.button
                    onClick={() => handleScrollToSection('competences')}
                    variants={menuItemAnimation}
                    className={`w-full text-left px-6 py-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5 flex items-center gap-3 group ${
                      activeTab === 'competences' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Zap size={20} className="text-blue-400" />
                    <span className="font-medium">Compétences</span>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 text-blue-400"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </motion.button>

                  {/* Contact avec icône Lucide */}
                  <motion.button
                    onClick={() => handleScrollToSection('contact')}
                    variants={menuItemAnimation}
                    className={`w-full text-left px-6 py-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5 flex items-center gap-3 group ${
                      activeTab === 'contact' ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={20} className="text-blue-400" />
                    <span className="font-medium">Contact</span>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 text-blue-400"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                  
                  {/* Réseaux sociaux Mobile */}
                  <div className="flex border-t border-white/5">
                    <motion.a
                      href={profile.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={menuItemAnimation}
                      className="flex-1 text-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-colors border-r border-white/5 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Facebook size={18} />
                      <span className="text-sm">Facebook</span>
                    </motion.a>
                    
                    <motion.a
                      href={profile.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={menuItemAnimation}
                      className="flex-1 text-center px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle size={18} />
                      <span className="text-sm">WhatsApp</span>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* --- HERO SECTION AVEC ANIMATIONS AVANCÉES --- */}
      <motion.section 
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity, y: parallaxY }}
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-24"
      >
        <div className="max-w-6xl mx-auto text-center relative">
          
          {/* Élément flottant derrière l'avatar */}
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="mb-12 relative"
          >
            {/* Halo effect animé */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Avatar avec animation de rebond */}
            <motion.div
              className="relative w-48 h-48 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.img 
                src="/7even5ive.png" 
                alt="Loïc Ngoumou" 
                className="relative w-full h-full object-cover rounded-full border-4 border-black/50 z-10 shadow-2xl shadow-blue-500/20"
                whileHover={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Points orbitaux autour de l'avatar */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`orbital-${i}`}
                  className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginLeft: '-6px',
                    marginTop: '-6px'
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos(i * 90 * Math.PI/180) * 140,
                    y: Math.sin(i * 90 * Math.PI/180) * 140,
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    x: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Contenu texte avec animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Badge animé */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-4 group"
              whileHover={{ scale: 1.05 }}
              variants={glitchAnimation}
              whileHover="hover"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-cyan-400" />
              </motion.div>
              <span className="text-sm bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-[length:200%] bg-clip-text text-transparent animate-gradient">
                Développeur FullStack
              </span>
            </motion.div>

            {/* Nom avec animation de gradient */}
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100"
                  animate={{
                    backgroundPosition: ['0% center', '200% center']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  LOÏC
                </motion.span>
                <br />
                <motion.span 
                  className="text-4xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-[length:200%]"
                  animate={{
                    backgroundPosition: ['0% center', '200% center'],
                    textShadow: [
                      '0 0 20px rgba(59, 130, 246, 0)',
                      '0 0 30px rgba(59, 130, 246, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  NGOUMOU
                </motion.span>
              </h1>
            </div>

            {/* Titre avec effet machine à écrire */}
            <div className="h-12">
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                {typedText}
                <motion.span
                  className="inline-block w-[2px] h-6 bg-cyan-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </p>
            </div>

            {/* Bio avec apparition progressive */}
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              {profile.bio}
            </motion.p>
          </motion.div>

          {/* Stats avec animations */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {profile.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/10 to-blue-500/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons avec animations */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              onClick={() => handleScrollToSection('projets')}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={pulseAnimation}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-cyan-400/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Explorer mes projets</span>
              <ChevronDown className="ml-2 relative z-10 group-hover:translate-y-1 transition-transform" />
            </motion.button>
            
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center gap-2 group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-800/0 via-white/5 to-gray-800/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Github size={20} className="relative z-10" />
              <span className="relative z-10">GitHub</span>
            </motion.a>

            <motion.a
              href={profile.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-blue-500/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Facebook size={20} className="relative z-10" />
              <span className="relative z-10">Facebook</span>
            </motion.a>
            
            <motion.a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-green-500/30 transition-all flex items-center gap-2 group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/10 to-emerald-400/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <MessageCircle size={20} className="relative z-10" />
              <span className="relative z-10">WhatsApp</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator amélioré */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => handleScrollToSection('projets')}
          whileHover={{ scale: 1.2 }}
        >
          <div className="text-gray-500 flex flex-col items-center gap-2 group">
            <span className="text-xs tracking-widest group-hover:text-cyan-400 transition-colors">SCROLL</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <ChevronDown size={24} className="group-hover:text-cyan-400 transition-colors" />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* --- PROJETS SECTION --- */}
      <section 
        ref={projetsRef} 
        id="projets" 
        className="relative z-10 py-40 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileInView={{ scale: [0.9, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Code2 className="text-blue-400" size={16} />
              <motion.span 
                className="text-sm text-blue-400 font-medium tracking-widest"
                animate={{
                  textShadow: ['0 0 10px rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.5)', '0 0 10px rgba(59, 130, 246, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                MES CRÉATIONS
              </motion.span>
            </motion.div>
            <motion.h2 
              className="text-5xl md:text-6xl font-black mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Réalisés</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                  <div className="h-64 overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-10 transition duration-500 z-10`}></div>
                    <motion.img 
                      src={project.image} 
                      alt={project.titre}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 uppercase tracking-wide">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">
                      {project.titre}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span>Voir la démo</span>
                        <ExternalLink size={16} />
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Github size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPÉTENCES SECTION --- */}
      <section 
        ref={competencesRef}
        id="competences" 
        className="relative z-10 py-40 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
            >
              <Zap className="text-cyan-400" size={16} />
              <span className="text-sm text-cyan-400 font-medium tracking-widest">EXPERTISE TECHNIQUE</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Compétences</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-cyan-400">
                        {skill.icon}
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 p-8"
            >
              <h3 className="text-2xl font-bold mb-6">
                Pourquoi me <span className="text-cyan-400">choisir</span> ?
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <Heart className="text-red-400" size={20} />,
                    title: "Passionné",
                    desc: "Je m'investis à 100% dans chaque projet avec créativité et rigueur."
                  },
                  {
                    icon: <Zap className="text-yellow-400" size={20} />,
                    title: "Rapide",
                    desc: "Développement agile avec des délais optimisés sans sacrifier la qualité."
                  },
                  {
                    icon: <Sparkles className="text-purple-400" size={20} />,
                    title: "Innovant",
                    desc: "Toujours à la pointe des dernières technologies et tendances UI/UX."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-white/5 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section 
        ref={contactRef}
        id="contact" 
        className="relative z-10 py-40 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
            >
              <Send className="text-blue-400" size={16} />
              <span className="text-sm bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium tracking-widest">
                TRAVAILLONS ENSEMBLE
              </span>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black mb-6">
              Prêt à donner vie à votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">projet</span> ?
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-moi pour discuter de votre idée ou pour toute collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <motion.a
              href={`mailto:${profile.email}`}
              className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                <Mail className="text-blue-400" size={20} />
              </div>
              <h4 className="font-bold mb-2">Email</h4>
              <p className="text-gray-400 text-sm break-all">{profile.email}</p>
            </motion.a>

            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                <Github className="text-blue-400" size={20} />
              </div>
              <h4 className="font-bold mb-2">GitHub</h4>
              <p className="text-gray-400 text-sm">@7even5iv</p>
            </motion.a>

            <motion.a
              href={profile.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4">
                <Facebook className="text-blue-400" size={20} />
              </div>
              <h4 className="font-bold mb-2">Facebook</h4>
              <p className="text-gray-400 text-sm">@Loic Dev Studio</p>
            </motion.a>

            <motion.a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-4">
                <MessageCircle className="text-green-400" size={20} />
              </div>
              <h4 className="font-bold mb-2">WhatsApp</h4>
              <p className="text-gray-400 text-sm">{profile.whatsappNumber}</p>
              <span className="text-xs text-green-400 mt-2 block">💬 Réponse rapide garantie</span>
            </motion.a>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={`mailto:${profile.email}?subject=Collaboration%20avec%20Loïc%20Ngoumou&body=Bonjour%20Loïc,%0D%0A%0D%0AJe%20suis%20intéressé(e)%20par%20vos%20services...`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} /> Envoyer un email
            </motion.a>
            
            <motion.a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-green-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} /> Message WhatsApp
            </motion.a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <img 
                  src="/mon-logo.png" 
                  alt="Logo" 
                  className="w-8 h-8 rounded-full ring-2 ring-blue-500/30"
                  onError={(e) => e.target.style.display='none'}
                />
                <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Code & Design
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Développeur FullStack spécialisé React.js & UX
              </p>
            </div>

            <div className="flex gap-4">
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-blue-400 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href={`mailto:${profile.email}`}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={18} />
              </motion.a>
              <motion.a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-green-400 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle size={18} className="text-green-400" />
              </motion.a>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-white/5">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Loïc Ngoumou. Tous droits réservés.
            </p>
            <p className="text-gray-700 text-xs mt-1">
              Code & Design
            </p>
          </div>
        </div>
      </footer>

      {/* Styles CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </div>
  );
}