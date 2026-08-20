import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_USER_PROGRESS } from '../data/sampleUser';
import { BarChart3, TrendingUp, Target, Award, Clock, Activity, Zap, Shield, CheckCircle2 } from 'lucide-react';

export const PerformancePage: React.FC = () => {
  const { user, attempts } = useApp();

  const totalSolved = 127 + attempts.filter(a => a.solved).length;
  const totalAttempted = 165 + attempts.length;
  const accuracy = Math.round((totalSolved / totalAttempted) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>ANALYTICS & DIAGNOSTIC ENGINE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
          Performance & Skill Radar
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Detailed metrics tracking your problem-solving accuracy, topic mastery, and difficulty progression.
        </p>
      </div>

      {/* Top Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Elo Rating</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-zinc-100">{user.rating}</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">Master Tier (98th %ile)</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Total Solved</span>
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-zinc-100">{totalSolved}</div>
          <div className="text-[11px] text-blue-400 mt-1 font-mono">out of {totalAttempted} attempted</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Overall Accuracy</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-zinc-100">{accuracy}%</div>
          <div className="text-[11px] text-purple-400 mt-1 font-mono">+4% increase this month</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase">Avg Solve Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-zinc-100">26.4<span className="text-sm">m</span></div>
          <div className="text-[11px] text-amber-400 mt-1 font-mono">Optimal for USAMO format</div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CHART 1: SOLVES OVER TIME */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Problems Solved Over Time (Weekly)
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">
              Upward Trend
            </span>
          </div>

          <div className="h-52 w-full flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { label: 'W1', value: 14, height: '35%' },
              { label: 'W2', value: 18, height: '45%' },
              { label: 'W3', value: 22, height: '55%' },
              { label: 'W4', value: 20, height: '50%' },
              { label: 'W5', value: 28, height: '70%' },
              { label: 'W6', value: 35, height: '88%' },
              { label: 'W7', value: 40, height: '100%' },
            ].map(col => (
              <div key={col.label} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
                  {col.value}
                </span>
                <div className="w-full bg-zinc-950 rounded-t-lg h-full flex items-end overflow-hidden border border-zinc-800">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:from-emerald-400 group-hover:to-cyan-300 transition-all rounded-t-lg"
                    style={{ height: col.height }}
                  />
                </div>
                <span className="text-[11px] font-mono text-zinc-500">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 2: DIFFICULTY DISTRIBUTION */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" /> Difficulty Progression Breakdown
            </h3>
            <span className="text-xs font-mono text-zinc-400">Total 127 Solved</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {[
              { diff: 'Easy', count: 32, pct: 100, color: 'bg-zinc-400' },
              { diff: 'Medium', count: 48, pct: 85, color: 'bg-blue-400' },
              { diff: 'Hard', count: 31, pct: 68, color: 'bg-purple-400' },
              { diff: 'Very Hard', count: 12, pct: 45, color: 'bg-amber-400' },
              { diff: 'Olympiad', count: 4, pct: 25, color: 'bg-emerald-400' },
            ].map(item => (
              <div key={item.diff} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-bold">{item.diff}</span>
                  <span className="text-zinc-400">{item.count} solved ({item.pct}% accuracy)</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOPIC PERFORMANCE MATRIX TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Topic Mastery Matrix
          </h3>
          <span className="text-xs font-mono text-zinc-400">10 Subfields Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 uppercase">
                <th className="py-2.5 px-3">Topic</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Attempted</th>
                <th className="py-2.5 px-3">Solved</th>
                <th className="py-2.5 px-3">Accuracy</th>
                <th className="py-2.5 px-3">Avg Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {INITIAL_USER_PROGRESS.map(p => (
                <tr key={p.topic} className="hover:bg-zinc-800/40 transition-colors text-zinc-300">
                  <td className="py-3 px-3 font-semibold text-zinc-100">{p.topic}</td>
                  <td className="py-3 px-3 text-zinc-400">{p.subject}</td>
                  <td className="py-3 px-3">{p.problems_attempted}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{p.problems_solved}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded border ${p.accuracy >= 75 ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30' : 'bg-amber-950 text-amber-400 border-amber-500/30'}`}>
                      {p.accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-400">{p.average_time} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
