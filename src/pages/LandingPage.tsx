import React from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import { ArrowRight, Flame, Trophy, CheckCircle2, Shield, Sparkles, Terminal, BookOpen, Layers, Award } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, user } = useApp();

  const sampleProblem = PROBLEMS_DATA[0]; // Functional Equation

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Academic Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400 mb-6 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineered for USAMO, IMO, USAPhO, IPhO & IChO Competitors</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.1] mb-6">
          Serious Practice for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Math & Science Olympiads
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          OlympiadOS provides rigorous proof-based problems, an elite training environment, and structured diagnostic feedback for students who aim to become exceptional problem solvers.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate(user.onboardingCompleted ? '/dashboard' : '/onboarding')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm sm:text-base transition-all shadow-glow-md flex items-center justify-center gap-2 group"
          >
            <span>Start Practicing Now</span>
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

        {/* Key Pillars Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 font-semibold">LaTeX Native</div>
            <div className="text-sm font-medium text-zinc-200">Full KaTeX math rendering for clean proofs.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1 font-semibold">Depth over Volume</div>
            <div className="text-sm font-medium text-zinc-200">High-yield problems designed to test core principles.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1 font-semibold">Timed Practice</div>
            <div className="text-sm font-medium text-zinc-200">Simulated contest environments with live timers.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 font-semibold">Elo Rating</div>
            <div className="text-sm font-medium text-zinc-200">Adaptive problem queue matching your current skill.</div>
          </div>
        </div>
      </section>

      {/* Realistic Interactive Product Preview Section */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 w-full">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Realistic Training Workspace</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">Built Like a Developer IDE for Olympiads</h2>
        </div>

        {/* Window Shell */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-left">
          {/* Window Header */}
          <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-zinc-400 ml-2">olympiados-workspace // {sampleProblem.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                1895 ELO Workspace
              </span>
              <button
                onClick={() => navigate(`/problems/${sampleProblem.id}`)}
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                Open Interactive Workspace <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Window Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
            {/* Main Problem Area (2 Cols) */}
            <div className="lg:col-span-2 p-6 bg-zinc-900/60 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-500/30 font-bold">
                  {sampleProblem.subject}
                </span>
                <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {sampleProblem.topic}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {sampleProblem.source}
                </span>
              </div>

              <h3 className="text-lg font-bold text-zinc-100">{sampleProblem.title}</h3>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-sm">
                <LatexRenderer content={sampleProblem.statement} />
              </div>

              {/* Sample Hint Drawer Preview */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-200/90 font-mono">
                  <strong>Hint 1:</strong> Consider setting $x = 0$ to analyze the behavior of $f(f(y))$.
                </div>
              </div>
            </div>

            {/* Sidebar Metadata (1 Col) */}
            <div className="p-6 bg-zinc-950/40 space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Difficulty</span>
                  <span className="text-purple-400 font-bold">{sampleProblem.difficulty}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Time</span>
                  <span className="text-zinc-200">{sampleProblem.estimated_time} minutes</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Target Olympiad</span>
                  <span className="text-emerald-400">USAMO / IMO</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                <div className="text-zinc-400 font-semibold mb-1">Session Timer</div>
                <div className="text-2xl font-bold text-zinc-100">00:14:32</div>
                <div className="text-[10px] text-zinc-500">Active live tracking enabled</div>
              </div>

              <button
                onClick={() => navigate(`/problems/${sampleProblem.id}`)}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4" /> Start Problem Workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Olympiad Track Breakdown */}
      <section className="py-16 bg-zinc-900/50 border-t border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100">Four Rigorous Olympiad Disciplines</h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2">
              Every subject features authentic problem sets carefully tagged by subfield, difficulty rating, and historical tournament origin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Math */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-lg mb-4">
                ∑
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">Mathematics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Algebraic proof, Number Theory modular congruences, Euclidean Geometry, and Combinatorics.
              </p>
              <button
                onClick={() => navigate('/problems?subject=Mathematics')}
                className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
              >
                Browse Math Problems (30+) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Physics */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-950 text-purple-400 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-lg mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">Physics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Lagrangian mechanics, Maxwell electrodynamics, thermodynamics entropy, and quantum wave mechanics.
              </p>
              <button
                onClick={() => navigate('/problems?subject=Physics')}
                className="text-xs font-mono text-purple-400 hover:underline flex items-center gap-1"
              >
                Browse Physics Problems (15+) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Chemistry */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-lg mb-4">
                ⚗
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">Chemistry</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Organic reaction mechanisms, chemical kinetics, crystal field stabilization, and cell thermodynamics.
              </p>
              <button
                onClick={() => navigate('/problems?subject=Chemistry')}
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                Browse Chemistry Problems (10+) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Biology */}
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-950 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-lg mb-4">
                🧬
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">Biology</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Quantitative population genetics, Michaelis-Menten kinetics, membrane biophysics, and gene mapping.
              </p>
              <button
                onClick={() => navigate('/problems?subject=Biology')}
                className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
              >
                Browse Biology Problems (10+) <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <Trophy className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
            Ready to Become an Exceptional Problem Solver?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Join high school competitors around the world training for national and international Olympiads with OlympiadOS.
          </p>

          <button
            onClick={() => navigate(user.onboardingCompleted ? '/dashboard' : '/onboarding')}
            className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm sm:text-base transition-all shadow-glow-md"
          >
            Launch Your Training Session
          </button>
        </div>
      </section>
    </div>
  );
};
