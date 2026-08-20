import React from 'react';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problems';
import { ProblemCard } from '../components/problem/ProblemCard';
import { Flame, Trophy, CheckCircle2, Target, ArrowRight, Play, Sparkles, Clock, AlertTriangle, Activity } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, attempts, navigate, activeSession } = useApp();

  const totalSolved = attempts.filter(a => a.solved).length;
  const totalAttempted = attempts.length;
  const accuracy = totalAttempted > 0 ? Math.round((totalSolved / totalAttempted) * 100) : 74;

  // Streak logic (derived or defaulted)
  const streakDays = 8;
  const weeklySolved = attempts.slice(0, 12).filter(a => a.solved).length;
  const weeklyGoal = user.weeklyGoal || 15;

  // Continue training problem
  const continueProblem = activeSession
    ? PROBLEMS_DATA.find(p => p.id === activeSession.problem_ids[0])
    : PROBLEMS_DATA.find(p => p.id === 'math-alg-01');

  // Recommended queue (3-5 problems)
  const recommendedProblems = PROBLEMS_DATA.filter(
    p => !attempts.some(a => a.problem_id === p.id && a.solved)
  ).slice(0, 4);

  // Weak areas
  const weakAreas = [
    { topic: 'Functional Equations', subject: 'Mathematics', accuracy: 55, recommendedId: 'math-alg-01' },
    { topic: 'Euclidean Geometry', subject: 'Mathematics', accuracy: 62, recommendedId: 'math-geo-01' },
    { topic: 'Thermodynamics Entropy', subject: 'Physics', accuracy: 58, recommendedId: 'phys-thermo-01' },
    { topic: 'Diels-Alder Stereochemistry', subject: 'Chemistry', accuracy: 50, recommendedId: 'chem-org-01' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target Goal: {user.targetOlympiad} ({user.level} Level)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
            Good morning, {user.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Ready for today's practice session? You're currently on an 8-day streak!
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => navigate('/practice')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-glow-sm flex items-center gap-2"
          >
            <Flame className="w-4 h-4" /> Start Quick Session
          </button>
          <button
            onClick={() => navigate('/training')}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" /> Training Plan
          </button>
        </div>
      </div>

      {/* Progress Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Problems Solved */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Problems Solved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-100">
            {127 + totalSolved}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">
            +12 this week
          </div>
        </div>

        {/* Metric 2: Streak */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Training Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-100 flex items-center gap-2">
            {streakDays} <span className="text-xs font-sans font-normal text-zinc-400">days</span>
          </div>
          <div className="text-[11px] text-amber-400 mt-1 font-mono">
            Personal best: 14 days
          </div>
        </div>

        {/* Metric 3: Accuracy */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Accuracy Rate</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-100">
            {accuracy}%
          </div>
          <div className="text-[11px] text-blue-400 mt-1 font-mono">
            Top 15% percentile
          </div>
        </div>

        {/* Metric 4: Weekly Goal */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 shadow-md">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Weekly Goal</span>
            <Trophy className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-100">
            {12 + weeklySolved} / {weeklyGoal}
          </div>
          {/* Progress bar */}
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, ((12 + weeklySolved) / weeklyGoal) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout: Left (2 cols), Right (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Continue Training & Recommended Problems */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Training Card */}
          {continueProblem && (
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-emerald-400" /> Continue Training
                </span>
                <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {continueProblem.subject} • {continueProblem.topic}
                </span>
              </div>

              <h2 className="text-xl font-bold text-zinc-100 mb-2">
                {continueProblem.title}
              </h2>
              <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                {continueProblem.statement.replace(/\$/g, '')}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span>Difficulty: <strong className="text-purple-400">{continueProblem.difficulty}</strong></span>
                  <span>Est: <strong>{continueProblem.estimated_time}m</strong></span>
                </div>
                <button
                  onClick={() => navigate(`/problems/${continueProblem.id}`)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Resume Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Recommended Problems Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Recommended For You
                </h2>
                <p className="text-xs text-zinc-400">Tailored to your target competition and Elo rating ({user.rating})</p>
              </div>
              <button
                onClick={() => navigate('/problems')}
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                View Library <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedProblems.map(p => (
                <ProblemCard key={p.id} problem={p} />
              ))}
            </div>
          </div>

          {/* Weekly Progress Chart Component */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" /> Weekly Activity & Solves
                </h3>
                <p className="text-xs text-zinc-400">Daily breakdown over the last 7 days</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">
                12 Problems Solved
              </span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-40 w-full flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { day: 'Mon', count: 2, height: '40%' },
                { day: 'Tue', count: 3, height: '60%' },
                { day: 'Wed', count: 1, height: '20%' },
                { day: 'Thu', count: 4, height: '80%' },
                { day: 'Fri', count: 2, height: '40%' },
                { day: 'Sat', count: 5, height: '100%' },
                { day: 'Sun', count: 3, height: '60%' },
              ].map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.count}
                  </span>
                  <div className="w-full bg-zinc-800 rounded-t-md h-full flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-teal-300 transition-all rounded-t-md"
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weak Areas & Recent Activity */}
        <div className="space-y-8">
          {/* Weak Areas Cards */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Focus Areas
              </h3>
              <button
                onClick={() => navigate('/training')}
                className="text-[11px] font-mono text-emerald-400 hover:underline"
              >
                Drill Weak Topics
              </button>
            </div>

            <div className="space-y-3">
              {weakAreas.map(w => (
                <div
                  key={w.topic}
                  onClick={() => navigate(`/problems/${w.recommendedId}`)}
                  className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors">
                      {w.topic}
                    </span>
                    <span className="text-[10px] font-mono text-rose-400">{w.accuracy}% Acc</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${w.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" /> Recent Activity
            </h3>

            <div className="space-y-3">
              {attempts.slice(0, 5).map(att => {
                const prob = PROBLEMS_DATA.find(p => p.id === att.problem_id);
                return (
                  <div
                    key={att.id}
                    onClick={() => navigate(`/problems/${att.problem_id}`)}
                    className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 hover:border-emerald-500/30 transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-zinc-200 truncate">
                        {prob ? prob.title : att.problem_id}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        {att.solved ? 'Solved correctly' : 'Attempted'} • {Math.round(att.time_taken / 60)}m spent
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border shrink-0 ${
                        att.solved
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-950 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {att.solved ? 'Solved' : 'Review'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
