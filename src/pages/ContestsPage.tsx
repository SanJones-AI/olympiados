import React from 'react';
import { useApp } from '../context/AppContext';
import { CONTESTS_DATA } from '../data/contests';
import { Contest } from '../types';
import { Trophy, Clock, Users, ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react';

export const ContestsPage: React.FC = () => {
  const { navigate } = useApp();

  const getStatusBadge = (status: Contest['status']) => {
    if (status === 'active') {
      return (
        <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE NOW
        </span>
      );
    }
    if (status === 'upcoming') {
      return (
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-500/30">
          UPCOMING
        </span>
      );
    }
    return (
      <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded border border-zinc-700">
        COMPLETED
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Trophy className="w-4 h-4" />
            <span>VIRTUAL OLYMPIAD COMPETITION HALL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            Olympiad Contests
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Simulated official tests matching AIME, USAMO, USAPhO, and IChO formats under strict timing constraints.
          </p>
        </div>
      </div>

      {/* Contest List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CONTESTS_DATA.map(contest => (
          <div
            key={contest.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-colors space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                {getStatusBadge(contest.status)}
                <span className="text-xs font-mono text-zinc-400">{contest.subject}</span>
              </div>

              <h2 className="text-xl font-bold text-zinc-100">{contest.title}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">{contest.description}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-800/80">
              <div className="grid grid-cols-3 gap-2 font-mono text-xs text-zinc-400">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Duration</span>
                  <span className="text-zinc-200 font-bold">{contest.duration_minutes} mins</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">Problems</span>
                  <span className="text-zinc-200 font-bold">{contest.problem_ids.length} test items</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">Participants</span>
                  <span className="text-emerald-400 font-bold">{contest.participant_count} solvers</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/contests/${contest.id}`)}
                className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  contest.status === 'active'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-glow-sm'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                }`}
              >
                <span>{contest.status === 'active' ? 'Enter Virtual Contest' : 'View Leaderboard & PDF Solutions'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
