import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Moon, Sun } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, theme, toggleTheme, isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-blue-500/20">
      {/* Background Vertical Grid Stripe Pattern (Matching screenshot) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* TOP LANDING NAVBAR (Exact match of uploaded screenshot header) */}
      <header className="relative z-40 w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo & Main Nav Links */}
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
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Pill Tag: • Math & science competition preparation */}
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
    </div>
  );
};
