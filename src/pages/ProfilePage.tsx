import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Flame, CheckCircle2, Award, Target, User, Shield, Sparkles } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, attempts, navigate } = useApp();

  const solvedCount = 127 + attempts.filter(a => a.solved).length;

  const achievements = [
    { title: 'Proof Master', desc: 'Solved 10+ Olympiad-tier proof problems', icon: '🏆', unlocked: true },
    { title: '7-Day Streak', desc: 'Maintained consecutive practice for 7 days', icon: '🔥', unlocked: true },
    { title: 'AIME Solver', desc: 'Scored 10+ on simulated AIME exam', icon: '⚡', unlocked: true },
    { title: 'Quantum Specialist', desc: 'Solved 5+ modern physics problems', icon: '⚛️', unlocked: true },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-glow-sm"
        />

        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">{user.name}</h1>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              {user.rating} ELO Rating
            </span>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded">
              {user.level}
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-mono">{user.email} • Target: {user.targetOlympiad}</p>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {user.goals.map((g, idx) => (
              <span key={idx} className="text-[11px] font-mono text-zinc-300 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                🎯 {g}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/settings')}
          className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="text-xs font-mono text-zinc-400 uppercase">Problems Solved</div>
          <div className="text-3xl font-bold font-mono text-zinc-100 mt-1">{solvedCount}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="text-xs font-mono text-zinc-400 uppercase">Current Streak</div>
          <div className="text-3xl font-bold font-mono text-amber-400 mt-1">8 Days</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="text-xs font-mono text-zinc-400 uppercase">Weekly Goal</div>
          <div className="text-3xl font-bold font-mono text-purple-400 mt-1">12 / {user.weeklyGoal}</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="text-xs font-mono text-zinc-400 uppercase">Elo Tier</div>
          <div className="text-3xl font-bold font-mono text-emerald-400 mt-1">Master</div>
        </div>
      </div>

      {/* Achievements Badges */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" /> Recent Achievements & Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map(a => (
            <div key={a.title} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-center">
              <div className="text-3xl mb-1">{a.icon}</div>
              <div className="text-xs font-bold text-zinc-100 font-mono">{a.title}</div>
              <div className="text-[11px] text-zinc-400">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
