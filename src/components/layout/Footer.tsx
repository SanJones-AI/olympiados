import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800/80 pt-12 pb-20 md:pb-12 text-zinc-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800/60">
          {/* Brand Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-zinc-900 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                Ω
              </div>
              <span className="font-mono text-sm font-bold text-zinc-100">OlympiadOS</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Academic training platform for high-school students preparing for national and international science & mathematics Olympiads. Built around deliberate practice and proof-based rigor.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-zinc-400">All Systems Operational</span>
            </div>
          </div>

          {/* Practice & Library */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3 font-mono">
              Practice Engines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/problems')} className="hover:text-emerald-400 transition-colors">
                  Problem Library (65+)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/practice')} className="hover:text-emerald-400 transition-colors">
                  Custom Practice Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/training')} className="hover:text-emerald-400 transition-colors">
                  Personalized Training Plan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contests')} className="hover:text-emerald-400 transition-colors">
                  Virtual Olympiad Contests
                </button>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3 font-mono">
              Olympiad Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/problems?subject=Mathematics')} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Mathematics (USAMO/IMO)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/problems?subject=Physics')} className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Physics (USAPhO/IPhO)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/problems?subject=Chemistry')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Chemistry (USNCO/IChO)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/problems?subject=Biology')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Biology (USABO/IBO)
                </button>
              </li>
            </ul>
          </div>

          {/* Product & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3 font-mono">
              Platform & Ethos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-emerald-400 transition-colors">
                  Manifesto & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} className="hover:text-emerald-400 transition-colors">
                  Tier Membership & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/performance')} className="hover:text-emerald-400 transition-colors">
                  Analytics & Skill Radar
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/settings')} className="hover:text-emerald-400 transition-colors">
                  Settings & Data Export
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 font-mono gap-2">
          <div>© {new Date().getFullYear()} OlympiadOS. Designed for serious problem solvers.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/about')} className="hover:text-zinc-300">Terms of Practice</button>
            <button onClick={() => navigate('/about')} className="hover:text-zinc-300">Privacy Policy</button>
            <button onClick={() => navigate('/about')} className="hover:text-zinc-300">Academic Integrity</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
