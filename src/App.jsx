import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Database, Smartphone, Facebook } from 'lucide-react';

export default function App() {
  
  // --- TES DONNÉES ---
  const profile = {
    nom: "Loïc Ngoumou",
    titre: "Développeur Web & Mobile | React.js",
    bio: "Étudiant passionné par la création d'interfaces modernes et performantes. Je transforme des problèmes complexes en solutions digitales simples et élégantes.",
    email: "loicngoumou75@gmail.com",
    facebook: "https://facebook.com/profile.php?id=61582833287960",
    github: "https://github.com/7even5iv",
  };

  const projects = [
      // PROJET 1 : AFRILANE
    {
      id: 1,
      titre: "Afrilane Student Portal",
      desc: "Application Intranet complète pour la gestion académique. Authentification, Tableau de bord temps réel et génération de badges QR Code pour le contrôle d'accès.",
      tech: ["React.js", "Vite", "Tailwind CSS", "API QR"],
      image: "/projet-afrilane.png", 
      demo: "https://afrilane-student-portal-3kdb.vercel.app", 
      github: "https://github.com/7even5iv/afrilane-student-portal"
    },
    
    // PROJET 2 : KMER DELICE
    {
      id: 2,
      titre: "KmerDelice - Food Delivery",
      desc: "Application de commande de repas adaptée au marché camerounais. Catalogue interactif, panier dynamique et validation de commande automatique via WhatsApp.",
      tech: ["React.js", "WhatsApp API", "UX/UI Design", "Mobile First"],
      image: "/projet-resto.png",
      demo: "https://kmer-delice.vercel.app/",
      github: "https://github.com/7even5iv/kmer-delice"
    }
  ];

  const skills = [
    { name: "React.js", icon: <Code2 size={24} className="text-blue-400" /> },
    { name: "JavaScript", icon: <Terminal size={24} className="text-yellow-400" /> },
    { name: "Tailwind CSS", icon: <Code2 size={24} className="text-teal-400" /> },
    { name: "Git & GitHub", icon: <Database size={24} className="text-orange-400" /> },
    { name: "Mobile First", icon: <Smartphone size={24} className="text-purple-400" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-blue-500 selection:text-white font-sans">
      
      {/* --- NAV BAR --- */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO + NOM */}
          <div className="flex items-center gap-3">
            <img 
              src="/mon-logo.png" 
              alt="Logo" 
              className="h-10 w-10 object-contain bg-slate-800 rounded-lg p-1 border border-slate-700"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <span className="font-bold text-xl text-blue-500 hidden sm:block">
              {profile.nom.split(' ')[0]}<span className="text-white">.</span> 
            </span>
          </div>

          {/* ICÔNES */}
          <div className="flex gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition"><Github size={20} /></a>
            <a href={profile.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition"><Facebook size={20} /></a>
            <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition"><Mail size={20} /></a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* TEXTE */}
          <div className="flex-1 space-y-6 text-center md:text-left animate-in slide-in-from-left duration-700">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
              Disponible pour des projets
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Salut, je suis <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {profile.nom}
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto md:mx-0">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <a href="#projets" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition shadow-lg shadow-blue-900/20 text-center">
                Voir mes travaux
              </a>
              <a href={`mailto:${profile.email}`} className="px-8 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 rounded-lg font-medium transition text-center">
                Me contacter
              </a>
            </div>
          </div>

          {/* PHOTO (Visible sur mobile et PC maintenant !) */}
          <div className="flex-1 relative animate-in zoom-in duration-700 delay-200 flex justify-center">
            
            {/* Conteneur taille responsive : w-56 (mobile) -> md:w-80 (PC) */}
            <div className="w-56 h-56 md:w-80 md:h-80 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full p-1 relative shadow-2xl shadow-blue-900/20">
              <div className="w-full h-full bg-slate-800 rounded-full overflow-hidden">
                <img 
                  src="/7even5ive.png" 
                  alt="Loic Ngoumou" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-500 hover:scale-105" 
                />
              </div>
              {/* Icône flottante */}
              <div className="absolute -bottom-2 -right-2 md:bottom-4 md:right-4 bg-slate-900 p-3 md:p-4 rounded-xl border border-slate-700 shadow-xl">
                <Code2 className="text-blue-400 w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- COMPÉTENCES --- */}
      <section className="py-20 bg-slate-800/30 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center justify-center md:justify-start gap-2">
            <Terminal size={24} className="text-blue-500" /> Mes Compétences
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition hover:-translate-y-1 flex flex-col items-center gap-3 text-center">
                {skill.icon}
                <span className="font-medium text-slate-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJETS --- */}
      <section id="projets" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Projets Récents</h2>
            <p className="text-slate-400">Une sélection de mes réalisations techniques.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition duration-300 group flex flex-col h-full shadow-lg">
                
                {/* Image */}
                <div className="h-52 bg-slate-900 overflow-hidden relative border-b border-slate-700">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition z-10"></div>
                  <img 
                    src={proj.image} 
                    alt={proj.titre} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700"
                  />
                </div>
                
                {/* Contenu */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition mb-2">{proj.titre}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                    {proj.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-blue-200 text-xs rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-3 mt-auto">
                    <a href={proj.demo} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition shadow-md">
                      <ExternalLink size={16} /> Démo Live
                    </a>
                    <a href={proj.github} target="_blank" rel="noreferrer" className="px-3 py-2.5 border border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg text-slate-300 transition">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800 bg-slate-900/50">
        <p>© 2025 {profile.nom}. Conçu avec React & Tailwind CSS.</p>
      </footer>

    </div>
  );
}