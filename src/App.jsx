import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Database, Smartphone, ChevronDown, Layers, Sparkles, Menu, X, Star, Zap, Heart, Send, Download, Globe, Cpu, Server, MessageCircle } from 'lucide-react';

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

  // --- GESTION DU SCROLL POUR LES SECTIONS ---
  const handleScrollToSection = (section) => {
    setIsMenuOpen(false);
    setActiveTab(section);
    
    switch(section) {
      case 'accueil':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'projets':
        window.scrollTo({ top: projetsRef.current?.offsetTop - 80, behavior: 'smooth' });
        break;
      case 'competences':
        window.scrollTo({ top: competencesRef.current?.offsetTop - 80, behavior: 'smooth' });
        break;
      case 'contact':
        window.scrollTo({ top: contactRef.current?.offsetTop - 80, behavior: 'smooth' });
        break;
    }
  };

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
    bio: "Je ne fais pas que coder, je conçois des expériences digitales. Spécialisé dans les applications modernes (SaaS, FoodTech) adaptées au marché africain.",
    email: "loicngoumou75@gmail.com",
    github: "https://github.com/7even5iv",
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
      titre: "Afrilane Student Portal",
      category: "EdTech / SaaS",
      desc: "Plateforme Intranet complète pour la gestion académique. Authentification sécurisée, Dashboard analytique et génération de badges QR Code.",
      tech: ["React", "Vite", "Tailwind", "QR API"],
      image: "/projet-afrilane.png",
      demo: "https://afrilane-student-portal-3kdb.vercel.app",
      github: "https://github.com/7even5iv/afrilane-student-portal",
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

        {/* Lignes de code flottantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="fixed z-0 font-mono text-xs text-cyan-400/10 pointer-events-none"
            style={{
              left: `${(i * 15 + 5) % 100}%`,
              top: `${(i * 12) % 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          >
            {i % 3 === 0 ? "const portfolio = { ... }" :
             i % 3 === 1 ? "function animate() { ... }" :
             "export default App;"}
          </motion.div>
        ))}

        {/* Scanner vertical */}
        <motion.div
          className="fixed top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent z-0"
          style={{
            boxShadow: '0 0 30px 2px rgba(6, 182, 212, 0.3)',
            left: `${mousePosition.x * 0.1 + 50}%`
          }}
          animate={{
            left: ['0%', '100%', '0%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Cercles orbitaux */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="fixed inset-0 z-0 border border-cyan-500/10 rounded-full"
            style={{
              margin: `${i * 100}px`,
              rotate: i * 45
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 40 - i * 10,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}

        {/* Noise texture animée */}
        <motion.div 
          className="fixed inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </>
    );
  };

  // --- COMPOSANT PARTICULES INTERACTIVES ---
  const InteractiveParticles = () => {
    const particles = Array.from({ length: 40 });
    
    return (
      <>
        {particles.map((_, i) => (
          <motion.div
            key={`interactive-particle-${i}`}
            className="fixed w-1 h-1 rounded-full z-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.66 ? 'rgba(59, 130, 246, 0.6)' :
                Math.random() > 0.33 ? 'rgba(139, 92, 246, 0.6)' :
                'rgba(6, 182, 212, 0.6)'
              }, transparent)`,
            }}
            animate={{
              x: [0, mousePosition.x * 0.2, 0],
              y: [0, mousePosition.y * 0.2, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.1,
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
      style={{
        cursor: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='4' fill='%233b82f6' opacity='0.7'/%3E%3C/svg%3E") 16 16, auto`
      }}
    >
      
      {/* --- FOND ANIMÉ MODERNE --- */}
      <AnimatedBackground />
      <InteractiveParticles />
      
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

      {/* --- NAV BAR MODERNE --- */}
      <motion.nav 
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

            {/* Bouton WhatsApp Desktop */}
            <motion.a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all relative overflow-hidden group"
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

            {/* Menu Mobile Toggle */}
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/10"
                animate={{ scale: isMenuOpen ? 1.5 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Menu Mobile avec animations */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="md:hidden mt-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                transition={{ duration: 0.3 }}
              >
                {[
                  { id: 'accueil', label: 'Accueil' },
                  { id: 'projets', label: 'Projets' },
                  { id: 'competences', label: 'Compétences' },
                  { id: 'contact', label: 'Contact' }
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleScrollToSection(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block w-full text-left px-6 py-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-0 group ${
                      activeTab === item.id ? 'text-blue-400' : 'text-gray-300'
                    }`}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-1 h-4 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"
                        animate={{ height: activeTab === item.id ? '1.5rem' : '0.5rem' }}
                        transition={{ duration: 0.3 }}
                      />
                      {item.label}
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
                {/* WhatsApp Mobile */}
                <motion.a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-6 py-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 hover:text-green-300 transition-colors border-t border-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    WhatsApp
                  </div>
                </motion.a>
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
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
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

      {/* --- PROJETS SECTION AVEC ANIMATIONS MODERNES --- */}
      <section 
        ref={projetsRef} 
        id="projets" 
        className="relative z-10 py-40 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header avec animation */}
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
              Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Innovants</span>
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Des solutions digitales modernes conçues avec passion et expertise
            </motion.p>
          </motion.div>

          {/* Projets grid avec animations */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
                variants={cardHover}
                whileHover="hover"
                className="relative group perspective-1000"
              >
                {/* Effet de glow */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl blur-xl"
                  style={{ background: project.glowColor }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                
                {/* Carte principale */}
                <div className="relative bg-gradient-to-br from-white/5 via-white/2 to-white/0 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden transform-gpu">
                  
                  {/* Image container */}
                  <div className="h-64 overflow-hidden relative">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-10 transition duration-500 z-10`}></div>
                    
                    {/* Image du projet avec animation */}
                    <motion.img 
                      src={project.image} 
                      alt={project.titre}
                      className="w-full h-full object-cover"
                      variants={imageHover}
                      initial="initial"
                      whileHover="hover"
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center ${project.color.split(' ')[1]}">
                            <div class="text-white text-center p-4">
                              <Code2 size={48} class="mx-auto mb-2" />
                              <p class="font-bold">${project.titre}</p>
                              <p class="text-sm opacity-75">${project.category}</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    
                    {/* Badge Catégorie avec animation */}
                    <motion.div 
                      className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 uppercase tracking-wide"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring" }}
                    >
                      {project.category}
                    </motion.div>

                    {/* Featured badge */}
                    {project.featured && (
                      <motion.div 
                        className="absolute top-4 right-4 z-20"
                        initial={{ rotate: 0, scale: 0 }}
                        animate={{ rotate: 360, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                      >
                        <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <Star size={10} className="text-yellow-400" />
                          </motion.div>
                          FEATURED
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Contenu du projet */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <motion.h3 
                          className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {project.titre}
                        </motion.h3>
                      </div>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="text-gray-500 group-hover:text-blue-400" />
                      </motion.a>
                    </div>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Tech stack avec animations */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5 group/tech relative overflow-hidden"
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderColor: 'rgba(59, 130, 246, 0.3)'
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/10 to-blue-500/0"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.4 }}
                          />
                          <span className="relative z-10">{tech}</span>
                        </motion.span>
                      ))}
                    </div>

                    {/* Actions avec animations */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors group/demo"
                        whileHover={{ x: 5 }}
                      >
                        <span>Voir la démo</span>
                        <ExternalLink size={16} className="group-hover/demo:rotate-45 transition-transform" />
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Github size={20} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA supplémentaire */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/30 rounded-full font-bold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollToSection('contact')}
            >
              <Send size={20} />
              Discutons de votre projet
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* --- COMPÉTENCES SECTION AVEC ANIMATIONS MODERNES --- */}
      <section 
        ref={competencesRef}
        id="competences" 
        className="relative z-10 py-40 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
            >
              <Zap className="text-cyan-400" size={16} />
              <span className="text-sm text-cyan-400 font-medium tracking-widest">EXPERTISE TECHNIQUE</span>
            </motion.div>
            <motion.h2 
              className="text-5xl md:text-6xl font-black mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Compétences</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Skills avec animations interactives */}
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="space-y-3 group"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20`}
                        animate={hoveredSkill === index ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <motion.span 
                      className="text-sm text-gray-400"
                      animate={hoveredSkill === index ? { scale: 1.2 } : { scale: 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden relative">
                    {/* Barre de progression */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    >
                      {/* Effet de brillance */}
                      <motion.div
                        className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '300%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description expertise avec animations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-8"
            >
              <motion.h3 
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Pourquoi me <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">choisir</span> ?
              </motion.h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Heart className="text-red-400" size={20} />,
                    title: "Passionné",
                    desc: "Je m'investis à 100% dans chaque projet avec créativité et rigueur.",
                    color: "from-red-500/20 to-pink-500/20"
                  },
                  {
                    icon: <Zap className="text-yellow-400" size={20} />,
                    title: "Rapide",
                    desc: "Développement agile avec des délais optimisés sans sacrifier la qualité.",
                    color: "from-yellow-500/20 to-orange-500/20"
                  },
                  {
                    icon: <Sparkles className="text-purple-400" size={20} />,
                    title: "Innovant",
                    desc: "Toujours à la pointe des dernières technologies et tendances UI/UX.",
                    color: "from-purple-500/20 to-pink-500/20"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur-sm`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-bold mb-1 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bouton supplémentaire */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/30 rounded-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScrollToSection('contact')}
                >
                  <Download size={18} />
                  <span>Télécharger mon CV</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION AVEC ANIMATIONS --- */}
      <section 
        ref={contactRef}
        id="contact" 
        className="relative z-10 py-40 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Header avec animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileInView={{ rotate: [0, 360] }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <Send className="text-blue-400" size={16} />
              <span className="text-sm bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-medium tracking-widest">
                TRAVAILLONS ENSEMBLE
              </span>
            </motion.div>
            
            <motion.h3 
              className="text-4xl md:text-5xl font-black mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Prêt à donner vie à votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">projet</span> ?
            </motion.h3>
            <motion.p 
              className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Contactez-moi pour discuter de votre idée ou pour toute collaboration
            </motion.p>
          </motion.div>

          {/* Contact info avec animations */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Mail className="text-blue-400" size={20} />,
                title: "Email",
                content: profile.email,
                color: "from-blue-500/20 to-cyan-500/20",
                borderColor: "hover:border-blue-500/30",
                href: `mailto:${profile.email}`
              },
              {
                icon: <Github className="text-blue-400" size={20} />,
                title: "GitHub",
                content: "@7even5iv",
                color: "from-blue-500/20 to-cyan-500/20",
                borderColor: "hover:border-blue-500/30",
                href: profile.github
              },
              {
                icon: <MessageCircle className="text-green-400" size={20} />,
                title: "WhatsApp",
                content: profile.whatsappNumber,
                color: "from-green-500/20 to-emerald-500/20",
                borderColor: "hover:border-green-500/30",
                href: profile.whatsapp
              }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.title !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 ${item.borderColor} transition-all group relative overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm break-all group-hover:text-gray-300 transition-colors">
                    {item.content}
                  </p>
                  {item.title === "WhatsApp" && (
                    <motion.span 
                      className="text-xs text-green-400 mt-2 block"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💬 Réponse rapide garantie
                    </motion.span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>

          {/* Boutons de contact avec animations */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={`mailto:${profile.email}?subject=Collaboration%20avec%20Loïc%20Ngoumou&body=Bonjour%20Loïc,%0D%0A%0D%0AJe%20suis%20intéressé(e)%20par%20vos%20services...`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/30 transition-all relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-cyan-400/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Send size={20} className="relative z-10" />
              <span className="relative z-10">Envoyer un email</span>
            </motion.a>
            
            <motion.a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-green-500/30 transition-all relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
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
              <span className="relative z-10">Message WhatsApp</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* --- FOOTER AVEC ANIMATIONS --- */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="/mon-logo.png" 
                    alt="Logo" 
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500/30"
                    onError={(e) => e.target.style.display='none'}
                  />
                </motion.div>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Code & Design
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Développeur FullStack spécialisé React.js & UX
              </p>
            </div>

            {/* Liens sociaux avec animations */}
            <div className="flex gap-4">
              {[
                { icon: <Github size={18} />, href: profile.github, color: "hover:text-white" },
                { icon: <Mail size={18} />, href: `mailto:${profile.email}`, color: "hover:text-blue-400" },
                { icon: <MessageCircle size={18} className="text-green-400" />, href: profile.whatsapp, color: "hover:text-green-400" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 transition-all relative group"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-lg ${item.color} opacity-0 group-hover:opacity-20`}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Copyright avec animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 pt-6 border-t border-white/5"
          >
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Loïc Ngoumou. Tous droits réservés.
            </p>
            <motion.p 
              className="text-gray-700 text-xs mt-1"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Code & Design avec ❤️
            </motion.p>
          </motion.div>
        </div>
      </footer>

      {/* Ajout des styles CSS pour animations supplémentaires */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        /* Cursor personnalisé */
        body {
          cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='4' fill='%233b82f6' opacity='0.7'/%3E%3C/svg%3E") 16 16, auto;
        }
      `}</style>
    </div>
  );
}