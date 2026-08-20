import React, { useState, useEffect } from 'react';
import { CONTESTS_DATA } from '../data/contests';
import { PROBLEMS_DATA } from '../data/problems';
import { useApp } from '../context/AppContext';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import { Trophy, Clock, ArrowLeft, Send, CheckCircle2, ChevronRight, ChevronLeft, Award, BarChart2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContestDetailPageProps {
  contestId: string;
}

export const ContestDetailPage: React.FC<ContestDetailPageProps> = ({ contestId }) => {
  const { navigate, addToast } = useApp();

  const contest = CONTESTS_DATA.find(c => c.id === contestId) || CONTESTS_DATA[0];
  const contestProblems = contest.problem_ids
    .map(id => PROBLEMS_DATA.find(p => p.id === id))
    .filter(Boolean) as typeof PROBLEMS_DATA;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(contest.duration_minutes * 60);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (!isSubmitted && secondsRemaining > 0) {
      timer = setInterval(() => setSecondsRemaining(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitted, secondsRemaining]);

  const currentProb = contestProblems[currentIdx] || contestProblems[0];

  const handleSubmitContest = () => {
    setIsSubmitted(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    addToast('Contest Submitted!', 'Your score and percentile curve have been calculated.', 'success');
  };

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // POST SUBMISSION RESULTS VIEW
  if (isSubmitted) {
    // Score calculation logic
    let score = 0;
    const itemResults = contestProblems.map(p => {
      const userAns = (answers[p.id] || '').trim().toLowerCase();
      const expected = (p.numericalAnswer || '').trim().toLowerCase();
      const isCorrect = userAns.length > 0 && (userAns === expected || expected.includes(userAns));
      if (isCorrect) score += 10;
      return { problem: p, userAns, isCorrect };
    });

    const maxScore = contestProblems.length * 10;
    const pct = Math.round((score / maxScore) * 100);
    const estimatedRank = Math.max(12, Math.round((100 - pct) * 14.2));
    const percentile = Math.min(99, Math.max(50, pct + 12));

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
        <button
          onClick={() => navigate('/contests')}
          className="flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-emerald-400"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Contest Hall
        </button>

        {/* Scorecard Box */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-3xl font-mono font-bold shadow-glow-md">
            {score}/{maxScore}
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100">{contest.title} Scorecard</h1>
            <p className="text-xs text-zinc-400 mt-1">Official contest submission registered successfully.</p>
          </div>

          {/* Metric Pills */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto font-mono text-xs">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">Global Rank</span>
              <span className="text-emerald-400 font-bold text-base">#{estimatedRank}</span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">Percentile</span>
              <span className="text-purple-400 font-bold text-base">{percentile}th %ile</span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block">Accuracy</span>
              <span className="text-blue-400 font-bold text-base">{pct}%</span>
            </div>
          </div>

          {/* Problem-by-problem Breakdown */}
          <div className="text-left pt-6 border-t border-zinc-800 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Item-by-Item Performance
            </h3>

            <div className="space-y-2">
              {itemResults.map((item, idx) => (
                <div
                  key={item.problem.id}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-zinc-500">P{idx + 1}</span>
                    <span className="font-semibold text-zinc-200">{item.problem.title}</span>
                  </div>

                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                      item.isCorrect
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-950 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {item.isCorrect ? '+10 Pts' : '0 Pts'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE CONTEST ENVIRONMENT
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Contest Top Sticky Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 sticky top-20 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/contests')} className="text-zinc-400 hover:text-zinc-100">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-zinc-100">{contest.title}</h1>
            <span className="text-[11px] font-mono text-emerald-400">Official Exam Mode</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-100 font-bold text-sm">{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={handleSubmitContest}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono transition-colors shadow-glow-sm"
          >
            Submit Contest
          </button>
        </div>
      </div>

      {/* Problem Nav Drawer */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {contestProblems.map((p, idx) => {
          const hasAns = Boolean(answers[p.id]);
          const isCurrent = idx === currentIdx;

          return (
            <button
              key={p.id}
              onClick={() => setCurrentIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-emerald-500 text-zinc-950 shadow-glow-sm'
                  : hasAns
                  ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
              }`}
            >
              P{idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Problem Area */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="text-xs font-mono text-zinc-400">
            Problem {currentIdx + 1} of {contestProblems.length} ({currentProb.subject})
          </span>
          <span className="text-xs font-mono text-purple-400 font-bold">{currentProb.difficulty}</span>
        </div>

        <h2 className="text-xl font-bold text-zinc-100">{currentProb.title}</h2>

        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm leading-relaxed">
          <LatexRenderer content={currentProb.statement} />
        </div>

        {/* Answer Input */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase text-zinc-400 font-semibold">Contest Answer Submission</label>
          <input
            type="text"
            value={answers[currentProb.id] || ''}
            onChange={e => setAnswers({ ...answers, [currentProb.id]: e.target.value })}
            placeholder="Type your final answer / proof here..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 font-mono focus:outline-none focus:border-emerald-500/60"
          />
        </div>

        {/* Bottom Nav */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-300 text-xs font-mono"
          >
            Previous
          </button>
          <button
            disabled={currentIdx === contestProblems.length - 1}
            onClick={() => setCurrentIdx(prev => prev + 1)}
            className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono"
          >
            Next Problem
          </button>
        </div>
      </div>
    </div>
  );
};
