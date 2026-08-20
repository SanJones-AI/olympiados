import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PROBLEMS_DATA } from '../../data/problems';
import { Search, Compass, BookOpen, Flame, Trophy, BarChart3, User, Settings, Sparkles, X, ArrowRight } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, navigate } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const filteredProblems = query.trim()
    ? PROBLEMS_DATA.filter(
        p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.subject.toLowerCase().includes(query.toLowerCase()) ||
          p.topic.toLowerCase().includes(query.toLowerCase()) ||
          p.source.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : PROBLEMS_DATA.slice(0, 4);

  const quickLinks = [
    { label: 'Dashboard Hub', path: '/dashboard', icon: Compass, badge: 'Main' },
    { label: 'Problem Library', path: '/problems', icon: BookOpen, badge: '65+ Problems' },
    { label: 'Practice Generator', path: '/practice', icon: Flame, badge: 'Focused' },
    { label: 'Personalized Training Plan', path: '/training', icon: Sparkles, badge: 'For You' },
    { label: 'Olympiad Contests', path: '/contests', icon: Trophy, badge: 'Virtual' },
    { label: 'Performance Analytics', path: '/performance', icon: BarChart3, badge: 'Stats' },
    { label: 'Profile & Rating', path: '/profile', icon: User, badge: 'Elo 1895' },
    { label: 'System Settings', path: '/settings', icon: Settings, badge: 'Config' },
  ];

  const handleSelectLink = (path: string) => {
    setCommandPaletteOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Search problems, topics, sources (e.g. USAMO, Number Theory, Diels-Alder)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm md:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-3 space-y-4">
          {/* Quick Links Section */}
          {!query && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-3 py-1">
                Quick Navigation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                {quickLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleSelectLink(link.path)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/80 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                        <span>{link.label}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700/50 group-hover:border-emerald-500/30 group-hover:text-emerald-400">
                        {link.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Problem Matches Section */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-3 py-1 flex justify-between items-center">
              <span>{query ? 'Matching Problems' : 'Featured Olympiad Problems'}</span>
              <span className="font-mono text-[10px]">{filteredProblems.length} results</span>
            </div>

            <div className="space-y-1.5 mt-1">
              {filteredProblems.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelectLink(`/problems/${p.id}`)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/60 hover:border-emerald-500/40 hover:bg-zinc-800/50 transition-colors text-left group"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {p.subject}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {p.source}
                      </span>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors truncate">
                      {p.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-700/60 text-zinc-400">
                      {p.difficulty}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
          <span>
            Use <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">↓</kbd> to navigate
          </span>
          <span>
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">ESC</kbd> to exit
          </span>
        </div>
      </div>
    </div>
  );
};
