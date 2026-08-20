import React from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { ProblemCard } from '../components/problem/ProblemCard';
import { Sparkles, Target, Flame, AlertTriangle, ArrowRight, Award, Shield } from 'lucide-react';

export const TrainingPage: React.FC = () => {
  const { user, navigate } = useApp();

  // Daily queue (3 targeted problems)
  const todayQueue = [
    PROBLEMS_DATA.find(p => p.id === 'math-nt-01')!,
    PROBLEMS_DATA.find(p => p.id === 'math-geo-01')!,
    PROBLEMS_DATA.find(p => p.id === 'math-comb-02')!,
  ].filter(Boolean);

  // Weak area targeted drills
  const weakAreas = [
    { title: 'Functional Equations & Bijections', subject: 'Mathematics', problemId: 'math-alg-01', count: 4 },
    { title: 'Euclidean Geometry & Cyclic Quads', subject: 'Mathematics', problemId: 'math-geo-01', count: 5 },
    { title: 'Thermodynamics Entropy', subject: 'Physics', problemId: 'phys-thermo-01', count: 3 },
  ];

  // Stretch challenges (Olympiad tier)
  const stretchProblems = PROBLEMS_DATA.filter(p => p.difficulty === 'Olympiad' || p.difficulty === 'Very Hard').slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PERSONALIZED ADAPTIVE ENGINE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-100">Your Daily Training Plan</h1>
          <p className="text-sm text-zinc-400">
            Curated based on your target goal (<strong className="text-emerald-400">{user.targetOlympiad}</strong>), recent accuracy, and current rating (<strong className="text-emerald-400">{user.rating} ELO</strong>).
          </p>
        </div>

        <button
          onClick={() => navigate('/practice')}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-glow-sm flex items-center gap-2 self-start md:self-center shrink-0"
        >
          <Flame className="w-4 h-4" /> Start Daily Routine
        </button>
      </div>

      {/* TODAY'S TARGETED QUEUE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" /> Today's Recommended Queue
          </h2>
          <span className="text-xs font-mono text-zinc-400">3 Problems • Est. 90m</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {todayQueue.map(p => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      </div>

      {/* WEAK AREAS & STRETCH GOALS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* WEAK AREAS DRILL CARDS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> High-Priority Weak Topics
            </h3>
            <span className="text-xs font-mono text-zinc-500">Diagnostic feedback</span>
          </div>

          <div className="space-y-3">
            {weakAreas.map(w => (
              <div
                key={w.title}
                onClick={() => navigate(`/problems/${w.problemId}`)}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-mono text-amber-400 mb-0.5">{w.subject} Track</div>
                  <div className="text-sm font-bold text-zinc-200 group-hover:text-amber-300 transition-colors">
                    {w.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mt-1">
                    {w.count} high-yield diagnostic problems available
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400 group-hover:text-amber-400 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STRETCH GOALS (OLYMPIAD TIER) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" /> Stretch Challenges (Olympiad Tier)
            </h3>
            <span className="text-xs font-mono text-zinc-500">Max rating boost</span>
          </div>

          <div className="space-y-3">
            {stretchProblems.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/problems/${p.id}`)}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/40 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-500/30 font-bold">
                      {p.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{p.source}</span>
                  </div>
                  <div className="text-sm font-bold text-zinc-200 group-hover:text-purple-300 transition-colors truncate">
                    {p.title}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400 group-hover:text-purple-400 transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
