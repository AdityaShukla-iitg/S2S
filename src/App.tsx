import { motion, AnimatePresence } from 'motion/react';
import { Download, Play, Target, Music, Eye, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type ViewMode = 'intro' | 's2s' | 'mission' | 'proof';

function AnalysisCard({ title, why, insight }: { title: string; why: string; insight: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-lg group hover:border-zinc-700 transition-colors">
      <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Focus Frame</h4>
      <h3 className="text-sm font-bold text-zinc-100 mb-3 uppercase tracking-tighter">{title}</h3>
      <div className="space-y-4">
        <div>
          <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">Why:</span>
          <p className="text-[11px] text-zinc-400 leading-relaxed italic">{why}</p>
        </div>
        <div className="pt-4 border-t border-zinc-900 group-hover:border-zinc-800">
          <p className="text-[11px] text-zinc-200 font-medium leading-relaxed uppercase tracking-tight">{insight}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('intro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roadmap = [
    {
      days: "PHASE 01: DAYS 1 to 3",
      title: "Demystification",
      description: "Post the core video. Follow up with a highly minimalist carousel explaining exactly what S2S does (combining theory with infrastructure) to close the curiosity gap."
    },
    {
      days: "PHASE 02: DAYS 4 to 7",
      title: "Social Proof",
      description: "Post a fast-paced screen recording of the platform. Share a founder's note addressing student burnout. Highlight a mentor or early adopter who went from dorm room to deployment."
    },
    {
      days: "PHASE 03: DAYS 8 to 10",
      title: "Conversion",
      description: "Share short clips of student founders' pain points, post a limited cohort spots story to trigger FOMO, and end with a stark, bold link-in-bio push to capture sign-ups."
    }
  ];

  const projects = {
    s2s: {
      name: 'School to Startup',
      tagline: 'Practical Entrepreneurship Platform',
      description: 'School2Startup is a student entrepreneurship platform focused on practical learning. We conduct structured programs, challenges, and competitions where students build ideas, develop MVPs, and improve problem-solving and pitching skills. With 200+ active students, we aim to prepare them for real-world innovation.',
      about: 'A centralized hub designed to bridge the gap between academic theory and the marketplace. S2S provides students with the infrastructure, mentorship, and challenges needed to build functional businesses while still in school.',
      videoUrl: 'https://drive.google.com/uc?id=1yx7shs2LS8rSYDMT19-KwRNea4xALccb&export=download',
      driveUrl: 'https://drive.google.com/file/d/1yx7shs2LS8rSYDMT19-KwRNea4xALccb/view?usp=sharing',
      strategicIntent: (
        <div className="space-y-4">
          <p>
            Most students feel the pressure. The late nights, the "what am I even doing with my life" spiral, the fear of falling behind peers who seem to have it all figured out. That stress is real. But here's the thing - the problem isn't the stress. The problem is the blank page after it. They know something is wrong. They just don't know what to do next.
          </p>
          <p>
            This ad wasn't built to sell. It was built to be seen.
          </p>
          <p>
            The student watching this is at Stage 1 - they feel the pressure but haven't connected it to a solution yet. Pushing a CTA on them right now would kill trust before it starts. So instead, this ad does one thing: it holds up a mirror. It names the feeling. And then quietly introduces School2Startup as the place where that feeling gets direction.
          </p>
          <p>
            No hard pitch. No urgency tricks. Just recognition "someone gets what I'm going through."
          </p>
          <p className="text-zinc-200 font-bold not-italic">
            That's enough for Stage 1. The goal here is awareness and resonance, not conversion. Once they know S2S exists and feels right, the next ad does the heavier lifting.
          </p>
        </div>
      ),
      breakdown: [
        { title: "Biological Hook", why: "Social exclusion triggers primordial brain alerts.", insight: "Viewer thinks: I am being left behind. Scroll stop initiated." },
        { title: "Eye Contrast", why: "High contrast pupil dynamics signal technical precision.", insight: "Viewer thinks: This is sharp. Attention remains locked." },
        { title: "Mental Load", why: "Visual clutter represents the founder's internal struggle.", insight: "Viewer thinks: This is my desk. This is my mind. Connection felt." },
        { title: "Resolution Node", why: "High contrast logo flash provides the release valve.", insight: "Brand identified as the solution. Memory imprint achieved." }
      ],
      colorPsychology: [
        { hex: "#090909", label: "Shadow / Isolation" },
        { hex: "#18181B", label: "Neutral / Focus" },
        { hex: "#EAB308", label: "Beacon / Clarity" }
      ],
      aesthetic: "Industrial tech minimalism / High-contrast precision / Technical robustness.",
      productionMethodology: "Hybrid workflow utilizing parametric seed-generation for thematic plates combined with high-fidelity temporal consistency tools for pupil and particle dynamics."
    },
    mission: {
      name: 'Mission Samvedna',
      tagline: 'Social Impact Initiative',
      description: 'An impact-driven program focused on solving local community challenges through student-led innovation. Mission Samvedna connects technical skills with humanitarian needs to create sustainable social solutions.',
      about: 'Samvedna operates at the intersection of empathy and engineering. Students are tasked with identifying community pain points and developing tech-enabled solutions that can be deployed rapidly for social good.',
      videoUrl: 'https://drive.google.com/uc?id=1qBV8gKlTvmFHoS7oUSeLliy-kaBkAsm1&export=download',
      driveUrl: 'https://drive.google.com/file/d/1qBV8gKlTvmFHoS7oUSeLliy-kaBkAsm1/view?usp=sharing',
      strategicIntent: (
        <div className="space-y-4">
          <p>
            There's a shirt in your wardrobe you haven't worn in two years. You know the one. Tried it once, didn't feel right, pushed it to the back. It's not ruined. It's not old. It's just... forgotten.
          </p>
          <p>
            That's not a wardrobe problem. That's a guilt problem.
          </p>
          <p>
            Most people don't donate because they don't know how, or they don't trust where it goes. So the clothes just sit there. And every time they open the wardrobe, there's that small quiet feeling - "I should do something about this."
          </p>
          <p>
            This ad doesn't ask for a big act of charity. It just names that feeling. And then shows them the door.
          </p>
          <p>
            Mission Samvedna collects what you've already forgotten, checks that it's still good, and puts it in the hands of someone who needs it. No friction. No judgment. Just one small action that turns wardrobe guilt into something that actually meant something.
          </p>
          <p className="text-zinc-200 font-bold not-italic">
            The person watching this isn't a donor. They're just someone who has too many clothes and a conscience that quietly bothers them about it. This ad speaks to that person. The goal here isn't to convince. It's to make donating feel like the obvious, easy, human thing to do.
          </p>
        </div>
      ),
      breakdown: [
        { title: "The Purchase", why: "Establishing the lifestyle starting point mirror.", insight: "Viewer sees a relatable moment of buying something new that soon loses its spark." },
        { title: "The Wardrobe", why: "Visualizing the physical manifestation of guilt/stagnation.", insight: "The 'forgotten' shirt in the back of the closet creates instant emotional resonance." },
        { title: "Quality Check", why: "Establishing competence and process reliability.", insight: "Seeing the brand check quality converts a 'favor' into a professional donation pipeline." },
        { title: "NGO Impact", why: "The resolution node: turning guilt into direct utility.", insight: "Closing the loop by showing the garment reaching someone who actually needs it." }
      ],
      colorPsychology: [
        { hex: "#2F4A3A", label: "CARE / RENEWAL" },
        { hex: "#667A52", label: "EARTH / HUMANITY" },
        { hex: "#F3EBDD", label: "HOPE / DIGNITY" },
        { hex: "#B89C78", label: "NATURAL / AUTHENTIC" },
        { hex: "#181818", label: "CINEMATIC DEPTH" }
      ],
      aesthetic: "Patagonia campaigns / A24 emotional realism / Sustainable fashion editorials / Warm documentary cinema.",
      productionMethodology: "POETIC REALISM COMBINING NATURAL LIGHT, EARTH-TONED CINEMATOGRAPHY, AND HUMAN-CENTERED STORYTELLING TO VISUALLY EXPRESS CARE, PURPOSE, AND SECOND LIFE."
    },
    proof: {
      name: 'Proof Stack',
      tagline: 'MVP Validation Engine',
      description: 'A technical playground for developers and founders. Proof Stack provides a standardized framework for building, testing, and validating Minimum Viable Products in real-world environments.',
      about: 'Engineered for high-velocity iteration, Proof Stack gives students the tools to move from a "proof of concept" to a "proof of market" in days. It focuses on technical robustness and user feedback loops.',
      videoUrl: 'https://drive.google.com/uc?id=1yR3UAK8GJUXpds_0y6RndJawp1XpFUoG&export=download',
      driveUrl: 'https://drive.google.com/file/d/1yR3UAK8GJUXpds_0y6RndJawp1XpFUoG/view?usp=sharing',
      strategicIntent: (
        <div className="space-y-4">
          <p>
            Every founder knows that 2am feeling. Ads running, money burning, and the dashboard just staring back at you. Tried referrals. Tried cold DMs. Tried that one thing someone on Twitter swore by. Nothing sticking.
          </p>
          <p>
            It's not that they're bad at business. It's that they're searching in the dark.
          </p>
          <p>
            The stress here isn't just about customers. It's the specific panic of not knowing what's broken. Is the offer wrong? The targeting? The copy? When everything feels like the problem, nothing gets fixed.
          </p>
          <p>
            This ad meets founders right there - in that overwhelmed, second-guessing moment. Not with a list of features. Not with a pricing table. Just with a scene they've already lived.
          </p>
          <p>
            Proof Stack doesn't show up as a product. It shows up as relief.
          </p>
          <p className="text-zinc-200 font-bold not-italic">
            The founder watching this is Stage 1 to Stage 2 - they know growth is stuck, but they haven't found something that actually promises to diagnose it. The moment this ad names their exact feeling, they stop scrolling. That's the only job this ad has.
          </p>
        </div>
      ),
      breakdown: [
        { title: "The 2AM Panic", why: "Visceral representation of the founder's isolated struggle.", insight: "Viewer thinks: I am not the only one failing at 2am. Relatability locked." },
        { title: "Data Chaos", why: "Visualizing the overwhelming 'searches in the dark'.", insight: "Viewer recognizes the dashboard anxiety. Pain point emphasized." },
        { title: "System Relief", why: "Contrast shift from chaos to structured diagnostics.", insight: "Proof Stack introduced as the 'light' in the dark. Desire generated." },
        { title: "Market Proof", why: "Final validation node: from guessing to knowing.", insight: "Successful conversion of anxiety into functional business data." }
      ],
      colorPsychology: [
        { hex: "#0B0F14", label: "FOUNDER ISOLATION" },
        { hex: "#1A1D24", label: "STRATEGIC FOCUS" },
        { hex: "#FF6B00", label: "VALIDATION ORANGE" },
        { hex: "#F5E6D3", label: "WARM HUMANITY" },
        { hex: "#4C6B8A", label: "ANXIETY BLUE" }
      ],
      aesthetic: "The Social Network / Mr Robot / A24 cinematography / Linear.app branding / YC documentary aesthetic.",
      productionMethodology: "CINEMATIC STARTUP REALISM UTILIZING LOW-LIGHT PSYCHOLOGICAL COMPOSITION, MINIMAL MOTION DESIGN, AND HUMAN-CENTERED AI VISUAL LANGUAGE."
    }
  };

  const project = currentView !== 'intro' ? projects[currentView] : null;

  const NavLink = ({ mode, label }: { mode: ViewMode, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(mode);
        setIsMenuOpen(false);
      }}
      className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-white ${
        currentView === mode ? 'text-white' : 'text-zinc-500'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen font-sans bg-[#050505] text-zinc-300 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="w-full max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('intro')}
            className="text-lg font-bold tracking-tighter text-white"
          >
            FLUXIO<span className="text-zinc-500">LIVE</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10">
            <NavLink mode="intro" label="Home" />
            <NavLink mode="s2s" label="S2S" />
            <NavLink mode="mission" label="Mission Samvedna" />
            <NavLink mode="proof" label="Proof Stack" />
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-950 border-b border-zinc-900 overflow-hidden"
            >
              <div className="flex flex-col gap-6 p-8 items-center text-center">
                <NavLink mode="intro" label="Home" />
                <NavLink mode="s2s" label="S2S" />
                <NavLink mode="mission" label="Mission Samvedna" />
                <NavLink mode="proof" label="Proof Stack" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-1 mt-16 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'intro' ? (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-[1600px] mx-auto py-16 md:py-24 px-6 md:px-12"
            >
              <div className="space-y-16">
                <div>
                  <span className="label-mini mb-4 block">Creative Studio Hub</span>
                  <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9] uppercase">
                    Fluxio Live <br className="hidden md:block" /> Student Program
                  </h1>
                  <p className="mt-8 text-lg text-zinc-400 max-w-2xl leading-relaxed">
                    Supporting student-built businesses through professional creative engineering and strategic deployment.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pt-16 border-t border-zinc-900">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-100 mb-6">About School2Startup</h2>
                    <p className="text-zinc-500 leading-relaxed text-sm">
                      School2Startup is a student entrepreneurship platform focused on practical learning. We conduct structured programs, challenges, and competitions where students build ideas, develop MVPs, and improve problem-solving and pitching skills. With 200+ active students, we aim to prepare them for real-world innovation.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="bg-zinc-900/40 p-4 rounded border border-zinc-800">
                        <span className="text-[10px] text-zinc-500 block uppercase mb-1">Students</span>
                        <span className="text-xl font-bold text-white tracking-tighter">200+</span>
                      </div>
                      <div className="bg-zinc-900/40 p-4 rounded border border-zinc-800">
                        <span className="text-[10px] text-zinc-500 block uppercase mb-1">Programs</span>
                        <span className="text-xl font-bold text-white tracking-tighter">Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-100 mb-6 font-mono">[01] Active Projects</h2>
                    <div className="space-y-4">
                      {Object.keys(projects).map((key) => (
                        <button 
                          key={key} 
                          onClick={() => setCurrentView(key as ViewMode)}
                          className="w-full flex items-center justify-between group p-4 border border-zinc-900 hover:border-zinc-700 bg-zinc-950/50 rounded transition-all"
                        >
                          <div className="text-left">
                            <span className="text-white font-bold uppercase tracking-tight text-sm block">{(projects as any)[key].name}</span>
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{(projects as any)[key].tagline}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-yellow-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ) : project && (
            <motion.section
              key="project"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-[1600px] mx-auto py-12 md:py-24 px-6 md:px-12"
            >
              {/* PC Layout: LEFT Video, RIGHT Brand Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                
                {/* LEFT COLUMN: 9:16 Player */}
                <div className="lg:col-span-5 w-full md:sticky md:top-32 flex flex-col items-center">
                  <div className="video-container group bg-zinc-950 aspect-[9/16] relative w-full max-w-[340px] xl:max-w-[400px] mx-auto overflow-hidden rounded-sm ring-1 ring-zinc-800/50 shadow-2xl">
                    <iframe 
                      key={currentView}
                      src={project.videoUrl.replace('uc?id=', 'file/d/').replace('&export=download', '/preview')}
                      className="w-full h-full border-0 opacity-90 transition-opacity group-hover:opacity-100"
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">Project Handover [V1]</span>
                    </div>
                  </div>

                  {/* Downloads */}
                  <div className="mt-8 w-full max-w-[340px] xl:max-w-[400px] grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a 
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-zinc-100 hover:bg-white text-black py-4 px-4 rounded font-bold text-[9px] tracking-widest uppercase transition-all"
                    >
                      <Download className="h-4 w-4" />
                      Direct Download
                    </a>
                    <a 
                      href={project.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white py-4 px-4 rounded font-bold text-[9px] tracking-widest uppercase transition-all"
                    >
                      <Eye className="h-4 w-4" />
                      Watch on Drive
                    </a>
                  </div>
                </div>

                {/* RIGHT COLUMN: Brand Info & Analysis */}
                <div className="lg:col-span-7 space-y-16">
                  <div>
                    <span className="label-mini mb-3 block">Entity Background</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase italic font-serif leading-none">
                      {project.name}
                    </h2>
                    <div className="mt-8 space-y-6">
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] font-mono">[Short.Brand.Introduction]</h3>
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed uppercase tracking-tight">
                        {project.about}
                      </p>
                    </div>
                  </div>

                  {/* Empty Section */}
                  <div className="p-8 border border-zinc-900 bg-zinc-950/30 rounded-lg">
                    <span className="label-mini mb-4 block">Strategic Architecture</span>
                    <h3 className="text-lg font-bold text-zinc-100 uppercase tracking-tighter mb-4">What was thought while making these ads</h3>
                    <div className="space-y-4 text-xs md:text-sm text-zinc-400 leading-relaxed uppercase tracking-tight italic">
                       {project.strategicIntent}
                    </div>
                  </div>

                  {/* General Breakdown Sections */}
                  <div className="space-y-12">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Psychology Discussion</h3>
                           <p className="text-[11px] text-zinc-400 leading-relaxed uppercase tracking-tight italic">
                              Analyzing the emotional transition from absolute chaotic isolation towards clear technological empowerment.
                           </p>
                        </div>
                        <div className="space-y-4">
                           <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Sonic Profile</h3>
                           <p className="text-[11px] text-zinc-400 leading-relaxed uppercase tracking-tight italic">
                              Utilizing pattern interrupts and frequency shifts to associate the brand with professional relief.
                           </p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Extended Details Bottom */}
              <div className="mt-32 space-y-32">
                {/* Frame by Frame */}
                <section>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-[1px] flex-1 bg-zinc-900"></div>
                    <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-[0.4em]">Frame by Frame</h3>
                    <div className="h-[1px] flex-1 bg-zinc-900"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {project.breakdown.map((item, index) => (
                      <AnalysisCard 
                        key={index}
                        title={item.title} 
                        why={item.why} 
                        insight={item.insight}
                      />
                    ))}
                  </div>
                </section>

                {/* Technical Palette */}
                <section className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-800 uppercase tracking-widest">Visual.Engineering.Specs</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6">Color Psychology</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {project.colorPsychology.map((color, idx) => (
                          <div key={idx} className="space-y-2">
                            <div 
                              className="h-16 border border-zinc-800 flex items-end p-2" 
                              style={{ backgroundColor: color.hex }}
                            >
                              <span className={`text-[8px] uppercase tracking-widest font-mono ${['#F3EBDD', '#F5E6D3', '#B89C78'].includes(color.hex) ? 'text-black font-bold' : 'text-zinc-400'}`}>
                                {color.hex}
                              </span>
                            </div>
                            <span className="text-[9px] text-zinc-500 uppercase block leading-tight">{color.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 font-mono mb-4">Brand Visual Language</h3>
                        <p className="text-[11px] text-zinc-400 leading-relaxed italic uppercase tracking-tighter">
                          {project.aesthetic}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 font-mono mb-4">Production Methodology</h3>
                        <p className="text-[11px] text-zinc-200 leading-relaxed italic uppercase tracking-tighter font-semibold">
                          {project.productionMethodology}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Roadmap & Roadmap */}
                <section>
                  <h2 className="label-mini mb-12">10 Day Post-Launch Strategy</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {roadmap.map((step, idx) => (
                      <div key={idx} className="bg-zinc-950/40 border border-zinc-900 p-8 rounded border-b-2 border-b-zinc-800 hover:border-b-yellow-500 transition-all">
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-4 italic">{step.days}</span>
                        <h4 className="text-sm font-bold text-white uppercase mb-2">{step.title}</h4>
                        <p className="text-[11px] text-zinc-500 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Legal Handover */}
                <section className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 rounded-lg">
                  <div className="max-w-5xl">
                    <h2 className="label-mini mb-8 border-b border-zinc-900 pb-4">Legal Protocols</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest italic">Asset Distribution</h4>
                        <p className="text-[10px] leading-relaxed text-zinc-600 uppercase tracking-tight font-mono">
                          School to Startup is granted unrestricted rights to distribute delivered assets across all digital and social platforms globally.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest italic">Global Release</h4>
                        <p className="text-[10px] leading-relaxed text-zinc-600 uppercase tracking-tight font-mono">
                          Fluxio Live relinquishes all ownership claims over the final advertisement delivered herein effective immediately.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest italic">Archival Rights</h4>
                        <p className="text-[10px] leading-relaxed text-zinc-600 uppercase tracking-tight font-mono">
                          Fluxio Live retains perpetual rights to feature this work in case studies for technical demonstration goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="mt-24 py-12 px-6 border-t border-zinc-900 bg-black/40">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-xl font-bold tracking-tighter text-white">FLUXIO<span className="text-zinc-500 uppercase">Live</span></h2>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Built for the School to Startup Student Program</p>
          </div>
          <div className="flex gap-10 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <a href="mailto:adityashukla@fluxio.live" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <div className="text-[10px] font-mono text-zinc-800">
            FLX-S2S-2026-V1
          </div>
        </div>
      </footer>
    </div>
  );
}
