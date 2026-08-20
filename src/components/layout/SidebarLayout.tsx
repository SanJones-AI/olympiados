import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Flame, Layers, FileText, Calendar, BarChart2, Shield, Settings, Sun, Moon, LogOut, Sliders, Search, BookOpen, ChevronRight
} from 'lucide-react';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const { currentPath, navigate, user, logoutUser, theme, toggleTheme, brightness, setBrightness, setCommandPaletteOpen } = useApp();
  const [showBrightnessPopover, setShowBrightnessPopover] = useState(false);

  const sidebarGroups = [
    {
      title: 'Practice',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Practice', path: '/practice', icon: Flame },
      ],
    },
    {
      title: 'Study tools',
      items: [
        { label: 'Flashcards', path: '/flashcards', icon: Layers },
        { label: 'Formula Sheet', path: '/formula-sheet', icon: FileText },
        { label: 'Study Plan', path: '/study-plan', icon: Calendar },
      ],
    },
    {
      title: 'Insights',
      items: [
        { label: 'Analytics', path: '/performance', icon: BarChart2 },
      ],
    },
  ];

  if (user.role === 'admin') {
    sidebarGroups.push({
      title: 'System',
      items: [
        { label: 'Admin Portal', path: '/admin', icon: Shield },
        { label: 'Settings', path: '/settings', icon: Settings },
      ],
    });
  } else {
    sidebarGroups.push({
      title: 'System',
      items: [
        { label: 'Settings', path: '/settings', icon: Settings },
      ],
    });
  }

  // Determine Current Header Title & Icon
  let headerTitle = 'Study Plan';
  let HeaderIcon = Calendar;

  if (currentPath === '/dashboard') {
    headerTitle = 'Dashboard';
    HeaderIcon = LayoutDashboard;
  } else if (currentPath === '/practice') {
    headerTitle = 'Practice Engine';
    HeaderIcon = Flame;
  } else if (currentPath === '/flashcards') {
    headerTitle = 'Flashcards';
    HeaderIcon = Layers;
  } else if (currentPath === '/formula-sheet') {
    headerTitle = 'Formula Sheet';
    HeaderIcon = FileText;
  } else if (currentPath === '/study-plan') {
    headerTitle = 'Study Plan';
    HeaderIcon = Calendar;
  } else if (currentPath === '/performance') {
    headerTitle = 'Analytics';
    HeaderIcon = BarChart2;
  } else if (currentPath === '/admin') {
    headerTitle = 'Admin Portal';
    HeaderIcon = Shield;
  } else if (currentPath === '/problems' || currentPath.startsWith('/problems/')) {
    headerTitle = 'Problem Library';
    HeaderIcon = BookOpen;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      {/* LEFT SIDEBAR (Matching uploaded screenshot exact style) */}
      <aside className="w-64 shrink-0 bg-white dark:bg-zinc-950 border-r border-slate-200/80 dark:border-zinc-800/80 flex flex-col justify-between hidden md:flex sticky top-0 h-screen z-30 shadow-sm">
        <div className="p-5 space-y-6">
          {/* Logo Header */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-700 dark:bg-zinc-900 border border-blue-600 dark:border-emerald-500/40 flex items-center justify-center text-white dark:text-emerald-400 font-mono font-bold text-base shadow-sm">
              Σ
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
              Olympiad<span className="text-blue-600 dark:text-emerald-400">OS</span>
            </span>
          </button>

          {/* Navigation Group Sections */}
          <div className="space-y-5">
            {sidebarGroups.map(group => (
              <div key={group.title} className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider px-3 mb-1 font-mono">
                  {group.title}
                </div>
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));

                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 dark:bg-zinc-800 text-blue-700 dark:text-emerald-400 font-bold border border-blue-200/60 dark:border-zinc-700/60 shadow-xs'
                          : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-emerald-400' : 'text-slate-400 dark:text-zinc-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-slate-200/80 dark:border-zinc-800/80">
          <button
            onClick={() => navigate('/profile')}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors text-left"
          >
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-emerald-500/40" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">{user.name}</div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 truncate">{user.rating} ELO • {user.role}</div>
            </div>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR HEADER (Matching exact screenshot header) */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200">
              <HeaderIcon className="w-4 h-4" />
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-zinc-100">{headerTitle}</h1>
          </div>

          {/* Header Right Actions: Theme Toggle, Brightness Popover, Sign Out */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
              title="Search problems (⌘K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Brightness Popover Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowBrightnessPopover(!showBrightnessPopover)}
                className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
                title="Brightness / Contrast Controller"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {showBrightnessPopover && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-zinc-300 font-bold mb-2">
                    <span>Display Brightness</span>
                    <span>{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={130}
                    value={brightness}
                    onChange={e => setBrightness(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-zinc-500 mt-1.5">
                    <span>70% (Dim)</span>
                    <span>100% (Standard)</span>
                    <span>130% (Bright)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sun / Moon Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Sign Out Button (Matching screenshot `[🚪 Sign out]`) */}
            <button
              onClick={logoutUser}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
