import React from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import {
  ArrowRight, Moon, Sun, BookOpen, Layers, Flame, FileText, Calendar, BarChart2, Shield, Sparkles, CheckCircle2, Trophy
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, theme, toggleTheme, isAuthenticated } = useApp();

  const sampleProblem = PROBLEMS_DATA[0];

  const olympiadCards = [
    { name: 'AMC 8', desc: 'Middle school foundation competition', icon: '📐', subject: 'Math' },
    { name: 'AMC 10', desc: 'Under-17 high school mathematics', icon: '📊', subject: 'Math' },
    { name: 'AMC 12', desc: 'Advanced high school mathematics', icon: '📈', subject: 'Math' },
    { name: 'AIME', desc: '15-question 3-hour invitational exam', icon: '🧮', subject: 'Math' },
    { name: 'USAPhO', desc: 'Physics Olympiad semi-final & final', icon: '⚛️', subject: 'Physics' },
    { name: 'USABO', desc: 'USA Biology Olympiad national exam', icon: '🧬', subject: 'Biology' },
    { name: 'USNCO', desc: 'National Chemistry Olympiad exam', icon: '🧪', subject: 'Chemistry' },
    { name: 'Science Bowl', desc: 'Fast-paced buzzer competition', icon: '🔬', subject: 'Science' },
  ];

  const studyTools = [
    { title: 'Interactive Flashcards', desc: 'Spaced repetition decks for key formulas, theorems, and chemical reactions.', icon: Layers, path: '/flashcards' },
    { title: 'LaTeX Formula Sheet', desc: 'Categorized cheat sheet with instant KaTeX math rendering.', icon: FileText, path: '/formula-sheet' },
    { title: 'Study Plan Generator', desc: 'Personalized weekly schedule and daily target problem tracker.', icon: Calendar, path: '/study-plan' },
    { title: 'Performance Analytics', desc: 'Elo rating progression, accuracy breakdown, and weak area diagnostics.', icon: BarChart2, path: '/performance' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-blue-500/20">
      {/* Background Vertical Grid Pattern (Matching screenshot) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* TOP LANDING NAVBAR */}
      <header className="relative z-40 w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo & Navigation Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] dark:bg-zinc-900 border border-blue-600 dark:border-emerald-500/40 flex items-center justify-center text-white dark:text-emerald-400 font-mono font-bold text-base shadow-xs">
                Σ
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-zinc-100">
                OlympiadOS
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-zinc-400">
              <button onClick={() => navigate('/practice')} className="hover:text-slate-900 dark:hover:text-zinc-100 transition-colors">Practice</button>
              <button onClick={() => navigate('/study-plan')} className="hover:text-slate-900 dark:hover:text-zinc-100 transition-colors">Study Tools</button>
              <button onClick={() => navigate('/performance')} className="hover:text-slate-900 dark:hover:text-zinc-100 transition-colors">Analytics</button>
            </nav>
          </div>

          {/* Right Actions: Theme Toggle, Log in, Get Started */}
          <div className="flex items-center gap-5">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/study-plan')}
                className="px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-xs"
              >
                Go to Workspace
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Log in
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-xs"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION (Exact copy & styling from uploaded screenshot) */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-32 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-emerald-400 inline-block" />
          <span>Math & science competition preparation</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 max-w-4xl leading-[1.12] mb-6">
          Master Olympiad Problems.<br />
          One Problem at a Time.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Practice AMC, AIME, USAPhO, USABO, USNCO, and more with adaptive practice, AI-powered hints, and tools designed for serious competition preparation.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
          >
            Start Practicing
          </button>

          <button
            onClick={() => navigate('/problems')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Explore Olympiads</span>
            <ArrowRight className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
          </button>
        </div>
      </section>

      {/* OLYMPIAD COMPETITIONS SHOWCASE GRID */}
      <section className="py-16 bg-white dark:bg-zinc-900 border-t border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563eb] dark:text-emerald-400">
              Supported Tournaments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100">
              Comprehensive Competition Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {olympiadCards.map(item => (
              <div
                key={item.name}
                onClick={() => navigate('/problems')}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 hover:border-blue-500/60 dark:hover:border-emerald-500/60 transition-all cursor-pointer space-y-2 group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-emerald-400 border border-blue-200 dark:border-zinc-700">
                    {item.subject}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDY TOOLS SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2563eb] dark:text-emerald-400">
            Competition Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100">
            Tools Designed for Elite Problem Solvers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studyTools.map(tool => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                onClick={() => navigate(tool.path)}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 hover:border-blue-500/60 dark:hover:border-emerald-500/60 transition-all cursor-pointer space-y-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 text-[#2563eb] dark:text-emerald-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-zinc-800/80 py-10 bg-white dark:bg-zinc-950 text-xs font-mono text-slate-500 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-zinc-100">OlympiadOS</span>
            <span>• Serious Practice Engine</span>
          </div>
          <div>© 2026 OlympiadOS Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
