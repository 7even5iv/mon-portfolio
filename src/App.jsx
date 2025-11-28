import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Database, Smartphone, Facebook } from 'lucide-react';

export default function App() {
  
  // --- TES DONNÉES (Change les infos ici) ---
  const profile = {
    nom: "Loic Ngoumou",
    titre: "Développeur Web & Mobile | React.js",
    bio: "Étudiant passionné par la création d'interfaces modernes et performantes. Je transforme des problèmes complexes en solutions digitales simples et élégantes.",
    email: "loicngoumou75@gmail.com",
    facebook: "https://facebook.com/profile.php?id=61582833287960",
    github: "https://github.com/7even5iv",
  };

  const projects = [
    {
      id: 1,
      titre: "Afrilane Student Portal",
      desc: "Application Intranet complète pour la gestion des étudiants et la génération de badges d'accès QR Code.",
      tech: ["React", "Tailwind", "Vercel", "API"],
      image: "/projet-afrilane.png", // Tu mettras ta capture d'écran ici
      demo: "https://afrilane-student-portal-3kdb.vercel.app", // Ton lien Vercel
      github: "https://github.com/7even5iv/afrilane-student-portal" // Ton lien GitHub
    },
    // Tu pourras ajouter d'autres projets ici plus tard
  ];

  const skills = [
    { name: "React.js", icon: <Code2 size={24} className="text-blue-400" /> },
    { name: "JavaScript", icon: <Terminal size={24} className="text-yellow-400" /> },
    { name: "Tailwind CSS", icon: <Code2 size={24} className="text-teal-400" /> },
    { name: "Git & GitHub", icon: <Database size={24} className="text-orange-400" /> },
    { name: "Mobile First", icon: <Smartphone size={24} className="text-purple-400" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-blue-500 selection:text-white">
      
      {/* --- NAV BAR --- */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO + NOM */}
          <div className="flex items-center gap-3">
            <img 
              src="/mon-logo.png" 
              alt="Logo" 
              className="h-10 w-10 object-contain bg-slate-800 rounded-lg p-1 border border-slate-700" 
            />
            <span className="font-bold text-xl text-blue-500 hidden sm:block">
              {profile.nom.split(' ')[0]}<span className="text-white">.</span> 
              {/* Affiche juste ton Prénom (plus court) */}
            </span>
          </div>
          <div className="flex gap-4">
            <a href={profile.github} target="_blank" className="hover:text-blue-400 transition"><Github size={20} /></a>
            <a href={profile.facebook} target="_blank" className="hover:text-blue-400 transition"><Facebook size={20} /></a>
            <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition"><Mail size={20} /></a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Introduction) --- */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center md:text-left md:flex items-center gap-12">
          
          {/* Texte */}
          <div className="flex-1 space-y-6 animate-in slide-in-from-left duration-700">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
              Disponible pour des projets
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Salut, je suis <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {profile.nom}
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#projets" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition shadow-lg shadow-blue-900/20 text-center">
                Voir mes travaux
              </a>
              <a href={`mailto:${profile.email}`} className="px-8 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 rounded-lg font-medium transition text-center">
                Me contacter
              </a>
            </div>
          </div>

          {/* Photo (Placeholder) */}
          <div className="hidden md:block flex-1 relative animate-in zoom-in duration-700 delay-200">
            <div className="w-72 h-72 mx-auto bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full p-1 relative">
              <div className="w-full h-full bg-slate-800 rounded-full overflow-hidden">
                {/* Remplace src par ta photo dans le dossier public */}
                <img 
                  src="/7even5ive.png" 
                  alt="Portrait" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-500" 
                />
              </div>
              {/* Cercle décoratif */}
              <div className="absolute -bottom-4 -right-4 bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl">
                <Code2 className="text-blue-400" size={32} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- COMPÉTENCES --- */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Terminal size={24} className="text-blue-500" /> Mes Compétences
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition hover:-translate-y-1 flex flex-col items-center gap-3 text-center">
                {skill.icon}
                <span className="font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJETS (La partie importante) --- */}
      <section id="projets" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Projets Récents</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition group">
                {/* Image du projet */}
                <div className="h-48 bg-slate-900 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition z-10"></div>
                  <img 
                    src={proj.image} 
                    alt={proj.titre} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                
                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{proj.titre}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {proj.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-3">
                    <a href={proj.demo} target="_blank" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition">
                      <ExternalLink size={16} /> Démo Live
                    </a>
                    {proj.github && (
                      <a href={proj.github} target="_blank" className="px-3 py-2 border border-slate-600 hover:bg-slate-700 rounded-lg text-slate-300 transition">
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>© 2025 {profile.nom}. Fait avec React & Tailwind.</p>
      </footer>

    </div>
  );
}