import { motion } from 'motion/react';
import { Download, Play, Shield, Target, Music, Zap, Calendar, ArrowRight, Eye } from 'lucide-react';

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
  const roadmap = [
    {
      days: "PHASE 01: DAYS 1-3",
      title: "Demystification",
      description: "Post the core video. Follow up with a highly minimalist carousel explaining exactly what S2S does (combining theory with infrastructure) to close the curiosity gap."
    },
    {
      days: "PHASE 02: DAYS 4-7",
      title: "Social Proof",
      description: "Post a fast-paced screen recording of the platform. Share a \"founder's note\" addressing student burnout. Highlight a mentor or early adopter who went from dorm room to deployment."
    },
    {
      days: "PHASE 03: DAYS 8-10",
      title: "Conversion",
      description: "Share short clips of student founders' pain points, post a \"limited cohort spots\" story to trigger FOMO, and end with a stark, bold link-in-bio push to capture sign-ups."
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#050505] p-6 sm:p-8 md:p-20 flex flex-col max-w-7xl mx-auto">
      {/* Header Navigation */}
      <header className="divider-heavy flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <span className="label-mini">Agency Deliverable</span>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tighter">
            FLUXIO<span className="text-zinc-500 uppercase">Live</span> 
            <span className="mx-2 sm:mx-3 text-zinc-800">/</span> 
            S2S
          </h1>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 block">Ref: 2026-S2S-AD01</span>
          <span className="text-xs sm:text-sm text-zinc-400 font-medium tracking-tight">Final Delivery Landing</span>
        </div>
      </header>

      <main className="flex flex-col gap-24 mt-16 lg:mt-24">
        {/* 1. Hero Section (The Deliverable) */}
        <section className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="video-container group bg-zinc-950 aspect-[9/16] relative max-w-[400px] w-full"
          >
            <video 
              className="w-full h-full object-cover opacity-90 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="https://drive.google.com/uc?id=1yx7shs2LS8rSYDMT19-KwRNea4xALccb&export=download" type="video/mp4" />
              <div className="flex items-center justify-center h-full absolute inset-0">
                <div className="w-16 h-16 rounded-full border border-zinc-100/20 flex items-center justify-center">
                  <Play className="h-6 w-6 text-zinc-100 fill-zinc-100" />
                </div>
              </div>
            </video>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">S2S-FINAL-916.mp4</span>
              <div className="flex gap-2">
                <div className="w-6 h-[1px] bg-zinc-400"></div>
                <div className="w-2 h-[1px] bg-zinc-600"></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-[400px] w-full px-4 sm:px-0"
          >
            <a 
              href="https://drive.google.com/uc?id=1yx7shs2LS8rSYDMT19-KwRNea4xALccb&export=download"
              download
              className="w-full flex items-center justify-center gap-3 bg-zinc-100 hover:bg-white text-black py-4 px-8 rounded font-bold text-sm tracking-widest uppercase transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Deliverable
            </a>
          </motion.div>
        </section>

          {/* 2. Strategic Breakdown (The "How & Why") */}
        <section className="bg-zinc-950/50 border-y border-zinc-900 py-24 px-6 md:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8 border-b border-zinc-800 pb-8">
              <div className="max-w-2xl">
                <span className="label-mini">Engineered Perspective</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight italic font-serif mt-2">The Psychology of the S2S Hero Ad</h2>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block">
                Final Assessment • Technical Report
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
              <div className="lg:col-span-12">
                <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-10 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-white animate-pulse"></span>
                  01. Psychological Architecture
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="strategy-card">
                    <p className="text-xl font-bold tracking-tighter mb-4">“Everyone is moving forward… except you.”</p>
                    <p className="text-[11px] text-zinc-500 leading-relaxed uppercase tracking-tight">
                      We leverage external pressure (the world moving) against internal conflict (the isolated founder) to position S2S as the only logical path forward.
                    </p>
                  </div>
                  <div className="strategy-card md:col-span-2">
                    <div className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-7 gap-px bg-zinc-800 rounded overflow-hidden mb-4 border border-zinc-800">
                      {["Hook", "Iso", "Pres", "Break", "Real", "Act", "Brand"].map((step, i) => (
                        <div key={i} className="bg-zinc-950 p-2 sm:p-3 text-center">
                          <span className="text-[7px] sm:text-[8px] font-mono text-zinc-600 uppercase">{step}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      This emotional engine (FOMO Anxiety Clarity Action) is why the ad converts. We don't just show a product; we create a visceral need first.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-24">
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-10 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white animate-pulse"></span>
                02. Frame-by-Frame Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalysisCard 
                  title="FOMO Silhouettes" 
                  why="Seeing others succeed triggers biological exclusion/insecurity." 
                  insight="Viewer thinks: 'What are they doing?' Critical scroll stopper."
                />
                <AnalysisCard 
                  title="Interrupt Trigger" 
                  why="Sudden eye-open + pupil contraction = biological alert reset." 
                  insight="Brain reads: 'Something just clicked.' A neuroscience level trigger."
                />
                <AnalysisCard 
                  title="Identification Zone" 
                  why="The crumpled paper is the physical manifestation of failure." 
                  insight="Viewer thinks: 'I've been here.' Tension builds without dialogue."
                />
                <AnalysisCard 
                  title="The POV Immersion" 
                  why="Shift from watching him to BECOMING him when the notification hits." 
                  insight="Maximum engagement. User feels like they are opening the app."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-zinc-900/20 border border-zinc-800/20 p-8 rounded-lg">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">Auditory Architecture</h3>
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest">Phase 1: Chaotic Voices</span>
                    <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">Simulates mental overload. Frantic breathing and paper flipping build editorial tension.</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest">Phase 2: The Pattern Interrupt</span>
                    <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">Chaos is abruptly sliced by the dry "ding" of S2S. An auditory release valve training the brain to associate S2S with relief.</p>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-900/20 border border-zinc-800/20 p-8 rounded-lg">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">Color Psychology</h3>
                <div className="space-y-8">
                  <p className="text-[11px] text-zinc-500 leading-relaxed italic pr-4">
                    Setup: Chiaroscuro & Shadows create claustrophobia. Deep shadows = the murky nature of technical isolation. 
                    Resolution: High-contrast yellow acts as a visual beacon of clarity breaking through the darkness.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center"><span className="text-[8px] uppercase tracking-widest text-zinc-600">MURKY</span></div>
                    <div className="h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center"><span className="text-[8px] uppercase tracking-widest text-zinc-600">ISOLATION</span></div>
                    <div className="h-10 bg-yellow-500 flex items-center justify-center"><span className="text-[8px] uppercase tracking-widest text-black font-bold">CLARITY</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 10-Day Post-Launch Roadmap */}
        <section className="py-24 px-6 md:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="label-mini mb-12">10-Day Execution Roadmap</h2>
            <div className="space-y-4">
              {roadmap.map((step, idx) => (
                <div key={idx} className="roadmap-step">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{step.days}</span>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      <span className="text-zinc-100 font-semibold tracking-tight">{step.title}: </span>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Legal & Usage Terms */}
        <section className="py-24 px-6 border-t border-zinc-900 bg-black">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg">
                <h2 className="label-mini mb-6 border-b border-zinc-800 pb-4">Legal Provisions</h2>
                <ul className="space-y-6">
                  <li>
                    <h4 className="text-[11px] font-bold text-zinc-100 uppercase tracking-widest mb-1 italic">Full Distribution Rights</h4>
                    <p className="text-[10px] leading-relaxed text-zinc-500 uppercase tracking-tight">
                      S2S is granted unrestricted rights to distribute delivered assets across all digital and social platforms globally.
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[11px] font-bold text-zinc-100 uppercase tracking-widest mb-1 italic">Ownership Release</h4>
                    <p className="text-[10px] leading-relaxed text-zinc-500 uppercase tracking-tight">
                      Fluxio Live relinquishes all ownership claims over the final advertisement delivered herein.
                    </p>
                  </li>
                  <li>
                    <h4 className="text-[11px] font-bold text-zinc-100 uppercase tracking-widest mb-1 italic">Portfolio Rights</h4>
                    <p className="text-[10px] leading-relaxed text-zinc-500 uppercase tracking-tight">
                      Fluxio Live retains perpetual rights to feature this work in case studies and at fluxio.live for promotional goals.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="label-mini">System Verification</span>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                    This document serves as the official handover protocols between Fluxio Live and School to Startup. All visual engineering is finalized.
                  </p>
                </div>
                <div className="mt-12 lg:mt-0 text-right">
                  <div className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900">FLX-S2S-26</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Details */}
      <footer className="mt-12 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-medium">
        <div className="flex items-center gap-4">
          <p className="tracking-[0.2em]">© 2026 FLUXIO LIVE CREATIVE AGENCY</p>
          <span className="h-3 w-[1px] bg-zinc-800"></span>
          <p className="tracking-[0.2em] uppercase">Built for S2S</p>
        </div>
        <div className="flex gap-6 uppercase tracking-[0.1em]">
          <a href="#" className="hover:text-zinc-400 transition-colors">Manifesto</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
