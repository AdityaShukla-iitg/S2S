import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReelVideoPlayer } from './components/ReelVideoPlayer';
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
type ViewMode = 'portal' | 's2s' | 'mission' | 'proof' | 'proposal' | 'campaign';

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
  
  // Campaign Tracker States
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [campaignTab, setCampaignTab] = useState<'Poster' | 'Reel'>('Poster');
  const [retryIndices, setRetryIndices] = useState<Record<number, number>>({});

  const googleDrivePosterIds: Record<number, string> = {
    2: '1u3qw8zc9Zs3UX8VsX0U8u2QwqtgkFAHz', // 23 May
    3: '13E8E_OX_PEIf-U4g0K9b0iFo6T_QGC39', // 24 May
    4: '13LGb_sZA3RiaYoHnAVkzY9rLtoPMlIiX', // 25 May
    5: '1equ9Hw2L7X_7fSZ__w0VjrnZpvHxZqUI', // 26 May
    6: '1X-8Y9n3mRivpLeRAf0NEntb6g1QojxA5', // 27 May
    7: '1JfoS58X_XNaoZlm7VbdZeOVEE7_kU6rY', // 28 May
    8: '1cbXuQ8jC7-ph-V2qUBDpqvvtab2KZhI0', // 29 May
    9: '1wczDqdIaGmDCpYLl-lcN20cOGs_6jZDK', // 30 May
    10: '1uG0bjsfTC0ZNV5G3aAyZWA02nggf7Nye', // 31 May
    11: '1pdD3Xel2teZY0Zm5JlCKL1iYxQ7YHzkN', // 1 June
    12: '1Ro9enCGnzweDTFXrHVff2PhLqRUBLkxn', // 2 June
    13: '1CdoyvRhwVf1_k-LoS4vaisE4KLtac6vP', // 3 June
    14: '1qLqo6O6luGnfz4PTl9di3iPsE00MYsgg', // 4 June
    15: '1wbeGyMXQTRpLOEHFRliL5cJWWb8gQyB3', // 5 June
    16: '16y2jcEwfDqFeHqKnTgISXjCZweynN1H5', // 6 June
  };

  const googleDriveReelIds: Record<number, string> = {
    1: '1xF8W_1_xNtEq87m3uGr_mp4Hepfw9Lvk', // 22 May
    4: '1u7H8W0p9gT9X1hN0KPZtywhh-WHG_us3', // 25 May
    6: '1lgLzW9ITeGBAsgWxqJr5u7tIZDp6mPUn', // 27 May
    8: '1eiZia90UVhhQDEXkTOaP5PsHpWi9442l', // 29 May
    10: '1HjJqxiZoQrp54RQ6eMsaGHdZ4tfmyeM1', // 31 May
    12: '13o_ZEKmn-NQDgytHRukJ6YErXr9onRdk', // 2 June
  };

  const getCandidatePosterSrcs = (index: number) => {
    const list: string[] = [];
    
    // Google Drive direct image URLs
    const driveId = googleDrivePosterIds[index];
    if (driveId) {
      list.push(`https://drive.google.com/thumbnail?sz=w1200&id=${driveId}`);
      list.push(`https://lh3.googleusercontent.com/d/${driveId}`);
      list.push(`https://drive.google.com/uc?id=${driveId}&export=download`);
      list.push(`https://drive.google.com/uc?export=download&id=${driveId}`);
    }

    const baseNames: Record<number, string> = {
      1: 'may22', 2: 'may23', 3: 'may24', 4: 'may25', 5: 'may26', 6: 'may27',
      7: 'may28', 8: 'may29', 9: 'may30', 10: 'may31',
      11: 'june1', 12: 'june2', 13: 'june3', 14: 'june4', 15: 'june5', 16: 'june6', 17: 'june7'
    };
    const name = baseNames[index];
    if (name) {
      const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.PNG', '.JPG', '.JPEG', '.WEBP'];
      const variations = [
        name,
        name.charAt(0).toUpperCase() + name.slice(1),
        name.replace(/(\d+)/, '_$1'),
        name.replace(/(\d+)/, '-$1'),
        name.charAt(0).toUpperCase() + name.slice(1).replace(/(\d+)/, '_$1'),
        name.charAt(0).toUpperCase() + name.slice(1).replace(/(\d+)/, '-$1')
      ];
      
      variations.forEach(v => {
        extensions.forEach(ext => {
          list.push(`/${v}${ext}`);
        });
      });
    }
    
    const fallbackUnsplashMap: Record<number, string> = {
      1: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      2: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
      3: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      4: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      5: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
      6: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      7: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=800&q=80",
      8: "https://images.unsplash.com/photo-1578269174936-2709b5a19aea?auto=format&fit=crop&w=800&q=80",
      9: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      10: "https://images.unsplash.com/photo-1484480974693-2ca0a72f3a25?auto=format&fit=crop&w=800&q=80",
      11: "https://images.unsplash.com/photo-1484755560693-a4074577af3a?auto=format&fit=crop&w=800&q=80",
      12: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      13: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
      14: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      15: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      16: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      17: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    };
    
    if (fallbackUnsplashMap[index]) {
      list.push(fallbackUnsplashMap[index]);
    }
    
    return list;
  };

  const getCandidateReelSrcs = (index: number) => {
    const list: string[] = [];
    
    // Google Drive direct image/video URLs
    const driveId = googleDriveReelIds[index];
    if (driveId) {
      list.push(`https://drive.google.com/uc?export=download&id=${driveId}`);
      list.push(`https://docs.google.com/uc?export=download&id=${driveId}`);
      list.push(`https://drive.google.com/uc?id=${driveId}&export=download`);
      list.push(`https://lh3.googleusercontent.com/d/${driveId}`);
    }

    const baseNames: Record<number, string> = {
      1: 'may22', 2: 'may23', 3: 'may24', 4: 'may25', 5: 'may26', 6: 'may27',
      7: 'may28', 8: 'may29', 9: 'may30', 10: 'may31',
      11: 'june1', 12: 'june2', 13: 'june3', 14: 'june4', 15: 'june5', 16: 'june6', 17: 'june7'
    };
    const name = baseNames[index];
    if (name) {
      const extensions = ['.mp4', '.mov', '.png', '.jpg', '.jpeg', '.webp', '.MP4', '.MOV', '.PNG', '.JPG', '.JPEG', '.WEBP'];
      const variations = [
        name,
        name.charAt(0).toUpperCase() + name.slice(1),
        name.replace(/(\d+)/, '_$1'),
        name.replace(/(\d+)/, '-$1'),
        name.charAt(0).toUpperCase() + name.slice(1).replace(/(\d+)/, '_$1'),
        name.charAt(0).toUpperCase() + name.slice(1).replace(/(\d+)/, '-$1')
      ];
      
      variations.forEach(v => {
        extensions.forEach(ext => {
          list.push(`/${v}${ext}`);
        });
      });
    }

    const fallbackVids: Record<number, string> = {
      1: "https://assets.mixkit.co/videos/preview/mixkit-code-on-a-computer-screen-focused-43482-large.mp4",
      4: "https://assets.mixkit.co/videos/preview/mixkit-hand-working-on-a-computer-close-up-1655-large.mp4",
      6: "https://assets.mixkit.co/videos/preview/mixkit-man-typing-on-a-keyboard-of-a-laptop-44853-large.mp4",
      8: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-keyboard-of-a-laptop-44855-large.mp4",
      10: "https://assets.mixkit.co/videos/preview/mixkit-computer-keys-closeup-with-a-blue-light-43202-large.mp4",
      12: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-typing-on-a-keyboard-and-mouse-42750-large.mp4",
    };
    
    if (fallbackVids[index]) {
      list.push(fallbackVids[index]);
    }
    
    return list;
  };

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

  const campaignPosts: Array<{
    index: number;
    day: string;
    date: string;
    type: "Poster" | "Reel" | "Both";
    title: string;
    goal: string;
    dimension: string;
    whyChosen: string;
    caption: string;
    reelCaption?: string;
  }> = [
    {
      index: 1,
      day: "Day 01",
      date: "Friday, May 22, 2026",
      type: "Reel" as const,
      title: "The National Call to Active Bench",
      goal: "Announce nationwide opening on Unstop",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Announces the national-level innovation challenge and urges young founders/creators across India to begin their transition from theory to real impact.",
      caption: `The wait is over.

You know this feeling.

The late nights.
The rough notebook sketches.
The half-finished diagrams.
The frustration of trying to solve a problem nobody else around you seems to notice.

You sit there staring at your notes, wondering:

“Does this idea actually matter?”

Yes.

And now it finally has a stage.

School2Startup National Innovation Challenge 2026 is officially LIVE.

This is not about already having a billion-dollar startup figured out.

It is about:
• spotting a real problem
• thinking differently
• building something meaningful
• and having the courage to put your idea out into the world

Maybe you are:
• writing algorithms late at night
• designing wireframes on Figma
• brainstorming startup ideas in class
• building an AI tool
• researching a problem nobody is talking about
• sketching product ideas on blank sheets of paper

Whatever your process looks like, this platform was built for students like you.

━━━━━━━━━━━━━━━

📍 THE DETAILS

• Register on Unstop before June 7
• Solo Participation
• Online & Pan India
• No Entry Fee
• No Team Required

━━━━━━━━━━━━━━━

🏆 WHAT’S WAITING

• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

The path is open.

The registrations are live.

The only thing left is your move.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 2,
      day: "Day 02",
      date: "Saturday, May 23, 2026",
      type: "Poster" as const,
      title: "Are You Just Theoretical? (The Shift to Prototype)",
      goal: "Stir existential urgency among student builders",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Tackles academic passivity by comparing empty grades with functional prototypes. Encourages students to enter with whatever format they have.",
      caption: `15 DAYS LEFT.

Think ahead. Build before the others move.

Most students keep waiting for the “right time” to start building.

The right time is now.

School2Startup National Innovation Challenge 2026 is officially live, and registrations are open.

If you have:
• an idea sitting in your head
• a problem you constantly think about
• a solution you want to turn into something real

— this is your stage.

This is not a quiz competition.
This is not a marks-based college project.

This is a national-level innovation challenge where you pitch a real startup idea, AI concept, social impact initiative, or any innovation you truly believe in.

Your idea will be evaluated by judges who actually care about what you are building.

🚀 Journey Timeline:

• Register on Unstop before June 7
• Submit your idea as a Pitch Deck / PPT / PDF / Prototype
• Evaluation Round: June 18 – 25
• Grand Finale: June 28

🏆 What’s at stake?

• Prize pool worth ₹10,000
• Certificates
• Expert mentorship
• National recognition

Solo. Online. Pan India.

15 days left.

The others are already thinking.

Are you moving?

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 3,
      day: "Day 03",
      date: "Sunday, May 24, 2026",
      type: "Poster" as const,
      title: "Unstop Registration: Seamless Onboarding Blueprint",
      goal: "Clear friction for team and solo registrations",
      dimension: "1:1 Square Grid (1080x1080)",
      whyChosen: "Solves immediate operational questions- how to register. Maximizes registration sign-up conversions on Unstop.",
      caption: `9:45 PM.

Your idea deserves a stage. Not just a notebook.

There is a moment almost every young builder experiences.

You are sitting in class.
The lecture is going on.
Everyone else is writing notes.

But your mind is somewhere else entirely.

You are thinking about a problem nobody around you is solving.

Maybe it is an app.
Maybe it is an AI idea.
Maybe it is a startup concept.
Maybe it is something that could genuinely change people’s lives.

You start sketching it quietly in the last pages of your notebook.

A product.
A feature.
A system.
A company you want to build someday.

And then the bell rings.

You close the notebook.

The idea stays inside.

That is the gap School2Startup exists to close.

School2Startup National Innovation Challenge 2026 is a national-level platform built for students who are done just consuming and ready to start creating.

You do not need a finished product.
You do not need a co-founder.
You do not need to come from a big city or a big college.

You just need an idea worth fighting for.

Bring it as:
• a Pitch Deck
• PPT
• PDF
• Prototype
• Presentation

Your submission will be evaluated by a panel of judges on:
• Innovation
• Creativity
• Execution Potential
• Real-World Impact

The best ideas move to the Grand Finale on June 28, where you pitch in front of the ecosystem.

🏆 Winners receive:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

Some ideas stay trapped in notebooks.

Some become the future.

Which one is yours going to be?

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

Solo. Online. Pan India.

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 4,
      day: "Day 04",
      date: "Monday, May 25, 2026",
      type: "Both" as const,
      title: "The Innovator's Dilemma: Perfect vs. Fast",
      goal: "Demolish early paralysis and fear of failure",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Students worry their ideas aren't 'finished'. This video reassures them that PPTs, early prototypes, and raw decks are highly encouraged.",
      caption: `Most students consume.

Few build.

Which one are you?

Every day, thousands of students scroll through startup stories, watch founder interviews, save reels about teenagers building companies, and quietly think:

“I could do that someday.”

But someday never comes.

Not because they lack ideas.
Not because they are not intelligent enough.

Because nobody ever gave them a real reason to start today.

Here is your reason.

School2Startup National Innovation Challenge 2026 is not another webinar you attend, screenshot, and forget the next morning.

This is a national-level innovation challenge where you actually build something.

You take the idea sitting in your head and turn it into:
• a startup concept
• an AI solution
• a social impact initiative
• a prototype
• a pitch deck
• something real

You submit it.

Your work gets evaluated by real judges.

You compete with some of the sharpest young minds across India.

And if your idea stands out, you reach the Grand Finale on June 28 and pitch it on a national stage.

The next big thing will not be built by someone waiting to “feel ready.”

It will be built by the person who started while everyone else was still watching.

🏆 What winners get:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

Solo. Online. Pan India.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`,
      reelCaption: `Build something real.

Anyone can have an idea.

It takes a builder to turn that idea into impact.

Look closely at the notebook in the video:

IDEA ➜ IMPACT

That small arrow in the middle?

That is the hardest part of the entire journey.

Because that is where most people stop.

They imagine the AI model.
They sketch the hardware concept.
They think about the app interface.
They dream about the startup they could build someday.

But they never actually build it.

The idea stays trapped:
• inside notebooks
• on sticky notes
• in unfinished Figma drafts
• in random late-night conversations
• inside their head

And eventually, it fades.

School2Startup National Innovation Challenge 2026 exists for one reason:

To help students make the jump from idea to execution.

This platform is not looking for perfect companies or polished founders.

It is built for the raw transition between:
• curiosity and action
• imagination and structure
• potential and execution

Whether your idea involves:
• Artificial Intelligence
• Hardware
• Software
• Research
• Social Impact
• or a simple solution to a real-world problem

This is your chance to finally build it.

━━━━━━━━━━━━━━━

📍 THE DETAILS

• Register on Unstop before June 7
• Solo Participation
• Online & Pan India

📂 Submission Formats:
• Pitch Deck
• PDF
• Prototype
• Presentation

━━━━━━━━━━━━━━━

🏆 WHAT’S WAITING

• Share of ₹10,000 prize pool
• Certificates of Achievement
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

Stop leaving your ideas trapped on sticky notes.

Build something real.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 5,
      day: "Day 05",
      date: "Tuesday, May 26, 2026",
      type: "Poster" as const,
      title: "The Submission Grid: What Can You Submit?",
      goal: "Broaden the definition of innovation to spike application volume",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Specifies acceptable formats clearly to widen the pool: PPTs, PDFs, pitch decks, early prototypes, AI concepts, and social business ideas.",
      caption: `9:49 PM
Ideas deserve recognition. Here is what you are actually competing for.

Let me be honest with you for a second.

Most student competitions give you a participation certificate and a LinkedIn post you forget about in a week.

School2Startup National Innovation Challenge 2026 is built differently.

Here is what is actually on the table:

Rs 10,000 prize pool for the best ideas in the country.

Not a voucher.
Not "goodies."
Real money. For real thinking.

Certificates of Achievement from one of India's biggest student innovation platforms, powered by Unstop.

Something you can actually put on your resume, your LinkedIn, your college application, your investor deck someday.

Expert mentorship from people who have built, funded, and scaled real things.

Not generic advice.
Conversations that can change the direction of what you are building.

National recognition as one of the top young innovators in India.

Your name. Your idea. On a national stage.

And the only thing standing between you and all of this is an idea you probably already have.

Submit it as a pitch deck, PPT, PDF, prototype, or presentation.

Get evaluated June 18 to 25.
Compete at the Grand Finale on June 28.

Future founders build here.

Register before June 7: https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

Solo. Online. Pan India.

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #fluxiolive #school2startup`
    },
    {
      index: 6,
      day: "Day 06",
      date: "Wednesday, May 27, 2026",
      type: "Both" as const,
      title: "Ecosystem Collab: Fluxio Live in Action",
      goal: "Highlight Fluxio's design-led engineering tools",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Injects credibility. Shows S2S and Fluxio working together to accelerate student ideas from proof of concept to proof of market.",
      caption: `10 days left.

Every move today defines your tomorrow.

Chess players do not wait to see what the opponent does.

They think three moves ahead.
They prepare before the pressure hits.
They move while others are still deciding.

The students who win at School2Startup National Innovation Challenge 2026 will not be the ones registering on June 6 at 11:59 PM in panic.

They will be the ones who started thinking today.

Because here is the truth about innovation that nobody tells you in school:

The idea is rarely the hard part.

The hard part is believing your idea deserves to exist.

The hard part is opening the laptop.
Writing the first slide.
Building the first prototype.
Turning random thoughts into something structured and real.

The hard part is choosing to become a player instead of staying a spectator.

And 10 days is enough time to make that move.

You can register today.
You can spend the next few days shaping your idea into:
• a Pitch Deck
• a PDF
• a Prototype
• a Presentation
• an AI Concept
• a Startup Solution

Then on June 18, your idea enters evaluation.

And on June 28, during the Grand Finale, you could be the one standing on that stage.

Not because you were the smartest in the room.

Because you moved before everyone else did.

Every problem holds a pattern waiting to be solved.

What pattern have you noticed that nobody else is paying attention to yet?

🏆 Prize Pool: ₹10,000
🎓 Certificates
🚀 Expert Mentorship
🌍 National Recognition

Solo. Online. Pan India.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`,
      reelCaption: `Mark the dates.

A calendar is just a collection of numbers until a deadline gives those numbers meaning.

June 2026 is not just another month.

It is the timeline where your idea either:
• stays trapped in your head
• or becomes something real

Look closely at the board in the video.

The roadmap is already there.
The dates are fixed.
The path is clear.

Every successful founder eventually learns the same lesson:

Ideas alone change nothing.

Execution does.

That is why structure matters.

Without deadlines, most ideas stay as:
• unfinished notebook sketches
• late-night thoughts
• startup concepts discussed but never tested
• “someday” plans that never leave the page

School2Startup National Innovation Challenge 2026 is designed to break that cycle.

Because the formula is simple:

IDEA + ACTION = IMPACT

But the “action” part is where most students freeze.

This challenge is your push past that point.

BUILD.
SHIP.
PITCH.

━━━━━━━━━━━━━━━

📍 YOUR ROADMAP

• June 7 → Registration Deadline
• June 18 – 25 → Evaluation Round
• June 28 → Grand Finale

━━━━━━━━━━━━━━━

🏆 WHAT’S ON THE LINE

• Share of ₹10,000 prize pool
• Certificates of Achievement
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

Solo. Online. Pan India.

The countdown has already started.

The next move is yours.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 7,
      day: "Day 07",
      date: "Thursday, May 28, 2026",
      type: "Poster" as const,
      title: "Revealed: The Evaluation Playbook",
      goal: "Build trust and define benchmarks for participants",
      dimension: "1:1 Square (1080x1080)",
      whyChosen: "Details the official judging parameters (Innovation, Feasibility, Execution, Impact) so students can optimize their decks pre-submission.",
      caption: `The path is clear.

The only question is whether you are on it.

I know what stops most students from entering competitions like this.

It is not laziness.

It is confusion.

“What do I even submit?”
“Is my idea good enough?”
“How does this whole thing work?”

So let’s simplify everything.

No jargon.
No complicated process.
No fluff.

Here is exactly how School2Startup National Innovation Challenge 2026 works:

━━━━━━━━━━━━━━━

STEP 1 • REGISTER

Register on Unstop before June 7.

That’s it.

No registration fee.
No team required.
Solo participation.
Pan India.
Online.

━━━━━━━━━━━━━━━

STEP 2 • SUBMIT YOUR IDEA

Your submission can be:
• a Startup Concept
• an AI Solution
• a Social Impact Initiative
• a Research Project
• an App Idea
• any innovation solving a real problem

Submission formats:
• PPT
• PDF
• Pitch Deck
• Prototype
• Presentation

You do NOT need a finished product.

You need a strong idea with clear thinking behind it.

━━━━━━━━━━━━━━━

STEP 3 • EVALUATION ROUND
June 18 to June 25

A panel of judges evaluates submissions based on:
• Innovation
• Creativity
• Execution Potential
• Feasibility
• Real-World Impact
• Presentation Quality

━━━━━━━━━━━━━━━

STEP 4 • GRAND FINALE
June 28

Top ideas get shortlisted.

Selected participants pitch their ideas in front of evaluators and the wider ecosystem.

🏆 Winners receive:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

Four steps.

One idea.

A national stage.

The path is already clear.

The only thing left is your move.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 8,
      day: "Day 08",
      date: "Friday, May 29, 2026",
      type: "Both" as const,
      title: "Mission Samvedna: Innovation with Conscience",
      goal: "Channel social purpose and highlight compassionate code projects",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Demonstrates that innovation isn't just about SaaS. Tackles real-world humanitarian challenges like clothing redistribution and localized relief models.",
      caption: `The stage is set. Are you?
Picture this.
June 28, 2026.
A room full of evaluators, innovators, and people who have built real companies from scratch.
A spotlight hits the stage.
A microphone stands at the center.
And one student walks up, takes a breath, and pitches an idea that they built from nothing but a problem they refused to stop thinking about.
That student could be you.
But only if you decide today.
Here is what I have noticed about the young people who actually make it to stages like this.
They are not always the smartest people in the room.
They are not always from the best schools.
They do not always have the most polished decks.
What they have is this: they took the first step when everyone else was still thinking about it.
School2Startup National Innovation Challenge 2026 is a national-level platform powered by Unstop where students from across India bring their boldest ideas and compete for real recognition.
The pitch deck you build for this.
The problem statement you write.
The solution you shape into something presentable.
That process alone will teach you more about building than a semester of theory ever could.
And if your idea makes it to the Grand Finale on June 28?
That spotlight is yours.
The stage is already set.
The microphone is already there.
The only thing missing is you.
Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812
Solo. Online. Pan India.
#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #fluxiolive #school2startup`,
      reelCaption: `Close your eyes for a second.

Now think about the noise.

Every single day, you scroll past:
• startup success stories
• teenage founders raising funding
• AI tools launching overnight
• people claiming they built “the next big thing”

Meanwhile, your own head is already crowded with ideas:
wireframes, startup concepts, dashboards, pitch decks, late-night thoughts about problems nobody else seems to notice.

It becomes overwhelming.

And that is exactly why most students never start.

Not because they are incapable.

Because the noise makes building feel bigger and more complicated than it actually is.

People see:
• the money
• the jargon
• the scale
• the pressure

And they freeze before they even begin.

But look closely at the video.

The blindfold is not about being unable to see.

It is about choosing what NOT to look at.

Because building something meaningful is not about chasing every trend or grabbing every flying piece of paper at once.

It is about:
• blocking out distraction
• focusing on one real problem
• committing to one clear solution
• and building with intention

That is the story behind every founder who creates something that actually lasts.

School2Startup National Innovation Challenge 2026 is where you remove the blindfold and finally give your idea structure.

And the ₹10,000 prize pool?

It is not just money.

It is validation.

Proof that your thinking, your problem-solving, and your execution have value in the real world.

━━━━━━━━━━━━━━━

📍 THE DETAILS

• Registration Deadline: June 7
• Evaluation Round: June 18 to 25
• Grand Finale: June 28

━━━━━━━━━━━━━━━

🏆 WHAT’S ON THE LINE

• Share of ₹10,000 prize pool
• Certificates of Achievement
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

Solo. Online. Pan India.

The noise will always exist.

The choice to build through it is yours.

Block out the distraction.

Build something real.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 9,
      day: "Day 09",
      date: "Saturday, May 30, 2026",
      type: "Poster" as const,
      title: "Halfway Point: Registrations Reaching Capacity",
      goal: "Drive high urgency/scarcity",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Triggers FOMO as the registrations stack up on Unstop. Shows moving metrics to push remaining undecided students to register.",
      caption: `The journey starts now.

From an idea in your head to a national stage.

Every founder has a Day Zero.

A moment where the idea stops being “something interesting to think about” and becomes something they decide to pursue seriously.

For many people, that moment never arrives.

Not because the idea lacked potential.

Because they never had a structure that pushed them to act on it.

That is exactly why School2Startup National Innovation Challenge 2026 exists.

It gives students a real platform to stop consuming innovation and start building it.

Here is what the journey actually looks like:

📍 TODAY
Registrations are live on Unstop.

• Free Registration
• Solo Participation
• No Team Required
• Pan India
• Takes less than 2 minutes to enter

📍 JUNE 7
Registrations close.

This is the final entry deadline.

📍 JUNE 18 to 25 • EVALUATION ROUND

Participants submit their ideas in the form of:
• Pitch Deck
• PPT
• PDF
• Prototype
• Presentation

Ideas are evaluated on:
• Innovation
• Creativity
• Execution Potential
• Real-World Impact
• Feasibility
• Presentation Quality

📍 JUNE 28 • GRAND FINALE

The strongest ideas get shortlisted and pitch in front of evaluators and the wider ecosystem.

🏆 Winners receive:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

That is the entire journey.

Register.
Build.
Submit.
Pitch on a national stage.

And it all starts with one decision you make today.

Not next week.
Not after exams.
Not when you “feel more ready.”

Now.

Because the students standing on that stage on June 28 will not be waiting for permission.

They are already building.

Are you in?

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 10,
      day: "Day 10",
      date: "Sunday, May 31, 2026",
      type: "Both" as const,
      title: "Ready to Submit? PPTs, PDFs, & Pitch Deck Spec-sheet",
      goal: "Reassure students on structural simplicity",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Acts as a visual spec card mapping the minimal submission deck outline (Problem, Solution, Market, Team). Reassures nervous builders.",
      caption: `What would you build if someone actually gave you a stage?

Not a school assignment.
Not a project made just for grades.

A real stage.

Real judges.
Real feedback.
Real recognition.

Think about this honestly.

You have already spent time on your phone today.

You watched reels.
Scrolled through startup stories.
Saw posts about founders building companies at 17 or 19.
Maybe even read headlines about students raising funding for ideas they started from their hostel rooms.

And somewhere in the back of your mind, there is probably an idea you keep returning to.

An idea that refuses to leave you alone.

Maybe it is:
• an AI tool solving a problem you personally face every day
• an app your school or college desperately needs
• a research project you never knew where to take
• a social impact initiative for a problem in your city or community
• a startup concept you have been quietly thinking about for months

That is exactly the kind of idea School2Startup National Innovation Challenge 2026 is looking for.

Not a perfect company.

Not a funded startup.

Not a polished product with investors already behind it.

Just:
• a real problem
• a real solution
• and the courage to put your idea in front of people who can recognize its potential

📍 Here’s how the journey works:

• Registrations are live now on Unstop
• Registration Deadline: June 7
• Evaluation Round: June 18 to 25
• Grand Finale: June 28

📂 Submission Formats:
• Pitch Deck
• PPT
• PDF
• Prototype
• Presentation

🏆 What you can win:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

Solo. Online. Pan India.

Now here is the real question:

What would YOU build if someone finally gave you a stage?

Drop your idea in the comments.

Seriously.

Say it out loud.

That is the first step builders take.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`,
      reelCaption: `There is a moment when an idea stops being just a thought and finally gets a face.

You see the flash of the camera.
The backdrop.
The confident stance.
The founder standing beside their work like it was always meant to exist.

But what you do not see is everything that came before that frame.

The messy notebooks.
The failed prototypes.
The unfinished drafts.
The nights spent wondering if the idea even mattered.
The moments they almost convinced themselves to stop building and “just focus on exams instead.”

Look closely at the founders in the video.

Smart Drones.
AI Solutions.
Creative Tech.

None of them started with a polished company or a perfect roadmap.

They started exactly where you are right now:

Staring at a screen.
Questioning their idea.
Wondering whether it was actually worth pursuing.

The difference?

They chose to build anyway.

They chose to put their name next to their work.

And at the end of the video, the screen fades to black with one simple line:

NEXT COULD BE YOU.

That is not just a tagline.

It is an open seat waiting for the next student who decides to step forward.

School2Startup National Innovation Challenge 2026 is officially looking for the next wave of young innovators.

The platform is built.
The judges are ready.
The stage is set.

Now the only missing thing is the person willing to step into the frame.

If you were standing there right now…

What would be written on your whiteboard?

━━━━━━━━━━━━━━━

📍 THE DETAILS

• Registration Deadline: June 7
• Evaluation Round: June 18 to 25
• Grand Finale: June 28

━━━━━━━━━━━━━━━

🏆 WHAT’S ON THE LINE

• Share of ₹10,000 prize pool
• Certificates of Achievement
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

Solo. Online. Pan India.

Step into the frame.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 11,
      day: "Day 11",
      date: "Monday, June 01, 2026",
      type: "Poster" as const,
      title: "The Mentors Hub: Meet Your National Judges",
      goal: "Elevate perceived value and prestige of the finale",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Builds high aspiration. Knowing they will pitch to prominent Indian founders and investors motivates top-tier builders to finalize details.",
      caption: `One week left.

Here is everything you need to know before June 7.

I have been posting about School2Startup National Innovation Challenge 2026 for the past few days.

Today, let’s make it simple.

No long story.
No complicated explanation.

Just clarity.

Because sometimes clarity is all someone needs to finally start.

━━━━━━━━━━━━━━━

📍 OPEN REGISTRATIONS
LIVE NOW

Go to Unstop.
Register.
You are in.

• Free Registration
• Solo Participation
• Pan India
• Online
• Takes less than 2 minutes

━━━━━━━━━━━━━━━

📍 REGISTRATION DEADLINE
JUNE 7

After June 7, registrations close.

No late entries.
No extensions.

━━━━━━━━━━━━━━━

📍 EVALUATION ROUND
JUNE 18 to 25

Submit your idea in any of these formats:
• Pitch Deck
• PPT
• PDF
• Prototype
• Presentation

A panel of judges evaluates submissions based on:
• Innovation
• Creativity
• Execution Potential
• Feasibility
• Real-World Impact
• Presentation Quality

━━━━━━━━━━━━━━━

📍 GRAND FINALE
JUNE 28

Top ideas get shortlisted and pitch in front of the ecosystem.

🏆 Winners receive:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

That’s the entire journey.

Register.
Build your idea.
Submit it.
Pitch on a national stage.

The journey starts here.

Not when you “feel ready.”
Not after your schedule clears up.
Not someday.

Here.

One week left to get in.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

Solo. Online. Pan India.

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 12,
      day: "Day 12",
      date: "Tuesday, June 02, 2026",
      type: "Both" as const,
      title: "Beyond Classrooms: Real Startup Execution",
      goal: "Highlight School2Startup's central driving mission",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Inspiring manifesto-style poster that appeals to the inner rebel builder. Direct link to national progress and youth empowerment.",
      caption: `5 days left.

The builders are already in.

Are you?

Look at that poster carefully.

One student is holding a drone.
One has a notebook filled with startup ideas.
One carries a camera.
One has a laptop open with a pitch deck on screen.

Different tools.
Different skill sets.
Different backgrounds.

But they all share one thing:

They chose to build instead of just watching others do it.

That is exactly what School2Startup National Innovation Challenge 2026 is about.

This challenge is not built for one “type” of student.

It is built for:
• the tech student prototyping an AI tool late at night
• the creative who sees problems differently from everyone else
• the strategist filling notebooks with startup ideas at 1 AM
• the researcher sitting on an idea that could genuinely change something
• the student who knows a problem exists and refuses to ignore it anymore

If you have a real idea, there is a place for it here.

You do not need funding.
You do not need a perfect product.
You do not need a team.

You just need the courage to put your idea forward.

🏆 What’s waiting:
• ₹10,000 Prize Pool
• Certificates
• Expert Mentorship
• National Recognition

📍 Grand Finale: June 28

And now the clock is ticking.

Only 5 days left to register.

After June 7, registrations close.

The students competing beside you are already:
• refining their pitch
• improving their presentation
• shaping their problem statement
• preparing their prototype

They are already moving.

The only question is whether you are going to step in or let another opportunity pass by.

Pitch your idea.

Build something real.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

Solo. Online. Pan India.

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`,
      reelCaption: `The hallway walk.

You walk through the same school corridors every single day.

Same walls.
Same classrooms.
Same routines.
Same conversations echoing through the hallway.

But the real question is:

What is happening inside your head while you walk through them?

Are you just moving from one class to another?

Or are you carrying an idea that could actually change something?

Look closely at the words flashing through the video:

IDEA.
RISK.
FAIL.
BUILD.
WIN.

That is the real roadmap of every founder.

Not success first.

First comes the idea.
Then the risk of believing in it.
Then the fear of failure.
Then the decision to keep building anyway.

And eventually?

You win.

Not because the journey was easy.

Because you chose to step forward while everyone else stayed comfortable.

That piece of paper falling through the hallway is not just a flyer.

It is an invitation.

An invitation to stop blending into the crowd and finally put your idea into motion.

School2Startup National Innovation Challenge 2026 is officially calling for builders.

━━━━━━━━━━━━━━━

📍 THE TIMELINE

• Registration Deadline: June 7
• Evaluation Round: June 18 to 25
• Grand Finale: June 28

━━━━━━━━━━━━━━━

🏆 WHAT’S ON THE LINE

• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

━━━━━━━━━━━━━━━

Solo. Online. Pan India.

Opportunities do not wait forever.

Catch this one before it hits the ground.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 13,
      day: "Day 13",
      date: "Wednesday, June 03, 2026",
      type: "Poster" as const,
      title: "The Grand Finale Glimpse (June 28 Blueprint)",
      goal: "Tease the final showdown to activate submission energy",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Builds excitement around the physical/virtual grand finale on June 28, where shortlists face actual investors in a high-octane pitch.",
      caption: `4 days left.

Ideas do not wait.

Neither should you.

Let me tell you something most people learn too late about ideas.

They have an expiry date.

Not because the idea suddenly becomes bad.

Because the longer you sit on it without acting, the easier it becomes to convince yourself it was never worth building in the first place.

You start doubting it.

You compare it to companies that already exist.
You tell yourself some smart person could build it better.
You convince yourself you need:
• more time
• more skills
• more confidence
• more certainty

And then one day, you open your phone and see someone else building exactly what you once imagined.

And the only thing left to say is:

“I had that idea too.”

But ideas do not change anything on their own.

Builders do.

That is why School2Startup National Innovation Challenge 2026 exists.

To give students and young innovators across India a reason to finally act on the thing they keep thinking about.

🏆 What you are competing for:
• Share of ₹10,000 prize pool
• Certificates of Achievement
• Expert Mentorship
• National Recognition

💡 What you need:
Just one real idea.

It could be:
• a Startup Concept
• an AI Solution
• a Research Project
• an App Idea
• a Social Impact Initiative

Submit it as:
• Pitch Deck
• PPT
• PDF
• Prototype
• Presentation

📍 Registration Deadline: June 7
📍 Final Pitch Day: June 28

Only 4 days left.

And honestly?

The empty chair in that poster says everything.

It is waiting for the person who finally decides their idea is worth something.

Is that person you?

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

Solo. Online. Pan India.

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 14,
      day: "Day 14",
      date: "Thursday, June 04, 2026",
      type: "Poster" as const,
      title: "Final 48 Hours: Unstop Portal Alert",
      goal: "Incite critical urgency and push the late-stage registrants",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "A countdown visual designed to capture procrastinators. Highly effective for final registration spikes on Unstop.",
      caption: `3 days left.

The train is moving.

Are you on it?

Look at that poster carefully.

There is a train with one word written on the front:

OPPORTUNITY.

And someone is running behind it with pitch decks flying out of their hands, trying to catch it before it disappears.

Do not become that person.

Right now, you still have time to walk onto this train calmly.

Find your seat.
Prepare your idea.
Be ready when it reaches the destination.

But only if you move before June 7.

Because here is the truth about opportunities like this:

They rarely announce themselves twice.

School2Startup National Innovation Challenge 2026 is one of those rare platforms where a school student or young innovator can take an idea living quietly inside their head and finally put it in front of people who can:
• evaluate it
• validate it
• challenge it
• recognize its potential

You do not need:
• connections
• a famous college
• investors
• a finished product

You only need:
• a real problem
• a real solution
• and the courage to show up

💡 Submit your idea as:
• Pitch Deck
• PPT
• PDF
• Prototype
• Presentation

📍 Registration Deadline: June 7
📍 Evaluation Round: June 18 to 25
📍 Grand Finale: June 28

🏆 What’s waiting:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

Only 3 days left.

Some opportunities never circle back.

This might be one of them.

Do not stand at the station watching this train leave without you.

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

Solo. Online. Pan India.

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 15,
      day: "Day 15",
      date: "Friday, June 05, 2026",
      type: "Poster" as const,
      title: "Final 24 Hours Countdown: Move or Regret",
      goal: "Generate maximum FOMO and immediate registrations",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Direct ultimatum call. The final registration pushes before the system closes down registration pipelines completely.",
      caption: `2 days left.

The builders are already moving.

Are you?

Look at that image from above.

Four students.
One table.
Zero excuses.

One is locked into a laptop building something.
One is sketching startup ideas by hand.
One is designing wireframes on a tablet.
One is shaping a pitch deck slide by slide.

Sticky notes everywhere.
Notebooks open.
A chess piece sitting in the center of the table.
Coffee going cold because nobody even remembers to drink it.

This is what the final days before a real opportunity look like for people who actually intend to show up on June 28.

Not panic.

Not procrastination.

Focused.
Deliberate.
Building.

And here is what most people do not realize about those students:

They did not wait until the last minute to start caring.

They registered early.
They gave themselves time to think deeply.
Time to refine their idea.
Time to turn rough thoughts into something real.

Now they are in the final shaping phase.

You still have 2 days to join them.

That is enough time to:
• register
• define your problem statement
• structure your solution
• create a simple pitch deck or PDF
• and submit something you genuinely believe in

It is not too late today.

But it will be after June 7.

School2Startup National Innovation Challenge 2026 closes registrations in just 2 days.

After that, even the best idea in the world cannot enter.

And while some people keep thinking about starting, the builders are already moving.

🏆 What’s waiting:
• Share of ₹10,000 prize pool
• Certificates
• Expert Mentorship
• National Recognition

📍 Grand Finale: June 28

Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812

Solo. Online. Pan India.

#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #FluxioLive #School2Startup`
    },
    {
      index: 16,
      day: "Day 16",
      date: "Saturday, June 06, 2026",
      type: "Poster" as const,
      title: "Registrations Close Tonight: The Innovation Journey Begins",
      goal: "Seal the registration gates and transition to compilation",
      dimension: "4:5 Portrait Grid (1080x1350)",
      whyChosen: "Final hours warning. Once tonight's clock hit 11:59 PM, Unstop seals the database, initiating the submission round.",
      caption: `24 hours left. Make it count.
This is the last post before registrations close.
Look at this poster one more time.
A person sitting completely still. Calm. Composed. But instead of a face, a camera lens staring straight at the world.
Seeing everything differently.
Framing problems nobody else is framing.
Finding patterns in places others walk past.
That is what School2Startup National Innovation Challenge 2026 is really looking for.
Not the most polished pitch.
Not the most expensive prototype.
Not the student from the most famous school.
The most creative mind.
The sharpest problem solver.
The one who sees what others miss.
Your mind is the puzzle.
Creativity is the key.
You have exactly 24 hours to register.
After June 7, the door closes permanently.
The evaluation round runs June 18 to 25.
The Grand Finale is June 28.
The prize pool is Rs 10,000.
And beyond the money, there are certificates, expert mentorship, and national recognition waiting for the ideas that make it through.
This is the last time I am going to say this.
If you have been sitting on an idea.
If you have been telling yourself you will register tomorrow.
If you have been waiting to feel more ready.
Tomorrow is today.
This is the moment.
24 hours. That is all you have left.
Make it count.
Register before June 7:
https://unstop.com/p/school2startup-national-innovation-challenge-school2startup-1684197?lb=j5KSaRdj&utm_medium=Share&utm_source=competitions&utm_campaign=Aryansin52812
Solo. Online. Pan India.
#School2Startup #NationalInnovationChallenge #S2S2026 #StudentFounders #YoungInnovators #BuildInIndia #StartupIndia #Unstop #fluxiolive #school2startup`
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

  const project = !['portal', 'proposal', 'campaign'].includes(currentView) ? projects[currentView as keyof typeof projects] : null;

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

  const downloadAssetSpec = (post: typeof campaignPosts[0]) => {
    const specText = `FLUXIO LIVE × SCHOOL2STARTUP
DIMENSION 03: CAMPAIGN 1 ASSET SPECIFICATION
===================================================
Day/Post ID:   ${post.day}
Target Date:   ${post.date}
Format Type:   ${post.type.toUpperCase()}
Content Theme: ${post.title}

[STRATEGIC OBJECTIVE]
- Goal: ${post.goal}
- Why Chosen: ${post.whyChosen}

[DESIGN & TECHNICAL LAYOUT]
- Native Dimension: ${post.dimension}
- Visual Direction: Industrial tech minimalism / High-contrast precision style

[READY-TO-COPY CAPTION(S)]
${post.reelCaption ? `--- POSTER CAPTION ---
${post.caption}

--- REEL CAPTION ---
${post.reelCaption}` : post.caption}

===================================================
Created by Fluxio Live Ecosystem Server Protocol.`;

    const blob = new Blob([specText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FLX_DIM3_CAMP1_${post.day.replace(/\s+/g, '_').toUpperCase()}_Spec.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCaption = (caption: string, index: number) => {
    navigator.clipboard.writeText(caption.replace(/\\n/g, '\n'));
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const handleDownloadImage = async (src: string, filename: string, index: number) => {
    const driveId = googleDrivePosterIds[index] || googleDriveReelIds[index];
    if (driveId) {
      const directUrl = `https://drive.google.com/uc?export=download&id=${driveId}`;
      const link = document.createElement('a');
      link.href = directUrl;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      window.open(src, '_blank');
    }
  };

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
    <div className="min-h-screen font-sans bg-[#040c08] text-zinc-300 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#040c08]/80 backdrop-blur-md border-b border-zinc-900/80">
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
            <NavLink mode="campaign" label="Campaign Live" />
            
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
                <NavLink mode="campaign" label="Campaign 1 Plan" />
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
                    One Core <br className="hidden md:block" /> Three Dimensions.
                  </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Student Program Card */}
                  <button 
                    onClick={() => setCurrentView('s2s')}
                    className="group relative bg-zinc-950 border border-zinc-900 p-8 rounded-lg text-left hover:border-zinc-700 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Target className="w-24 h-24 text-[#FF3E3E]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#FF3E3E] uppercase tracking-widest mb-6 block">Dimension 01</span>
                    <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-4 group-hover:text-[#FF3E3E] transition-colors">Student <br /> Program</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xs">
                      Supporting student-built businesses through professional creative engineering and strategic deployment.
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest mt-auto">
                      Enter Hub <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>

                  {/* Partnership Proposal Card */}
                  <button 
                    onClick={() => setCurrentView('proposal')}
                    className="group relative bg-zinc-950 border border-zinc-900 p-8 rounded-lg text-left hover:border-zinc-700 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Music className="w-24 h-24 text-[#006241]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#006241] uppercase tracking-widest mb-6 block">Dimension 02</span>
                    <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-4 group-hover:text-[#006241] transition-colors">Partnership <br /> Proposal</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xs">
                      A focused advertising partnership proposal built specifically for the School2Startup ecosystem.
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest mt-auto">
                      View Proposal <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>

                  {/* Dimension 03 Card - Campaign 1 Plan */}
                  <button 
                    onClick={() => setCurrentView('campaign')}
                    className="group relative bg-zinc-950 border border-zinc-900 p-8 rounded-lg text-left hover:border-zinc-700 transition-all overflow-hidden border-orange-950/40"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <TrendingUp className="w-24 h-24 text-orange-500" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-6 block">Dimension 03</span>
                    <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-4 group-hover:text-orange-500 transition-colors">Campaign 1 <br /> Plan</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-xs">
                      An integrated content publishing roadmap containing dates, poster/reel structures, and ready captions.
                    </p>
                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest mt-auto">
                      Track Campaign <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
                        <ArrowRight className="h-6 w-6 text-zinc-800 group-hover:text-[#e5a93b] transition-colors" />
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
          ) : currentView === 'campaign' ? (
            <motion.div
              key="campaign"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full bg-black text-white min-h-screen"
            >
              {/* Campaign Header / Hero */}
              <section className="w-full max-w-[1600px] mx-auto py-16 md:py-24 px-6 md:px-12 min-h-[50vh] flex flex-col justify-center snap-start space-y-16">
                
                {/* 1. Hero / Header with Important Dates */}
                <div className="border-b border-zinc-900 pb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] bg-[#e5a93b]/10 text-[#e5a93b] font-bold uppercase tracking-widest px-3 py-1 border border-[#e5a93b]/15 rounded-full font-mono">
                      Dimension 03 Live
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">
                      CHALLENGE-CAMP1-2026-V1
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-7xl font-black font-sans tracking-tighter text-white leading-tight uppercase mb-6">
                    CAMPAIGN 1: NATIONAL CHALLENGE LAUNCH
                  </h1>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7">
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                        A multi-channel digital launch roadmap designed specifically to power up nationwide awareness and maximize Unstop registration volumes for the School2Startup National Innovation Challenge. This campaign focuses on inspiring youth builders, solo developers, and teams to showcase their practical prototypes and startup frameworks rather than presenting academic, dry paper assessments.
                      </p>
                    </div>
                    
                    <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 p-6 rounded-lg space-y-4">
                      <div className="border-b border-zinc-900 pb-2">
                        <span className="text-[10px] font-mono text-[#e5a93b] uppercase font-black tracking-widest">
                          IMPORTANT DATES
                        </span>
                      </div>
                      <div className="space-y-3 font-mono text-[11px] uppercase text-zinc-350">
                        <div className="flex justify-between border-b border-zinc-900 pb-2">
                          <span className="text-zinc-500">Launch & Open Portal</span>
                          <span className="text-white font-bold">May 22, 2026</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-900 pb-2">
                          <span className="text-zinc-500">Registrations Closes</span>
                          <span className="text-[#e5a93b] font-bold">June 06, 2026 (11:59 PM)</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-900 pb-2">
                          <span className="text-zinc-500">Evaluation Phase</span>
                          <span className="text-white font-bold">June 18 – 25, 2026</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Grand Finale Battle</span>
                          <span className="text-white font-bold">June 28, 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Planner Table Row */}
                <div id="planner-matrix-table" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase font-sans">
                      Date Planner Matrix
                    </h2>
                    <p className="text-zinc-500 text-[10px] uppercase font-mono mt-1">
                      Tabular index of posts, schedule windows, and creative content channels
                    </p>
                  </div>

                  <div className="overflow-x-auto bg-zinc-950 border border-zinc-900 rounded-lg">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-950">
                          <th className="py-4 px-6 font-bold">No.</th>
                          <th className="py-4 px-6 font-bold">Scheduled Date</th>
                          <th className="py-4 px-6 font-bold">Format to Post</th>
                          <th className="py-4 px-6 font-bold">Status</th>
                          <th className="py-4 px-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900/50 text-[11px] font-mono text-zinc-350">
                        {campaignPosts.map((post) => (
                          <tr key={post.index} className="hover:bg-zinc-900/30 transition-colors">
                            <td className="py-3.5 px-6 text-zinc-600 font-bold">
                              {post.day}
                            </td>
                            <td className="py-3.5 px-6 font-bold text-zinc-350">
                              {post.date}
                            </td>
                            <td className="py-3.5 px-6">
                              <span className={`px-2.5 py-1 rounded-sm text-[9px] font-black uppercase tracking-wider border ${
                                post.type === 'Reel'
                                  ? 'bg-[#e5a93b]/10 text-[#e5a93b] border-[#e5a93b]/20'
                                  : post.type === 'Poster'
                                  ? 'bg-zinc-900 text-zinc-450 border-zinc-800'
                                  : 'bg-[#0d3e2c]/20 text-[#ebd8c7] border-[#0d3e2c]/40'
                              }`}>
                                {post.type}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-[#ebd8c7] max-w-xs truncate uppercase font-bold">
                              READY TO POST
                            </td>
                            <td className="py-3.5 px-6 text-right">
                              <button
                                onClick={() => {
                                  // Switch active tab dynamically based on target post format
                                  const targetTab = post.type === 'Reel' ? 'Reel' : 'Poster';
                                  setCampaignTab(targetTab);
                                  setTimeout(() => {
                                    const element = document.getElementById(`post-${post.index}`);
                                    if (element) {
                                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }, 100);
                                }}
                                className="text-[9px] text-zinc-400 hover:text-white uppercase font-black tracking-widest bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded transition-all"
                              >
                                Jump to post
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sub-Tabs Selector */}
                <div className="flex gap-4 border-b border-zinc-900 pb-4 pt-12 flex-wrap">
                  <button
                    onClick={() => setCampaignTab('Poster')}
                    className={`text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 rounded cursor-pointer ${
                      campaignTab === 'Poster'
                        ? 'bg-[#e5a93b] text-black border-[#e5a93b] font-black'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-700 hover:text-white font-bold'
                    }`}
                  >
                    1. Poster Blueprints ({campaignPosts.filter(p => p.type === 'Poster' || p.type === 'Both').length})
                  </button>
                  <button
                    onClick={() => setCampaignTab('Reel')}
                    className={`text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 rounded cursor-pointer ${
                      campaignTab === 'Reel'
                        ? 'bg-[#e5a93b] text-black border-[#e5a93b] font-black'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-700 hover:text-white font-bold'
                    }`}
                  >
                    2. Reel Directions (Videos) ({campaignPosts.filter(p => p.type === 'Reel' || p.type === 'Both').length})
                  </button>
                </div>

                {/* 3. Posters Section */}
                {campaignTab === 'Poster' && (
                  <div className="space-y-12 pt-8">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-white uppercase font-sans">
                        Poster Blueprints
                      </h2>
                      <p className="text-zinc-600 text-[10px] uppercase font-mono mt-1">
                        Static visual campaigns targeted for grid feeds and community channels
                      </p>
                    </div>

                  <div className="space-y-16">
                    {(() => {
                      const posters = campaignPosts.filter(post => post.type === 'Poster' || post.type === 'Both');
                      
                      const campaignImagesMap: Record<number, { src: string; fallbackLabel: string; bgGradient: string; description: string }> = {
                        1: { src: "/may22.png", fallbackLabel: "THE JOURNEY STARTS HERE.", bgGradient: "from-emerald-950 via-zinc-950 to-zinc-900", description: "Official S2S announcement banner featuring the Unstop logo, challenge phases timeline details, and 'PAN INDIA • SOLO • ONLINE' specifications." },
                        2: { src: "/may23.png", fallbackLabel: "15 DAYS LEFT", bgGradient: "from-zinc-900 via-neutral-950 to-emerald-950", description: "Tactical countdown visual highlighting the Giant Chess King element, focused on urging early builders to think ahead and register." },
                        3: { src: "/may24.png", fallbackLabel: "YOUR IDEA DESERVES A STAGE.", bgGradient: "from-amber-950 via-zinc-950 to-zinc-900", description: "Inspirational design showing a student standing beneath a golden spotlight beam representing the physical and virtual ecosystem showcase stage." },
                        4: { src: "/may25.png", fallbackLabel: "MOST STUDENTS CONSUME. FEW BUILD.", bgGradient: "from-[#021f11] via-zinc-950 to-[#0c0d10]", description: "A dark premium green graphic featuring a student crafting code next to a giant glossy black Chess King, emphasizing the S2S builder identity." },
                        5: { src: "/may26.png", fallbackLabel: "THE PATH IS CLEAR.", bgGradient: "from-zinc-950 via-[#041d13] to-neutral-950", description: "Action-oriented visual of a boardroom table with a gavel, open registration form binder, and active laptop telemetry boards." },
                        6: { src: "/may27.png", fallbackLabel: "ECOSYSTEM COLLAB (FLUXIO VIDEO REEL)", bgGradient: "from-zinc-950 via-orange-950/30 to-black", description: "High-octane reels visual overlaying creative direction benchmarks from Fluxio Live onto student pitch templates." },
                        7: { src: "/may28.png", fallbackLabel: "10 DAYS LEFT", bgGradient: "from-zinc-900 via-zinc-950 to-neutral-950", description: "Dual-material black and white chess Kings facing each other on a checkerboard, creating immediate registration urgency." },
                        8: { src: "/may29.png", fallbackLabel: "₹10,000 PRIZE POOL. CERTIFICATES. MENTORSHIP.", bgGradient: "from-amber-950/80 via-zinc-950 to-black", description: "A close-up of the official golden School2Startup trophy, showcasing early winner certificates and a strong ecosystem integration handshake." },
                        9: { src: "/may30.png", fallbackLabel: "WHAT WOULD YOU BUILD?", bgGradient: "from-[#042115] via-zinc-950 to-zinc-900", description: "An elegant, highly composed scene featuring a glowing amber lightbulb on a green mid-century chair alongside active wireframe notebooks." },
                        10: { src: "/may31.png", fallbackLabel: "THE JOURNEY STARTS NOW.", bgGradient: "from-zinc-950 via-emerald-950/30 to-[#020d0a]", description: "Detailed dashboard flat-lay showing active pitch decks, clipboards, badges, mugs, and startup checklists on an executive surface." },
                        11: { src: "/june1.png", fallbackLabel: "THE STAGE IS SET. ARE YOU?", bgGradient: "from-[#0c0a02] via-[#051410] to-neutral-950", description: "A dark moody stage view displaying a classic microphone illuminated under a warm spotlight, looking out toward an audience panel." },
                        12: { src: "/june2.png", fallbackLabel: "5 DAYS LEFT.", bgGradient: "from-[#031d10] via-zinc-950 to-black", description: "Group poster of four youth builders showcasing their deliverables: pitch deck notebook, AI chip, photography camera, and drone." },
                        13: { src: "/june3.png", fallbackLabel: "4 DAYS LEFT.", bgGradient: "from-amber-950/40 via-[#011c10] to-zinc-950", description: "Podium layout featuring a glowing lightbulb on a designer chair surrounded by flying pitch drafts, chess pieces, and rockets." },
                        14: { src: "/june4.png", fallbackLabel: "3 DAYS LEFT.", bgGradient: "from-[#081b2e] via-zinc-950 to-black", description: "Dynamic high-action visual of a student running to catch a sleek golden subway train with the destination sign reading 'OPPORTUNITY'." },
                        15: { src: "/june5.png", fallbackLabel: "2 DAYS LEFT.", bgGradient: "from-emerald-950/50 via-zinc-950 to-black", description: "An incredibly detailed top-down flat-lay shot of students collaborating at a dark green executive table of devices, notebooks, and plans." },
                        16: { src: "/june6.png", fallbackLabel: "24 HOURS LEFT.", bgGradient: "from-zinc-950 via-[#1a0505] to-[#141416]", description: "A surreal avant-garde visual of a student builder seated on a mahogany chair with a classic manual camera styled as their head." }
                      };

                      return posters.map((post, idx) => {
                        const isEven = idx % 2 === 0;
                        const imageInfo = campaignImagesMap[post.index] || {
                           src: "/may22.png",
                           fallbackLabel: post.title,
                           bgGradient: "from-zinc-950 to-zinc-900"
                        };
                        const fileName = imageInfo.src.replace(/^\//, '');

                        const candidateSrcs = getCandidatePosterSrcs(post.index);
                        const currentRetryIdx = retryIndices[post.index] || 0;
                        const currentSrc = currentRetryIdx < candidateSrcs.length ? candidateSrcs[currentRetryIdx] : candidateSrcs[candidateSrcs.length - 1];

                        const isSquare = post.dimension.toLowerCase().includes('1:1') || post.dimension.toLowerCase().includes('square');
                        const isReel = (post.type as string) === 'Reel' || post.dimension.toLowerCase().includes('9:16');
                        const containerAspect = isReel ? 'aspect-[9/16] max-h-[580px] w-auto mx-auto' : isSquare ? 'aspect-square w-full' : 'aspect-[4/5] w-full';
                        const imgStyleClass = 'object-contain bg-zinc-950/90 w-full h-full';

                        return (
                          <div 
                            id={`post-${post.index}`}
                            key={post.index}
                            className="bg-zinc-950/60 border border-zinc-900 hover:border-amber-950/30 p-6 md:p-10 rounded-lg hover:bg-zinc-950/90 transition-all duration-500 shadow-xl"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                              
                              {/* Left Image Column */}
                              <div className="w-full h-full flex flex-col justify-center">
                                <div className={`${containerAspect} relative overflow-hidden rounded-lg border border-zinc-900/60 bg-gradient-to-br ${imageInfo.bgGradient} flex flex-col justify-between p-6 shadow-2xl`}>
                                  
                                  {/* Color overlay */}
                                  <div className="absolute inset-0 bg-black/40 mix-blend-overlay pointer-events-none" />
                                  
                                  {/* Top header stats bar */}
                                  <div className="flex justify-between items-start z-10">
                                    <span className="text-[9px] font-mono font-bold tracking-widest bg-black/60 backdrop-blur-md text-[#e5a93b] px-2.5 py-1 rounded border border-[#e5a93b]/20">
                                      ASSET {post.day.toUpperCase()}
                                    </span>
                                  </div>

                                  {/* Poster visual layout mock */}
                                  <div className="my-auto text-center space-y-4 z-10 px-3 py-6">
                                    <div className="text-zinc-[650] font-mono text-[9px] uppercase tracking-widest leading-none">
                                      ✕ EXPECTED GRAPHIC ✕
                                    </div>
                                    <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none px-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                                      {post.date.toUpperCase()}
                                    </h2>
                                    <div className="h-[2px] w-12 bg-[#e5a93b]/30 mx-auto rounded-full" />
                                  </div>

                                  {/* Bottom timeline stamps bar */}
                                  <div className="flex justify-between items-end z-10 border-t border-zinc-900/60 pt-4 font-mono text-[9px]">
                                    <div>
                                      <span className="text-[7px] block text-zinc-600 uppercase tracking-wider">FILENAME</span>
                                      <span className="font-bold text-zinc-300 uppercase">{fileName}</span>
                                    </div>
                                    <div>
                                      <span className="text-[7px] block text-zinc-600 uppercase tracking-wider text-right font-mono">SPEC</span>
                                      <span className="font-bold text-[#e5a93b] uppercase">{post.dimension.split(' ')[0]}</span>
                                    </div>
                                  </div>

                                  {/* Real loaded Image with Sequential Try Logic and Unsplash Fallback */}
                                  <img 
                                    src={currentSrc} 
                                    alt={post.date} 
                                    referrerPolicy="no-referrer"
                                    className={`absolute inset-0 w-full h-full ${imgStyleClass} rounded-lg opacity-0 transition-opacity duration-700 pointer-events-none`}
                                    onLoad={(e) => {
                                      const imgEl = e.target as HTMLImageElement;
                                      imgEl.classList.remove('opacity-0');
                                      imgEl.classList.add('opacity-100', 'z-20');
                                    }}
                                    onError={() => {
                                      if (currentRetryIdx < candidateSrcs.length - 1) {
                                        setRetryIndices(prev => ({
                                          ...prev,
                                          [post.index]: currentRetryIdx + 1
                                        }));
                                      }
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Right Text Column */}
                              <div className="flex flex-col justify-between h-auto space-y-6">
                                <div className="space-y-4">
                                  {/* Header has filename */}
                                  <div className="border-b border-zinc-900 pb-3">
                                    <span className="text-[9px] font-mono text-[#e5a93b] uppercase tracking-widest font-black bg-[#e5a93b]/10 px-2 py-0.5 rounded border border-[#e5a93b]/10">
                                      {post.day} • READY TO POST
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-black font-sans tracking-tight text-white uppercase leading-tight mt-2">
                                      {post.date}
                                    </h3>
                                  </div>

                                  {/* Paste-Ready Caption Area */}
                                  <div className="bg-zinc-950 p-5 rounded border border-zinc-900 space-y-3">
                                    <div className="flex justify-between items-center gap-2 flex-wrap">
                                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                                        READY TO PASTE IN POST:
                                      </span>
                                      
                                      <div className="flex items-center gap-2">
                                        <button 
                                          onClick={() => handleCopyCaption(post.caption, post.index)}
                                          className={`flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded transition-all duration-300 ${
                                            copiedIndex === post.index 
                                              ? 'bg-[#006241]/25 text-[#00ff88] border border-[#006241]/40' 
                                              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-805'
                                          }`}
                                        >
                                          {copiedIndex === post.index ? (
                                            <>
                                              <Check className="w-3 h-3" />
                                              COPIED
                                            </>
                                          ) : (
                                            'COPY CAPTION'
                                          )}
                                        </button>

                                        <button 
                                          onClick={() => handleDownloadImage(currentSrc, `S2S_Campaign_${post.day.replace(/\s+/g, '_')}.png`, post.index)}
                                          className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded transition-all duration-300 bg-amber-500 hover:bg-amber-600 text-black border border-amber-500"
                                        >
                                          <Download className="w-3 h-3" strokeWidth={3} />
                                          DOWNLOAD
                                        </button>
                                      </div>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto bg-black p-4 rounded border border-zinc-900 text-[10.5px] font-mono leading-relaxed text-zinc-400 select-all whitespace-pre-wrap scrollbar-thin">
                                      {post.caption}
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
                )}

                {/* 4. Reels Section */}
                {campaignTab === 'Reel' && (
                  <div className="space-y-12 pt-8 border-t border-zinc-900">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-white uppercase font-sans">
                        Reel Directions
                      </h2>
                      <p className="text-zinc-600 text-[10px] uppercase font-mono mt-1">
                        Dynamic vertical high-octane visual directions and loops for short-form video formats
                      </p>
                    </div>

                  <div className="space-y-16">
                    {(() => {
                      const reels = campaignPosts.filter(post => post.type === 'Reel' || post.type === 'Both');
                      
                      const campaignImagesMap: Record<number, { src: string; fallbackLabel: string; bgGradient: string; description: string }> = {
                        1: { src: "/may22.png", fallbackLabel: "THE JOURNEY STARTS HERE.", bgGradient: "from-emerald-950 via-zinc-950 to-zinc-900", description: "Official S2S announcement banner featuring the Unstop logo, challenge phases timeline details, and 'PAN INDIA • SOLO • ONLINE' specifications." },
                        2: { src: "/may23.png", fallbackLabel: "15 DAYS LEFT", bgGradient: "from-zinc-900 via-neutral-950 to-emerald-950", description: "Tactical countdown visual highlighting the Giant Chess King element, focused on urging early builders to think ahead and register." },
                        3: { src: "/may24.png", fallbackLabel: "YOUR IDEA DESERVES A STAGE.", bgGradient: "from-amber-950 via-zinc-950 to-zinc-900", description: "Inspirational design showing a student standing beneath a golden spotlight beam representing the physical and virtual ecosystem showcase stage." },
                        4: { src: "/may25.png", fallbackLabel: "MOST STUDENTS CONSUME. FEW BUILD.", bgGradient: "from-[#021f11] via-zinc-950 to-[#0c0d10]", description: "A dark premium green graphic featuring a student crafting code next to a giant glossy black Chess King, emphasizing the S2S builder identity." },
                        5: { src: "/may26.png", fallbackLabel: "THE PATH IS CLEAR.", bgGradient: "from-zinc-950 via-[#041d13] to-neutral-950", description: "Action-oriented visual of a boardroom table with a gavel, open registration form binder, and active laptop telemetry boards." },
                        6: { src: "/may27.png", fallbackLabel: "ECOSYSTEM COLLAB (FLUXIO VIDEO REEL)", bgGradient: "from-zinc-950 via-orange-950/30 to-black", description: "High-octane reels visual overlaying creative direction benchmarks from Fluxio Live onto student pitch templates." },
                        7: { src: "/may28.png", fallbackLabel: "10 DAYS LEFT", bgGradient: "from-zinc-900 via-zinc-950 to-neutral-950", description: "Dual-material black and white chess Kings facing each other on a checkerboard, creating immediate registration urgency." },
                        8: { src: "/may29.png", fallbackLabel: "₹10,000 PRIZE POOL. CERTIFICATES. MENTORSHIP.", bgGradient: "from-amber-950/80 via-zinc-950 to-black", description: "A close-up of the official golden School2Startup trophy, showcasing early winner certificates and a strong ecosystem integration handshake." },
                        9: { src: "/may30.png", fallbackLabel: "WHAT WOULD YOU BUILD?", bgGradient: "from-[#042115] via-zinc-950 to-zinc-900", description: "An elegant, highly composed scene featuring a glowing amber lightbulb on a green mid-century chair alongside active wireframe notebooks." },
                        10: { src: "/may31.png", fallbackLabel: "THE JOURNEY STARTS NOW.", bgGradient: "from-zinc-950 via-emerald-950/30 to-[#020d0a]", description: "Detailed dashboard flat-lay showing active pitch decks, clipboards, badges, mugs, and startup checklists on an executive surface." },
                        11: { src: "/june1.png", fallbackLabel: "THE STAGE IS SET. ARE YOU?", bgGradient: "from-[#0c0a02] via-[#051410] to-neutral-950", description: "A dark moody stage view displaying a classic microphone illuminated under a warm spotlight, looking out toward an audience panel." },
                        12: { src: "/june2.png", fallbackLabel: "5 DAYS LEFT.", bgGradient: "from-[#031d10] via-zinc-950 to-black", description: "Group poster of four youth builders showcasing their deliverables: pitch deck notebook, AI chip, photography camera, and drone." },
                        13: { src: "/june3.png", fallbackLabel: "4 DAYS LEFT.", bgGradient: "from-amber-950/40 via-[#011c10] to-zinc-950", description: "Podium layout featuring a glowing lightbulb on a designer chair surrounded by flying pitch drafts, chess pieces, and rockets." },
                        14: { src: "/june4.png", fallbackLabel: "3 DAYS LEFT.", bgGradient: "from-[#081b2e] via-zinc-950 to-black", description: "Dynamic high-action visual of a student running to catch a sleek golden subway train with the destination sign reading 'OPPORTUNITY'." },
                        15: { src: "/june5.png", fallbackLabel: "2 DAYS LEFT.", bgGradient: "from-emerald-950/50 via-zinc-950 to-black", description: "An incredibly detailed top-down flat-lay shot of students collaborating at a dark green executive table of devices, notebooks, and plans." },
                        16: { src: "/june6.png", fallbackLabel: "24 HOURS LEFT.", bgGradient: "from-zinc-950 via-[#1a0505] to-[#141416]", description: "A surreal avant-garde visual of a student builder seated on a mahogany chair with a classic manual camera styled as their head." }
                      };

                      return reels.map((post, idx) => {
                        const isEven = idx % 2 === 0;
                        const imageInfo = campaignImagesMap[post.index] || {
                          src: "/may22.png",
                          fallbackLabel: post.title,
                          bgGradient: "from-zinc-950 to-zinc-900"
                        };
                        const fileName = imageInfo.src.replace(/^\//, '');

                        const candidateSrcs = getCandidateReelSrcs(post.index);
                        const currentRetryIdx = retryIndices[post.index] || 0;
                        const currentSrc = currentRetryIdx < candidateSrcs.length ? candidateSrcs[currentRetryIdx] : candidateSrcs[candidateSrcs.length - 1];

                        const isSquare = post.dimension.toLowerCase().includes('1:1') || post.dimension.toLowerCase().includes('square');
                        const isReel = post.type === 'Reel' || post.dimension.toLowerCase().includes('9:16');
                        const containerAspect = isReel ? 'aspect-[9/16] max-h-[580px] w-auto mx-auto' : isSquare ? 'aspect-square w-full' : 'aspect-[4/5] w-full';
                        const imgStyleClass = 'object-contain bg-zinc-950/90 w-full h-full';

                        const isVideo = currentSrc.toLowerCase().endsWith('.mp4') || currentSrc.toLowerCase().endsWith('.mov') || currentSrc.includes('assets.mixkit.co');

                        return (
                          <div 
                            id={`post-${post.index}`}
                            key={post.index}
                            className="bg-zinc-950/60 border border-zinc-900 hover:border-[#ebd8c7]/20 p-6 md:p-10 rounded-lg hover:bg-zinc-950/90 transition-all duration-500 shadow-xl"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                              
                              {/* Left Image/Video Column */}
                              <div className="w-full h-full flex flex-col justify-center">
                                <div className={`${containerAspect} relative overflow-hidden rounded-lg border border-zinc-900/60 bg-gradient-to-br ${imageInfo.bgGradient} flex flex-col justify-between p-6 shadow-2xl`}>
                                  
                                  {/* Color overlay */}
                                  <div className="absolute inset-0 bg-black/40 mix-blend-overlay pointer-events-none" />
                                  
                                  {/* Top header stats bar */}
                                  <div className="absolute top-6 left-6 z-10">
                                    <span className="text-[9px] font-mono font-bold tracking-widest bg-black/60 backdrop-blur-md text-[#e5a93b] px-2.5 py-1 rounded border border-[#e5a93b]/20">
                                      ASSET {post.day.toUpperCase()}
                                    </span>
                                  </div>

                                  {/* Poster visual layout mock */}
                                  <div className="my-auto text-center space-y-4 z-10 px-3 py-6">
                                    <div className="text-zinc-[650] font-mono text-[9px] uppercase tracking-widest leading-none">
                                      ✕ EXPECTED GRAPHIC ✕
                                    </div>
                                    <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-zinc-100 tracking-widest uppercase leading-none px-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                                      {post.date.toUpperCase()}
                                    </h2>
                                    <div className="h-[2px] w-12 bg-[#e5a93b]/30 mx-auto rounded-full" />
                                  </div>

                                  {/* Bottom timeline stamps bar */}
                                  <div className="flex justify-between items-end z-10 border-t border-zinc-900/60 pt-4 font-mono text-[9px]">
                                    <div>
                                      <span className="text-[7px] block text-zinc-600 uppercase tracking-wider">FILENAME</span>
                                      <span className="font-bold text-zinc-300 uppercase">{fileName}</span>
                                    </div>
                                    <div>
                                      <span className="text-[7px] block text-zinc-600 uppercase tracking-wider text-right font-mono">SPEC</span>
                                      <span className="font-bold text-[#e5a93b] uppercase">{post.dimension.split(' ')[0]}</span>
                                    </div>
                                  </div>

                                  {/* Dynamic Player: Video Loop or Image Fallback with Try Logic */}
                                  {isVideo ? (
                                    <ReelVideoPlayer
                                      src={currentSrc}
                                      imgStyleClass={imgStyleClass}
                                      onError={() => {
                                        if (currentRetryIdx < candidateSrcs.length - 1) {
                                          setRetryIndices(prev => ({
                                            ...prev,
                                            [post.index]: currentRetryIdx + 1
                                          }));
                                        }
                                      }}
                                    />
                                  ) : (
                                    <img 
                                      src={currentSrc} 
                                      alt={post.date} 
                                      referrerPolicy="no-referrer"
                                      className={`absolute inset-0 w-full h-full ${imgStyleClass} rounded-lg opacity-0 transition-opacity duration-700 pointer-events-none`}
                                      onLoad={(e) => {
                                        const imgEl = e.target as HTMLImageElement;
                                        imgEl.classList.remove('opacity-0');
                                        imgEl.classList.add('opacity-100', 'z-20');
                                      }}
                                      onError={() => {
                                        if (currentRetryIdx < candidateSrcs.length - 1) {
                                          setRetryIndices(prev => ({
                                            ...prev,
                                            [post.index]: currentRetryIdx + 1
                                          }));
                                        }
                                      }}
                                    />
                                  )}
                                </div>
                              </div>

                              {/* Right Text Column */}
                              <div className="flex flex-col justify-between h-auto space-y-6">
                                <div className="space-y-4">
                                  {/* Header has filename */}
                                  <div className="border-b border-zinc-900 pb-3">
                                    <span className="text-[9px] font-mono text-[#e5a93b] uppercase tracking-widest font-black bg-[#e5a93b]/10 px-2 py-0.5 rounded border border-[#e5a93b]/10">
                                      {post.day} • READY TO POST
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-black font-sans tracking-tight text-white uppercase leading-tight mt-2">
                                      {post.date}
                                    </h3>
                                  </div>

                                  {/* Paste-Ready Caption Area */}
                                  <div className="bg-zinc-950 p-5 rounded border border-zinc-900 space-y-3">
                                    <div className="flex justify-between items-center gap-2 flex-wrap">
                                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                                        READY TO PASTE IN POST:
                                      </span>
                                      
                                      <div className="flex items-center gap-2">
                                        <button 
                                          onClick={() => handleCopyCaption(post.reelCaption || post.caption, post.index)}
                                          className={`flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded transition-all duration-300 ${
                                            copiedIndex === post.index 
                                              ? 'bg-[#006241]/25 text-[#00ff88] border border-[#006241]/40' 
                                              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-805'
                                          }`}
                                        >
                                          {copiedIndex === post.index ? (
                                            <>
                                              <Check className="w-3 h-3" />
                                              COPIED
                                            </>
                                          ) : (
                                            'COPY CAPTION'
                                          )}
                                        </button>

                                        <button 
                                          onClick={() => handleDownloadImage(currentSrc, `S2S_Campaign_${post.day.replace(/\s+/g, '_')}.png`, post.index)}
                                          className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded transition-all duration-300 bg-amber-500 hover:bg-amber-600 text-black border border-amber-500"
                                        >
                                          <Download className="w-3 h-3" strokeWidth={3} />
                                          DOWNLOAD
                                        </button>
                                      </div>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto bg-black p-4 rounded border border-zinc-900 text-[10.5px] font-mono leading-relaxed text-zinc-400 select-all whitespace-pre-wrap scrollbar-thin">
                                      {post.reelCaption || post.caption}
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
                )}

                {/* Back to Portal Footer */}
                <div className="mt-20 border-t border-zinc-900 pt-16 text-center">
                  <h3 className="font-['Bebas_Neue'] text-5xl md:text-7xl leading-none text-zinc-800 uppercase hover:text-[#e5a93b] transition-colors cursor-default mb-10">
                    Dimension 03 Connected
                  </h3>
                  <button 
                    onClick={() => { setCurrentView('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-12 py-5 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded transition-all"
                  >
                    ← Return to Ecosystem Portal
                  </button>
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
                      <div key={idx} className="bg-zinc-950/40 border border-zinc-900 p-8 rounded border-b-2 border-b-zinc-800 hover:border-b-[#e5a93b] transition-all">
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
