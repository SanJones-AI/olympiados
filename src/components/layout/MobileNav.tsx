import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, BookOpen, Flame, Trophy, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentPath, navigate } = useApp();

  const items = [
    { label: 'Dashboard', path: '/dashboard', icon: Compass },
    { label: 'Problems', path: '/problems', icon: BookOpen },
    { label: 'Practice', path: '/practice', icon: Flame },
    { label: 'Contests', path: '/contests', icon: Trophy },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
              isActive ? 'text-emerald-400 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-mono">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
