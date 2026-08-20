import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import {
  ArrowRight, Flame, Trophy, CheckCircle2, Shield, Sparkles, Terminal, BookOpen,
  Layers, LogIn, UserPlus, HelpCircle, ChevronDown, Star, Zap, Target, BarChart2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, isAuthenticated } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const sampleProblem = PROBLEMS_DATA[0];

  const faqs = [
    {
      q: 'What competitions does OlympiadOS cover?',
      a: 'OlympiadOS covers high school competitions across Mathematics (AMC 8/10/12, AIME, USAMO, IMO), Physics (F=ma, USAPhO, IPhO), Chemistry (USNCO, IChO), and Biology (USABO, IBO), as well as Science Bowl & Science Bee.',
    },
    {
      q: 'Is KaTeX math rendering fully supported?',
      a: 'Yes! All problem statements, hints, user scratchpad notes, and step-by-step proofs render inline ($...$) and block ($$...$$) LaTeX formulas in real time.',
    },
    {
      q: 'How does the Elo rating system work?',
      a: 'Your skill is tracked using an Elo rating system. Solving harder problems correctly yields higher rating gains, while adaptive problem queues automatically recommend problems matching your target level.',
    },
    {
      q: 'Can I use OlympiadOS for free?',
      a: 'Yes, OlympiadOS is free to start. You can browse problems, solve daily challenges, use interactive formula sheets, and create personalized study plans.',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* TOP HEADER NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-base group-hover:border-emerald-400 group-hover:shadow-glow-sm transition-all">
              Ω
            </div>
            <span className="font-mono text-base font-bold tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Olympiad<span className="text-emerald-400">OS</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-400">
            <a href="#features" className="hover:text-zinc-100 transition-colors">Features</a>
            <a href="#disciplines" className="hover:text-zinc-100 transition-colors">Disciplines</a>
            <a href="#how-it-works" className="hover:text-zinc-100 transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-zinc-100 transition-colors">FAQ</a>
            <button onClick={() => navigate('/pricing')} className="hover:text-zinc-100 transition-colors">Pricing</button>
          </nav>

          {/* Action Buttons: Log In & Sign Up */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/study-plan')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-glow-sm flex items-center gap-1.5 font-mono"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-glow-sm flex items-center gap-1.5 font-mono"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400 mb-6 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Training Platform for Math & Science Olympiads</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.1] mb-6">
          Master Advanced <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Math & Science Olympiads
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Rigorous proof-based problems, real-time KaTeX LaTeX math rendering, timed contest environments, and adaptive Elo analytics for serious student competitors.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm sm:text-base transition-all shadow-glow-md flex items-center justify-center gap-2 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/problems')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Explore 65+ Problems</span>
          </button>
        </div>

        {/* Real Product Mockup Preview */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-4 shadow-2xl text-left">
          <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/80 flex items-center justify-between text-xs font-mono mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-zinc-400 ml-2">olympiados-workspace // {sampleProblem.title}</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
            >
              Log In to Solve <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-4 bg-zinc-900 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-500/30 font-bold">
                {sampleProblem.subject}
              </span>
              <span className="text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                {sampleProblem.topic}
              </span>
              <span className="text-zinc-500">
                {sampleProblem.source}
              </span>
            </div>
            <div className="text-sm p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-zinc-200">
              <LatexRenderer content={sampleProblem.statement} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION ("Why OlympiadOS") */}
      <section id="features" className="py-20 bg-zinc-900/40 border-t border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Built for Competitors</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">Everything You Need to Win Medals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Proof-Based Rigor</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Authentic problems from USAMO, IMO, USAPhO, USNCO, and USABO tournaments with complete step-by-step proofs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Native KaTeX LaTeX</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Beautiful real-time LaTeX math rendering for equations, matrices, geometric relations, and chemical formulas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Simulated Virtual Contests</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Practice under realistic exam conditions with live countdown timers, strict submission windows, and scorecards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Adaptive Elo Rating</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Track your rating progression, identify weak subtopics, and receive targeted daily problem recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINES SECTION */}
      <section id="disciplines" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Subject Coverage</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">Four Major Olympiad Disciplines</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="text-2xl">∑</div>
            <h3 className="text-lg font-bold text-zinc-100">Mathematics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Algebra, Number Theory, Euclidean Geometry, and Combinatorics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="text-2xl">⚡</div>
            <h3 className="text-lg font-bold text-zinc-100">Physics</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Lagrangian Mechanics, Electrodynamics, Thermodynamics, and Quantum Mechanics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="text-2xl">⚗</div>
            <h3 className="text-lg font-bold text-zinc-100">Chemistry</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Organic Reaction Mechanisms, Chemical Kinetics, Physical & Inorganic Chemistry.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="text-2xl">🧬</div>
            <h3 className="text-lg font-bold text-zinc-100">Biology</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Genetics & Evolution, Cell Biochemistry, Plant/Animal Physiology, and Ecology.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-zinc-900/40 border-t border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Simple Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">How OlympiadOS Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-lg flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Sign Up & Select Competitions</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Choose your target Olympiads (AMC, AIME, USAMO, USAPhO, USNCO, USABO) to set your study goals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-lg flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Generate Personalized Study Plan</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Receive an automated weekly schedule with daily target problems tailored to your target difficulty level.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 font-mono font-bold text-lg flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Practice & Master Weak Areas</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Solve proof-based problems in the IDE workspace, review progressive hints, and climb the global Elo leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left font-bold text-sm text-zinc-100 flex items-center justify-between"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeFaq === index ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BOTTOM BANNER */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-6">
          <Trophy className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 max-w-2xl mx-auto">
            Ready to Start Your Olympiad Training Journey?
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto">
            Create your account to access proof-based problems, study plan generators, and interactive formula sheets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-glow-md flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account Now</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-sm transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Log In</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-950 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">Ω OlympiadOS</span>
            <span>• Academic Practice Engine</span>
          </div>
          <div>© 2026 OlympiadOS Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
