import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Play, 
  Target, 
  Music, 
  Eye, 
  Menu, 
  X, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Users,
  Check,
  ChevronRight,
  Volume2,
  Pause,
  Command
} from 'lucide-react';

// Form data is sent directly to Gmail via mailto: links as requested.
type ViewMode = 'portal' | 's2s' | 'mission' | 'proof' | 'proposal';

function AnalysisCard({ title, why, insight }: { title: string; why: string; insight: string; key?: React.Key }) {
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
  const [currentView, setCurrentView] = useState<ViewMode>('portal');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const renderValue = (val: any, type?: string, color?: string) => {
    if (val === true) return <span className="text-[#006241] font-bold text-xl">✦</span>;
    if (val === "") return null;
    if (type === 'price') return <span className="font-['Bebas_Neue'] text-3xl" style={{ color }}>{val}</span>;
    return val;
  };

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

  const project = !['portal', 'proposal'].includes(currentView) ? projects[currentView as keyof typeof projects] : null;

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      goal: formData.get('goal')?.toString() || '',
      audience: formData.get('audience')?.toString() || '',
      platforms: formData.get('platforms')?.toString() || '',
      existingContent: formData.get('existingContent')?.toString() || '',
      tone: formData.get('tone')?.toString() || '',
      promotion: formData.get('promotion')?.toString() || '',
      brandKit: formData.get('brandKit')?.toString() || '',
      deadline: formData.get('deadline')?.toString() || '',
      approval: formData.get('approval')?.toString() || '',
      notes: formData.get('notes')?.toString() || '',
      selectedPlan: selectedPlan || 'Not Selected',
    };

    const recipient = "adityashukla.available@gmail.com";
    const subject = `[FLUXIO LIVE] New Partnership Proposal: ${data.selectedPlan}`;
    const body = `
PARTNERSHIP PROPOSAL REQUEST
-----------------------------------------
Selected Plan: ${data.selectedPlan}

Q1. Main Goal: 
${data.goal}

Q2. Primary Audience: 
${data.audience}

Q3. Platforms: 
${data.platforms}

Q4. Existing Content: 
${data.existingContent}

Q5. Brand Tone: 
${data.tone}

Q6. Specific Program/Offer: 
${data.promotion}

Q7. Brand Kit Available: 
${data.brandKit}

Q8. Deadline Requirement: 
${data.deadline}

Q9. Approval Structure: 
${data.approval}

Q10. Additional Notes:
${data.notes || 'None'}

-----------------------------------------
Submitted via Fluxio Live Portal
    `.trim();

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    setTimeout(() => {
      setFormSubmitted(true);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen font-sans bg-[#050505] text-zinc-300 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="w-full max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('portal')}
            className="text-lg font-bold tracking-tighter text-white"
          >
            FLUXIO<span className="text-zinc-500">LIVE</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 items-center">
            <NavLink mode="portal" label="Home" />
            <NavLink mode="proposal" label="Proposal" />
            
            <div className="h-4 w-[1px] bg-zinc-800 mx-2"></div>
            
            <NavLink mode="s2s" label="S2S" />
            <NavLink mode="mission" label="Mission Samvedna" />
            <NavLink mode="proof" label="Proof Stack" />

            <a 
              href="https://fluxio.live" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-zinc-100 hover:bg-white text-black text-[9px] font-bold uppercase tracking-widest rounded transition-all"
            >
              Main Site
            </a>
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
                <NavLink mode="portal" label="Home" />
                <NavLink mode="proposal" label="Partnership Proposal" />
                <NavLink mode="s2s" label="S2S" />
                <NavLink mode="mission" label="Mission Samvedna" />
                <NavLink mode="proof" label="Proof Stack" />
                <a 
                  href="https://fluxio.live" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 px-6 py-3 bg-zinc-100 text-black text-[10px] font-bold uppercase tracking-widest rounded w-full"
                >
                  Visit fluxio.live
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-1 mt-16 overflow-x-hidden snap-y snap-mandatory scroll-smooth overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentView === 'portal' ? (
            <motion.div
              key="portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              {/* Portal Landing */}
              <section className="w-full max-w-[1600px] mx-auto py-16 md:py-24 px-6 md:px-12 min-h-screen flex flex-col justify-center snap-start">
                <div className="mb-20">
                  <span className="label-mini mb-4 block">Ecosystem Hub</span>
                  <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] uppercase">
                    One Core <br className="hidden md:block" /> Two Dimensions.
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Student Program Card */}
                  <button 
                    onClick={() => setCurrentView('s2s')}
                    className="group relative bg-zinc-950 border border-zinc-900 p-10 rounded-lg text-left hover:border-zinc-700 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Target className="w-32 h-32" />
                    </div>
                    <span className="text-[10px] font-bold text-[#FF3E3E] uppercase tracking-widest mb-6 block">Dimension 01</span>
                    <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-4 group-hover:text-[#FF3E3E] transition-colors">Student <br /> Program</h2>
                    <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-10">
                      Supporting student-built businesses through professional creative engineering and strategic deployment.
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                      Enter Hub <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>

                  {/* Partnership Proposal Card */}
                  <button 
                    onClick={() => setCurrentView('proposal')}
                    className="group relative bg-zinc-950 border border-zinc-900 p-10 rounded-lg text-left hover:border-zinc-700 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Music className="w-32 h-32" />
                    </div>
                    <span className="text-[10px] font-bold text-[#006241] uppercase tracking-widest mb-6 block">Dimension 02</span>
                    <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-4 group-hover:text-[#006241] transition-colors">Partnership <br /> Proposal</h2>
                    <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-10">
                      A focused advertising partnership proposal built specifically for the School2Startup ecosystem.
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                      View Proposal <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>
                </div>

                {/* About Section (Original content preserved) */}
                <div className="mt-32 pt-20 border-t border-zinc-900 snap-start py-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-100 mb-6 font-mono">Mission Statement</h2>
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        School2Startup is a student entrepreneurship platform focused on practical learning. We conduct structured programs, challenges, and competitions where students build ideas, develop MVPs, and improve problem-solving and pitching skills. With 200+ active students, we aim to prepare them for real-world innovation.
                      </p>
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900/40 p-4 rounded border border-zinc-800">
                          <span className="text-[10px] text-zinc-500 block uppercase mb-1">Students</span>
                          <span className="text-xl font-bold text-white tracking-tighter">200+</span>
                        </div>
                        <div className="bg-zinc-900/40 p-4 rounded border border-zinc-800">
                          <span className="text-[10px] text-zinc-500 block uppercase mb-1">Impact</span>
                          <span className="text-xl font-bold text-white tracking-tighter">Growth</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-100 mb-6 font-mono">Fluxio Live Official</h2>
                      <p className="text-zinc-500 leading-relaxed text-sm mb-8">
                        The creative engine behind the next generation of student-led brands. We engineer visibility for those building the future.
                      </p>
                      <a 
                        href="https://fluxio.live" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 group"
                      >
                        <span className="text-3xl font-bold tracking-tighter uppercase italic text-zinc-600 group-hover:text-white transition-colors">fluxio.live</span>
                        <ArrowRight className="h-6 w-6 text-zinc-800 group-hover:text-yellow-500 transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : currentView === 'proposal' ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full bg-white text-black min-h-screen"
            >
              {/* Hero Section */}
              <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 relative overflow-hidden snap-start">
                <div className="absolute top-10 left-6 right-6 flex justify-between z-10 w-full max-w-7xl mx-auto px-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF3E3E] uppercase">Fluxio Live</span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF3E3E] uppercase">× School2Startup</span>
                </div>
                <div className="relative z-10">
                  <h1 className="font-['Bebas_Neue'] text-7xl md:text-[10rem] leading-[0.85] mb-6 tracking-normal transition-transform duration-700 hover:scale-[1.01]">LET'S BUILD <br /> SOMETHING REAL</h1>
                  <p className="font-['DM_Sans'] text-zinc-500 max-w-xl mx-auto italic text-sm md:text-base">A focused advertising partnership built for student entrepreneurs.</p>
                </div>
                <div className="absolute bottom-10 animate-bounce">
                  <ArrowRight className="rotate-90 w-6 h-6 text-[#006241]" />
                </div>
              </section>

              {/* About Partnership */}
              <section className="py-20 md:py-24 px-4 md:px-6 bg-white text-black overflow-hidden min-h-screen flex items-center snap-start">
                <div className="max-w-7xl mx-auto border-y border-[#006241]/10 py-16 flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight uppercase font-['Bebas_Neue'] tracking-tight">School2Startup is a student entrepreneurship platform focused on practical learning.</h2>
                  </div>
                  <div className="flex-1">
                    <p className="text-base md:text-lg text-zinc-600 leading-relaxed border-l-4 border-[#FF3E3E] pl-8 tracking-widest">Fluxio Live brings professional creative engineering and strategic deployment to scale student-built businesses into recognized brands.</p>
                  </div>
                </div>
              </section>

              {/* The Campaign */}
              <section className="bg-black text-white py-24 px-4 md:px-6 min-h-screen flex items-center snap-start">
                <div className="max-w-7xl mx-auto">
                  <span className="text-[#006241] font-bold tracking-widest text-[10px] uppercase mb-12 block font-mono">The Campaign Architecture</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-[1px] bg-zinc-900 border border-zinc-900">
                    <div className="bg-black p-10 md:p-14 hover:bg-zinc-950 transition-colors group flex flex-col h-full">
                      <h3 className="font-['Bebas_Neue'] text-white text-4xl mb-6 uppercase tracking-wider group-hover:text-[#FF3E3E] transition-colors">The Stranger</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mt-auto">Cold audience ad. First impression, zero context. Designed to stop the scroll through visceral visual hooks.</p>
                    </div>
                    <div className="bg-black p-10 md:p-14 hover:bg-zinc-950 transition-colors group flex flex-col h-full border-y md:border-y-0 md:border-x border-zinc-900">
                      <h3 className="font-['Bebas_Neue'] text-white text-4xl mb-6 uppercase tracking-wider group-hover:text-[#006241] transition-colors">The Curious One</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mt-auto">Warm audience. They've seen you, but aren't convinced yet. Building trust through logical value propositions.</p>
                    </div>
                    <div className="bg-black p-10 md:p-14 hover:bg-zinc-950 transition-colors group flex flex-col h-full">
                      <h3 className="font-['Bebas_Neue'] text-white text-4xl mb-6 uppercase tracking-wider group-hover:text-zinc-300 transition-colors">The Loyal Student</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mt-auto">Existing students. Driving retention through community-focused storytelling and emotional referrals.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Form Section */}
              <section className="bg-black text-white py-32 px-4 md:px-6">
                <div className="max-w-2xl mx-auto">
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-[#FF3E3E] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,62,62,0.3)]">
                        <ArrowRight className="w-8 h-8 text-white -rotate-45" />
                      </div>
                      <h2 className="font-['Bebas_Neue'] text-7xl mb-4 text-[#FF3E3E]">SUBMITTED.</h2>
                      <p className="text-zinc-500 font-medium">Aditya will review your request and get in touch within 24 hours.</p>
                      <button 
                        onClick={() => setCurrentView('portal')}
                        className="mt-12 text-xs uppercase tracking-[0.3em] font-bold text-zinc-600 hover:text-[#FF3E3E] transition-colors"
                      >
                        Return to Portal
                      </button>
                    </motion.div>
                  ) : (
                    <div id="discovery-form" className="scroll-mt-20">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                          <span className="text-[#006241] font-bold tracking-widest text-xs uppercase mb-4 block font-mono tracking-[0.3em]">Discovery Phase</span>
                          <p className="text-zinc-300 text-3xl font-bold font-['Bebas_Neue'] tracking-tight">Initiate the Strategic Plan</p>
                        </div>
                        {selectedPlan && (
                          <div className="bg-zinc-900/50 px-4 py-2 border border-zinc-800 rounded-sm flex items-center gap-3">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Tier:</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedPlan === 'Starter' ? 'text-white' : selectedPlan === 'Growth' ? 'text-[#006241]' : 'text-[#C0272D]'}`}>
                              {selectedPlan}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <form onSubmit={handleFormSubmit} className="space-y-16">
                        <div className="grid grid-cols-1 gap-12">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q1. What is the main goal of this ad campaign? <span className="text-[#FF3E3E]">*</span></label>
                              <select name="goal" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Get more students to enroll</option>
                                <option>Build awareness about School2Startup</option>
                                <option>Promote a specific event or competition</option>
                                <option>All of the above</option>
                              </select>
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q2. Who is the primary audience you want to reach? <span className="text-[#FF3E3E]">*</span></label>
                              <select name="audience" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Students (Grades 8–12)</option>
                                <option>Parents of school students</option>
                                <option>Schools and institutions</option>
                                <option>All three</option>
                              </select>
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q3. Which platforms should the ads run on? <span className="text-[#FF3E3E]">*</span></label>
                              <select name="platforms" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Instagram</option>
                                <option>LinkedIn</option>
                                <option>YouTube</option>
                                <option>All platforms</option>
                              </select>
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q4. Do you have any existing content or ads we can reference? <span className="text-[#FF3E3E]">*</span></label>
                              <select name="existingContent" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Yes (share link or file)</option>
                                <option>No start fresh</option>
                              </select>
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q5. What tone should the ads feel like? <span className="text-[#FF3E3E]">*</span></label>
                              <select name="tone" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Energetic and hype (FOMO-driven)</option>
                                <option>Inspirational and emotional</option>
                                <option>Professional and credibility-focused</option>
                                <option>Fun and student-friendly</option>
                              </select>
                            </div>

                            <div className="space-y-4 group text-left">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q6. Specific Program/Offer? <span className="text-[#FF3E3E]">*</span></label>
                              <select name="promotion" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Yes (describe in 1–2 lines below)</option>
                                <option>No general brand awareness</option>
                              </select>
                              <input name="promotionDetails" type="text" className="w-full bg-transparent border-b border-zinc-900 py-2 focus:outline-none focus:border-zinc-700 text-sm mt-2" placeholder="Brief description if yes..." />
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q7. Brand Kit <span className="text-[#FF3E3E]">*</span></label>
                              <select name="brandKit" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Yes (share file or link)</option>
                                <option>No Fluxio will use creative direction</option>
                              </select>
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q8. Deadline <span className="text-[#FF3E3E]">*</span></label>
                              <select name="deadline" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>Within 48 hours</option>
                                <option>This week</option>
                                <option>Next week</option>
                                <option>No fixed deadline</option>
                              </select>
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q9. Approval <span className="text-[#FF3E3E]">*</span></label>
                              <select name="approval" required className="w-full bg-black border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-xl appearance-none cursor-pointer">
                                <option value="">Select...</option>
                                <option>I will approve personally</option>
                                <option>My team will review</option>
                                <option>No approval needed trust Fluxio</option>
                              </select>
                            </div>

                            <div className="space-y-4 group">
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest group-focus-within:text-[#006241] transition-colors">Q10. Specific Notes</label>
                              <textarea name="notes" rows={1} className="w-full bg-transparent border-b border-zinc-800 py-4 focus:outline-none focus:border-[#006241] transition-all text-lg resize-none" placeholder="Constraints or must-haves..."></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full bg-white hover:bg-[#FF3E3E] text-black hover:text-white py-8 font-['Bebas_Neue'] text-4xl transition-all uppercase tracking-widest disabled:opacity-50 shadow-2xl hover:translate-y-[-2px] active:translate-y-[1px]"
                          >
                            {submitting ? 'Deploying...' : 'Deploy Proposal Request →'}
                          </button>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest text-center leading-relaxed font-mono">
                            Submissions are securely logged to the ecosystem database. <br />
                            Aditya will receive an automated alert for review.
                          </p>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </section>

              {/* Pricing Table Section */}
              <section className="bg-black py-24 px-4 md:px-6 min-h-screen flex flex-col justify-center snap-start">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-20 px-6">
                    <span className="text-[#C0272D] text-[10px] font-bold tracking-[4px] uppercase mb-4 block">Partnership Plans</span>
                    <h2 className="font-['Bebas_Neue'] text-5xl md:text-8xl text-white mb-6 tracking-tighter">Pick Your Pace</h2>
                    <p className="font-['DM_Sans'] text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed italic">
                      "Every plan includes original ad creative made specifically for School2Startup. No templates. No recycled content."
                    </p>
                  </div>

                  <div className="md:hidden space-y-6 px-2">
                    {[
                      { name: "Starter", price: "₹999/week", color: "white", highlights: ["1 Video Ad", "1 Audience", "48hr Delivery"] },
                      { name: "Growth", price: "₹2,199/week", color: "#006241", highlights: ["2 Video Ads", "3 Carousels", "2 Audiences", "48hr Delivery"] },
                      { name: "Partner", price: "₹2,999/week", color: "#C0272D", highlights: ["4 Video Ads", "5 Carousels", "All Audiences", "24hr Delivery"] }
                    ].map((plan) => (
                      <div key={plan.name} className="bg-zinc-950 border border-zinc-900 p-6 rounded-lg relative overflow-hidden group shadow-xl">
                        <div className="absolute top-0 right-0 p-4">
                          <span className="text-[8px] font-mono text-zinc-700 tracking-tighter uppercase whitespace-nowrap">Tier::{plan.name}</span>
                        </div>
                        <h3 className="font-['Bebas_Neue'] text-3xl mb-1" style={{ color: plan.color }}>{plan.name}</h3>
                        <div className="font-['Bebas_Neue'] text-xl mb-4 text-white opacity-80">{plan.price}</div>
                        <ul className="space-y-2 mb-8">
                          {plan.highlights.map((h, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                              <Check className="w-3 h-3 flex-shrink-0" style={{ color: plan.color }} /> 
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        <button 
                          onClick={() => { setSelectedPlan(plan.name); document.querySelector('#discovery-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                          className={`w-full py-4 text-[9px] font-black uppercase tracking-[0.4em] transition-all rounded-sm ${selectedPlan === plan.name ? 'bg-white text-black' : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-white hover:text-black'}`}
                        >
                          {selectedPlan === plan.name ? 'ACTIVE' : `SELECT ${plan.name} →`}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="hidden md:block w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="border-b border-zinc-900 font-['Bebas_Neue']">
                          <th className="py-8 px-6 text-white text-xl uppercase tracking-wider">Feature</th>
                          <th className="py-8 px-6 text-center text-white text-xl uppercase tracking-wider">Starter</th>
                          <th className="py-8 px-6 text-center text-white text-xl uppercase tracking-wider">Growth</th>
                          <th className="py-8 px-6 text-center text-white text-xl uppercase tracking-wider">Partner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { label: "Price", starter: "₹999/week", growth: "₹2,199/week", partner: "₹2,999/week", type: 'price' },
                          { label: "Video Ads", starter: "1", growth: "2", partner: "4" },
                          { label: "Carousel Posts", starter: "", growth: "3", partner: "5" },
                          { label: "Audiences Covered", starter: "1", growth: "2", partner: "All 3" },
                          { label: "Delivery", starter: "48hr", growth: "48hr", partner: "24hr" },
                          { label: "Revisions", starter: "", growth: "1 round", partner: "2 rounds" },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-zinc-900 hover:bg-zinc-950 transition-colors">
                            <td className="py-6 px-6 text-zinc-400 font-medium text-xs md:text-sm uppercase tracking-tight">{row.label}</td>
                            <td className="py-6 px-6 text-center text-white font-['DM_Sans'] font-medium">
                              {renderValue(row.starter, row.type, 'white')}
                            </td>
                            <td className="py-6 px-6 text-center text-white font-['DM_Sans'] font-medium">
                              {renderValue(row.growth, row.type, '#006241')}
                            </td>
                            <td className="py-6 px-6 text-center text-white font-['DM_Sans'] font-medium">
                              {renderValue(row.partner, row.type, '#C0272D')}
                            </td>
                          </tr>
                        ))}
                        {/* Action Row */}
                        <tr>
                          <td className="py-12 px-6"></td>
                          <td className="py-12 px-6 text-center">
                            <button 
                              onClick={() => { setSelectedPlan('Starter'); document.querySelector('#discovery-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                              className={`px-8 py-3 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all ${selectedPlan === 'Starter' ? 'bg-white text-black' : ''}`}
                            >
                              {selectedPlan === 'Starter' ? 'Selected' : 'Start Here →'}
                            </button>
                          </td>
                          <td className="py-12 px-6 text-center">
                            <button 
                              onClick={() => { setSelectedPlan('Growth'); document.querySelector('#discovery-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                              className={`px-8 py-3 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all ${selectedPlan === 'Growth' ? 'bg-white text-black' : 'bg-[#006241]'}`}
                            >
                              {selectedPlan === 'Growth' ? 'Selected' : 'Get Started →'}
                            </button>
                          </td>
                          <td className="py-12 px-6 text-center">
                            <button 
                              onClick={() => { setSelectedPlan('Partner'); document.querySelector('#discovery-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                              className={`px-8 py-3 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all ${selectedPlan === 'Partner' ? 'bg-white text-black' : 'bg-[#C0272D]'}`}
                            >
                              {selectedPlan === 'Partner' ? 'Selected' : 'Go All In →'}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-16 text-center px-4">
                    <p className="font-['DM_Sans'] text-xs md:text-sm text-zinc-600 tracking-wider">
                      All plans are weekly. Cancel or upgrade anytime. First delivery within 48 hours of confirmation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Proposal Footer */}
              <section className="bg-black py-32 text-center px-6 border-t-2 border-[#FF3E3E] snap-start min-h-screen flex flex-col justify-center">
                <h2 className="font-['Bebas_Neue'] text-8xl md:text-[10rem] leading-none mb-4 text-white hover:text-[#FF3E3E] transition-colors cursor-default">MAY 2026</h2>
                <p className="font-bold text-xs mb-16 uppercase tracking-[0.4em] text-zinc-500">Fluxio Live x School2Startup Partnership Window</p>
                <div className="flex justify-center">
                  <button onClick={() => setCurrentView('portal')} className="px-16 py-6 border border-zinc-800 text-zinc-400 font-['Bebas_Neue'] text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all">Portal Home</button>
                </div>
              </section>
            </motion.div>
          ) : project && (
            <motion.section
              key="project"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-[1600px] mx-auto py-12 md:py-24 px-6 md:px-12 min-h-[calc(100vh-64px)] flex flex-col justify-center"
            >
              {/* PC Layout: LEFT Video, RIGHT Brand Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                
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
            <button onClick={() => setCurrentView('portal')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => setCurrentView('proposal')} className="hover:text-white transition-colors">Proposal</button>
            <a href="https://fluxio.live" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Main Site</a>
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
