import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Database, Smartphone, Facebook, ChevronDown, Layers, Sparkles } from 'lucide-react';

export default function App() {
  
  // --- DONNÉES ---
  const profile = {
    nom: "Loïc Ngoumou",
    titre: "Développeur Web & Mobile | React.js & UX",
    bio: "Je ne fais pas que coder, je conçois des expériences digitales. Spécialisé dans les applications modernes (SaaS, FoodTech) adaptées au marché africain.",
    email: "loicngoumou75@gmail.com",
    facebook: "https://facebook.com/profile.php?id=61582833287960",
    github: "https://github.com/7even5iv",
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
      color: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      titre: "KmerDelice",
      category: "FoodTech / E-commerce",
      desc: "L'expérience de commande de repas ultime pour le Cameroun. Panier dynamique, UI/UX soignée et commande instantanée via WhatsApp.",
      tech: ["React", "WhatsApp API", "Framer Motion"],
      image: "/projet-resto.png", 
      demo: "https://kmer-delice.vercel.app", // Mets ton lien ici
      github: "https://github.com/7even5iv/kmer-delice",
      color: "from-orange-500 to-red-500"
    }
  ];

  const skills = [
    { name: "React.js", level: "Avancé" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "UI/UX Design", level: "Passionné" },
    { name: "Git & GitHub", level: "Avancé" },
    { name: "Mobile First", level: "Natif" },
  ];

  // --- ANIMATIONS VARIANTS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      
      {/* --- FOND ANIMÉ (Background) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* --- NAV BAR FLOTTANTE --- */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl">
          <img src="/mon-logo.png" alt="Logo" className="w-8 h-8 rounded-full" onError={(e) => e.target.style.display='none'}/>
          <div className="flex gap-4 text-sm font-medium text-gray-300">
            <a href="#projets" className="hover:text-white transition">Projets</a>
            <a href="#skills" className="hover:text-white transition">Compétences</a>
            <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition">Contact</a>
          </div>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-32 h-32 md:w-40 md:h-40 mx-auto relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <img 
              src="/7even5ive.png" 
              alt="Profile" 
              className="relative w-full h-full object-cover rounded-full border-4 border-[#0a0a0a] z-10"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 border-4 border-[#0a0a0a] w-8 h-8 rounded-full z-20" title="Disponible"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <h2 className="text-blue-400 font-medium tracking-widest uppercase text-sm mb-4">LOIC DEV STUDIO</h2>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                {profile.nom}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {profile.titre}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: <Github />, href: profile.github },
              { icon: <Facebook />, href: profile.facebook },
              { icon: <Mail />, href: `mailto:${profile.email}` }
            ].map((item, i) => (
              <a 
                key={i} href={item.href} target="_blank" rel="noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all transform hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- PROJETS (Glassmorphic Cards) --- */}
      <section id="projets" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
          >
            <div>
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Layers className="text-blue-500" /> Projets Réalisés
              </h2>
              <p className="text-gray-400">Une sélection de mes travaux récents.</p>
            </div>
            <div className="h-px bg-white/10 flex-1 ml-8 hidden md:block"></div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-10"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {projects.map((proj) => (
              <motion.div 
                key={proj.id} variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl"
              >
                {/* Image avec Overlay coloré */}
                <div className="h-64 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-t ${proj.color} opacity-20 group-hover:opacity-10 transition duration-500 z-10`}></div>
                  <img 
                    src={proj.image} 
                    alt={proj.titre} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  {/* Badge Catégorie */}
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 uppercase tracking-wide">
                    {proj.category}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition">{proj.titre}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{proj.desc}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <a href={proj.demo} target="_blank" className="flex items-center gap-2 text-white font-bold hover:text-blue-400 transition">
                      Voir la démo <ExternalLink size={16} />
                    </a>
                    <a href={proj.github} target="_blank" className="text-gray-500 hover:text-white transition">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SKILLS (Grid moderne) --- */}
      <section id="skills" className="relative z-10 py-20 px-6 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-12 flex items-center justify-center gap-3">
              <Sparkles className="text-yellow-500" /> Stack Technique
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 hover:border-blue-500/50 hover:bg-blue-900/10 transition-colors group cursor-default"
              >
                <div className="text-white font-bold mb-1">{skill.name}</div>
                <div className="text-xs text-gray-500 group-hover:text-blue-400 transition">{skill.level}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-12 text-center border-t border-white/5 bg-[#0a0a0a]">
        <h3 className="text-2xl font-bold text-white mb-2">Travaillons ensemble.</h3>
        <p className="text-gray-500 mb-6">Disponible pour des missions freelance ou CDI.</p>
        <a 
          href={`mailto:${profile.email}`} 
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition"
        >
          <Mail size={18} /> Me contacter
        </a>
        <p className="text-xs text-gray-600 mt-12">© 2025 {profile.nom}. Design & Code.</p>
      </footer>

    </div>
  );
}