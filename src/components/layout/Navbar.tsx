import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Flame, Trophy, BarChart3, User, Menu, X, Shield, ChevronDown, Sparkles, LogOut, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, user, logoutUser, setCommandPaletteOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Problems', path: '/problems' },
    { label: 'Practice', path: '/practice' },
    { label: 'Training', path: '/training' },
    { label: 'Contests', path: '/contests' },
    { label: 'Performance', path: '/performance' },
    { label: 'About', path: '/about' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-base group-hover:border-emerald-400 group-hover:shadow-glow-sm transition-all">
              Ω
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono text-base font-bold tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                Olympiad<span className="text-emerald-400">OS</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 -mt-1 hidden sm:block">
                Academic Practice Engine
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 ml-2">
            {navLinks.map(link => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-800/90 text-emerald-400 font-semibold border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Admin Portal Link */}
          {user.role === 'admin' ? (
            <button
              onClick={() => handleNav('/admin')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-500/50 text-purple-300 text-xs font-mono font-bold hover:bg-purple-900 transition-all shadow-glow-blue"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Portal</span>
            </button>
          ) : (
            <button
              onClick={() => handleNav('/admin')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-purple-400 hover:border-purple-500/40 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" /> Admin
            </button>
          )}

          {/* Command Palette Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span>Search...</span>
            <kbd className="font-mono text-[10px] bg-zinc-800 text-zinc-400 px-1 py-0.5 rounded border border-zinc-700">
              ⌘K
            </kbd>
          </button>

          {/* Rating Badge */}
          <button
            onClick={() => handleNav('/profile')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium hover:border-emerald-400 transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>{user.rating} ELO</span>
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-xs font-medium text-zinc-200"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover border border-emerald-500/40"
              />
              <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-3.5 py-2 border-b border-zinc-800/80">
                  <div className="text-xs font-semibold text-zinc-100 flex items-center justify-between">
                    <span>{user.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase bg-zinc-800 text-emerald-400 border border-emerald-500/30">
                      {user.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate mt-0.5">{user.email}</div>
                </div>

                <div className="py-1">
                  {user.role === 'admin' && (
                    <button
                      onClick={() => handleNav('/admin')}
                      className="w-full px-3.5 py-1.5 text-left text-xs text-purple-300 font-semibold hover:bg-purple-950/60 flex items-center gap-2"
                    >
                      <Shield className="w-3.5 h-3.5 text-purple-400" /> Admin Backend Portal
                    </button>
                  )}
                  <button
                    onClick={() => handleNav('/dashboard')}
                    className="w-full px-3.5 py-1.5 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 flex items-center gap-2"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Dashboard
                  </button>
                  <button
                    onClick={() => handleNav('/profile')}
                    className="w-full px-3.5 py-1.5 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" /> Profile & Stats
                  </button>
                  <button
                    onClick={() => handleNav('/settings')}
                    className="w-full px-3.5 py-1.5 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5" /> Settings
                  </button>
                </div>

                <div className="border-t border-zinc-800 pt-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logoutUser();
                    }}
                    className="w-full px-3.5 py-1.5 text-left text-xs text-rose-400 hover:bg-rose-950/40 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-4 space-y-1">
          {user.role === 'admin' && (
            <button
              onClick={() => handleNav('/admin')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-purple-300 bg-purple-950/80 border border-purple-500/40 mb-2 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-purple-400" /> Admin Backend Portal
            </button>
          )}
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === link.path
                  ? 'bg-zinc-800 text-emerald-400 font-semibold'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
